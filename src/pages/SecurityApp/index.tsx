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
  Select,
  Tag,
  Row,
  Col,
  Statistic,
  Progress,
  Rate,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  SecurityScanOutlined,
  DollarOutlined,
  AlertOutlined,
  RadarChartOutlined,
  BugOutlined,
  HistoryOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dataStore from '@/store';
import type {
  CardConfig,
  SecurityStatus,
  RadarDimension,
  AttackIpRank,
  VulnType,
  GpuModelEarning,
  AlarmTrendPoint,
  SecurityScanStats,
  AttackLog,
} from '@/types';

const { Panel } = Collapse;

const SecurityAppPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cards, setCards] = useState<CardConfig[]>([]);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    score: 0,
    statusText: '',
    todayAttacks: 0,
  });
  const [radarDimensions, setRadarDimensions] = useState<RadarDimension[]>([]);
  const [attackIpRank, setAttackIpRank] = useState<AttackIpRank[]>([]);
  const [vulnType, setVulnType] = useState<VulnType[]>([]);
  const [gpuModelEarnings, setGpuModelEarnings] = useState<GpuModelEarning[]>([]);
  const [alarmTrend, setAlarmTrend] = useState<AlarmTrendPoint[]>([]);
  const [securityScanStats, setSecurityScanStats] = useState<SecurityScanStats>({
    totalNodesScanned: 0,
    scanProgress: 0,
    passedCount: 0,
    vulnWarningCount: 0,
    highRiskCount: 0,
  });
  const [attackLogs, setAttackLogs] = useState<AttackLog[]>([]);

  // Modal 状态
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const [form] = Form.useForm();

  // 加载数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCards(dataStore.getCardsByApp('security'));
    setSecurityStatus(dataStore.getSecurityStatus());
    setRadarDimensions(dataStore.getRadarDimensions());
    setAttackIpRank(dataStore.getAttackIpRank());
    setVulnType(dataStore.getVulnType());
    setGpuModelEarnings(dataStore.getGpuModelEarnings());
    setAlarmTrend(dataStore.getAlarmTrend());
    setSecurityScanStats(dataStore.getSecurityScanStats());
    setAttackLogs(dataStore.getAttackLogs());
  };

  // 通用编辑方法
  const handleEdit = (type: string, data: any) => {
    setEditType(type);
    setEditData(data);
    form.setFieldsValue(data);
    setEditModalOpen(true);
  };

  // 保存卡片标题
  const saveCardTitle = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateCard(editData.id, { title: values.title });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  // 保存安全状态
  const saveSecurityStatus = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateSecurityStatus({
        score: values.score,
        statusText: values.statusText,
        todayAttacks: values.todayAttacks,
      });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  // 保存安全扫描统计
  const saveSecurityScanStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateSecurityScanStats({
        totalNodesScanned: values.totalNodesScanned,
        passedCount: values.passedCount,
        vulnWarningCount: values.vulnWarningCount,
        highRiskCount: values.highRiskCount,
      });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  // 雷达维度编辑
  const [radarModalOpen, setRadarModalOpen] = useState(false);

  const handleEditRadar = (record: RadarDimension) => {
    form.setFieldsValue({ name: record.name, value: record.value });
    setRadarModalOpen(true);
  };

  const saveRadar = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateRadarDimension(values.name, values.value);
      messageApi.success('保存成功');
      setRadarModalOpen(false);
      loadData();
    } catch {}
  };

  // 攻击IP排名 CRUD
  const [ipModalOpen, setIpModalOpen] = useState(false);
  const [ipEditing, setIpEditing] = useState<AttackIpRank | null>(null);

  const handleAddIp = () => {
    setIpEditing({ ip: '', location: '', count: 0, rank: attackIpRank.length + 1 });
    form.setFieldsValue({ ip: '', location: '', count: 0 });
    setIpModalOpen(true);
  };

  const handleEditIp = (record: AttackIpRank) => {
    setIpEditing(record);
    form.setFieldsValue(record);
    setIpModalOpen(true);
  };

  const saveIp = async () => {
    try {
      const values = await form.validateFields();
      if (ipEditing && ipEditing.ip) {
        dataStore.updateAttackIpRankItem(values.ip, values);
      } else {
        dataStore.addAttackIpRank(values as AttackIpRank);
      }
      messageApi.success('保存成功');
      setIpModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteIp = (ip: string) => {
    dataStore.deleteAttackIpRank(ip);
    messageApi.success('删除成功');
    loadData();
  };

  // 漏洞类型 CRUD
  const [vulnModalOpen, setVulnModalOpen] = useState(false);
  const [vulnEditing, setVulnEditing] = useState<VulnType | null>(null);

  const handleAddVuln = () => {
    setVulnEditing({ type: '', count: 0 });
    form.setFieldsValue({ type: '', count: 0 });
    setVulnModalOpen(true);
  };

  const handleEditVuln = (record: VulnType) => {
    setVulnEditing(record);
    form.setFieldsValue(record);
    setVulnModalOpen(true);
  };

  const saveVuln = async () => {
    try {
      const values = await form.validateFields();
      if (vulnEditing && vulnEditing.type) {
        dataStore.updateVulnTypeItem(values.type, values);
      } else {
        dataStore.addVulnType(values as VulnType);
      }
      messageApi.success('保存成功');
      setVulnModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteVuln = (type: string) => {
    dataStore.deleteVulnType(type);
    messageApi.success('删除成功');
    loadData();
  };

  // GPU收益 CRUD
  const [gpuModalOpen, setGpuModalOpen] = useState(false);
  const [gpuEditing, setGpuEditing] = useState<GpuModelEarning | null>(null);

  const handleAddGpu = () => {
    setGpuEditing({ modelName: '', earningsPerHour: 0 });
    form.setFieldsValue({ modelName: '', earningsPerHour: 0 });
    setGpuModalOpen(true);
  };

  const handleEditGpu = (record: GpuModelEarning) => {
    setGpuEditing(record);
    form.setFieldsValue(record);
    setGpuModalOpen(true);
  };

  const saveGpu = async () => {
    try {
      const values = await form.validateFields();
      if (gpuEditing && gpuEditing.modelName) {
        dataStore.updateGpuModelEarning(values.modelName, values);
      } else {
        dataStore.addGpuModelEarning(values as GpuModelEarning);
      }
      messageApi.success('保存成功');
      setGpuModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteGpu = (modelName: string) => {
    dataStore.deleteGpuModelEarning(modelName);
    messageApi.success('删除成功');
    loadData();
  };

  // 攻击日志 CRUD
  const [logModalOpen, setLogModalOpen] = useState(false);

  const handleAddLog = () => {
    form.setFieldsValue({
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      sourceIp: '',
      targetName: '',
      attackType: '',
      severity: 'warning',
    });
    setLogModalOpen(true);
  };

  const saveLog = async () => {
    try {
      const values = await form.validateFields();
      dataStore.addAttackLog(values as AttackLog);
      messageApi.success('保存成功');
      setLogModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteLog = (id: string) => {
    dataStore.deleteAttackLog(id);
    messageApi.success('删除成功');
    loadData();
  };

  // 表格列定义
  const radarColumns: ColumnsType<RadarDimension> = [
    { title: '维度名称', dataIndex: 'name', key: 'name', width: 150 },
    {
      title: '评分',
      dataIndex: 'value',
      key: 'value',
      width: 200,
      render: (v) => <Rate disabled value={v} />,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleEditRadar(record)}>
          编辑
        </Button>
      ),
    },
  ];

  const ipColumns: ColumnsType<AttackIpRank> = [
    { title: '排名', dataIndex: 'rank', key: 'rank', width: 80 },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip', width: 150 },
    { title: '归属地', dataIndex: 'location', key: 'location', width: 120 },
    { title: '攻击次数', dataIndex: 'count', key: 'count', width: 100 },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditIp(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteIp(record.ip)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const vulnColumns: ColumnsType<VulnType> = [
    { title: '攻击类型', dataIndex: 'type', key: 'type' },
    {
      title: '次数',
      dataIndex: 'count',
      key: 'count',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditVuln(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteVuln(record.type)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const gpuColumns: ColumnsType<GpuModelEarning> = [
    { title: 'GPU型号', dataIndex: 'modelName', key: 'modelName', width: 150 },
    {
      title: '时薪 (元)',
      dataIndex: 'earningsPerHour',
      key: 'earningsPerHour',
      render: (v) => `¥${v.toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditGpu(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteGpu(record.modelName)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const alarmColumns: ColumnsType<AlarmTrendPoint> = [
    { title: '时间', dataIndex: 'time', key: 'time', width: 100 },
    { title: '严重告警', dataIndex: 'critical', key: 'critical', width: 100 },
    { title: '警告告警', dataIndex: 'warning', key: 'warning', width: 100 },
    {
      title: '总告警',
      key: 'total',
      width: 100,
      render: (_, record) => record.critical + record.warning,
    },
  ];

  const logColumns: ColumnsType<AttackLog> = [
    { title: '时间', dataIndex: 'time', key: 'time', width: 100 },
    { title: '源IP', dataIndex: 'sourceIp', key: 'sourceIp', width: 150 },
    { title: '目标', dataIndex: 'targetName', key: 'targetName', width: 150 },
    { title: '攻击类型', dataIndex: 'attackType', key: 'attackType' },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      render: (v) => (
        <Tag color={v === 'critical' ? 'red' : v === 'warning' ? 'orange' : 'blue'}>
          {v === 'critical' ? '严重' : v === 'warning' ? '警告' : '提示'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteLog(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'cards',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SettingOutlined /> 卡片标题
        </span>
      ),
      children: (
        <Card
          title={
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
              卡片标题配置
            </span>
          }
          extra={
            <Button type="primary" icon={<SaveOutlined />} onClick={() => messageApi.info('自动保存已启用')}
              style={{ background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>
              自动保存
            </Button>
          }
        >
          <Table dataSource={cards} rowKey="id" pagination={false} columns={[
            { title: 'ID', dataIndex: 'id', key: 'id', width: 320 },
            { title: '标题', dataIndex: 'title', key: 'title' },
            { title: '操作', key: 'action', width: 100, render: (_, record) => (
              <Button type="primary" ghost icon={<EditOutlined />} onClick={() => handleEdit('card', record)}>编辑</Button>
            ) },
          ]} />
        </Card>
      ),
    },
    {
      key: 'status',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SecurityScanOutlined /> 安全状态
        </span>
      ),
      children: (
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={8}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FF4D4F 0%, #FF7875 100%)', borderRadius: 2 }} />
                安全态势配置
              </span>
            } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('securityStatus', securityStatus)}>编辑</Button>}>
              <Statistic title="安全评分" value={securityStatus.score} suffix="/100" prefix={<RadarChartOutlined style={{ color: '#1890FF' }} />}
                valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
              <Statistic title="状态描述" value={securityStatus.statusText} style={{ marginTop: 16 }} />
              <Statistic title="今日攻击" value={securityStatus.todayAttacks} suffix="次" prefix={<AlertOutlined />}
                valueStyle={{ color: '#FF4D4F', fontWeight: 600 }} style={{ marginTop: 16 }} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)', borderRadius: 2 }} />
                安全维度评分
              </span>
            } extra={<Button icon={<EditOutlined />}>点击行编辑</Button>}>
              <Table dataSource={radarDimensions} rowKey="name" columns={radarColumns} pagination={false} size="small" />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #52C41A 0%, #73D13D 100%)', borderRadius: 2 }} />
                扫描状态配置
              </span>
            } extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('scanStats', securityScanStats)}>编辑</Button>}>
              <Statistic title="已扫描节点" value={securityScanStats.totalNodesScanned} prefix={<SecurityScanOutlined style={{ color: '#52C41A' }} />}
                valueStyle={{ color: '#1F2937', fontWeight: 600 }} />
              <Progress percent={securityScanStats.scanProgress} status="active" style={{ marginTop: 16 }}
                strokeColor={{ '0%': '#1890FF', '100%': '#40A9FF' }} />
              <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Tag color="success" style={{ borderRadius: 6 }}>通过 {securityScanStats.passedCount}</Tag>
                <Tag color="warning" style={{ borderRadius: 6 }}>警告 {securityScanStats.vulnWarningCount}</Tag>
                <Tag color="error" style={{ borderRadius: 6 }}>高危 {securityScanStats.highRiskCount}</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'attack',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BugOutlined /> 攻击数据
        </span>
      ),
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FF4D4F 0%, #FF7875 100%)', borderRadius: 2 }} />
            攻击数据分析
          </span>
        }>
          <Collapse defaultActiveKey={['ipRank', 'vulnType']} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 8 }}>
            <Panel header={<strong style={{ color: '#1B4B89' }}>攻击源IP排名</strong>} key="ipRank" style={{ background: '#fff', borderRadius: 8 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddIp}
                style={{ marginBottom: 16, background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>
                新增IP
              </Button>
              <Table dataSource={attackIpRank} rowKey="ip" columns={ipColumns} pagination={false} />
            </Panel>
            <Panel header={<strong style={{ color: '#1B4B89' }}>漏洞攻击类型分布</strong>} key="vulnType" style={{ background: '#fff', borderRadius: 8 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddVuln}
                style={{ marginBottom: 16, background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>
                新增类型
              </Button>
              <Table dataSource={vulnType} rowKey="type" columns={vulnColumns} pagination={false} />
            </Panel>
          </Collapse>
        </Card>
      ),
    },
    {
      key: 'gpu',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DollarOutlined /> GPU收益
        </span>
      ),
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #52C41A 0%, #73D13D 100%)', borderRadius: 2 }} />
            GPU型号平均收益
          </span>
        } extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddGpu}
            style={{ background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>
            新增型号
          </Button>
        }>
          <Table dataSource={gpuModelEarnings} rowKey="modelName" columns={gpuColumns} pagination={false} />
        </Card>
      ),
    },
    {
      key: 'alarm',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertOutlined /> 告警趋势
        </span>
      ),
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FAAD14 0%, #FFC53D 100%)', borderRadius: 2 }} />
            告警变化趋势
          </span>
        }>
          <Table dataSource={alarmTrend} rowKey="time" columns={alarmColumns} pagination={false} />
          <div style={{ marginTop: 16, color: '#6B7280', fontSize: 13 }}>
            提示：告警趋势数据为时间序列，建议直接在表格中编辑各时间点的告警数量
          </div>
        </Card>
      ),
    },
    {
      key: 'logs',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HistoryOutlined /> 攻击日志
        </span>
      ),
      children: (
        <Card title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 18, background: 'linear-gradient(180deg, #FF4D4F 0%, #FF7875 100%)', borderRadius: 2 }} />
            实时安全告警日志流
          </span>
        } extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddLog}
            style={{ background: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)', border: 'none' }}>
            新增日志
          </Button>
        }>
          <Table dataSource={attackLogs} rowKey="id" columns={logColumns} pagination={false} size="small" />
        </Card>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Tabs items={tabItems} tabPosition="left" style={{ minHeight: 600 }} />

      {/* 卡片标题编辑 Modal */}
      <Modal
        title="编辑卡片标题"
        open={editModalOpen && editType === 'card'}
        onOk={saveCardTitle}
        onCancel={() => setEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* 安全状态编辑 Modal */}
      <Modal
        title="编辑安全状态配置"
        open={editModalOpen && editType === 'securityStatus'}
        onOk={saveSecurityStatus}
        onCancel={() => setEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="score" label="安全评分" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} max={100} />
          </Form.Item>
          <Form.Item name="statusText" label="状态描述" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="todayAttacks" label="今日攻击次数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 扫描统计编辑 Modal */}
      <Modal
        title="编辑扫描状态配置"
        open={editModalOpen && editType === 'scanStats'}
        onOk={saveSecurityScanStats}
        onCancel={() => setEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="totalNodesScanned" label="已扫描节点总数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="passedCount" label="通过数量" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="vulnWarningCount" label="警告数量" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="highRiskCount" label="高危数量" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 雷达维度编辑 Modal */}
      <Modal
        title="编辑安全维度评分"
        open={radarModalOpen}
        onOk={saveRadar}
        onCancel={() => setRadarModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="维度名称">
            <Input disabled />
          </Form.Item>
          <Form.Item name="value" label="评分 (1-5星)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={1} max={5} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 攻击IP编辑 Modal */}
      <Modal
        title={ipEditing?.ip ? '编辑攻击IP' : '新增攻击IP'}
        open={ipModalOpen}
        onOk={saveIp}
        onCancel={() => setIpModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="ip" label="IP地址" rules={[{ required: true }]}>
            <Input disabled={!!ipEditing?.ip} />
          </Form.Item>
          <Form.Item name="location" label="归属地" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="count" label="攻击次数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 漏洞类型编辑 Modal */}
      <Modal
        title={vulnEditing?.type ? '编辑漏洞类型' : '新增漏洞类型'}
        open={vulnModalOpen}
        onOk={saveVuln}
        onCancel={() => setVulnModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="攻击类型" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="count" label="次数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* GPU收益编辑 Modal */}
      <Modal
        title={gpuEditing?.modelName ? '编辑GPU型号' : '新增GPU型号'}
        open={gpuModalOpen}
        onOk={saveGpu}
        onCancel={() => setGpuModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="modelName" label="GPU型号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="earningsPerHour" label="时薪 (元)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} step={0.1} precision={2} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 攻击日志编辑 Modal */}
      <Modal
        title="新增攻击日志"
        open={logModalOpen}
        onOk={saveLog}
        onCancel={() => setLogModalOpen(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="time" label="时间" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sourceIp" label="源IP" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="targetName" label="目标" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="severity" label="严重程度" rules={[{ required: true }]}>
                <Select
                  options={[
                    { label: '严重', value: 'critical' },
                    { label: '警告', value: 'warning' },
                    { label: '提示', value: 'info' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="attackType" label="攻击类型" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SecurityAppPage;