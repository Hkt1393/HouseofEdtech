import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  type KeyboardEventName,
  useWindowDimensions,
} from 'react-native';

import { APP_STRINGS, COMPONENT_DEFAULTS } from '../../../constants';

import { useTheme } from '../../../theme';
import { moderateScale } from '../../../utils';

import { AppIcon } from '../shared';

import {
  BackButtonView,
  BottomTabBarView,
  BottomTabItemView,
  HeaderView,
  SearchBarView,
  TabBarBackgroundView,
} from './view';
import {
  createBottomTabBarBackgroundStyles,
  createBottomTabItemStyles,
  styles,
} from './styles';
import type {
  AppBottomTabBarProps,
  BackButtonProps,
  BottomTabBarProps,
  BottomTabItemProps,
  HeaderProps,
  SearchBarProps,
  TabBarBackgroundProps,
} from './types';

const BackButtonComponent = (props: BackButtonProps) => {
  const { colors } = useTheme();

  const icon = useMemo(
    () => (
      <AppIcon
        color={colors.textPrimary}
        name="arrow-left"
        size={moderateScale(18)}
      />
    ),
    [colors.textPrimary],
  );

  return <BackButtonView icon={icon} {...props} />;
};

BackButtonComponent.displayName = 'BackButton';

const HeaderComponent = ({ leadingAccessory, onBackPress, ...restProps }: HeaderProps) => {
  const resolvedLeadingAccessory = useMemo(
    () => leadingAccessory ?? (onBackPress ? <BackButtonComponent onPress={onBackPress} /> : null),
    [leadingAccessory, onBackPress],
  );

  return <HeaderView leadingAccessory={resolvedLeadingAccessory} {...restProps} />;
};

HeaderComponent.displayName = 'Header';

const SearchBarComponent = (props: SearchBarProps) => {
  const { colors } = useTheme();

  const clearIcon = useMemo(
    () => (
      <AppIcon
        color={colors.iconSecondary}
        name="close"
        size={moderateScale(16)}
      />
    ),
    [colors.iconSecondary],
  );

  const searchIcon = useMemo(
    () => (
      <AppIcon
        color={colors.iconSecondary}
        name="search"
        size={moderateScale(16)}
      />
    ),
    [colors.iconSecondary],
  );

  return <SearchBarView clearIcon={clearIcon} searchIcon={searchIcon} {...props} />;
};

SearchBarComponent.displayName = 'SearchBar';

const BottomTabItemComponent = (props: BottomTabItemProps) => {
  return <BottomTabItemView {...props} />;
};

BottomTabItemComponent.displayName = 'BottomTabItem';

const TabBarBackgroundComponent = (props: TabBarBackgroundProps) => {
  return <TabBarBackgroundView {...props} />;
};

TabBarBackgroundComponent.displayName = 'TabBarBackground';

const resolveBottomTabLabel = (
  candidate: AppBottomTabBarProps['descriptors'][string]['options']['tabBarLabel'],
  fallbackLabel: string,
): string => {
  return typeof candidate === 'string' ? candidate : fallbackLabel;
};

const resolveBottomTabBadgeLabel = (
  badge: AppBottomTabBarProps['descriptors'][string]['options']['tabBarBadge'],
): string | undefined => {
  if (typeof badge === 'string') {
    return badge;
  }

  if (typeof badge === 'number') {
    return String(badge);
  }

  return undefined;
};

const BottomTabBarComponent = ({
  descriptors,
  insets,
  navigation,
  state,
}: AppBottomTabBarProps) => {
  const { width } = useWindowDimensions();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { colors, elevation, isDark, opacity, radius, spacing } = useTheme();

  useEffect(() => {
    const keyboardShowEvent: KeyboardEventName =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const keyboardHideEvent: KeyboardEventName =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showSubscription = Keyboard.addListener(keyboardShowEvent, () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(keyboardHideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const focusedDescriptor = descriptors[state.routes[state.index]?.key];
  const shouldHideOnKeyboard = focusedDescriptor?.options.tabBarHideOnKeyboard ?? false;

  const horizontalInset = useMemo(() => {
    if (width >= 1024) {
      return spacing.containerMarginDesktop;
    }

    if (width >= 768) {
      return spacing.containerMargin;
    }

    return spacing.containerMarginMobile;
  }, [spacing, width]);

  const shellMaxWidth = useMemo(() => {
    const preferredWidth =
      state.routes.length * moderateScale(COMPONENT_DEFAULTS.navigation.tabItemMinWidth) +
      moderateScale(spacing['2xl'] * 4);

    return Math.min(width - horizontalInset * 2, preferredWidth);
  }, [horizontalInset, spacing, state.routes.length, width]);

  const tabBarLayoutProps = useMemo<
    Pick<
      BottomTabBarProps,
      'bottomInset' | 'horizontalInset' | 'maxWidth' | 'shellStyle' | 'style'
    >
  >(
    () => {
      const shadowOpacity = opacity.medium;
      const backgroundStyles = createBottomTabBarBackgroundStyles({
        backgroundColor: isDark ? colors.surfaceLow : colors.card,
        borderColor: isDark ? colors.divider : colors.surfaceHigh,
        borderWidth: StyleSheet.hairlineWidth,
        bottomInset: insets.bottom + spacing.sm,
        elevation: elevation.xl,
        horizontalInset,
        maxWidth: shellMaxWidth,
        paddingHorizontal: spacing.unit,
        paddingVertical: spacing.sm,
        radius: radius.full,
        shadowColor: isDark ? colors.black : colors.shadow,
        shadowOffsetY: moderateScale(spacing.sm),
        shadowOpacity,
        shadowRadius: moderateScale(spacing['3xl']),
        topInset: spacing.xs,
        
      });

      return {
        bottomInset: insets.bottom + spacing.sm,
        horizontalInset,
        maxWidth: shellMaxWidth,
        shellStyle: [styles.floatingTabBarShell, backgroundStyles.shell],
        style: [styles.floatingTabBarWrapper, backgroundStyles.wrapper],
      };
    },
    [
      colors.black,
      colors.card,
      colors.divider,
      colors.shadow,
      colors.surfaceHigh,
      colors.surfaceLow,
      elevation.xl,
      horizontalInset,
      insets.bottom,
      isDark,
      opacity.medium,
      radius.full,
      shellMaxWidth,
      spacing,
    ],
  );

  const items = useMemo<BottomTabItemProps[]>(() => {
    return state.routes.map((route, index) => {
      const descriptor = descriptors[route.key];
      const { options } = descriptor;
      const focused = state.index === index;
      const fallbackLabel =
        typeof options.title === 'string' ? options.title : route.name;
      const label = resolveBottomTabLabel(options.tabBarLabel, fallbackLabel);
      const activeBackgroundColor = isDark ? colors.surfaceHighest : colors.primaryFixed;
      const activeIconColor = isDark ? colors.white : colors.primary;
      const activeIndicatorColor = isDark
        ? colors.primaryFixedDim
        : colors.primary;
      const iconColor = focused
        ? options.tabBarActiveTintColor ?? activeIconColor
        : options.tabBarInactiveTintColor ?? colors.iconSecondary;
      const itemStyles = createBottomTabItemStyles({
        active: focused,
        activeIndicatorColor,
        activeIndicatorSize: moderateScale(spacing.unit),
        backgroundColor: focused ? activeBackgroundColor : colors.transparent,
        contentOpacity: focused ? opacity.opaque : opacity.glass,
        iconContainerSize: moderateScale(spacing['2xl'] + spacing.unit),
        labelColor: focused ? activeIconColor : colors.textTertiary,
        labelSpacing: spacing.unit,
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.none,
      });

      return {
        accessibilityHint: APP_STRINGS.components.navigation.bottomTabAccessibilityHint,
        accessibilityLabel: options.tabBarAccessibilityLabel ?? label,
        accessibilityState: {
          selected: focused,
        },
        active: focused,
        badgeLabel: resolveBottomTabBadgeLabel(options.tabBarBadge),
        icon: options.tabBarIcon?.({
          color: iconColor,
          focused,
          size: moderateScale(COMPONENT_DEFAULTS.button.iconSizemd),
        }),
        iconContainerStyle: itemStyles.iconContainer,
        indicatorStyle: itemStyles.indicator,
        label,
        labelStyle: itemStyles.label,
        onLongPress: () => {
          navigation.emit({
            target: route.key,
            type: 'tabLongPress',
          });
        },
        onPress: () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress',
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        },
        pressableStyle: itemStyles.pressable,
        showActiveIndicator: false,
        showLabel: true,
        testID: options.tabBarButtonTestID,
      };
    });
  }, [
    colors.iconSecondary,
    colors.primary,
    colors.primaryFixed,
    colors.primaryFixedDim,
    colors.surfaceHighest,
    colors.textTertiary,
    colors.transparent,
    colors.white,
    descriptors,
    isDark,
    navigation,
    opacity.glass,
    opacity.opaque,
    spacing,
    state.index,
    state.routes,
  ]);

  if (shouldHideOnKeyboard && keyboardVisible) {
    return null;
  }

  return <BottomTabBarView {...tabBarLayoutProps} items={items} />;
};

BottomTabBarComponent.displayName = 'BottomTabBar';

export const BackButton = memo(BackButtonComponent);
export const Header = memo(HeaderComponent);
export const SearchBar = memo(SearchBarComponent);
export const BottomTabItem = memo(BottomTabItemComponent);
export const TabBarBackground = memo(TabBarBackgroundComponent);
export const BottomTabBar = memo(BottomTabBarComponent);
