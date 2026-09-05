# LZZ Blog 视觉语言 v2（DESIGN_V2 草案 · 待 grill 定稿）

> **状态**：Phase 1 草案，未定稿。grill 通过前不进入实现（BRAWUKA-61）。
> **范围**：整站视觉语言，**文章阅读页是主战场**，其次列表页，最后首页向 BRAWUKA-57 对齐。
> **与旧版关系**：本文件定稿后替代 `docs/DESIGN.md` 的色彩 / 排印 / 动效章节；暗房隐喻保留，执行方式重写。
> **方法论来源**：`mono-color` skill `design-system/` catalogs（colors / typography / compositions / rhythm / imperfections / carriers）。印刷海报语法转写为 Web 可执行规则，而非直译。

---

## 0. 一句话总纲

**纸感基底 + 一种专色 + 文学衬线正文 + 非对称编辑网格 + 恰好一个手工干预。**

其余一切（毛玻璃、渐变、Bento 图标墙、光标光晕）都是 AI 味，删。

---

## 1. 七宗 AI 味病灶 → 新语言对照

| # | 病灶（main 分支证据） | 新语言（一句话） | 落点章节 |
|---|---|---|---|
| 1 | 仿 Linear/Vercel：`SiteHeader` 用 `sticky + bg-substrate/85 + backdrop-blur-md` 毛玻璃；`#0D0E11` + `border-white/10` 半透明细边框，无对比级 | 导航去毛玻璃化：实色纸面 + **1px 实线规则**（`--rule`），滚动时只有一条顶线变专色，不做模糊浮层 | §3, §5.6 |
| 2 | 三段式八股 Landing：Hero 显影盘 + 3 列 Bento（`SpotlightCard` ×3，Compass/Sparkles/Layers 图标）+ Tokens 色板验证区 | 首页结构归 BRAWUKA-57；本单只规定：**禁图标墙**，特性入口用编号列表（01/02/03 + 一句话），配一枚跨栏引言 | §7 |
| 3 | 视觉填充：Tokens 色板、`ARCHETYPE // SPECIMEN 2026-N1` 遥测徽章直接上首页 | telemetry 只出现在三个合法位置：文章眉题数据条、图片 caption 行、footer 栈寄存器。其他位置出现即 bug | §5.6 |
| 4 | 虚浮动效：`SpotlightCard` 光标光晕、`MagneticButton` 无差别磁吸、全页过渡，与业务状态零绑定 | 动效只允许绑定三件事：**阅读进度、章节位置、主题切换**。其余全部删除（清单见 §6.3） | §6 |
| 5 | 排版空洞：Display 巨大 / 正文极小两档跳跃，间距机械均匀，字重只有 400/600，全站 Inter/Geist 无文学衬线 | 正文换文学衬线（§4），字阶 5 档连续（§5.1），字重至少 4 档且随滚动呼吸（§4.3），模块间距三档不等距（§5.2） | §4, §5 |
| 6 | shadcn 默认骨架：`rounded-lg` 卡片 + `Card/CardHeader/CardTitle` 原样堆叠 | 全站圆角只留两档：`0px`（规则、引用、代码）与 `2px`（徽章、按钮）。卡片改用**规则线 + 序号**的档案条目，不用圆角容器 | §5.7 |
| 7 | 中间态（`agent/motion-ui/minimal-blog-homepage` 窄栏列表）仍是"UI 界面"思维：无编辑风排印、无旁注、无字重呼吸 | 文章页引入跨栏引言、侧边旁注（Marginalia）、脚注折叠三件套（§5.3–5.4），这就是"作者化质感"的全部定义 | §5 |

---

## 2. 三枚锚（禁谈"高级一点"，只谈锚）

### 锚 A — 纸媒装帧（print editorial）
- 非对称网格：正文栏左对齐一条不可见线，右侧旁注栏宽度 = 正文栏的 ~40%，`lg` 以上才出现，小屏收进折叠。
- 极宽外边距：页边距 5%–9%（catalog: compositions 外边距规则），正文最大宽度 **38–42rem**（66–72 字符/行），不许 `max-w-6xl` 通栏 prose。
- 跨栏引言（standfirst）：标题下方一条 1.25–1.4 倍字号的衬线引言，可跨正文+旁注两栏，是全页唯一的"大字呼吸口"。
- 侧边旁注（Marginalia）：定义、译名、年份、人名注释放右侧栏，随滚动与正文段落对齐，不是脚注的复制。
- 章节序号随视线流动：`§01 / §02` 序号出现在栏外左侧（hanging numerals），而不是标题前面挤占行首。

### 锚 B — mono-color 印刷（single-spot discipline）
- 纸感基底：day `#FAFAF7`（`substrate_neutral_white`），night `#0D0E11`（延续旧版极夜，见 §3.2）。
- **仅一种专色**作聚焦点，见 §3 专色决议（grill 项）。
- SVG Noise 3%–5% 全站一层（旧版 `film-grain-overlay` 保留，透明度锁死上限 5%，禁叠加第二层）。
- 双色叠印（`multiply / screen`）只允许出现在封面图与档案编号上，正文区禁用一切混合模式。

### 锚 C — 信息密度（Stripe + GitHub）
- 文章页敢排密：正文 `1.0625–1.125rem / 1.7–1.8`，段间距 `0.9em`，list 项 `0.4em`；拒绝"标题巨大、正文极小、间距均匀"。
- GitHub 式边框对比：规则线分三级（`--rule-faint / --rule / --rule-strong`），上下游关系用线宽区分，不用阴影区分。
- Stripe 式致密数据条：文章眉题的日期/字数/阅读时长/标签收进**一条** telemetry 行，不做徽章云。

---

## 3. 色彩：纸 + 一专色 + 禁止清单

### 3.1 基底（substrate，不计为油墨）
| 模式 | token | 值 | 来源 |
|---|---|---|---|
| day 纸面 | `--bg-substrate` | `#FAFAF7` | `substrate_neutral_white` |
| day 槽体/衬底 | `--bg-chamber` | `#E9E9E5` | `substrate_cool_gray`（旧版保留） |
| night 极夜 | `--bg-substrate` | `#0D0E11` | 旧版延续（mono-color 无暗 substrate，属 Web 转写增补） |
| night 槽体 | `--bg-chamber` | `#14151B` | 旧版保留 |

### 3.2 专色决议（grill 项，本文推荐 **酒红 Oxblood `#8F3434`**）
- **推荐**：酒红 `#8F3434`（`ink_oxblood`；catalog 用途：bookstores, archive —— 正是长阅读）。
- 备选：钴蓝 `#2148B8`（`ink_cobalt`，知识/城市）、陶土橙 `#C65F38`（`ink_terracotta`，旅行/食物，太活泼）。
- 不推荐钴蓝的理由：它是"AI 科技蓝"重灾区，且旧版已用两年，换酒红即换气质；酒红在纸面与极夜上都可用同一色相（night 提亮为 `#E05454` 前景变体，色相不变，属同一印版的不同浓度——catalog 允许的 density 变化，不算第二墨）。
- 专色配额（catalog complementary duotone：dominant 70–85% / accent 15–30%，转写为 Web）：专色只出现在**链接、当前章节号、进度线、引言首字下沉（如用）、脚注序号、徽章描边**六处；正文、标题字骨一律 ink（day `#1A1A18` 碳黑，night `#F3E8D6` 磷光奶白）。专色面积永远 <30%。
- charcoal 承担长文本：对应 catalog `chromatic + black` 分支（chromatic 板 carry 图像/强调，carbon/charcoal carry 长文本与精密标签）——这是"阅读页是主战场"的色彩学依据。

### 3.3 禁止清单（出现即视为回归 AI 味，直接打回）
1. 禁紫青渐变（任何 `from-violet / via-cyan / to-blue` 与等价物）。
2. 禁 `bg-clip-text` 渐变字。
3. 禁发光边框（`box-shadow` 带颜色辉光、`shadow-elevated` 有色版本）。
4. 禁纯黑 `#000` 背景（night 基底只能是 `#0D0E11`）。
5. 禁毛玻璃导航（`backdrop-blur` + 半透明底色的 sticky header 组合）。
6. 禁第二种、第三种点缀色（`text-emerald-500` 之类的状态色只允许在 telemetry 的 STATUS 一词上，且 grill 复议）。
7. 禁正文区 `mix-blend-mode`（封面/编号除外）。

---

## 4. 字体：文学衬线正文 + Display + Mono 三元组

映射 catalog `type_literary`（display: characterful serif; support: small grotesk or mono; scale 6:1–12:1，Web 转写放宽见 §5.1）。

| 角色 | 家族（西文 / 中文） | 用途 |
|---|---|---|
| 正文衬线 | `Newsreader, Source Serif 4, Georgia, serif` / `Noto Serif SC, Songti SC, serif` | 文章正文、引言、引用、caption |
| Display | 同正文衬线， optical-size 拉大 + weight 拉高（同一家族，不另起 grotesk 标题） | 文章标题、章节标题、列表页标题 |
| UI 无衬线 | `Geist, Inter, system-ui` / `Noto Sans SC` | 导航、按钮、标签、数据条之外的 chrome |
| Telemetry Mono | `Geist Mono, JetBrains Mono, monospace` + `tabular-nums` | 眉题数据条、EXIF、序号、footer 寄存器 |

要点：
- **标题与正文同一衬线家族**：标题是正文的"放大 + 加重"，不是另一个字体。这是文学质感与"三件套 Inter"划清界限的核心动作。
- 中文：正文必须有宋体（Noto Serif SC / Songti SC）fallback 链；禁全站只有黑体（Noto Sans SC 只做 UI chrome）。
- Mono 只做数据与序号，**禁 Mono 长正文**，禁 Mono 做引用。

### 4.1 字重呼吸规则（variable font，只许连续微动）
- 引入可变字重（Newsreader variable + Noto Serif SC 4 档以上静态 fallback）。
- 规则：正文 `450–500` 常态；进入视口中央的段落可升至 `550`（IntersectionObserver 切换 `font-variation-settings: 'wght'`，200ms 过渡）；标题 `600–700`。
- **禁生硬缩放**：不许 `scale-105` hover 放大字；不许整段 `font-size` 跳变；只许 wght/opsz 连续微动。
- 光学尺寸：Display 开 `font-optical-sizing: auto`；正文锁 `opsz 16–20`。

---

## 5. 文章视觉语言（核心交付）

### 5.1 prose 排印 scale（5 档，替代两档跳跃）
| 档 | 字号 | 行高 | 用途 |
|---|---|---|---|
| Display（标题） | `clamp(2.5rem, 5vw, 4rem)` | 1.08 / `-0.015em` | 文章标题，左对齐，允许两行，禁居中 |
| Standfirst（引言） | `1.25–1.4× body` 衬线 italic 或 medium | 1.5 | 跨栏引言，全页唯一大字呼吸口 |
| H2 | `1.5rem` | 1.3 | 章节标题 + 栏外 `§NN` 序号 |
| Body | `1.0625–1.125rem` | 1.75 | 正文，衬线，段间距 `0.9em` |
| Micro | `0.75rem` Mono `+0.08em` tracking | 1.4 | 数据条、caption、序号 |

标题 : Micro ≈ 5–8×（catalog type_literary scale 6:1–12:1 的 Web 落点）。

### 5.2 网格与间距（三档不等距）
- 文章栅格：`[栏外序号 2rem] [正文 minmax(0, 40rem)] [旁注 12–14rem]`，`lg` 以下旁注折叠。
- 留白：章间 `3.5rem` / 节间 `2rem` / 段间 `0.9em`，三档，禁全页统一 `my-4/my-8`。
- 外边距 5%–9%，空纸感 25%–55%（catalog rhythm 转写：release zone = 旁注栏 + 章间空）。

### 5.3 引言 / 旁注 / 脚注
- **引言（standfirst）**：`post.summary` 渲染为跨栏衬线引言，不是"副标题灰字"。
- **旁注（marginalia）**：`lg+` 右栏，随段落对齐；内容限定：译名、年份、人名、定义；实现：MDX 自定义组件 `<Aside>` + 端到端对齐（`data-aside-for`），小屏自动收进正文折叠块。
- **脚注**：沿用 remark 脚注，但在阅读页渲染为**点击弹窗**（popover，复用 dialog），不跳页底；页底保留脚注清单（打印时展开）。
- **链接预览**：外链 hover 显示 title + 域名一行小 preview（CSS only + `data-domain`），站内链接无预览。

### 5.4 代码块
- 沿用 Shiki 双主题；边框改 1px 实线规则，**圆角 0**，行号 Mono tabular，标题栏只留语言名 + 复制按钮（禁多余徽章）。
- 超长行横向滚动，不换行；行高 1.6，字号 `0.8125rem`。

### 5.5 图片与 caption
- 图片无圆角、无阴影，1px 规则线框；caption 为 Mono `0.75rem` 一行：`FIG.01 — 说明 · Sony A7M4 · 35mm`（telemetry 合法位置之二）。
- Mono-color 双色滤镜开关保留（右下小字 `HALFTONE / TRUE` 切换），默认 TRUE（真实底片色）。

### 5.6 阅读进度 × 章节指示器（融合，禁独立进度条）
- **禁止**顶部独立彩色进度条（与状态无关的装饰）。
- 正确做法：TOC 与进度融合为**章节序号 rail**—— sticky 侧栏每节一行 `§01 标题 ··· 页码%`，当前节序号染专色 + 一条 2px 专色竖线随滚动伸长（即进度）。移动端收成顶栏一行 `§02/07 · 42%` Mono 小字，无色条。
- 复用现有 `TableOfContents` 的 IntersectionObserver，只改渲染，不另起滚动监听。

### 5.7 卡片与圆角（替代 shadcn 骨架）
- 圆角只留 `0px`（引用/代码/图片框）与 `2px`（徽章/按钮）。
- 上/下一篇导航、标签列表改用**档案条目**：1px 顶线规则 + `← PREV / NEXT →` Mono 小字 + 衬线标题，不用 `rounded-lg border bg-surface` 容器卡片。

### 5.8 兜底状态（每个组件交代边界，Phase 2 逐个验收）
| 状态 | 规则 |
|---|---|
| 超长标题 | 两行 clamp + 栏外序号不错位；列表页单行省略 + title 属性 |
| 空标签/无标签 | 不渲染标签行（禁"暂无标签"占位字） |
| 无封面 | 渲染 type-led 题名区（大字标题 + 规则线 + telemetry），禁灰色占位图 |
| 无 TOC（短文） | 侧栏只留 telemetry 档案条，不留空 TOC 骨架 |
| 代码高亮失败 | 原样 pre 输出，禁整页报错 |
| 数学/图表渲染失败 | 行内 `[公式未渲染]` 小字 + 控制台 warn，不打断正文 |
| 404/空归档 | 一句人话 + 返回链接（terse human voice：quiet confidence，不用"哎呀页面飞走了"） |

---

## 6. 动效物理

### 6.1 Spring 预设（Motion v12，沿用旧值，收紧用途）
```ts
snappy:        { stiffness: 450, damping: 30, mass: 0.8 }  // 开关、脚注弹窗、TOC 当前节指示
trayFloat:     { stiffness: 220, damping: 24, mass: 1.2 }  // Lightbox 进出（抛物线 dismiss）
dossierDrawer: { stiffness: 300, damping: 32, mass: 1.0 }  // 旁注折叠、移动端 TOC 抽屉
```
`cursorTrack`（光标追踪）**删除**——它就是 SpotlightCard 光晕的引擎。

### 6.2 触感意向（只给两处）
1. 暗色切换：0.15s 全屏微暗遮罩（旧版保留）。
2. 脚注弹窗：snappy spring 进出。
其余一切 hover 位移/磁吸/视差，删。

### 6.3 禁止清单
1. 禁全页 `fade-in slide-up` 入场（首屏文字直接呈现，纸不需要"飞进来"）。
2. 禁无差别 `scale-105` hover。
3. 禁与状态无关的光圈/光晕跟随（删除 `SpotlightCard` 机制）。
4. 禁无差别磁吸按钮（`MagneticButton` 删除或收敛为导航 active 下划线 spring）。
5. 禁整页 route transition 遮罩（只允许主题切换遮罩）。
6. `prefers-reduced-motion`：全部 spring 降级为瞬时切换（旧版 CSS 门禁保留，另加 JS 侧 `useReducedMotion` 熔断 Observer 驱动的字重呼吸）。

---

## 7. 个人数字花园 IA（只定位置，不做内容）

```
/posts          文章索引（双通道 Tech / Life 保留，向 BRAWUKA-57 对齐）
/posts/[slug]   阅读页（本单主战场）
/now            Now Page：独立页，导航占一位；内容以后写，只定路由与题名样式
/fragments      碎片：posts 下的第三通道（短文流，无 TOC、无封面要求）
/ideas          半成品想法区：fragments 的子状态（WIP 徽章 + 免责声明条），不是独立页
```

---

## 8. 与 BRAWUKA-57 的收敛约定

- 57 负责首页**结构**，本单负责全站**视觉语言**；冲突时以本单为准绳（issue 原文）。
- 首页向本单对齐的三条硬约束：纸基底 + 一专色（§3）、标题正文同衬线家族（§4）、禁图标墙改编号列表（§1-2）。

---

## 9. Phase 2 实施顺序（grill 通过后）

1. 文章详情页：`app/posts/[...slug]/page.tsx` + `components/mdx/*` + `components/posts/toc.tsx`（先行）。
2. 列表页 `/posts`。
3. 首页向 57 对齐。
4. 禁止一键生成全页；每组件按 §5.8 兜底表验收。
5. 门禁：`pnpm typecheck` + `pnpm build` + `pnpm test`；附 AI 味自查清单（§3.3 + §6.3 逐项打勾）。

---

## 10. 待 grill 决议（创始人逐条）

1. 专色：酒红 `#8F3434` vs 钴蓝 `#2148B8` vs 陶土橙 `#C65F38`（本文推荐酒红，理由见 §3.2）。
2. night 专色变体 `#E05454` 是否接受（同一色相不同浓度，算不算破"一墨"戒）。
3. 中文字体：Noto Serif SC vs Songti SC 优先链。
4. 旁注实现方式：MDX `<Aside>` 组件 vs 纯 footnote 转写。
5. STATUS 一词的 `emerald-500` 是否特赦保留，还是改专色。
6. `cursorTrack` / `SpotlightCard` / `MagneticButton` 删除是否接受（有无在用页面依赖）。
