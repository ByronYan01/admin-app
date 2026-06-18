import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/components/Layout/AppLayout';
import NetworkAppPage from '@/pages/NetworkApp';
import SecurityAppPage from '@/pages/SecurityApp';
import KnowledgeAppPage from '@/pages/KnowledgeApp';
import ComputeOpsAppPage from '@/pages/ComputeOpsApp';
import ComputeMonitorAppPage from '@/pages/ComputeMonitorApp';
import OpsAppPage from '@/pages/OpsApp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/network" replace /> },
      { path: 'network', element: <NetworkAppPage /> },
      { path: 'security', element: <SecurityAppPage /> },
      { path: 'knowledge', element: <KnowledgeAppPage /> },
      { path: 'compute-ops', element: <ComputeOpsAppPage /> },
      { path: 'compute-monitor', element: <ComputeMonitorAppPage /> },
      { path: 'ops', element: <OpsAppPage /> },
    ],
  },
]);

export default router;