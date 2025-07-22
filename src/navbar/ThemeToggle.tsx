import { Switch, Typography, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../themes/useThemeMode';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {mode === 'light' ? (
          <LightModeIcon />
        ) : (
          <DarkModeIcon />
        )
      }
      <Switch checked={mode === 'dark'} onChange={toggleMode} />
    </Box>
  );
}