import React, { memo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { ThemeProviderProps } from '../types';

import { ThemeProvider } from '../theme';

const AppProvidersComponent = ({
  children,
}: Pick<ThemeProviderProps, 'children'>) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SafeAreaProvider>
  );
};

AppProvidersComponent.displayName = 'AppProviders';

export const AppProviders = memo(AppProvidersComponent);
