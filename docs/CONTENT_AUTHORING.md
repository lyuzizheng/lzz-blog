# LZZ Blog · 创作者发布指南 (Content Authoring)

> 适用分支 `main` · 引擎 Velite + Next.js 15 App Router · 最后验证 BRAWUKA-45。
> 目标读者：站长本人（发帖、加照片、换简历）。全程无需改 TypeScript。

---

## 1. 发一篇博文（3 步）

1. **新建目录**（叶包体例，二选一）：
   - 单文件：`content/posts/essay/my-topic.md` 或 `content/posts/study/my-topic.md`
   - 叶包（带图）：`content/posts/study/my-topic/index.md`，图片与 `index.md` 同目录
2. **写 Frontmatter + 正文**（规范见 §2–§3），图片用相对路径：`![alt](./fig1.png)`
3. **验证并发布**：`pnpm typecheck && pnpm test && pnpm build`
   - 草稿：`draft: true`（不进入列表 / RSS / sitemap，但仍参与解析校验）
   - 去掉 `draft` 即发布。路由自动小写：`/posts/<分类>/<目录名>`

> 文件扩展名固定 `.md`（`velite.config.ts` 的 `pattern: posts/**/*.md`）。
> MDX 组件语法可直接写在 `.md` 里，无需改扩展名。

### 路径与路由规则（`velite.config.ts` transform）

- `path` 去掉 `posts/` 前缀、**全小写**即 slug：`posts/essay/I_hate_IM` → `/posts/essay/i_hate_im`
- 一级目录即 `category`（`essay` / `study`）；叶包再取第二级定位封面与图片
- 相对图片自动重写为 `/posts/<dir>/<file>`，构建时同步进 `public/posts/`（`syncStaticAssets`）
- 图片/封面名后的 `#center` 后缀会被剥离（历史 Hugo 残留，无排版作用）

---

## 2. Frontmatter 字段（以 schema 为准）

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 文章标题 |
| `date` | ✅ | ISO 日期，`"2022-06-07"` 或 `"2019-03-08T10:00:00+08:00"` |
| `author` | 缺省 `Zizheng Lyu` | 署名 |
| `summary` | 推荐 | 列表/卡片摘要；缺省时回退 `description`，再无则为空 |
| `description` | 可选 | SEO 描述（`summary` 的后备） |
| `tags` | 缺省 `[]` | 标签数组，如 `["IM", "思考"]` |
| `categories` | 缺省 `[]` | 分类数组，如 `["随笔"]`（注意：路由 `category` 取自**目录**，此字段仅展示） |
| `cover.image` | 可选 | 封面：`http(s)://…`、`/…` 绝对路径，或叶包内相对文件名（`relative: true`） |
| `cover.alt` / `cover.caption` | 可选 | 无障碍文本 / 图注 |
| `draft` | 缺省 `false` | `true` 即草稿（接受布尔与 `"true"` 字符串） |
| `ShowToc` / `TocOpen` | 可选（保留字段） | 预留，当前文章页尚未消费 |

最小可用头：

```md
---
title: "我的新文章"
date: "2026-09-04"
tags: ["随笔"]
categories: ["随笔"]
summary: "一句话摘要，进列表与 RSS。"
---
```

---

## 3. 正文支持的语法（均已在线验证）

| 能力 | 写法 | 管道 |
|---|---|---|
| 标准 Markdown | 标题 / 引用 / 列表 / 代码块 | Velite `s.mdx()` |
| GFM 表格/删除线/任务列表 | `\| a \| b \|`（库内实测：`study/bigtable`、`study/bytedance_go`） | `remark-gfm` |
| 数学公式 | 行内 `$E=mc^2$`，整块 `$$…$$`（库内实测：`study/gfs`） | `remark-math` + `rehype-katex`（样式已在 `app/globals.css` 全局引入） |
| 原生 HTML / JSX | `<details><summary>…`、`<div>`、`<span>`、`<video>`、`<iframe>` 直接写 | MDX 原生透传（未知小写标签按原生 DOM 渲染，`MdxContent` 只覆写排版标签） |
| Hugo 短代码（历史兼容） | `{{< youtube ID >}}`、`{{< bilibili ID >}}`、`{{< tweet id="…" >}}`、`{{< spotify id="…" >}}`、`{{< notice >}}…{{< /notice >}}`、`{{< math.inline >}}…{{</ math.inline >}}` | `remarkHugoCompatibility` 在解析期改写 |
| 自定义 MDX 组件（推荐新写法） | `<YouTube id="…" />`、`<Bilibili id="…" />`、`<Tweet id="…" />`、`<Spotify id="…" />`、`<Notice type="info">…</Notice>` | `components/mdx/embeds.tsx`，经 `MdxContent` 注入 |
| 标题锚点 | 自动 slug + 链接符 | `rehype-slug` + `rehype-autolink-headings` |
| 代码高亮 | ```围栏代码块，日/夜双主题 | `rehype-pretty-code`（vesper / vitesse-light） |
| `<!--more-->` | 自动剥离，无作用 | 兼容插件 |

### 原生 HTML 注意事项（JSX 规则）

- 标签必须闭合：`<br/>` 而非 `<br>`；属性用 JSX 写法：`className` 而非 `class`，`htmlFor` 而非 `for`
- 块级 HTML 上下各空一行，否则会被当成段落内联内容
- `<iframe>`（如 B 站/YouTube 手写嵌入）需自带 `title` 属性（无障碍门禁）；能用 `<YouTube>`/`<Bilibili>` 时优先用组件（统一样式 + 懒加载）

---

## 4. 暗房加一张照片（无需改 TS）

1. 把成片（推荐 AVIF/WebP）放入 `public/darkroom/`，如 `public/darkroom/sg-night.avif`
2. 在 `content/photos.json` 的 `photos` 数组末尾追加一项（字段校验见 `docs/photos.schema.json`，
   门禁 `scripts/darkroom.check.mjs` 会逐项检查必填与 EXIF 完整性）：

```json
{
  "id": "sg-night-35",
  "title": "狮城夜曲",
  "frame": "FRAME 42",
  "alt": "Singapore river at night, handheld specimen",
  "src": "/darkroom/sg-night.avif",
  "width": 4,
  "height": 3,
  "chemistry": "ILFORD WARMTONE FB · Multigrade 1+9 · 20.5°C",
  "exif": {
    "camera": "Sony A7M4 · ILCE-7M4",
    "lens": "FE 35mm F1.4 GM",
    "focal": "35mm",
    "aperture": "f/1.4",
    "shutter": "1/250s",
    "iso": "ISO 100",
    "takenAt": "2026.09.04 21:30 +08:00",
    "gps": "1°17'N 103°51'E"
  }
}
```

3. `pnpm test && pnpm build`，打开 `/photography` 确认相纸、EXIF 探针、四种油墨模式正常

字段约定：

- `id`：小写 `a-z0-9-`，全局唯一（同时是 SVG 样片的随机种子）
- `width/height`：**真实画幅比**（决定 `aspect-ratio` 占位，Zero CLS 的根基；填错会抖动）
- `src` 缺省 →  deterministic SVG 样片占位（无二进制也可成展）
- `chemistry`：暗房药水行，按既有格式自由写
- `gps` / `ev`：可选
- 想快速录入：把相机回放页抄成 `Sony A7M4 · … · f/1.4 · 1/250s · ISO 100` 一行，
  按 schema 手动拆分字段即可

---

## 5. 换一份简历 PDF

`public/resume.pdf` 即 `/resume` 页【DIRECT DOWNLOAD // 直链下载】与全站页脚
【PDF // 直链下载】的下载源（当前为占位单页）。替换同名文件即可，
无需改代码；文件名保持 `resume.pdf`（下载名由 `download="Zizheng-Lyu-Resume.pdf"` 属性决定）。
【PRINT / PDF // 导出】走 `window.print()` + `@media print` A4 排版，与直链并列为双入口。

---

## 6. 发帖前检查单

```bash
pnpm typecheck   # Velite 解析 + tsc（含 photos.json 类型与路由类型）
pnpm test        # verify-posts / flight-path / darkroom / projects-resume / seo-finish 五道门禁
pnpm lint        # Next.js ESLint
pnpm build       # 全量 SSG（含 27+ 篇历史文章静态生成）
```

常见失败：Frontmatter 缺 `title/date`（schema 报错）；`photos.json` 缺字段或 `width/height` 为 0
（darkroom 门禁逐项点名）；相对图片大小写与磁盘不一致（Linux 构建 404）。
