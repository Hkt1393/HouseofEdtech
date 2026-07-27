import { StyleSheet, type ImageStyle, type ViewStyle } from 'react-native';
import { moderateScale } from '../../utils';

export const styles = StyleSheet.create({
  logoImage: {
    height: '100%',
    width: '100%',
    borderRadius:moderateScale(100)
  } satisfies ImageStyle,
});

export const createDynamicStyles = (logoSize: number) =>
  StyleSheet.create({
    logoContainer: {
      height: logoSize,
      width: logoSize,
    } satisfies ViewStyle,
  });
