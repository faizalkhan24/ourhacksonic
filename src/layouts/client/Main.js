import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get ID from URL
import useResponsive from '../../hooks/useResponsive';
import { HEADER, NAV } from '../../config-global';
import { useSettingsContext } from '../../components/settings';

const SPACING = 8;

Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default function Main({ children, sx, ...other }) {
  const { themeLayout } = useSettingsContext();
  const isNavHorizontal = themeLayout === 'horizontal';
  const isNavMini = themeLayout === 'mini';
  const isDesktop = useResponsive('up', 'lg');

  const { id } = useParams(); // Get ID from URL

  useEffect(() => {
    if (id) { // Call API only if ID is present
      fetch(`http://4.227.190.93:3001/api/client-params/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem("clientParams", JSON.stringify(data));
        })
        .catch(error => console.error("Error fetching client params:", error));
    }
  }, [id]); // Dependency array includes id to re-fetch when it changes

  if (isNavHorizontal) {
    return (
      <Box
        component="main"
        sx={{
          pt: `${HEADER.H_MOBILE + SPACING}px`,
          pb: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
            pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          }),
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
