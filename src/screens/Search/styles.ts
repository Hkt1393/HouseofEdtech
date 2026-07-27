import { StyleSheet } from 'react-native';

import type { ThemeContextValue } from '../../types';
import { moderateScale } from '../../utils';

interface CreateDynamicStylesOptions {
  readonly categoryCardHeight: number;
  readonly recommendedHeroHeight: number;
  readonly sectionGap: number;
  readonly theme: ThemeContextValue;
  readonly talentCardWidth: number;
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
  categoryCardHeight,
  recommendedHeroHeight,
  sectionGap,
  talentCardWidth,
  theme,
}: CreateDynamicStylesOptions) => {
  const { colors, radius, shadows, spacing, typography } = theme;

  return StyleSheet.create({
    brandText: {
      color: colors.primary,
      fontFamily: typography.variants.displayMobile.fontFamily,
      fontSize: moderateScale(28),
      fontWeight: typography.variants.displayMobile.fontWeight,
      letterSpacing: typography.variants.displayMobile.letterSpacing,
      lineHeight: moderateScale(34),
    },
    categoryCard: {
      flex: 1,
      height: categoryCardHeight,
      overflow: 'hidden',
      position: 'relative',
    },
    categoryCardImage: {
      height: '100%',
      width: '100%',
    },
    categoryCardOverlay: {
      backgroundColor: colors.overlay,
      opacity: theme.isDark ? 0.54 : 0.32,
    },
    categoryCardTitle: {
      color: colors.textInverse,
      fontFamily: typography.variants.label.fontFamily,
      fontSize: moderateScale(18),
      fontWeight: typography.variants.label.fontWeight,
      letterSpacing: moderateScale(0.9),
      lineHeight: moderateScale(22),
      textTransform: 'uppercase',
    },
    discoveryContent: {
      paddingBottom: spacing.sectionGap + spacing['4xl'],
      paddingTop: spacing.lg,
    },
    emptyIllustrationContainer: {
      height: moderateScale(56),
      width: moderateScale(56),
    },
    headerBlock: {
      paddingBottom: spacing['2xl'],
      paddingTop: spacing.sm,
    },
    headerIconButton: {
      alignItems: 'center',
      height: moderateScale(40),
      justifyContent: 'center',
      width: moderateScale(40),
    },
    recommendedHero: {
      height: recommendedHeroHeight,
      overflow: 'hidden',
      position: 'relative',
    },
    recommendedHeroBadgeRow: {
      left: spacing.lg,
      position: 'absolute',
      right: spacing.lg,
      top: spacing.lg,
      zIndex: 1,
    },
    recommendedHeroContent: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    recommendedHeroImage: {
      height: recommendedHeroHeight,
      width: '100%',
    },
    recommendedHeroMetadata: {
      color: colors.textInverse,
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: moderateScale(13),
      fontWeight: typography.variants.caption.fontWeight,
      lineHeight: moderateScale(18),
    },
    recommendedHeroOverlay: {
      backgroundColor: colors.overlay,
      opacity: theme.isDark ? 0.64 : 0.4,
    },
    recommendedHeroTitle: {
      color: colors.textInverse,
      fontFamily: typography.variants.title.fontFamily,
      fontSize: moderateScale(22),
      fontWeight: typography.variants.title.fontWeight,
      lineHeight: moderateScale(28),
    },
    resultsDiscoveryFooter: {
      paddingTop: spacing['2xl'],
    },
    resultsContent: {
      paddingBottom: spacing.sectionGap + spacing['4xl'],
      paddingTop: spacing.lg,
    },
    resultsStateView: {
      minHeight: moderateScale(280),
    },
    sectionActionIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    sectionHeaderRow: {
      marginBottom: spacing.md,
    },
    searchInputContainer: {
      backgroundColor: colors.surfaceLow,
      borderColor: colors.divider,
      borderRadius: radius.full,
      borderWidth: StyleSheet.hairlineWidth,
      minHeight: moderateScale(45),
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    searchInputText: {
      fontFamily: typography.variants.bodyLarge.fontFamily,
      fontSize: moderateScale(18),
      fontWeight: typography.variants.bodyLarge.fontWeight,
      lineHeight: moderateScale(24),
    },
    skeletonCategoryCard: {
      flex: 1,
      height: categoryCardHeight,
    },
    skeletonHeroCard: {
      height: recommendedHeroHeight,
      width: '100%',
    },
    skeletonPosterCard: {
      width: moderateScale(144),
    },
    skeletonSearchInput: {
      height: moderateScale(72),
      width: '100%',
    },
    skeletonTalentAvatar: {
      height: moderateScale(72),
      width: moderateScale(72),
    },
    skeletonTalentCard: {
      width: talentCardWidth,
    },
    talentCard: {
      alignItems: 'center',
      width: talentCardWidth,
    },
    talentName: {
      color: colors.textSecondary,
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: moderateScale(13),
      fontWeight: typography.variants.caption.fontWeight,
      lineHeight: moderateScale(18),
      textAlign: 'center',
    },
    tileContent: {
      bottom: spacing.md,
      left: spacing.md,
      position: 'absolute',
      right: spacing.md,
    },
    trendingChipGroup: {
      marginTop: spacing.sm,
    },
    verticalSectionStack: {
      gap: sectionGap,
    },
  });
};
