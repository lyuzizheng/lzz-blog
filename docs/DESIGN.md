# LZZ Blog 设计语言规范 (DESIGN.md)
> **权威最高真理源 (Single Source of Truth) · 2026 Edition**  
> **核心隐喻**：【数字暗房与物料印社】The Digital Darkroom & Print Atelier  
> **架构定位**：极客硬核工程感 × 2026 顶级独立出版物排版美学  
> **责任角色**：LZZ Blog Motion & UI Designer  
> **关联工单**：BRAWUKA-42 (Parent Epic: BRAWUKA-34)

---

## 1. 核心设计宣言与世界观架构 (Manifesto & Metaphor)

### 1.1 物理性与流体动力学的交汇 (Physicality Meets Fluid Dynamics)
LZZ Blog 不再是一个平铺直叙的静态文字载体，而是一间运作在浏览器环境中的**数字暗房与实体物料印社（The Digital Darkroom & Print Atelier）**。
- **物理暗房（The Darkroom）**：隐喻光子沉淀、时间晶体化与潜影显影。每一张照片是光学暴力的温柔记录，每一行工程代码是控制光线的化学药水。
- **物料印社（The Print Atelier）**：摒弃廉价的数码霓虹与虚假渐变。界面基于真实的**自适应纸质基底（Adaptive Substrate）**、**物理油墨叠印（Physical Ink Overprint）**与**粗粒半色调网点（Halftone Dots）**构建。
- **高张力排版（Typographic Tension）**：瑞士国际主义网格，10x 字体尺度阶跃（Editorial Serif 巨幅标题与微观 Tabular Figures 等宽参数并置），以及 35%~45% 呼吸感负空间。

---

## 2. 11 项深度设计决策 Grill 决议收敛矩阵 (Decisions Matrix)

依据 Issue 讨论与创始人核心反馈（`“胶片 + 复古 + monocolor skill，数字暗房方向，且必须具备白天/黑夜双模式”`），对全站 11 大核心体验决策进行终局固化：

| # | 决策维度 | 决议方案 | 核心技术与设计落地规范 |
|---|---|---|---|
| **1** | **首屏第一眼 (The Anchor)** | **【B. 巨幅显影摄影 + A. 粗衬线哲学宣言】复合架构** | 首屏采用显影盘（Developing Tray）物理隐喻。相纸进入药水槽由浅入深显影，配合 Newsreader / Playfair 巨幅 Editorial Serif 标题与 35mm 负片画框，形成极具仪式感的视觉锚点。 |
| **2** | **色彩油墨 (Palette & Inks)** | **【D. 昼夜自适应双模式】(Daylight Atelier + Safelight Darkroom)** | **白天（Day Mode）**：冷白/暖白相纸底色 `#FAFAF7`，双色孔版油墨（深钴蓝 `#2148B8` 80% + 陶土橙 `#C65F38` 20%）。<br>**黑夜（Night Mode）**：黑曜石极夜基底 `#0D0E11`，柯达暗房安全红 `#E54B4B` + 感光磷光奶白 `#F3E8D6`，底片感光负片反转。 |
| **3** | **滚动阻尼 (Scroll Physics)** | **【A. 沉稳机械阻尼 + C. 磁吸段落咬合 (Magnetic Snapping)】** | 全局接入 Lenis 物理平滑滚动（`lerp: 0.08`, `duration: 1.2`）。在摄影暗房展厅与战役时间轴采用 Spring 磁吸卡榫，阻尼停靠感如同机械齿轮咬合。 |
| **4** | **代码 vs 摄影平衡** | **【C. 双面身份全局切换 + B. 自然穿插交织】** | 默认以流式交织叙事呈现主页。顶栏与快捷键 `Cmd+K` / `P` 支持一键切换【全景 View】、【Engineer Mode（代码/架构图优先）】与【Photographer Mode（暗房画廊优先）】。 |
| **5** | **mono-color 渗透深度** | **【B. 全站核心设计 DNA】** | 全站博文封面、技术架构图、插画与摄影均遵循 `mono-color` 单色/双色物理印社语言，杜绝彩色塑料质感，统一半色调网点与物理套印偏差。 |
| **6** | **动效强度边界** | **【C. 桌面满血 120fps + 移动端自适应降级】** | Framer Motion (v12) 弹簧物理引擎驱动。严格遵循 `prefers-reduced-motion` 无障碍降级；桌面端保持 120fps 满血物理惯性，移动端禁用厚重 3D，确保 Zero CLS 与流畅度。 |
| **7** | **感官微反馈** | **【B. 微妙机械键盘与快门音频开关】** | 全局默认静音（Silent by Default）。右上角设触觉/音频拨动开关，开启后在模式切换、按下快门、滚动吸附时触发 20ms 微弱机械快门/拨杆声。 |
| **8** | **时间轴展开维度** | **【B. 横向长卷流 + A. 纵深层层穿透】** | 桌面端呈现水平可滚动的胶片负片航线长卷（Scrubbable Track），支持键盘 `ArrowLeft/Right` 与 `J/K` 快速定帧；移动端自适应平滑折叠为垂直精准时间轴。 |
| **9** | **项目呈现姿态** | **【B. 架构白皮书技术拆解图 + A. 物理印社 Bento Grid】** | 项目卡片具备印社物料展台质感（纸面微浮雕、钢印、裁切刻度），点击触发非破坏性抽屉（Architecture Dossier），以蓝图白皮书形式拆解核心架构。 |
| **10** | **英文字体搭配** | **【B. 社论衬线 + A. 纯等宽极客】** | **Display 标题**：Newsreader / Playfair Display（高反差衬线）；<br>**正文/UI**：Geist / Inter；<br>**精密元数据与 EXIF**：Geist Mono / JetBrains Mono（开启 `tabular-nums`）。 |
| **11** | **移动端适配形态** | **【B. 手势卡片滑动轻量 Zine 杂志】** | 移动端以随身便携出版物（Pocket Zine）为形态，卡片支持单手横划手势与微触觉反馈；摄影展厅支持手势下滑挥动关闭 Lightbox（Drag-to-dismiss）。 |

---

## 3. 昼夜双模式色彩油墨体系 (Dual-Mode Color & Ink System)

本系统将数字化主题切换升华为**从物理印社到安全灯暗房的光学突变**。

```
┌─────────────────────────────────────────────────────────────┐
│                       昼夜模式光学突变                        │
├──────────────────────────────┬──────────────────────────────┤
│  白昼模式：物料印社 (Daylight)  │  夜间模式：安全灯暗房 (Safelight) │
│  Neutral White #FAFAF7       │  Obsidian Carbon #0D0E11     │
│  Cobalt Blue #2148B8 (80%)   │  Safelight Red #E54B4B (75%) │
│  Terracotta #C65F38 (20%)    │  Phosphor Cream #F3E8D6 (25%)│
│  [显影液光泽 · 孔版套印 · 粗网点] │  [暗房柯达红 · 负片反转 · 荧光仪表] │
└──────────────────────────────┴──────────────────────────────┘
```

### 3.1 白昼模式：物料印社 (The Daylight Print Atelier)
- **纸质基底 (Substrate)**：`#FAFAF7` (Neutral White, 纯正冷灰暖白无涂布相纸)。
- **主板油墨 (Dominant Ink - 80%)**：`#2148B8` (Deep Cobalt Blue / 经典理光深钴蓝)。负责承载全站标题字骨、半色调摄影图像网点、网格基线、胶片片齿边框。
- **副板油墨 (Accent Ink - 20%)**：`#C65F38` (Terracotta Orange / 陶土赭红)。负责承载 EXIF 拍摄参数标签、印社火漆钢印、重点强调标记与交互状态指示。
- **次级底衬 (Secondary Neutral)**：`#E9E9E5` (Cool Gray 显影槽与卡片衬底)。
- **物理混合模式 (Overprint)**：`mix-blend-mode: multiply`。两色重叠处呈现深邃近黑的高密度混合色（Dark Indigo `#18224B`），保留真实印刷的双色碰撞感。

### 3.2 夜间模式：安全灯暗房 (The Safelight Darkroom)
- **极夜基底 (Substrate)**：`#0D0E11` (Obsidian Carbon, 吸收光线的深黑曜石)。
- **安全光主墨 (Dominant Ink - 75%)**：`#E54B4B` (Kodak Safelight Red, 650nm 截止红光)。暗房中绝不感光的安全红，负责高张力排版、暗房警示徽标、显影槽边框与关键操作。
- **磷光副墨 (Accent Phosphor - 25%)**：`#F3E8D6` (Luminescent Warm Cream, 仪表弱荧光奶白)。负责长篇技术正文、暗房定时器高亮读数与代码高亮主通道。
- **暗房槽体色 (Chamber Surface)**：`#14151B` 与 `#181920` (暗房显影盘塑料质感)。
- **光学显影算法 (Inverted Halftone)**：在安全灯模式下，摄影作品自动反转为胶片负片（Film Negative）显影状态，高光转为透光底片，阴影浸润在红光之中。

---

## 4. 胶片质感与物理印刷仿真 (Analog Simulation)

### 4.1 物理半色调网点 (Halftone Dot Matrix)
禁止使用无质感的 CSS 平涂渐变。所有摄影渐变与阴影过渡统一使用 SVG/Canvas 半色调网点过滤器：
```css
/* 半色调网点模式 */
.halftone-screen {
  background-image: radial-gradient(
    circle at center,
    var(--ink-dominant) 25%,
    transparent 26%
  );
  background-size: 12px 12px;
}
```

### 4.2 显影液噪点与胶片微粒 (Film Grain & Noise Filter)
全站全局叠加一层微弱、非重复的银盐颗粒噪点，透明度严格控制在 3%~5%：
```svg
<filter id="film-grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" result="noise" />
  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.045 0" in="noise" result="grain" />
  <feBlend mode="multiply" in="SourceGraphic" in2="grain" />
</filter>
```

### 4.3 物理套印微偏差 (Registration Drift)
在非重要元数据（如装饰标线、胶片片齿、展厅色块）上引入 1~1.5mm 的物理套色微偏差，赋予界面温润的手工出版物与活字印刷呼吸感。

---

## 5. 排版学张力与字体阶跃系统 (Typography & Rhythm)

### 5.1 字体家族三元组 (Type Triad)
```
1. Display 标题族      : "Newsreader", "Playfair Display", "Cormorant", serif
2. Body & UI 现代族    : "Geist", "Inter", -apple-system, sans-serif
3. Telemetry 机械元数据: "Geist Mono", "JetBrains Mono", "SF Mono", monospace
```

### 5.2 尺度阶跃 (Scale Ratio 8:1 ~ 16:1)
标题必须敢于巨大，元数据必须绝对严谨克制：
- **Display XXL (Hero Headline)**: `clamp(4.5rem, 9vw, 9.5rem)` / Line-height `0.92` / Letter-spacing `-0.03em`
- **Display XL (Section Title)**: `clamp(2.75rem, 5vw, 5rem)` / Line-height `1.0`
- **Heading 1**: `2.25rem (36px)` / Line-height `1.15`
- **Heading 2**: `1.5rem (24px)` / Line-height `1.25`
- **Body Regular**: `1.0625rem (17px)` / Line-height `1.75` / Font-family `Geist`
- **Micro Telemetry / EXIF**: `0.75rem (12px)` / Line-height `1.4` / Letter-spacing `0.08em` / `font-variant-numeric: tabular-nums`

### 5.3 机械元数据与 EXIF 标准展示规范
所有摄影作品与工程模块必须携带格式严密的等宽仪表元数据：
```text
┌────────────────────────────────────────────────────────────────────────┐
│  OPTICAL APPARATUS   │  Sony A7M4 · ILCE-7M4 · FE 35mm F1.4 GM         │
│  EXPOSURE TRIANGLE   │  f/1.4 · 1/250s · ISO 100 · EV 8.9 · Spot       │
│  DARKROOM CHEMISTRY  │  ILFORD WARMTONE FB · Multigrade 1+9 · 20.5°C   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. 动效物理学与交互引擎规范 (Physics & Motion Engine)

### 6.1 平滑惯性滚动 (Lenis Kinetic Configuration)
采用 `@studio-freight/lenis` 构建具有沉稳机械阻尼的阻尼滚动：
```typescript
export const lenisOptions = {
  lerp: 0.08,             // 阻尼系数：温和沉稳
  duration: 1.2,          // 惯性平滑衰减时间 (秒)
  smoothWheel: true,      // 滚轮平滑插值
  wheelMultiplier: 0.9,   // 滚轮步长缩放
  touchMultiplier: 1.5,   // 触控手势敏锐度
  infinite: false,
};
```

### 6.2 弹簧物理预设 (Spring Physics Curve by Motion v12)
严禁使用没有物理回弹的线性 CSS `linear` 或简单 `ease-in-out`：
```typescript
export const springPresets = {
  // 紧致机械拨杆（开关、小按钮、指示器）
  snappy: { stiffness: 450, damping: 30, mass: 0.8 },
  // 显影浮动（相纸进入托盘、卡片悬浮）
  trayFloat: { stiffness: 220, damping: 24, mass: 1.2 },
  // 视差与光标聚光追逐 (Cursor follow)
  cursorTrack: { stiffness: 150, damping: 18, mass: 0.6 },
  // 抽屉展开与大弹窗
  dossierDrawer: { stiffness: 300, damping: 32, mass: 1.0 },
};
```

### 6.3 交互微动力学原型
1. **磁吸按键 (Magnetic Buttons)**：指针靠近按钮 30px 半径时，按钮中心产生与指针坐标成比例的 Spring 偏移动力（吸引力衰减因子 `0.35`），指针离去后平滑弹回原位。
2. **聚光卡片 (Spotlight Cursor Card)**：卡片背面根据光标实时计算径向漫反射光斑（白天为钴蓝冷光散射，夜间为 650nm 柯达安全红光晕）。
3. **显影托盘 Hero 交互**：首屏加载与下滚时，相纸在暗房液体波纹中产生 `rotateX(4deg) translateY(0)` 的轻微三维入水浮动与透明度冲印显影动效。
4. **无障碍强制守则**：
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

---

## 7. 核心交互模块深度设计 (Component Archetypes)

### 7.1 首屏显影相纸 (The Developing Tray Hero)
- **视觉构图**：页面顶部为物料印社元数据标尺与装订线，中央是 3:4 或 16:9 的巨幅 35mm 胶片负片画框。
- **交互隐喻**：随首屏入场或滑轮下滚，未冲印的白纸在深钴蓝/安全红显影液波澜中逐渐显像，伴随 EXIF 拍摄参数由模糊逐字锁定为清晰。

### 7.2 航线战役时间轴 (The Flight Path Timeline)
- **结构**：水平贯穿的长卷导轨（带 35mm 胶片齿孔与帧号标注：`FRAME 01` ~ `FRAME 36`）。
- **交互机制**：
  - 支持横向平滑滚轮漫游；
  - 键盘快捷键监听：`ArrowRight` / `L`（向后一帧）、`ArrowLeft` / `J`（向前一帧）；
  - 每到关键 Milestone 产生 Spring 磁吸停靠卡位，并自动展开【战役档案卡（Impact Dossier）】。

### 7.3 暗房摄影展厅 (The Darkroom Photography Gallery)
- **流式画廊**：自适应砌体网格（Fluid Masonry）与水平卷轴（Reel View）随时切换。
- **机械 EXIF 探针**：鼠标 Hover 或长按每张照片，平滑呼出机械探针微型面板，实时投影焦距、光圈、快门、ISO 与冲洗药水配方。
- **Mono-color 艺术模式切换**：独立图片右下角设孔版印刷开关，可在【真实底片色】与【Mono-color 双色孔版网点】之间实时滤镜切分。
- **手势挥动关闭 Lightbox**：移动端触控下拉或桌面端拖拽相片超过 120px 阈值，以抛物线物理轨迹 Dismiss 退出大图。

### 7.4 昼夜安全灯切换装置 (The Mechanical Safelight Switch)
- 导航栏右上角设计为复古暗房防呆拨扭开关。
- 点击切换瞬间触发 0.15s 全屏曝光避光微暗遮罩（Simulated Darkroom Shutter），伴随平滑过渡至柯达安全红/物料冷白，杜绝突兀闪烁。

---

## 8. 全局 Design Tokens 规范与代码映射 (Tokens Specification)

完整的 Token 集合已同步实现于项目代码库 `tokens/` 目录下。

### 8.1 CSS Custom Properties (Tokens.css)
```css
:root, [data-theme="day"] {
  /* 基底与空间 */
  --bg-substrate: #FAFAF7;
  --bg-surface: #F0F0EB;
  --bg-chamber: #E9E9E5;
  --border-plate: rgba(33, 72, 184, 0.25);
  --border-plate-strong: #2148B8;
  
  /* 油墨体系 (80% / 20%) */
  --ink-dominant: #2148B8;         /* 深钴蓝 Cobalt Blue */
  --ink-dominant-rgb: 33, 72, 184;
  --ink-accent: #C65F38;           /* 陶土橙 Terracotta */
  --ink-accent-rgb: 198, 95, 56;
  --ink-overprint: #18224B;        /* 双色叠印色 */
  --ink-subtle: rgba(33, 72, 184, 0.65);
  --ink-faint: rgba(33, 72, 184, 0.12);
  
  /* 文本对比度 */
  --text-primary: #1C2B54;
  --text-secondary: #35477D;
  --text-muted: #6B7C9E;
  --text-badge: #FAFAF7;

  /* 物理阴影与混合模式 */
  --blend-mode-ink: multiply;
  --shadow-plate: 0 4px 20px -2px rgba(33, 72, 184, 0.08);
}

[data-theme="night"] {
  /* 基底与空间 */
  --bg-substrate: #0D0E11;        /* 黑曜石极夜 */
  --bg-surface: #14151B;
  --bg-chamber: #181920;
  --border-plate: rgba(229, 75, 75, 0.35);
  --border-plate-strong: #E54B4B;

  /* 油墨体系 (75% / 25%) */
  --ink-dominant: #E54B4B;        /* 柯达安全红 Safelight Red */
  --ink-dominant-rgb: 229, 75, 75;
  --ink-accent: #F3E8D6;          /* 感光磷光奶白 Phosphor Cream */
  --ink-accent-rgb: 243, 232, 214;
  --ink-overprint: #FF5A5A;
  --ink-subtle: rgba(229, 75, 75, 0.70);
  --ink-faint: rgba(229, 75, 75, 0.14);

  /* 文本对比度 */
  --text-primary: #F3E8D6;
  --text-secondary: rgba(243, 232, 214, 0.82);
  --text-muted: rgba(243, 232, 214, 0.55);
  --text-badge: #0D0E11;

  /* 物理阴影与混合模式 */
  --blend-mode-ink: screen;
  --shadow-plate: 0 4px 25px -2px rgba(229, 75, 75, 0.22);
}
```

---

## 9. mono-color Skill 执行成果与艺术配方 (Monocolor Artifacts)

遵循 `mono-color` skill 规范，本次设计输出白昼物料印社（Day Mode）与夜间柯达安全灯（Night Mode）两幅高分辨率光栅化作品，已入库保存在 `docs/assets/`：

### 9.1 白昼物料印社 (Daylight Print Atelier Specimen)
- **生成图产物**：`docs/assets/darkroom-day.png` (SVG 原件：`docs/assets/darkroom-day.svg`)
- **本次配方 (Recipe Manifest)**:
  ```yaml
  subject: 35mm film negative strip emerging from chemical developing tray with optical apparatus
  intent: cultural atelier manifesto
  exact_text: "THE DIGITAL DARKROOM"
  text_language: English
  representation: faithful reproduction with coarse mechanical halftone
  ratio: 3:4
  carrier: carrier_portfolio
  substrate: substrate_neutral_white (#FAFAF7)
  mode: complementary duotone
  palette: palette_cobalt_terracotta
  inks: Cobalt (#2148B8, 80%) + Terracotta Orange (#C65F38, 20%)
  plate_roles:
    dominant_plate: structural halftone image, editorial headline, film sprockets, registration marks
    accent_plate: EXIF annotations, exposure indicators, crop reticles, tactile badge
  layout: composition_editorial_cover
  empty_paper: 38%
  visual_tension: tension_relaxed
  focal_event: extreme subject crop
  release_zone: open paper
  unresolved_edge: inferable cropped word
  image_treatment: clean plate separation with visible halftone screening
  type_hierarchy: type_literary (Editorial Serif + Monospace Tabular Figures)
  disruption: off-center film sprocket register strip with rotated notation
  imperfection_seed: "lzz-darkroom-day-2026"
  imperfections: [imperfection_ink_density, imperfection_registration_drift]
  ```
- **生成 Prompt**:
  ```text
  Flat front-facing vertical 3:4 editorial print specimen on crisp Neutral White unbleached photographic paper (#FAFAF7), rendered in physical complementary duotone using pure Cobalt Blue (#2148B8) and Terracotta Orange (#C65F38). No digital gradients, no full-color photography.

  Editorial cover composition with 38% active empty paper. The page features a dominant macro crop of a 35mm film negative strip with sprockets and frame numbers, intersecting a photographic chemical developing tray. High contrast mechanical halftone dot screening across the image plate. Left-aligned technical print calibration ruler and four corner precision registration marks in 1.5px cobalt rule.

  A high-scale jump headline reads 'THE DIGITAL DARKROOM' in characterful high-contrast editorial serif, tightly locking against the top film perforation border. Terracotta orange accent plate carries the precision EXIF technical metadata cluster: 'Sony A7M4 · 35mm F1.4 GM · f/1.4 · 1/250s · ISO 100' set in crisp monospaced tabular figures, along with an exposure indicator badge and camera crosshair reticle.

  Tactile physical print characteristics: subtle 1.5mm plate registration drift between the cobalt and terracotta layers, rich ink pooling in dense shadow zones, paper fiber texture, and a custom micro-barcode block at the bottom right. Clean, intentional, modern art atelier publication artifact.
  ```

---

### 9.2 夜间安全灯暗房 (Safelight Darkroom Specimen)
- **生成图产物**：`docs/assets/darkroom-night.png` (SVG 原件：`docs/assets/darkroom-night.svg`)
- **本次配方 (Recipe Manifest)**:
  ```yaml
  subject: inverted silver halide latent image in darkroom chemistry bath under safe-light radiance
  intent: intimate atelier inspection & night-time geek workstation
  exact_text: "SAFELIGHT DARKROOM"
  text_language: English
  representation: abstract symbol extraction & negative film inversion
  ratio: 3:4
  carrier: carrier_portfolio
  substrate: obsidian deep carbon (#0D0E11)
  mode: chromatic + black
  palette: custom_safelight_amber
  inks: Kodak Safelight Red (#E54B4B, 75%) + Luminescent Cream (#F3E8D6, 25%)
  plate_roles:
    dominant_plate: 650nm cutoff safe-light halo, enlarger easel frame, inverted negative halftone
    accent_plate: chronometric timer readout, thermodynamic bath telemetry, phosphor reticle
  layout: composition_image_field
  empty_paper: 35%
  visual_tension: tension_assertive
  focal_event: concentrated overprint collision
  release_zone: low-detail image fade
  image_treatment: coarse film grain negative exposure with glowing silver halide dots
  type_hierarchy: type_programmatic (High-contrast Serif + Monospace Telemetry)
  disruption: mechanical red safe-light indicator and chemical timer status block
  imperfection_seed: "lzz-darkroom-night-2026"
  imperfections: [imperfection_halftone_drift, imperfection_dry_edge]
  ```
- **生成 Prompt**:
  ```text
  Flat front-facing vertical 3:4 darkroom inspection artifact on deep Obsidian Carbon substrate (#0D0E11), bathed in monochromatic Kodak Safelight Red (650nm cutoff, #E54B4B) with luminescent phosphor warm cream (#F3E8D6) accents. No multi-color lighting, no RGB neon.

  Assertive image field layout with 35% deep darkroom negative space. The composition centers on a darkroom enlarger easel with an inverted panchromatic negative (latente emulsion) developing inside a chemistry tray. Ambient red safe-light glow radiates softly from the center. Left edge features a vertical enlarger column height scale in centimeters.

  Display typography reads 'SAFELIGHT DARKROOM' in massive Didot-style serif type, paired with a glowing safe-light active warning badge. The lower section features a dense chronometric darkroom telemetry cluster: '08:30.00 ELAPSED · DEV 20.0°C · STOP 30s · FIX 5m · BESELER 45M ENLARGER' rendered in razor-sharp monospaced tabular figures.

  Material aesthetics: visible silver halide crystal texture, inverted coarse halftone screening dots, dry-edge ink breakup, fine optical crosshairs, and darkroom chemical bath reflections. Severe, disciplined, mysterious, and deeply physical.
  ```

---

## 10. 研发执行与质量门禁 (Closed-Loop Workflow & Gates)

后续所有组件与动效研发严格遵守以下质量准则：
1. **TypeScript 强类型门禁**：所有 Token 必须从 `tokens/index.ts` 导入，严禁硬编码 Hex 颜色字符串。
2. **性能与渲染指标**：
   - 滚动帧率稳定在 60fps~120fps；
   - 保证 **Zero CLS** (Cumulative Layout Shift < 0.01)；
   - 严格测试 `prefers-reduced-motion` 媒体查询无障碍退让。
3. **审阅机制**：
   - 本规范作为唯一权威基准，由 **LZZ Blog Fullstack Architect** 审核合规性。
