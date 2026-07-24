/**
 * Internal props for the shared media-row card primitive.
 */

import type { ReactNode } from 'react';

import type { InteractiveAccessibilityProps } from '../../shared';

export interface BaseMediaRowProps extends InteractiveAccessibilityProps {
  content: ReactNode;
  media: ReactNode;
  onPress?: () => void;
  trailingAccessory?: ReactNode;
}

export interface BaseMediaRowViewProps extends BaseMediaRowProps {}
