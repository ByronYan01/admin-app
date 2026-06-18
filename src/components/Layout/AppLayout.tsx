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
  DatabaseOutlined,
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
    {
      key: "/network",
      icon: <CloudServerOutlined />,
      label: "网络大屏管理",
    },
    {
      key: "/security",
      icon: <SecurityScanOutlined />,
      label: "安全大屏管理",
    },
    {
      key: "/knowledge",
      icon: <BookOutlined />,
      label: "知识系统管理",
    },
    {
      key: "/compute-ops",
      icon: <ClusterOutlined />,
      label: "算力运营管理",
    },
    {
      key: "/compute-monitor",
      icon: <MonitorOutlined />,
      label: "算力监控管理",
    },
    {
      key: "/ops",
      icon: <SettingOutlined />,
      label: "运维监控管理",
    },
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
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        width={260}
        style={{
          background:
            "linear-gradient(180deg, #001529 0%, #003a70 50%, #0050a0 100%)",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 顶部装饰条 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #1890FF 0%, #40A9FF 50%, #69C0FF 100%)",
          }}
        />

        {/* Logo 区域 */}
        <div
          style={{
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(24, 144, 255, 0.4)",
              marginRight: 12,
            }}
          >
            <DatabaseOutlined style={{ fontSize: 22, color: "#fff" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 1,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              大屏管理后台
            </span>
          </div>
        </div>

        {/* 菜单区域 */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            background: "transparent",
            borderRight: 0,
            marginTop: 8,
            padding: "8px 12px",
          }}
          theme="dark"
        />

        {/* 底部版权信息 */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: 11,
          }}
        >
          © 2024 Enterprise Corp.
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            height: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 4,
                height: 24,
                background: "linear-gradient(180deg, #1890FF 0%, #40A9FF 100%)",
                borderRadius: 2,
                marginRight: 16,
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#1F2937",
                letterSpacing: 0.5,
              }}
            >
              {appLabels[currentApp] || "大屏数据管理"}数据管理
            </span>
          </div>
          <Space size={16}>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExport}
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                border: "1px solid #E5E7EB",
                fontWeight: 500,
              }}
            >
              导出全部数据
            </Button>
            <Tooltip title="重置将清除当前应用所有修改的数据">
              <Button
                icon={<ReloadOutlined />}
                onClick={() => handleReset(currentApp)}
                style={{
                  background:
                    "linear-gradient(135deg, #fff2f0 0%, #fff1e6 100%)",
                  border: "1px solid #FFCCC7",
                  color: "#FF4D4F",
                  fontWeight: 500,
                }}
              >
                重置为默认
              </Button>
            </Tooltip>
          </Space>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 28,
            background: "#F0F2F5",
            borderRadius: 12,
            overflow: "auto",
            minHeight: "calc(100vh - 112px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
