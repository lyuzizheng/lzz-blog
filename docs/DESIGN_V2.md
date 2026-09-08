# LZZ Blog 视觉语言 v2（定稿 · 2026-09-05 grill Q1–Q10 全锁）

> **状态**：定稿，可实施。替代 `docs/DESIGN.md` 的色彩 / 排印 / 动效 / IA 章节；暗房隐喻保留，执行方式以本文件为准。
> **范围**：整站视觉语言，**文章阅读页是主战场**（自由滚动例外），其次列表页，最后首页向 BRAWUKA-57 对齐。
> **方法论来源**：`mono-color` skill `design-system/` catalogs（colors / typography / compositions / rhythm / imperfections / carriers）的 Web 转写。
> **Grill 存档**：Q1–Q7 全 A + 三修正；Q8 原锁 4 子页，现追加 Weekly Records 为第 5 子页；Q9 六项全按推荐；Q10 锁 **A**。详见 §10。

---

## 1. 七宗 AI 味病灶 → 新语言对照

| # | 病灶（main 分支证据） | 新语言（一句话） | 落点 |
|---|---|---|---|
| 1 | `SiteHeader`：`sticky + bg-substrate/85 + backdrop-blur-md` 毛玻璃；`border-white/10` 无对比级 | Q10-A：删全局 chrome，换**屏内眉脚**（本屏 eyebrow + Colophon 终屏），必留昼夜点 / 索引 / 语义 nav | §7.4 |
| 2 | 三段式八股 Landing：Hero + Bento 图标墙（Compass/Sparkles/Layers）+ Tokens 色板验证区 | 首页为单屏工作台 + 五枚章节胶片；禁图标墙，入口用 35mm 负片散落 | §7.1 |
| 3 | Tokens 色板、`SPECIMEN 2026-N1` 徽章直接上首页 | telemetry 三合法位置：屏内眉题数据条、图片 caption、Colophon 寄存器；余者皆 bug | §5.6 |
| 4 | `SpotlightCard` 光晕、`MagneticButton` 磁吸、全页过渡，与业务状态零绑定 | Q9⑥：三件套删除；动效只绑定阅读进度 / 章节位置 / 主题切换（加码项亦须绑定状态） | §6 |
| 5 | Display 巨大 / 正文极小两档跳跃，字重 400/600，全站无衬线 | 文学衬线正文（Noto Serif SC 锁定）+ 5 档字阶 + 字重呼吸（与阅读位置绑定） | §4, §5.1 |
| 6 | shadcn 默认骨架：`rounded-lg` + `Card` 堆叠 | 圆角只留 `0px` / `2px` 两档；导航卡片改档案条目（规则线 + 序号） | §5.7 |
| 7 | 窄栏列表仍是"UI 界面"思维：无旁注、无呼吸 | **左侧**旁注栏（`<Aside>`）+ 跨栏引言 + 脚注清单，即"作者化质感"的全部定义 | §5.3 |

---

## 2. 三枚锚

### 锚 A — 纸媒装帧
- 非对称网格：**左侧**旁注栏（12–14rem）+ 正文栏（max 40rem），左对齐一条不可见线；`xl` 以下旁注收进正文折叠块（栏外 gutter 只在 80rem+ 展开，保证 40rem 行宽不断裂）。
- 页边距 5%–9%，空纸感 25%–55%（release zone = 旁注栏 + 章间空）。
- 跨栏引言（standfirst）：标题下 1.25–1.4× 衬线引言，可跨旁注+正文两栏，全页唯一大字呼吸口。
- 章节序号随视线流动：`§01 / §02`  hanging numerals 出现在栏外（正文左侧 / 旁注侧），不挤占行首。

### 锚 B — mono-color 印刷
- 纸感基底 Q1 锁：`#F5F1E8`（`substrate_pale_beige`，温润方向）。
- 单专色 Q9①锁：钴蓝 `#2148B8`（`ink_cobalt`）。陶土橙降级为**封面套印副板**（仅封面图 / 档案编号可用，正文 chrome 禁用）。
- SVG Noise 3%–5% 全站一层（`film-grain-overlay`，锁死上限 5%，禁第二层；加码的 shader 底噪与此同层合并，不得另起覆盖层）。
- 正文章节禁用一切 `mix-blend-mode`（封面 / 编号除外）。

### 锚 C — 信息密度
- 正文 `1.0625–1.125rem / 1.7–1.8`，段间距 `0.9em`；规则线三级（faint / default / strong）区分层级，不用阴影。
- 眉题日期 / 字数 / 时长 / 标签收进**一条** telemetry 行，不做徽章云。

---

## 3. 色彩

| 模式 | token | 值 | 说明 |
|---|---|---|---|
| day 纸面 | `--bg-substrate` | `#F5F1E8` | Q1 锁：Pale Beige |
| day 衬底 | `--bg-surface / --bg-chamber` | `#EEE6D3 / #E5D9BE` | 纸面同色相加深 |
| day 专色 | `--ink-dominant` | `#2148B8` | Q9①锁：单专色 |
| day 正文墨 | `--text-primary` | `#26241E` | 暖炭 carry 长文本（chromatic + black 分支） |
| night 极夜 | `--bg-substrate` | `#100F0E` | 暖炭（Q9②） |
| night 槽体 | `--bg-surface / --bg-chamber` | `#171512 / #1E1A17` | 同色相加深 |
| night 专色变体 | `--ink-dominant` | `#E05454` | Q9②接受：同色相不同浓度，不算破戒 |
| night 正文光 | `--text-primary` | `#F3E8D6` | 磷光奶白 |

专色配额（complementary duotone 转写）：专色只出现在链接、当前章节号、进度线、脚注序号、徽章描边；标题字骨一律正文墨。专色面积 <30%。

### 禁止清单（出现即打回）
1. 紫青渐变、2. `bg-clip-text`、3. 发光边框、4. 纯黑 `#000` 背景、5. 毛玻璃导航、6. 第二种点缀色（**特赦**：Q9⑤，telemetry `STATUS` 一词可用 emerald）、7. 正文区混合模式。

---

## 4. 字体（Q9③锁：Noto Serif SC）

| 角色 | 家族（西文 / 中文） | 用途 |
|---|---|---|
| 正文衬线 | `Newsreader, Source Serif 4, Georgia, Noto Serif SC, Songti SC, serif` | 正文、引言、引用、caption |
| Display | 同上（optical-size 拉大 + weight 拉高，不另起 grotesk） | 标题、章节标题 |
| UI 无衬线 | `Geist, Inter` / `Noto Sans SC` | 导航、按钮、chrome（禁长正文） |
| Telemetry Mono | `Geist Mono, JetBrains Mono` + `tabular-nums` | 数据条、序号、caption |

### 字重呼吸（加码项，与状态绑定）
- 可变字重；正文常态 450–500，**当前阅读段落**（视口中央，IntersectionObserver）升至 550，200ms 过渡。
- 禁生硬缩放：禁 `scale-105`、禁整段字号跳变；只许 wght / opsz 连续微动。
- 熔断：`prefers-reduced-motion` 时 JS 侧 `useReducedMotion` 关闭呼吸，CSS 门禁保留。

---

## 5. 文章视觉语言（主战场）

### 5.1 字阶（5 档，标题 : Micro ≈ 5–8×）
Display `clamp(2.5rem,5vw,4rem)/1.08` ｜ Standfirst 1.25–1.4× body ｜ H2 `1.5rem/1.3` ｜ Body `1.0625–1.125rem/1.75` ｜ Micro `0.75rem` Mono +0.08em。

### 5.2 网格与间距
`[左旁注 12–14rem] [正文 minmax(0,40rem)]`；章间 3.5rem / 节间 2rem / 段间 0.9em；`xl` 以下单栏。

### 5.3 引言 / 旁注 / 脚注
- 引言：`post.summary` 渲染为跨栏衬线 standfirst。
- 旁注：Q9④锁 **MDX `<Aside>` 组件放左侧**；内容限定译名 / 年份 / 人名 / 定义；小屏自动收进正文折叠块。
- 脚注：页底清单 + 回指（现行机制保留；弹窗不做——长文可打印性优先）。
- 外链 hover 显示一行域名 preview（`data-domain`，CSS only）；站内链无 preview。

### 5.4 代码块
Shiki 双主题保留；1px 实线规则，**圆角 0**，标题栏只留语言名 + 复制；`0.8125rem/1.6`，超长行横向滚不换行。

### 5.5 图片与 caption
无圆角、无阴影、1px 规则线框；caption Mono 一行：`FIG.01 — 说明 · 机身 · 焦段`；`HALFTONE / TRUE` 切换保留，默认 TRUE。

### 5.6 进度 × 章节指示器（融合，禁独立色条）
TOC 改为**章节序号 rail**：每节一行 `§01 标题 ·· %`，当前节序号染专色 + 2px 专色竖线随滚动伸长（即进度）。移动端收成眉题一行 `§02/07 · 42%`。复用既有 IntersectionObserver，不另起监听。

### 5.7 档案条目（替代圆角卡片）
上 / 下篇、标签行改用 1px 顶线规则 + Mono 小字 + 衬线标题；圆角只留 `0px`（引用 / 代码 / 图框）与 `2px`（徽章 / 按钮）。

### 5.8 兜底状态
超长标题两行 clamp ｜ 空标签不渲染标签行 ｜ 无封面用 type-led 题名区（禁灰占位图）｜ 短文无 TOC 时侧栏只留 telemetry 档案条 ｜ 代码 / 公式渲染失败行内小字 + warn，不打断正文 ｜ 404 一句人话 + 返回链。

---

## 6. 动效物理

```ts
snappy:        { stiffness: 450, damping: 30, mass: 0.8 }  // 开关、折叠、TOC 当前节指示
trayFloat:     { stiffness: 220, damping: 24, mass: 1.2 }  // Lightbox 抛物线 dismiss
dossierDrawer: { stiffness: 300, damping: 32, mass: 1.0 }  // 旁注折叠、移动端抽屉
```

- Q9⑥：`cursorTrack` / `SpotlightCard` / `MagneticButton` **删除**；`RouteTransition` 整页遮罩**删除**（只留滚动复位）。
- 加码（均与状态绑定）：scroll 显影（名字 / 胶片帧 stagger 只在首页封面）、字重呼吸（§4）、grain 底噪（单层）。
- 三禁令不变：禁全页 fade-in slide-up、禁无差别 `scale-105`、禁与状态无关的光晕跟随。
- 触感只给两处：暗色切换 0.15s 微暗遮罩、折叠 snappy 进出。

---

## 7. IA（Q8 锁，`/now` 以毙案为准删除）

### 7.1 首页 = 封面 + 目录，3 屏封顶

> **BRAWUKA-78 推翻（2026-09-06 创始人新方向）**：本节三屏 deck 作废。首页改为**单屏无滚动暗房工作台**（`100dvh`，无 Slide 2/3）：中央身份卡片（avatar + 名字 + 一句话 + 社交链接行）+ 四枚 35mm 负片叠放，点击 spring 散落为 Blogs/Career/Photography/Projects 四入口，Esc/点空白收拢；reduced-motion 静态规整排布。屏内眉脚（§7.4）契约保留。
>
> **BRAWUKA-83 迭代（2026-09-06 创始人反馈）**：取消"叠放 → 点击散落"状态机——章节胶片**常驻散落**、各自直接是链接（保留 hover 回正上浮 + 显影、idle 呼吸）；工作台下半区新增**模糊底片堆层**（6~8 张无标签负片，低透明度 + `blur(1.5px)`，纯装饰 pointer-events:none）；背景层追加**工作台 SVG 蚀刻**（灯箱台面、刻度尺、套准标记、胶片罐、放大镜——1px 发丝单线族）。
>
> **BRAWUKA-86 迭代（2026-09-06 创始人反馈）**：视觉构图二次精调——背景大方形透光台/标尺线框上移框选头像与身份信息，形成一体化的大暗房画幅容器；移除头像上独立加的四个小取景角标框；移除背景中散落堆叠的虚化底片层（`PileFrame`），核心章节胶片常驻散落，回归克制高级的极简物料美学。
>
> **Weekly Records 迭代（2026-09-07）**：主页追加第 5 枚 `Weekly Records` 胶片，保持最后一个 DOM / 导航 / 数字键入口（键位 1–5）；移动端五枚胶片按 **2 / 1 / 2** 自然排布并轻微压边，标题留在内框画面中：Career 左上、Blogs 右上、Photography 左上、Projects 左下、Records 右下；桌面端沿工作台横向散落，标题位置为 Blogs 左上、Career 右下、Photography 左上、Projects 左下、Records 右下。该页见 §7.3.1。
- 移动端主页画幅从垂直居中改为距顶 `5rem` 起排，减少顶部空场并保留呼吸感；`sm` 及以上仍保持居中构图。
- Slide 1 封面：纸底 → 名字显影 → 3 帧胶片 stagger（load 序列，reduced-motion 下直接呈现）。
- Slide 2 子页索引：四入口**散落叠放**（overprint collage：一大一小一窄条一章戳，压边 8–16px）；SVG 修饰只许**一个**细线 gesture 家族（钴蓝 1px）。
- Slide 3 Colophon 终屏（见 §7.4）。
- 移动端：入视口自动显影，**禁纯 hover 交互**。

### 7.2 五子页
`Writings / Darkroom / Flight / Products / Weekly Records` 独立页。Writings 与 Weekly Records 内容自由滚动（deck 例外）。

`/posts`、文章阅读页、`/resume` 舞台与 `/weekly-records` 共用 `max-w-5xl` 内容画幅；header 与正文处于同一窄画幅，宽屏两侧保留明确留白，背景纸面可满屏但信息层不得铺满视口。

> **BRAWUKA-85 迭代（2026-09-06 创始人方向）**：`/posts` 视觉形态定为**编辑部目录式列表（The Archive Reading Room）**——刊头一行收束（衬线大字「Blogs / 文章」+ 单行 mono telemetry `N DISPATCHES · YYYY—YYYY`）；按年分组平铺目录行（1px hairline 分隔、tabular mono `MM-DD` 日期、衬线标题、纯文本 `#tag`、阅读时长），年份以超大衬线数字作**静态**章节锚；hover 行标题 `translate-x-1` 缩进并转钴蓝，桌面端光标侧浮现接触印相微缩图（`pointer-events-none`，无封面不浮现）；过滤收敛为一行 mono 工具行（ALL / STUDY / ESSAY 下划线指示、无框 hairline 搜索、纯文本标签钴蓝选中态）。红线：零卡片、零图标墙（lucide ≤ 1）、零 `backdrop-blur`、零阴影上浮。`DESIGN.md` 1.2.2「出版物物料库」一条自此作废。
>
> **BRAWUKA-85 二轮迭代（2026-09-06 创始人 14:32 原话定稿）**：①刊头直白为 **Posts & Thoughts**（中英同文，无任何副标题/徽章）；②文章链路眉脚改为**主页同款极简 header**——左 `Lzz-Blog` 品牌链；桌面中央保留 mini 长方形胶片 section 导航（01 BLOGS / 02 CAREER / 03 PHOTO / 04 PROJECTS / 05 RECORDS，当前板块高亮，`rounded-[2px]`，active 胶片带 `--shadow-plate` 物料投影）；移动端收束为 44px 菜单按钮，展开后显示五个完整编号与名称，并支持选中、点外部或 `Esc` 关闭；右端保留语言/昼夜开关。§7.4 屏内眉脚在文章链路自此退役（Colophon 保留）；③列表改**单列垂直时间线**（左 1px 发丝轴线 + 年份菱形锚点，倒序），行级滚动显影用 framer-motion `whileInView`（`once`、y+12、0.3s easeOut，`useReducedMotion` 下直出）——§6 三禁令之「禁 fade-in slide-up」在此由创始人点名特赦为小幅度滚动小动画；④阅读页排版升级：分类/标签改纯文本 `[CATEGORY] / #tag`，摘要改侧规线 standfirst（**禁 italic**：Noto Serif SC 无真斜体，CJK 会被合成伪斜体），Display 标题放宽为 `clamp(2.25rem,4.5vw,3.75rem)/1.18`（§5.1 字阶对长中文标题的舒适性豁免）。
>
> **BRAWUKA-85 三轮迭代（2026-09-06 创始人 14:56 原话定稿）**：单行纯文字「太简约、看不出内容」——列表行升级为**编辑部大卡片**（保留时间线轴线与年份菱形锚点）：每卡 = Cover Photo（移动端 `aspect-[16/10]` 起、桌面 `lg:w-[40%]` 左图右文；无封面文章用 `--halftone-dot-color` 半色调暗房 specimen 版画代替，禁灰占位图）+ 衬线大标题（hover 转钴蓝 + `translate-x-1`）+ 多行摘要（`line-clamp-3`）+ hairline 卡脚（标签小章 + 阅读时长）。卡壳规范：`rounded-[4px]`（大画幅容器沿用主页透光台 4px 先例，小元素仍锁 0/2px）、hairline 描边、hover 仅描边转专色 + 封面图罩内 `scale-[1.03]`（图在罩内缩放，卡身不上浮不投影）。「零卡片」红线自此作废，「零 hover 上浮 / 零毛玻璃 / 零图标墙 / 零 rounded-xl」红线不变。

### 7.3 Products（一屏一产品，不展开架构）
- 只收工作之外：`CoffeeMode`（开发中 · 找咖指南）、`CanCan`（开发中 · 网站已上线 · 财务证据库 + 对账台）、`Our Village`（已上线 · 社区成员系统）。
- 每屏一句话 + 状态章 + 外链。状态词不对创始人只回三个词即改。

### 7.3.1 Weekly Records（自然滚动时间线）
- `/weekly-records` 采用自然纵向滚动，不进入一屏一 section 的 deck 模型。
- 页面以横向 **Personal / Work** tabs 共用同一内容位置，Work 默认选中；切换时旧时间线淡出、新时间线淡入，不再纵向堆放两个大区，并尊重 reduced-motion。
- Personal 由站点所有者维护，自动化与 agents 只允许更新 Work 数据。
- 每组记录按周倒序，每周以发丝时间轴、日期区间、At a glance、主题化摘要与 Calendar coverage 组成；禁止重复的仪表板卡片与敏感业务细节。
- 历史记录从 Confluence Weekly Record 迁入；后续更新追加到 `lib/weekly-records.ts` 顶部，并保持公开可读、数字可核验、关联工作合并叙述。

### 7.4 Q10-A（全锁）：删全局 chrome，换屏内眉脚
- 文章 / 列表页不再用全局 sticky header + footer：本屏 eyebrow（索引回链 + 章节 + 语言切换 + 昼夜点）与屏内 foot（Colophon 一行）代替。
- 必留：**语言切换键（中/EN，与 nightmode 昼夜点并排眉脚右端，创始人硬性要求；`LanguageSwitch` 逻辑复用只换皮）**、昼夜切换点、索引入口、语义 `nav`。其余页迁移随各单跟进，本单只改文章链路。

---

## 8. 策展 deck 模型与 scroll-jacking 风控

- 例外：文章列表 / 内容自由滚；摄影 = 全屏拖拽地图 + visited pins。
- 其余页一屏一 section，scroll 为翻页信号；resume 时间线每段生涯一屏 + `FRAME` 帧号 + J/K/Arrow 定帧 + `#slide` 深链。
- 风控（V2 强制）：翻页动画 600ms 内**可打断**（wheel / touch / key 即接管）；不锁 `body` scroll（用 Lenis 接管 + 中断恢复）；URL `#slide` 双向同步（返回可深链）；`prefers-reduced-motion` 与移动端退化为普通堆叠。
- Deck 容器与 resume 时间线属 BRAWUKA-57 / 摄影单，本文件只定契约，不定实现。

---

## 9. 实施顺序与门禁

1. 文章详情页（本单已实施，见 §5–§6）。
2. 列表页 `/posts`（本单已实施：眉脚 + 衬线题名，deck 例外自由滚）。
3. 首页向 BRAWUKA-57 对齐（tokens 自动生效；结构归 57）。
4. 门禁：`pnpm typecheck` + `pnpm build` + `pnpm test`；自查：§3 禁止清单 7 项 + §6 三禁令逐项打勾。

---

## 10. Grill 决议存档（创始人 2026-09-05）

- Q1：纸 `#F5F1E8`（温润方向）。
- Q1–Q7：全 A（以 Phase 1 草案提案为准），加三修正：①旁注放**左侧**；②动画加码（spring + scroll 显影 + 字重呼吸 + grain/shader 底噪，均与状态绑定，三禁令不变）；③滚动模型（列表 / 内容正常滚、摄影拖拽地图 + visited pins、其余一屏一 section）。
- Deck 追加：策展翻页 + resume 单生涯一屏 + FRAME/J/K/`#slide` + 风控（§8）。
- Q8：原 4 子页追加 Weekly Records 为第 5 子页；主页以五枚章节胶片承载入口，Products 文案三句（§7.3）。
- Q9：①钴蓝维持 ②night `#E05454` 接受 ③Noto Serif SC ④`<Aside>` ⑤emerald 特赦（STATUS 一词）⑥三件套删；§7 `/now` 删除。
- Q10：锁 **A**（删全局 chrome，换屏内眉脚 + Colophon 终屏）。
