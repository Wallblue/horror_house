import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ThemeContext, ThemeMode } from './ThemeContext';

interface Props {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'horror-house-theme';

const getStoredTheme = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    console.warn('Erreur lors de la lecture du thème depuis localStorage:', error);
  }
  return 'dark';
};

const saveTheme = (theme: ThemeMode) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Erreur lors de la sauvegarde du thème dans localStorage:', error);
  }
};

export default function AppThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    saveTheme(mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
