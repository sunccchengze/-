/**
 * 英仔爱心社 2026 组织架构图 · 人员与标签数据
 *
 * 标签来源：docs/content-source/2026-recruit-wechat-team-profiles.md
 * 每个标签均由该成员招新推文自述内容提炼，未作虚构。
 *
 * 结构说明：
 * - `clusters` 为「分管单元」。一位副社分管的所有部门归为同一个 cluster，
 *   副社卡片在该 cluster 顶部横跨所有子部门（类似 Excel 合并单元格）。
 * - 单部门的 cluster 视觉上与普通部门一致。
 */

export const ORG = {
  title: "西安交通大学英仔爱心社",
  subtitle: "2026 社长团 · 部长团架构图",
  motto: "服务社会 · 奉献爱心 · 推己及人 · 薪火相传",
  advisor: { name: "刘晗梦", role: "指导老师", org: "仲英书院", since: "2025.9 起" },

  leaders: [
    { name: "王晗宇", role: "社长", tags: ["自动化", "ENFP", "新疆"], mascot: "shezhangtuan" },
    { name: "李振杰", role: "团支书", tags: ["马理论", "羽毛球", "爬山"], mascot: "aixin" },
  ],

  groups: [
    {
      key: "functional",
      label: "职能部门",
      note: "守护社团日常运转",
      clusters: [
        {
          vice: { name: "王紫瑞", tags: ["哲学强基", "阅读", "手工"] },
          depts: [
            {
              name: "常务部",
              alias: "大内总管",
              mascot: "changwu",
              heads: [
                { name: "张子熙", tags: ["ACCA", "ESFJ", "桌游"] },
                { name: "程瑞玲", tags: ["可i可e", "追剧", "羽毛球"] },
                { name: "赵满平", tags: ["智能传播", "画画", "摄影"] },
                { name: "热依麦", tags: ["新疆喀什", "citywalk"] },
              ],
            },
          ],
        },
        {
          vice: { name: "王一璇", tags: ["化工", "动漫", "小说"] },
          depts: [
            {
              name: "交流部",
              alias: "家文化建设",
              mascot: "jiaoliu",
              heads: [
                { name: "周涵语", tags: ["自动化", "剧本杀", "桌游"] },
                { name: "袁姝", tags: ["国经法", "网文", "港乐"] },
                { name: "夏西洋", tags: ["电气", "漫画", "游戏"] },
              ],
            },
          ],
        },
        {
          vice: { name: "赵淑琳", tags: ["能动", "ENFP", "桌游"] },
          depts: [
            {
              name: "宣传部",
              alias: "对外窗口",
              mascot: "xuanchuan",
              heads: [
                { name: "孙承泽", tags: ["剪辑", "狗仔", "AI"] },
                { name: "穆思雨", tags: ["新媒体", "推文", "素材"] },
                { name: "董懿", tags: ["网媒", "半e半i", "团建"] },
                { name: "王荣", tags: ["马理论", "读书", "思考"] },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "project",
      label: "项目部门",
      note: "把善意落在具体的人与事上",
      clusters: [
        {
          // 一位副社，分管两个部门 → 卡片横跨两列
          vice: { name: "郭瑞雅", tags: ["i变e", "手工", "团建"] },
          brand: "大手拉小手",
          depts: [
            {
              name: "启梦部",
              alias: "周至九峰",
              mascot: "dashou",
              heads: [
                { name: "邱鑫如", tags: ["四川", "追番", "羽毛球"] },
                { name: "张宇标", tags: ["山西", "抽象", "单机"] },
                { name: "付达发", tags: ["机械", "沙盒游戏", "美食"] },
              ],
            },
            {
              name: "拾辉部",
              alias: "文姬 · 彬州",
              mascot: "dashou",
              heads: [
                { name: "谌逸轩", tags: ["信息", "旅游", "大i人"] },
                { name: "苗国睿", tags: ["特摄", "动漫", "LOL"] },
              ],
            },
          ],
        },
        {
          vice: { name: "曹紫越", tags: ["国经法", "ISFJ", "漫展"] },
          brand: "青春伴夕阳",
          depts: [
            {
              name: "向日葵",
              alias: "社区 · 老年大学",
              mascot: "xiangrikui",
              heads: [
                { name: "林承", tags: ["台州", "ACGN", "跑步"] },
                { name: "王心之", tags: ["向日葵", "元气"] },
                { name: "朱与墨", tags: ["向日葵", "活泼"] },
              ],
            },
            {
              name: "常青藤",
              alias: "敬老院 · 护理院",
              mascot: "changqingteng",
              heads: [
                { name: "刘宇霏", tags: ["法学", "i人", "公园放空"] },
                { name: "张淑婷", tags: ["航天", "美食", "羽毛球"] },
              ],
            },
          ],
        },
        {
          vice: { name: "蔡茹玥", tags: ["微电子", "古筝", "素描"] },
          brand: "启明星 & 心项目",
          depts: [
            {
              name: "启明星",
              alias: "校园公益创新",
              mascot: "qimingxing",
              heads: [
                { name: "黎雅诗", tags: ["电池型人格", "外冷内热"] },
                { name: "师瑞康", tags: ["摄影", "随叫随到", "逛吃"] },
                { name: "李佳玮", tags: ["统计", "ESFJ", "钩织"] },
              ],
            },
            {
              name: "心项目",
              alias: "旧物循环 · 生态",
              mascot: "xinxiangmu",
              heads: [
                { name: "陆荣欣", tags: ["排球", "美食", "桌游"] },
                { name: "丰嘉妍", tags: ["网媒", "读书", "citywalk"] },
                { name: "杨浩田", tags: ["信息", "音乐", "画画"] },
              ],
            },
          ],
        },
        {
          vice: { name: "董艾祺", tags: ["大数据", "团建", "广泛"] },
          depts: [
            {
              name: "萤火部",
              alias: "特殊儿童陪伴",
              mascot: "yinghuo",
              heads: [
                { name: "周忆宁", tags: ["材料", "ENFJ", "开朗"] },
                { name: "王雅宁", tags: ["社会学", "又i又e", "手工"] },
                { name: "邬东延", tags: ["智造", "摄影", "骑行"] },
              ],
            },
          ],
        },
        {
          vice: { name: "黄润泽", tags: ["桂林", "历史", "电影"] },
          depts: [
            {
              name: "陕博部",
              alias: "陕历博志愿队",
              mascot: "shanbo",
              heads: [
                { name: "马昕蓉", tags: ["计算机", "听歌", "追剧"] },
                { name: "许闳翔", tags: ["资深op", "跑步", "健身"] },
                { name: "张小芊", tags: ["汉语言", "西安美食", "手巧"] },
                { name: "李思源", tags: ["储能", "志愿队长", "剧本杀"] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const STATS = {
  leaders: 10,
  heads: 34,
  total: 44,
  depts: 11,
  members: 199,
};
