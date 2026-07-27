import { StyleSheet } from 'react-native';

import type { ThemeContextValue } from '../../types';
import { moderateScale } from '../../utils';

interface CreateDynamicStylesOptions {
  readonly footerBottomOffset: number;
  readonly footerHeight: number;
  readonly galleryCardWidth: number;
  readonly heroHeight: number;
  readonly modalImageWidth: number;
  readonly theme: ThemeContextValue;
}

export const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  fill: {
    flex: 1,
  },
  overviewCollapsed: {
    overflow: 'hidden',
  },
  sectionEmptyCard: {
    minHeight: moderateScale(172),
  },
  sectionEmptyIconContainer: {
    height: moderateScale(56),
    width: moderateScale(56),
  },
});

export const createDynamicStyles = ({
  footerBottomOffset,
  footerHeight,
  galleryCardWidth,
  heroHeight,
  modalImageWidth,
  theme,
}: CreateDynamicStylesOptions) => {
  const { colors, radius, shadows, spacing, typography } = theme;

  return StyleSheet.create({
    actionButtonShadow: {
      ...shadows.sm,
      flex: 1,
    },
    bodyContainer: {
      paddingTop: spacing.xl,
    },
    footerButtonShadow: {
      ...shadows.lg,
    },
    footerContainer: {
      bottom: footerBottomOffset,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    footerSpacer: {
      paddingBottom: footerHeight + footerBottomOffset + spacing.sectionGap,
    },
    galleryCard: {
      aspectRatio: 16 / 9,
      borderRadius: radius.md,
      overflow: 'hidden',
      width: galleryCardWidth,
    },
    galleryModalCloseButton: {
      position: 'absolute',
      right: spacing.containerMarginMobile,
      top: spacing.xl,
      zIndex: 2,
    },
    galleryModalImage: {
      height: '100%',
      width: modalImageWidth,
    },
    galleryModalImagePage: {
      alignItems: 'center',
      justifyContent: 'center',
      width: modalImageWidth,
    },
    galleryModalOverlay: {
      backgroundColor: colors.surfaceLowest,
    },
    hero: {
      height: heroHeight,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
    heroBottomScrim: {
      backgroundColor: colors.background,
      bottom: 0,
      height: heroHeight * 0.54,
      left: 0,
      opacity: theme.isDark ? 0.96 : 0.8,
      position: 'absolute',
      right: 0,
    },
    heroContent: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    heroImage: {
      height: heroHeight,
      width: '100%',
    },
    heroMetadata: {
      color: colors.textSecondary,
      fontFamily: typography.variants.metadata.fontFamily,
      fontSize: typography.variants.metadata.fontSize,
      fontWeight: typography.variants.metadata.fontWeight,
      lineHeight: typography.variants.metadata.lineHeight,
    },
    heroTitle: {
      color: colors.textPrimary,
      fontFamily: typography.variants.displayMobile.fontFamily,
      fontSize: moderateScale(40),
      fontWeight: typography.variants.displayMobile.fontWeight,
      letterSpacing: typography.variants.displayMobile.letterSpacing,
      lineHeight: moderateScale(44),
    },
    heroTopRow: {
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 2,
    },
    heroTopScrim: {
      backgroundColor: colors.overlay,
      height: heroHeight * 0.32,
      left: 0,
      opacity: theme.isDark ? 0.52 : 0.32,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    iconButtonShadow: {
      ...shadows.sm,
      borderRadius: radius.full,
    },
    sectionSurface: {
      borderRadius: radius.md,
    },
    skeletonActionButton: {
      flex: 1,
    },
    skeletonActionRow: {
      width: '100%',
    },
    skeletonFooter: {
      borderRadius: radius.full,
      height: footerHeight,
      width: '100%',
    },
    skeletonGalleryCard: {
      aspectRatio: 16 / 9,
      borderRadius: radius.md,
      width: galleryCardWidth,
    },
    skeletonHero: {
      borderBottomLeftRadius: radius.lg,
      borderBottomRightRadius: radius.lg,
      height: heroHeight,
      width: '100%',
    },
    skeletonMetadataLine: {
      height: moderateScale(18),
    },
    skeletonTitleLine: {
      height: moderateScale(22),
    },
    tabContentContainer: {
      paddingTop: spacing.lg,
    },
    tabIndicator: {
      borderRadius: radius.full,
      bottom: 0,
      height: moderateScale(3),
      left: 0,
      position: 'absolute',
      right: 0,
    },
    tabItem: {
      minHeight: moderateScale(44),
      paddingBottom: spacing.md,
      paddingHorizontal: spacing.md,
      position: 'relative',
    },
    trailerCard: {
      aspectRatio: 16 / 9,
      overflow: 'hidden',
      position: 'relative',
    },
    trailerCardContent: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    trailerImage: {
      height: '100%',
      width: '100%',
    },
    trailerOverlay: {
      backgroundColor: colors.overlay,
      opacity: theme.isDark ? 0.72 : 0.56,
    },
    trailerPlayButton: {
      alignItems: 'center',
      height: moderateScale(56),
      justifyContent: 'center',
      left: spacing.lg,
      position: 'absolute',
      top: spacing.lg,
      zIndex: 1,
      width: moderateScale(56),
    },
  });
};
