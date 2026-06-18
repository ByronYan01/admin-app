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
  Row,
  Col,
  Statistic,
  Progress,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dataStore from '@/store';
import type {
  CardConfig,
  StorageStats,
  BusinessStats,
  AppUsageRank,
  UserQuestionRank,
  FileUsageRank,
} from '@/types';

const KnowledgeAppPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cards, setCards] = useState<CardConfig[]>([]);
  const [storageStats, setStorageStats] = useState<StorageStats>({ total: 0, used: 0, free: 0, usageRate: 0 });
  const [businessStats, setBusinessStats] = useState<BusinessStats>({
    appCount: 0, kbCount: 0, fileCount: 0, userCount: 0, questionCount: 0, internalQuestions: 0, externalQuestions: 0,
  });
  const [appUsageRank, setAppUsageRank] = useState<AppUsageRank[]>([]);
  const [userQuestionRank, setUserQuestionRank] = useState<UserQuestionRank[]>([]);
  const [fileUsageRank, setFileUsageRank] = useState<FileUsageRank[]>([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    setCards(dataStore.getCardsByApp('knowledge'));
    setStorageStats(dataStore.getStorageStats());
    setBusinessStats(dataStore.getBusinessStats());
    setAppUsageRank(dataStore.getAppUsageRank());
    setUserQuestionRank(dataStore.getUserQuestionRank());
    setFileUsageRank(dataStore.getFileUsageRank());
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

  const saveStorageStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateStorageStats(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  const saveBusinessStats = async () => {
    try {
      const values = await form.validateFields();
      dataStore.updateBusinessStats(values);
      messageApi.success('保存成功');
      setEditModalOpen(false);
      loadData();
    } catch {}
  };

  // App Usage CRUD
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appEditing, setAppEditing] = useState<AppUsageRank | null>(null);

  const handleAddApp = () => {
    setAppEditing({ appName: '', count: 0 });
    form.setFieldsValue({ appName: '', count: 0 });
    setAppModalOpen(true);
  };

  const handleEditApp = (record: AppUsageRank) => {
    setAppEditing(record);
    form.setFieldsValue(record);
    setAppModalOpen(true);
  };

  const saveApp = async () => {
    try {
      const values = await form.validateFields();
      if (appEditing?.appName) {
        dataStore.updateAppUsageRankItem(values.appName, values);
      } else {
        dataStore.addAppUsageRank(values as AppUsageRank);
      }
      messageApi.success('保存成功');
      setAppModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteApp = (appName: string) => {
    dataStore.deleteAppUsageRank(appName);
    messageApi.success('删除成功');
    loadData();
  };

  // User Question CRUD
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userEditing, setUserEditing] = useState<UserQuestionRank | null>(null);

  const handleAddUser = () => {
    setUserEditing({ userName: '', count: 0 });
    form.setFieldsValue({ userName: '', count: 0 });
    setUserModalOpen(true);
  };

  const handleEditUser = (record: UserQuestionRank) => {
    setUserEditing(record);
    form.setFieldsValue(record);
    setUserModalOpen(true);
  };

  const saveUser = async () => {
    try {
      const values = await form.validateFields();
      if (userEditing?.userName) {
        dataStore.updateUserQuestionRankItem(values.userName, values);
      } else {
        dataStore.addUserQuestionRank(values as UserQuestionRank);
      }
      messageApi.success('保存成功');
      setUserModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteUser = (userName: string) => {
    dataStore.deleteUserQuestionRank(userName);
    messageApi.success('删除成功');
    loadData();
  };

  // File Usage CRUD
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [fileEditing, setFileEditing] = useState<FileUsageRank | null>(null);

  const handleAddFile = () => {
    setFileEditing({ fileName: '', count: 0 });
    form.setFieldsValue({ fileName: '', count: 0 });
    setFileModalOpen(true);
  };

  const handleEditFile = (record: FileUsageRank) => {
    setFileEditing(record);
    form.setFieldsValue(record);
    setFileModalOpen(true);
  };

  const saveFile = async () => {
    try {
      const values = await form.validateFields();
      if (fileEditing?.fileName) {
        dataStore.updateFileUsageRankItem(values.fileName, values);
      } else {
        dataStore.addFileUsageRank(values as FileUsageRank);
      }
      messageApi.success('保存成功');
      setFileModalOpen(false);
      loadData();
    } catch {}
  };

  const handleDeleteFile = (fileName: string) => {
    dataStore.deleteFileUsageRank(fileName);
    messageApi.success('删除成功');
    loadData();
  };

  // Columns
  const appColumns: ColumnsType<AppUsageRank> = [
    { title: '应用名称', dataIndex: 'appName', key: 'appName', width: 200 },
    { title: '调用次数', dataIndex: 'count', key: 'count' },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditApp(record)}>编辑</Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteApp(record.appName)}>
            <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const userColumns: ColumnsType<UserQuestionRank> = [
    { title: '用户名', dataIndex: 'userName', key: 'userName', width: 200 },
    { title: '提问次数', dataIndex: 'count', key: 'count' },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditUser(record)}>编辑</Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteUser(record.userName)}>
            <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fileColumns: ColumnsType<FileUsageRank> = [
    { title: '文件名', dataIndex: 'fileName', key: 'fileName', width: 200 },
    { title: '使用次数', dataIndex: 'count', key: 'count' },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditFile(record)}>编辑</Button>
          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteFile(record.fileName)}>
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
      label: <span><SettingOutlined /> 卡片标题</span>,
      children: (
        <Card title="卡片标题配置">
          <Table dataSource={cards} rowKey="id" pagination={false} columns={cardColumns} />
        </Card>
      ),
    },
    {
      key: 'storage',
      label: <span><DatabaseOutlined /> 存储状态</span>,
      children: (
        <Card
          title="存储状态监控"
          extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('storage', storageStats)}>编辑</Button>}
        >
          <Row gutter={16}>
            <Col span={6}><Statistic title="存储总量" value={storageStats.total} suffix="GB" /></Col>
            <Col span={6}><Statistic title="存储使用量" value={storageStats.used} suffix="GB" /></Col>
            <Col span={6}><Statistic title="存储剩余量" value={storageStats.free} suffix="GB" /></Col>
            <Col span={6}>
              <Statistic title="存储使用率" value={storageStats.usageRate} suffix="%" />
              <Progress percent={storageStats.usageRate} size="small" style={{ marginTop: 8 }} />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: 'business',
      label: <span><AppstoreOutlined /> 业务数据</span>,
      children: (
        <Card
          title="业务基础数据统计"
          extra={<Button icon={<EditOutlined />} onClick={() => handleEdit('business', businessStats)}>编辑</Button>}
        >
          <Row gutter={16}>
            <Col span={8}><Statistic title="应用总数" value={businessStats.appCount} prefix={<AppstoreOutlined />} /></Col>
            <Col span={8}><Statistic title="知识库总数" value={businessStats.kbCount} /></Col>
            <Col span={8}><Statistic title="文件总数" value={businessStats.fileCount} prefix={<FileTextOutlined />} /></Col>
            <Col span={8}><Statistic title="对话用户总数" value={businessStats.userCount} prefix={<UserOutlined />} style={{ marginTop: 16 }} /></Col>
            <Col span={8}><Statistic title="提问总次数" value={businessStats.questionCount} /></Col>
            <Col span={8}>
              <Statistic title="提问来源分布" value={`站內${businessStats.internalQuestions} / 站外${businessStats.externalQuestions}`} style={{ marginTop: 16 }} />
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: 'appRank',
      label: <span><LineChartOutlined /> 应用使用Top5</span>,
      children: (
        <Card title="应用使用Top5" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAddApp}>新增</Button>}>
          <Table dataSource={appUsageRank} rowKey="appName" pagination={false} columns={appColumns} />
        </Card>
      ),
    },
    {
      key: 'userRank',
      label: <span><TeamOutlined /> 提问人员Top5</span>,
      children: (
        <Card title="提问最多人员Top5" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>新增</Button>}>
          <Table dataSource={userQuestionRank} rowKey="userName" pagination={false} columns={userColumns} />
        </Card>
      ),
    },
    {
      key: 'fileRank',
      label: <span><FileTextOutlined /> 文件使用Top5</span>,
      children: (
        <Card title="文件使用Top5" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAddFile}>新增</Button>}>
          <Table dataSource={fileUsageRank} rowKey="fileName" pagination={false} columns={fileColumns} />
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

      <Modal title="编辑存储状态" open={editModalOpen && editType === 'storage'} onOk={saveStorageStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="total" label="存储总量 (GB)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="used" label="存储使用量 (GB)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="free" label="存储剩余量 (GB)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="usageRate" label="存储使用率 (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} max={100} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑业务数据" open={editModalOpen && editType === 'business'} onOk={saveBusinessStats} onCancel={() => setEditModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}><Form.Item name="appCount" label="应用总数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="kbCount" label="知识库总数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="fileCount" label="文件总数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="userCount" label="对话用户总数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="questionCount" label="提问总次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="internalQuestions" label="站內提问次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="externalQuestions" label="站外提问次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title={appEditing?.appName ? '编辑应用' : '新增应用'} open={appModalOpen} onOk={saveApp} onCancel={() => setAppModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="appName" label="应用名称" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="count" label="调用次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title={userEditing?.userName ? '编辑用户' : '新增用户'} open={userModalOpen} onOk={saveUser} onCancel={() => setUserModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="userName" label="用户名" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="count" label="提问次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title={fileEditing?.fileName ? '编辑文件' : '新增文件'} open={fileModalOpen} onOk={saveFile} onCancel={() => setFileModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="fileName" label="文件名" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="count" label="使用次数" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeAppPage;