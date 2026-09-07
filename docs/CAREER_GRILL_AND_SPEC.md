# CAREER_GRILL_AND_SPEC · 履历深挖、页面视觉契约与内容重构工作文档

> **创建时间**：2026-09-08  
> **文档定位**：全流程实时工作文档。记录用户对 Career Page 的视觉与交互期望、深挖访谈（Grill Q&A）、能力短板/未做好的地方、简历优化方案与 Career Page 内容重构草案。

---

## 目录
1. [一、Career Page 视觉与交互规范契约 (Visual & Interaction Spec)](#一career-page-视觉与交互规范契约)
2. [二、背景档案与最新时间线基准 (Master Timeline)](#二背景档案与最新时间线基准)
3. [三、Grill 访谈记录与深度挖掘 (Recruiter / HM / Founder 视角)](#三grill-访谈记录与深度挖掘)
4. [四、经历报告与未做好的地方 / 弱点诊断 (Gaps & Shortcomings)](#四经历报告与未做好的地方)
5. [五、简历优化行动项 (Resume Refinement Proposals)](#五简历优化行动项)
6. [六、Career Page 终态内容重构编排 (Reconstructed Narrative)](#六career-page-终态内容重构编排)

---

## 一、Career Page 视觉与交互规范契约 (Visual & Editorial Spec)

### 1. 核心设计原则（去 AI 味、去黑话、干净简洁）
- **彻底退役“航线（Flight Path）”与伪军事黑话**：
  - 坚决杜绝“熔炉”、“战役代号”、“降本刀锋”、“破茧”等浮夸空洞的 AI 式总结。
  - 风格定位：**纯粹的写作风自我陈述时间线（Essay-Style Personal Narrative Timeline）**。
  - 语言质感：完全对齐作者本人的真实博客随笔文风（如《2021.08-2023.09，就这样的两年》《2022年终总结》）——坦诚、自省、接地气、有技术细节也有对现实的幽默与反思。
- **左侧极简竖向时间轴（Left Minimalist Timeline Rail）**：
  - 左侧常驻极简的竖向时间刻度（大学 ➔ 字节 ➔ 探索 ➔ Wise ➔ 至今）；
  - 随滚动指示当前阶段，干净利落，无突兀多余修饰。
- **固定视口单屏分幕流转（100dvh Vertical Snap-Scroll）**：
  - 固定视口无全局自由滚动的杂乱感；
  - 滚轮/按键触发逐页沉浸切换，如同翻阅一本装帧考究的个人技术散文集。
- **阶段定制背景（Stage-Specific Thematic SVG Canvas）**：
  - 每一页根据该阶段最真实的系统与生活印记（如大学的蜂窝微服务、字节的跨洋多机房与心跳网络、探索期的容器拓扑、Wise 的影子流水线）单独绘制高精度单色（Mono-color）发丝线稿；
  - 保持极低对比度，作为沉静的纸面纹理底衬，绝不喧宾夺主。
- **内容三位一体**：
  - **真实的经历轨迹**（从哪来到哪去，为什么走，为什么留）；
  - **硬核的真实技术**（ZSET 索引冷启动、心跳门禁推拉、确定性 DAG 状态机与影子熔断）；
  - **真实的工程师思考**（对效率的执着、对纯执行机器的拒绝、现实与理想主义的碰撞）。

---

## 二、背景档案与最新时间线基准

| 时间区间 | 组织 / 业务 | 职级 / 角色 | 关键技术栈 | 核心标签 |
|---|---|---|---|---|
| **2026.06 – Present** | **Wise** | **Product Engineer 3** | AI Agents, Payment Core, Python/TS | 核心支付链路 AI Agent，可靠可审计 |
| **2024.11 – 2026.05** | **Wise** | **Product Engineer 2** | AI Workflow, React, SQL, PayOps | Payment Defects 重构，月省 £80k，30k+ cases/mo |
| **2024.08 – 2024.11** | *独立探索 / Sabbatical* | Creator / Builder | Local-First, Vibe Coding, Cloudflare | Loan Calculator, Panda Wanderer, Project500 |
| **2024.04 – 2024.07** | **MariBank** | **Senior Backend Engineer** | Java, Spring, Banking Core, SQL | 信贷核心（Cashloan / SME），分布式一致性与合规 |
| **2023.10 – 2024.04** | **Bondee** | **Senior Software Engineer** | Go, K8s, Vector, Kafka, ES | 新加坡首位 SWE，可观测性底座与日志降本管线 |
| **2022.09 – 2023.10** | **ByteDance / TikTok** | **Senior Backend Engineer** | Go, Microservices, Multi-DC, Redis | TikTok IM 核心链路 Tech Owner，跨洋多活同步，安全 PoC |
| **2021.08 – 2022.09** | **ByteDance** | **Backend Engineer** | Go, Spark, Geo/IP, Distributed Systems | 海外 IP 定位海外负责人（孤岛守望），Spot Bonus，1 年晋升 |
| **2021.01 – 2021.07** | **ByteDance (实习)** | Backend Intern | Go, PaaS, API Gateway | 百万级 QPS 春晚保供，自助诊断与容量预估工具 |
| **2019.08 – 2021.01** | **U-Wave** | **Co-Founder, Full Stack** | Flutter, Spring Cloud, Microservices | 校园创业闪电战，20k 注册 / 4k DAU |
| **2017.08 – 2021.05** | **NTU** | **B.Eng. Computer Engineering** | CS Fundamentals | 全额 Merit Scholarship，新加坡公民 |

---

## 三、Grill 访谈记录与深度挖掘

> 模拟世界顶级科技公司 Staff+ Hiring Manager / 技术合伙人 / 精英猎头视角。  
> 挖掘逻辑：穿透简历空话，深挖真实 Technical Trade-offs、决策动因、危机处理、业务 Impact 归因与个人局限性。

### Round 1 & 2：Wise 战役实录（深度提纯完成）

#### 【事实沉淀与核心技术资产】
1. **职级与定位认知**：
   - 现任 / 离职级别为 **IC3（Product Engineer 3）**。
   - 入职即为 **IC2 Top**（顶格能力），入职即具备独立主导复杂项目架构、带 Junior/Intern/Grad、跨部门协同与端到端交付能力；错过第一个窗口后于次年 6 月如期晋升 IC3。
2. **业务战场与定位（Payment Defects）**：
   - 横向核心战线：覆盖整个 Payment 链路的 Defects、Delay 及其带来的运营人力成本。
   - 模式：Autonomous Scout——把全链路资金异常抽象为巨大的“可降低成本池（Cost Pool）”，主攻最后 **0.5% 最复杂、原先全靠人工在不同 Back Office 拼凑信息的极端长尾（Last-mile Linking）**。
3. **架构务实主义（Pragmatism over Hype）**：
   - **拒绝盲目 Agent 化**：明确放弃成本不可控且不稳定的 ReAct Agent，采用**高稳定性确定性状态机（Deterministic State Machine / DAG）**。坚守工程底线：“能用确定性工作流解决的，绝不为了显摆技术而盲目上 Agent”。
   - **为 AI 打造专属 API 聚合层**：针对原本分散在各个 Back Office 系统的孤岛数据，自研设计了一整套专供 AI 消费的全新 API 聚合层。
   - **容错与超时设计**：非严格时间敏感链路（整体 Case 耗时约 1 分钟，分几个阶段），基于 P90/P99 延迟基准设置合理的阶段超时与重试，消除了死循环风险。
4. **金融零容错与防爆分级机制（Financial Blast Radius Control）**：
   - **场景精细化分流（Segmentation）**：划分为 Propose Link、Non-propose Link、Search-out、Reference 等多个子场景；各场景独立测算 Loss vs Benefit。
   - **大额强制人工审批**：设置金额阈值，超限直接走人工 Double Check。
   - **币种与渠道规则注入**：针对不同 Currency 和 Partner 的特殊清算规则，在 Workflow 中动态加载专属匹配规则。
   - **动态决策权**：AI Evaluation Infrastructure 能够根据输出置信度，动态决定是“全自动资金划转/关联”，还是“提供建议供人工一键确认”。
5. **AI 影子与熔断基建（Evaluation & Shadowing Infrastructure）**：
   - **实时 Shadowing**：线上 Case 双跑，无 Golden Dataset 情况下与真实 PayOps 决策实时比对，定位偏差。
   - **99.5% 准召门禁**：仅在 Shadowing 达到 99.5% 拟合准确率后才准许放行生产。
   - **5% 对照流实时保活监控（Canary Monitoring）**：上线后长驻 5% 人机对照流，防范 LLM 非确定性与漂移；一旦表现异常，**秒级触发熔断切流（Circuit Breaker）** 回退人工。
   - **多版本并行演化**：支持业务流程变更时，Production V1 与 Shadowing V2/V3 并行跑，平滑演进。
6. **组织破局与影响力（从根因预防而非机械解决）**：
   - **以终为始的数据说服力**：Wise 是 Impact-driven 文化，联合数据分析师量化 Case 耗时、延迟引发的 Churn Cost（用户流失成本），用硬核商业收益推动项目立项。
   - **跨部门利益对齐（Zendesk 迁移到 Kafka 平台）**：CS 原先习惯用 Zendesk，阻力极大。破局点在于**“把格局从解决工单提升到根因预防（Prevention）”**——向 CS 证明，统一平台可以沉淀结构化数据，分析为何发生 Escalation（例如文档上传失败等原因），进而从产品上游彻底消灭问题。
7. **数据收益链**：
   - 每月自动化稳定处理 **30k cases**，扣除 LLM 推理成本后，净节省达 **£80,000 GBP / 月**（年化近百万英镑）。

---

## 四、经历报告与未做好的地方 / 弱点诊断 (Gaps & Shortcomings)

### 诊断 1：Wise 阶段的组织妥协与长短期价值博弈（极其深刻的自我觉察）
- **核心痛点**：Wise 强烈的 Impact-driven 文化催生了整个组织“急于求成、用短期可见收益做抓手推动别人”的惯性，缺乏自上而下的前瞻性长期投入。
- **未做好/遗憾之处**：**在系统架构与长期技术收益上“妥协（Compromise）过多”**。当时作为 IC2，为了能推得动项目，不得不迎合组织的速成要求，牺牲了一部分长期更具复利价值的基础设施设计。
- **高阶成长点（IC3 -> Staff+ 视角）**：随着影响力与职级提升，不再单纯做被动的短期妥协者，而是学会**组合拳策略**——让团队协同分担短平快指标，自己以更有说服力的数据和愿景去争取、主导长效价值的架构投资。

---

## 五、简历优化行动项 (Resume Refinement Proposals)

### Wise 经历重构方向（提换原简历中笼统的 2 条 bullet）：
1. **[架构与基建]**：从 0 到 1 主导设计并落地金融级 **AI Automation & Evaluation Infrastructure**（确定性 DAG 状态机、实时 Shadowing、99.5% 准召门禁与 5% 对照流秒级熔断切流）。
2. **[量化商业 Impact]**：主导 Payment Defects 核心长尾资金关联链路自动化，月处理 **30k+ cases**（98%+ 准确率），结合大额阈值与场景分流防爆设计，实现年化直接降本 **~£1M GBP**。
3. **[跨部门系统工程]**：主导重构全球 **Compensation Platform**（双人复核审批流、合规多币种 Payout）及基于 **Kafka** 的跨系统工单流转平台，终结跨部门数据孤岛，通过结构化溯源反哺上游降低工单发生率。

---

## 六、Career Page 终态内容重构编排（Wise Act 规划）

- **章节代号**：`ACT 01 // NORTHSTAR: WISE (2024–PRESENT)`
- **核心哲学**：*“Engineering in Service of Business, Pragmatism over Hype”*（技术为业务服务，务实胜过炒作）
- **三大下钻展台（Interactive Drawers）**：
  1. **AI Automation Infra**：Shadowing + 5% Live Control 熔断拓扑图；
  2. **Deterministic Financial Workflow**：场景分级、大额兜底与币种规则状态机；
  3. **Event-driven Escalation Platform**：Kafka 跨 CS / PayOps 双向解耦拓扑。

---

### Round 3：探索期真相（2023.10–2024.11：Bondee、MariBank 与心智重置）

#### 【真实动因与去伪存真的工程实况】
1. **离开字节的动因（“围城心理与真工程师追寻”）**：
   - 字节跳动是一个成熟但封闭的“小社会”，拥有现成顶级的 Infra、成熟的工作范式与成熟套路。
   - 痛感自己如果不走出来，就永远是一个“被大厂成熟基建和光环包裹的螺丝钉”，对外面的真实技术世界和初创生态一无所知，渴望跳出围城，验证自己作为一个独立 Engineer 的真正成色。
2. **Bondee（7 个月）：初创扩张破产的现实课**：
   - **入职初衷**：新加坡首位软件工程师（1st SWE in SG），面试中感受到高度信任，承诺围绕新加坡建立技术扩张中心，空间广阔。
   - **真实败局**：公司层面的海外技术扩张缺乏周密商业与组织规划，入职几个月后技术团队扩张直接搁浅破产（“技术人员全部撤掉，只留 Ops”），被迫重新寻找出路。
   - **去伪存真的技术实况**：在客观环境下被推着当了全栈杂家，被迫从 0 接触 K8s 编排与 Observability（Vector/Kafka/ES）。坦诚指出原简历中的浮夸水分：“小公司根本没有多大吞吐量，也没挤出多少成本水分，无非是干掉了几百块钱的 AWS 托管 ELK”。
   - **简历处置意见**：不再大肆吹嘘该段技术量化指标，剥离虚浮包装，真实呈现为初创团队快速搭建云原生基础设施与运维闭环的经历，或在纸质版简历中极简处理。
3. **MariBank（3 个月）：“纯执行机器（Executor）”的文化窒息**：
   - **入职初衷**：经历 Bondee 初创团队的技术夭折后，产生强烈的“Job Security（求稳）”代偿心理，加上当时 AI 尚未全面爆发，认为合规数字金融既稳定又蕴含未知业务深度，故选择进入 Sea 旗下的 MariBank 信贷核心（Loan Team）。
   - **离开的底层真相（“水温不对”的本质）**：
     - **极度死板、零自主度**：技术方案完全由上游业务想好、交给 PM，输出的产品文档详尽死板到连每一个接口定义、每一张表字段都写死，“现在把那份 PRD 喂给 AI 都不需要程序员了”。
     - **毫无工程自主性**：每天被卡死在按部就班的 Sprint 排期里，沦为流水线上的“代码打字机 / Executor（纯执行者）”，工程创造力与产品敏锐度被彻底扼杀。
     - **非妥协底线**：3 个月内迅速看清并果断斩仓——**“单纯当一个提线木偶式的 Executor，我是坚决不接受的。”**
4. **空白期（2024.08–2024.11）与 Side Projects：创造力唤醒与定位确立**：
   - 从早期玩具项目（Loan Calculator 等已弃用）全面升级为更有实际场景的独立产品：
     - **CanCan**：财务证据库 + 自动化对账台；
     - **CoffeeMode**：找咖极简指南；
     - **Our Village**：去中心化社区成员协作系统。
   - **核心觉醒**：天生具备极强的自主性与创造欲，以前被大厂细分工种与漫长的手写代码链路压抑。借助 AI 工具后，个人的产品端到端交付能力被十倍放大。
   - **彻底确立团队与职业选择标准**：
     - **坚决不做纯 Executor**；
     - **必须有产品自主权与问题定义权**（能够从 0 到 1 或从需求端深度参与决策）；
     - **愿意发挥产品理解力并带领 Junior/团队**，打有价值的仗。这也直接解释了为什么后续在 Wise（Autonomous Scout 模式的 Product Engineer）能够如鱼得水并迅速晋升。

---

## 四、经历报告与未做好的地方 / 弱点诊断 (Gaps & Shortcomings)

### 诊断 1：Wise 阶段的组织妥协与长短期价值博弈
- *(见上文：过度妥协短期 Impact，未来需提升 Staff+ 架构定力)*

### 诊断 2：2023–2024 探索期的“避险动作变形”与“职业尽调盲区”
- **核心盲区 1（初创商业尽调缺失）**：离开字节时急于打破围城，被“新加坡 1 号工程师”的头衔吸引，未能穿透初创公司管理层的战略规划真伪，误判了其全球扩张与资金储备的稳定性。
- **核心盲区 2（求稳心理导致的动作变形）**：在 Bondee 受挫后出现恐慌性避险，为了追求“虚幻的安全感（Job Security）”饥不择食扎入银行业，忽视了合规金融机构“强监管、重流程、抹杀工程师个性与自主权”的组织基因，导致入职 3 个月即不得不再次止损。
- **成长蜕变**：这段阵痛期彻底打碎了对“大厂光环”和“体制化稳定”的迷信，逼自己认清了内心底层价值观——**自己不是一个安于现状的流水线螺丝钉，而是一个必须拥有业务自主权、由内向外驱动的 Product Builder**。

---

## 五、简历优化行动项 (Resume Refinement Proposals)

### 1. Bondee & MariBank 降噪与诚实化：
- **删除虚胖指标**：剔除 Bondee 中关于海量吞吐与巨额降本的空泛描述，改为突出“作为新加坡首位工程师独立闭环搭建 K8s 容器编排与全链路可观测体系”；
- **重塑 MariBank 定位**：不写空洞的金融大词，强调在严格金融监管环境下对分布式事务、幂等与信贷 SDLC 的规范理解，淡化流水线痕迹；
- **项目更新**：简历中剔除过时的 Loan Calculator，换上更有产品深度与架构密度的现役项目（**CanCan、CoffeeMode、Our Village**）。

---

## 六、Career Page 终态内容重构编排（Act 02 规划）

- **章节代号**：`ACT 02 // EXPLORATION: UNCHARTED & UNBOUND (2023–2024)`
- **核心哲学**：*“Escaping the Walled City · Rejecting the 'Pure Executor' Trap”*（逃离围城，拒绝成为纯执行机器）
- **视觉线稿（Thematic SVG）**：破茧而出的几何网络，穿插 K8s 容器与自主产品的轮廓线。
- **叙事内核**：不避讳短期的曲折，将其升华为一次极其清醒的“心智试金石”——用事实证明自己为什么不适合做螺丝钉，为什么必须成为定义问题的 Product Engineer。

---

### Round 4：字节跳动熔炉实录（2021.01–2023.09：高并发、硬核战役与价值观试炼）

#### 【硬核技术战役与真实战场细节】
1. **海外 Location 孤岛守望（战功破局，斩获首个 E 绩效与 Spot Bonus）**：
   - **背景**：作为新人借调到 Location 系统，全团队只有自己一个工程师在新加坡，承接近百个离线 Spark 任务与线上 Go 定位服务，7×24 oncall 报警电话不断。
   - **生存与破局战法**：坚决摒弃盲目加班硬扛，转向**系统性降噪与资源治理**：
     - **清理海外资源冗余**：此前海外资源无人精细化运维，存在大量滥用与闲置；进行全局收敛与成本缩减；
     - **治理报警与日志质量**：逐项排查误报与抖动源头，重构报警规则，把高频垃圾告警压到最低；
     - **服务稳定性兜底**：优化 Go 服务的 CPU 瓶颈与内存管理（GC 调优、大对象内存复用、高频数据本地 Cache 缓存）。
   - **结果**：平息报警风暴，服务质量大幅提升，直接斩获团队 **Spot Bonus** 并拿到他在字节的**第一个 E（Exceeds Expectations，卓越绩效）**。
2. **TikTok IM 核心战役 1：会话列表冷启动（Conversation Ranking & Inbox Initialization）**：
   - **核心痛点**：用户换机或重新安装 App 时，需从 0 初始化会话历史。若直接按消息时序从底层 DB 顺序读取（底层消息为 Append-only 存储），在活跃用户场景下可能连续读取 10,000 条全是某一个超活跃群聊的消息，导致会话列表仅展示出 1 个单调会话，严重影响体验。
   - **架构解法**：基于 **Redis ZSET** 独立维护用户的 **Conversation Rank 活跃会话列表**（以各会话最新活跃时间戳为 Score）。
   - **初始化逻辑**：App 启动仅优先拉取 Top 活跃会话（如 Top 20）及其各自最新的首屏消息；深层历史会话及旧消息仅在滑动下钻或有新消息推至顶端时懒加载（Lazy Load），兼顾了首屏性能与多会话完整呈现。
3. **TikTok IM 核心战役 2：百万级 QPS 在线状态（Presence）广播风暴治理（最硬核战役）**：
   - **极端挑战**：数百万用户同时在线，当用户 A 上线/下线时，若采取全量推送（Push）给所有好友，瞬时 Fan-out 写入放大将产生数亿级 QPS，直接压垮网关和长连接集群；若采取全量轮询（Pull），网关瞬时只读查询率（Register Rate）同样面临过载。
   - **架构突破（推拉结合 + 活跃心跳过滤）**：
     - 为每个用户在内存/缓存中维护一个**最近活跃好友的 ZSET 集合**；
     - **心跳过滤（Heartbeat Gate）**：当用户 A 上线时，仅向当前活跃集合中**有最近心跳（代表当前正打开 App 且在线）**的好友触发定向推送；对于无心跳（休眠/离线）的好友坚决不推；
     - 大幅削减无效 Fan-out 流量，成功用推拉结合机制抗住了全球数百万 QPS 瞬时冲击。

#### 【思想与价值观的现实主义演进】
- **从《我讨厌 IM》到现实主义**：
  - 曾经亲历一边写已读回执、一边在思想上批判隐私侵蚀的内心煎熬。
  - **现实的心态转变**：随着大厂在商业与财务压力下对原则的退让、以及 AI 时代的全面商业化，深感“很多理想主义原则在商业现实面前正变得廉价”。
  - **沉淀**：不再做虚无的痛苦抵抗，而是走向务实的成熟——**在工作中以极高的专业度交付商业结果，同时在个人精神与个人产品（Side Projects）中保有底线与创造自由**。

---

## 四、经历报告与未做好的地方 / 弱点诊断 (Gaps & Shortcomings)

### 诊断 1：Wise 阶段的组织妥协与长短期价值博弈
- *(见上文：过度妥协短期 Impact，未来需提升 Staff+ 架构定力)*

### 诊断 2：2023–2024 探索期的“避险动作变形”与“职业尽调盲区”
- *(见上文：初创扩张破产与银行死板流水线的试错蜕变)*

### 诊断 3：字节跳动时期的“技术自嗨与商业 ROI 盲区”
- **核心盲区**：在大厂利润丰厚、基建成熟的温室下，形成了“只要有技术挑战、只要能把性能调上去，就是好成果”的惯性思维。
- **未做好之处**：**缺乏基于商业数据、投入产出比（ROI）去严密论证项目优先级的意识**。在大厂可以花一个月单纯去做底层技术调优；但在真正的商业驱动环境下（如 Wise），不能带来业务增长的技术优化就是无效损耗。这一思维盲区直到跳出大厂后才彻底顿悟。

---

## 五、简历优化行动项 (Resume Refinement Proposals)

### ByteDance 经历重构方向（提换原简历模糊的描述）：
1. **[IM 架构与性能]**：主导维护 20+ 个 Go 微服务核心链路；针对数百万 QPS 场景设计**推拉结合 + 活跃心跳过滤机制**，彻底解决全局在线状态（Presence）Fan-out 广播风暴；
2. **[会话列表引擎]**：重构会话冷启动排序引擎，引入 **Redis ZSET 活跃会话分层索引**，解决冷启动全量扫描导致的单会话淹没 Bug，实现毫秒级首屏初始化；
3. **[海外 Location 孤岛攻坚]**：单人接管海外定位全链路系统，通过**离线 Spark 资源重组、报警精细化治理与 Go 内存/GC 性能调优**，平息告警风暴，突破东南亚定位精度，荣获 Spot Bonus 与年度 E（卓越）绩效。

---

## 六、Career Page 终态内容重构编排（Act 03 规划）

- **章节代号**：`ACT 03 // FOUNDATION: THE CRUCIBLE (2021–2023)`
- **核心哲学**：*“High-Concurrency Crucible · From Idealism to Engineering Realism”*（高并发熔炉：从理想主义到工程现实主义）
- **三大下钻展台（Interactive Drawers）**：
  1. **Presence Fan-out Engine**：百万 QPS 心跳过滤推拉网络拓扑；
  2. **Inbox Ranking Architecture**：ZSET 会话层级与 Append-only 消息检索对比图；
  3. **Location Island Governance**：离线 Spark 编排与在线 Go 调优看板。

---

### Round 5：起点与黑客基因（2017–2021：NTU、U-Wave 与单兵作战）

#### 【真实起点与产品冲动】
1. **U-Wave 校园创业（20k 注册 / 4k DAU）的初心**：
   - **冲动起源**：纯粹的 Hacker 精神——“觉得学校官方的系统和社区太烂了，我一定要做一个真正好用的东西给大家用”。
   - **兴奋点**：业余时间独立开发（Flutter 客户端 + Spring Cloud 微服务），当看到自己亲手做出来的产品被全校同学真实高频使用时，获得了极大的多巴胺与成就感。
   - **为何没全职走下去**：极其清醒的现实约束——“作为国际学生，需要工作、需要办 EP 工作准证、需要扎根留在新加坡”。
   - **商业化教训**：**不该对纯校园社区急于商业化**。当商业模式本身在校园生态下走不通时，强行推商业变现只会破坏纯粹的用户体验、加速用户流失。
2. **早期的单兵作战力（Transforma Robotics & Visa 黑客松）**：
   - 首次实习在 Transforma 独挑大梁，不到 2 个月交付 Android 客户端；Visa 全球黑客松 60 队斩获第 2 名。
   - 这种野性不是靠成熟流程规范喂出来的，而是骨子里对计算机技术的掌控欲与把想法快速变现的动手能力。

---

## 四、经历报告与未做好的地方 / 弱点诊断 (Gaps & Shortcomings Report)

> **综合评估：一位“在拧巴中进化的全面型产品工程师（Comprehensive Pragmatic Builder）”**

### 1. 性格底色与心理张力（“拧巴”的本质）
- **自白剖析**：“我喜欢钱，但我放弃高薪去了 Wise；我喜欢技术，但我不是研究底层 LLM 算法的学术专家；我喜欢创业，但我不敢在初创公司拿全 RSU 赌命。我是一个很拧巴的人，但好处是我很全面。”
- **深度透视**：
  - 这种“拧巴”**不是软弱，而是一位务实理想主义者（Pragmatic Idealist）在现实引力与创造欲望之间的动态平衡**。
  - 因为要生存、要扎根新加坡，他必须对风险保持敬畏（重视 Base、重视准证安全、重视公司基本盘）；
  - 因为骨子里的创造欲与不将就（*Never Settle*），他决绝地拒绝了 MariBank 式的高薪“流水线打字机”；
  - **终极杀手锏：极致的“全面性（End-to-End Comprehensiveness）”**。既有字节 20+ 微服务高并发与百万 QPS 架构的扎实基本功，又有做 U-Wave、CanCan、CoffeeMode 的敏锐产品直觉，更有在 Wise 推动 AI 与复杂业务落地的系统整合力。

### 2. 四大生涯阶段的“未做好与盲点诊断”
| 阶段 | 战役 | 暴露的短板 / 未做好的地方 | 进阶后的顿悟与成长 |
|---|---|---|---|
| **起点期 (2019-2021)** | **U-Wave 校园创业** | **过早强行商业化**：在网络效应尚不稳固、工具属性重于消费属性时急于变现，伤害了留存。 | 明白了产品与商业模式的匹配度（PMF），懂得用户信任是商业化的前置条件。 |
| **熔炉期 (2021-2023)** | **ByteDance TikTok IM** | **大厂温室下的“技术自嗨与 ROI 盲区”**：沉迷于纯技术挑战与性能调优，缺乏用商业数据去严密论证项目优先级的意识。 | 跳出大厂后顿悟：一切不带来业务增量和成本削减的技术优化都是损耗，确立了商业 ROI 视角。 |
| **探索期 (2023-2024)** | **Bondee & MariBank** | **尽调盲区与避险动作变形**：出走字节时被 1 号工程师光环吸引，未看清初创扩张泡沫；受挫后因恐慌性避险扎入死板银行，沦为纯执行者。 | 彻底打破对光环和虚幻稳定的迷信；确立了**“坚决不做 Executor，必须拥有业务自主权与问题定义权”**的非妥协原则。 |
| **成熟期 (2024-2026)** | **Wise Product Eng** | **短平快文化下的“架构过度妥协”**：在强烈的短期 Impact 文化下妥协过多，牺牲了一部分长期复利型基础设施。 | 迈向 Staff+ 门槛的必修课：学会组合拳，用数据争取长期技术投资，平衡当下交付与未来债务。 |

---

## 五、简历优化终案 (Comprehensive Resume Refinement)

> **优化策略**：
> 1. 突出 **Product Engineer 3 (IC3)** 的全局 Scope 与领导力；
> 2. 剥离 Bondee 浮夸假指标，强调 1st SWE 的云原生搭建与全能拓荒；
> 3. 精炼 MariBank，重塑为高标准金融一致性与风控架构认知；
> 4. 彻底改写 TikTok IM 与 Location，注入 ZSET 会话分层、在线状态推拉心跳过滤与 E 绩效 Spot Bonus；
> 5. 换下 Loan Calculator，换上 **CanCan、CoffeeMode、Our Village** 现役产品矩阵。

### 1. Wise 经历重构（替换原简历笼统描述）
- **WISE | Product Engineer 3 (Promoted from IC2 Top) | SG | Nov 2024 – Present**
  - **AI Automation & Evaluation Infrastructure**: Architected a production-grade AI evaluation platform from scratch. Designed a **deterministic DAG state machine** for last-mile payment linking without golden datasets; implemented **real-time shadowing against live Ops, 99.5% accuracy gating, and 5% canary control traffic with sub-second circuit-breaker failover**.
  - **Measurable Business Impact**: Automated **30,000+ payment defect cases/month** with 98%+ accuracy across complex multi-currency and partner clearing rules. Integrated risk-tiered guardrails (threshold gating for large amounts), achieving **£80,000/month (~£1M/year) net operational cost reduction**.
  - **Global Platforms & Cross-Org Synergy**: Re-engineered the end-to-end **Compensation Platform** with multi-party compliance review and double-approval controls across global payout rails. Designed a Kafka-based bidirectional escalation system bridging CS and PayOps, leveraging structured telemetry to eliminate upstream ticket triggers.

### 2. MariBank & Bondee 经历重构（诚实、高级、聚焦真实价值）
- **MariBank | Senior Backend Engineer | SG | Apr 2024 – Jul 2024**
  - Contributed to core banking credit engines (**Cashloan & SME Termloan**) with Java. Enforced strict distributed transaction consistency, idempotency, and anti-replay patterns under MAS regulatory compliance. Built an internal RAG-based customer support assistant PoC in spare time.
- **Bondee | Senior Software Engineer (1st SWE in Singapore) | SG | Sep 2023 – Apr 2024**
  - Established Singapore foundational cloud-native infrastructure as employee #1. Orchestrated multi-tenant K8s environments and implemented end-to-end observability pipeline (Vector + Kafka + self-hosted ElasticSearch) to replace legacy managed logging stacks.

### 3. ByteDance 经历重构（突出千万级流量与真实架构细节）
- **ByteDance / TikTok | Senior Backend Engineer (Promoted in 1 Year) | SG | Jan 2021 – Sep 2023**
  - **TikTok IM Presence Engine**: Solved massive global fan-out broadcast storm at multi-million QPS. Designed a **hybrid push-pull mechanism with active heartbeat gating via Redis ZSET**, eliminating $O(N \times M)$ write amplification by restricting broadcasts strictly to currently active friends.
  - **Inbox Initialization & Ranking**: Overhauled cold-start inbox ranking by introducing a ZSET-indexed active conversation hierarchy, resolving append-only DB log scan bottlenecks and delivering sub-100ms initialization for newly re-installed clients.
  - **Overseas Location Platform**: Sole Singapore engineer managing ~100 offline Spark jobs and online Go services. Governed cloud resource sprawl, eliminated alarm fatigue through intelligent log triage, tuned Go runtime memory/GC profiles, and improved ASEAN geo-accuracy. Awarded **Spot Bonus and Top Performance Rating (E)**.

### 4. Side Projects & Early Origin 重构
- **Side Projects | Independent Builder & Vibe Coder | 2024 – Present**
  - **CanCan**: Financial evidence ledger and automated reconciliation platform for independent creators.
  - **CoffeeMode**: Minimalist specialty cafe discovery guide and local curator.
  - **Our Village**: Decentralized community member management and interaction platform.
- **U-Wave | Co-Founder, Full Stack Engineer | Aug 2019 – Jan 2021**
  - Co-founded campus utility and social platform serving Singapore universities, scaling to **20,000 registered users and 4,000 DAU**. Built the cross-platform client in Flutter and designed microservices architecture with Spring Cloud.

---

## 六、Career Page 终态内容重构编排（写作风自我陈述时间线）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CAREER PAGE 终态视听架构（纯粹写作风）                       │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ 左侧极简竖向时间轴   │ 右侧固定单屏分幕（100dvh Vertical Snap-Deck）            │
│ (Left Minimalist  │ - 沉静纸面背景 + 极细单色发丝 SVG 纹理线稿 (Mono Ink)    │
│  Timeline Rail)   │ - 随笔散文风的真实自我叙事（去 AI 味、去黑话口号）        │
│                   │ - 真实技术决策与真实数据（嵌入正文段落，而非生硬徽章）    │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

### 1. 终态分幕文案草案（按作者真实原话与随笔文风重构）

---

#### 【第 0 屏 // 大学时期：2017 – 2021】
**时间轴标识**：`2017 – 2021 · NTU & U-WAVE`  
**专属单色背景**：校园微服务网络拓扑、Flutter 状态树发丝线稿  

> **“嫌学校东西太烂，所以一定要做一个真正好用的东西给大家用。”**

拿了全额奖学金来到 NTU 计算机工程系。大学那几年，我最大的冲动不是为了刷履历去比赛，而是纯粹觉得学校官方的系统和社区体验太差了——反应慢、设计粗糙、谁用谁难受。我觉得工程师就该有这种“看不得烂东西”的脾气，既然没人改，那我就在业余时间自己动手做一个。

我和朋友一起从零折腾了 **U-Wave**。我用 Flutter 把客户端整个重构了一遍，后端自己用 Spring Cloud 搭建微服务。那段时间特别纯粹，白天上课，晚上写代码。当看到它在坡岛各个高校慢慢传开，一路跑出 **20,000 注册用户和 4,000 日活（DAU）**，看到身边的同学都在真实高频地用自己敲出来的产品，那种兴奋和成就感比拿到什么奖项都要强烈。

毕业时我没有选择全职创业把 U-Wave 扛到底。现实很清醒也挺无奈：作为一名国际学生，首要目标是立足生存，我需要一份正规工作、需要拿 EP 工作准证才能留在新加坡。而且在这次校园创业里我也吃到了最生动的一课——**绝不应该对一个纯校园工具过早强行商业化**。当商业模式在客观场景下走不通时，硬去推变现只会透支用户信任、加速用户流失。大学画上句号，带着对真实工业级系统的敬畏，我迈进了大厂。

---

#### 【第 1 屏 // 字节跳动：2021 – 2023】
**时间轴标识**：`2021 – 2023 · BYTEDANCE / TIKTOK`  
**专属单色背景**：跨洋多机房同步网络、活跃心跳推拉拓扑发丝线稿  

> **“围城里的高并发熔炉：一人成军的孤岛，与千万级流量的现实课。”**

校招赶上了新加坡字节的大举扩招。大厂就像一座巨大的围城，里面有最先进的内部 Infra、最成熟的工作范式，也让人容易安逸地变成一颗螺丝钉。

刚入职不久，我被借调到了海外 Location 业务线。当时全团队在新加坡只有我一个工程师，顶着时差和远程沟通，一个人要扛近百个离线 Spark 数据任务和线上的 Go 定位服务，7×24 报警电话响个不停。刚开始确实痛苦，但我很快意识到盲目加班硬扛毫无意义，必须靠系统性减负活下来：我把此前无人过问的海外闲置资源彻底清查收敛，逐项优化日志误报与报警过滤，把 Go 服务的内存分配与 GC 压力调优下来。当海量告警终于被平息、服务真正稳定下来时，我拿到了在字节的第一个 **E（卓越）绩效和 Spot Bonus**。

后来转入 TikTok IM 核心链路，直面千万级全球流量的真实考验：
- **会话列表冷启动（Conversation Ranking）**：用户重装 App 时，底层 Append-only 存储常常连读上万条全是某个超活跃群聊的消息，导致收件箱只显示一条会话。我用 **Redis ZSET 活跃会话分层索引** 重构了冷启动链路，实现了首屏毫秒级多会话渲染；
- **在线状态（Presence）百万 QPS 广播风暴**：面对海量用户上下线，全量推送会瞬间冲垮网关。我设计了**“推拉结合 + 活跃心跳门禁”**机制，为每个用户维护活跃好友 ZSET，只向当前开着 App 的在线好友定向推送，彻底消除了写放大。

在字节我如期晋升 Senior、拿了奖金，但我也开始反思：大厂利润极其丰厚，很多时候大家沉迷于“技术很牛、优化很漂亮”，却缺乏对商业 ROI 的精打细算；而我一边实现着已读回执，一边写下了《我讨厌 IM》对隐私侵蚀的批判。看着大厂在商业压力下对理想主义原则的退让，我觉得自己像个被大厂光环包裹的“套路化程序员”。我必须走出来，看看外面的真实世界。

---

#### 【第 2 屏 // 探索与触礁：2023 – 2024】
**时间轴标识**：`2023 – 2024 · BONDEE & MARIBANK`  
**专属单色背景**：破茧几何线稿、K8s 容器与自主产品极细轮廓  

> **“逃离围城之后：初创的泡沫，与坚决不做流水线执行机器。”**

2023 年秋天，我果断裸出了字节。我不想一辈子只懂字节内部的闭源工具，我想去看看真实创业公司到底怎么跑。

我去了 Bondee，作为新加坡的 1 号软件工程师。刚去时感觉空间很大、很受信任，但现实给了我狠狠一击：公司的海外技术扩张缺乏真正的战略定力，短短几个月后扩张计划直接搁浅，技术团队几乎全被砍掉只留运营。那几个月我被迫当了全栈杂家，把 K8s 容器运维和 Vector/Kafka/ES 日志底座摸了一遍。我也不会去吹嘘什么惊天动地的降本神话，真实情况就是帮小团队替换了每月几百块钱的云托管日志，但它让我真切体会到了商业世界和初创团队的脆弱性。

受挫之后，出于对安全感（Job Security）的恐慌性代偿，加上当时 AI 还没全面爆发，我选择进入了数字银行 MariBank 做信贷核心业务。结果迎来了我整个职业生涯中最窒息的三个月：
极度死板、零自主度。所有的业务需求由业务方想好、交给 PM，输出的技术文档详尽死板到连每一个函数接口、每一张表字段都写得清清楚楚。**现在把那份 PRD 喂给 AI，都不需要程序员了。** 每天按部就班走 Sprint，感觉自己就像一个没有思想的代码打字机。

我是一个必须认可工作意义感的人。如果八个小时全用来做不喜欢、没有掌控感的事，我会从头顶难受到脚后跟。三个月后我果断斩仓离开——**我明确了自己的绝对底线：我是一个 Product Builder，我坚决不接受做一个纯粹的 Executor（提线木偶执行者）。**

在随后的空白期里，借助 AI 工具的爆发，我找回了纯粹的创造乐趣。我一个人快速做出了 **CanCan**（财务证据与对账台）、**CoffeeMode**（找咖极简指南）和 **Our Village**（社区协作）。我的动手能力被彻底解放，也彻底确立了我找寻下一站的不可妥协标准：必须有业务定义权，必须能发挥端到端的产品创造力。

---

#### 【第 3 屏 // Wise 与现在：2024 – 至今】
**时间轴标识**：`2024 – PRESENT · WISE`  
**专属单色背景**：AI 评估影子流水线、双人复核控制流、资金清算流线稿  

> **“技术永远为业务服务：拒绝自嗨，在真实业务泥潭中搭建 AI 基建。”**

2024 年底，我加入了 Wise 的 Payment Defects 团队，这是一家真正 Impact-driven 的公司。在这里，我们像 Autonomous Scout 一样，在一个巨大的全链路异常金钱池里自由探索，主攻最后 **0.5% 最复杂、此前全靠高成本人工在各个后台拼凑信息的资金对账顽疾（Last-mile Linking）**。

我在这里找到了主导全局系统的空间：
- **全球用户补偿平台（Compensation Platform）重构**：打通全球不同区域的 Compliance Review，设计通用轮子并落地 Double Proof / Double Approval 双人复核审批，对接全球多元支付渠道；
- **跨团队工单流转平台**：用 Kafka 彻底终结了客服（CS）与支付运营（PayOps）依赖 Zendesk 人工转单的孤岛历史。我更看重的不是“流转工单”，而是**根因预防（Prevention）**——利用沉淀的结构化数据反哺上游，彻底消灭那些因为文档上传失败等原因导致的工单。

更有技术含量的，是我从零搭建的 **AI Automation & Evaluation Infrastructure**：
在没有现成 Golden Dataset 的情况下，我拒绝为了虚荣盲目上不稳定的 ReAct Agent，而是选择了**高可靠的确定性 DAG 状态机**。我设计了**实时 Shadowing（影子流量）机制**，让线上 Case 同时喂给 AI 与真实人工 Ops 进行拟合度比对，驱动 Prompt 与工作流迭代，直到准召率突破 99.5% 才准许上线；上线后长驻 5% 对照流做金丝雀监控，一旦检测到 LLM 漂移，**秒级触发 Circuit Breaker 熔断** 切回人工。同时设计了大额强制人工确认与币种专属规则隔离。目前系统每月自动化处理 **30,000+ 个 Case**（98%+ 准召率），扣除模型推理算力后，为公司**净节省 £80,000 GBP/月（年化近百万英镑）**。

凭着这些端到端的交付，我如期晋升为了 **Product Engineer 3**。
我也坦诚反思过我的遗憾：在 Wise 强烈的短期 Impact 文化下，有时为了推得动事情，我做了过多的短期妥协，牺牲了一些长期复利的基础设施。未来在更高阶的位置上，我希望学会打好组合拳，以更有力的数据去坚持更有远见的技术投资。

---

#### 【尾声 // 个人自白：一个拧巴但全面的折腾者】
**时间轴标识**：`COLOPHON // NEVER SETTLE`  
**专属单色背景**：暗房标尺、微光指针发丝线稿  

> **“我很拧巴，但好处是我很全面。永不停止探索，Never Settle。”**

如果今天让我用一句话来形容我自己，我其实是一个很“拧巴”的人：
我喜欢钱，但我放弃了大厂更高薪资去了追求业务价值的 Wise；
我热爱技术，但我不是去钻研底层算法模型的学者型专家；
我迷恋创业和创造，但我又不敢在早期的初创公司拿全 RSU 裸奔赌命。

但我渐渐和自己的拧巴达成了和解，因为这种特质反向塑造了我的最大优势——**我极其全面**。

我既能深入到高并发分布式系统的最底层去排查内存抖动、抗住数百万 QPS 广播风暴，又能站在全局去理解商业痛点、协调跨部门阻力把复杂的业务平台跑通；我能在 AI 落地中保持极其务实的工程克制，也能在业余时间一个人端到端做出完整的独立产品。

我对自己最满意的地方，就是我身上那股从未熄灭的“折腾精神”。像一加说的那句 **Never Settle（不将就）**，像小米说的那句 **“永远相信美好的事情即将发生”**。

绝不做流水线上的提线木偶，永远保持对世界的好奇与创造欲。工程路长，继续折腾。


