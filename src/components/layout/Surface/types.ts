/**
 * Public props for the Surface layout primitive.
 */

import type { AppViewProps } from '../../base';

export type SurfaceVariant = 'base' | 'secondary' | 'elevated' | 'overlay';

export interface SurfaceProps extends AppViewProps {
  bordered?: boolean;
  variant?: SurfaceVariant;
}

export interface SurfaceViewProps extends SurfaceProps {}
