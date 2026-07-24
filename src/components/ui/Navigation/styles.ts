/**
 * Styles for navigation-oriented reusable components.
 */

import { StyleSheet } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

export const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  tabItem: {
    minWidth: moderateScale(COMPONENT_DEFAULTS.navigation.tabItemMinWidth),
  },
});
