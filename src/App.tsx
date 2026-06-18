import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const App = () => (
  <ConfigProvider locale={zhCN}>
    {/* 由 router 提供内容 */}
  </ConfigProvider>
);

export default App;