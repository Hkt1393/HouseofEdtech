/**
 * Public props for the button component family.
 */

import type { ReactNode } from 'react';
import type { AccessibilityState, StyleProp, ViewStyle } from 'react-native';

import type { ThemeColorToken } from '../../base/shared';

import type { InteractiveAccessibilityProps } from '../shared';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'text'
  | 'icon'
  | 'fab'
  | 'chip'
  | 'segment';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends InteractiveAccessibilityProps {
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'leading' | 'trailing';
  label?: string;
  loading?: boolean;
  onPress?: () => void;
  selected?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export interface IconButtonProps extends Omit<AppButtonProps, 'variant'> {
  accessibilityLabel: string;
}

export interface FloatingActionButtonProps extends IconButtonProps {}

export interface ChipButtonProps extends Omit<AppButtonProps, 'variant'> {}

export interface SegmentButtonProps extends Omit<AppButtonProps, 'variant'> {}

export interface AppButtonViewProps extends AppButtonProps {
  backgroundColorToken: ThemeColorToken;
  borderColorToken?: ThemeColorToken;
  labelColorToken: ThemeColorToken;
  minHeight: number;
  resolvedAccessibilityHint: string;
  resolvedAccessibilityState: AccessibilityState;
  resolvedStyle: StyleProp<ViewStyle>;
  sizeValue: number;
}
