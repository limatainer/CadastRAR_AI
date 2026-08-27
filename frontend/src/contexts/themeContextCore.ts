import { Theme } from '@/hooks/useTheme';
import { createContext } from 'react';

export interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
