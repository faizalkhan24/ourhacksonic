import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router';
import { Box, Link, Typography } from '@mui/material';

const Logo = forwardRef(({ disabledLink = false, sx, clientName = "", ...other }, ref) => {
  // Logo image element
  const logoImage = (
    <Box
      component="img"
      src="/logo/white_logo.png"
      sx={{ width: 100, height: 20, cursor: 'pointer', ...sx }}
    />
  );

  // Text element to display "Insights" in bold and the client name in normal weight
  const logoText = (
    <Typography variant="h6" sx={{ color: '#fff', ml: 1 }}>
      <Box component="span" sx={{ fontWeight: 'bold' }}>
        Insights -
      </Box>
      <Box component="span" sx={{ fontWeight: 'normal', fontSize: '1.2rem', ml: 1 }}>
        {clientName}
      </Box>
    </Typography>
  );

  const logo = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {logoImage}
      {clientName && logoText}
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }} {...other}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  clientName: PropTypes.string,
};

export default Logo;
