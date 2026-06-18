import JSZip from 'jszip';
import dataStore from '@/store';

interface ExportEntry {
  file: string;
  getData: () => unknown;
}

// store 字段 → 大屏 public/data 原文件名（字段结构已与大屏核对 1:1 一致）
// getData 在导出时实时调用，确保取到 store 中最新编辑数据
const networkEntries: ExportEntry[] = [
  { file: 'earningStats.json', getData: () => dataStore.getEarningStats() },
  { file: 'onlineUserStats.json', getData: () => dataStore.getOnlineUserStats() },
  { file: 'userRegionData.json', getData: () => dataStore.getUserRegion() },
  { file: 'deviceShareData.json', getData: () => dataStore.getDeviceShare() },
  { file: 'nodeScanStats.json', getData: () => dataStore.getNodeScanStats() },
  { file: 'probeLinkData.json', getData: () => dataStore.getProbeLink() },
  { file: 'topologyData.json', getData: () => dataStore.getTopologyData() },
];

const securityEntries: ExportEntry[] = [
  { file: 'securityStatus.json', getData: () => dataStore.getSecurityStatus() },
  { file: 'radarDimensions.json', getData: () => dataStore.getRadarDimensions() },
  { file: 'attackIpRankData.json', getData: () => dataStore.getAttackIpRank() },
  { file: 'vulnTypeData.json', getData: () => dataStore.getVulnType() },
  { file: 'gpuModelEarnings.json', getData: () => dataStore.getGpuModelEarnings() },
  { file: 'securityScanStats.json', getData: () => dataStore.getSecurityScanStats() },
];

const knowledgeEntries: ExportEntry[] = [
  { file: 'storageStats.json', getData: () => dataStore.getStorageStats() },
  { file: 'businessStats.json', getData: () => dataStore.getBusinessStats() },
  { file: 'appUsageRank.json', getData: () => dataStore.getAppUsageRank() },
  { file: 'userQuestionRank.json', getData: () => dataStore.getUserQuestionRank() },
  { file: 'fileUsageRank.json', getData: () => dataStore.getFileUsageRank() },
  { file: 'dailyVisit.json', getData: () => dataStore.getDailyVisit() },
];

const computeOpsEntries: ExportEntry[] = [
  { file: 'hostInfo.json', getData: () => dataStore.getHostInfo() },
  { file: 'computeUsage.json', getData: () => dataStore.getComputeUsage() },
  { file: 'alarmStats.json', getData: () => dataStore.getAlarmStats() },
  { file: 'authStats.json', getData: () => dataStore.getAuthStats() },
  { file: 'modelDistribution.json', getData: () => dataStore.getModelDistribution() },
  { file: 'runningInstances.json', getData: () => dataStore.getRunningInstances() },
  { file: 'tokenStats.json', getData: () => dataStore.getTokenStats() },
  { file: 'tokenTrend.json', getData: () => dataStore.getTokenTrend() },
  { file: 'hotModelRank.json', getData: () => dataStore.getHotModelRank() },
  { file: 'tokenConsumeRank.json', getData: () => dataStore.getTokenConsumeRank() },
];

const computeMonitorEntries: ExportEntry[] = [
  { file: 'gpuStats.json', getData: () => dataStore.getGpuStats() },
  { file: 'utilization.json', getData: () => dataStore.getUtilization() },
  { file: 'gpuUsageTop5.json', getData: () => dataStore.getGpuUsageTop5() },
  { file: 'vramUsageTop5.json', getData: () => dataStore.getVramUsageTop5() },
  { file: 'gpuPowerTop5.json', getData: () => dataStore.getGpuPowerTop5() },
  { file: 'gpuTempTop5.json', getData: () => dataStore.getGpuTempTop5() },
  { file: 'gpuVendor.json', getData: () => dataStore.getGpuVendor() },
  { file: 'gpuModel.json', getData: () => dataStore.getGpuModel() },
];

const opsEntries: ExportEntry[] = [
  { file: 'opsStats.json', getData: () => dataStore.getOpsStats() },
  { file: 'powerConsume.json', getData: () => dataStore.getPowerConsume() },
];

// 触发浏览器下载
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 导出全部可管理数据为 zip：network/ 与 security/ 目录，文件名与大屏一致
// 解压后将 network/* 覆盖到 network-app/public/data/，security/* 覆盖到 security-app/public/data/
export async function exportAllData() {
  const zip = new JSZip();
  const networkFolder = zip.folder('network');
  const securityFolder = zip.folder('security');
  const knowledgeFolder = zip.folder('knowledge');
  const computeOpsFolder = zip.folder('compute-ops');
  const computeMonitorFolder = zip.folder('compute-monitor');
  const opsFolder = zip.folder('ops');

  networkEntries.forEach((entry) => {
    networkFolder?.file(entry.file, JSON.stringify(entry.getData(), null, 2));
  });
  securityEntries.forEach((entry) => {
    securityFolder?.file(entry.file, JSON.stringify(entry.getData(), null, 2));
  });
  knowledgeEntries.forEach((entry) => {
    knowledgeFolder?.file(entry.file, JSON.stringify(entry.getData(), null, 2));
  });
  computeOpsEntries.forEach((entry) => {
    computeOpsFolder?.file(entry.file, JSON.stringify(entry.getData(), null, 2));
  });
  computeMonitorEntries.forEach((entry) => {
    computeMonitorFolder?.file(entry.file, JSON.stringify(entry.getData(), null, 2));
  });
  opsEntries.forEach((entry) => {
    opsFolder?.file(entry.file, JSON.stringify(entry.getData(), null, 2));
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  triggerDownload(blob, `admin-data-export-${stamp}.zip`);
}
