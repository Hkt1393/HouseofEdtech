import React, { memo, useMemo } from 'react';
import { Animated } from 'react-native';

import { AppImage, AppView, type AppImageSource } from '../../components/base';
import { Center, Screen } from '../../components/layout';

import { createDynamicStyles, styles } from './styles';

const AnimatedAppView = Animated.createAnimatedComponent(AppView);

export interface SplashViewProps {
  readonly imageAccessibilityLabel: string;
  readonly imageSource: AppImageSource;
  readonly logoOpacity: Animated.Value;
  readonly logoSize: number;
}

const SplashViewComponent = ({
  imageAccessibilityLabel,
  imageSource,
  logoOpacity,
  logoSize,
}: SplashViewProps) => {
  const dynamicStyles = useMemo(() => createDynamicStyles(logoSize), [logoSize]);

  const animatedLogoStyle = useMemo(
    () => [dynamicStyles.logoContainer, { opacity: logoOpacity }],
    [dynamicStyles.logoContainer, logoOpacity],
  );

  return (
    <Screen>
      <Center flex style={{ justifyContent:'center', alignItems:'center'}}>
        <AnimatedAppView style={animatedLogoStyle}>
          <AppImage
            accessibilityLabel={imageAccessibilityLabel}
            accessibilityRole="image"
            contentFit="contain"
            imageStyle={styles.logoImage}
            showErrorState={false}
            showLoadingState={false}
            source={imageSource}
            style={styles.logoImage}
          />
        </AnimatedAppView>
      </Center>
    </Screen>
  );
};

SplashViewComponent.displayName = 'SplashView';

export const SplashView = memo(SplashViewComponent);
