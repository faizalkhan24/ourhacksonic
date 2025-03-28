import { AppBar, Toolbar, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { bgBlur } from '../../../utils/cssStyles';
import Logo from '../../../components/logo';
import AccountPopover from './AccountPopover';

export default function Header() {
  const theme = useTheme();
  
  // Initialize with current localStorage value (if any)
  const [clientParams, setClientParams] = useState(() => {
    const stored = localStorage.getItem("clientParams");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error parsing clientParams:", error);
      return null;
    }
  });

  // Poll localStorage for changes every 500ms to get the latest clientParams
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("clientParams");
      if (stored) {
        try {
          const params = JSON.parse(stored);
          // Only update state if there's a change
          if (JSON.stringify(params) !== JSON.stringify(clientParams)) {
            setClientParams(params);
          }
        } catch (error) {
          console.error("Error parsing clientParams:", error);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [clientParams]);

  // If client name is not available, show "Loading..."
  const displayedClientName = clientParams && clientParams.client_name
    ? clientParams.client_name
    : "Loading...";

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        width: '100%',
        height: 64,
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
          justifyContent: 'space-between',
        }}
      >
        {/* Logo on the left, with the current client name (or "Loading...") */}
        <Logo clientName={displayedClientName} />

        {/* Account/Profile Menu on the right */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
