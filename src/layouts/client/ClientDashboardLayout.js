import { Outlet } from 'react-router';
// @mui
import { Box } from '@mui/material';
// components
import Header from './header';
import Main from './Main';

// ----------------------------------------------------------------------

export default function ClientDashboardLayout() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
