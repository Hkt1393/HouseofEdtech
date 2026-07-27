import { StyleSheet, type ViewStyle } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../constants';
import { moderateScale } from '../../utils';

export const styles = StyleSheet.create({
  emptyStateIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  } satisfies ViewStyle,
  emptyStateIconContainer: {
    height: moderateScale(72),
    width: moderateScale(72),
  } satisfies ViewStyle,
  fill: {
    flex: 1,
  } satisfies ViewStyle,
  header: {
    width: '100%',
  } satisfies ViewStyle,
  loadingFooter: {
    width: '100%',
  } satisfies ViewStyle,
  skeletonArtwork: {
    width: moderateScale(COMPONENT_DEFAULTS.media.posterWidth),
  } satisfies ViewStyle,
  skeletonRow: {
    width: '100%',
  } satisfies ViewStyle,
  skeletonTextColumn: {
    flex: 1,
  } satisfies ViewStyle,
  skeletonTextLine: {
    height: moderateScale(16),
  } satisfies ViewStyle,
  skeletonTextLineShort: {
    height: moderateScale(14),
  } satisfies ViewStyle,
});
