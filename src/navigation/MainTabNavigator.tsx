import React, { memo, useCallback, useMemo } from 'react';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { APP_STRINGS, ROUTES } from '../constants';
import DownloadsScreen from '../screens/Downloads';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SearchScreen from '../screens/Search';
import { useTheme } from '../theme';
import { moderateScale } from '../utils';

import type {
  MainTabParamList,
  MainTabRouteName,
  MainTabRouteProp,
} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const styles = StyleSheet.create({
  tabBarLabel: {
    textAlign: 'center',
  },
});

interface TabBarIconProps {
  color: string;
  focused: boolean;
  routeName: MainTabRouteName;
  size: number;
}

const TabBarIcon = memo(
  ({ color, focused, routeName, size }: TabBarIconProps) => {
    const strokeWidth = focused ? 2 : 1.75;

    switch (routeName) {
      case ROUTES.HOME:
        return (
          <Svg
            accessibilityElementsHidden
            focusable={false}
            fill="none"
            height={size}
            viewBox="0 0 24 24"
            width={size}
          >
            <Path
              d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
            />
          </Svg>
        );
      case ROUTES.SEARCH:
        return (
          <Svg
            accessibilityElementsHidden
            focusable={false}
            fill="none"
            height={size}
            viewBox="0 0 24 24"
            width={size}
          >
            <Circle
              cx="11"
              cy="11"
              r="6.5"
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <Line
              stroke={color}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              x1="16.2"
              x2="20"
              y1="16.2"
              y2="20"
            />
          </Svg>
        );
      case ROUTES.DOWNLOADS:
        return (
          <Svg
            accessibilityElementsHidden
            focusable={false}
            fill="none"
            height={size}
            viewBox="0 0 24 24"
            width={size}
          >
            <Path
              d="M12 4v10"
              stroke={color}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
            <Path
              d="m8.5 11.5 3.5 3.5 3.5-3.5"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
            />
            <Rect
              height="2.5"
              rx="1.25"
              stroke={color}
              strokeWidth={strokeWidth}
              width="13"
              x="5.5"
              y="17.5"
            />
          </Svg>
        );
      case ROUTES.PROFILE:
        return (
          <Svg
            accessibilityElementsHidden
            focusable={false}
            fill="none"
            height={size}
            viewBox="0 0 24 24"
            width={size}
          >
            <Circle
              cx="12"
              cy="8"
              r="3.25"
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <Path
              d="M5 19a7 7 0 0 1 14 0"
              stroke={color}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
          </Svg>
        );
      default:
        return null;
    }
  },
);

TabBarIcon.displayName = 'TabBarIcon';

const MainTabNavigatorComponent = () => {
  const insets = useSafeAreaInsets();
  const { colors, radius, shadows, spacing, typography } = useTheme();

  const routeLabels = useMemo<Record<MainTabRouteName, string>>(
    () => ({
      [ROUTES.HOME]: APP_STRINGS.navigation.home,
      [ROUTES.SEARCH]: APP_STRINGS.navigation.search,
      [ROUTES.DOWNLOADS]: APP_STRINGS.navigation.downloads,
      [ROUTES.PROFILE]: APP_STRINGS.navigation.profile,
    }),
    [],
  );

  const tabBarStyle = useMemo<BottomTabNavigationOptions['tabBarStyle']>(
    () => ({
      backgroundColor: colors.navigationBackground,
      borderTopColor: colors.divider,
      borderTopWidth: StyleSheet.hairlineWidth,
      height: moderateScale(spacing['4xl'] + spacing.lg) + insets.bottom,
      paddingBottom: Math.max(insets.bottom, spacing.xs),
      paddingTop: spacing.xs,
      ...shadows.sm,
    }),
    [colors, insets.bottom, shadows, spacing],
  );

  const screenOptions = useCallback(
    ({
      route,
    }: {
      route: MainTabRouteProp<MainTabRouteName>;
    }): BottomTabNavigationOptions => ({
      headerShown: false,
      sceneStyle: {
        backgroundColor: colors.background,
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.iconSecondary,
      tabBarHideOnKeyboard: true,
      tabBarStyle,
      tabBarLabel: routeLabels[route.name],
      tabBarLabelStyle: {
        ...styles.tabBarLabel,
        fontFamily: typography.variants.caption.fontFamily,
        fontSize: typography.variants.caption.fontSize,
        fontWeight: typography.variants.caption.fontWeight,
        lineHeight: typography.variants.caption.lineHeight,
        marginTop: spacing.unit,
      },
      tabBarItemStyle: {
        borderRadius: radius.full,
        paddingVertical: spacing.unit,
      },
      tabBarIcon: ({ color, focused, size }) => (
        <TabBarIcon
          color={color}
          focused={focused}
          routeName={route.name}
          size={moderateScale(size)}
        />
      ),
    }),
    [colors, radius, routeLabels, spacing, tabBarStyle, typography],
  );

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={screenOptions}
    >
      <Tab.Screen component={HomeScreen} name={ROUTES.HOME} />
      <Tab.Screen component={SearchScreen} name={ROUTES.SEARCH} />
      <Tab.Screen component={DownloadsScreen} name={ROUTES.DOWNLOADS} />
      <Tab.Screen component={ProfileScreen} name={ROUTES.PROFILE} />
    </Tab.Navigator>
  );
};

MainTabNavigatorComponent.displayName = 'MainTabNavigator';

export const MainTabNavigator = memo(MainTabNavigatorComponent);
