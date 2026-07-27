/**
 * Styles for reusable state views.
 */

import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../utils';

export const styles = StyleSheet.create({
  stateIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  stateIconContainer: {
    height: moderateScale(72),
    width: moderateScale(72),
  },
});
