/**
 * Typed access hook for the centralized theme engine.
 */

import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return themeContext;
};
