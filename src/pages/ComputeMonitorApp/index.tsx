import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  InputNumber,
  Button,
  Modal,
  message,
  Tabs,
  Row,
  Col,
  Statistic,
  Progress,
} from 'antd';
import {
  EditOutlined,
  DashboardOutlined,
  PercentageOutlined,
  FireOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import dataStore from '@/store';
import type { GpuStats, Utilization } from '@/types';

const ComputeMonitorAppPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [gpuStats, setGpuStats] = useState<GpuStats>({
    totalPfloops: 0, totalPowerKw: 0, cpuCores: 0, gpuCards: 0, vramTotalGb: 0, memoryTotalGb: 0,
  });
  const [utilization, setUtilization] = useState<Utilization>({ gpuUsage: 0, vramUsage: 0, cpuUsage: 0, memoryUsage: 0 });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<string>('');
  const [form] = Form.useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    setGpuStats(dataStore.getGpuStats());
    setUtilization(dataStore.getUtilization());
  };

  const handleEdit = (type: string, data: any) => {
    setEditType(type);
    form.setFieldsValue(data);
    setEditModalOpen(true);
  };

  const saveGpuStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateGpuStats(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveUtilization = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateUtilization(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const tabItems = [
    {
      key: 'stats',
      label: <span><DashboardOutlined /> GPU指标</span>,
      children: (
        <Card title="GPU总算力" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('gpuStats', gpuStats)}>编辑</Button>}>
          <Row gutter={16}>
            <Col span={8}><Statistic title="GPU总算力 (FP16)" value={gpuStats.totalPfloops} suffix="PFLOPS" /></Col>
            <Col span={8}><Statistic title="GPU总功耗" value={gpuStats.totalPowerKw} suffix="kW" /></Col>
            <Col span={8}><Statistic title="CPU总核数" value={gpuStats.cpuCores} suffix="核" /></Col>
            <Col span={8}><Statistic title="GPU总卡数" value={gpuStats.gpuCards} suffix="张" style={{ marginTop: 16 }} /></Col>
            <Col span={8}><Statistic title="显存总量" value={gpuStats.vramTotalGb} suffix="GB" style={{ marginTop: 16 }} /></Col>
            <Col span={8}><Statistic title="内存总量" value={gpuStats.memoryTotalGb} suffix="GB" style={{ marginTop: 16 }} /></Col>
          </Row>
        </Card>
      ),
    },
    {
      key: 'utilization',
      label: <span><PercentageOutlined /> 利用率</span>,
      children: (
        <Card title="资源利用率" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('utilization', utilization)}>编辑</Button>}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="GPU核心利用率" value={utilization.gpuUsage} suffix="%" />
              <Progress percent={utilization.gpuUsage} size="small" style={{ marginTop: 8 }} />
            </Col>
            <Col span={6}>
              <Statistic title="显存利用率" value={utilization.vramUsage} suffix="%" />
              <Progress percent={utilization.vramUsage} size="small" style={{ marginTop: 8 }} />
            </Col>
            <Col span={6}>
              <Statistic title="CPU利用率" value={utilization.cpuUsage} suffix="%" />
              <Progress percent={utilization.cpuUsage} size="small" style={{ marginTop: 8 }} />
            </Col>
            <Col span={6}>
              <Statistic title="内存利用率" value={utilization.memoryUsage} suffix="%" />
              <Progress percent={utilization.memoryUsage} size="small" style={{ marginTop: 8 }} />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: 'gpuUsage',
      label: <span><FireOutlined /> GPU利用率Top5</span>,
      children: (
        <Card title="GPU核心利用率Top5">
          <p style={{ color: '#999' }}>Top5 排行数据（只读展示）</p>
        </Card>
      ),
    },
    {
      key: 'vramUsage',
      label: <span><PercentageOutlined /> 显存使用率Top5</span>,
      children: (
        <Card title="显存使用率Top5">
          <p style={{ color: '#999' }}>Top5 排行数据（只读展示）</p>
        </Card>
      ),
    },
    {
      key: 'power',
      label: <span><ThunderboltOutlined /> GPU功耗Top5</span>,
      children: (
        <Card title="GPU功耗Top5">
          <p style={{ color: '#999' }}>Top5 排行数据（只读展示）</p>
        </Card>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Tabs items={tabItems} tabPosition="left" style={{ minHeight: 600 }} />

      <Modal title="编辑GPU指标" open={editModalOpen && editType === 'gpuStats'} onOk={saveGpuStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}><Form.Item name="totalPfloops" label="GPU总算力 (FP16)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="totalPowerKw" label="GPU总功耗 (kW)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="cpuCores" label="CPU总核数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="gpuCards" label="GPU总卡数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="vramTotalGb" label="显存总量 (GB)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="memoryTotalGb" label="内存总量 (GB)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      <Modal title="编辑资源利用率" open={editModalOpen && editType === 'utilization'} onOk={saveUtilization} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="gpuUsage" label="GPU核心利用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
          <Form.Item name="vramUsage" label="显存利用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
          <Form.Item name="cpuUsage" label="CPU利用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
          <Form.Item name="memoryUsage" label="内存利用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComputeMonitorAppPage;