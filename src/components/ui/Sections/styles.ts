/**
 * Styles for feature-level section components.
 */

import { COMPONENT_DEFAULTS } from '../../../constants';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  action: {
    marginLeft: 'auto',
  },
  castCard: {
    width: COMPONENT_DEFAULTS.media.posterWidth,
  },
  grow: {
    flex: 1,
  },
  titleGroup: {
    flex: 1,
  },
});
