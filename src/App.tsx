import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const App = () => (
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: '#1890FF',
        colorSuccess: '#52C41A',
        colorWarning: '#FAAD14',
        colorError: '#FF4D4F',
        colorInfo: '#1890FF',
        colorBgContainer: '#FFFFFF',
        colorBgLayout: '#F0F2F5',
        colorBorder: '#E5E7EB',
        colorText: '#1F2937',
        colorTextSecondary: '#6B7280',
        borderRadius: 8,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
      algorithm: theme.defaultAlgorithm,
      components: {
        Layout: {
          siderBg: 'linear-gradient(180deg, #001529 0%, #003a70 50%, #0050a0 100%)',
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
        Modal: {
          borderRadiusLG: 16,
        },
      },
    }}
  >
    {/* 由 router 提供内容 */}
  </ConfigProvider>
);

export default App;