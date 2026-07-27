import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { APP_STRINGS } from '../../../constants';
import { AppText, AppView } from '../../base';
import { Center, Row, SafeAreaContainer, Stack } from '../../layout';
import { AppIcon } from '../../ui/shared';
import { useTheme } from '../../../theme';

import { createDynamicStyles, styles } from './styles';

const AnimatedAppView = Animated.createAnimatedComponent(AppView);

interface OfflineIllustrationProps {
  readonly height: number | string;
  readonly width: number | string;
}

interface OfflineViewProps {
  readonly isRefreshing: boolean;
  readonly onRetry: () => void;
  readonly onRetryPressIn: () => void;
  readonly onRetryPressOut: () => void;
  readonly retryAnimatedStyle: StyleProp<ViewStyle>;
}

const OfflineIllustrationComponent = ({
  height,
  width,
}: OfflineIllustrationProps) => {
  const { colors } = useTheme();

  return (
    <Svg
      accessibilityLabel={APP_STRINGS.components.offline.illustrationAccessibilityLabel}
      height={height}
      viewBox="0 0 240 240"
      width={width}
    >
      <Defs>
        <LinearGradient id="offlineSky" x1="28" x2="206" y1="32" y2="214">
          <Stop offset="0" stopColor={colors.primaryContainer} />
          <Stop offset="0.55" stopColor={colors.secondaryContainer} />
          <Stop offset="1" stopColor={colors.infoContainer} />
        </LinearGradient>
        <LinearGradient id="offlineGlass" x1="44" x2="196" y1="68" y2="188">
          <Stop offset="0" stopColor={colors.glassOverlay} />
          <Stop offset="1" stopColor={colors.surfaceLowest} />
        </LinearGradient>
      </Defs>

      <Rect
        fill={colors.surfaceHighest}
        height="168"
        opacity="0.24"
        rx="44"
        width="168"
        x="36"
        y="28"
      />
      <Rect
        fill="url(#offlineSky)"
        height="152"
        opacity="0.18"
        rx="36"
        width="152"
        x="44"
        y="36"
      />
      <Rect
        fill="url(#offlineGlass)"
        height="136"
        rx="32"
        stroke={colors.divider}
        strokeOpacity="0.45"
        width="136"
        x="52"
        y="44"
      />
      <Ellipse
        cx="120"
        cy="194"
        fill={colors.shadow}
        opacity="0.12"
        rx="54"
        ry="12"
      />
      <Path
        d="M89 150c10-12 23-18 39-18 15 0 28 6 38 18"
        fill="none"
        opacity="0.88"
        stroke={colors.primary}
        strokeLinecap="round"
        strokeWidth="10"
      />
      <Path
        d="M101 132c7-7 13-10 19-10 6 0 12 3 19 10"
        fill="none"
        opacity="0.78"
        stroke={colors.primaryContainer}
        strokeLinecap="round"
        strokeWidth="10"
      />
      <Path
        d="M114 115c3-3 5-4 7-4 2 0 4 1 7 4"
        fill="none"
        opacity="0.72"
        stroke={colors.info}
        strokeLinecap="round"
        strokeWidth="10"
      />
      <Circle cx="120" cy="165" fill={colors.primary} r="10" />
      <Path
        d="M79 84c0-12 10-22 22-22 4 0 8 1 11 3 5-9 15-15 26-15 17 0 31 13 32 30 11 1 20 10 20 21 0 12-10 22-22 22H94c-8 0-15-7-15-15 0-7 5-13 12-15-8-2-12-5-12-9Z"
        fill={colors.surfaceLowest}
        opacity="0.9"
      />
      <Path
        d="m92 92 54 54"
        stroke={colors.error}
        strokeLinecap="round"
        strokeWidth="10"
      />
      <Path
        d="m146 92-54 54"
        stroke={colors.error}
        strokeLinecap="round"
        strokeWidth="10"
      />
      <Path
        d="M165 72c8 2 14 10 14 19"
        fill="none"
        opacity="0.7"
        stroke={colors.primaryFixed}
        strokeLinecap="round"
        strokeWidth="6"
      />
      <Path
        d="M175 62c13 4 22 16 22 30"
        fill="none"
        opacity="0.52"
        stroke={colors.primaryFixedDim}
        strokeLinecap="round"
        strokeWidth="6"
      />
    </Svg>
  );
};

OfflineIllustrationComponent.displayName = 'OfflineIllustration';

const OfflineIllustration = memo(OfflineIllustrationComponent);

const OfflineViewComponent = ({
  isRefreshing,
  onRetry,
  onRetryPressIn,
  onRetryPressOut,
  retryAnimatedStyle,
}: OfflineViewProps) => {
  const theme = useTheme();
  const { animation, colors } = theme;
  const dynamicStyles = createDynamicStyles({
    theme,
  });
  const retryLabel = isRefreshing
    ? APP_STRINGS.common.loading
    : APP_STRINGS.offline.retryAction;

  return (
    <Animated.View
      entering={FadeIn.duration(animation.duration.normal)}
      exiting={FadeOut.duration(animation.duration.fast)}
      style={styles.absoluteFill}
    >
      <SafeAreaContainer
        backgroundColorToken="background"
        edges={['top', 'right', 'bottom', 'left']}
        flex
        style={styles.fill}
      >
        <Center flex paddingHorizontal="xl" paddingVertical="2xl">
          <Stack gap="2xl" style={dynamicStyles.content}>
            <AppView style={dynamicStyles.illustrationCard}>
              <AppView style={dynamicStyles.illustrationFrame}>
                <OfflineIllustration height="100%" width="100%" />
              </AppView>
            </AppView>
            <Stack gap="sm">
              <AppText align="center" variant="title">
                {APP_STRINGS.offline.title}
              </AppText>
              <AppText
                align="center"
                colorToken="textSecondary"
                style={dynamicStyles.descriptionText}
              >
                {APP_STRINGS.offline.description}
              </AppText>
            </Stack>
            <AnimatedAppView
              accessibilityHint={APP_STRINGS.components.offline.retryAccessibilityHint}
              accessibilityLabel={APP_STRINGS.components.offline.retryAccessibilityLabel}
              accessibilityRole="button"
              alignItems="center"
              backgroundColorToken="primary"
              center
              disabled={isRefreshing}
              justifyContent="center"
              onPress={onRetry}
              onPressIn={onRetryPressIn}
              onPressOut={onRetryPressOut}
              radius="full"
              style={[dynamicStyles.retryButton, retryAnimatedStyle]}
              testID="offline-retry-button"
            >
              <Row gap="sm" justifyContent="center">
                <AppIcon color={colors.onPrimary} name="refresh" size={18} />
                <AppText colorToken="onPrimary" variant="label">
                  {retryLabel}
                </AppText>
              </Row>
            </AnimatedAppView>
          </Stack>
        </Center>
      </SafeAreaContainer>
    </Animated.View>
  );
};

OfflineViewComponent.displayName = 'OfflineView';

export const OfflineView = memo(OfflineViewComponent);
