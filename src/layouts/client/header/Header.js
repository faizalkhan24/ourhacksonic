import { AppBar, Toolbar, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/logo';
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        width: '100%', // Ensure full width
        height: 64, // Adjust height as needed
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { xs: 2, sm: 3, lg: 5 },
          justifyContent: 'space-between', // Spread out items
        }}
      >
        {/* Logo on the left */}
        <Logo />

        {/* Account/Profile Menu on the right */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
