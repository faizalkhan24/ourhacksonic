// Import necessary components
import { Navigate, useRoutes } from 'react-router';
import DashboardLayout from '../layouts/dashboard';

// Import pages
import { AdminDashboard, ClientDashboard, Page404, UserFormPage, UserListPage ,AddQuestion, ClientList, Category , Widget} from './elements';

// Import paths
import { ADMIN_PATH_DASHBOARD, CLIENT_PATH_DASHBOARD } from './paths';
import ClientDashboardLayout from 'layouts/client';

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
        // {
        //   path: 'question', // Add this route for Questions
        //   element: <AddQuestion />,
        // },
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
      element: <ClientDashboardLayout />,
      children: [
        {
          index: true,
          element: <ClientDashboard />,
        },
        {
          path: ':id', // This route matches URLs like "/client-dashboard/44"
          element: <ClientDashboard />, // You can use the same component or a different one if needed
        },
        {
          path: CLIENT_PATH_DASHBOARD.user.users,
          element: <AdminDashboard />,
        },
      ],
    },

    // 404 & Fallback
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to={CLIENT_PATH_DASHBOARD.root} replace /> },
  ]);
}
