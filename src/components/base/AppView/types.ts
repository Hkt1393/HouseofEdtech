/**
 * Public props for the AppView foundation component.
 */

import type { ReactNode } from 'react';
import type {
  Insets,
  PressableProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';

import type {
  InsetProps,
  ThemeColorToken,
  ThemeElevationValue,
  ThemeOpacityValue,
  ThemeRadiusValue,
  ThemeShadowToken,
} from '../shared';

export interface AppViewProps extends Omit<ViewProps, 'style'>, InsetProps {
  alignItems?: ViewStyle['alignItems'];
  androidRippleColorToken?: ThemeColorToken;
  backgroundColorToken?: ThemeColorToken;
  borderColorToken?: ThemeColorToken;
  borderWidth?: number;
  center?: boolean;
  children?: ReactNode;
  column?: boolean;
  disabled?: boolean;
  elevation?: ThemeElevationValue;
  flex?: ViewStyle['flex'] | boolean;
  hitSlop?: Insets | number;
  justifyContent?: ViewStyle['justifyContent'];
  onLongPress?: PressableProps['onLongPress'];
  onPress?: PressableProps['onPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
  opacityValue?: ThemeOpacityValue;
  pressRetentionOffset?: Insets | number;
  pressedOpacityValue?: ThemeOpacityValue;
  radius?: ThemeRadiusValue;
  row?: boolean;
  shadow?: ThemeShadowToken;
  style?: StyleProp<ViewStyle>;
  wrap?: ViewStyle['flexWrap'];
}

export interface AppViewViewProps extends Omit<AppViewProps, 'style'> {
  androidRippleColor?: string;
  isInteractive: boolean;
  pressedStyle?: StyleProp<ViewStyle>;
  resolvedStyle: StyleProp<ViewStyle>;
}
