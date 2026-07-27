/**
 * Styles for navigation-oriented reusable components.
 */

import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

export const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  floatingTabBarContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  floatingTabBarShell: {
    alignSelf: 'center',
    width: '100%',
  },
  floatingTabBarWrapper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
  tabItemIndicator: {
    alignSelf: 'center',
  },
  tabItemLabel: {
    textAlign: 'center',
    fontWeight:'bold'
  },
  tabItemPressable: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minWidth: moderateScale(COMPONENT_DEFAULTS.navigation.tabItemMinWidth),
  },
  tabItemSurface: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: moderateScale(COMPONENT_DEFAULTS.navigation.tabItemMinWidth),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabItem: {
    minWidth: moderateScale(COMPONENT_DEFAULTS.navigation.tabItemMinWidth),
  },
});

interface BottomTabBarBackgroundStyleOptions {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  bottomInset: number;
  elevation: number;
  horizontalInset: number;
  maxWidth?: number;
  paddingHorizontal: number;
  paddingVertical: number;
  radius: number;
  shadowColor: string;
  shadowOffsetY: number;
  shadowOpacity: number;
  shadowRadius: number;
  topInset: number;
}

interface BottomTabItemStyleOptions {
  active: boolean;
  activeIndicatorColor: string;
  activeIndicatorSize: number;
  backgroundColor: string;
  contentOpacity: number;
  iconContainerSize: number;
  labelColor: string;
  labelSpacing: number;
  paddingHorizontal: number;
  paddingVertical: number;
}

export const createBottomTabBarBackgroundStyles = ({
  backgroundColor,
  borderColor,
  borderWidth,
  bottomInset,
  elevation,
  horizontalInset,
  maxWidth,
  paddingHorizontal,
  paddingVertical,
  radius,
  shadowColor,
  shadowOffsetY,
  shadowOpacity,
  shadowRadius,
  topInset,
}: BottomTabBarBackgroundStyleOptions): {
  shell: ViewStyle;
  wrapper: ViewStyle;
} =>
  StyleSheet.create({
    shell: {
      backgroundColor,
      borderColor,
      borderRadius: radius,
      borderWidth,
      elevation,
      maxWidth,
      paddingHorizontal,
      paddingVertical,
      shadowColor,
      shadowOffset: {
        height: shadowOffsetY,
        width: 0,
      },
      shadowOpacity,
      shadowRadius,
    },
    wrapper: {
      bottom: 0,
      left: 0,
      paddingBottom: bottomInset,
      paddingHorizontal: horizontalInset,
      paddingTop: topInset,
      position: 'absolute',
      right: 0,
    },
  });

export const createBottomTabItemStyles = ({
  active,
  activeIndicatorColor,
  activeIndicatorSize,
  backgroundColor,
  contentOpacity,
  iconContainerSize,
  labelColor,
  labelSpacing,
  paddingHorizontal,
  paddingVertical,
}: BottomTabItemStyleOptions): {
  iconContainer: ViewStyle;
  indicator: ViewStyle;
  label: TextStyle;
  pressable: ViewStyle;
} =>
  StyleSheet.create({
    iconContainer: {
      backgroundColor,
      borderRadius: iconContainerSize / 2,
      height: iconContainerSize,
      width: iconContainerSize,
    },
    indicator: {
      backgroundColor: activeIndicatorColor,
      borderRadius: activeIndicatorSize / 2,
      height: activeIndicatorSize,
      marginTop: active ? labelSpacing : 0,
      width: activeIndicatorSize,
    },
    label: {
      color: labelColor,
      marginTop: labelSpacing,
    },
    pressable: {
      opacity: contentOpacity,
      paddingHorizontal,
      paddingVertical,
    },
  });
