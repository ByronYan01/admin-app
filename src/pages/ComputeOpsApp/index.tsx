import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Modal,
  message,
  Tabs,
  Collapse,
  Popconfirm,
  Tag,
  Row,
  Col,
  Statistic,
  Progress,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CloudServerOutlined,
  KeyOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dataStore from '@/store';
import type {
  CardConfig,
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
} from '@/types';

const { Panel } = Collapse;

const ComputeOpsAppPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cards, setCards] = useState<CardConfig[]>([]);
  const [hostInfo, setHostInfo] = useState<HostInfo>({ selectedHost: '', cluster: '' });
  const [computeUsage, setComputeUsage] = useState<ComputeUsage>({ usageRate: 0, used: 0, free: 0 });
  const [alarmStats, setAlarmStats] = useState<AlarmStats>({
    computeAlarm: [0, 0], dispatchAlarm: [0, 0], clusterAlarm: [0, 0], nodeAlarm: [0, 0],
  });
  const [authStats, setAuthStats] = useState<AuthStats>({
    publicAuth: 0, publicInstances: 0, privateAuth: 0, privateInstances: 0, externalAccess: 0,
  });
  const [modelDistribution, setModelDistribution] = useState<ModelDistribution[]>([]);
  const [runningInstances, setRunningInstances] = useState<RunningInstance[]>([]);
  const [tokenStats, setTokenStats] = useState<TokenStats>({ todayTotal: 0, yesterdayTotal: 0, todayCalls: 0, yesterdayCalls: 0 });
  const [tokenTrend, setTokenTrend] = useState<TokenTrendPoint[]>([]);
  const [hotModelRank, setHotModelRank] = useState<HotModelRank[]>([]);
  const [tokenConsumeRank, setTokenConsumeRank] = useState<TokenConsumeRank[]>([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    setCards(dataStore.getCardsByApp('compute-ops'));
    setHostInfo(dataStore.getHostInfo());
    setComputeUsage(dataStore.getComputeUsage());
    setAlarmStats(dataStore.getAlarmStats());
    setAuthStats(dataStore.getAuthStats());
    setModelDistribution(dataStore.getModelDistribution());
    setRunningInstances(dataStore.getRunningInstances());
    setTokenStats(dataStore.getTokenStats());
    setTokenTrend(dataStore.getTokenTrend());
    setHotModelRank(dataStore.getHotModelRank());
    setTokenConsumeRank(dataStore.getTokenConsumeRank());
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

  const saveHostInfo = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateHostInfo(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveComputeUsage = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateComputeUsage(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveAlarmStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateAlarmStats({
        computeAlarm: [values.computeAlarmSevere, values.computeAlarmNormal],
        dispatchAlarm: [values.dispatchAlarmSevere, values.dispatchAlarmNormal],
        clusterAlarm: [values.clusterAlarmSevere, values.clusterAlarmNormal],
        nodeAlarm: [values.nodeAlarmSevere, values.nodeAlarmNormal],
      });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveAuthStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateAuthStats(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveTokenStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateTokenStats(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  // Model Distribution CRUD
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [modelEditing, setModelEditing] = useState<ModelDistribution | null>(null);

  const handleAddModel = () => {
    setModelEditing({ type: '', count: 0 });
    form.setFieldsValue({ type: '', count: 0 });
    setModelModalOpen(true);
  };

  const handleEditModel = (record: ModelDistribution) => {
    setModelEditing(record);
    form.setFieldsValue(record);
    setModelModalOpen(true);
  };

  const saveModel = async () => {
    try {
      const values = await form.validateFields();
      if (modelEditing?.type) {
        dataStore.updateModelDistributionItem(values.type, values);
      } else {
        dataStore.addModelDistribution(values as ModelDistribution);
      }
      messageApi.success('保存成功');
      setModelModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteModel = (type: string) => {
    dataStore.deleteModelDistribution(type);
    messageApi.success('删除成功');
    loadData();
  };

  // Running Instances CRUD
  const [instanceModalOpen, setInstanceModalOpen] = useState(false);
  const [instanceEditing, setInstanceEditing] = useState<RunningInstance | null>(null);

  const handleAddInstance = () => {
    setInstanceEditing({ type: '', count: 0 });
    form.setFieldsValue({ type: '', count: 0 });
    setInstanceModalOpen(true);
  };

  const handleEditInstance = (record: RunningInstance) => {
    setInstanceEditing(record);
    form.setFieldsValue(record);
    setInstanceModalOpen(true);
  };

  const saveInstance = async () => {
    try {
      const values = await form.validateFields();
      if (instanceEditing?.type) {
        dataStore.updateRunningInstanceItem(values.type, values);
      } else {
        dataStore.addRunningInstance(values as RunningInstance);
      }
      messageApi.success('保存成功');
      setInstanceModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteInstance = (type: string) => {
    dataStore.deleteRunningInstance(type);
    messageApi.success('删除成功');
    loadData();
  };

  const modelColumns: ColumnsType<ModelDistribution> = [
    { title: '模型类型', dataIndex: 'type', key: 'type', width: 200 },
    { title: '数量', dataIndex: 'count', key: 'count' },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditModel(record)}>编辑</Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteModel(record.type)}>
            <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const instanceColumns: ColumnsType<RunningInstance> = [
    { title: '模型类型', dataIndex: 'type', key: 'type', width: 200 },
    { title: '实例数', dataIndex: 'count', key: 'count' },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditInstance(record)}>编辑</Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteInstance(record.type)}>
            <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SettingOutlined /> 卡片标题</span>,
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
            卡片标题配置
          </span>
        }>
          <Table dataSource={cards} rowKey="id" pagination={false} columns={cardColumns} />
        </Card>
      ),
    },
    {
      key: 'overview',
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CloudServerOutlined /> 算力概览</span>,
      children: (
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={8}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
                主机信息
              </span>
            } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('hostInfo', hostInfo)}>编辑</Button>}>
              <Statistic title="选中主机" value={hostInfo.selectedHost} valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
              <Statistic title="所属集群" value={hostInfo.cluster} valueStyle={{ color: '#6B7280' }} style={{ marginTop: 16 }} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #52C41A 0%, #73D13D 100%)', borderRadius: 2 }} />
                算力使用概览
              </span>
            } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('computeUsage', computeUsage)}>编辑</Button>}>
              <Progress type="circle" percent={computeUsage.usageRate} strokeColor={{ '0%': '#1890FF', '100%': '#40A9FF' }} />
              <Statistic title="已使用" value={computeUsage.used} valueStyle={{ color: '#1F2937', fontWeight: 600 }} style={{ marginTop: 16 }} />
              <Statistic title="剩余空间" value={computeUsage.free} valueStyle={{ color: '#52C41A' }} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FF4D4F 0%, #FF7875 100%)', borderRadius: 2 }} />
                实时告警情况
              </span>
            } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('alarmStats', alarmStats)}>编辑</Button>}>
              <div style={{ marginBottom: 12 }}>
                <Tag color="blue" style={{ borderRadius: 6 }}>算力告警</Tag>
                <span style={{ marginLeft: 8, color: '#1F2937' }}>严重: {alarmStats.computeAlarm[0]} / 一般: {alarmStats.computeAlarm[1]}</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <Tag color="success" style={{ borderRadius: 6 }}>调度告警</Tag>
                <span style={{ marginLeft: 8, color: '#1F2937' }}>严重: {alarmStats.dispatchAlarm[0]} / 一般: {alarmStats.dispatchAlarm[1]}</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <Tag color="purple" style={{ borderRadius: 6 }}>集群告警</Tag>
                <span style={{ marginLeft: 8, color: '#1F2937' }}>严重: {alarmStats.clusterAlarm[0]} / 一般: {alarmStats.clusterAlarm[1]}</span>
              </div>
              <div>
                <Tag color="warning" style={{ borderRadius: 6 }}>节点告警</Tag>
                <span style={{ marginLeft: 8, color: '#1F2937' }}>严重: {alarmStats.nodeAlarm[0]} / 一般: {alarmStats.nodeAlarm[1]}</span>
              </div>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'auth',
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><KeyOutlined /> 授权统计</span>,
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
            授权与模型实例
          </span>
        } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('authStats', authStats)}>编辑</Button>}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Statistic title="公共授权数量" value={authStats.publicAuth} prefix={<KeyOutlined style={{ color: '#1890FF' }} />}
                valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
              <Statistic title="已启动模型实例" value={authStats.publicInstances} valueStyle={{ color: '#52C41A' }} style={{ marginTop: 8 }} />
            </Col>
            <Col xs={24} lg={8}>
              <Statistic title="专属授权数量" value={authStats.privateAuth} prefix={<KeyOutlined style={{ color: '#FAAD14' }} />}
                valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
              <Statistic title="已启动模型实例" value={authStats.privateInstances} valueStyle={{ color: '#52C41A' }} style={{ marginTop: 8 }} />
            </Col>
            <Col xs={24} lg={8}>
              <Statistic title="外部接入数量" value={authStats.externalAccess} prefix={<ThunderboltOutlined style={{ color: '#1890FF' }} />}
                valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: 'model',
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CloudServerOutlined /> 模型分布</span>,
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
            模型分布配置
          </span>
        }>
          <Collapse defaultActiveKey={['distribution', 'running']} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 8 }}>
            <Panel header={<strong style={{ color: '#1B4B89' }}>模型分布情况</strong>} key="distribution"
              extra={<Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddModel}
                style={{ background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>新增</Button>}
              style={{ background: '#fff', borderRadius: 8 }}>
              <Table dataSource={modelDistribution} rowKey="type" pagination={false} columns={modelColumns} size="small" />
            </Panel>
            <Panel header={<strong style={{ color: '#1B4B89' }}>已启动模型实例分布</strong>} key="running"
              extra={<Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddInstance}
                style={{ background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>新增</Button>}
              style={{ background: '#fff', borderRadius: 8 }}>
              <Table dataSource={runningInstances} rowKey="type" pagination={false} columns={instanceColumns} size="small" />
            </Panel>
          </Collapse>
        </Card>
      ),
    },
    {
      key: 'token',
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ThunderboltOutlined /> Token统计</span>,
      children: (
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #52C41A 0%, #73D13D 100%)', borderRadius: 2 }} />
                今日统计
              </span>
            } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('tokenStats', tokenStats)}>编辑</Button>}>
              <Statistic title="今日总Token数" value={tokenStats.todayTotal} prefix={<ThunderboltOutlined style={{ color: '#52C41A' }} />}
                valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
              <Statistic title="VS 昨日" value={tokenStats.todayTotal - tokenStats.yesterdayTotal} valueStyle={{ color: '#52C41A' }} style={{ marginTop: 8 }} />
              <Statistic title="今日总调用次数" value={tokenStats.todayCalls} valueStyle={{ color: '#1F2937', fontWeight: 600 }} style={{ marginTop: 16 }} />
              <Statistic title="VS 昨日" value={tokenStats.todayCalls - tokenStats.yesterdayCalls} valueStyle={{ color: '#52C41A' }} style={{ marginTop: 8 }} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FAAD14 0%, #FFC53D 100%)', borderRadius: 2 }} />
                Token消耗排行
              </span>
            }>
              <Table dataSource={tokenConsumeRank} rowKey="rank" pagination={false} columns={[
                { title: '排名', dataIndex: 'rank', width: 80 },
                { title: '租户', dataIndex: 'tenantName', width: 200 },
                { title: '消耗Token', dataIndex: 'consume', render: (v: number) => v.toLocaleString() },
              ]} size="small" />
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'trend',
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LineChartOutlined /> Token趋势</span>,
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
            近7日Token计算量趋势
          </span>
        }>
          <Table dataSource={tokenTrend} rowKey="date" pagination={false} columns={[
            { title: '日期', dataIndex: 'date', width: 150 },
            { title: '总Token数', dataIndex: 'totalToken', render: (v: number) => v.toLocaleString() },
            { title: '调用次数', dataIndex: 'callCount', render: (v: number) => v.toLocaleString() },
          ]} />
        </Card>
      ),
    },
    {
      key: 'hotModel',
      label: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><TrophyOutlined /> 热门模型</span>,
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FAAD14 0%, #FFC53D 100%)', borderRadius: 2 }} />
            热门模型排行
          </span>
        }>
          <Table dataSource={hotModelRank} rowKey="rank" pagination={false} columns={[
            { title: '排名', dataIndex: 'rank', width: 80 },
            { title: '模型名称', dataIndex: 'modelName' },
          ]} />
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

      <Modal title="编辑主机信息" open={editModalOpen && editType === 'hostInfo'} onOk={saveHostInfo} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="selectedHost" label="选中主机" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="cluster" label="所属集群" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑算力使用概览" open={editModalOpen && editType === 'computeUsage'} onOk={saveComputeUsage} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="usageRate" label="使用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
          <Form.Item name="used" label="已使用" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="free" label="剩余空间" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑告警情况" open={editModalOpen && editType === 'alarmStats'} onOk={saveAlarmStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}><Form.Item name="computeAlarmSevere" label="算力告警-严重" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="computeAlarmNormal" label="算力告警-一般" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="dispatchAlarmSevere" label="调度告警-严重" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="dispatchAlarmNormal" label="调度告警-一般" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="clusterAlarmSevere" label="集群告警-严重" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="clusterAlarmNormal" label="集群告警-一般" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="nodeAlarmSevere" label="节点告警-严重" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="nodeAlarmNormal" label="节点告警-一般" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      <Modal title="编辑授权统计" open={editModalOpen && editType === 'authStats'} onOk={saveAuthStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}><Form.Item name="publicAuth" label="公共授权数量" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="publicInstances" label="公共已启动实例" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="privateAuth" label="专属授权数量" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="privateInstances" label="专属已启动实例" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="externalAccess" label="外部接入数量" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑Token统计" open={editModalOpen && editType === 'tokenStats'} onOk={saveTokenStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}><Form.Item name="todayTotal" label="今日总Token" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="yesterdayTotal" label="昨日总Token" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="todayCalls" label="今日调用次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="yesterdayCalls" label="昨日调用次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      <Modal title={modelEditing?.type ? '编辑模型' : '新增模型'} open={modelModalOpen} onOk={saveModel} onCancel={() => setModelModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="模型类型" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="count" label="数量" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title={instanceEditing?.type ? '编辑实例' : '新增实例'} open={instanceModalOpen} onOk={saveInstance} onCancel={() => setInstanceModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="模型类型" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="count" label="实例数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComputeOpsAppPage;