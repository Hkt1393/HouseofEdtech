/**
 * Styles for shared content primitives.
 */

import { StyleSheet, type DimensionValue } from 'react-native';

import { COMPONENT_DEFAULTS, MEDIA_LAYOUT } from '../../../constants';
import { spacing } from '../../../theme';
import { moderateScale } from '../../../utils';

export const styles = StyleSheet.create({
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  progressLabel: {
    minWidth: moderateScale(COMPONENT_DEFAULTS.media.progressLabelMinWidth),
    textAlign: 'right',
  },
  statValue: {
    letterSpacing: 0,
  },
});

export const createSquareStyles = (size: number) =>
  StyleSheet.create({
    root: {
      height: size,
      width: size,
    },
  });

export const createPosterStyles = (width: number) =>
  StyleSheet.create({
    badge: {
      left: moderateScale(spacing.sm),
      position: 'absolute',
      top: moderateScale(spacing.sm),
    },
    image: {
      aspectRatio: MEDIA_LAYOUT.posterAspectRatio,
      width,
    },
    wrapper: {
      width,
    },
  });

export const createThumbnailStyles = (width: number) =>
  StyleSheet.create({
    badge: {
      bottom: moderateScale(spacing.sm),
      position: 'absolute',
      right: moderateScale(spacing.sm),
    },
    image: {
      aspectRatio: MEDIA_LAYOUT.thumbnailAspectRatio,
      width,
    },
    wrapper: {
      width,
    },
  });

export const createProgressStyles = (
  height: number,
  fillWidth: DimensionValue,
) =>
  StyleSheet.create({
    fill: {
      height,
      width: fillWidth,
    },
    track: {
      height,
      overflow: 'hidden',
    },
  });
