import { StyleSheet } from 'react-native';

import type { ThemeContextValue } from '../../../types';
import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

interface CreateDynamicStylesOptions {
  readonly theme: ThemeContextValue;
}

export const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  fill: {
    flex: 1,
  },
});

export const createDynamicStyles = ({
  theme,
}: CreateDynamicStylesOptions) => {
  const { colors, radius, shadows, spacing } = theme;

  return StyleSheet.create({
    content: {
      maxWidth: moderateScale(360),
      width: '100%',
    },
    descriptionText: {
      maxWidth: moderateScale(320),
    },
    illustrationCard: {
      ...shadows.sm,
      alignItems: 'center',
      aspectRatio: 1.04,
      backgroundColor: colors.surfaceLow,
      borderColor: colors.divider,
      borderRadius: radius['3xl'],
      borderWidth: 1,
      justifyContent: 'center',
      maxWidth: moderateScale(320),
      overflow: 'hidden',
      padding: spacing.xl,
      width: '100%',
    },
    illustrationFrame: {
      aspectRatio: 1,
      maxWidth: moderateScale(228),
      width: '100%',
    },
    retryButton: {
      ...shadows.sm,
      minHeight: moderateScale(COMPONENT_DEFAULTS.button.minHeightMd),
      width: '100%',
    },
  });
};
