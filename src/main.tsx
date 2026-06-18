import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import dataStore from './store';
import './index.css';

// 先从 public/data/*.json 加载数据基线，再渲染应用
// fetch 失败时 store 会用内联默认值兜底，finally 保证仍正常渲染
dataStore.init().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
