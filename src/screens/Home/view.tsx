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
import { APP_STRINGS, TMDB_HOME_SECTION_ORDER, type TmdbHomeSectionKey } from '../../constants';

import {
  createDynamicStyles,
  HOME_FEATURED_RAIL_ITEM_WIDTH,
  HOME_POSTER_RAIL_ITEM_WIDTH,
  styles,
} from './styles';

const AnimatedAppView = Animated.createAnimatedComponent(AppView);

const HOME_SAFE_AREA_EDGES = ['top'] as const;
const HOME_CATEGORY_SKELETON_ITEMS = [
  {
    id: 'home-category-skeleton-1',
    width: moderateScale(104),
  },
  {
    id: 'home-category-skeleton-2',
    width: moderateScale(92),
  },
  {
    id: 'home-category-skeleton-3',
    width: moderateScale(110),
  },
  {
    id: 'home-category-skeleton-4',
    width: moderateScale(98),
  },
] as const;
const HOME_POSTER_SKELETON_ITEMS = [
  'home-poster-skeleton-1',
  'home-poster-skeleton-2',
  'home-poster-skeleton-3',
] as const;
const HOME_SECTION_SKELETON_ITEMS = TMDB_HOME_SECTION_ORDER.map(
  (sectionKey) => `home-section-skeleton-${sectionKey}`,
);

interface HomeCategorySkeletonItem {
  readonly id: string;
  readonly width: number;
}

export interface HomeCategoryChipItem {
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
  readonly sectionKey: TmdbHomeSectionKey;
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
  readonly categoryErrorDescription?: string;
  readonly categoryErrorTitle?: string;
  readonly categoryItems: ReadonlyArray<HomeCategoryChipItem>;
  readonly errorDescription?: string;
  readonly errorTitle?: string;
  readonly headerTitle: string;
  readonly heroBanner: HomeHeroBannerViewModel | null;
  readonly isCategoriesLoading: boolean;
  readonly isEmpty: boolean;
  readonly isGenreSelectionEmpty: boolean;
  readonly isInitialContentLoading: boolean;
  readonly isRefreshing: boolean;
  readonly onCategoryRetry: () => void;
  readonly onCategorySelect: (categoryId: string) => void;
  readonly onMenuPress: () => void;
  readonly onProfilePress: () => void;
  readonly onRefresh: () => void;
  readonly onRetry: () => void;
  readonly onSectionPress: (section: HomeSectionItem) => void;
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
  readonly actionAccessibilityLabel: string;
  readonly onActionPress?: () => void;
  readonly actionSurfaceStyle: StyleProp<ViewStyle>;
  readonly subtitle?: string;
  readonly subtitleStyle: StyleProp<TextStyle>;
  readonly title: string;
  readonly titleStyle: StyleProp<TextStyle>;
}

const HomeSectionHeaderComponent = ({
  actionIconColor,
  actionAccessibilityLabel,
  actionIconName,
  onActionPress,
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
        accessibilityHint={APP_STRINGS.home.sectionActionAccessibilityHint}
        accessibilityLabel={actionAccessibilityLabel}
        accessibilityRole={onActionPress ? 'button' : undefined}
        alignItems="center"
        justifyContent="center"
        onPress={onActionPress}
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
  readonly accessibilityLabel: string;
  readonly label: string;
  readonly labelStyle: StyleProp<TextStyle>;
  readonly onPress?: () => void;
  readonly selected?: boolean;
  readonly surfaceStyle: StyleProp<ViewStyle>;
}

const HomeCategoryChipComponent = ({
  accessibilityLabel,
  label,
  labelStyle,
  onPress,
  selected = false,
  surfaceStyle,
}: HomeCategoryChipProps) => {
  return (
    <AppView
      accessibilityHint={APP_STRINGS.components.button.chipAccessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={onPress ? { selected } : undefined}
      alignItems="center"
      justifyContent="center"
      onPress={onPress}
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

interface HomeInlineStateProps {
  readonly actionLabel?: string;
  readonly actionLabelStyle?: StyleProp<TextStyle>;
  readonly actionSurfaceStyle?: StyleProp<ViewStyle>;
  readonly description: string;
  readonly descriptionStyle: StyleProp<TextStyle>;
  readonly onAction?: () => void;
  readonly title?: string;
  readonly titleStyle: StyleProp<TextStyle>;
}

const HomeInlineStateComponent = ({
  actionLabel,
  actionLabelStyle,
  actionSurfaceStyle,
  description,
  descriptionStyle,
  onAction,
  title,
  titleStyle,
}: HomeInlineStateProps) => {
  return (
    <Stack gap="md">
      {title ? (
        <AppText style={titleStyle} variant="label">
          {title}
        </AppText>
      ) : null}
      <AppText style={descriptionStyle}>
        {description}
      </AppText>
      {actionLabel && onAction && actionLabelStyle && actionSurfaceStyle ? (
        <HomeCategoryChipComponent
          accessibilityLabel={actionLabel}
          label={actionLabel}
          labelStyle={actionLabelStyle}
          onPress={onAction}
          selected
          surfaceStyle={[styles.categoryFeedbackAction, actionSurfaceStyle]}
        />
      ) : null}
    </Stack>
  );
};

HomeInlineStateComponent.displayName = 'HomeInlineState';

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

const HomeCategorySkeletonComponent = () => {
  const keyExtractor = useCallback((item: HomeCategorySkeletonItem) => item.id, []);

  const renderItem = useCallback(
    (item: HomeCategorySkeletonItem) => (
      <SkeletonBlock
        height={styles.categoryChipSkeleton.height as number}
        radius={(styles.categoryChipSkeleton.height as number) / 2}
        style={styles.categoryChipSkeleton}
        width={item.width}
      />
    ),
    [],
  );

  return (
    <Container>
      <Stack gap="md">
        <SkeletonBlock
          height={styles.sectionTitleSkeleton.height as number}
          style={styles.sectionTitleSkeleton}
          width={styles.sectionTitleSkeleton.width}
        />
        <ContentCarousel
          contentPaddingHorizontal="none"
          data={HOME_CATEGORY_SKELETON_ITEMS}
          itemGap="sm"
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Stack>
    </Container>
  );
};

HomeCategorySkeletonComponent.displayName = 'HomeCategorySkeleton';

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
      <Stack gap="2xl" style={styles.headerContent}>
        <HomeHeaderSkeletonComponent />
        <HomeHeroSkeletonComponent />
        <HomeCategorySkeletonComponent />
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
  categoryErrorDescription,
  categoryErrorTitle,
  categoryItems,
  errorDescription,
  errorTitle,
  headerTitle,
  heroBanner,
  isCategoriesLoading,
  isEmpty,
  isGenreSelectionEmpty,
  isInitialContentLoading,
  isRefreshing,
  onCategoryRetry,
  onCategorySelect,
  onMenuPress,
  onProfilePress,
  onRefresh,
  onRetry,
  onSectionPress,
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

  const categoryKeyExtractor = useCallback((item: HomeCategoryChipItem) => item.id, []);

  const renderCategoryChip = useCallback(
    (item: HomeCategoryChipItem) => (
      <HomeCategoryChipComponent
        accessibilityLabel={item.label}
        label={item.label}
        labelStyle={
          item.isSelected
            ? dynamicStyles.categoryChipLabelActive
            : dynamicStyles.categoryChipLabelInactive
        }
        onPress={() => {
          onCategorySelect(item.id);
        }}
        selected={item.isSelected}
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
      onCategorySelect,
    ],
  );

  const categorySection = useMemo(() => {
    if (isCategoriesLoading) {
      return <HomeCategorySkeletonComponent />;
    }

    if (categoryItems.length > 0) {
      return (
        <Container>
          <Stack gap="md">
            <AppText style={dynamicStyles.sectionTitleText} variant="subtitle">
              {APP_STRINGS.home.categoriesSection}
            </AppText>
            <ContentCarousel
              contentPaddingHorizontal="none"
              data={categoryItems}
              itemGap="sm"
              keyExtractor={categoryKeyExtractor}
              renderItem={renderCategoryChip}
            />
          </Stack>
        </Container>
      );
    }

    if (categoryErrorDescription) {
      return (
        <Container>
          <Stack gap="md">
            <AppText style={dynamicStyles.sectionTitleText} variant="subtitle">
              {APP_STRINGS.home.categoriesSection}
            </AppText>
            <HomeInlineStateComponent
              actionLabel={APP_STRINGS.common.retry}
              actionLabelStyle={dynamicStyles.categoryChipLabelActive}
              actionSurfaceStyle={dynamicStyles.categoryChipActive}
              description={categoryErrorDescription}
              descriptionStyle={dynamicStyles.sectionDescriptionText}
              onAction={onCategoryRetry}
              title={categoryErrorTitle}
              titleStyle={dynamicStyles.sectionTitleText}
            />
          </Stack>
        </Container>
      );
    }

    return (
      <Container>
        <Stack gap="md">
          <AppText style={dynamicStyles.sectionTitleText} variant="subtitle">
            {APP_STRINGS.home.categoriesSection}
          </AppText>
          <HomeInlineStateComponent
            description={APP_STRINGS.home.categoriesEmptyDescription}
            descriptionStyle={dynamicStyles.sectionDescriptionText}
            titleStyle={dynamicStyles.sectionTitleText}
          />
        </Stack>
      </Container>
    );
  }, [
    categoryErrorDescription,
    categoryErrorTitle,
    categoryItems,
    categoryKeyExtractor,
    dynamicStyles.categoryChipActive,
    dynamicStyles.categoryChipLabelActive,
    dynamicStyles.sectionDescriptionText,
    dynamicStyles.sectionTitleText,
    isCategoriesLoading,
    onCategoryRetry,
    renderCategoryChip,
  ]);

  const genreEmptyState = useMemo(() => {
    if (!isGenreSelectionEmpty) {
      return null;
    }

    return (
      <Container>
        <HomeInlineStateComponent
          description={APP_STRINGS.home.genreEmptyDescription}
          descriptionStyle={dynamicStyles.sectionDescriptionText}
          title={APP_STRINGS.home.genreEmptyTitle}
          titleStyle={dynamicStyles.sectionTitleText}
        />
      </Container>
    );
  }, [
    dynamicStyles.sectionDescriptionText,
    dynamicStyles.sectionTitleText,
    isGenreSelectionEmpty,
  ]);

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
          <AbsoluteFill style={styles.fill}>
            <AppView style={styles.heroContent}>
              <Container paddingTop="md">
                <Row alignItems="center" gap="md" justifyContent="space-between">
                  <Row alignItems="center" gap="md">
                    <AppText numberOfLines={1} style={dynamicStyles.titleText} variant="title">
                      {headerTitle}
                    </AppText>
                  </Row>
                  {profileAccessory}
                </Row>
              </Container>
              <Container paddingBottom="xl">
                <Stack gap="lg">
                  {heroBanner ? (
                    <Stack gap="md" style={[styles.heroCopyPanel, dynamicStyles.heroCopyPanel]}>
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
                            iconColor={homeColors.black}
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
      </Stack>
    ),
    [
      categorySection,
      dynamicStyles.heroBadgeSurface,
      dynamicStyles.heroBadgeText,
      dynamicStyles.heroCopyPanel,
      dynamicStyles.heroMetaText,
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
      genreEmptyState,
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
              actionAccessibilityLabel={item.title}
              actionIconColor={homeColors.primary}
              actionIconName="chevron-right"
              onActionPress={() => {
                onSectionPress(item);
              }}
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
      onSectionPress,
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
