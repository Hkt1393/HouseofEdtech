import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  Animated,
  useWindowDimensions,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  AppFlatList,
  AppImage,
  AppText,
  type AppImageSource,
  AppView,
} from '../../components/base';
import {
  EmptyView,
  ErrorView,
  SkeletonBanner,
  SkeletonPoster,
} from '../../components/feedback';
import { SkeletonBlock } from '../../components/feedback/shared';
import { AbsoluteFill, Container, Row, Screen, Stack } from '../../components/layout';
import { useTheme } from '../../theme';
import { moderateScale } from '../../utils';
import {
  Avatar,
  ContentCarousel,
  type MetadataRowItem,
  type MovieCardProps,
} from '../../components/ui';
import { AppIcon, type IconName } from '../../components/ui/shared';
import { APP_STRINGS, TMDB_HOME_SECTION_ORDER } from '../../constants';

import {
  createDynamicStyles,
  HOME_FEATURED_RAIL_ITEM_WIDTH,
  HOME_POSTER_RAIL_ITEM_WIDTH,
  styles,
} from './styles';

const AnimatedAppView = Animated.createAnimatedComponent(AppView);

const HOME_SAFE_AREA_EDGES = ['top'] as const;
const HOME_CATEGORY_LIMIT = 4;
const HOME_POSTER_SKELETON_ITEMS = [
  'home-poster-skeleton-1',
  'home-poster-skeleton-2',
  'home-poster-skeleton-3',
] as const;
const HOME_SECTION_SKELETON_ITEMS = TMDB_HOME_SECTION_ORDER.map(
  (sectionKey) => `home-section-skeleton-${sectionKey}`,
);

interface HomeCategoryChipItem {
  readonly id: string;
  readonly isSelected: boolean;
  readonly label: string;
}

export interface HomeSectionItem {
  readonly id: string;
  readonly isLoading: boolean;
  readonly isLoadingMore: boolean;
  readonly items: ReadonlyArray<MovieCardProps>;
  readonly onEndReached?: () => void;
  readonly subtitle?: string;
  readonly title: string;
}

export interface HomeHeroBannerViewModel {
  readonly backgroundImageSource?: AppImageSource;
  readonly backgroundImageTransitionDuration?: number;
  readonly badgeLabel?: string;
  readonly description?: string;
  readonly metadataItems: ReadonlyArray<MetadataRowItem>;
  readonly onPrimaryAction?: () => void;
  readonly onSecondaryAction?: () => void;
  readonly primaryActionLabel?: string;
  readonly secondaryActionLabel?: string;
  readonly subtitle?: string;
  readonly title: string;
}

export interface HomeViewProps {
  readonly errorDescription?: string;
  readonly errorTitle?: string;
  readonly headerTitle: string;
  readonly heroBanner: HomeHeroBannerViewModel | null;
  readonly isEmpty: boolean;
  readonly isInitialContentLoading: boolean;
  readonly isRefreshing: boolean;
  readonly onMenuPress: () => void;
  readonly onProfilePress: () => void;
  readonly onRefresh: () => void;
  readonly onRetry: () => void;
  readonly profileFallbackLabel: string;
  readonly sections: ReadonlyArray<HomeSectionItem>;
}

interface HomeActionButtonProps {
  readonly accessibilityHint?: string;
  readonly accessibilityLabel: string;
  readonly iconColor: string;
  readonly iconName: IconName;
  readonly label: string;
  readonly onPress?: () => void;
  readonly surfaceStyle: StyleProp<ViewStyle>;
  readonly textStyle: StyleProp<TextStyle>;
}

const HomeActionButtonComponent = ({
  accessibilityHint,
  accessibilityLabel,
  iconColor,
  iconName,
  label,
  onPress,
  surfaceStyle,
  textStyle,
}: HomeActionButtonProps) => {
  return (
    <AppView
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? 'button' : undefined}
      alignItems="center"
      justifyContent="center"
      onPress={onPress}
      radius="full"
      style={[styles.actionButton, surfaceStyle]}
    >
      <Row alignItems="center" gap="sm" justifyContent="center" style={styles.actionButtonContent}>
        <AppIcon color={iconColor} name={iconName} size={moderateScale(18)} />
        <AppText style={textStyle} variant="label">
          {label}
        </AppText>
      </Row>
    </AppView>
  );
};

HomeActionButtonComponent.displayName = 'HomeActionButton';

interface HomeSectionHeaderProps {
  readonly actionIconColor: string;
  readonly actionIconName: IconName;
  readonly actionSurfaceStyle: StyleProp<ViewStyle>;
  readonly subtitle?: string;
  readonly subtitleStyle: StyleProp<TextStyle>;
  readonly title: string;
  readonly titleStyle: StyleProp<TextStyle>;
}

const HomeSectionHeaderComponent = ({
  actionIconColor,
  actionIconName,
  actionSurfaceStyle,
  subtitle,
  subtitleStyle,
  title,
  titleStyle,
}: HomeSectionHeaderProps) => {
  return (
    <Row alignItems="center" gap="md" justifyContent="space-between">
      <Stack gap="xs" style={styles.fill}>
        <AppText style={titleStyle} variant="title">
          {title}
        </AppText>
        {subtitle ? (
          <AppText numberOfLines={2} style={subtitleStyle}>
            {subtitle}
          </AppText>
        ) : null}
      </Stack>
      <AppView
        alignItems="center"
        justifyContent="center"
        radius="full"
        style={[styles.sectionHeaderAction, actionSurfaceStyle]}
      >
        <AppIcon color={actionIconColor} name={actionIconName} size={moderateScale(18)} />
      </AppView>
    </Row>
  );
};

HomeSectionHeaderComponent.displayName = 'HomeSectionHeader';

interface HomeCategoryChipProps {
  readonly label: string;
  readonly labelStyle: StyleProp<TextStyle>;
  readonly surfaceStyle: StyleProp<ViewStyle>;
}

const HomeCategoryChipComponent = ({
  label,
  labelStyle,
  surfaceStyle,
}: HomeCategoryChipProps) => {
  return (
    <AppView
      alignItems="center"
      justifyContent="center"
      radius="full"
      style={[styles.categoryChip, surfaceStyle]}
    >
      <AppText numberOfLines={1} style={labelStyle} variant="label">
        {label}
      </AppText>
    </AppView>
  );
};

HomeCategoryChipComponent.displayName = 'HomeCategoryChip';

interface HomeFeaturedRailCardProps {
  readonly item: MovieCardProps;
  readonly metaStyle: StyleProp<TextStyle>;
  readonly surfaceStyle: StyleProp<ViewStyle>;
  readonly titleStyle: StyleProp<TextStyle>;
}

const HomeFeaturedRailCardComponent = ({
  item,
  metaStyle,
  surfaceStyle,
  titleStyle,
}: HomeFeaturedRailCardProps) => {
  const imageSource = useMemo(
    () =>
      item.thumbnailUrl || item.posterUrl
        ? {
            uri: item.thumbnailUrl || item.posterUrl,
          }
        : undefined,
    [item.posterUrl, item.thumbnailUrl],
  );

  return (
    <AppView
      accessibilityHint={item.accessibilityHint}
      accessibilityLabel={item.accessibilityLabel ?? item.title}
      accessibilityRole={item.onPress ? 'button' : undefined}
      accessibilityState={item.accessibilityState}
      onPress={item.onPress}
      radius="xl"
      style={[styles.featuredCard, surfaceStyle]}
    >
      {imageSource ? (
        <AppImage
          contentFit="cover"
          radius="xl"
          showErrorState={false}
          showLoadingState={false}
          source={imageSource}
          style={styles.featuredCardImage}
          transitionDuration={item.imageTransitionDuration}
        />
      ) : (
        <AppView radius="xl" style={styles.featuredCardImage} />
      )}
      <Stack gap="xs" style={styles.featuredCardContent}>
        <AppText numberOfLines={1} style={titleStyle} variant="subtitle">
          {item.title}
        </AppText>
        {item.metadataLabel ? (
          <AppText numberOfLines={1} style={metaStyle} variant="caption">
            {item.metadataLabel}
          </AppText>
        ) : null}
      </Stack>
    </AppView>
  );
};

HomeFeaturedRailCardComponent.displayName = 'HomeFeaturedRailCard';

interface HomePosterCardProps {
  readonly item: MovieCardProps;
  readonly metaStyle: StyleProp<TextStyle>;
  readonly surfaceStyle: StyleProp<ViewStyle>;
  readonly titleStyle: StyleProp<TextStyle>;
}

const HomePosterCardComponent = ({
  item,
  metaStyle,
  surfaceStyle,
  titleStyle,
}: HomePosterCardProps) => {
  const imageSource = useMemo(
    () =>
      item.posterUrl
        ? {
            uri: item.posterUrl,
          }
        : undefined,
    [item.posterUrl],
  );

  return (
    <Stack gap="sm" style={styles.posterCard}>
      <AppView
        accessibilityHint={item.accessibilityHint}
        accessibilityLabel={item.accessibilityLabel ?? item.title}
        accessibilityRole={item.onPress ? 'button' : undefined}
        accessibilityState={item.accessibilityState}
        onPress={item.onPress}
        radius="xl"
        style={surfaceStyle}
      >
        {imageSource ? (
          <AppImage
            contentFit="cover"
            radius="xl"
            showErrorState={false}
            showLoadingState={false}
            source={imageSource}
            style={styles.posterCardImage}
            transitionDuration={item.imageTransitionDuration}
          />
        ) : (
          <AppView radius="xl" style={styles.posterCardImage} />
        )}
      </AppView>
      <Stack gap="xs">
        <AppText numberOfLines={2} style={titleStyle} variant="label">
          {item.title}
        </AppText>
        {item.metadataLabel ? (
          <AppText numberOfLines={1} style={metaStyle} variant="caption">
            {item.metadataLabel}
          </AppText>
        ) : null}
      </Stack>
    </Stack>
  );
};

HomePosterCardComponent.displayName = 'HomePosterCard';

const HomeLoadMoreFooterComponent = () => {
  return (
    <AppView style={styles.loadMoreFooter}>
      <SkeletonPoster />
    </AppView>
  );
};

HomeLoadMoreFooterComponent.displayName = 'HomeLoadMoreFooter';

const HomeHeaderSkeletonComponent = () => {
  const accessorySize = styles.headerAccessorySkeleton.height as number;

  return (
    <Container paddingTop="md">
      <Row alignItems="center" gap="md" justifyContent="space-between">
        <Row alignItems="center" gap="md">
          <SkeletonBlock
            height={accessorySize}
            radius={accessorySize / 2}
            style={styles.headerAccessorySkeleton}
            width={styles.headerAccessorySkeleton.width}
          />
          <SkeletonBlock
            height={styles.headerTitleSkeleton.height as number}
            style={styles.headerTitleSkeleton}
            width={styles.headerTitleSkeleton.width}
          />
        </Row>
        <SkeletonBlock
          height={accessorySize}
          radius={accessorySize / 2}
          style={styles.headerAccessorySkeleton}
          width={styles.headerAccessorySkeleton.width}
        />
      </Row>
    </Container>
  );
};

HomeHeaderSkeletonComponent.displayName = 'HomeHeaderSkeleton';

const HomeHeroSkeletonComponent = () => {
  return (
    <AppView style={styles.headerContent}>
      <SkeletonBanner />
      <Container marginTop="lg">
        <Stack gap="md">
          <SkeletonBlock
            height={styles.actionSkeleton.height as number}
            style={styles.actionSkeleton}
            width="72%"
          />
          <SkeletonBlock
            height={styles.actionSkeleton.height as number}
            style={styles.actionSkeleton}
            width="72%"
          />
        </Stack>
      </Container>
    </AppView>
  );
};

HomeHeroSkeletonComponent.displayName = 'HomeHeroSkeleton';

const HomeSectionSkeletonComponent = () => {
  const keyExtractor = useCallback((item: string) => item, []);

  const renderItem = useCallback(() => {
    return (
      <AppView style={styles.posterSkeleton}>
        <SkeletonPoster />
      </AppView>
    );
  }, []);

  return (
    <Container>
      <Stack gap="md">
        <SkeletonBlock
          height={styles.sectionTitleSkeleton.height as number}
          style={styles.sectionTitleSkeleton}
          width={styles.sectionTitleSkeleton.width}
        />
        <AppFlatList
          contentGap="md"
          data={HOME_POSTER_SKELETON_ITEMS}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </Stack>
    </Container>
  );
};

HomeSectionSkeletonComponent.displayName = 'HomeSectionSkeleton';

interface HomeSkeletonLayoutProps {
  readonly contentContainerStyle?: StyleProp<ViewStyle>;
}

const HomeSkeletonLayoutComponent = ({ contentContainerStyle }: HomeSkeletonLayoutProps) => {
  const keyExtractor = useCallback((item: string) => item, []);

  const listHeader = useMemo(
    () => (
      <Stack gap="xl" style={styles.headerContent}>
        <HomeHeaderSkeletonComponent />
        <HomeHeroSkeletonComponent />
      </Stack>
    ),
    [],
  );

  const renderItem = useCallback(() => <HomeSectionSkeletonComponent />, []);

  return (
    <AppFlatList
      ListHeaderComponent={listHeader}
      contentGap="2xl"
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      data={HOME_SECTION_SKELETON_ITEMS}
      keyExtractor={keyExtractor}
      removeClippedSubviews
      renderItem={renderItem}
      style={styles.fill}
    />
  );
};

HomeSkeletonLayoutComponent.displayName = 'HomeSkeletonLayout';

const HomeViewComponent = ({
  errorDescription,
  errorTitle,
  headerTitle,
  heroBanner,
  isEmpty,
  isInitialContentLoading,
  isRefreshing,
  onMenuPress,
  onProfilePress,
  onRefresh,
  onRetry,
  profileFallbackLabel,
  sections,
}: HomeViewProps) => {
  const tabBarHeight = useBottomTabBarHeight();
  const { animation, colors, isDark, spacing } = useTheme();
  const { height } = useWindowDimensions();
  const contentOpacity = useRef(
    new Animated.Value(isInitialContentLoading ? 0 : 1),
  ).current;
  const animatedContentStyle = useMemo(
    () => ({
      opacity: contentOpacity,
    }),
    [contentOpacity],
  );
  const homeColors = colors;
  const heroHeight = useMemo(
    () => Math.min(Math.max(height * 0.56, moderateScale(420)), moderateScale(620)),
    [height],
  );
  const listBottomPadding = useMemo(
    () => Math.max(tabBarHeight + spacing['2xl'], moderateScale(128)),
    [spacing, tabBarHeight],
  );
  const dynamicStyles = useMemo(
    () => createDynamicStyles(heroHeight, listBottomPadding, homeColors, isDark),
    [heroHeight, homeColors, isDark, listBottomPadding],
  );
  const homeBackgroundToken = 'background';
  const statusBarStyle = useMemo(() => (isDark ? 'light' : 'dark'), [isDark]);

  useEffect(() => {
    if (isInitialContentLoading) {
      contentOpacity.setValue(0);

      return;
    }

    Animated.timing(contentOpacity, {
      duration: animation.duration.normal,
      easing: animation.easing.decelerate,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [
    animation.duration.normal,
    animation.easing.decelerate,
    contentOpacity,
    isInitialContentLoading,
  ]);

  const profileAccessory = useMemo(
    () => (
      <Avatar
        accessibilityHint={APP_STRINGS.home.profileAccessibilityHint}
        accessibilityLabel={APP_STRINGS.navigation.profile}
        fallbackLabel={profileFallbackLabel}
        onPress={onProfilePress}
        size="md"
      />
    ),
    [onProfilePress, profileFallbackLabel],
  );

  const emptyIllustration = useMemo(
    () => (
      <AppView
        alignItems="center"
        backgroundColorToken="surfaceSecondary"
        center
        radius="full"
        style={styles.stateIconContainer}
      >
        <AppIcon color={colors.info} name="info" size={styles.stateIcon.width as number} />
      </AppView>
    ),
    [colors.info],
  );

  const heroMetadataLabel = useMemo(() => {
    if (!heroBanner) {
      return undefined;
    }

    const labels = heroBanner.metadataItems.map((item) => item.label);

    return labels.length > 0
      ? labels.join(APP_STRINGS.home.metadataSeparator)
      : undefined;
  }, [heroBanner]);

  const categoryItems = useMemo<ReadonlyArray<HomeCategoryChipItem>>(
    () =>
      sections.slice(0, HOME_CATEGORY_LIMIT).map((section, index) => ({
        id: `${section.id}-category`,
        isSelected: index === 0,
        label: section.title,
      })),
    [sections],
  );

  const featuredRailSection = useMemo<HomeSectionItem | null>(() => {
    const secondarySection = sections.find(
      (section) => section.id !== 'home-section-trending' && section.items.length > 0,
    );

    return secondarySection ?? sections.find((section) => section.items.length > 0) ?? null;
  }, [sections]);

  const posterSections = useMemo(
    () =>
      sections.filter((section) => section.id !== featuredRailSection?.id),
    [featuredRailSection?.id, sections],
  );

  const renderCategoryChip = useCallback(
    (item: HomeCategoryChipItem) => (
      <HomeCategoryChipComponent
        label={item.label}
        labelStyle={
          item.isSelected
            ? dynamicStyles.categoryChipLabelActive
            : dynamicStyles.categoryChipLabelInactive
        }
        surfaceStyle={
          item.isSelected
            ? dynamicStyles.categoryChipActive
            : dynamicStyles.categoryChipInactive
        }
      />
    ),
    [
      dynamicStyles.categoryChipActive,
      dynamicStyles.categoryChipInactive,
      dynamicStyles.categoryChipLabelActive,
      dynamicStyles.categoryChipLabelInactive,
    ],
  );

  const renderFeaturedRailCard = useCallback(
    (item: MovieCardProps) => (
      <HomeFeaturedRailCardComponent
        item={item}
        metaStyle={dynamicStyles.featuredMetaText}
        surfaceStyle={dynamicStyles.featuredCardSurface}
        titleStyle={dynamicStyles.featuredTitleText}
      />
    ),
    [
      dynamicStyles.featuredCardSurface,
      dynamicStyles.featuredMetaText,
      dynamicStyles.featuredTitleText,
    ],
  );

  const renderPosterCard = useCallback(
    (item: MovieCardProps) => (
      <HomePosterCardComponent
        item={item}
        metaStyle={dynamicStyles.posterCardMetaText}
        surfaceStyle={dynamicStyles.posterCardSurface}
        titleStyle={dynamicStyles.posterCardTitleText}
      />
    ),
    [
      dynamicStyles.posterCardMetaText,
      dynamicStyles.posterCardSurface,
      dynamicStyles.posterCardTitleText,
    ],
  );

  const listHeader = useMemo(
    () => (
      <Stack gap="2xl" style={styles.headerContent}>
        <AppView style={[styles.heroSurface, dynamicStyles.heroSurface]}>
          {heroBanner?.backgroundImageSource ? (
            <AppImage
              contentFit="cover"
              showErrorState={false}
              showLoadingState={false}
              source={heroBanner.backgroundImageSource}
              style={[styles.heroMedia, dynamicStyles.heroSurface]}
              transitionDuration={heroBanner.backgroundImageTransitionDuration}
            />
          ) : (
            <AppView style={[styles.heroMedia, dynamicStyles.heroSurface]} />
          )}
          <AbsoluteFill>
            <AppView style={dynamicStyles.heroOverlayTop} />
            <AppView style={dynamicStyles.heroOverlayMiddle} />
            <AppView style={dynamicStyles.heroOverlayBottom} />
          </AbsoluteFill>
          <AbsoluteFill style={styles.fill}>
            <AppView style={styles.heroContent}>
              <Container paddingTop="md">
                <Row alignItems="center" gap="md" justifyContent="space-between">
                  <Row alignItems="center" gap="md">
                    <AppView
                      accessibilityHint={APP_STRINGS.home.menuAccessibilityHint}
                      accessibilityLabel={APP_STRINGS.home.menuAccessibilityLabel}
                      accessibilityRole="button"
                      center
                      onPress={onMenuPress}
                      padding="xs"
                      radius="full"
                      style={styles.menuButton}
                    >
                      <Stack gap="xs" style={styles.menuIcon}>
                        <AppView style={[styles.menuLine, dynamicStyles.menuLineFill]} />
                        <AppView style={[styles.menuLineShort, dynamicStyles.menuLineFill]} />
                        <AppView style={[styles.menuLine, dynamicStyles.menuLineFill]} />
                      </Stack>
                    </AppView>
                    <AppText numberOfLines={1} style={dynamicStyles.titleText} variant="title">
                      {headerTitle}
                    </AppText>
                  </Row>
                  {profileAccessory}
                </Row>
              </Container>
              <Container paddingBottom="xl">
                <Stack gap="lg">
                  {heroBanner?.badgeLabel ? (
                    <AppView
                      alignItems="center"
                      justifyContent="center"
                      radius="full"
                      style={[styles.heroMetaBadge, dynamicStyles.heroBadgeSurface]}
                    >
                      <AppText style={dynamicStyles.heroBadgeText} variant="overline">
                        {heroBanner.badgeLabel}
                      </AppText>
                    </AppView>
                  ) : null}
                  {heroBanner ? (
                    <Stack gap="md">
                      <Stack gap="sm">
                        <AppText numberOfLines={3} style={dynamicStyles.heroTitleText}>
                          {heroBanner.title}
                        </AppText>
                        {heroMetadataLabel ? (
                          <AppText style={dynamicStyles.heroMetaText}>
                            {heroMetadataLabel}
                          </AppText>
                        ) : null}
                      </Stack>
                      <Stack gap="md">
                        {heroBanner.primaryActionLabel ? (
                          <HomeActionButtonComponent
                            accessibilityHint={APP_STRINGS.components.button.primaryAccessibilityHint}
                            accessibilityLabel={heroBanner.primaryActionLabel}
                            iconColor={homeColors.white}
                            iconName="play"
                            label={heroBanner.primaryActionLabel}
                            onPress={heroBanner.onPrimaryAction}
                            surfaceStyle={dynamicStyles.heroPrimaryActionSurface}
                            textStyle={dynamicStyles.heroPrimaryActionText}
                          />
                        ) : null}
                        {heroBanner.secondaryActionLabel ? (
                          <HomeActionButtonComponent
                            accessibilityHint={APP_STRINGS.components.button.ghostAccessibilityHint}
                            accessibilityLabel={heroBanner.secondaryActionLabel}
                            iconColor={homeColors.textPrimary}
                            iconName="plus"
                            label={heroBanner.secondaryActionLabel}
                            onPress={heroBanner.onSecondaryAction}
                            surfaceStyle={dynamicStyles.heroSecondaryActionSurface}
                            textStyle={dynamicStyles.heroSecondaryActionText}
                          />
                        ) : null}
                      </Stack>
                    </Stack>
                  ) : null}
                </Stack>
              </Container>
            </AppView>
          </AbsoluteFill>
        </AppView>
        {categoryItems.length > 0 ? (
          <Container>
            <Stack gap="md">
              <AppText style={dynamicStyles.sectionTitleText} variant="subtitle">
                {APP_STRINGS.home.categoriesSection}
              </AppText>
              <ContentCarousel
                contentPaddingHorizontal="none"
                data={categoryItems}
                itemGap="sm"
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryChip}
              />
            </Stack>
          </Container>
        ) : null}
        {featuredRailSection ? (
          <Container>
            <Stack gap="lg">
              <HomeSectionHeaderComponent
                actionIconColor={homeColors.primary}
                actionIconName="chevron-right"
                actionSurfaceStyle={dynamicStyles.sectionActionSurface}
                subtitle={featuredRailSection.subtitle}
                subtitleStyle={dynamicStyles.sectionDescriptionText}
                title={featuredRailSection.title}
                titleStyle={dynamicStyles.sectionTitleText}
              />
              {featuredRailSection.items.length > 0 ? (
                <ContentCarousel
                  contentPaddingHorizontal="none"
                  data={featuredRailSection.items}
                  itemWidth={HOME_FEATURED_RAIL_ITEM_WIDTH}
                  keyExtractor={(item, index) => item.id ?? item.title ?? `featured-${index}`}
                  renderItem={renderFeaturedRailCard}
                />
              ) : (
                <HomeSectionSkeletonComponent />
              )}
            </Stack>
          </Container>
        ) : null}
      </Stack>
    ),
    [
      categoryItems,
      dynamicStyles.categoryChipActive,
      dynamicStyles.categoryChipInactive,
      dynamicStyles.categoryChipLabelActive,
      dynamicStyles.categoryChipLabelInactive,
      dynamicStyles.heroBadgeSurface,
      dynamicStyles.heroBadgeText,
      dynamicStyles.heroMetaText,
      dynamicStyles.heroOverlayBottom,
      dynamicStyles.heroOverlayMiddle,
      dynamicStyles.heroOverlayTop,
      dynamicStyles.heroPrimaryActionSurface,
      dynamicStyles.heroPrimaryActionText,
      dynamicStyles.heroSecondaryActionSurface,
      dynamicStyles.heroSecondaryActionText,
      dynamicStyles.heroSurface,
      dynamicStyles.heroTitleText,
      dynamicStyles.sectionActionSurface,
      dynamicStyles.sectionDescriptionText,
      dynamicStyles.sectionTitleText,
      dynamicStyles.titleText,
      featuredRailSection,
      headerTitle,
      heroBanner,
      heroMetadataLabel,
      homeColors.primary,
      homeColors.white,
      onMenuPress,
      profileAccessory,
      renderCategoryChip,
      renderFeaturedRailCard,
    ],
  );

  const keyExtractor = useCallback((item: HomeSectionItem) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: HomeSectionItem }) => {
      if (item.isLoading && item.items.length === 0) {
        return <HomeSectionSkeletonComponent />;
      }

      if (item.items.length === 0) {
        return null;
      }

      return (
        <Container>
          <Stack gap="lg">
            <HomeSectionHeaderComponent
              actionIconColor={homeColors.primary}
              actionIconName="chevron-right"
              actionSurfaceStyle={dynamicStyles.sectionActionSurface}
              subtitle={item.subtitle}
              subtitleStyle={dynamicStyles.sectionDescriptionText}
              title={item.title}
              titleStyle={dynamicStyles.sectionTitleText}
            />
            <ContentCarousel
              contentPaddingHorizontal="none"
              data={item.items}
              itemWidth={HOME_POSTER_RAIL_ITEM_WIDTH}
              keyExtractor={(movie, index) => movie.id ?? movie.title ?? `poster-${index}`}
              listFooterComponent={
                item.isLoadingMore ? <HomeLoadMoreFooterComponent /> : undefined
              }
              onEndReached={item.onEndReached}
              onEndReachedThreshold={0.6}
              renderItem={renderPosterCard}
            />
          </Stack>
        </Container>
      );
    },
    [
      dynamicStyles.posterCardMetaText,
      dynamicStyles.posterCardSurface,
      dynamicStyles.posterCardTitleText,
      dynamicStyles.sectionActionSurface,
      dynamicStyles.sectionDescriptionText,
      dynamicStyles.sectionTitleText,
      homeColors.primary,
      renderPosterCard,
    ],
  );

  if (isInitialContentLoading) {
    return (
      <Screen
        backgroundColorToken={homeBackgroundToken}
        paddingHorizontal={undefined}
        safeAreaEdges={HOME_SAFE_AREA_EDGES}
      >
        <StatusBar style={statusBarStyle} />
        <HomeSkeletonLayoutComponent contentContainerStyle={dynamicStyles.listContent} />
      </Screen>
    );
  }

  if (errorTitle && errorDescription) {
    return (
      <Screen
        backgroundColorToken={homeBackgroundToken}
        paddingHorizontal={undefined}
        safeAreaEdges={HOME_SAFE_AREA_EDGES}
      >
        <StatusBar style={statusBarStyle} />
        <ErrorView description={errorDescription} onRetry={onRetry} title={errorTitle} />
      </Screen>
    );
  }

  if (isEmpty) {
    return (
      <Screen
        backgroundColorToken={homeBackgroundToken}
        paddingHorizontal={undefined}
        safeAreaEdges={HOME_SAFE_AREA_EDGES}
      >
        <StatusBar style={statusBarStyle} />
        <EmptyView
          actionLabel={APP_STRINGS.common.retry}
          description={APP_STRINGS.components.stateView.emptyDescription}
          illustration={emptyIllustration}
          onAction={onRetry}
          title={APP_STRINGS.components.stateView.emptyTitle}
        />
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColorToken={homeBackgroundToken}
      paddingHorizontal={undefined}
      safeAreaEdges={HOME_SAFE_AREA_EDGES}
    >
      <StatusBar style={statusBarStyle} />
      <AnimatedAppView style={[styles.fill, animatedContentStyle]}>
        <AppFlatList
          ListHeaderComponent={listHeader}
          contentGap="2xl"
          contentContainerStyle={[styles.listContent, dynamicStyles.listContent]}
          data={posterSections}
          keyExtractor={keyExtractor}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          removeClippedSubviews
          renderItem={renderItem}
          style={styles.fill}
        />
      </AnimatedAppView>
    </Screen>
  );
};

HomeViewComponent.displayName = 'HomeView';

export const HomeView = memo(HomeViewComponent);
