import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 只把根 index.html 作为依赖预扫描入口。
  // 仓库里还有大量非站点内容（docs/ 下 100+ 篇 Markdown、技能库&准则/ 的第三方
  // skill 副本），若让 Vite 自行扫描整个仓库，会把这些目录当源码解析并产生大量
  // 无效告警；显式指定入口可把扫描范围锁死在站点本身。
  optimizeDeps: {
    entries: ["index.html"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
