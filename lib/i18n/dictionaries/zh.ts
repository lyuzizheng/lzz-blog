import type { Translations } from "../types";

export const zh: Translations = {
  common: {
    atelier: "LZZ ATELIER",
    backToAtelier: "← 返回主页",
    loading: "加载中...",
    tbd: "待确认",
    language: "语言",
    theme: "主题",
  },
  nav: {
    atelier: "主页",
    dispatches: "文章",
    darkroom: "摄影",
    flightPath: "履历",
    products: "产品",
    status: "状态",
    pdf: "下载简历",
  },
  home: {
    title: "吕子正",
    tagline: "软件工程师 · 视觉记录者",
    heroSubtitle:
      "全栈工程师与摄影记录者。以用户视角打造有温度的产品，恪守工程伦理与技术向善，在系统架构与 35mm 光影定格之间探索真实表达。",
    developing: "胶片显影中 · 向下滑动显影",
    chapters: {
      writings: {
        title: "文章归档",
        sentence: "关于分布式系统、基础架构与工程手艺的深度长文。",
        cta: "浏览全部文章",
      },
      darkroom: {
        title: "摄影暗房",
        sentence: "光影沉淀在胶片与传感器上。Sony A7M4 · 35mm F1.4 GM。",
        cta: "进入摄影画廊",
      },
      flightPath: {
        title: "经历航线",
        sentence: "从南洋理工大学到字节跳动，个人成长与工程实战历程。",
        cta: "查看完整履历",
      },
    },
    colophon: "排版采用 NEWSREADER 与 GEIST MONO",
    rss: "RSS 订阅",
    films: {
      blogs: "Blogs",
      career: "Career",
      photography: "Photography",
      projects: "Projects",
      label: "章节索引 —— 灯箱台上散落的四张底片",
    },
  },
  posts: {
    noResults: "未找到匹配的文章，请尝试调整关键词或筛选条件。",
    yearArchive: "篇",
    readingTime: "分钟阅读",
    wordCount: "字",
    backToPosts: "返回文章总列表",
    prevPost: "上一篇",
    nextPost: "下一篇",
    toc: "文章目录",
    specimenSlug: "路径",
    specimenChannel: "分类",
    specimenStatus: "状态",
  },
  photography: {
    badge: "摄影暗房展厅",
    title: "摄影暗房",
    description:
      "Sony A7M4 实拍记录。悬停或聚焦相纸可查看拍摄 EXIF 参数；右上角可切换孔版印刷、蓝晒等显色模式；点击相纸进入全屏灯箱浏览。",
    views: {
      masonry: "流式网格",
      reel: "胶卷横卷",
      immersive: "大图沉浸",
    },
    inkLabel: "显色风格",
    inkModes: {
      true: { label: "原色底片", hint: "真实底片色彩" },
      riso: { label: "孔版双色", hint: "钴蓝与陶土双色印刷" },
      cyano: { label: "经典蓝晒", hint: "青蓝单色影调" },
      halftone: { label: "报刊网点", hint: "单色网点印刷" },
    },
    lightbox: {
      hint: "下拉 120px 关闭 · 滚轮缩放 · ESC 键退出",
      close: "关闭",
    },
    exifProbe: {
      title: "拍摄参数 (EXIF)",
      chemistry: "成像工艺",
    },
  },
  resume: {
    navTitle: "个人履历与经历航线",
    downloadPdf: "下载 PDF",
    printResume: "打印简历",
    flightPathTitle: "经历航线与工程实录",
    flightPathSubtitle:
      "吕子正 — 工程师与视觉记录者。从南洋理工大学本科到字节跳动的十二帧工程历程。",
    timelineAct0: "序章 · 显影 — 35mm 胶片入水显影",
    capabilityTitle: "工程能力维度",
    screenOnly: "交互浏览 · 仅屏幕展示",
    footerNote:
      "数据来源 docs/CAREER_DOSSIER.md · lib/career-dossier.ts。仅收录已验证事实，待确认指标需经本人核实。",
    employment: "工作经历",
    act4Human: "第四幕 · 个人生活剪影",
    photoRep: "摄影 · 暗房精选",
    lifeBadminton: "生活 · 羽毛球",
    badmintonMatches: "+ 场/年",
    badmintonNote:
      "2023 全年出勤，教练课自 5 月 —— 仍未赢下老板。[VERIFIED:S5]",
    mentorNote: "导师引导 · 拆解工程方法，聚焦关键目标。",
    liveNote: "进行中",
    needsOwnerNote: "[待核实] 公开边界待确认，展示范围可能调整。",
    archTitle: "架构蓝图",
    dimensions: {
      platform: {
        title: "架构底座",
        summary: "API 网关 PaaS、可观测性与发布工程：让平台成为稳定可靠的基础设施。",
      },
      frontend: {
        title: "复杂前端",
        summary: "出版级排版与物理动效交互：把工程能力具象化为流畅直观的界面。",
      },
      pipeline: {
        title: "算法管道",
        summary: "离线编排与在线服务的双轨治理：通过精细化调度提升资源利用率。",
      },
      effectiveness: {
        title: "工程效能",
        summary: "高可用保障与自动化提效：将线上排障经验沉淀为自动防御的系统能力。",
      },
    },
  },
  status: {
    navTitle: "系统状态与边缘探针控制台",
    escHint: "ESC 键返回",
    telemetryLabel: "系统遥测 · 01°20′N 103°49′E",
    title: "系统运行状态",
    subtitle:
      "边缘网络运行状态、交付物版本与架构门禁健康度。健康检查接口：/api/health。",
    operational: "运行正常",
    reprobe: "重新探测 ↻",
    cards: {
      pulse: { eyebrow: "SYSTEM PULSE", title: "实时运行状态" },
      artifacts: { eyebrow: "ATELIER ARTIFACTS", title: "版本与构建交付物" },
      gates: { eyebrow: "ARCHITECTURE & GATES", title: "架构门禁与自动化健康" },
    },
  },
  footer: {
    connect: "社交平台",
    copyright: "吕子正",
    darkroomChamber: "摄影暗房",
    printAtelier: "数字暗房与物料工坊",
    posts: "文章归档",
    resume: "个人履历",
    status: "系统状态",
    pdf: "PDF 下载",
  },
  products: {
    title: "产品与项目",
    subtitle: "工作之余的独立产品实验 · 策展式展台",
    deckHint: "一屏一产品 · 滑动或使用方向键翻页",
    scrollDown: "向下滑动查看下一款产品 ↓",
    externalLink: "官方外链",
    status: "状态章",
  },
};
