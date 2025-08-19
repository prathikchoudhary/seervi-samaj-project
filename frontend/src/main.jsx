import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Sigup, Home, Login, Settings, MainLayout } from './components';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Sigup />} />

      {/* Routes inside MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />   {/* default route */}
        <Route path="settings" element={<Settings />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
