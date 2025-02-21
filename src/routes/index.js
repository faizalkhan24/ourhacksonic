// Import necessary components
import { Navigate, useRoutes } from 'react-router';
import DashboardLayout from '../layouts/dashboard';

// Import pages
import { AdminDashboard, ClientDashboard, Page404, UserFormPage, UserListPage ,AddQuestion, ClientList, Category , Widget} from './elements';

// Import paths
import { ADMIN_PATH_DASHBOARD, CLIENT_PATH_DASHBOARD } from './paths';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Admin Routes
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
        {
          path: "client",
          element: <ClientList />,
        },
        {
          path: 'question', // Add this route for Questions
          element: <AddQuestion />,
        },
        {
          path: 'category', // Add this route for Questions
          element: <Category />,
        },
        {
          path: 'widget', // Add this route for Questions
          element: <Widget />,
        },
      ],
    },
    // Client Routes
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
    // 404 & Fallback
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/admin-dashboard" replace /> },
  ]);
}
