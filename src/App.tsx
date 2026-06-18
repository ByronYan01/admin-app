import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const App = () => (
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: '#1B4B89',
        colorLink: '#1890FF',
        colorInfo: '#1890FF',
        colorSuccess: '#52C41A',
        colorWarning: '#FAAD14',
        colorError: '#FF4D4F',
        colorBgContainer: '#FFFFFF',
        colorBgLayout: '#F0F2F5',
        colorBorder: '#E5E7EB',
        colorText: '#1F2937',
        colorTextSecondary: '#6B7280',
        borderRadius: 8,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      },
      algorithm: theme.defaultAlgorithm,
      components: {
        Layout: {
          siderBg: 'linear-gradient(180deg, #001529 0%, #003a70 100%)',
          headerBg: '#FFFFFF',
          bodyBg: '#F0F2F5',
        },
        Menu: {
          darkItemBg: 'transparent',
          darkItemSelectedBg: 'rgba(24, 144, 255, 0.15)',
          darkItemHoverBg: 'rgba(24, 144, 255, 0.1)',
          darkItemColor: 'rgba(255, 255, 255, 0.85)',
          darkItemSelectedColor: '#FFFFFF',
          itemSelectedColor: '#1890FF',
        },
        Card: {
          borderRadiusLG: 12,
        },
        Table: {
          headerBg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          rowHoverBg: 'rgba(24, 144, 255, 0.05)',
        },
        Button: {
          primaryShadow: '0 2px 4px rgba(27, 75, 137, 0.2)',
          defaultShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        },
        Modal: {
          headerBg: 'linear-gradient(135deg, #1B4B89 0%, #2E75B6 100%)',
          titleColor: '#FFFFFF',
        },
      },
    }}
  >
    {/* 由 router 提供内容 */}
  </ConfigProvider>
);

export default App;