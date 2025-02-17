// import { Navigate, useRoutes } from 'react-router';
// layouts
import { Navigate, useRoutes } from 'react-router';
import DashboardLayout from '../layouts/dashboard';
// config
//
import { AdminDashboard, ClientDashboard, Page404, UserFormPage, UserListPage } from './elements';
import { ADMIN_PATH_DASHBOARD, CLIENT_PATH_DASHBOARD } from './paths';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: ADMIN_PATH_DASHBOARD.root,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
       
        {
          path: 'user',
          children: [
            {
              path: 'users',
              element: <UserListPage />,
            },
            { path: 'users/new', element: <UserFormPage /> },
            { path: 'users/:name/edit', element: <UserFormPage /> },
          ],
        },
      ],
    },
    {
      path: CLIENT_PATH_DASHBOARD.root,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <ClientDashboard />,
        },
        {
          path: CLIENT_PATH_DASHBOARD.user.users,
          element: <AdminDashboard />,
        },
      ],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/admin-dashboard" replace /> },
  ]);
}
