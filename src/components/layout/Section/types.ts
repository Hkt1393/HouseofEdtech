/**
 * Public props for the Section layout primitive.
 */

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppViewProps } from '../../base';

export interface SectionProps extends Omit<AppViewProps, 'style'> {
  actionLabel?: string;
  footer?: ReactNode;
  headerAccessory?: ReactNode;
  style?: StyleProp<ViewStyle>;
  subtitle?: string;
  title?: string;
  onActionPress?: () => void;
}

export interface SectionViewProps extends SectionProps {
  resolvedHeaderStyle: StyleProp<ViewStyle>;
  resolvedStyle: StyleProp<ViewStyle>;
}
