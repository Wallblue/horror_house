import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export const ThemeContext = createContext<{
  mode: ThemeMode;
  toggleMode: () => void;
}>({
  mode: 'light',
  toggleMode: () => {},
});
