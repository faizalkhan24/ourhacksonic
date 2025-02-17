import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useMemo } from 'react';
// @mui
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
//
import { defaultPreset } from './presets';

// ----------------------------------------------------------------------

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
};

export default function ThemeColorPresets({ children }) {
  const outerTheme = useTheme();
  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: defaultPreset,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(defaultPreset.main, 0.24)}`,
      },
    }),
    [defaultPreset]
  );

  const theme = createTheme(merge(outerTheme, themeOptions));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
