/**
 * Public props for navigation-oriented reusable components.
 */

import type { ReactNode } from 'react';
import type { AccessibilityState } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

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
  label: string;
  onPress?: () => void;
}

export interface TabBarBackgroundProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
