// ========== 卡片标题配置 ==========
export type AppType = 'network' | 'security' | 'knowledge' | 'compute-ops' | 'compute-monitor' | 'ops';

export interface CardConfig {
  id: string;
  title: string;
  app: AppType;
  component?: string;
  description?: string;
}

// ========== Network-app 数据类型 ==========

// 基础统计配置
export interface EarningStats {
  totalEarnings: number;
  currency: string;
  dayEarnings: number;
}

export interface OnlineUserStats {
  count: number;
  changeRate: number;
}

// 用户地区分布
export interface UserRegion {
  province: string;
  count: number;
  percent: number;
}

// 节点状态
export interface DeviceShare {
  totalNodes: number;
  scanProgress: number;
  onlineCount: number;
  maintenanceCount: number;
  offlineCount: number;
  nodeStates: string[];
}

// 数据中心资源
export interface NodeScanStat {
  name: string;
  cpu: number;
  memory: number;
  ioRate: number;
}

// 网络探针
export interface ProbeLink {
  linkName: string;
  latency: number;
  lossRate: number;
}

// 拓扑节点
export interface TopologyNode {
  id: string;
  label: string;
  type: string;
  status: string;
}

// 拓扑链路
export interface TopologyLink {
  source: string;
  target: string;
  bandwidth: number;
  usage: number;
}

export interface TopologyData {
  nodes: TopologyNode[];
  links: TopologyLink[];
}

// ========== Security-app 数据类型 ==========

// 安全状态
export interface SecurityStatus {
  score: number;
  statusText: string;
  todayAttacks: number;
}

// 雷达维度
export interface RadarDimension {
  name: string;
  value: number;
  max?: number;
}

// 攻击IP排名
export interface AttackIpRank {
  rank?: number;
  ip: string;
  location: string;
  count: number;
}

// 漏洞类型
export interface VulnType {
  type: string;
  count: number;
}

// GPU收益
export interface GpuModelEarning {
  modelName: string;
  earningsPerHour: number;
}

// 告警趋势
export interface AlarmTrendPoint {
  time: string;
  critical: number;
  warning: number;
}

// 安全扫描统计
export interface SecurityScanStats {
  totalNodesScanned: number;
  scanProgress: number;
  passedCount: number;
  vulnWarningCount: number;
  highRiskCount: number;
}

// 攻击日志
export interface AttackLog {
  id: string;
  time: string;
  sourceIp: string;
  targetName: string;
  attackType: string;
  severity: 'critical' | 'warning' | 'info';
}

// ========== Knowledge-app 数据类型 ==========

export interface StorageStats {
  total: number;
  used: number;
  free: number;
  usageRate: number;
}

export interface BusinessStats {
  appCount: number;
  kbCount: number;
  fileCount: number;
  userCount: number;
  questionCount: number;
  internalQuestions: number;
  externalQuestions: number;
}

export interface AppUsageRank {
  appName: string;
  count: number;
}

export interface UserQuestionRank {
  userName: string;
  count: number;
}

export interface FileUsageRank {
  fileName: string;
  count: number;
}

export interface DailyVisit {
  date: string;
  count: number;
}

// ========== ComputeOps-app 数据类型 ==========

export interface HostInfo {
  selectedHost: string;
  cluster: string;
}

export interface ComputeUsage {
  usageRate: number;
  used: number;
  free: number;
}

export interface AlarmStats {
  computeAlarm: [severe: number, normal: number];
  dispatchAlarm: [severe: number, normal: number];
  clusterAlarm: [severe: number, normal: number];
  nodeAlarm: [severe: number, normal: number];
}

export interface AuthStats {
  publicAuth: number;
  publicInstances: number;
  privateAuth: number;
  privateInstances: number;
  externalAccess: number;
}

export interface ModelDistribution {
  type: string;
  count: number;
}

export interface RunningInstance {
  type: string;
  count: number;
}

export interface TokenStats {
  todayTotal: number;
  yesterdayTotal: number;
  todayCalls: number;
  yesterdayCalls: number;
}

export interface TokenTrendPoint {
  date: string;
  totalToken: number;
  callCount: number;
}

export interface HotModelRank {
  rank: number;
  modelName: string;
}

export interface TokenConsumeRank {
  rank: number;
  tenantName: string;
  consume: number;
}

// ========== ComputeMonitor-app 数据类型 ==========

export interface GpuStats {
  totalPfloops: number;
  totalPowerKw: number;
  cpuCores: number;
  gpuCards: number;
  vramTotalGb: number;
  memoryTotalGb: number;
}

export interface Utilization {
  gpuUsage: number;
  vramUsage: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface GpuTop5Entry {
  node: string;
  value: number;
}

export interface GpuVendor {
  vendor: string;
  percent: number;
}

export interface GpuModel {
  model: string;
  percent: number;
}

// ========== Ops-app 数据类型 ==========

export interface OpsStats {
  totalCompute: number;
  usedCompute: number;
  computeUsageRate: number;
  soldCompute: number;
  computeAllocRate: number;
}

export interface PowerConsume {
  kwh: number;
}