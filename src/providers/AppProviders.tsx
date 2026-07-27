import React, { memo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { ThemeProviderProps } from '../types';

import { ThemeProvider } from '../theme';
import { NetworkProvider } from './NetworkProvider';
import { ToastProvider } from './ToastProvider';

const AppProvidersComponent = ({
  children,
}: Pick<ThemeProviderProps, 'children'>) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <NetworkProvider>{children}</NetworkProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

AppProvidersComponent.displayName = 'AppProviders';

export const AppProviders = memo(AppProvidersComponent);
