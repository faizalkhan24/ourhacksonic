import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'; // Get ID from URL
import useResponsive from '../../hooks/useResponsive';
import { HEADER } from '../../config-global';
import { useSettingsContext } from '../../components/settings';
import Header from './header/Header'; // Corrected import path

const SPACING = 8;

Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default function Main({ children, sx, ...other }) {
  const { themeLayout } = useSettingsContext();
  const isNavHorizontal = themeLayout === 'horizontal';
  const isDesktop = useResponsive('up', 'lg');

  const apiUrl = process.env.REACT_APP_APIBASEURL;
  console.log("API URL client layout:", apiUrl);

  const { id } = useParams();
  const [clientParams, setClientParams] = useState(null);

  useEffect(() => {
    if (id) {
      console.log(`🔄 Fetching new data for ID: ${id}`);
      localStorage.removeItem("clientParams");

      fetch(`${apiUrl}/api/client-params/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("❌ Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          console.log("✅ New data received:", data);
          setClientParams(data);
          localStorage.setItem("clientParams", JSON.stringify(data));
        })
        .catch(error => console.error("⚠️ Error fetching client params:", error));
    }
  }, [id, apiUrl]);

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
        <Header clientParams={clientParams} />
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
        ...(isDesktop && { px: 2 }),
        ...sx,
      }}
      {...other}
    >
      <Header clientParams={clientParams} />
      {children}
    </Box>
  );
}
