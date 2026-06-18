import React from "react";
import { Layout, Menu, Button, Modal, message, Space, Tooltip } from "antd";
import {
  CloudServerOutlined,
  SecurityScanOutlined,
  BookOutlined,
  ClusterOutlined,
  MonitorOutlined,
  SettingOutlined,
  ReloadOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import dataStore from "@/store";
import { exportAllData } from "@/utils/exportData";

type AppType =
  | "network"
  | "security"
  | "knowledge"
  | "compute-ops"
  | "compute-monitor"
  | "ops";

const { Header, Sider, Content } = Layout;

const appLabels: Record<AppType, string> = {
  network: "网络大屏",
  security: "安全大屏",
  knowledge: "知识系统大屏",
  "compute-ops": "算力运营大屏",
  "compute-monitor": "算力监控大屏",
  ops: "运维监控大屏",
};

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  const currentApp = location.pathname.slice(1) as AppType;

  const menuItems = [
    { key: "/network", icon: <CloudServerOutlined />, label: "网络大屏管理" },
    { key: "/security", icon: <SecurityScanOutlined />, label: "安全大屏管理" },
    { key: "/knowledge", icon: <BookOutlined />, label: "知识系统管理" },
    { key: "/compute-ops", icon: <ClusterOutlined />, label: "算力运营管理" },
    { key: "/compute-monitor", icon: <MonitorOutlined />, label: "算力监控管理" },
    { key: "/ops", icon: <SettingOutlined />, label: "运维监控管理" },
  ];

  const handleReset = (app: AppType) => {
    Modal.confirm({
      title: "确认重置",
      icon: <ExclamationCircleOutlined />,
      content: `确定要重置 ${appLabels[app]} 的所有数据吗？这将恢复默认数据。`,
      okText: "确认重置",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        dataStore.resetApp(app);
        messageApi.success(`${appLabels[app]} 数据已重置为默认值`);
        navigate(0);
      },
    });
  };

  const handleExport = async () => {
    try {
      await exportAllData();
      messageApi.success("数据已导出为 ZIP");
    } catch (e) {
      console.error("导出失败:", e);
      messageApi.error("导出失败，请重试");
    }
  };

  return (
    <Layout className="app-layout">
      {contextHolder}
      <Sider className="app-layout-sider" width={260}>
        <div className="app-logo">
          <AppstoreOutlined className="app-logo-icon" />
          <span className="app-logo-text">大屏管理后台</span>
        </div>
        <Menu
          className="app-menu"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          theme="dark"
        />
      </Sider>

      <Layout>
        <Header className="app-header">
          <div className="app-header-title">
            <div className="app-header-indicator" />
            <span className="app-header-text">
              {appLabels[currentApp] || "大屏数据管理"}数据管理
            </span>
          </div>
          <Space size={16}>
            <Button icon={<DownloadOutlined />} onClick={handleExport} className="app-btn-export">
              导出全部数据
            </Button>
            <Tooltip title="重置将清除当前应用所有修改的数据">
              <Button icon={<ReloadOutlined />} onClick={() => handleReset(currentApp)} className="app-btn-reset">
                重置为默认
              </Button>
            </Tooltip>
          </Space>
        </Header>

        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;