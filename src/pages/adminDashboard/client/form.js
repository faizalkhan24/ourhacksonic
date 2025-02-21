import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
// @mui
import { Container } from '@mui/material';
// routes
import { ADMIN_PATH_DASHBOARD } from 'routes/paths';
// _mock_
import { _userList } from '_mock/arrays';
// components
import { useSettingsContext } from 'components/settings';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import UserFormSection from 'sections/adminDashboard/user/form';
import { paramCase } from 'change-case';
// sections
// import UserNewEditForm from 'sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();
  const isEdit = name !== undefined;

  const currentUser = _userList.find((user) => paramCase(user.name) === name);
  console.log('namename', name);
  return (
    <>
      <Helmet>
        <title> User: {isEdit ? `Edit` : `New`} user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={isEdit ? "Edit user" : "New User"}
          links={[
            {
              name: 'Dashboard',
              href: ADMIN_PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: ADMIN_PATH_DASHBOARD.user.users,
            },
            { name: 'Users', href: ADMIN_PATH_DASHBOARD.user.users },
          ]}
        />

        <UserFormSection isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </>
  );
}
