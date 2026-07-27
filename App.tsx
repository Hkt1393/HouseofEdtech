import React, { memo, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
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
  const navigationBarButtonStyle = useMemo<NavigationBar.NavigationBarButtonStyle>(
    () => (isDark ? 'light' : 'dark'),
    [isDark],
  );

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

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    let isMounted = true;

    const syncNavigationBar = async () => {
      if (!isMounted) {
        return;
      }

      await NavigationBar.setVisibilityAsync('visible');
      await NavigationBar.setPositionAsync('relative');
      await NavigationBar.setBackgroundColorAsync(colors.background);
      await NavigationBar.setBorderColorAsync(colors.background);
      await NavigationBar.setButtonStyleAsync(navigationBarButtonStyle);
    };

    void syncNavigationBar();

    return () => {
      isMounted = false;
    };
  }, [colors.background, navigationBarButtonStyle]);

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
