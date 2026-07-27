import { StyleSheet } from 'react-native';

import type { ThemeContextValue } from '../../types';
import { moderateScale, verticalScale } from '../../utils';

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
  const { colors, elevation, radius, shadows, spacing, typography } = theme;
  const iconButtonSize = moderateScale(spacing['2xl'] + spacing.sm);

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
      backgroundColor: colors.overlay,
      bottom: 0,
      height: heroHeight * 0.62,
      left: 0,
      opacity: theme.isDark ? 0.96 : 0.92,
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
      backgroundColor:colors.black
    },
    heroMetadata: {
      color: colors.white,
      fontFamily: typography.variants.metadata.fontFamily,
      fontSize: typography.variants.metadata.fontSize,
      fontWeight: typography.variants.metadata.fontWeight,
      lineHeight: typography.variants.metadata.lineHeight,
      opacity: theme.isDark ? 0.88 : 0.94,
      textShadowColor: colors.black,
      textShadowOffset: {
        height: moderateScale(2),
        width: 0,
      },
      textShadowRadius: moderateScale(10),
    },
    heroTitle: {
      color: colors.white,
      fontFamily: typography.variants.displayMobile.fontFamily,
      fontSize: moderateScale(40),
      fontWeight: typography.variants.displayMobile.fontWeight,
      letterSpacing: typography.variants.displayMobile.letterSpacing,
      lineHeight: moderateScale(44),
      textShadowColor: colors.black,
      textShadowOffset: {
        height: moderateScale(2),
        width: 0,
      },
      textShadowRadius: moderateScale(12),
    },
    heroTopRow: {
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 2,
    },
    heroTopScrim: {
      backgroundColor: colors.overlay,
      height: heroHeight * 0.3,
      left: 0,
      opacity: theme.isDark ? 0.88 : 0.74,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    iconButton: {
      alignItems: 'center',
      borderRadius: radius.full,
      elevation: elevation.md,
      height: iconButtonSize,
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        height: moderateScale(4),
        width: 0,
      },
      shadowOpacity: theme.isDark ? 0.18 : 0.14,
      shadowRadius: moderateScale(8),
      width: iconButtonSize,
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
      backgroundColor: colors.surfaceLowest,
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
      height: verticalScale(300),
      width: '100%',
      backgroundColor:colors.black,
      borderRadius:moderateScale(25)
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
