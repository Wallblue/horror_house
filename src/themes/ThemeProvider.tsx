import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ThemeContext, ThemeMode } from './ThemeContext';

interface Props {
  children: ReactNode;
}

export default function AppThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{mode, toggleMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
