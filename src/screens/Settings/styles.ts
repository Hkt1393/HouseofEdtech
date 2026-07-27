import { StyleSheet } from 'react-native';

import type { ThemeContextValue } from '../../types';
import { moderateScale } from '../../utils';

export const createDynamicStyles = (theme: ThemeContextValue) => {
  const { colors, typography } = theme;

  return StyleSheet.create({
    copyBlock: {
      alignItems: 'center',
    },
    descriptionText: {
      maxWidth: '92%',
    },
    iconCore: {
      height: moderateScale(88),
      width: moderateScale(88),
    },
    iconHalo: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.isDark ? colors.surfaceHighest : colors.primaryFixed,
      borderColor: theme.isDark ? colors.surfaceBright : colors.divider,
      borderRadius: moderateScale(56),
      borderWidth: 1,
      height: moderateScale(112),
      justifyContent: 'center',
      width: moderateScale(112),
    },
    subtitleText: {
      fontFamily: typography.variants.label.fontFamily,
      fontSize: typography.variants.label.fontSize,
      fontWeight: typography.variants.label.fontWeight,
      lineHeight: typography.variants.label.lineHeight,
      textTransform: 'uppercase',
    },
    surfaceCard: {
      overflow: 'hidden',
    },
    titleText: {
      fontFamily: typography.variants.title.fontFamily,
      fontSize: typography.variants.title.fontSize,
      fontWeight: typography.variants.title.fontWeight,
      lineHeight: typography.variants.title.lineHeight,
    },
  });
};
