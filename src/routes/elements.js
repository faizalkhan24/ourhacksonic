import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
// export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
// export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
// export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
// export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
// export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// ERROR PAGES
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// ADMIN DASHBOARD START
export const AdminDashboard = Loadable(lazy(() => import('../pages/adminDashboard')));
export const ClientList = Loadable(lazy(() => import('../pages/adminDashboard/client/client-list')));

export const UserListPage = Loadable(lazy(() => import('../pages/adminDashboard/client/list')));
export const UserFormPage = Loadable(lazy(() => import('../pages/adminDashboard/client/form')));
export const AddQuestion = Loadable(lazy(() => import('../pages/adminDashboard/question/question')));
export const Category = Loadable(lazy(() => import('../pages/adminDashboard/category/Category')));
export const Widget = Loadable(lazy(() => import('../pages/adminDashboard/Widget/Widget')));

// ADMIN DASHBOARD END

// CLIENT DASHBOARD START
export const ClientDashboard = Loadable(lazy(() => import('../pages/clientDashboard')));
// CLIENT DASHBOARD END