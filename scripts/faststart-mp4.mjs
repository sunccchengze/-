#!/usr/bin/env node
/**
 * Move an MP4's `moov` atom in front of its media data without re-encoding.
 *
 * Why: a `moov` atom at the end forces many mobile browsers to download most
 * of a large file before playback can begin. This keeps the video/audio bytes
 * and quality unchanged, but makes the file progressively playable ("fast start").
 *
 * This only reorders atoms and rewrites chunk-offset tables; it does not decode
 * or re-encode any video/audio frames. The output is byte-for-byte the same set
 * of frames, with `moov` moved ahead of `mdat`.
 *
 * Usage:
 *   node scripts/faststart-mp4.mjs input.mp4 output.mp4
 */
import { readFile, writeFile } from "node:fs/promises";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/faststart-mp4.mjs input.mp4 output.mp4");
  process.exit(1);
}

/**
 * Read the list of ISO-BMFF boxes contained within buffer[start, end).
 * Handles the 8-byte, 16-byte (size === 1) and "to end of file" (size === 0)
 * size encodings defined by the spec.
 */
function readBoxes(buffer, start = 0, end = buffer.length) {
  const boxes = [];
  for (let offset = start; offset + 8 <= end; ) {
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString("latin1", offset + 4, offset + 8);
    let headerSize = 8;
    if (size === 1) {
      if (offset + 16 > end) throw new Error(`Truncated extended-size ${type} atom.`);
      const extended = buffer.readBigUInt64BE(offset + 8);
      if (extended > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error(`${type} atom is too large.`);
      size = Number(extended);
      headerSize = 16;
    } else if (size === 0) {
      size = end - offset;
    }
    if (size < headerSize || offset + size > end) throw new Error(`Invalid ${type} atom size.`);
    boxes.push({ type, offset, size, headerSize });
    offset += size;
  }
  return boxes;
}

const containerTypes = new Set([
  "moov", "trak", "mdia", "minf", "stbl", "edts", "dinf", "udta", "meta", "ilst",
]);

/**
 * Walk the box tree inside buffer[start, end) and rewrite every chunk-offset
 * entry (stco / co64) by `delta`. These entries hold absolute file offsets into
 * the media data, so when `mdat` is relocated they must be shifted to stay valid.
 */
function adjustChunkOffsets(buffer, start, end, delta) {
  for (const box of readBoxes(buffer, start, end)) {
    const payload = box.offset + box.headerSize;
    if (box.type === "stco") {
      const count = buffer.readUInt32BE(payload + 4);
      for (let index = 0; index < count; index += 1) {
        const position = payload + 8 + index * 4;
        const value = buffer.readUInt32BE(position) + delta;
        if (value > 0xffffffff) throw new Error("stco offset exceeds 32-bit range; use a remuxer.");
        buffer.writeUInt32BE(value, position);
      }
    } else if (box.type === "co64") {
      const count = buffer.readUInt32BE(payload + 4);
      for (let index = 0; index < count; index += 1) {
        const position = payload + 8 + index * 8;
        buffer.writeBigUInt64BE(buffer.readBigUInt64BE(position) + BigInt(delta), position);
      }
    } else if (containerTypes.has(box.type)) {
      // `meta` is a FullBox: four bytes of version/flags precede its child atoms.
      adjustChunkOffsets(buffer, payload + (box.type === "meta" ? 4 : 0), box.offset + box.size, delta);
    }
  }
}

const input = await readFile(inputPath);
const topLevel = readBoxes(input);

const moov = topLevel.find((box) => box.type === "moov");
const mdat = topLevel.find((box) => box.type === "mdat");
if (!moov || !mdat) throw new Error("The file must contain both moov and mdat atoms.");

if (moov.offset < mdat.offset) {
  console.log("The moov atom is already before mdat; copying without changes.");
  await writeFile(outputPath, input);
  process.exit(0);
}

// Reorder top-level atoms so `moov` sits immediately before `mdat`. Everything
// that preceded `mdat` stays put; `moov` moves from after `mdat` to just before
// it, which pushes `mdat` forward by exactly `moov.size`. stco/co64 offsets
// point into `mdat`, so they must be shifted by that same delta.
const beforeMdat = topLevel.filter((box) => box.offset < mdat.offset && box.type !== "moov");
const afterMdat = topLevel.filter((box) => box.offset > mdat.offset && box.type !== "moov");

const moovCopy = Buffer.from(input.subarray(moov.offset, moov.offset + moov.size));
adjustChunkOffsets(moovCopy, 0, moovCopy.length, moov.size);

const slices = [
  ...beforeMdat.map((box) => input.subarray(box.offset, box.offset + box.size)),
  moovCopy,
  input.subarray(mdat.offset, mdat.offset + mdat.size),
  ...afterMdat.map((box) => input.subarray(box.offset, box.offset + box.size)),
];

const totalSize = slices.reduce((sum, slice) => sum + slice.length, 0);
if (totalSize !== input.length) {
  throw new Error(`Size changed after reorder (input=${input.length}, output=${totalSize}); refusing to write.`);
}

await writeFile(outputPath, Buffer.concat(slices));
console.log(`Fast-start MP4 written: ${outputPath} (${totalSize} bytes, unchanged from input).`);
