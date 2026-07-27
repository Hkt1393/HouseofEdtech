import { StyleSheet } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../constants';
import type { ThemeContextValue } from '../../types';
import { moderateScale, verticalScale } from '../../utils';

interface CreateDynamicStylesOptions {
  readonly contentBottomInset: number;
  readonly theme: ThemeContextValue;
}

export const COMPACT_THEME_TOGGLE = {
  thumbOffset: moderateScale(44),
} as const;

export const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  fill: {
    flex: 1,
  },
});

export const createDynamicStyles = ({
  contentBottomInset,
  theme,
}: CreateDynamicStylesOptions) => {
  const { colors, elevation, radius, shadows, spacing, typography } = theme;
  const largeAvatarSize = moderateScale(COMPONENT_DEFAULTS.media.avatarSize2xl);
  const cardShadow = theme.isDark
    ? {
        elevation: elevation.md,
        shadowColor: colors.black,
        shadowOffset: {
          height: moderateScale(10),
          width: 0,
        },
        shadowOpacity: 0.24,
        shadowRadius: moderateScale(24),
      }
    : shadows.sm;
  const premiumCardShadow = theme.isDark
    ? {
        elevation: elevation.lg,
        shadowColor: colors.black,
        shadowOffset: {
          height: moderateScale(14),
          width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: moderateScale(32),
      }
    : shadows.md;
  const settingsCardShadow = theme.isDark
    ? {
        elevation: elevation.sm,
        shadowColor: colors.black,
        shadowOffset: {
          height: moderateScale(6),
          width: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: moderateScale(18),
      }
    : shadows.xs;

  return StyleSheet.create({
    footerText: {
      color: colors.textTertiary,
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: typography.variants.caption.fontSize,
      fontWeight: typography.variants.caption.fontWeight,
      letterSpacing: moderateScale(0.72),
      lineHeight: typography.variants.caption.lineHeight,
      opacity: theme.isDark ? 0.78 : 0.68,
      paddingTop: spacing.sm,
      textAlign: 'center',
    },
    headerAvatarFrame: {
      alignItems: 'center',
      borderColor: colors.primaryFixedDim,
      borderRadius: moderateScale(24),
      borderWidth: moderateScale(2),
      height: moderateScale(48),
      justifyContent: 'center',
      overflow: 'hidden',
      width: moderateScale(48),
    },
    headerRow: {
      minHeight: moderateScale(52),
    },
    headerSkeletonAvatar: {
      borderRadius: moderateScale(24),
      height: moderateScale(48),
      width: moderateScale(48),
    },
    headerSkeletonButton: {
      borderRadius: moderateScale(22),
      height: moderateScale(44),
      width: moderateScale(44),
    },
    headerTitleText: {
      color: theme.isDark ? colors.primaryFixedDim : colors.primary,
      fontFamily: typography.variants.displayMobile.fontFamily,
      fontSize: moderateScale(30),
      fontWeight: typography.variants.displayMobile.fontWeight,
      letterSpacing: typography.variants.displayMobile.letterSpacing,
      lineHeight: moderateScale(34),
    },
    logoutButton: {
      ...cardShadow,
      minHeight: moderateScale(60),
    },
    logoutButtonText: {
      color: colors.error,
      fontFamily: typography.variants.label.fontFamily,
      fontSize: moderateScale(20),
      fontWeight: typography.variants.label.fontWeight,
      lineHeight: moderateScale(25),
    },
    manageButton: {
      minHeight: moderateScale(52),
      minWidth: moderateScale(112),
      paddingHorizontal: spacing.xl,
    },
    manageButtonText: {
      color: theme.isDark ? colors.onPrimaryFixed : colors.textPrimary,
      fontFamily: typography.variants.label.fontFamily,
      fontSize: typography.variants.label.fontSize,
      fontWeight: typography.variants.label.fontWeight,
      lineHeight: typography.variants.label.lineHeight,
    },
    membershipCard: {
      ...premiumCardShadow,
      minHeight: moderateScale(192),
      overflow: 'hidden',
      position: 'relative',
    },
    membershipCopyColumn: {
      flexShrink: 1,
      maxWidth: '72%',
    },
    membershipDescriptionText: {
      fontFamily: typography.variants.body.fontFamily,
      fontSize: typography.variants.body.fontSize,
      fontWeight: typography.variants.body.fontWeight,
      lineHeight: typography.variants.body.lineHeight,
      opacity: 0.94,
    },
    membershipIconWrap: {
      alignItems: 'center',
      backgroundColor: colors.glassOverlay,
      borderRadius: moderateScale(radius.md),
      height: moderateScale(56),
      justifyContent: 'center',
      width: moderateScale(56),
    },
    membershipRenewalText: {
      color: colors.white,
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: typography.variants.caption.fontSize,
      fontWeight: typography.variants.caption.fontWeight,
      letterSpacing: moderateScale(0.84),
      lineHeight: typography.variants.caption.lineHeight,
      maxWidth: '56%',
      opacity: 0.8,
      textTransform: 'uppercase',
    },
    membershipTitleText: {
      fontFamily: typography.variants.subtitle.fontFamily,
      fontSize: typography.variants.subtitle.fontSize,
      fontWeight: typography.variants.subtitle.fontWeight,
      lineHeight: typography.variants.subtitle.lineHeight,
    },
    menuButton: {
      alignItems: 'center',
      borderRadius: moderateScale(22),
      height: moderateScale(44),
      justifyContent: 'center',
      width: moderateScale(44),
    },
    profileAvatarRing: {
      alignSelf: 'center',
      borderColor: colors.primaryFixedDim,
      borderRadius: moderateScale((largeAvatarSize + spacing.xs * 2) / 2),
      borderWidth: moderateScale(4),
      padding: spacing.xs,
    },
    profileBadgeWrap: {
      alignSelf: 'center',
      marginTop: -spacing.md,
    },
    profileEmailText: {
      color: colors.textSecondary,
      fontFamily: typography.variants.body.fontFamily,
      fontSize: typography.variants.body.fontSize,
      fontWeight: typography.variants.body.fontWeight,
      lineHeight: typography.variants.body.lineHeight,
      opacity: 0.92,
    },
    profileNameText: {
      color: colors.textPrimary,
      fontFamily: typography.variants.subtitle.fontFamily,
      fontSize: typography.variants.subtitle.fontSize,
      fontWeight: typography.variants.subtitle.fontWeight,
      lineHeight: typography.variants.subtitle.lineHeight,
    },
    profilePlanPill: {
      minHeight: moderateScale(32),
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    profilePlanPillText: {
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: typography.variants.caption.fontSize,
      fontWeight: typography.variants.caption.fontWeight,
      letterSpacing: moderateScale(0.8),
      lineHeight: typography.variants.caption.lineHeight,
      textTransform: 'uppercase',
    },
    profileSection: {
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    },
    profileSkeletonAvatar: {
      borderRadius: moderateScale((largeAvatarSize + spacing.xs * 2) / 2),
      height: largeAvatarSize + spacing.xs * 2 + moderateScale(8),
      width: largeAvatarSize + spacing.xs * 2 + moderateScale(8),
    },
    profileSkeletonSection: {
      alignItems: 'center',
    },
    profileTextWrap: {
      alignItems: 'center',
    },
    screenContent: {
      paddingBottom: contentBottomInset + spacing.lg,
      paddingTop: spacing.xl,
    },
    sectionCard: {
      ...cardShadow,
      overflow: 'hidden',
    },
    settingsChevronWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: moderateScale(18),
    },
    settingsCopyWrap: {
      flexShrink: 1,
    },
    settingsDivider: {
      height: 1,
      marginLeft: spacing['4xl'] + spacing.xs,
      width: '100%',
    },
    settingsGroupCard: {
      ...settingsCardShadow,
      overflow: 'hidden',
    },
    settingsGroupLabel: {
      color: colors.textTertiary,
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: typography.variants.caption.fontSize,
      fontWeight: typography.variants.caption.fontWeight,
      letterSpacing: moderateScale(1.04),
      lineHeight: typography.variants.caption.lineHeight,
      opacity: theme.isDark ? 0.84 : 0.72,
      paddingLeft: spacing.xs,
      textTransform: 'uppercase',
    },
    settingsIconContainer: {
      height: moderateScale(40),
      width: moderateScale(40),
    },
    settingsRow: {
      minHeight: moderateScale(56),
      paddingVertical: spacing.xs,
    
    },
    settingsSubtitleText: {
      color: colors.textSecondary,
      fontFamily: typography.variants.caption.fontFamily,
      fontSize: moderateScale(13),
      fontWeight: typography.variants.caption.fontWeight,
      lineHeight: moderateScale(18),
      opacity: theme.isDark ? 0.76 : 0.84,
    },
    settingsTitleText: {
      color: colors.textPrimary,
      fontFamily: typography.variants.label.fontFamily,
      fontSize: moderateScale(16),
      fontWeight: typography.variants.label.fontWeight,
      lineHeight: moderateScale(20),
    },
    settingsTrailingWrap: {
      alignItems: 'center',
      flexShrink: 0,
    },
    settingsValueText: {
      color: theme.isDark ? colors.primaryFixedDim : colors.primary,
      fontFamily: typography.variants.label.fontFamily,
      fontSize: moderateScale(14),
      fontWeight: typography.variants.label.fontWeight,
      lineHeight: moderateScale(18),
    },
    skeletonCard: {
      ...cardShadow,
    },
    stateContainer: {
      minHeight: moderateScale(560),
      width: '100%',
    },
    themeToggleSegment: {
      alignItems: 'center',
      borderRadius: moderateScale(radius.full),
      height: '100%',
      justifyContent: 'center',
      width: moderateScale(42),
    },
    themeToggleSegments: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'space-between',
      paddingVertical: moderateScale(3),
      width: '100%',
    },
    themeToggleThumb: {
      backgroundColor: theme.isDark ? colors.primaryFixedDim : colors.surfaceLowest,
      borderRadius: moderateScale(radius.full),
      bottom: moderateScale(3),
      left: moderateScale(3),
      position: 'absolute',
      top: moderateScale(3),
      width: moderateScale(42),
      ...(theme.isDark
        ? {
            elevation: elevation.xs,
            shadowColor: colors.black,
            shadowOffset: {
              height: moderateScale(2),
              width: 0,
            },
            shadowOpacity: 0.22,
            shadowRadius: moderateScale(6),
          }
        : shadows.xs),
    },
    themeToggleTrack: {
      backgroundColor: theme.isDark ? colors.surfaceHighest : colors.surfaceSecondary,
      borderColor: colors.divider,
      borderRadius: moderateScale(radius.full),
      borderWidth: 1,
      height: moderateScale(36),
      overflow: 'hidden',
      paddingHorizontal: moderateScale(3),
      position: 'relative',
      width: moderateScale(92),
    },
  });
};
