import React, { memo, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeIn,
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppFlatList,
  AppImage,
  AppModal,
  AppScrollView,
  AppText,
  AppView,
} from '../../components/base';
import { ErrorView, SkeletonPoster, SkeletonRow } from '../../components/feedback';
import { SkeletonBlock } from '../../components/feedback/shared';
import { AbsoluteFill, Card, Container, Row, Screen, Stack } from '../../components/layout';
import {
  Badge,
  CastSection,
  ContentCarousel,
  GhostButton,
  InformationRow,
  PrimaryButton,
  TrendingSection,
  type CastMember,
  type MovieCardProps,
} from '../../components/ui';
import { AppIcon, type IconName } from '../../components/ui/shared';
import { APP_STRINGS } from '../../constants';
import { useTheme } from '../../theme';
import { moderateScale, screenWidth } from '../../utils';

import { createDynamicStyles, styles } from './styles';

const DETAILS_SAFE_AREA_EDGES = ['bottom'] as const;
const OVERVIEW_COLLAPSED_LINES = 5;
const OVERVIEW_TOGGLE_THRESHOLD = 220;
const FOOTER_BUTTON_HEIGHT = moderateScale(56);

export type DetailsTabKey =
  | 'details'
  | 'cast'
  | 'similar'
  | 'recommended'
  | 'gallery';

export interface DetailHeroPill {
  readonly iconName?: IconName;
  readonly id: string;
  readonly label: string;
  readonly tone?: 'neutral' | 'primary';
}

export interface DetailTabItem {
  readonly key: DetailsTabKey;
  readonly label: string;
}

export interface DetailInformationItem {
  readonly id: string;
  readonly label: string;
  readonly value: string;
}

export interface DetailTrailerCard {
  readonly imageUrl: string;
  readonly subtitle?: string;
  readonly title: string;
}

export interface DetailGalleryCard {
  readonly aspectRatio: number;
  readonly id: string;
  readonly imageUrl: string;
}

export interface DetailMovieCardItem extends MovieCardProps {
  readonly id: string;
}

export interface DetailsViewProps {
  readonly castItems: ReadonlyArray<CastMember>;
  readonly errorDescription?: string;
  readonly errorTitle?: string;
  readonly footerActionDisabled: boolean;
  readonly galleryInitialIndex: number;
  readonly galleryItems: ReadonlyArray<DetailGalleryCard>;
  readonly heroBackdropUrl: string;
  readonly heroMetadataLabel?: string;
  readonly heroPills: ReadonlyArray<DetailHeroPill>;
  readonly heroTitle: string;
  readonly informationItems: ReadonlyArray<DetailInformationItem>;
  readonly isFavorite: boolean;
  readonly isGalleryVisible: boolean;
  readonly isLoading: boolean;
  readonly isOverviewExpanded: boolean;
  readonly isRefreshing: boolean;
  readonly onBackPress: () => void;
  readonly onCloseGallery: () => void;
  readonly onFooterActionPress?: () => void;
  readonly onGalleryImagePress: (index: number) => void;
  readonly onOverviewToggle: () => void;
  readonly onRefresh: () => void;
  readonly onRetry: () => void;
  readonly onSelectTab: (tabKey: DetailsTabKey) => void;
  readonly onSharePress: () => void;
  readonly onToggleFavorite: () => void;
  readonly onTrailerActionPress?: () => void;
  readonly overview: string;
  readonly recommendedItems: ReadonlyArray<DetailMovieCardItem>;
  readonly selectedTab: DetailsTabKey;
  readonly similarItems: ReadonlyArray<DetailMovieCardItem>;
  readonly tabItems: ReadonlyArray<DetailTabItem>;
  readonly trailerActionDisabled: boolean;
  readonly trailerCard: DetailTrailerCard | null;
}

interface DetailsContentItem {
  readonly id: DetailsTabKey;
}

interface ActionCircleButtonProps {
  readonly accessibilityHint?: string;
  readonly accessibilityLabel: string;
  readonly iconColor: string;
  readonly iconName: IconName;
  readonly onPress: () => void;
  readonly selected?: boolean;
}

interface SectionEmptyStateCardProps {
  readonly description: string;
  readonly title: string;
}

const ActionCircleButtonComponent = ({
  accessibilityHint,
  accessibilityLabel,
  iconColor,
  iconName,
  onPress,
  selected = false,
}: ActionCircleButtonProps) => {
  return (
    <AppView
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      alignItems="center"
      backgroundColorToken={selected ? 'primaryContainer' : 'glassOverlay'}
      borderColorToken={selected ? 'primaryContainer' : 'divider'}
      borderWidth={1}
      center
      onPress={onPress}
      padding="md"
      radius="full"
    >
      <AppIcon color={iconColor} name={iconName} size={moderateScale(20)} />
    </AppView>
  );
};

ActionCircleButtonComponent.displayName = 'ActionCircleButton';

const SectionEmptyStateCardComponent = ({
  description,
  title,
}: SectionEmptyStateCardProps) => {
  const { colors } = useTheme();

  return (
    <Card
      alignItems="center"
      bordered={false}
      gap="md"
      padding="xl"
      style={styles.sectionEmptyCard}
      variant="secondary"
    >
      <AppView
        alignItems="center"
        backgroundColorToken="surfaceHigh"
        center
        radius="full"
        style={styles.sectionEmptyIconContainer}
      >
        <AppIcon color={colors.primary} name="info" size={moderateScale(24)} />
      </AppView>
      <Stack gap="xs">
        <AppText align="center" variant="subtitle">
          {title}
        </AppText>
        <AppText align="center" colorToken="textSecondary">
          {description}
        </AppText>
      </Stack>
    </Card>
  );
};

SectionEmptyStateCardComponent.displayName = 'SectionEmptyStateCard';

const DetailsSkeletonViewComponent = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const heroHeight = Math.max(
    moderateScale(420),
    Math.min(screenWidth * 1.2, moderateScale(540)),
  );
  const galleryCardWidth = Math.min(
    screenWidth - moderateScale(88),
    moderateScale(304),
  );
  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles({
        footerBottomOffset: insets.bottom + theme.spacing.md,
        footerHeight: FOOTER_BUTTON_HEIGHT,
        galleryCardWidth,
        heroHeight,
        modalImageWidth: screenWidth,
        theme,
      }),
    [galleryCardWidth, heroHeight, insets.bottom, theme],
  );

  return (
    <Screen
      backgroundColorToken="background"
      footer={
        <Container style={dynamicStyles.footerContainer}>
          <SkeletonBlock
            height={FOOTER_BUTTON_HEIGHT}
            style={dynamicStyles.skeletonFooter}
          />
        </Container>
      }
      paddingHorizontal={undefined}
      safeAreaEdges={DETAILS_SAFE_AREA_EDGES}
    >
      <StatusBar style="light" />
      <AppFlatList
        contentContainerStyle={dynamicStyles.footerSpacer}
        data={[{ id: 'details-skeleton' }]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <Stack gap="xl">
            <SkeletonBlock style={dynamicStyles.skeletonHero} height={heroHeight} />
            <Container>
              <Stack gap="xl" style={dynamicStyles.bodyContainer}>
                <Stack gap="sm">
                  <Row gap="sm">
                    <SkeletonBlock height={moderateScale(30)} width="26%" />
                    <SkeletonBlock height={moderateScale(30)} width="32%" />
                  </Row>
                  <SkeletonBlock
                    height={dynamicStyles.skeletonTitleLine.height as number}
                    width="52%"
                  />
                  <SkeletonBlock
                    height={dynamicStyles.skeletonMetadataLine.height as number}
                    width="74%"
                  />
                </Stack>
                <Stack gap="md">
                  <SkeletonBlock height={moderateScale(26)} width="34%" />
                  <SkeletonBlock height={moderateScale(18)} width="100%" />
                  <SkeletonBlock height={moderateScale(18)} width="94%" />
                  <SkeletonBlock height={moderateScale(18)} width="88%" />
                  <SkeletonBlock height={moderateScale(18)} width="66%" />
                </Stack>
                <Row gap="md" style={dynamicStyles.skeletonActionRow}>
                  <SkeletonBlock
                    height={moderateScale(48)}
                    style={dynamicStyles.skeletonActionButton}
                  />
                  <SkeletonBlock
                    height={moderateScale(48)}
                    style={dynamicStyles.skeletonActionButton}
                  />
                </Row>
                <AppScrollView horizontal contentGap="md" showsHorizontalScrollIndicator={false}>
                  <SkeletonBlock height={moderateScale(22)} width={moderateScale(92)} />
                  <SkeletonBlock height={moderateScale(22)} width={moderateScale(104)} />
                  <SkeletonBlock height={moderateScale(22)} width={moderateScale(96)} />
                  <SkeletonBlock height={moderateScale(22)} width={moderateScale(110)} />
                </AppScrollView>
                <Stack gap="lg">
                  <SkeletonBlock
                    height={moderateScale(26)}
                    width="40%"
                  />
                  <SkeletonBlock
                    height={moderateScale(220)}
                    width="100%"
                  />
                  <SkeletonRow />
                  <SkeletonRow />
                </Stack>
                <Stack gap="md">
                  <SkeletonBlock height={moderateScale(26)} width="48%" />
                  <AppScrollView horizontal contentGap="md" showsHorizontalScrollIndicator={false}>
                    <AppView style={dynamicStyles.skeletonGalleryCard}>
                      <SkeletonPoster />
                    </AppView>
                    <AppView style={dynamicStyles.skeletonGalleryCard}>
                      <SkeletonPoster />
                    </AppView>
                  </AppScrollView>
                </Stack>
              </Stack>
            </Container>
          </Stack>
        )}
        style={styles.fill}
      />
    </Screen>
  );
};

DetailsSkeletonViewComponent.displayName = 'DetailsSkeletonView';

const DetailsViewComponent = ({
  castItems,
  errorDescription,
  errorTitle,
  footerActionDisabled,
  galleryInitialIndex,
  galleryItems,
  heroBackdropUrl,
  heroMetadataLabel,
  heroPills,
  heroTitle,
  informationItems,
  isFavorite,
  isGalleryVisible,
  isLoading,
  isOverviewExpanded,
  isRefreshing,
  onBackPress,
  onCloseGallery,
  onFooterActionPress,
  onGalleryImagePress,
  onOverviewToggle,
  onRefresh,
  onRetry,
  onSelectTab,
  onSharePress,
  onToggleFavorite,
  onTrailerActionPress,
  overview,
  recommendedItems,
  selectedTab,
  similarItems,
  tabItems,
  trailerActionDisabled,
  trailerCard,
}: DetailsViewProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { animation, colors, spacing } = theme;
  const heroHeight = useMemo(
    () =>
      Math.max(
        moderateScale(420),
        Math.min(screenWidth * 1.24, moderateScale(560)),
      ),
    [],
  );
  const galleryCardWidth = useMemo(
    () => Math.min(screenWidth - moderateScale(88), moderateScale(304)),
    [],
  );
  const footerBottomOffset = insets.bottom + spacing.md;
  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles({
        footerBottomOffset,
        footerHeight: FOOTER_BUTTON_HEIGHT,
        galleryCardWidth,
        heroHeight,
        modalImageWidth: screenWidth,
        theme,
      }),
    [footerBottomOffset, galleryCardWidth, heroHeight, theme],
  );

  const hasOverviewToggle = overview.length > OVERVIEW_TOGGLE_THRESHOLD;
  const contentData = useMemo<ReadonlyArray<DetailsContentItem>>(
    () => [{ id: selectedTab }],
    [selectedTab],
  );

  const galleryKeyExtractor = useCallback(
    (item: DetailGalleryCard) => item.id,
    [],
  );

  const renderHeroPill = useCallback(
    (item: DetailHeroPill) => (
      <Badge
        key={item.id}
        label={item.label}
        leadingIcon={
          item.iconName ? (
            <AppIcon
              color={item.tone === 'primary' ? colors.onPrimaryContainer : colors.textPrimary}
              name={item.iconName}
              size={moderateScale(14)}
            />
          ) : undefined
        }
        tone={item.tone ?? 'neutral'}
      />
    ),
    [colors.onPrimaryContainer, colors.textPrimary],
  );

  const renderTabItem = useCallback(
    (item: DetailTabItem) => {
      const isActive = item.key === selectedTab;

      return (
        <AppView
          accessibilityLabel={item.label}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
          key={item.key}
          onPress={() => {
            onSelectTab(item.key);
          }}
          style={dynamicStyles.tabItem}
        >
          <AppText colorToken={isActive ? 'primary' : 'textSecondary'} variant="label">
            {item.label}
          </AppText>
          {isActive ? (
            <AppView
              backgroundColorToken="primaryContainer"
              style={dynamicStyles.tabIndicator}
            />
          ) : null}
        </AppView>
      );
    },
    [dynamicStyles.tabIndicator, dynamicStyles.tabItem, onSelectTab, selectedTab],
  );

  const renderGalleryItem = useCallback(
    (item: DetailGalleryCard, index: number) => (
      <AppView
        accessibilityLabel={`${heroTitle} gallery image ${index + 1}`}
        accessibilityRole="button"
        key={item.id}
        onPress={() => {
          onGalleryImagePress(index);
        }}
        radius="md"
        style={dynamicStyles.galleryCard}
      >
        <AppImage
          contentFit="cover"
          showLoadingState={false}
          source={{ uri: item.imageUrl }}
          style={styles.absoluteFill}
          transitionDuration={animation.duration.slow}
        />
      </AppView>
    ),
    [animation.duration.slow, dynamicStyles.galleryCard, heroTitle, onGalleryImagePress],
  );

  const galleryGetItemLayout = useCallback(
    (_data: ArrayLike<DetailGalleryCard> | null | undefined, index: number) => ({
      index,
      length: screenWidth,
      offset: screenWidth * index,
    }),
    [],
  );

  const footerComponent = useMemo(
    () => (
      <Container style={dynamicStyles.footerContainer}>
        <AppView style={dynamicStyles.footerButtonShadow}>
          <PrimaryButton
            disabled={footerActionDisabled}
            fullWidth
            icon={<AppIcon color={colors.onPrimary} name="play" size={moderateScale(18)} />}
            label={APP_STRINGS.details.playAction}
            onPress={onFooterActionPress}
          />
        </AppView>
      </Container>
    ),
    [
      colors.onPrimary,
      dynamicStyles.footerButtonShadow,
      dynamicStyles.footerContainer,
      footerActionDisabled,
      onFooterActionPress,
    ],
  );

  const headerComponent = useMemo(
    () => (
      <>
        <AppView style={dynamicStyles.hero}>
          <AppImage
            contentFit="cover"
            showLoadingState={false}
            source={{ uri: heroBackdropUrl }}
            style={dynamicStyles.heroImage}
            transitionDuration={animation.duration.slow}
          />
          <AbsoluteFill style={[styles.absoluteFill, dynamicStyles.heroTopScrim]} />
          <AbsoluteFill style={[styles.absoluteFill, dynamicStyles.heroBottomScrim]} />
          <AppView
            pointerEvents="box-none"
            style={[
              dynamicStyles.heroTopRow,
              {
                paddingTop: insets.top + spacing.sm,
              },
            ]}
          >
            <Container>
              <Row alignItems="center" gap="md" justifyContent="space-between">
                <AppView style={dynamicStyles.iconButtonShadow}>
                  <ActionCircleButtonComponent
                    accessibilityHint={APP_STRINGS.components.navigation.backButtonAccessibilityHint}
                    accessibilityLabel={APP_STRINGS.components.navigation.backButtonAccessibilityLabel}
                    iconColor={colors.textInverse}
                    iconName="arrow-left"
                    onPress={onBackPress}
                  />
                </AppView>
                <Row gap="sm">
                  <AppView style={dynamicStyles.iconButtonShadow}>
                    <ActionCircleButtonComponent
                      accessibilityHint={
                        isFavorite
                          ? APP_STRINGS.details.removeFromFavoritesAccessibilityHint
                          : APP_STRINGS.details.addToFavoritesAccessibilityHint
                      }
                      accessibilityLabel={
                        isFavorite
                          ? APP_STRINGS.details.removeFromFavoritesAccessibilityLabel
                          : APP_STRINGS.details.addToFavoritesAccessibilityLabel
                      }
                      iconColor={
                        isFavorite
                          ? colors.onPrimaryContainer
                          : colors.textInverse
                      }
                      iconName="heart"
                      onPress={onToggleFavorite}
                      selected={isFavorite}
                    />
                  </AppView>
                  <AppView style={dynamicStyles.iconButtonShadow}>
                    <ActionCircleButtonComponent
                      accessibilityHint={APP_STRINGS.details.shareAccessibilityHint}
                      accessibilityLabel={APP_STRINGS.details.shareAccessibilityLabel}
                      iconColor={colors.textInverse}
                      iconName="share"
                      onPress={onSharePress}
                    />
                  </AppView>
                </Row>
              </Row>
            </Container>
          </AppView>
          <AppView style={dynamicStyles.heroContent}>
            <Container>
              <Animated.View
                entering={FadeInDown.duration(animation.duration.slow)}
                layout={LinearTransition.duration(animation.duration.normal)}
              >
                <Stack gap="lg" paddingBottom="xl">
                  <Row gap="sm" wrap="wrap">
                    {heroPills.map(renderHeroPill)}
                  </Row>
                  <Stack gap="sm">
                    <AppText style={dynamicStyles.heroTitle}>
                      {heroTitle}
                    </AppText>
                    {heroMetadataLabel ? (
                      <AppText style={dynamicStyles.heroMetadata}>
                        {heroMetadataLabel}
                      </AppText>
                    ) : null}
                  </Stack>
                </Stack>
              </Animated.View>
            </Container>
          </AppView>
        </AppView>
        <Container>
          <Animated.View entering={FadeIn.duration(animation.duration.normal)}>
            <Stack gap="xl" style={dynamicStyles.bodyContainer}>
              <Stack gap="md">
                <AppText colorToken="primary" variant="subtitle">
                  {APP_STRINGS.details.synopsisSection}
                </AppText>
                <Animated.View
                  layout={LinearTransition.duration(animation.duration.normal)}
                  style={!isOverviewExpanded ? styles.overviewCollapsed : undefined}
                >
                  <AppText
                    colorToken="textSecondary"
                    numberOfLines={isOverviewExpanded ? undefined : OVERVIEW_COLLAPSED_LINES}
                    variant="body"
                  >
                    {overview}
                  </AppText>
                </Animated.View>
                {hasOverviewToggle ? (
                  <AppView
                    accessibilityLabel={
                      isOverviewExpanded
                        ? APP_STRINGS.details.overviewReadLess
                        : APP_STRINGS.details.overviewReadMore
                    }
                    accessibilityRole="button"
                    onPress={onOverviewToggle}
                  >
                    <AppText colorToken="primary" variant="label">
                      {isOverviewExpanded
                        ? APP_STRINGS.details.overviewReadLess
                        : APP_STRINGS.details.overviewReadMore}
                    </AppText>
                  </AppView>
                ) : null}
              </Stack>
              <Row gap="md">
                <AppView style={dynamicStyles.actionButtonShadow}>
                  <GhostButton
                    disabled={trailerActionDisabled}
                    fullWidth
                    icon={<AppIcon color={colors.textPrimary} name="play" size={moderateScale(16)} />}
                    label={APP_STRINGS.details.trailerAction}
                    onPress={onTrailerActionPress}
                  />
                </AppView>
                <AppView style={dynamicStyles.actionButtonShadow}>
                  <GhostButton
                    disabled
                    fullWidth
                    icon={<AppIcon color={colors.textPrimary} name="download" size={moderateScale(16)} />}
                    label={APP_STRINGS.details.downloadAction}
                  />
                </AppView>
              </Row>
              <AppScrollView horizontal contentGap="sm" showsHorizontalScrollIndicator={false}>
                {tabItems.map(renderTabItem)}
              </AppScrollView>
            </Stack>
          </Animated.View>
        </Container>
      </>
    ),
    [
      animation.duration.normal,
      animation.duration.slow,
      colors.onPrimaryContainer,
      colors.textInverse,
      colors.textPrimary,
      dynamicStyles.actionButtonShadow,
      dynamicStyles.bodyContainer,
      dynamicStyles.hero,
      dynamicStyles.heroBottomScrim,
      dynamicStyles.heroContent,
      dynamicStyles.heroImage,
      dynamicStyles.heroMetadata,
      dynamicStyles.heroTitle,
      dynamicStyles.heroTopRow,
      dynamicStyles.heroTopScrim,
      dynamicStyles.iconButtonShadow,
      hasOverviewToggle,
      heroBackdropUrl,
      heroMetadataLabel,
      heroPills,
      heroTitle,
      insets.top,
      isFavorite,
      isOverviewExpanded,
      onBackPress,
      onOverviewToggle,
      onSelectTab,
      onSharePress,
      onToggleFavorite,
      onTrailerActionPress,
      overview,
      renderHeroPill,
      renderTabItem,
      spacing.sm,
      tabItems,
      trailerActionDisabled,
    ],
  );

  const renderSelectedTabContent = useCallback(() => {
    switch (selectedTab) {
      case 'cast':
        return castItems.length > 0 ? (
          <CastSection
            members={castItems}
            title={APP_STRINGS.details.castSection}
          />
        ) : (
          <SectionEmptyStateCardComponent
            description={APP_STRINGS.details.castEmptyDescription}
            title={APP_STRINGS.details.castEmptyTitle}
          />
        );
      case 'similar':
        return similarItems.length > 0 ? (
          <TrendingSection
            movies={similarItems}
            title={APP_STRINGS.details.similarSection}
          />
        ) : (
          <SectionEmptyStateCardComponent
            description={APP_STRINGS.details.similarEmptyDescription}
            title={APP_STRINGS.details.similarEmptyTitle}
          />
        );
      case 'recommended':
        return recommendedItems.length > 0 ? (
          <TrendingSection
            movies={recommendedItems}
            title={APP_STRINGS.details.recommendationsSection}
          />
        ) : (
          <SectionEmptyStateCardComponent
            description={APP_STRINGS.details.recommendedEmptyDescription}
            title={APP_STRINGS.details.recommendedEmptyTitle}
          />
        );
      case 'gallery':
        return galleryItems.length > 0 ? (
          <Stack gap="lg">
            <AppText variant="subtitle">{APP_STRINGS.details.gallerySection}</AppText>
            <ContentCarousel
              contentPaddingHorizontal="none"
              data={galleryItems}
              itemGap="md"
              itemWidth={galleryCardWidth}
              keyExtractor={galleryKeyExtractor}
              renderItem={renderGalleryItem}
            />
          </Stack>
        ) : (
          <SectionEmptyStateCardComponent
            description={APP_STRINGS.details.galleryEmptyDescription}
            title={APP_STRINGS.details.galleryEmptyTitle}
          />
        );
      case 'details':
      default:
        return (
          <Stack gap="lg">
            {trailerCard ? (
              <AppView
                accessibilityHint={
                  onTrailerActionPress
                    ? APP_STRINGS.components.cards.heroAccessibilityHint
                    : undefined
                }
                accessibilityLabel={trailerCard.title}
                accessibilityRole={onTrailerActionPress ? 'button' : undefined}
                onPress={onTrailerActionPress}
                radius="md"
                style={dynamicStyles.trailerCard}
              >
                <AppImage
                  contentFit="cover"
                  showLoadingState={false}
                  source={{ uri: trailerCard.imageUrl }}
                  style={dynamicStyles.trailerImage}
                  transitionDuration={animation.duration.slow}
                />
                <AbsoluteFill
                  style={[styles.absoluteFill, dynamicStyles.trailerOverlay]}
                />
                <AppView
                  alignItems="center"
                  backgroundColorToken="primaryContainer"
                  center
                  radius="full"
                  shadow="md"
                  style={dynamicStyles.trailerPlayButton}
                >
                  <AppIcon
                    color={colors.onPrimaryContainer}
                    name="play"
                    size={moderateScale(22)}
                  />
                </AppView>
                <Stack gap="xs" padding="lg" style={dynamicStyles.trailerCardContent}>
                  <Badge label={APP_STRINGS.details.trailerSection} tone="primary" />
                  <AppText colorToken="textInverse" variant="subtitle">
                    {trailerCard.title}
                  </AppText>
                  {trailerCard.subtitle ? (
                    <AppText colorToken="textInverse" numberOfLines={2}>
                      {trailerCard.subtitle}
                    </AppText>
                  ) : null}
                </Stack>
              </AppView>
            ) : (
              <SectionEmptyStateCardComponent
                description={APP_STRINGS.details.trailerEmptyDescription}
                title={APP_STRINGS.details.trailerEmptyTitle}
              />
            )}
            <Stack gap="md">
              <AppText variant="subtitle">{APP_STRINGS.details.informationSection}</AppText>
              {informationItems.map((item) => (
                <InformationRow
                  id={item.id}
                  key={item.id}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Stack>
          </Stack>
        );
    }
  }, [
    animation.duration.slow,
    castItems,
    colors.onPrimaryContainer,
    dynamicStyles.trailerCard,
    dynamicStyles.trailerCardContent,
    dynamicStyles.trailerImage,
    dynamicStyles.trailerOverlay,
    dynamicStyles.trailerPlayButton,
    galleryCardWidth,
    galleryItems,
    galleryKeyExtractor,
    informationItems,
    onTrailerActionPress,
    recommendedItems,
    renderGalleryItem,
    selectedTab,
    similarItems,
    trailerCard,
  ]);

  const renderContentItem = useCallback(
    ({ item }: { item: DetailsContentItem }) => (
      <Container>
        <Animated.View
          entering={FadeInDown.duration(animation.duration.normal)}
          key={item.id}
          layout={LinearTransition.duration(animation.duration.normal)}
          style={dynamicStyles.tabContentContainer}
        >
          {renderSelectedTabContent()}
        </Animated.View>
      </Container>
    ),
    [
      animation.duration.normal,
      dynamicStyles.tabContentContainer,
      renderSelectedTabContent,
    ],
  );

  if (isLoading) {
    return <DetailsSkeletonViewComponent />;
  }

  if (errorTitle && errorDescription) {
    return (
      <Screen
        backgroundColorToken="background"
        paddingHorizontal={undefined}
        safeAreaEdges={DETAILS_SAFE_AREA_EDGES}
      >
        <StatusBar style={theme.isDark ? 'light' : 'dark'} />
        <ErrorView description={errorDescription} onRetry={onRetry} title={errorTitle} />
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColorToken="background"
      footer={footerComponent}
      paddingHorizontal={undefined}
      safeAreaEdges={DETAILS_SAFE_AREA_EDGES}
    >
      <StatusBar style="light" />
      <AppFlatList
        ListHeaderComponent={headerComponent}
        contentContainerStyle={dynamicStyles.footerSpacer}
        data={contentData}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={renderContentItem}
        style={styles.fill}
      />
      <AppModal
        animationType="fade"
        onRequestClose={onCloseGallery}
        presentationStyle="fullScreen"
        transparent={false}
        visible={isGalleryVisible}
      >
        <AppView flex style={[styles.fill, dynamicStyles.galleryModalOverlay]}>
          <StatusBar style="light" />
          <Container style={dynamicStyles.galleryModalCloseButton}>
            <AppView style={dynamicStyles.iconButtonShadow}>
              <ActionCircleButtonComponent
                accessibilityLabel={APP_STRINGS.components.modal.closeLabel}
                iconColor={colors.textInverse}
                iconName="close"
                onPress={onCloseGallery}
              />
            </AppView>
          </Container>
          <AppFlatList
            getItemLayout={galleryGetItemLayout}
            horizontal
            initialNumToRender={1}
            initialScrollIndex={galleryInitialIndex}
            key={`gallery-${galleryInitialIndex}`}
            keyExtractor={galleryKeyExtractor}
            pagingEnabled
            renderItem={({ item }) => (
              <AppView style={dynamicStyles.galleryModalImagePage}>
                <AppImage
                  contentFit="contain"
                  showLoadingState={false}
                  source={{ uri: item.imageUrl }}
                  style={dynamicStyles.galleryModalImage}
                  transitionDuration={animation.duration.slow}
                />
              </AppView>
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.fill}
            data={galleryItems}
            windowSize={3}
          />
        </AppView>
      </AppModal>
    </Screen>
  );
};

DetailsViewComponent.displayName = 'DetailsView';

export const DetailsView = memo(DetailsViewComponent);
