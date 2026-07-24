import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { APP_STRINGS, ROUTES } from '../constants';
import DetailsScreen from '../screens/Details';
import SettingsScreen from '../screens/Settings';
import SplashScreen from '../screens/Splash';
import { useTheme } from '../theme';

import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigatorComponent = () => {
  const { colors, typography } = useTheme();

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerStyle: {
        backgroundColor: colors.navigationBackground,
      },
      headerTintColor: colors.textPrimary,
      headerTitleStyle: {
        color: colors.textPrimary,
        fontFamily: typography.variants.title.fontFamily,
        fontSize: typography.variants.title.fontSize,
        fontWeight: typography.variants.title.fontWeight,
        lineHeight: typography.variants.title.lineHeight,
      },
      contentStyle: {
        backgroundColor: colors.background,
      },
    }),
    [colors, typography],
  );

  const hiddenScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerShown: false,
    }),
    [],
  );

  const detailsOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      title: APP_STRINGS.navigation.movieDetails,
    }),
    [],
  );

  const settingsOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      title: APP_STRINGS.navigation.settings,
    }),
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASH}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        component={SplashScreen}
        name={ROUTES.SPLASH}
        options={hiddenScreenOptions}
      />
      <Stack.Screen
        component={AuthNavigator}
        name={ROUTES.AUTH}
        options={hiddenScreenOptions}
      />
      <Stack.Screen
        component={MainTabNavigator}
        name={ROUTES.MAIN_TABS}
        options={hiddenScreenOptions}
      />
      <Stack.Screen
        component={DetailsScreen}
        name={ROUTES.MOVIE_DETAILS}
        options={detailsOptions}
      />
      <Stack.Screen
        component={SettingsScreen}
        name={ROUTES.SETTINGS}
        options={settingsOptions}
      />
    </Stack.Navigator>
  );
};

RootStackNavigatorComponent.displayName = 'RootStackNavigator';

export const RootStackNavigator = memo(RootStackNavigatorComponent);
