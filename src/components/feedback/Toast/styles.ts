import { StyleSheet } from 'react-native';

import type { ThemeContextValue } from '../../../types';
import { moderateScale } from '../../../utils';

interface CreateDynamicStylesOptions {
  readonly bottomInset: number;
  readonly theme: ThemeContextValue;
}

export const styles = StyleSheet.create({
  root: {
    left: 0,
    position: 'absolute',
    right: 0,
  },
});

export const createDynamicStyles = ({
  bottomInset,
  theme,
}: CreateDynamicStylesOptions) => {
  const { colors, radius, shadows, spacing, zIndex } = theme;

  return StyleSheet.create({
    card: {
      ...shadows.md,
      backgroundColor: colors.surfaceLowest,
      borderColor: colors.divider,
      borderRadius: radius['2xl'],
      borderWidth: 1,
      overflow: 'hidden',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    content: {
      alignItems: 'flex-start',
      gap: spacing.md,
      justifyContent: 'space-between',
    },
    dismissButton: {
      alignItems: 'center',
      height: moderateScale(32),
      justifyContent: 'center',
      width: moderateScale(32),
    },
    iconBadge: {
      alignItems: 'center',
      borderRadius: radius.full,
      height: moderateScale(40),
      justifyContent: 'center',
      width: moderateScale(40),
    },
    messageWrap: {
      flex: 1,
    },
    viewport: {
      bottom: bottomInset,
      left: spacing.containerMarginMobile,
      position: 'absolute',
      right: spacing.containerMarginMobile,
      zIndex: zIndex.toast,
    },
  });
};
