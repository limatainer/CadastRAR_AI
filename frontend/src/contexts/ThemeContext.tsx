import { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeContext, ThemeContextType } from './themeContextCore';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const value: ThemeContextType = { theme, toggle };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
