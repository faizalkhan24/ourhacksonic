import { Link as RouterLink } from 'react-router';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// routes
import { ADMIN_PATH_DASHBOARD } from '../../../routes/paths';
// components
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  color:'black'
}));

// Static JSON Data
const userData = {
  photoURL: '/static/images/avatar.png',
  displayName: 'Faizal khan',
  role: 'Developer'
};

// ----------------------------------------------------------------------

export default function NavAccount() {
  return (
    <Link component={RouterLink} to={ADMIN_PATH_DASHBOARD.user.users} underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={userData.photoURL} alt={userData.displayName} name={userData.displayName} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {userData.displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {userData.role}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}