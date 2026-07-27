import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';

import type { AppImageSource } from '../../components/base';
import { APP_CONFIG, APP_STRINGS, COMPONENT_DEFAULTS, ROUTES } from '../../constants';
import { useTheme } from '../../theme';
import type { RootStackScreenProps } from '../../types';
import { isTablet, moderateScale, screenWidth } from '../../utils';

import { SplashView } from './view';

const SPLASH_IMAGE_SOURCE: AppImageSource = require('../../assets/icons/screen.png');

const MAIN_TABS_ROUTE_PARAMS = {
  screen: ROUTES.HOME,
} as const;

const SplashContainerComponent = ({
  navigation,
}: RootStackScreenProps<typeof ROUTES.SPLASH>) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const { animation, spacing } = useTheme();

  const horizontalPadding = isTablet()
    ? spacing.containerMarginDesktop
    : spacing.containerMarginMobile;

  const logoSize = useMemo(
    () =>
      Math.min(
        screenWidth - horizontalPadding - horizontalPadding,
        moderateScale(COMPONENT_DEFAULTS.media.thumbnailWidth),
      ),
    [horizontalPadding],
  );

  const splashHoldDuration = useMemo(
    () => Math.max(0, APP_CONFIG.splashDurationMs - animation.duration.slower),
    [animation.duration.slower],
  );

  const handleNavigateToMainTabs = useCallback(() => {
    navigation.replace(ROUTES.MAIN_TABS, MAIN_TABS_ROUTE_PARAMS);
  }, [navigation]);

  useEffect(() => {
    let isActive = true;

    const splashAnimation = Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: animation.duration.slower,
        easing: animation.easing.decelerate,
        useNativeDriver: true,
      }),
      Animated.delay(splashHoldDuration),
    ]);

    splashAnimation.start(({ finished }) => {
      if (finished && isActive) {
        handleNavigateToMainTabs();
      }
    });

    return () => {
      isActive = false;
      splashAnimation.stop();
    };
  }, [
    animation.duration.slower,
    animation.easing.decelerate,
    fadeAnimation,
    handleNavigateToMainTabs,
    splashHoldDuration,
  ]);

  return (
    <SplashView
      imageAccessibilityLabel={APP_STRINGS.splash.imageAccessibilityLabel}
      imageSource={SPLASH_IMAGE_SOURCE}
      logoOpacity={fadeAnimation}
      logoSize={logoSize}
    />
  );
};

SplashContainerComponent.displayName = 'SplashContainer';

export const SplashContainer = memo(SplashContainerComponent);
