import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Form,
  Input,
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
  SettingOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dataStore from '@/store';
import type { CardConfig, OpsStats, PowerConsume } from '@/types';

const OpsAppPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cards, setCards] = useState<CardConfig[]>([]);
  const [opsStats, setOpsStats] = useState<OpsStats>({
    totalCompute: 0, usedCompute: 0, computeUsageRate: 0, soldCompute: 0, computeAllocRate: 0,
  });
  const [powerConsume, setPowerConsume] = useState<PowerConsume>({ kwh: 0 });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    setCards(dataStore.getCardsByApp('ops'));
    setOpsStats(dataStore.getOpsStats());
    setPowerConsume(dataStore.getPowerConsume());
  };

  const handleEdit = (type: string, data: any) => {
    setEditType(type);
    setEditData(data);
    form.setFieldsValue(data);
    setEditModalOpen(true);
  };

  const saveCardTitle = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateCard(editData.id, { title: values.title });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveOpsStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateOpsStats(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const savePowerConsume = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updatePowerConsume(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const cardColumns: ColumnsType<CardConfig> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 320 },
    { title: '标题', dataIndex: 'title', key: 'title' },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit('card', record)}>编辑</Button>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'cards',
      label: <span><SettingOutlined /> 卡片标题</span>,
      children: (
        <Card title="卡片标题配置">
          <Table dataSource={cards} rowKey="id" pagination={false} columns={cardColumns} />
        </Card>
      ),
    },
    {
      key: 'compute',
      label: <span><ThunderboltOutlined /> 算力指标</span>,
      children: (
        <Card title="算力运维核心指标" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('opsStats', opsStats)}>编辑</Button>}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="总算力" value={opsStats.totalCompute} />
              <Progress percent={opsStats.computeUsageRate} size="small" style={{ marginTop: 8 }} />
            </Col>
            <Col span={8}>
              <Statistic title="已使用算力" value={opsStats.usedCompute} />
              <Statistic title="算力使用率" value={opsStats.computeUsageRate} suffix="%" valueStyle={{ color: '#52c41a' }} style={{ marginTop: 8 }} />
            </Col>
            <Col span={8}>
              <Statistic title="已售算力" value={opsStats.soldCompute} />
              <Statistic title="算力分配率" value={opsStats.computeAllocRate} suffix="%" valueStyle={{ color: '#faad14' }} style={{ marginTop: 8 }} />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: 'power',
      label: <span><ExperimentOutlined /> 能耗统计</span>,
      children: (
        <Card title="能耗统计" extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('powerConsume', powerConsume)}>编辑</Button>}>
          <Statistic title="耗电量" value={powerConsume.kwh} suffix="KWh" prefix={<ExperimentOutlined />} />
        </Card>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Tabs items={tabItems} tabPosition="left" style={{ minHeight: 600 }} />

      <Modal title="编辑卡片标题" open={editModalOpen && editType === 'card'} onOk={saveCardTitle} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑算力指标" open={editModalOpen && editType === 'opsStats'} onOk={saveOpsStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}><Form.Item name="totalCompute" label="总算力" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="usedCompute" label="已使用算力" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="computeUsageRate" label="算力使用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item></Col>
            <Col span={12}><Form.Item name="soldCompute" label="已售算力" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="computeAllocRate" label="算力分配率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑能耗统计" open={editModalOpen && editType === 'powerConsume'} onOk={savePowerConsume} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="kwh" label="耗电量 (KWh)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OpsAppPage;