import { useContext } from 'react';
import { ThemeContext } from './themeContextCore';

export function useThemeValue() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeValue must be used within a ThemeProvider');
  }
  return context;
}
