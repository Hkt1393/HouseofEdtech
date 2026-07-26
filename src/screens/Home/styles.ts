import { StyleSheet, type DimensionValue, type ViewStyle } from 'react-native';

import { COMPONENT_DEFAULTS, MEDIA_LAYOUT } from '../../constants';
import type { ThemeColors } from '../../types';
import { moderateScale } from '../../utils';

interface SkeletonStyle extends ViewStyle {
  width?: DimensionValue;
}

export const HOME_FEATURED_RAIL_ITEM_WIDTH = 284;
export const HOME_POSTER_RAIL_ITEM_WIDTH = COMPONENT_DEFAULTS.media.posterWidth;

export const styles = StyleSheet.create({
  actionButton: {
    minHeight: moderateScale(56),
    width: '100%',
  } satisfies ViewStyle,
  actionButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  } satisfies ViewStyle,
  actionSkeleton: {
    height: moderateScale(56),
    width: '100%',
  } satisfies SkeletonStyle,
  categoryChip: {
    minHeight: moderateScale(44),
    paddingHorizontal: moderateScale(20),
  } satisfies ViewStyle,
  fill: {
    flex: 1,
  },
  featuredCard: {
    overflow: 'hidden',
    width: moderateScale(HOME_FEATURED_RAIL_ITEM_WIDTH),
  } satisfies ViewStyle,
  featuredCardContent: {
    paddingTop: moderateScale(12),
  } satisfies ViewStyle,
  featuredCardImage: {
    aspectRatio: MEDIA_LAYOUT.thumbnailAspectRatio,
    width: '100%',
  } satisfies ViewStyle,
  headerAccessorySkeleton: {
    height: moderateScale(40),
    width: moderateScale(40),
  } satisfies ViewStyle,
  headerContent: {
    width: '100%',
  },
  headerTitleSkeleton: {
    height: moderateScale(24),
    width: '38%',
  } satisfies SkeletonStyle,
  listContent: {} satisfies ViewStyle,
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
  } satisfies ViewStyle,
  heroMedia: {
    width: '100%',
  } satisfies ViewStyle,
  heroMetaBadge: {
    minHeight: moderateScale(28),
    paddingHorizontal: moderateScale(14),
  } satisfies ViewStyle,
  heroSurface: {
    overflow: 'hidden',
    width: '100%',
  } satisfies ViewStyle,
  loadMoreFooter: {
    paddingRight: moderateScale(16),
    width: moderateScale(HOME_POSTER_RAIL_ITEM_WIDTH),
  } satisfies ViewStyle,
  menuButton: {
    minHeight: moderateScale(40),
    minWidth: moderateScale(40),
  } satisfies ViewStyle,
  menuIcon: {
    justifyContent: 'center',
  } satisfies ViewStyle,
  menuLine: {
    height: 2,
    width: 18,
  } satisfies ViewStyle,
  menuLineShort: {
    height: 2,
    width: 12,
  } satisfies ViewStyle,
  posterCard: {
    width: moderateScale(HOME_POSTER_RAIL_ITEM_WIDTH),
  } satisfies ViewStyle,
  posterCardImage: {
    aspectRatio: MEDIA_LAYOUT.posterAspectRatio,
    width: '100%',
  } satisfies ViewStyle,
  posterSkeleton: {
    width: moderateScale(HOME_POSTER_RAIL_ITEM_WIDTH),
  } satisfies ViewStyle,
  sectionHeaderAction: {
    height: moderateScale(40),
    width: moderateScale(40),
  } satisfies ViewStyle,
  sectionTitleSkeleton: {
    height: moderateScale(24),
    width: '42%',
  } satisfies SkeletonStyle,
  stateIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  } satisfies ViewStyle,
  stateIconContainer: {
    height: moderateScale(72),
    width: moderateScale(72),
  } satisfies ViewStyle,
});

export const createDynamicStyles = (
  heroHeight: number,
  listBottomPadding: number,
  colors: ThemeColors,
  isDark: boolean,
) =>
  StyleSheet.create({
    categoryChipActive: {
      backgroundColor: isDark ? colors.surfaceHighest : colors.primaryFixed,
      borderColor: isDark ? colors.primaryFixedDim : colors.secondaryContainer,
      borderWidth: 1,
    } satisfies ViewStyle,
    categoryChipInactive: {
      backgroundColor: isDark ? colors.surfaceLow : colors.surfaceLowest,
      borderColor: isDark ? colors.divider : colors.surfaceHigh,
      borderWidth: 1,
    } satisfies ViewStyle,
    categoryChipLabelActive: {
      color: isDark ? colors.primaryFixedDim : colors.primary,
    },
    categoryChipLabelInactive: {
      color: colors.textSecondary,
    },
    featuredCardSurface: {
      backgroundColor: colors.transparent,
    } satisfies ViewStyle,
    featuredMetaText: {
      color: colors.textSecondary,
    },
    featuredTitleText: {
      color: colors.textPrimary,
    },
    heroBadgeSurface: {
      backgroundColor: isDark ? colors.surfaceHigh : colors.primaryFixed,
      borderColor: isDark ? colors.primaryFixedDim : colors.secondaryContainer,
      borderWidth: 1,
    } satisfies ViewStyle,
    heroBadgeText: {
      color: isDark ? colors.primaryFixedDim : colors.primary,
      textTransform: 'uppercase',
    },
    heroMetaText: {
      color: isDark ? colors.textSecondary : colors.textPrimary,
      fontSize: moderateScale(15),
      lineHeight: moderateScale(22),
    },
    heroOverlayBottom: {
      backgroundColor: isDark ? colors.overlay : colors.glassOverlay,
      flex: 1.75,
    } satisfies ViewStyle,
    heroOverlayMiddle: {
      backgroundColor: isDark ? colors.black : colors.surfaceLowest,
      flex: 1.25,
      opacity: isDark ? 0.2 : 0.18,
    } satisfies ViewStyle,
    heroOverlayTop: {
      backgroundColor: isDark ? colors.black : colors.surfaceLowest,
      flex: 1,
      opacity: isDark ? 0.12 : 0.04,
    } satisfies ViewStyle,
    heroPrimaryActionSurface: {
      backgroundColor: colors.primaryContainer,
    } satisfies ViewStyle,
    heroPrimaryActionText: {
      color: colors.white,
    },
    heroSecondaryActionSurface: {
      backgroundColor: isDark ? colors.surfaceLow : colors.surfaceLowest,
      borderColor: isDark ? colors.divider : colors.surfaceHigh,
      borderWidth: 1,
    } satisfies ViewStyle,
    heroSecondaryActionText: {
      color: colors.textPrimary,
    },
    heroSurface: {
      backgroundColor: colors.surfaceLowest,
      height: heroHeight,
    } satisfies ViewStyle,
    heroTitleText: {
      color: isDark ? colors.white : colors.textPrimary,
      fontSize: moderateScale(42),
      fontWeight: '700',
      letterSpacing: -1.2,
      lineHeight: moderateScale(48),
    },
    listContent: {
      paddingBottom: listBottomPadding,
    },
    menuLineFill: {
      backgroundColor: colors.primary,
    } satisfies ViewStyle,
    sectionActionSurface: {
      backgroundColor: colors.transparent,
    } satisfies ViewStyle,
    sectionDescriptionText: {
      color: colors.textSecondary,
    },
    sectionTitleText: {
      color: colors.textPrimary,
    },
    titleText: {
      color: colors.primary,
    },
    posterCardMetaText: {
      color: colors.textSecondary,
    },
    posterCardSurface: {
      backgroundColor: colors.transparent,
    } satisfies ViewStyle,
    posterCardTitleText: {
      color: colors.textPrimary,
    },
  });
