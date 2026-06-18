# 后台管理系统数据整理清单

> 基于 network-app、security-app 两个大屏项目的可配置数据分析

---

## 一、卡片标题配置化

需要新增 `cards.json` 文件，提取以下硬编码标题：

### Network-app (网络大屏)

| 卡片ID | 标题(当前) | 说明 |
|--------|-----------|------|
| card-1 | 累计节点总收益 | StatCard 组件，无外框 |
| card-2 | 用户在线与分布情况 | PlainCard 组件 |
| card-3 | 节点状态与网络探测 | NodeStatusScanner 组件 |
| card-4 | 网络互联 | NetworkTopology 组件 |
| card-5 | 计算节点资源 | NodeResourceInfo 组件 |

### Security-app (安全大屏)

| 卡片ID | 标题(当前) | 说明 |
|--------|-----------|------|
| card-1 | 攻击源IP排名Top5 | ChartListCard 组件 |
| card-2 | 漏洞攻击类型分布Top5 | 硬编码 |
| card-3 | 卡型号平均收益 | 硬编码 |
| card-4 | 安全态势感知中心 | 硬编码 |
| card-5 | 告警变化趋势分析 | 硬编码 |
| card-6 | 安全状态扫描 | 硬编码 |
| card-7 | 实时安全告警日志流 | 硬编码 |

---

## 二、数据文件管理清单

### Network-app 数据

| 数据文件 | 卡片归属 | 可管理字段 | 类型 |
|---------|---------|-----------|------|
| `earningStats.json` | card-1 | totalEarnings, currency, dayEarnings | 数值 |
| `onlineUserStats.json` | card-2 | count, changeRate | 数值 |
| `userRegionData.json` | card-2 | 省份分布列表 (增删改) | 数组 |
| `deviceShareData.json` | card-3 | totalNodes, onlineCount, maintenanceCount, offlineCount, nodeStates | 混合 |
| `topologyData.json` | card-4 | 拓扑节点+链路 (增删节点/链路) | 图结构 |
| `nodeScanStats.json` | card-5 | 数据中心 cpu/memory/ioRate (增删改) | 数组 |
| `mapData.json` | 背景 | 专线延迟/丢包率 (增删改) | 数组 |
| `probeLinkData.json` | card-3 | 网络探针链路 | 数组 |

### Security-app 数据

| 数据文件 | 卡片归属 | 可管理字段 | 类型 |
|---------|---------|-----------|------|
| `securityStatus.json` | card-4 | score, statusText, todayAttacks | 数值 |
| `radarDimensions.json` | card-4 | 5个维度的 value (增删改) | 数组 |
| `attackIpRankData.json` | card-1 | IP排名列表 (增删改) | 数组 |
| `vulnTypeData.json` | card-2 | 漏洞类型列表 (增删改) | 数组 |
| `gpuModelEarnings.json` | card-3 | GPU型号+时薪 (增删改) | 数组 |
| `alarmTrendData.json` | card-5 | 时间点告警数据 (增删改) | 数组 |
| `securityScanStats.json` | card-6 | 扫描统计数据 | 数值 |
| `attackLogs.json` | card-7 | 攻击日志 (增删改，建议只读展示) | 数组 |

---

## 三、建议的数据文件结构

```
public/
├── data/
│   ├── cards.json          # 新增：卡片标题配置
│   ├── network/            # 新增：网络大屏数据目录
│   │   ├── basic.json      # 基础配置
│   │   ├── userRegion.json
│   │   ├── nodeScanStats.json
│   │   ├── topology.json
│   │   └── probeLink.json
│   └── security/           # 新增：安全大屏数据目录
│       ├── basic.json      # 基础配置
│       ├── attackIpRank.json
│       ├── vulnType.json
│       ├── gpuModel.json
│       ├── alarmTrend.json
│       └── attackLogs.json
```

---

## 四、可管理性分类

| 分类 | 数据特点 | 管理建议 |
|------|---------|---------|
| **数值配置** | score, count, percent 等单一数值 | 输入框编辑 |
| **数组列表** | 固定字段的行数据 | 表格CRUD |
| **图结构** | topologyData 节点+边 | 可视化编辑器 |
| **日志流** | attackLogs 时序日志 | 建议只读/追加 |

---

## 五、后续计划

1. [x] 设计 cards 配置结构（落地为 `CardConfig` 类型 + store 内联默认，未单独建 cards.json）
2. [x] 重组数据目录结构（`admin-app/public/data/{network,security}/`）
3. [x] 搭建后台管理前端框架（AppLayout + router）
4. [x] 实现各数据模块的 CRUD 页面（NetworkApp / SecurityApp 两页）

## 六、未纳入管理的数据

> 以下数据不纳入 admin-app 后台管理。原因有二：一是大屏实时采集数据，不具备静态配置意义；二是当前尚未接入。

### 1. 完全未接入（store 无对应字段）

| 数据文件 | 所属大屏 | 内容 | 未管理原因 |
|----------|---------|------|-----------|
| `nodeResourceData.json` | network-app | 设备类型占比（移动客户端 / 桌面客户端 / IoT 边缘） | 当前未接入，按需展示 |
| `mapData.json` | network-app | 地图节点、调推中心、连线（含经纬度坐标） | 结构复杂且为静态展示，未接入 |

### 2. 实时数据（不建议静态编辑）

| 数据文件 | 所属大屏 | 内容 | 说明 |
|----------|---------|------|------|
| `alarmTrendData.json` | security-app | 告警变化趋势（时序数据） | 实时采集，仅作只读展示 |
| `attackLogs.json` | security-app | 实时安全告警日志流 | 实时采集，仅支持只读 / 追加 |

## 七、实施记录

> 以下为本期已落地功能与改动（均在 admin-app 工程内）。

### 1. 数据源迁移：localStorage 内联 → public/data/*.json

- 在 `admin-app/public/data/` 生成 13 个基线 json：`network/` 7 个 + `security/` 6 个，文件名与大屏 `public/data` 完全一致，内容为 store 源码默认值
- store 新增 `init()`：启动时 `fetch` 这些 json 作为基线，失败回退内联默认值
- `main.tsx` 渲染前 `await dataStore.init()`
- `resetAll` / `resetApp` 改为回到 **public 基线**（而非内联默认值）

**三层数据流**：`public/data/*.json`（基线）→ 内联 default（兜底）→ localStorage（用户编辑覆盖层）

### 2. 导出 JSON 下载

- 新增依赖 `jszip`
- 新增 `src/utils/exportData.ts`：store 字段 → 大屏文件名 1:1 映射 + zip 打包（`network/` + `security/` 目录）+ 浏览器下载
- `AppLayout` 顶栏新增「导出全部数据」按钮，产出 `admin-data-export-YYYYMMDD.zip`
- 解压后覆盖大屏 `public/data/` 即生效

### 3. 涉及文件

| 文件 | 改动 |
|------|------|
| `src/store/index.ts` | 新增 `init` / `publicData` / `clone` / `fetchJson`；reset 改用 public 基线 |
| `src/main.tsx` | 渲染前 `await init()` |
| `src/utils/exportData.ts` | 新增：导出工具模块 |
| `src/components/Layout/AppLayout.tsx` | 顶栏新增「导出全部数据」按钮 |
| `public/data/network/*.json` | 新增 7 个基线文件 |
| `public/data/security/*.json` | 新增 6 个基线文件 |
| `package.json` | 新增 `jszip` 依赖 |

### 4. 已知边界

- admin-app **浏览器内编辑**只写 localStorage，**不会自动写回 public json**（浏览器沙箱限制）
- 写回 public 两种方式：① 由 Claude 用 Write 直接改 `public/data/*.json`；② 顶栏「导出全部数据」下载后手动覆盖
- 改 public json 后需清浏览器 localStorage 再刷新，admin-app 才能看到变化（localStorage 优先）

### 5. 交叉引用

未纳入管理的数据（实时 / 未接入）见第六节，不进入 public 基线，仍用内联默认值。

---

*文档生成时间: 2026-06-17*

---

## 八、扩展：新增四个大屏（2026-06-17）

基于截图识别结果，新增四个大屏的管理能力：

### 新增大屏列表

| 路由 | 大屏名称 | App Key | 数据模块数 |
|------|---------|---------|-----------|
| `/knowledge` | 知识系统大屏 | `knowledge` | 6个 |
| `/compute-ops` | 算力运营大屏 | `compute-ops` | 10个 |
| `/compute-monitor` | 算力监控大屏 | `compute-monitor` | 2个 |
| `/ops` | 运维监控大屏 | `ops` | 2个 |

### 新增页面组件

| 文件 | Tab 模块 |
|------|---------|
| `src/pages/KnowledgeApp/index.tsx` | 存储状态、业务数据、应用Top5、用户Top5、文件Top5 |
| `src/pages/ComputeOpsApp/index.tsx` | 算力概览、授权统计、模型分布、Token统计、趋势、热门模型 |
| `src/pages/ComputeMonitorApp/index.tsx` | GPU指标、资源利用率、Top5排行（只读） |
| `src/pages/OpsApp/index.tsx` | 算力指标、能耗统计 |

*文档更新时间: 2026-06-17*