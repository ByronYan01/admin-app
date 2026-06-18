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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloudServerOutlined,
  DollarOutlined,
  UserOutlined,
  GlobalOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dataStore from '@/store';
import type {
  CardConfig,
  EarningStats,
  OnlineUserStats,
  UserRegion,
  DeviceShare,
  NodeScanStat,
  ProbeLink,
  TopologyData,
} from '@/types';

const { Panel } = Collapse;

const NetworkAppPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cards, setCards] = useState<CardConfig[]>([]);
  const [earningStats, setEarningStats] = useState<EarningStats>({
    totalEarnings: 0,
    currency: 'CNY',
    dayEarnings: 0,
  });
  const [onlineUserStats, setOnlineUserStats] = useState<OnlineUserStats>({
    count: 0,
    changeRate: 0,
  });
  const [userRegion, setUserRegion] = useState<UserRegion[]>([]);
  const [deviceShare, setDeviceShare] = useState<DeviceShare>({
    totalNodes: 0,
    scanProgress: 0,
    onlineCount: 0,
    maintenanceCount: 0,
    offlineCount: 0,
    nodeStates: [],
  });
  const [nodeScanStats, setNodeScanStats] = useState<NodeScanStat[]>([]);
  const [probeLink, setProbeLink] = useState<ProbeLink[]>([]);
  const [topologyData, setTopologyData] = useState<TopologyData>({
    nodes: [],
    links: [],
  });

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
    setCards(dataStore.getCardsByApp('network'));
    setEarningStats(dataStore.getEarningStats());
    setOnlineUserStats(dataStore.getOnlineUserStats());
    setUserRegion(dataStore.getUserRegion());
    setDeviceShare(dataStore.getDeviceShare());
    setNodeScanStats(dataStore.getNodeScanStats());
    setProbeLink(dataStore.getProbeLink());
    setTopologyData(dataStore.getTopologyData());
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

  // 保存数值配置
  const saveEarningStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateEarningStats({
        totalEarnings: values.totalEarnings,
        currency: values.currency,
        dayEarnings: values.dayEarnings,
      });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveOnlineUserStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateOnlineUserStats({
        count: values.count,
        changeRate: values.changeRate,
      });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveDeviceShare = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateDeviceShare({
        totalNodes: values.totalNodes,
        onlineCount: values.onlineCount,
        maintenanceCount: values.maintenanceCount,
        offlineCount: values.offlineCount,
      });
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  // 地区分布 CRUD
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const [regionEditing, setRegionEditing] = useState<UserRegion | null>(null);

  const handleAddRegion = () => {
    setRegionEditing({ province: '', count: 0, percent: 0 });
    form.setFieldsValue({ province: '', count: 0, percent: 0 });
    setRegionModalOpen(true);
  };

  const handleEditRegion = (record: UserRegion) => {
    setRegionEditing(record);
    form.setFieldsValue(record);
    setRegionModalOpen(true);
  };

  const saveRegion = async () => {
    try {
      const values = await form.validateFields();
      if (regionEditing && regionEditing.province) {
        dataStore.updateUserRegionItem(values.province, values);
      } else {
        dataStore.addUserRegion(values as UserRegion);
      }
      messageApi.success('保存成功');
      setRegionModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteRegion = (province: string) => {
    dataStore.deleteUserRegion(province);
    messageApi.success('删除成功');
    loadData();
  };

  // 数据中心 CRUD
  const [nodeModalOpen, setNodeModalOpen] = useState(false);
  const [nodeEditing, setNodeEditing] = useState<NodeScanStat | null>(null);

  const handleAddNode = () => {
    setNodeEditing({ name: '', cpu: 0, memory: 0, ioRate: 0 });
    form.setFieldsValue({ name: '', cpu: 50, memory: 50, ioRate: 100 });
    setNodeModalOpen(true);
  };

  const handleEditNode = (record: NodeScanStat) => {
    setNodeEditing(record);
    form.setFieldsValue(record);
    setNodeModalOpen(true);
  };

  const saveNode = async () => {
    try {
      const values = await form.validateFields();
      if (nodeEditing && nodeEditing.name) {
        dataStore.updateNodeScanStat(values.name, values);
      } else {
        dataStore.addNodeScanStat(values as NodeScanStat);
      }
      messageApi.success('保存成功');
      setNodeModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteNode = (name: string) => {
    dataStore.deleteNodeScanStat(name);
    messageApi.success('删除成功');
    loadData();
  };

  // 网络探针 CRUD
  const [probeModalOpen, setProbeModalOpen] = useState(false);
  const [probeEditing, setProbeEditing] = useState<ProbeLink | null>(null);

  const handleAddProbe = () => {
    setProbeEditing({ linkName: '', latency: 0, lossRate: 0 });
    form.setFieldsValue({ linkName: '', latency: 30, lossRate: 0.01 });
    setProbeModalOpen(true);
  };

  const handleEditProbe = (record: ProbeLink) => {
    setProbeEditing(record);
    form.setFieldsValue(record);
    setProbeModalOpen(true);
  };

  const saveProbe = async () => {
    try {
      const values = await form.validateFields();
      if (probeEditing && probeEditing.linkName) {
        dataStore.updateProbeLinkItem(values.linkName, values);
      } else {
        dataStore.addProbeLink(values as ProbeLink);
      }
      messageApi.success('保存成功');
      setProbeModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteProbe = (linkName: string) => {
    dataStore.deleteProbeLink(linkName);
    messageApi.success('删除成功');
    loadData();
  };

  // 拓扑节点 CRUD
  const [topoModalOpen, setTopoModalOpen] = useState(false);
  const [topoEditing, setTopoEditing] = useState<TopologyData['nodes'][0] | null>(null);
  const [topoEditMode, setTopoEditMode] = useState<'node' | 'link'>('node');

  const handleAddTopoNode = () => {
    setTopoEditMode('node');
    setTopoEditing({ id: '', label: '', type: 'switch', status: 'up' });
    form.setFieldsValue({ id: '', label: '', type: 'switch', status: 'up' });
    setTopoModalOpen(true);
  };

  const handleEditTopoNode = (record: TopologyData['nodes'][0]) => {
    setTopoEditMode('node');
    setTopoEditing(record);
    form.setFieldsValue(record);
    setTopoModalOpen(true);
  };

  const saveTopoNode = async () => {
    try {
      const values = await form.validateFields();
      if (topoEditing && topoEditing.id) {
        dataStore.updateTopologyNode(values.id, values);
      } else {
        dataStore.addTopologyNode(values as TopologyData['nodes'][0]);
      }
      messageApi.success('保存成功');
      setTopoModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteTopoNode = (id: string) => {
    dataStore.deleteTopologyNode(id);
    messageApi.success('删除成功');
    loadData();
  };

  const handleDeleteTopoLink = (source: string, target: string) => {
    dataStore.deleteTopologyLink(source, target);
    messageApi.success('删除成功');
    loadData();
  };

  // 表格列定义
  const regionColumns: ColumnsType<UserRegion> = [
    { title: '省份', dataIndex: 'province', key: 'province', width: 120 },
    { title: '用户数', dataIndex: 'count', key: 'count', width: 100 },
    {
      title: '占比',
      dataIndex: 'percent',
      key: 'percent',
      width: 100,
      render: (v) => `${v}%`,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditRegion(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteRegion(record.province)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const nodeColumns: ColumnsType<NodeScanStat> = [
    { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      key: 'cpu',
      width: 120,
      render: (v) => (
        <Progress percent={v} size="small" status={v > 80 ? 'exception' : 'active'} />
      ),
    },
    {
      title: '内存',
      dataIndex: 'memory',
      key: 'memory',
      width: 120,
      render: (v) => (
        <Progress percent={v} size="small" status={v > 80 ? 'exception' : 'active'} />
      ),
    },
    { title: 'IO速率', dataIndex: 'ioRate', key: 'ioRate', width: 100 },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditNode(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteNode(record.name)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const probeColumns: ColumnsType<ProbeLink> = [
    { title: '链路名称', dataIndex: 'linkName', key: 'linkName', width: 150 },
    {
      title: '延迟',
      dataIndex: 'latency',
      key: 'latency',
      width: 100,
      render: (v) => `${v}ms`,
    },
    {
      title: '丢包率',
      dataIndex: 'lossRate',
      key: 'lossRate',
      width: 100,
      render: (v) => `${(v * 100).toFixed(2)}%`,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditProbe(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteProbe(record.linkName)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const topoNodeColumns: ColumnsType<TopologyData['nodes'][0]> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '名称', dataIndex: 'label', key: 'label', width: 150 },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (v) => <Tag>{v}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (v) => (
        <Tag color={v === 'up' ? 'green' : 'red'}>{v === 'up' ? '在线' : '离线'}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditTopoNode(record)}>
            编辑
          </Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteTopoNode(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const topoLinkColumns: ColumnsType<TopologyData['links'][0]> = [
    { title: '源节点', dataIndex: 'source', key: 'source', width: 100 },
    { title: '目标节点', dataIndex: 'target', key: 'target', width: 100 },
    { title: '带宽', dataIndex: 'bandwidth', key: 'bandwidth', width: 80, render: (v) => `${v}G` },
    {
      title: '使用率',
      dataIndex: 'usage',
      key: 'usage',
      width: 120,
      render: (v) => <Progress percent={v} size="small" status={v > 80 ? 'exception' : 'active'} />,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="确认删除?"
          onConfirm={() => handleDeleteTopoLink(record.source, record.target)}
        >
          <Button size="small" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'cards',
      label: (
        <span>
          <SettingOutlined /> 卡片标题
        </span>
      ),
      children: (
        <Card
          title="卡片标题配置"
          extra={
            <Button type="primary" icon={<SaveOutlined />} onClick={() => messageApi.info('自动保存')}>
              自动保存
            </Button>
          }
        >
          <Table
            dataSource={cards}
            rowKey="id"
            pagination={false}
            columns={[
              { title: 'ID', dataIndex: 'id', key: 'id', width: 320 },
              { title: '标题', dataIndex: 'title', key: 'title' },
              {
                title: '操作',
                key: 'action',
                width: 100,
                render: (_, record) => (
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit('card', record)}
                  >
                    编辑
                  </Button>
                ),
              },
            ]}
          />
        </Card>
      ),
    },
    {
      key: 'stats',
      label: (
        <span>
          <DollarOutlined /> 数值配置
        </span>
      ),
      children: (
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="收益统计配置"
              extra={
                <Button icon={<EditOutlined />} onClick={() => handleEdit('earning', earningStats)}>
                  编辑
                </Button>
              }
            >
              <Statistic
                title="累计总收益"
                value={earningStats.totalEarnings}
                suffix="元"
                prefix={<DollarOutlined />}
              />
              <Statistic title="货币单位" value={earningStats.currency} style={{ marginTop: 16 }} />
              <Statistic title="今日收益" value={earningStats.dayEarnings} suffix="元" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="用户在线配置"
              extra={
                <Button icon={<EditOutlined />} onClick={() => handleEdit('online', onlineUserStats)}>
                  编辑
                </Button>
              }
            >
              <Statistic title="在线用户数" value={onlineUserStats.count} prefix={<UserOutlined />} />
              <Statistic
                title="变化率"
                value={onlineUserStats.changeRate}
                suffix="%"
                valueStyle={{ color: '#3f8600' }}
                style={{ marginTop: 16 }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="节点状态配置"
              extra={
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit('device', deviceShare)}
                >
                  编辑
                </Button>
              }
            >
              <Statistic title="总节点数" value={deviceShare.totalNodes} prefix={<NodeIndexOutlined />} />
              <div style={{ marginTop: 16 }}>
                <Tag color="green">在线 {deviceShare.onlineCount}</Tag>
                <Tag color="orange">维护 {deviceShare.maintenanceCount}</Tag>
                <Tag color="red">离线 {deviceShare.offlineCount}</Tag>
              </div>
              <Progress
                percent={deviceShare.scanProgress}
                style={{ marginTop: 16 }}
                status="active"
              />
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'region',
      label: (
        <span>
          <GlobalOutlined /> 用户地区分布
        </span>
      ),
      children: (
        <Card
          title="用户地区分布"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRegion}>
              新增地区
            </Button>
          }
        >
          <Table dataSource={userRegion} rowKey="province" columns={regionColumns} pagination={false} />
        </Card>
      ),
    },
    {
      key: 'node',
      label: (
        <span>
          <CloudServerOutlined /> 数据中心资源
        </span>
      ),
      children: (
        <Card
          title="数据中心资源"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNode}>
              新增数据中心
            </Button>
          }
        >
          <Table dataSource={nodeScanStats} rowKey="name" columns={nodeColumns} pagination={false} />
        </Card>
      ),
    },
    {
      key: 'probe',
      label: (
        <span>
          <ApiOutlined /> 网络探针
        </span>
      ),
      children: (
        <Card
          title="网络探针"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProbe}>
              新增探针
            </Button>
          }
        >
          <Table dataSource={probeLink} rowKey="linkName" columns={probeColumns} pagination={false} />
        </Card>
      ),
    },
    {
      key: 'topology',
      label: (
        <span>
          <NodeIndexOutlined /> 网络拓扑
        </span>
      ),
      children: (
        <Collapse defaultActiveKey={['nodes']}>
          <Panel header="拓扑节点" key="nodes">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTopoNode}
              style={{ marginBottom: 16 }}
            >
              新增节点
            </Button>
            <Table
              dataSource={topologyData.nodes}
              rowKey="id"
              columns={topoNodeColumns}
              pagination={false}
              size="small"
            />
          </Panel>
          <Panel header="拓扑链路" key="links">
            <Table
              dataSource={topologyData.links}
              rowKey={(r) => `${r.source}-${r.target}`}
              columns={topoLinkColumns}
              pagination={false}
              size="small"
            />
          </Panel>
        </Collapse>
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

      {/* 收益统计编辑 Modal */}
      <Modal
        title="编辑收益统计"
        open={editModalOpen && editType === 'earning'}
        onOk={saveEarningStats}
        onCancel={() => setEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="totalEarnings" label="累计总收益" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} step={100} />
          </Form.Item>
          <Form.Item name="currency" label="货币单位" rules={[{ required: true }]}>
            <Select
              options={[
                { label: '人民币 (CNY)', value: 'CNY' },
                { label: '美元 (USD)', value: 'USD' },
              ]}
            />
          </Form.Item>
          <Form.Item name="dayEarnings" label="今日收益" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} step={10} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 用户在线编辑 Modal */}
      <Modal
        title="编辑用户在线配置"
        open={editModalOpen && editType === 'online'}
        onOk={saveOnlineUserStats}
        onCancel={() => setEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="count" label="在线用户数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="changeRate" label="变化率 (%)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} step={0.1} precision={1} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 节点状态编辑 Modal */}
      <Modal
        title="编辑节点状态配置"
        open={editModalOpen && editType === 'device'}
        onOk={saveDeviceShare}
        onCancel={() => setEditModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="totalNodes" label="总节点数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="onlineCount" label="在线节点数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="maintenanceCount" label="维护中节点数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="offlineCount" label="离线节点数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 地区分布编辑 Modal */}
      <Modal
        title={regionEditing?.province ? '编辑地区' : '新增地区'}
        open={regionModalOpen}
        onOk={saveRegion}
        onCancel={() => setRegionModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="province" label="省份" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="count" label="用户数" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="percent" label="占比 (%)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} step={0.1} precision={1} max={100} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 数据中心编辑 Modal */}
      <Modal
        title={nodeEditing?.name ? '编辑数据中心' : '新增数据中心'}
        open={nodeModalOpen}
        onOk={saveNode}
        onCancel={() => setNodeModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cpu" label="CPU (%)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} max={100} />
          </Form.Item>
          <Form.Item name="memory" label="内存 (%)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} max={100} />
          </Form.Item>
          <Form.Item name="ioRate" label="IO速率" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 网络探针编辑 Modal */}
      <Modal
        title={probeEditing?.linkName ? '编辑探针' : '新增探针'}
        open={probeModalOpen}
        onOk={saveProbe}
        onCancel={() => setProbeModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="linkName" label="链路名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="latency" label="延迟 (ms)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="lossRate" label="丢包率 (%)" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={0.01}
              precision={2}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 拓扑节点编辑 Modal */}
      <Modal
        title={topoEditing?.id ? '编辑节点' : '新增节点'}
        open={topoModalOpen && topoEditMode === 'node'}
        onOk={saveTopoNode}
        onCancel={() => setTopoModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="节点ID" rules={[{ required: true }]}>
            <Input disabled={!!topoEditing?.id} />
          </Form.Item>
          <Form.Item name="label" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true }]}>
            <Select
              options={[
                { label: '路由器', value: 'router' },
                { label: '交换机', value: 'switch' },
                { label: '核心设备', value: 'core' },
              ]}
            />
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true }]}>
            <Select
              options={[
                { label: '在线', value: 'up' },
                { label: '离线', value: 'down' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NetworkAppPage;