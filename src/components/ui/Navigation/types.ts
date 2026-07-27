/**
 * Public props for navigation-oriented reusable components.
 */

import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ReactNode } from 'react';
import type { AccessibilityState } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { AppTextInputProps } from '../../base';

export interface BackButtonProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  onPress?: () => void;
}

export interface HeaderProps {
  leadingAccessory?: ReactNode;
  onBackPress?: () => void;
  subtitle?: string;
  title: string;
  trailingAccessory?: ReactNode;
}

export interface SearchBarProps
  extends Omit<
    AppTextInputProps,
    'leadingIcon' | 'placeholder' | 'trailingIcon' | 'trailingIconPressable'
  > {
  onClear?: () => void;
}

export interface BottomTabItemProps {
  accessibilityHint?: string;
  active?: boolean;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  badgeLabel?: string;
  icon: ReactNode;
  iconContainerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  onLongPress?: () => void;
  onPress?: () => void;
  pressableStyle?: StyleProp<ViewStyle>;
  showActiveIndicator?: boolean;
  showLabel?: boolean;
  testID?: string;
}

export interface BottomTabBarProps {
  bottomInset?: number;
  horizontalInset?: number;
  items: ReadonlyArray<BottomTabItemProps>;
  maxWidth?: number;
  shellStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export interface TabBarBackgroundProps {
  bottomInset?: number;
  children?: ReactNode;
  horizontalInset?: number;
  maxWidth?: number;
  shellStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export type AppBottomTabBarProps = ReactNavigationBottomTabBarProps;
