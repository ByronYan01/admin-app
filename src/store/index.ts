import type {
  CardConfig,
  EarningStats,
  OnlineUserStats,
  UserRegion,
  DeviceShare,
  NodeScanStat,
  ProbeLink,
  TopologyData,
  SecurityStatus,
  RadarDimension,
  AttackIpRank,
  VulnType,
  GpuModelEarning,
  AlarmTrendPoint,
  SecurityScanStats,
  AttackLog,
  StorageStats,
  BusinessStats,
  AppUsageRank,
  UserQuestionRank,
  FileUsageRank,
  DailyVisit,
  HostInfo,
  ComputeUsage,
  AlarmStats,
  AuthStats,
  ModelDistribution,
  RunningInstance,
  TokenStats,
  TokenTrendPoint,
  HotModelRank,
  TokenConsumeRank,
  GpuStats,
  Utilization,
  GpuTop5Entry,
  GpuVendor,
  GpuModel,
  OpsStats,
  PowerConsume,
} from '@/types';

// ========== 默认数据 ==========

// 卡片标题配置
export const defaultCards: CardConfig[] = [
  { id: 'n1', title: '累计节点总收益', app: 'network', component: 'StatCard' },
  { id: 'n2', title: '用户在线与分布情况', app: 'network', component: 'PlainCard' },
  { id: 'n3', title: '节点状态与网络探测', app: 'network', component: 'NodeStatusScanner' },
  { id: 'n4', title: '网络互联', app: 'network', component: 'NetworkTopology' },
  { id: 'n5', title: '计算节点资源', app: 'network', component: 'NodeResourceInfo' },
  { id: 's1', title: '攻击源IP排名Top5', app: 'security', component: 'ChartListCard' },
  { id: 's2', title: '漏洞攻击类型分布Top5', app: 'security' },
  { id: 's3', title: 'GPU型号平均收益', app: 'security' },
  { id: 's4', title: '安全态势感知中心', app: 'security' },
  { id: 's5', title: '告警变化趋势分析', app: 'security' },
  { id: 's6', title: '安全状态扫描', app: 'security' },
  { id: 's7', title: '实时安全告警日志流', app: 'security' },
];

// ========== Network-app 默认数据 ==========
export const defaultEarningStats: EarningStats = {
  totalEarnings: 3418520.5,
  currency: 'CNY',
  dayEarnings: 15420.0,
};

export const defaultOnlineUserStats: OnlineUserStats = {
  count: 12845,
  changeRate: 4.8,
};

export const defaultUserRegion: UserRegion[] = [
  { province: '广东', count: 3200, percent: 24.9 },
  { province: '北京', count: 2800, percent: 21.8 },
  { province: '上海', count: 2100, percent: 16.3 },
  { province: '浙江', count: 1800, percent: 14.0 },
  { province: '四川', count: 1100, percent: 8.5 },
];

export const defaultDeviceShare: DeviceShare = {
  totalNodes: 80,
  scanProgress: 100,
  onlineCount: 75,
  maintenanceCount: 3,
  offlineCount: 2,
  nodeStates: [
    'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online',
    'online', 'online', 'online', 'online', 'online', 'online', 'online', 'maintenance', 'online', 'online',
    'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online',
    'online', 'online', 'online', 'online', 'online', 'offline', 'online', 'online', 'online', 'online',
    'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online',
    'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online', 'online',
    'online', 'online', 'online', 'online', 'online', 'online', 'online', 'maintenance', 'online', 'online',
    'offline', 'online',
  ],
};

export const defaultNodeScanStats: NodeScanStat[] = [
  { name: '华北数据中心', cpu: 42, memory: 58, ioRate: 420 },
  { name: '华东数据中心', cpu: 65, memory: 72, ioRate: 610 },
  { name: '华南数据中心', cpu: 82, memory: 88, ioRate: 980 },
  { name: '西部云算力节点', cpu: 28, memory: 41, ioRate: 150 },
];

export const defaultProbeLink: ProbeLink[] = [
  { linkName: '北京-上海 专线', latency: 28, lossRate: 0.01 },
  { linkName: '北京-广州 专线', latency: 38, lossRate: 0.03 },
  { linkName: '上海-深圳 专线', latency: 18, lossRate: 0.0 },
  { linkName: '北京-成都 备线', latency: 45, lossRate: 0.05 },
  { linkName: '成都-深圳 专线', latency: 32, lossRate: 0.01 },
];

export const defaultTopologyData: TopologyData = {
  nodes: [
    { id: 'R1', label: '核心路由器01', type: 'router', status: 'up' },
    { id: 'R2', label: '骨干交换机02', type: 'switch', status: 'up' },
    { id: 'R3', label: '安全防护墙集群', type: 'core', status: 'up' },
    { id: 'R4', label: '边缘汇聚节点', type: 'switch', status: 'up' },
    { id: 'R5', label: '备份路由器02', type: 'router', status: 'up' },
    { id: 'R6', label: '分支分发服务器', type: 'switch', status: 'up' },
    { id: 'R7', label: '节点监控探针A', type: 'switch', status: 'up' },
    { id: 'R8', label: '节点监控探针B', type: 'switch', status: 'down' },
  ],
  links: [
    { source: 'R1', target: 'R2', bandwidth: 100, usage: 45 },
    { source: 'R2', target: 'R3', bandwidth: 200, usage: 68 },
    { source: 'R3', target: 'R4', bandwidth: 50, usage: 12 },
    { source: 'R1', target: 'R5', bandwidth: 150, usage: 30 },
    { source: 'R5', target: 'R3', bandwidth: 200, usage: 55 },
    { source: 'R2', target: 'R6', bandwidth: 100, usage: 40 },
    { source: 'R4', target: 'R7', bandwidth: 10, usage: 82 },
    { source: 'R4', target: 'R8', bandwidth: 10, usage: 0 },
  ],
};

// ========== Security-app 默认数据 ==========
export const defaultSecurityStatus: SecurityStatus = {
  score: 92,
  statusText: '态势良好',
  todayAttacks: 14285,
};

export const defaultRadarDimensions: RadarDimension[] = [
  { name: '应用安全', value: 88, max: 100 },
  { name: '边界防御', value: 95, max: 100 },
  { name: '主机入侵', value: 92, max: 100 },
  { name: '漏洞态势', value: 85, max: 100 },
  { name: '合规检测', value: 90, max: 100 },
];

export const defaultAttackIpRank: AttackIpRank[] = [
  { rank: 1, ip: '198.51.100.42', location: '海外地区', count: 3412 },
  { rank: 2, ip: '203.0.113.88', location: '华东地区', count: 2180 },
  { rank: 3, ip: '192.0.2.145', location: '海外地区', count: 1890 },
  { rank: 4, ip: '81.92.12.33', location: '华南地区', count: 1250 },
  { rank: 5, ip: '45.112.9.11', location: '局域网段', count: 870 },
];

export const defaultVulnType: VulnType[] = [
  { type: 'SQL注入攻击', count: 4850 },
  { type: 'XSS跨站脚本', count: 3200 },
  { type: 'DDoS流量攻击', count: 2900 },
  { type: '密码暴力破解', count: 1800 },
  { type: '非授权文件上传', count: 1535 },
];

export const defaultGpuModelEarnings: GpuModelEarning[] = [
  { modelName: 'NVIDIA H800', earningsPerHour: 45.0 },
  { modelName: 'NVIDIA A100', earningsPerHour: 32.5 },
  { modelName: 'NVIDIA L40S', earningsPerHour: 24.8 },
  { modelName: 'RTX 4090', earningsPerHour: 12.0 },
  { modelName: 'NVIDIA A30', earningsPerHour: 8.5 },
];

export const defaultAlarmTrend: AlarmTrendPoint[] = [
  { time: '00:00', critical: 5, warning: 18 },
  { time: '02:00', critical: 3, warning: 12 },
  { time: '04:00', critical: 4, warning: 15 },
  { time: '06:00', critical: 2, warning: 10 },
  { time: '08:00', critical: 8, warning: 28 },
  { time: '10:00', critical: 15, warning: 45 },
  { time: '12:00', critical: 12, warning: 38 },
  { time: '14:00', critical: 20, warning: 56 },
  { time: '16:00', critical: 18, warning: 50 },
  { time: '18:00', critical: 28, warning: 75 },
  { time: '20:00', critical: 22, warning: 62 },
  { time: '22:00', critical: 10, warning: 35 },
];

export const defaultSecurityScanStats: SecurityScanStats = {
  totalNodesScanned: 120,
  scanProgress: 88,
  passedCount: 112,
  vulnWarningCount: 6,
  highRiskCount: 2,
};

export const defaultAttackLogs: AttackLog[] = [
  { id: '1', time: '16:01:05', sourceIp: '198.51.100.42', targetName: 'API_Gateway_01', attackType: 'SQL注入恶意探测', severity: 'critical' },
  { id: '2', time: '16:01:42', sourceIp: '203.0.113.88', targetName: 'Portal_Web_Server', attackType: '密码暴破尝试', severity: 'warning' },
  { id: '3', time: '16:02:11', sourceIp: '192.0.2.145', targetName: 'DB_Server_Cluster', attackType: '未授权敏感文件读取', severity: 'critical' },
  { id: '4', time: '16:03:00', sourceIp: '81.92.12.33', targetName: 'LB_Router_02', attackType: 'SYN Flood 流量清洗警告', severity: 'info' },
  { id: '5', time: '16:03:55', sourceIp: '45.112.9.11', targetName: 'Auth_Service', attackType: 'SSRF漏洞请求劫持', severity: 'warning' },
];

// ========== Knowledge-app 默认数据 ==========
export const defaultStorageStats: StorageStats = {
  total: 5,
  used: 0.2,
  free: 4.8,
  usageRate: 4,
};

export const defaultBusinessStats: BusinessStats = {
  appCount: 10,
  kbCount: 6,
  fileCount: 328,
  userCount: 3,
  questionCount: 14,
  internalQuestions: 8,
  externalQuestions: 6,
};

export const defaultAppUsageRank: AppUsageRank[] = [
  { appName: '销售助手', count: 4 },
  { appName: '企划图片专家', count: 2 },
  { appName: '政南问答助手', count: 2 },
  { appName: '医疗智能导诊', count: 1 },
  { appName: '帕特FACut窗口专家', count: 1 },
];

export const defaultUserQuestionRank: UserQuestionRank[] = [
  { userName: 'admin', count: 9 },
  { userName: 'chengzhendong', count: 1 },
  { userName: 'superadmin', count: 1 },
];

export const defaultFileUsageRank: FileUsageRank[] = [
  { fileName: '新增遗留公...', count: 6 },
  { fileName: '22-13...', count: 6 },
  { fileName: '报告模板-...', count: 3 },
  { fileName: '00000...', count: 3 },
  { fileName: '新智慧办公...', count: 3 },
];

export const defaultDailyVisit: DailyVisit[] = [];

// ========== ComputeOps-app 默认数据 ==========
export const defaultHostInfo: HostInfo = {
  selectedHost: 'k1-50-worker11',
  cluster: '星石 K1-50',
};

export const defaultComputeUsage: ComputeUsage = {
  usageRate: 63,
  used: 40,
  free: 24,
};

export const defaultAlarmStats: AlarmStats = {
  computeAlarm: [0, 4],
  dispatchAlarm: [0, 0],
  clusterAlarm: [0, 0],
  nodeAlarm: [0, 0],
};

export const defaultAuthStats: AuthStats = {
  publicAuth: 168,
  publicInstances: 12,
  privateAuth: 0,
  privateInstances: 0,
  externalAccess: 0,
};

export const defaultModelDistribution: ModelDistribution[] = [
  { type: '大语言模型', count: 72 },
  { type: '文本嵌入', count: 4 },
  { type: '文本重排', count: 4 },
  { type: '代码生成', count: 9 },
  { type: '语音识别', count: 7 },
  { type: '语音合成', count: 10 },
  { type: '视觉语言模型', count: 55 },
  { type: '文生图', count: 4 },
  { type: 'OpenMineru', count: 2 },
  { type: 'YOLO', count: 1 },
];

export const defaultRunningInstances: RunningInstance[] = [
  { type: '大语言模型', count: 4 },
  { type: '文本嵌入', count: 2 },
  { type: '文本重排', count: 1 },
  { type: '语音识别', count: 1 },
  { type: '语音合成', count: 1 },
  { type: '视觉语言模型', count: 2 },
  { type: 'OpenMineru', count: 1 },
];

export const defaultTokenStats: TokenStats = {
  todayTotal: 18133555,
  yesterdayTotal: 9040168,
  todayCalls: 2845,
  yesterdayCalls: 1645,
};

export const defaultTokenTrend: TokenTrendPoint[] = [
  { date: '2026-06-11', totalToken: 25000000, callCount: 3500 },
  { date: '2026-06-12', totalToken: 28000000, callCount: 3800 },
  { date: '2026-06-13', totalToken: 8000000, callCount: 1200 },
  { date: '2026-06-14', totalToken: 12000000, callCount: 1800 },
  { date: '2026-06-15', totalToken: 11500000, callCount: 1700 },
  { date: '2026-06-16', totalToken: 11800000, callCount: 1750 },
  { date: '2026-06-17', totalToken: 14000000, callCount: 2100 },
];

export const defaultHotModelRank: HotModelRank[] = [
  { rank: 1, modelName: 'Qwen2.5-7B-Instruct' },
  { rank: 2, modelName: 'Qwen2.5-32B' },
  { rank: 3, modelName: 'MiniMax-Text-01' },
  { rank: 4, modelName: 'Qwen2.5-27B' },
  { rank: 5, modelName: 'Qwen3-Embedding-4B' },
  { rank: 6, modelName: 'bge-reranker-v2-m3' },
  { rank: 7, modelName: 'bge-m3' },
  { rank: 8, modelName: 'Qwen3-TTS-12Hz-0.6B-Base' },
];

export const defaultTokenConsumeRank: TokenConsumeRank[] = [
  { rank: 1, tenantName: 'chengzhendong-default', consume: 8500000 },
  { rank: 2, tenantName: 'fengvv-default', consume: 5200000 },
  { rank: 3, tenantName: 'superadmin-default', consume: 3100000 },
  { rank: 4, tenantName: 'tianhuiqiang-default', consume: 1800000 },
  { rank: 5, tenantName: 'luopan-default', consume: 1200000 },
];

// ========== ComputeMonitor-app 默认数据 ==========
export const defaultGpuStats: GpuStats = {
  totalPfloops: 323.6,
  totalPowerKw: 456,
  cpuCores: 66618,
  gpuCards: 760,
  vramTotalGb: 25600,
  memoryTotalGb: 52268,
};

export const defaultUtilization: Utilization = {
  gpuUsage: 0,
  vramUsage: 48.3,
  cpuUsage: 0.8,
  memoryUsage: 9.3,
};

export const defaultGpuUsageTop5: GpuTop5Entry[] = [
  { node: '0 星石/k1-50-worker14', value: 0 },
  { node: '7 星石/k1-50-worker14', value: 7 },
  { node: '4 星石/k1-50-worker14', value: 4 },
  { node: '6 星石/k1-50-worker14', value: 6 },
  { node: '3 星石/k1-50-worker14', value: 3 },
];

export const defaultVramUsageTop5: GpuTop5Entry[] = [
  { node: '3 星石/k1-50-worker02', value: 98 },
  { node: '4 星石/k1-50-worker02', value: 95 },
  { node: '5 星石/k1-50-worker02', value: 92 },
  { node: '6 星石/k1-50-worker02', value: 88 },
  { node: '0 星石/k1-50-worker01', value: 85 },
];

export const defaultGpuPowerTop5: GpuTop5Entry[] = [
  { node: 'GPU7 星石/k1-50-worker01', value: 30.8 },
  { node: 'GPU0 星石/k1-50-worker15', value: 28.2 },
  { node: 'GPU5 星石/k1-50-worker15', value: 26.5 },
  { node: 'GPU7 星石/k1-50-worker04', value: 23.9 },
  { node: 'GPU5 星石/k1-50-worker02', value: 23.5 },
];

export const defaultGpuTempTop5: GpuTop5Entry[] = [
  { node: 'GPU2 星石/k1-50-worker13', value: 31 },
  { node: 'GPU3 星石/k1-50-worker13', value: 30 },
  { node: 'GPU0 星石/k1-50-worker13', value: 30 },
  { node: 'GPU2 星石/k1-50-worker14', value: 29 },
  { node: 'GPU1 星石/k1-50-worker13', value: 29 },
];

export const defaultGpuVendor: GpuVendor[] = [
  { vendor: '星石', percent: 100 },
];

export const defaultGpuModel: GpuModel[] = [];

// ========== Ops-app 默认数据 ==========
export const defaultOpsStats: OpsStats = {
  totalCompute: 323.6,
  usedCompute: 4.2,
  computeUsageRate: 1.3,
  soldCompute: 323.6,
  computeAllocRate: 100,
};

export const defaultPowerConsume: PowerConsume = {
  kwh: 4000,
};

// ========== Storage Key ==========
const STORAGE_KEY = 'dashboard-admin-data';

type AppType = 'network' | 'security' | 'knowledge' | 'compute-ops' | 'compute-monitor' | 'ops';

interface StorageData {
  cards: CardConfig[];
  // Network-app 数据
  earningStats: EarningStats;
  onlineUserStats: OnlineUserStats;
  userRegion: UserRegion[];
  deviceShare: DeviceShare;
  nodeScanStats: NodeScanStat[];
  probeLink: ProbeLink[];
  topologyData: TopologyData;
  // Security-app 数据
  securityStatus: SecurityStatus;
  radarDimensions: RadarDimension[];
  attackIpRank: AttackIpRank[];
  vulnType: VulnType[];
  gpuModelEarnings: GpuModelEarning[];
  alarmTrend: AlarmTrendPoint[];
  securityScanStats: SecurityScanStats;
  attackLogs: AttackLog[];
  // Knowledge-app 数据
  storageStats: StorageStats;
  businessStats: BusinessStats;
  appUsageRank: AppUsageRank[];
  userQuestionRank: UserQuestionRank[];
  fileUsageRank: FileUsageRank[];
  dailyVisit: DailyVisit[];
  // ComputeOps-app 数据
  hostInfo: HostInfo;
  computeUsage: ComputeUsage;
  alarmStats: AlarmStats;
  authStats: AuthStats;
  modelDistribution: ModelDistribution[];
  runningInstances: RunningInstance[];
  tokenStats: TokenStats;
  tokenTrend: TokenTrendPoint[];
  hotModelRank: HotModelRank[];
  tokenConsumeRank: TokenConsumeRank[];
  // ComputeMonitor-app 数据
  gpuStats: GpuStats;
  utilization: Utilization;
  gpuUsageTop5: GpuTop5Entry[];
  vramUsageTop5: GpuTop5Entry[];
  gpuPowerTop5: GpuTop5Entry[];
  gpuTempTop5: GpuTop5Entry[];
  gpuVendor: GpuVendor[];
  gpuModel: GpuModel[];
  // Ops-app 数据
  opsStats: OpsStats;
  powerConsume: PowerConsume;
}

const defaultData: StorageData = {
  cards: defaultCards,
  // Network-app
  earningStats: defaultEarningStats,
  onlineUserStats: defaultOnlineUserStats,
  userRegion: defaultUserRegion,
  deviceShare: defaultDeviceShare,
  nodeScanStats: defaultNodeScanStats,
  probeLink: defaultProbeLink,
  topologyData: defaultTopologyData,
  // Security-app
  securityStatus: defaultSecurityStatus,
  radarDimensions: defaultRadarDimensions,
  attackIpRank: defaultAttackIpRank,
  vulnType: defaultVulnType,
  gpuModelEarnings: defaultGpuModelEarnings,
  alarmTrend: defaultAlarmTrend,
  securityScanStats: defaultSecurityScanStats,
  attackLogs: defaultAttackLogs,
  // Knowledge-app
  storageStats: defaultStorageStats,
  businessStats: defaultBusinessStats,
  appUsageRank: defaultAppUsageRank,
  userQuestionRank: defaultUserQuestionRank,
  fileUsageRank: defaultFileUsageRank,
  dailyVisit: defaultDailyVisit,
  // ComputeOps-app
  hostInfo: defaultHostInfo,
  computeUsage: defaultComputeUsage,
  alarmStats: defaultAlarmStats,
  authStats: defaultAuthStats,
  modelDistribution: defaultModelDistribution,
  runningInstances: defaultRunningInstances,
  tokenStats: defaultTokenStats,
  tokenTrend: defaultTokenTrend,
  hotModelRank: defaultHotModelRank,
  tokenConsumeRank: defaultTokenConsumeRank,
  // ComputeMonitor-app
  gpuStats: defaultGpuStats,
  utilization: defaultUtilization,
  gpuUsageTop5: defaultGpuUsageTop5,
  vramUsageTop5: defaultVramUsageTop5,
  gpuPowerTop5: defaultGpuPowerTop5,
  gpuTempTop5: defaultGpuTempTop5,
  gpuVendor: defaultGpuVendor,
  gpuModel: defaultGpuModel,
  // Ops-app
  opsStats: defaultOpsStats,
  powerConsume: defaultPowerConsume,
};

// 从 public/data/*.json 读取，失败回退传入的默认值
async function fetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`请求失败: ${res.status}`);
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`加载 ${url} 失败，使用默认值:`, e);
    return fallback;
  }
}

// ========== Store 操作 ==========
class DataStore {
  private data: StorageData;
  private publicData: StorageData;
  private initialized = false;

  constructor() {
    this.data = this.load();
    this.publicData = { ...defaultData };
  }

  private load(): StorageData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultData, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('加载数据失败:', e);
    }
    return { ...defaultData };
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('保存数据失败:', e);
    }
  }

  async init() {
    if (this.initialized) return;
    this.initialized = true;
    const results = await Promise.all([
      // Security-app (0-6)
      fetchJson('/data/security/securityStatus.json', defaultSecurityStatus),
      fetchJson('/data/security/radarDimensions.json', defaultRadarDimensions),
      fetchJson('/data/security/attackIpRankData.json', defaultAttackIpRank),
      fetchJson('/data/security/vulnTypeData.json', defaultVulnType),
      fetchJson('/data/security/gpuModelEarnings.json', defaultGpuModelEarnings),
      fetchJson('/data/security/securityScanStats.json', defaultSecurityScanStats),
      fetchJson('/data/security/cards.json', []),
      // Network-app (7-14)
      fetchJson('/data/network/earningStats.json', defaultEarningStats),
      fetchJson('/data/network/onlineUserStats.json', defaultOnlineUserStats),
      fetchJson('/data/network/userRegionData.json', defaultUserRegion),
      fetchJson('/data/network/deviceShareData.json', defaultDeviceShare),
      fetchJson('/data/network/nodeScanStats.json', defaultNodeScanStats),
      fetchJson('/data/network/probeLinkData.json', defaultProbeLink),
      fetchJson('/data/network/topologyData.json', defaultTopologyData),
      fetchJson('/data/network/cards.json', []),
      // Knowledge-app (15-21)
      fetchJson('/data/knowledge/storageStats.json', defaultStorageStats),
      fetchJson('/data/knowledge/businessStats.json', defaultBusinessStats),
      fetchJson('/data/knowledge/appUsageRank.json', defaultAppUsageRank),
      fetchJson('/data/knowledge/userQuestionRank.json', defaultUserQuestionRank),
      fetchJson('/data/knowledge/fileUsageRank.json', defaultFileUsageRank),
      fetchJson('/data/knowledge/dailyVisit.json', defaultDailyVisit),
      fetchJson('/data/knowledge/cards.json', []),
      // ComputeOps-app (22-32)
      fetchJson('/data/compute-ops/hostInfo.json', defaultHostInfo),
      fetchJson('/data/compute-ops/computeUsage.json', defaultComputeUsage),
      fetchJson('/data/compute-ops/alarmStats.json', defaultAlarmStats),
      fetchJson('/data/compute-ops/authStats.json', defaultAuthStats),
      fetchJson('/data/compute-ops/modelDistribution.json', defaultModelDistribution),
      fetchJson('/data/compute-ops/runningInstances.json', defaultRunningInstances),
      fetchJson('/data/compute-ops/tokenStats.json', defaultTokenStats),
      fetchJson('/data/compute-ops/tokenTrend.json', defaultTokenTrend),
      fetchJson('/data/compute-ops/hotModelRank.json', defaultHotModelRank),
      fetchJson('/data/compute-ops/tokenConsumeRank.json', defaultTokenConsumeRank),
      fetchJson('/data/compute-ops/cards.json', []),
      // ComputeMonitor-app (33-41)
      fetchJson('/data/compute-monitor/gpuStats.json', defaultGpuStats),
      fetchJson('/data/compute-monitor/utilization.json', defaultUtilization),
      fetchJson('/data/compute-monitor/gpuUsageTop5.json', defaultGpuUsageTop5),
      fetchJson('/data/compute-monitor/vramUsageTop5.json', defaultVramUsageTop5),
      fetchJson('/data/compute-monitor/gpuPowerTop5.json', defaultGpuPowerTop5),
      fetchJson('/data/compute-monitor/gpuTempTop5.json', defaultGpuTempTop5),
      fetchJson('/data/compute-monitor/gpuVendor.json', defaultGpuVendor),
      fetchJson('/data/compute-monitor/gpuModel.json', defaultGpuModel),
      fetchJson('/data/compute-monitor/cards.json', []),
      // Ops-app (42-44)
      fetchJson('/data/ops/opsStats.json', defaultOpsStats),
      fetchJson('/data/ops/powerConsume.json', defaultPowerConsume),
      fetchJson('/data/ops/cards.json', []),
    ]);
    const securityCards = results[6] as CardConfig[];
    const networkCards = results[14] as CardConfig[];
    const knowledgeCards = results[21] as CardConfig[];
    const computeOpsCards = results[32] as CardConfig[];
    const computeMonitorCards = results[41] as CardConfig[];
    const opsCards = results[44] as CardConfig[];
    this.publicData = {
      cards: [...securityCards, ...networkCards, ...knowledgeCards, ...computeOpsCards, ...computeMonitorCards, ...opsCards],
      // Security-app
      securityStatus: results[0],
      radarDimensions: results[1],
      attackIpRank: results[2],
      vulnType: results[3],
      gpuModelEarnings: results[4],
      alarmTrend: defaultAlarmTrend,
      securityScanStats: results[5],
      attackLogs: defaultAttackLogs,
      // Network-app
      earningStats: results[7],
      onlineUserStats: results[8],
      userRegion: results[9],
      deviceShare: results[10],
      nodeScanStats: results[11],
      probeLink: results[12],
      topologyData: results[13],
      // Knowledge-app
      storageStats: results[15],
      businessStats: results[16],
      appUsageRank: results[17],
      userQuestionRank: results[18],
      fileUsageRank: results[19],
      dailyVisit: results[20],
      // ComputeOps-app
      hostInfo: results[22],
      computeUsage: results[23],
      alarmStats: results[24],
      authStats: results[25],
      modelDistribution: results[26],
      runningInstances: results[27],
      tokenStats: results[28],
      tokenTrend: results[29],
      hotModelRank: results[30],
      tokenConsumeRank: results[31],
      // ComputeMonitor-app
      gpuStats: results[33],
      utilization: results[34],
      gpuUsageTop5: results[35],
      vramUsageTop5: results[36],
      gpuPowerTop5: results[37],
      gpuTempTop5: results[38],
      gpuVendor: results[39],
      gpuModel: results[40],
      // Ops-app
      opsStats: results[42],
      powerConsume: results[43],
    };
    // 完全使用 publicData 的 cards（来自 json）
    this.data.cards = [...this.publicData.cards];
    this.save();
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

  resetAll() {
    this.data = this.clone(this.publicData);
    this.save();
  }

  resetApp(app: AppType) {
    const base = this.publicData;
    const keepApps: AppType[] = ['network', 'security', 'knowledge', 'compute-ops', 'compute-monitor', 'ops'].filter(a => a !== app) as AppType[];
    const keepCards = this.data.cards.filter(c => keepApps.includes(c.app));
    const baseCards = base.cards.filter(c => c.app === app);

    if (app === 'network') {
      this.data = {
        ...this.data,
        cards: [...keepCards, ...baseCards],
        earningStats: { ...base.earningStats },
        onlineUserStats: { ...base.onlineUserStats },
        userRegion: [...base.userRegion],
        deviceShare: { ...base.deviceShare, nodeStates: [...base.deviceShare.nodeStates] },
        nodeScanStats: [...base.nodeScanStats],
        probeLink: [...base.probeLink],
        topologyData: { nodes: [...base.topologyData.nodes], links: [...base.topologyData.links] },
      };
    } else if (app === 'security') {
      this.data = {
        ...this.data,
        cards: [...keepCards, ...baseCards],
        securityStatus: { ...base.securityStatus },
        radarDimensions: [...base.radarDimensions],
        attackIpRank: [...base.attackIpRank],
        vulnType: [...base.vulnType],
        gpuModelEarnings: [...base.gpuModelEarnings],
        alarmTrend: [...base.alarmTrend],
        securityScanStats: { ...base.securityScanStats },
        attackLogs: [...base.attackLogs],
      };
    } else if (app === 'knowledge') {
      this.data = {
        ...this.data,
        cards: [...keepCards, ...baseCards],
        storageStats: { ...base.storageStats },
        businessStats: { ...base.businessStats },
        appUsageRank: [...base.appUsageRank],
        userQuestionRank: [...base.userQuestionRank],
        fileUsageRank: [...base.fileUsageRank],
        dailyVisit: [...base.dailyVisit],
      };
    } else if (app === 'compute-ops') {
      this.data = {
        ...this.data,
        cards: [...keepCards, ...baseCards],
        hostInfo: { ...base.hostInfo },
        computeUsage: { ...base.computeUsage },
        alarmStats: { ...base.alarmStats },
        authStats: { ...base.authStats },
        modelDistribution: [...base.modelDistribution],
        runningInstances: [...base.runningInstances],
        tokenStats: { ...base.tokenStats },
        tokenTrend: [...base.tokenTrend],
        hotModelRank: [...base.hotModelRank],
        tokenConsumeRank: [...base.tokenConsumeRank],
      };
    } else if (app === 'compute-monitor') {
      this.data = {
        ...this.data,
        cards: [...keepCards, ...baseCards],
        gpuStats: { ...base.gpuStats },
        utilization: { ...base.utilization },
        gpuUsageTop5: [...base.gpuUsageTop5],
        vramUsageTop5: [...base.vramUsageTop5],
        gpuPowerTop5: [...base.gpuPowerTop5],
        gpuTempTop5: [...base.gpuTempTop5],
        gpuVendor: [...base.gpuVendor],
        gpuModel: [...base.gpuModel],
      };
    } else if (app === 'ops') {
      this.data = {
        ...this.data,
        cards: [...keepCards, ...baseCards],
        opsStats: { ...base.opsStats },
        powerConsume: { ...base.powerConsume },
      };
    }
    this.save();
  }

  // ========== Getters ==========
  getCards() { return this.data.cards; }
  getCardsByApp(app: AppType) {
    return this.data.cards.filter(c => c.app === app);
  }

  // Network-app
  getEarningStats() { return this.data.earningStats; }
  getOnlineUserStats() { return this.data.onlineUserStats; }
  getUserRegion() { return this.data.userRegion; }
  getDeviceShare() { return this.data.deviceShare; }
  getNodeScanStats() { return this.data.nodeScanStats; }
  getProbeLink() { return this.data.probeLink; }
  getTopologyData() { return this.data.topologyData; }

  // Security-app
  getSecurityStatus() { return this.data.securityStatus; }
  getRadarDimensions() { return this.data.radarDimensions; }
  getAttackIpRank() { return this.data.attackIpRank; }
  getVulnType() { return this.data.vulnType; }
  getGpuModelEarnings() { return this.data.gpuModelEarnings; }
  getAlarmTrend() { return this.data.alarmTrend; }
  getSecurityScanStats() { return this.data.securityScanStats; }
  getAttackLogs() { return this.data.attackLogs; }

  // Knowledge-app
  getStorageStats() { return this.data.storageStats; }
  getBusinessStats() { return this.data.businessStats; }
  getAppUsageRank() { return this.data.appUsageRank; }
  getUserQuestionRank() { return this.data.userQuestionRank; }
  getFileUsageRank() { return this.data.fileUsageRank; }
  getDailyVisit() { return this.data.dailyVisit; }

  // ComputeOps-app
  getHostInfo() { return this.data.hostInfo; }
  getComputeUsage() { return this.data.computeUsage; }
  getAlarmStats() { return this.data.alarmStats; }
  getAuthStats() { return this.data.authStats; }
  getModelDistribution() { return this.data.modelDistribution; }
  getRunningInstances() { return this.data.runningInstances; }
  getTokenStats() { return this.data.tokenStats; }
  getTokenTrend() { return this.data.tokenTrend; }
  getHotModelRank() { return this.data.hotModelRank; }
  getTokenConsumeRank() { return this.data.tokenConsumeRank; }

  // ComputeMonitor-app
  getGpuStats() { return this.data.gpuStats; }
  getUtilization() { return this.data.utilization; }
  getGpuUsageTop5() { return this.data.gpuUsageTop5; }
  getVramUsageTop5() { return this.data.vramUsageTop5; }
  getGpuPowerTop5() { return this.data.gpuPowerTop5; }
  getGpuTempTop5() { return this.data.gpuTempTop5; }
  getGpuVendor() { return this.data.gpuVendor; }
  getGpuModel() { return this.data.gpuModel; }

  // Ops-app
  getOpsStats() { return this.data.opsStats; }
  getPowerConsume() { return this.data.powerConsume; }

  // ========== Setters ==========
  updateCard(id: string, updates: Partial<CardConfig>) {
    const idx = this.data.cards.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.data.cards[idx] = { ...this.data.cards[idx], ...updates };
      this.save();
    }
  }

  // Network-app
  updateEarningStats(data: Partial<EarningStats>) {
    this.data.earningStats = { ...this.data.earningStats, ...data };
    this.save();
  }

  updateOnlineUserStats(data: Partial<OnlineUserStats>) {
    this.data.onlineUserStats = { ...this.data.onlineUserStats, ...data };
    this.save();
  }

  updateUserRegion(data: UserRegion[]) {
    this.data.userRegion = data;
    this.save();
  }

  addUserRegion(item: UserRegion) {
    this.data.userRegion.push(item);
    this.save();
  }

  updateUserRegionItem(province: string, updates: Partial<UserRegion>) {
    const idx = this.data.userRegion.findIndex(u => u.province === province);
    if (idx !== -1) {
      this.data.userRegion[idx] = { ...this.data.userRegion[idx], ...updates };
      this.save();
    }
  }

  deleteUserRegion(province: string) {
    this.data.userRegion = this.data.userRegion.filter(u => u.province !== province);
    this.save();
  }

  updateDeviceShare(data: Partial<DeviceShare>) {
    this.data.deviceShare = { ...this.data.deviceShare, ...data };
    this.save();
  }

  updateNodeScanStats(data: NodeScanStat[]) {
    this.data.nodeScanStats = data;
    this.save();
  }

  addNodeScanStat(item: NodeScanStat) {
    this.data.nodeScanStats.push(item);
    this.save();
  }

  updateNodeScanStat(name: string, updates: Partial<NodeScanStat>) {
    const idx = this.data.nodeScanStats.findIndex(n => n.name === name);
    if (idx !== -1) {
      this.data.nodeScanStats[idx] = { ...this.data.nodeScanStats[idx], ...updates };
      this.save();
    }
  }

  deleteNodeScanStat(name: string) {
    this.data.nodeScanStats = this.data.nodeScanStats.filter(n => n.name !== name);
    this.save();
  }

  updateProbeLinks(data: ProbeLink[]) {
    this.data.probeLink = data;
    this.save();
  }

  addProbeLink(item: ProbeLink) {
    this.data.probeLink.push(item);
    this.save();
  }

  updateProbeLinkItem(linkName: string, updates: Partial<ProbeLink>) {
    const idx = this.data.probeLink.findIndex(p => p.linkName === linkName);
    if (idx !== -1) {
      this.data.probeLink[idx] = { ...this.data.probeLink[idx], ...updates };
      this.save();
    }
  }

  deleteProbeLink(linkName: string) {
    this.data.probeLink = this.data.probeLink.filter(p => p.linkName !== linkName);
    this.save();
  }

  updateTopologyData(data: TopologyData) {
    this.data.topologyData = data;
    this.save();
  }

  addTopologyNode(node: TopologyData['nodes'][0]) {
    this.data.topologyData.nodes.push(node);
    this.save();
  }

  updateTopologyNode(id: string, updates: Partial<TopologyData['nodes'][0]>) {
    const idx = this.data.topologyData.nodes.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.data.topologyData.nodes[idx] = { ...this.data.topologyData.nodes[idx], ...updates };
      this.save();
    }
  }

  deleteTopologyNode(id: string) {
    this.data.topologyData.nodes = this.data.topologyData.nodes.filter(n => n.id !== id);
    this.data.topologyData.links = this.data.topologyData.links.filter(l => l.source !== id && l.target !== id);
    this.save();
  }

  addTopologyLink(link: TopologyData['links'][0]) {
    this.data.topologyData.links.push(link);
    this.save();
  }

  deleteTopologyLink(source: string, target: string) {
    this.data.topologyData.links = this.data.topologyData.links.filter(l => !(l.source === source && l.target === target));
    this.save();
  }

  // Security-app
  updateSecurityStatus(data: Partial<SecurityStatus>) {
    this.data.securityStatus = { ...this.data.securityStatus, ...data };
    this.save();
  }

  updateRadarDimensions(data: RadarDimension[]) {
    this.data.radarDimensions = data;
    this.save();
  }

  updateRadarDimension(name: string, value: number) {
    const idx = this.data.radarDimensions.findIndex(d => d.name === name);
    if (idx !== -1) {
      this.data.radarDimensions[idx].value = value;
      this.save();
    }
  }

  updateAttackIpRanks(data: AttackIpRank[]) {
    this.data.attackIpRank = data;
    this.save();
  }

  addAttackIpRank(item: AttackIpRank) {
    this.data.attackIpRank.push(item);
    this.save();
  }

  updateAttackIpRankItem(ip: string, updates: Partial<AttackIpRank>) {
    const idx = this.data.attackIpRank.findIndex(a => a.ip === ip);
    if (idx !== -1) {
      this.data.attackIpRank[idx] = { ...this.data.attackIpRank[idx], ...updates };
      this.save();
    }
  }

  deleteAttackIpRank(ip: string) {
    this.data.attackIpRank = this.data.attackIpRank.filter(a => a.ip !== ip);
    this.save();
  }

  updateVulnTypes(data: VulnType[]) {
    this.data.vulnType = data;
    this.save();
  }

  addVulnType(item: VulnType) {
    this.data.vulnType.push(item);
    this.save();
  }

  updateVulnTypeItem(type: string, updates: Partial<VulnType>) {
    const idx = this.data.vulnType.findIndex(v => v.type === type);
    if (idx !== -1) {
      this.data.vulnType[idx] = { ...this.data.vulnType[idx], ...updates };
      this.save();
    }
  }

  deleteVulnType(type: string) {
    this.data.vulnType = this.data.vulnType.filter(v => v.type !== type);
    this.save();
  }

  updateGpuModelEarnings(data: GpuModelEarning[]) {
    this.data.gpuModelEarnings = data;
    this.save();
  }

  addGpuModelEarning(item: GpuModelEarning) {
    this.data.gpuModelEarnings.push(item);
    this.save();
  }

  updateGpuModelEarning(modelName: string, updates: Partial<GpuModelEarning>) {
    const idx = this.data.gpuModelEarnings.findIndex(g => g.modelName === modelName);
    if (idx !== -1) {
      this.data.gpuModelEarnings[idx] = { ...this.data.gpuModelEarnings[idx], ...updates };
      this.save();
    }
  }

  deleteGpuModelEarning(modelName: string) {
    this.data.gpuModelEarnings = this.data.gpuModelEarnings.filter(g => g.modelName !== modelName);
    this.save();
  }

  updateAlarmTrend(data: AlarmTrendPoint[]) {
    this.data.alarmTrend = data;
    this.save();
  }

  updateSecurityScanStats(data: Partial<SecurityScanStats>) {
    this.data.securityScanStats = { ...this.data.securityScanStats, ...data };
    this.save();
  }

  updateAttackLogs(data: AttackLog[]) {
    this.data.attackLogs = data;
    this.save();
  }

  addAttackLog(item: AttackLog) {
    this.data.attackLogs.unshift(item);
    this.save();
  }

  deleteAttackLog(id: string) {
    this.data.attackLogs = this.data.attackLogs.filter(a => a.id !== id);
    this.save();
  }

  // Knowledge-app
  updateStorageStats(data: Partial<StorageStats>) {
    this.data.storageStats = { ...this.data.storageStats, ...data };
    this.save();
  }

  updateBusinessStats(data: Partial<BusinessStats>) {
    this.data.businessStats = { ...this.data.businessStats, ...data };
    this.save();
  }

  updateAppUsageRank(data: AppUsageRank[]) {
    this.data.appUsageRank = data;
    this.save();
  }

  addAppUsageRank(item: AppUsageRank) {
    this.data.appUsageRank.push(item);
    this.save();
  }

  updateAppUsageRankItem(appName: string, updates: Partial<AppUsageRank>) {
    const idx = this.data.appUsageRank.findIndex(a => a.appName === appName);
    if (idx !== -1) {
      this.data.appUsageRank[idx] = { ...this.data.appUsageRank[idx], ...updates };
      this.save();
    }
  }

  deleteAppUsageRank(appName: string) {
    this.data.appUsageRank = this.data.appUsageRank.filter(a => a.appName !== appName);
    this.save();
  }

  updateUserQuestionRank(data: UserQuestionRank[]) {
    this.data.userQuestionRank = data;
    this.save();
  }

  addUserQuestionRank(item: UserQuestionRank) {
    this.data.userQuestionRank.push(item);
    this.save();
  }

  updateUserQuestionRankItem(userName: string, updates: Partial<UserQuestionRank>) {
    const idx = this.data.userQuestionRank.findIndex(u => u.userName === userName);
    if (idx !== -1) {
      this.data.userQuestionRank[idx] = { ...this.data.userQuestionRank[idx], ...updates };
      this.save();
    }
  }

  deleteUserQuestionRank(userName: string) {
    this.data.userQuestionRank = this.data.userQuestionRank.filter(u => u.userName !== userName);
    this.save();
  }

  updateFileUsageRank(data: FileUsageRank[]) {
    this.data.fileUsageRank = data;
    this.save();
  }

  addFileUsageRank(item: FileUsageRank) {
    this.data.fileUsageRank.push(item);
    this.save();
  }

  updateFileUsageRankItem(fileName: string, updates: Partial<FileUsageRank>) {
    const idx = this.data.fileUsageRank.findIndex(f => f.fileName === fileName);
    if (idx !== -1) {
      this.data.fileUsageRank[idx] = { ...this.data.fileUsageRank[idx], ...updates };
      this.save();
    }
  }

  deleteFileUsageRank(fileName: string) {
    this.data.fileUsageRank = this.data.fileUsageRank.filter(f => f.fileName !== fileName);
    this.save();
  }

  updateDailyVisit(data: DailyVisit[]) {
    this.data.dailyVisit = data;
    this.save();
  }

  addDailyVisit(item: DailyVisit) {
    this.data.dailyVisit.push(item);
    this.save();
  }

  deleteDailyVisit(date: string) {
    this.data.dailyVisit = this.data.dailyVisit.filter(d => d.date !== date);
    this.save();
  }

  // ComputeOps-app
  updateHostInfo(data: Partial<HostInfo>) {
    this.data.hostInfo = { ...this.data.hostInfo, ...data };
    this.save();
  }

  updateComputeUsage(data: Partial<ComputeUsage>) {
    this.data.computeUsage = { ...this.data.computeUsage, ...data };
    this.save();
  }

  updateAlarmStats(data: Partial<AlarmStats>) {
    this.data.alarmStats = { ...this.data.alarmStats, ...data };
    this.save();
  }

  updateAuthStats(data: Partial<AuthStats>) {
    this.data.authStats = { ...this.data.authStats, ...data };
    this.save();
  }

  updateModelDistribution(data: ModelDistribution[]) {
    this.data.modelDistribution = data;
    this.save();
  }

  addModelDistribution(item: ModelDistribution) {
    this.data.modelDistribution.push(item);
    this.save();
  }

  updateModelDistributionItem(type: string, updates: Partial<ModelDistribution>) {
    const idx = this.data.modelDistribution.findIndex(m => m.type === type);
    if (idx !== -1) {
      this.data.modelDistribution[idx] = { ...this.data.modelDistribution[idx], ...updates };
      this.save();
    }
  }

  deleteModelDistribution(type: string) {
    this.data.modelDistribution = this.data.modelDistribution.filter(m => m.type !== type);
    this.save();
  }

  updateRunningInstances(data: RunningInstance[]) {
    this.data.runningInstances = data;
    this.save();
  }

  addRunningInstance(item: RunningInstance) {
    this.data.runningInstances.push(item);
    this.save();
  }

  updateRunningInstanceItem(type: string, updates: Partial<RunningInstance>) {
    const idx = this.data.runningInstances.findIndex(r => r.type === type);
    if (idx !== -1) {
      this.data.runningInstances[idx] = { ...this.data.runningInstances[idx], ...updates };
      this.save();
    }
  }

  deleteRunningInstance(type: string) {
    this.data.runningInstances = this.data.runningInstances.filter(r => r.type !== type);
    this.save();
  }

  updateTokenStats(data: Partial<TokenStats>) {
    this.data.tokenStats = { ...this.data.tokenStats, ...data };
    this.save();
  }

  updateTokenTrend(data: TokenTrendPoint[]) {
    this.data.tokenTrend = data;
    this.save();
  }

  addTokenTrend(item: TokenTrendPoint) {
    this.data.tokenTrend.push(item);
    this.save();
  }

  updateTokenTrendItem(date: string, updates: Partial<TokenTrendPoint>) {
    const idx = this.data.tokenTrend.findIndex(t => t.date === date);
    if (idx !== -1) {
      this.data.tokenTrend[idx] = { ...this.data.tokenTrend[idx], ...updates };
      this.save();
    }
  }

  deleteTokenTrend(date: string) {
    this.data.tokenTrend = this.data.tokenTrend.filter(t => t.date !== date);
    this.save();
  }

  updateHotModelRank(data: HotModelRank[]) {
    this.data.hotModelRank = data;
    this.save();
  }

  addHotModelRank(item: HotModelRank) {
    this.data.hotModelRank.push(item);
    this.save();
  }

  updateHotModelRankItem(rank: number, updates: Partial<HotModelRank>) {
    const idx = this.data.hotModelRank.findIndex(h => h.rank === rank);
    if (idx !== -1) {
      this.data.hotModelRank[idx] = { ...this.data.hotModelRank[idx], ...updates };
      this.save();
    }
  }

  deleteHotModelRank(rank: number) {
    this.data.hotModelRank = this.data.hotModelRank.filter(h => h.rank !== rank);
    this.save();
  }

  updateTokenConsumeRank(data: TokenConsumeRank[]) {
    this.data.tokenConsumeRank = data;
    this.save();
  }

  addTokenConsumeRank(item: TokenConsumeRank) {
    this.data.tokenConsumeRank.push(item);
    this.save();
  }

  updateTokenConsumeRankItem(rank: number, updates: Partial<TokenConsumeRank>) {
    const idx = this.data.tokenConsumeRank.findIndex(t => t.rank === rank);
    if (idx !== -1) {
      this.data.tokenConsumeRank[idx] = { ...this.data.tokenConsumeRank[idx], ...updates };
      this.save();
    }
  }

  deleteTokenConsumeRank(rank: number) {
    this.data.tokenConsumeRank = this.data.tokenConsumeRank.filter(t => t.rank !== rank);
    this.save();
  }

  // ComputeMonitor-app
  updateGpuStats(data: Partial<GpuStats>) {
    this.data.gpuStats = { ...this.data.gpuStats, ...data };
    this.save();
  }

  updateUtilization(data: Partial<Utilization>) {
    this.data.utilization = { ...this.data.utilization, ...data };
    this.save();
  }

  updateGpuUsageTop5(data: GpuTop5Entry[]) {
    this.data.gpuUsageTop5 = data;
    this.save();
  }

  addGpuUsageTop5(item: GpuTop5Entry) {
    this.data.gpuUsageTop5.push(item);
    this.save();
  }

  updateGpuUsageTop5Item(node: string, updates: Partial<GpuTop5Entry>) {
    const idx = this.data.gpuUsageTop5.findIndex(g => g.node === node);
    if (idx !== -1) {
      this.data.gpuUsageTop5[idx] = { ...this.data.gpuUsageTop5[idx], ...updates };
      this.save();
    }
  }

  deleteGpuUsageTop5(node: string) {
    this.data.gpuUsageTop5 = this.data.gpuUsageTop5.filter(g => g.node !== node);
    this.save();
  }

  updateVramUsageTop5(data: GpuTop5Entry[]) {
    this.data.vramUsageTop5 = data;
    this.save();
  }

  addVramUsageTop5(item: GpuTop5Entry) {
    this.data.vramUsageTop5.push(item);
    this.save();
  }

  updateVramUsageTop5Item(node: string, updates: Partial<GpuTop5Entry>) {
    const idx = this.data.vramUsageTop5.findIndex(v => v.node === node);
    if (idx !== -1) {
      this.data.vramUsageTop5[idx] = { ...this.data.vramUsageTop5[idx], ...updates };
      this.save();
    }
  }

  deleteVramUsageTop5(node: string) {
    this.data.vramUsageTop5 = this.data.vramUsageTop5.filter(v => v.node !== node);
    this.save();
  }

  updateGpuPowerTop5(data: GpuTop5Entry[]) {
    this.data.gpuPowerTop5 = data;
    this.save();
  }

  addGpuPowerTop5(item: GpuTop5Entry) {
    this.data.gpuPowerTop5.push(item);
    this.save();
  }

  updateGpuPowerTop5Item(node: string, updates: Partial<GpuTop5Entry>) {
    const idx = this.data.gpuPowerTop5.findIndex(g => g.node === node);
    if (idx !== -1) {
      this.data.gpuPowerTop5[idx] = { ...this.data.gpuPowerTop5[idx], ...updates };
      this.save();
    }
  }

  deleteGpuPowerTop5(node: string) {
    this.data.gpuPowerTop5 = this.data.gpuPowerTop5.filter(g => g.node !== node);
    this.save();
  }

  updateGpuTempTop5(data: GpuTop5Entry[]) {
    this.data.gpuTempTop5 = data;
    this.save();
  }

  addGpuTempTop5(item: GpuTop5Entry) {
    this.data.gpuTempTop5.push(item);
    this.save();
  }

  updateGpuTempTop5Item(node: string, updates: Partial<GpuTop5Entry>) {
    const idx = this.data.gpuTempTop5.findIndex(g => g.node === node);
    if (idx !== -1) {
      this.data.gpuTempTop5[idx] = { ...this.data.gpuTempTop5[idx], ...updates };
      this.save();
    }
  }

  deleteGpuTempTop5(node: string) {
    this.data.gpuTempTop5 = this.data.gpuTempTop5.filter(g => g.node !== node);
    this.save();
  }

  updateGpuVendor(data: GpuVendor[]) {
    this.data.gpuVendor = data;
    this.save();
  }

  addGpuVendor(item: GpuVendor) {
    this.data.gpuVendor.push(item);
    this.save();
  }

  updateGpuVendorItem(vendor: string, updates: Partial<GpuVendor>) {
    const idx = this.data.gpuVendor.findIndex(g => g.vendor === vendor);
    if (idx !== -1) {
      this.data.gpuVendor[idx] = { ...this.data.gpuVendor[idx], ...updates };
      this.save();
    }
  }

  deleteGpuVendor(vendor: string) {
    this.data.gpuVendor = this.data.gpuVendor.filter(g => g.vendor !== vendor);
    this.save();
  }

  updateGpuModel(data: GpuModel[]) {
    this.data.gpuModel = data;
    this.save();
  }

  addGpuModel(item: GpuModel) {
    this.data.gpuModel.push(item);
    this.save();
  }

  updateGpuModelItem(model: string, updates: Partial<GpuModel>) {
    const idx = this.data.gpuModel.findIndex(g => g.model === model);
    if (idx !== -1) {
      this.data.gpuModel[idx] = { ...this.data.gpuModel[idx], ...updates };
      this.save();
    }
  }

  deleteGpuModel(model: string) {
    this.data.gpuModel = this.data.gpuModel.filter(g => g.model !== model);
    this.save();
  }

  // Ops-app
  updateOpsStats(data: Partial<OpsStats>) {
    this.data.opsStats = { ...this.data.opsStats, ...data };
    this.save();
  }

  updatePowerConsume(data: Partial<PowerConsume>) {
    this.data.powerConsume = { ...this.data.powerConsume, ...data };
    this.save();
  }
}

export const dataStore = new DataStore();
export default dataStore;