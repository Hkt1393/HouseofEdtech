import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { APP_STRINGS } from '../../constants';
import { AppText, AppView } from '../../components/base';
import { EmptyView, ErrorView } from '../../components/feedback';
import { SkeletonBlock } from '../../components/feedback/shared';
import {
  Center,
  Container,
  Divider,
  Row,
  Screen,
  Stack,
  } from '../../components/layout';
import { Avatar } from '../../components/ui/ContentPrimitives';
import { AppIcon } from '../../components/ui/shared';
import { useTheme } from '../../theme';
import { moderateScale } from '../../utils';

import type { ProfileScreenContent } from './container';
import {
  COMPACT_THEME_TOGGLE,
  createDynamicStyles,
  styles,
} from './styles';

interface ScreenErrorState {
  readonly description: string;
  readonly title: string;
}

interface ProfileViewProps {
  readonly content: ProfileScreenContent | null;
  readonly contentBottomInset: number;
  readonly errorState: ScreenErrorState | null;
  readonly isEmpty: boolean;
  readonly isLoading: boolean;
  readonly isRefreshing: boolean;
  readonly onDownloadsPress: () => void;
  readonly onLanguagePress: () => void;
  readonly onLogoutPress: () => void;
  readonly onManagePress: () => void;
  readonly onMenuPress: () => void;
  readonly onNotificationsPress: () => void;
  readonly onRefresh: () => void;
  readonly onRetry: () => void;
  readonly onThemeModeChange: (nextThemeMode: 'dark' | 'light') => void;
  readonly onWatchHistoryPress: () => void;
  readonly selectedThemeMode: 'dark' | 'light';
}

type ProfileGlyphName =
  | 'bell'
  | 'globe'
  | 'logout'
  | 'moon'
  | 'palette'
  | 'premium'
  | 'sun';

interface ProfileGlyphProps {
  readonly color: string;
  readonly name: ProfileGlyphName;
  readonly size: number;
  readonly strokeWidth?: number;
}

interface SettingsChevronProps {
  readonly animatedStyle: ReturnType<typeof useAnimatedStyle>;
}

interface SettingsGroupProps {
  readonly backgroundColorToken: 'surfaceLow' | 'surfaceLowest';
  readonly children: React.ReactNode;
  readonly label: string;
}

interface SettingsIconProps {
  readonly children: React.ReactNode;
}

interface SettingsRowProps {
  readonly accessibilityHint: string;
  readonly accessibilityLabel: string;
  readonly icon: React.ReactNode;
  readonly onPress?: () => void;
  readonly showChevron?: boolean;
  readonly subtitle?: string;
  readonly testID: string;
  readonly title: string;
  readonly trailingContent?: React.ReactNode;
  readonly value?: string;
}

interface SettingsValueProps {
  readonly value: string;
}

interface ThemeToggleProps {
  readonly onThemeModeChange: (nextThemeMode: 'dark' | 'light') => void;
  readonly selectedThemeMode: 'dark' | 'light';
}

interface PremiumBackgroundProps {
  readonly colors: readonly [string, string, string];
}

interface ProfilePlanPillProps {
  readonly label: string;
}

const ProfileGlyphComponent = ({
  color,
  name,
  size,
  strokeWidth = 1.75,
}: ProfileGlyphProps) => {
  switch (name) {
    case 'palette':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M12 4c4.97 0 9 3.58 9 8 0 2.12-1.88 3.5-4 3.5h-1.2c-.88 0-1.3.66-.96 1.48.54 1.3.12 2.52-1.84 2.52C7.48 19.5 3 15.46 3 10.5 3 6.36 7.03 4 12 4Z"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <Circle cx="8.2" cy="10.2" fill={color} r="1.2" />
          <Circle cx="11.4" cy="8.1" fill={color} r="1.2" />
          <Circle cx="15.2" cy="9.2" fill={color} r="1.2" />
          <Circle cx="9.9" cy="13.7" fill={color} r="1.2" />
        </Svg>
      );
    case 'bell':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M8 17.5h8m-6 0a2 2 0 0 0 4 0m4-1.5H6l1.5-2.25v-3.5A4.5 4.5 0 0 1 12 5.75a4.5 4.5 0 0 1 4.5 4.5v3.5L18 16Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'globe':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="12" r="8.25" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M3.9 12h16.2M12 3.8c2.2 2.2 3.4 5.1 3.4 8.2s-1.2 6-3.4 8.2c-2.2-2.2-3.4-5.1-3.4-8.2s1.2-6 3.4-8.2Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'logout':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M14 5h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <Path
            d="M10 16.5 5.5 12 10 7.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="6.5"
            x2="16.5"
            y1="12"
            y2="12"
          />
        </Svg>
      );
    case 'sun':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M12 3.8v2.1M12 18.1v2.1M20.2 12h-2.1M5.9 12H3.8M17.9 6.1l-1.5 1.5M7.6 16.4l-1.5 1.5M17.9 17.9l-1.5-1.5M7.6 7.6 6.1 6.1"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'moon':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M15.9 4.8a7.9 7.9 0 1 0 3.3 14.9 8.3 8.3 0 0 1-3.3-14.9Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'premium':
    default:
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="9" r="5.5" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="m12 6.7.93 1.89 2.09.3-1.51 1.47.36 2.06L12 11.5l-1.87.99.36-2.06-1.51-1.47 2.09-.3L12 6.7Z"
            fill={color}
          />
          <Path
            d="M8.5 13.8V20l3.5-1.6 3.5 1.6v-6.2"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
  }
};

ProfileGlyphComponent.displayName = 'ProfileGlyph';

const ProfileGlyph = memo(ProfileGlyphComponent);

const PremiumBackgroundComponent = ({ colors }: PremiumBackgroundProps) => {
  return (
    <ExpoLinearGradient
      colors={[...colors]}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={styles.absoluteFill}
    />
  );
};

PremiumBackgroundComponent.displayName = 'PremiumBackground';

const PremiumBackground = memo(PremiumBackgroundComponent);

const ProfilePlanPillComponent = ({ label }: ProfilePlanPillProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });

  return (
    <AppView
      backgroundColorToken="primaryContainer"
      radius="full"
      style={dynamicStyles.profilePlanPill}
    >
      <AppText
        colorToken={theme.isDark ? 'onPrimaryFixed' : 'onPrimary'}
        style={dynamicStyles.profilePlanPillText}
      >
        {label}
      </AppText>
    </AppView>
  );
};

ProfilePlanPillComponent.displayName = 'ProfilePlanPill';

const ProfilePlanPill = memo(ProfilePlanPillComponent);

const SettingsIconComponent = ({ children }: SettingsIconProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });

  return (
    <AppView
      alignItems="center"
      backgroundColorToken={theme.isDark ? 'surfaceHighest' : 'primaryFixed'}
      borderColorToken={theme.isDark ? 'surfaceBright' : 'divider'}
      borderWidth={1}
      justifyContent="center"
      radius="full"
      style={dynamicStyles.settingsIconContainer}
    >
      {children}
    </AppView>
  );
};

SettingsIconComponent.displayName = 'SettingsIcon';

const SettingsIcon = memo(SettingsIconComponent);

const SettingsValueComponent = ({ value }: SettingsValueProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });

  return <AppText style={dynamicStyles.settingsValueText}>{value}</AppText>;
};

SettingsValueComponent.displayName = 'SettingsValue';

const SettingsValue = memo(SettingsValueComponent);

const SettingsChevronComponent = ({ animatedStyle }: SettingsChevronProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });

  return (
    <Animated.View style={[dynamicStyles.settingsChevronWrap, animatedStyle]}>
      <AppIcon color={theme.colors.textTertiary} name="chevron-right" size={18} />
    </Animated.View>
  );
};

SettingsChevronComponent.displayName = 'SettingsChevron';

const SettingsChevron = memo(SettingsChevronComponent);

const SettingsGroupComponent = ({
  backgroundColorToken,
  children,
  label,
}: SettingsGroupProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });

  return (
    <Stack gap="sm">
      <AppText style={dynamicStyles.settingsGroupLabel}>{label}</AppText>
      <AppView
        backgroundColorToken={backgroundColorToken}
        borderColorToken="divider"
        borderWidth={1}
        paddingHorizontal="lg"
        paddingVertical="md"
        radius="lg"
        style={dynamicStyles.settingsGroupCard}
      >
        <Stack gap="none">{children}</Stack>
      </AppView>
    </Stack>
  );
};

SettingsGroupComponent.displayName = 'SettingsGroup';

const SettingsGroup = memo(SettingsGroupComponent);

const SettingsRowComponent = ({
  accessibilityHint,
  accessibilityLabel,
  icon,
  onPress,
  showChevron = true,
  subtitle,
  testID,
  title,
  trailingContent,
  value,
}: SettingsRowProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });
  const rowScale = useSharedValue(1);
  const chevronTranslateX = useSharedValue(0);
  const isInteractive = Boolean(onPress);
  const handlePressIn = useCallback(() => {
    if (!isInteractive) {
      return;
    }

    rowScale.value = withTiming(0.98, { duration: 140 });
    chevronTranslateX.value = withTiming(moderateScale(3), { duration: 140 });
  }, [chevronTranslateX, isInteractive, rowScale]);
  const handlePressOut = useCallback(() => {
    if (!isInteractive) {
      return;
    }

    rowScale.value = withTiming(1, { duration: 160 });
    chevronTranslateX.value = withTiming(0, { duration: 160 });
  }, [chevronTranslateX, isInteractive, rowScale]);
  const rowAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: rowScale.value }],
    };
  });
  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: chevronTranslateX.value }],
    };
  });

  return (
    <Animated.View style={rowAnimatedStyle}>
      <AppView
        accessibilityHint={onPress ? accessibilityHint : undefined}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={onPress ? 'button' : undefined}
        alignItems="center"
        androidRippleColorToken={theme.isDark ? 'surfaceBright' : 'primaryFixed'}
        justifyContent="space-between"
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        pressedOpacityValue="opaque"
        row
        style={dynamicStyles.settingsRow}
        testID={testID}
      >
       <AppView row paddingVertical={10}>
         <Row alignItems="center" flex gap="md">
          <SettingsIcon>{icon}</SettingsIcon>
          <Stack flex gap={subtitle ? 'xs' : 'none'} style={dynamicStyles.settingsCopyWrap}>
            <AppText style={dynamicStyles.settingsTitleText}>{title}</AppText>
            {subtitle ? (
              <AppText numberOfLines={1} style={dynamicStyles.settingsSubtitleText}>
                {subtitle}
              </AppText>
            ) : null}
          </Stack>
        </Row>
        <Row alignItems="center" gap="sm" style={dynamicStyles.settingsTrailingWrap}>
          {value ? <SettingsValue value={value} /> : null}
          {trailingContent}
          {showChevron ? <SettingsChevron animatedStyle={chevronAnimatedStyle} /> : null}
        </Row>
       </AppView>
      </AppView>
    </Animated.View>
  );
};

SettingsRowComponent.displayName = 'SettingsRow';

const SettingsRow = memo(SettingsRowComponent);

const ThemeToggleComponent = ({
  onThemeModeChange,
  selectedThemeMode,
}: ThemeToggleProps) => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });
  const selectedIconColor = theme.isDark
    ? theme.colors.onPrimaryFixed
    : theme.colors.onPrimaryFixedVariant;
  const unselectedIconColor = theme.colors.textTertiary;
  const thumbTranslateX = useSharedValue(
    selectedThemeMode === 'dark' ? COMPACT_THEME_TOGGLE.thumbOffset : 0,
  );
  useEffect(() => {
    thumbTranslateX.value = withTiming(
      selectedThemeMode === 'dark' ? COMPACT_THEME_TOGGLE.thumbOffset : 0,
      {
        duration: 180,
      },
    );
  }, [selectedThemeMode, thumbTranslateX]);
  const handleSelectLightTheme = useCallback(() => {
    onThemeModeChange('light');
  }, [onThemeModeChange]);
  const handleSelectDarkTheme = useCallback(() => {
    onThemeModeChange('dark');
  }, [onThemeModeChange]);
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: thumbTranslateX.value }],
    };
  });

  return (
    <AppView
      accessibilityLabel={APP_STRINGS.profile.themeToggleAccessibilityLabel}
      accessibilityRole="tablist"
      style={dynamicStyles.themeToggleTrack}
    >
      <Animated.View
        pointerEvents="none"
        style={[dynamicStyles.themeToggleThumb, thumbAnimatedStyle]}
      />
      <Row alignItems="center" style={dynamicStyles.themeToggleSegments}>
      <AppView
        accessibilityHint={APP_STRINGS.profile.themeLightAccessibilityHint}
        accessibilityLabel={APP_STRINGS.profile.themeLightAccessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{
          selected: selectedThemeMode === 'light',
        }}
        alignItems="center"
        androidRippleColorToken={theme.isDark ? 'surfaceBright' : 'primaryFixed'}
        justifyContent="center"
        onPress={handleSelectLightTheme}
        pressedOpacityValue="opaque"
        style={dynamicStyles.themeToggleSegment}
        testID="profile-theme-light-button"
      >
        <ProfileGlyph
          color={
            selectedThemeMode === 'light' ? selectedIconColor : unselectedIconColor
          }
          name="sun"
          size={18}
        />
      </AppView>
      <AppView
        accessibilityHint={APP_STRINGS.profile.themeDarkAccessibilityHint}
        accessibilityLabel={APP_STRINGS.profile.themeDarkAccessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{
          selected: selectedThemeMode === 'dark',
        }}
        alignItems="center"
        androidRippleColorToken={theme.isDark ? 'surfaceBright' : 'primaryFixed'}
        justifyContent="center"
        onPress={handleSelectDarkTheme}
        pressedOpacityValue="opaque"
        style={dynamicStyles.themeToggleSegment}
        testID="profile-theme-dark-button"
      >
        <ProfileGlyph
          color={
            selectedThemeMode === 'dark' ? selectedIconColor : unselectedIconColor
          }
          name="moon"
          size={18}
        />
      </AppView>
      </Row>
    </AppView>
  );
};

ThemeToggleComponent.displayName = 'ThemeToggle';

const ThemeToggle = memo(ThemeToggleComponent);

const ProfileSkeletonComponent = () => {
  const theme = useTheme();
  const dynamicStyles = createDynamicStyles({
    contentBottomInset: 0,
    theme,
  });

  return (
    <Stack gap="2xl">
      <Row alignItems="center" justifyContent="space-between">
        <SkeletonBlock
          height={dynamicStyles.headerSkeletonButton.height as number}
          radius={dynamicStyles.headerSkeletonButton.borderRadius as number}
          width={dynamicStyles.headerSkeletonButton.width as number}
        />
        <SkeletonBlock height={28} width="32%" />
        <SkeletonBlock
          height={dynamicStyles.headerSkeletonAvatar.height as number}
          radius={dynamicStyles.headerSkeletonAvatar.borderRadius as number}
          width={dynamicStyles.headerSkeletonAvatar.width as number}
        />
      </Row>

      <Stack gap="lg" style={dynamicStyles.profileSkeletonSection}>
        <SkeletonBlock
          height={dynamicStyles.profileSkeletonAvatar.height as number}
          radius={dynamicStyles.profileSkeletonAvatar.borderRadius as number}
          width={dynamicStyles.profileSkeletonAvatar.width as number}
        />
        <SkeletonBlock height={24} radius={16} width="34%" />
        <SkeletonBlock height={28} width="44%" />
        <SkeletonBlock height={18} width="56%" />
      </Stack>

      <AppView
        backgroundColorToken={theme.isDark ? 'surfaceLow' : 'surfaceLowest'}
        borderColorToken="divider"
        borderWidth={1}
        padding="lg"
        radius="3xl"
        shadow="sm"
        style={dynamicStyles.skeletonCard}
      >
        <Stack gap="md">
          <SkeletonBlock height={22} width="42%" />
          <SkeletonBlock height={18} width="84%" />
          <SkeletonBlock height={18} width="76%" />
          <Row alignItems="center" justifyContent="space-between">
            <SkeletonBlock height={18} width="40%" />
          <SkeletonBlock height={52} radius={26} width={124} />
          </Row>
        </Stack>
      </AppView>

      <AppView
        backgroundColorToken={theme.isDark ? 'surfaceLow' : 'surfaceLowest'}
        borderColorToken="divider"
        borderWidth={1}
        padding="lg"
        radius="3xl"
        shadow="sm"
        style={dynamicStyles.skeletonCard}
      >
        <Stack gap="md">
          <SkeletonBlock height={18} width="72%" />
          <Divider />
          <SkeletonBlock height={18} width="74%" />
          <Divider />
          <SkeletonBlock height={18} width="70%" />
        </Stack>
      </AppView>

      <AppView
        backgroundColorToken={theme.isDark ? 'surfaceLow' : 'surfaceLowest'}
        borderColorToken="divider"
        borderWidth={1}
        padding="lg"
        radius="3xl"
        shadow="sm"
        style={dynamicStyles.skeletonCard}
      >
        <Stack gap="md">
          <Row alignItems="center" justifyContent="space-between">
            <SkeletonBlock height={18} width="46%" />
            <SkeletonBlock height={40} radius={20} width={112} />
          </Row>
          <Divider />
          <Row alignItems="center" justifyContent="space-between">
            <SkeletonBlock height={18} width="38%" />
            <SkeletonBlock height={18} width="26%" />
          </Row>
        </Stack>
      </AppView>

      <SkeletonBlock height={60} radius={30} width="100%" />
      <SkeletonBlock height={18} width="64%" />
    </Stack>
  );
};

ProfileSkeletonComponent.displayName = 'ProfileSkeleton';

const ProfileSkeleton = memo(ProfileSkeletonComponent);

const ProfileViewComponent = ({
  content,
  contentBottomInset,
  errorState,
  isEmpty,
  isLoading,
  isRefreshing,
  onDownloadsPress,
  onLanguagePress,
  onLogoutPress,
  onManagePress,
  onMenuPress,
  onNotificationsPress,
  onRefresh,
  onRetry,
  onThemeModeChange,
  onWatchHistoryPress,
  selectedThemeMode,
}: ProfileViewProps) => {
  const theme = useTheme();
  const { animation, colors, reduceMotionEnabled } = theme;
  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles({
        contentBottomInset,
        theme,
      }),
    [contentBottomInset, theme],
  );
  const membershipGradientColors = useMemo<readonly [string, string, string]>(
    () =>
      theme.isDark
        ? [
            colors.secondaryContainer,
            colors.primaryContainer,
            colors.tertiaryContainer,
          ]
        : [
            colors.secondaryContainer,
            colors.primaryContainer,
            colors.warningContainer,
          ],
    [colors.primaryContainer, colors.secondaryContainer, colors.tertiaryContainer, colors.warningContainer, theme.isDark],
  );
  const selectedThemeModeLabel = useMemo(
    () =>
      selectedThemeMode === 'dark'
        ? APP_STRINGS.profile.appearanceDark
        : APP_STRINGS.profile.appearanceLight,
    [selectedThemeMode],
  );
  const downloadsStoredLocallySubtitle = useMemo(
    () =>
      content
        ? `${content.downloadStorageLabel} ${APP_STRINGS.profile.downloadsStoredLocallySuffix}`
        : '',
    [content],
  );
  const staggerStep = reduceMotionEnabled ? 0 : animation.duration.fast;
  const cardBackgroundColorToken = theme.isDark ? 'surfaceLow' : 'surfaceLowest';

  if (isLoading) {
    return (
      <Screen
        backgroundColorToken="background"
        safeAreaEdges={['top', 'left', 'right']}
        scrollable
        scrollProps={{
          onRefresh,
          refreshing: isRefreshing,
        }}
        contentContainerStyle={dynamicStyles.screenContent}
      >
        <Container maxWidth={520}>
          <ProfileSkeleton />
        </Container>
      </Screen>
    );
  }

  if (errorState) {
    return (
      <Screen
        backgroundColorToken="background"
        safeAreaEdges={['top', 'left', 'right']}
        scrollable
        scrollProps={{
          onRefresh,
          refreshing: isRefreshing,
        }}
        contentContainerStyle={dynamicStyles.screenContent}
      >
        <Container maxWidth={520}>
          <Center style={dynamicStyles.stateContainer}>
            <ErrorView
              description={errorState.description}
              onRetry={onRetry}
              title={errorState.title}
            />
          </Center>
        </Container>
      </Screen>
    );
  }

  if (isEmpty || !content) {
    return (
      <Screen
        backgroundColorToken="background"
        safeAreaEdges={['top', 'left', 'right']}
        scrollable
        scrollProps={{
          onRefresh,
          refreshing: isRefreshing,
        }}
        contentContainerStyle={dynamicStyles.screenContent}
      >
        <Container maxWidth={520}>
          <Center style={dynamicStyles.stateContainer}>
            <EmptyView
              actionLabel={APP_STRINGS.common.retry}
              description={APP_STRINGS.profile.emptyStateDescription}
              onAction={onRetry}
              title={APP_STRINGS.profile.emptyStateTitle}
            />
          </Center>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColorToken="background"
      safeAreaEdges={['top', 'left', 'right']}
      scrollable
      scrollProps={{
        onRefresh,
        refreshing: isRefreshing,
      }}
      contentContainerStyle={dynamicStyles.screenContent}
    >
      <Container maxWidth={520}>
        <Stack gap="2xl">
          <Stack gap="xl">
            <Animated.View
              entering={FadeInDown.duration(animation.duration.normal).delay(0)}
            >
              <Row
                alignItems="center"
                justifyContent="space-between"
                style={dynamicStyles.headerRow}
              >
                <AppView
                  accessibilityHint={APP_STRINGS.profile.menuAccessibilityHint}
                  accessibilityLabel={APP_STRINGS.profile.menuAccessibilityLabel}
                  accessibilityRole="button"
                  alignItems="center"
                  justifyContent="center"
                  onPress={onMenuPress}
                  radius="full"
                  style={dynamicStyles.menuButton}
                  testID="profile-menu-button"
                >
                  <AppIcon color={colors.primaryFixedDim} name="menu" size={24} />
                </AppView>
                <AppText style={dynamicStyles.headerTitleText}>
                  {APP_STRINGS.profile.headerTitle}
                </AppText>
                <AppView
                  accessibilityHint={APP_STRINGS.profile.headerAvatarAccessibilityHint}
                  accessibilityLabel={APP_STRINGS.profile.headerAvatarAccessibilityLabel}
                  accessibilityRole="image"
                  style={dynamicStyles.headerAvatarFrame}
                >
                  <Avatar
                    accessibilityLabel={APP_STRINGS.profile.headerAvatarAccessibilityLabel}
                    fallbackLabel={content.name}
                    imageUrl={content.avatarUrl}
                    size="md"
                  />
                </AppView>
              </Row>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(animation.duration.normal).delay(staggerStep)}
            >
              <Stack gap="lg" style={dynamicStyles.profileSection}>
                <AppView style={dynamicStyles.profileAvatarRing}>
                  <Avatar
                    accessibilityHint={APP_STRINGS.profile.profileAvatarAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.profile.profileAvatarAccessibilityLabel}
                    fallbackLabel={content.name}
                    imageUrl={content.avatarUrl}
                    size="2xl"
                  />
                </AppView>
                <AppView style={dynamicStyles.profileBadgeWrap}>
                  <ProfilePlanPill label={content.planLabel} />
                </AppView>
                <Stack gap="xs" style={dynamicStyles.profileTextWrap}>
                  <AppText align="center" style={dynamicStyles.profileNameText}>
                    {content.name}
                  </AppText>
                  <AppText align="center" style={dynamicStyles.profileEmailText}>
                    {content.email}
                  </AppText>
                </Stack>
              </Stack>
            </Animated.View>
          </Stack>

          <Animated.View
            entering={FadeInDown.duration(animation.duration.normal).delay(staggerStep * 2)}
          >
            <AppView
              backgroundColorToken="surfaceLowest"
              padding="xl"
              radius="lg"
              style={dynamicStyles.membershipCard}
            >
              <PremiumBackground colors={membershipGradientColors} />
              <Stack gap="xl" style={styles.fill}>
                <Row alignItems="flex-start" justifyContent="space-between">
                  <Stack gap="md" style={dynamicStyles.membershipCopyColumn}>
                    <AppText colorToken="white" style={dynamicStyles.membershipTitleText}>
                      {content.membershipTitle}
                    </AppText>
                    <AppText
                      colorToken="white"
                      style={dynamicStyles.membershipDescriptionText}
                    >
                      {content.membershipDescription}
                    </AppText>
                  </Stack>
                  <AppView
                    accessibilityLabel={APP_STRINGS.profile.membershipIconAccessibilityLabel}
                    accessibilityRole="image"
                    style={dynamicStyles.membershipIconWrap}
                  >
                    <ProfileGlyph color={colors.white} name="premium" size={30} />
                  </AppView>
                </Row>

                <Row alignItems="flex-end" justifyContent="space-between">
                  <AppText style={dynamicStyles.membershipRenewalText}>
                    {content.membershipRenewalLabel}
                  </AppText>
                  <AppView
                    accessibilityHint={APP_STRINGS.profile.manageAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.profile.manageButtonLabel}
                    accessibilityRole="button"
                    alignItems="center"
                    backgroundColorToken="white"
                    justifyContent="center"
                    onPress={onManagePress}
                    radius="full"
                    style={dynamicStyles.manageButton}
                    testID="profile-manage-button"
                  >
                    <AppText style={dynamicStyles.manageButtonText}>
                      {APP_STRINGS.profile.manageButtonLabel}
                    </AppText>
                  </AppView>
                </Row>
              </Stack>
            </AppView>
          </Animated.View>

          <Stack gap="lg">
            <Animated.View
              entering={FadeInDown.duration(animation.duration.normal).delay(staggerStep * 3)}
            >
              <SettingsGroup
                backgroundColorToken={cardBackgroundColorToken}
                label={APP_STRINGS.profile.watchingGroupLabel}
              >
                <SettingsRow
                    accessibilityHint={APP_STRINGS.profile.watchHistoryAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.profile.watchHistoryLabel}
                    icon={<AppIcon color={colors.textSecondary} name="clock" size={22} />}
                    onPress={onWatchHistoryPress}
                    subtitle={APP_STRINGS.profile.watchHistorySubtitle}
                    testID="profile-watch-history-button"
                    title={APP_STRINGS.profile.watchHistoryLabel}
                  />
                <AppView
                  backgroundColorToken="divider"
                  opacityValue="subtle"
                  style={dynamicStyles.settingsDivider}
                />
                <SettingsRow
                    accessibilityHint={APP_STRINGS.profile.downloadsAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.common.downloads}
                    icon={<AppIcon color={colors.textSecondary} name="download" size={22} />}
                    onPress={onDownloadsPress}
                    subtitle={downloadsStoredLocallySubtitle}
                    testID="profile-downloads-button"
                    title={APP_STRINGS.common.downloads}
                  />
                <AppView
                  backgroundColorToken="divider"
                  opacityValue="subtle"
                  style={dynamicStyles.settingsDivider}
                />
                <SettingsRow
                    accessibilityHint={APP_STRINGS.profile.notificationsAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.profile.notificationsLabel}
                    icon={<ProfileGlyph color={colors.textSecondary} name="bell" size={22} />}
                    onPress={onNotificationsPress}
                    subtitle={APP_STRINGS.profile.notificationsEnabledLabel}
                    testID="profile-notifications-button"
                    title={APP_STRINGS.profile.notificationsLabel}
                  />
              </SettingsGroup>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(animation.duration.normal).delay(staggerStep * 4)}
            >
              <SettingsGroup
                backgroundColorToken={cardBackgroundColorToken}
                label={APP_STRINGS.profile.preferencesGroupLabel}
              >
                <SettingsRow
                    accessibilityHint={APP_STRINGS.components.button.segmentAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.common.appearance}
                    icon={
                      <ProfileGlyph color={colors.textSecondary} name="palette" size={22} />
                    }
                    showChevron={false}
                    subtitle={APP_STRINGS.profile.appearanceValueLabel}
                    testID="profile-appearance-row"
                    title={APP_STRINGS.common.appearance}
                    trailingContent={
                      <ThemeToggle
                        onThemeModeChange={onThemeModeChange}
                        selectedThemeMode={selectedThemeMode}
                      />
                    }
                    value={selectedThemeModeLabel}
                  />
                <AppView
                  backgroundColorToken="divider"
                  opacityValue="subtle"
                  style={dynamicStyles.settingsDivider}
                />
                <SettingsRow
                    accessibilityHint={APP_STRINGS.profile.languageAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.common.language}
                    icon={<ProfileGlyph color={colors.textSecondary} name="globe" size={22} />}
                    onPress={onLanguagePress}
                    subtitle={content.languageLabel}
                    testID="profile-language-button"
                    title={APP_STRINGS.common.language}
                  />
              </SettingsGroup>
            </Animated.View>
          </Stack>

          <Animated.View
            entering={FadeInDown.duration(animation.duration.normal).delay(staggerStep * 5)}
          >
            <AppView
              accessibilityHint={APP_STRINGS.profile.logoutAccessibilityHint}
              accessibilityLabel={APP_STRINGS.profile.logoutButtonLabel}
              accessibilityRole="button"
              alignItems="center"
              backgroundColorToken={cardBackgroundColorToken}
              borderColorToken="divider"
              borderWidth={1}
              justifyContent="center"
              onPress={onLogoutPress}
              radius="md"
              row
              style={dynamicStyles.logoutButton}
              testID="profile-logout-button"
            >
              <Row alignItems="center" gap="sm" style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ProfileGlyph color={colors.error} name="logout" size={25} />
                <AppText style={dynamicStyles.logoutButtonText}>
                  {APP_STRINGS.profile.logoutButtonLabel}
                </AppText>
              </Row>
            </AppView>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(animation.duration.normal).delay(staggerStep * 6)}
          >
            <AppText align="center" style={dynamicStyles.footerText}>
              {content.footerLabel}
            </AppText>
          </Animated.View>
        </Stack>
      </Container>
    </Screen>
  );
};

ProfileViewComponent.displayName = 'ProfileView';

export const ProfileView = memo(ProfileViewComponent);
