/**
 * Public props for the Stack layout primitive.
 */

import type { AppViewProps } from '../../base';
import type { ThemeSpacingValue } from '../../base/shared';

export interface StackProps extends Omit<AppViewProps, 'gap'> {
  gap?: ThemeSpacingValue;
}

export interface StackViewProps extends StackProps {}
