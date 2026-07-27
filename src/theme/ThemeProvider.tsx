/**
 * Application theme provider that synchronizes React Native theme access with
 * NativeWind color-scheme switching and CSS variables.
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme, vars } from 'nativewind';

import { STORAGE_KEYS } from '../constants';
import type { ThemeContextValue, ThemeMode, ThemeProviderProps } from '../types';

import { getNativeWindVariables, getTheme, resolveThemeMode } from './theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isThemePreference = (
  value: string | null,
): value is NonNullable<ThemeProviderProps['initialThemeMode']> => {
  return value === 'light' || value === 'dark' || value === 'system';
};

export const ThemeProvider = ({
  children,
  initialThemeMode = 'system',
}: ThemeProviderProps) => {
  const [isThemePreferenceHydrated, setIsThemePreferenceHydrated] = useState(false);
  const [themeMode, setThemeModeState] = useState(initialThemeMode);
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const {
    colorScheme: nativeWindColorScheme,
    setColorScheme: setNativeWindColorScheme,
  } = useNativeWindColorScheme();

  const systemMode: ThemeMode = nativeWindColorScheme === 'dark' ? 'dark' : 'light';
  const resolvedThemeMode = resolveThemeMode(themeMode, systemMode);

  useEffect(() => {
    let isMounted = true;

    const hydrateThemePreference = async () => {
      try {
        const storedThemePreference = await AsyncStorage.getItem(
          STORAGE_KEYS.APP_THEME,
        );

        if (isMounted && isThemePreference(storedThemePreference)) {
          setThemeModeState(storedThemePreference);
        }
      } finally {
        if (isMounted) {
          setIsThemePreferenceHydrated(true);
        }
      }
    };

    void hydrateThemePreference();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setNativeWindColorScheme(themeMode);
  }, [setNativeWindColorScheme, themeMode]);

  useEffect(() => {
    if (!isThemePreferenceHydrated) {
      return;
    }

    void AsyncStorage.setItem(STORAGE_KEYS.APP_THEME, themeMode);
  }, [isThemePreferenceHydrated, themeMode]);

  useEffect(() => {
    let isMounted = true;

    const syncReduceMotionPreference = async () => {
      const isReduceMotionEnabled =
        await AccessibilityInfo.isReduceMotionEnabled();

      if (isMounted) {
        setReduceMotionEnabled(isReduceMotionEnabled);
      }
    };

    void syncReduceMotionPreference();

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotionEnabled,
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  const setThemeMode = useCallback((nextThemeMode: ThemeContextValue['themeMode']) => {
    setThemeModeState(nextThemeMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((currentMode) => {
      if (currentMode === 'system') {
        return resolvedThemeMode === 'dark' ? 'light' : 'dark';
      }

      return currentMode === 'dark' ? 'light' : 'dark';
    });
  }, [resolvedThemeMode]);

  const theme = useMemo(() => getTheme(resolvedThemeMode), [resolvedThemeMode]);

  const nativeWindVariableStyles = useMemo(() => {
    return vars(getNativeWindVariables(theme));
  }, [theme]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themeMode,
      resolvedThemeMode,
      isDark: theme.isDark,
      reduceMotionEnabled,
      colors: theme.colors,
      spacing: theme.spacing,
      radius: theme.radius,
      typography: theme.typography,
      animation: theme.animation,
      opacity: theme.opacity,
      zIndex: theme.zIndex,
      shadows: theme.shadows,
      elevation: theme.elevation,
      setThemeMode,
      toggleTheme,
    }),
    [
      reduceMotionEnabled,
      resolvedThemeMode,
      setThemeMode,
      theme,
      themeMode,
      toggleTheme,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <View style={[styles.root, nativeWindVariableStyles]}>{children}</View>
    </ThemeContext.Provider>
  );
};
