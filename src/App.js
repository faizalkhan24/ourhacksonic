import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider, ThemeSettings } from './components/settings';
import { BrowserRouter } from 'react-router';
import Router from './routes';
import { MotionLazyContainer } from './components/animate';
import ThemeProvider from './theme';
import SnackbarProvider from './components/snackbar';

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <MotionLazyContainer>
          <ThemeSettings>
            <ThemeProvider>
              <SnackbarProvider>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </SnackbarProvider>
            </ThemeProvider>
          </ThemeSettings>
        </MotionLazyContainer>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
