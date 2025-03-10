import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useEffect } from 'react';
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

  // Call API and save response in local storage on component mount
  useEffect(() => {
    fetch("http://localhost:3001/api/client-params/44")
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
  }, []);

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
          // Additional responsive styles can be uncommented and adjusted as needed
          // py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          // width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          // ...(isNavMini && {
          //   width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
          // }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
