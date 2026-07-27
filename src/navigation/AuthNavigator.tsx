import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { APP_STRINGS, ROUTES } from '../constants';
import LoginScreen from '../screens/Login';
import { useTheme } from '../theme';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigatorComponent = () => {
  const { colors, typography } = useTheme();

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerStyle: {
        backgroundColor: colors.navigationBackground,
      },
      headerTintColor: colors.textPrimary,
      headerTitleStyle: {
        fontFamily: typography.variants.title.fontFamily,
        fontSize: typography.variants.title.fontSize,
        fontWeight: typography.variants.title.fontWeight,
        color: colors.textPrimary,
      },
      contentStyle: {
        backgroundColor: colors.background,
      },
    }),
    [colors, typography],
  );

  const loginOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerShown: false,
      title: APP_STRINGS.navigation.login,
    }),
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={screenOptions}
    >
      <Stack.Screen
        component={LoginScreen}
        name={ROUTES.LOGIN}
        options={loginOptions}
      />
    </Stack.Navigator>
  );
};

AuthNavigatorComponent.displayName = 'AuthNavigator';

export const AuthNavigator = memo(AuthNavigatorComponent);
