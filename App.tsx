import React, { memo, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { linking, navigationRef, RootNavigator } from './src/navigation';
import { AppProviders } from './src/providers';
import { useTheme } from './src/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const AppShell = memo(() => {
  const { colors, isDark } = useTheme();

  const navigationTheme = useMemo<NavigationTheme>(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.navigationBackground,
        text: colors.textPrimary,
        border: colors.border,
        notification: colors.accent,
      },
    };
  }, [colors, isDark]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        theme={navigationTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
});

AppShell.displayName = 'AppShell';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppProviders>
        <AppShell />
      </AppProviders>
    </GestureHandlerRootView>
  );
};

export default App;
