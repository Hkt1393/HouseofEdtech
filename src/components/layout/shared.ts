/**
 * Shared helpers for layout primitives.
 */

import type { StyleProp, ViewStyle } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';

import { COMPONENT_DEFAULTS } from '../../constants';
import type { ThemeSpacingValue } from '../base/shared';

export type SafeAreaEdge = 'top' | 'right' | 'bottom' | 'left';

export const DEFAULT_SAFE_AREA_EDGES = ['top', 'bottom'] as const satisfies ReadonlyArray<SafeAreaEdge>;

export const DEFAULT_CONTAINER_PADDING: ThemeSpacingValue = 'containerMarginMobile';

export const DEFAULT_MAX_CONTENT_WIDTH = COMPONENT_DEFAULTS.layout.maxContentWidth;

/**
 * Builds additive safe-area spacing styles for the requested edges.
 */
export const createSafeAreaStyle = (
  insets: EdgeInsets,
  edges: ReadonlyArray<SafeAreaEdge>,
  mode: 'padding' | 'margin',
): StyleProp<ViewStyle> => {
  const style: ViewStyle = {};

  if (edges.includes('top')) {
    style[mode === 'padding' ? 'paddingTop' : 'marginTop'] = insets.top;
  }

  if (edges.includes('right')) {
    style[mode === 'padding' ? 'paddingRight' : 'marginRight'] = insets.right;
  }

  if (edges.includes('bottom')) {
    style[mode === 'padding' ? 'paddingBottom' : 'marginBottom'] = insets.bottom;
  }

  if (edges.includes('left')) {
    style[mode === 'padding' ? 'paddingLeft' : 'marginLeft'] = insets.left;
  }

  return style;
};
