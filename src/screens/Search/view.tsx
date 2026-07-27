import React, { memo, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  AppFlatList,
  AppImage,
  AppScrollView,
  AppText,
  AppTextInput,
  AppView,
} from '../../components/base';
import {
  EmptyView,
  ErrorView,
  SkeletonPoster,
  SkeletonRow,
} from '../../components/feedback';
import { SkeletonBlock } from '../../components/feedback/shared';
import { AbsoluteFill, Container, Row, Screen, Stack } from '../../components/layout';
import {
  Avatar,
  Badge,
  ContentCarousel,
  GenreChipGroup,
  MovieCard,
  SearchCard,
  type MovieCardProps,
} from '../../components/ui';
import { AppIcon } from '../../components/ui/shared';
import { APP_STRINGS } from '../../constants';
import { useTheme } from '../../theme';
import { isTablet, moderateScale } from '../../utils';

import { createDynamicStyles, styles } from './styles';

const SEARCH_SAFE_AREA_EDGES = ['top'] as const;
const SEARCH_RESULTS_SKELETON_IDS = [
  'search-result-skeleton-1',
  'search-result-skeleton-2',
  'search-result-skeleton-3',
  'search-result-skeleton-4',
] as const;

export interface SearchTrendingChipItem {
  readonly accessibilityLabel?: string;
  readonly id: string;
  readonly label: string;
  readonly onPress?: () => void;
}

export interface SearchCategoryCardItem {
  readonly accessibilityLabel?: string;
  readonly id: string;
  readonly imageUrl: string;
  readonly label: string;
  readonly onPress?: () => void;
}

export interface SearchTalentItem {
  readonly id: string;
  readonly imageUrl?: string | null;
  readonly name: string;
}

export interface SearchRecommendedHeroItem {
  readonly badgeLabel?: string;
  readonly id: string;
  readonly imageUrl: string;
  readonly metadataLabel?: string;
  readonly onPress?: () => void;
  readonly title: string;
}

export interface SearchMovieRailItem extends MovieCardProps {
  readonly id: string;
}

export interface SearchResultListItem {
  readonly accessibilityLabel: string;
  readonly id: string;
  readonly imageUrl: string;
  readonly metadataLabel?: string;
  readonly onPress?: () => void;
  readonly subtitle?: string;
  readonly title: string;
}

export interface SearchViewProps {
  readonly categories: ReadonlyArray<SearchCategoryCardItem>;
  readonly discoveryErrorDescription?: string;
  readonly discoveryErrorTitle?: string;
  readonly headerAvatarImageUrl?: string | null;
  readonly isDiscoveryLoading: boolean;
  readonly isRefreshing: boolean;
  readonly isResultsLoading: boolean;
  readonly isResultsMode: boolean;
  readonly query: string;
  readonly recommendedHero: SearchRecommendedHeroItem | null;
  readonly recommendedItems: ReadonlyArray<SearchMovieRailItem>;
  readonly results: ReadonlyArray<SearchResultListItem>;
  readonly resultsErrorDescription?: string;
  readonly resultsErrorTitle?: string;
  readonly talentItems: ReadonlyArray<SearchTalentItem>;
  readonly trendingSearches: ReadonlyArray<SearchTrendingChipItem>;
  readonly onChangeQuery: (value: string) => void;
  readonly onMenuPress: () => void;
  readonly onProfilePress: () => void;
  readonly onRefresh: () => void;
  readonly onRetry: () => void;
  readonly onVoiceSearchPress?: () => void;
}

const SearchResultSkeletonRowComponent = () => {
  return (
    <Container>
      <SkeletonRow />
    </Container>
  );
};

SearchResultSkeletonRowComponent.displayName = 'SearchResultSkeletonRow';

const SearchViewComponent = ({
  categories,
  discoveryErrorDescription,
  discoveryErrorTitle,
  headerAvatarImageUrl,
  isDiscoveryLoading,
  isRefreshing,
  isResultsLoading,
  isResultsMode,
  query,
  recommendedHero,
  recommendedItems,
  results,
  resultsErrorDescription,
  resultsErrorTitle,
  talentItems,
  trendingSearches,
  onChangeQuery,
  onMenuPress,
  onProfilePress,
  onRefresh,
  onRetry,
  onVoiceSearchPress,
}: SearchViewProps) => {
  const theme = useTheme();
  const { colors, isDark, spacing } = theme;
  const statusBarStyle = useMemo(() => (isDark ? 'light' : 'dark'), [isDark]);
  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles({
        categoryCardHeight: moderateScale(isTablet() ? 148 : 112),
        recommendedHeroHeight: moderateScale(isTablet() ? 280 : 220),
        sectionGap: moderateScale(spacing['2xl']),
        talentCardWidth: moderateScale(88),
        theme,
      }),
    [spacing, theme],
  );

  const discoveryHasContent =
    trendingSearches.length > 0 ||
    categories.length > 0 ||
    talentItems.length > 0 ||
    Boolean(recommendedHero) ||
    recommendedItems.length > 0;

  const emptyIllustration = useMemo(
    () => (
      <AppView
        alignItems="center"
        backgroundColorToken="surfaceSecondary"
        center
        radius="full"
        style={dynamicStyles.emptyIllustrationContainer}
      >
        <AppIcon color={colors.primary} name="search" size={moderateScale(24)} />
      </AppView>
    ),
    [colors.primary, dynamicStyles.emptyIllustrationContainer],
  );

  const headerComponent = useMemo(
    () => (
      <Container>
        <Stack gap="xl" style={dynamicStyles.headerBlock}>
          <Row alignItems="center" justifyContent="space-between">
            <Row alignItems="center" gap="md">
              <AppView
                accessibilityHint={APP_STRINGS.search.menuAccessibilityHint}
                accessibilityLabel={APP_STRINGS.search.menuAccessibilityLabel}
                accessibilityRole="button"
                hitSlop={spacing.sm}
                onPress={onMenuPress}
                style={dynamicStyles.headerIconButton}
                testID="search-menu-button"
              >
                {/* <AppIcon color={colors.primary} name="menu" size={moderateScale(22)} /> */}
              </AppView>
              <AppText style={dynamicStyles.brandText}>
                {APP_STRINGS.search.headerTitle}
              </AppText>
            </Row>
            <AppView
              accessibilityHint={APP_STRINGS.search.profileAccessibilityHint}
              accessibilityLabel={APP_STRINGS.search.profileAccessibilityLabel}
              accessibilityRole="button"
              hitSlop={spacing.sm}
              onPress={onProfilePress}
              testID="search-profile-button"
            >
            </AppView>
          </Row>
          <AppTextInput
            accessibilityLabel={APP_STRINGS.components.navigation.searchBarAccessibilityLabel}
            inputContainerStyle={dynamicStyles.searchInputContainer}
            inputStyle={dynamicStyles.searchInputText}
            leadingIcon={
              <AppIcon color={colors.textSecondary} name="search" size={moderateScale(22)} />
            }
            onChangeText={onChangeQuery}
            onTrailingActionPress={onVoiceSearchPress}
            placeholder={APP_STRINGS.search.placeholder}
            placeholderColorToken="textTertiary"
            returnKeyType="search"
            testID="search-input"
            trailingActionAccessibilityHint={APP_STRINGS.search.voiceSearchAccessibilityHint}
            trailingActionAccessibilityLabel={APP_STRINGS.search.voiceSearchAccessibilityLabel}
            trailingIconPressable={Boolean(onVoiceSearchPress)}
            value={query}
          />
        </Stack>
      </Container>
    ),
    [
      colors.primary,
      colors.textSecondary,
      dynamicStyles.brandText,
      dynamicStyles.headerBlock,
      dynamicStyles.headerIconButton,
      dynamicStyles.searchInputContainer,
      dynamicStyles.searchInputText,
      headerAvatarImageUrl,
      onChangeQuery,
      onMenuPress,
      onProfilePress,
      onVoiceSearchPress,
      query,
      spacing.sm,
    ],
  );

  const categoryRows = useMemo(() => {
    const rows: SearchCategoryCardItem[][] = [];

    for (let index = 0; index < categories.length; index += 2) {
      rows.push(categories.slice(index, index + 2) as SearchCategoryCardItem[]);
    }

    return rows;
  }, [categories]);

  const renderResultsItem = useCallback(
    ({ item }: { item: SearchResultListItem }) => (
      <Container>
        <AppView
          accessibilityHint={APP_STRINGS.components.cards.searchAccessibilityHint}
          accessibilityLabel={item.accessibilityLabel}
          accessibilityRole="button"
          onPress={item.onPress}
          testID={`search-result-${item.id}`}
        >
          <SearchCard
            accessibilityLabel={item.accessibilityLabel}
            imageUrl={item.imageUrl}
            metadataLabel={item.metadataLabel}
            subtitle={item.subtitle}
            title={item.title}
          />
        </AppView>
      </Container>
    ),
    [],
  );

  const renderSkeletonResultItem = useCallback(
    ({ item: _item }: { item: string }) => <SearchResultSkeletonRowComponent />,
    [],
  );

  const renderTalentItem = useCallback(
    (item: SearchTalentItem) => (
      <Stack
        alignItems="center"
        gap="sm"
        key={item.id}
        style={dynamicStyles.talentCard}
      >
        <Avatar fallbackLabel={item.name} imageUrl={item.imageUrl} size="xl" />
        <AppText numberOfLines={1} style={dynamicStyles.talentName}>
          {item.name}
        </AppText>
      </Stack>
    ),
    [dynamicStyles.talentCard, dynamicStyles.talentName],
  );

  const renderRecommendedMovie = useCallback(
    (item: SearchMovieRailItem) => <MovieCard {...item} />,
    [],
  );

  const trendingSection = useMemo(() => {
    if (trendingSearches.length === 0) {
      return null;
    }

    return (
      <Stack gap="md">
        <Row
          alignItems="center"
          justifyContent="space-between"
          style={dynamicStyles.sectionHeaderRow}
        >
          <AppText variant="subtitle">{APP_STRINGS.search.trendingSearches}</AppText>
          <AppIcon color={colors.primary} name="arrow-up-right" size={moderateScale(18)} />
        </Row>
        <GenreChipGroup
          items={trendingSearches.map((item) => ({
            accessibilityLabel: item.accessibilityLabel ?? item.label,
            id: item.id,
            label: item.label,
            onPress: item.onPress,
          }))}
        />
      </Stack>
    );
  }, [colors.primary, dynamicStyles.sectionHeaderRow, trendingSearches]);

  const categoriesSection = useMemo(() => {
    if (categoryRows.length === 0) {
      return null;
    }

    return (
      <Stack gap="md">
        <AppText variant="subtitle">{APP_STRINGS.search.categoriesSection}</AppText>
        <Stack gap="md">
          {categoryRows.map((row, rowIndex) => (
            <Row gap="md" key={`category-row-${rowIndex}`}>
              {row.map((item) => (
                <AppView
                  accessibilityLabel={item.accessibilityLabel ?? item.label}
                  accessibilityRole={item.onPress ? 'button' : undefined}
                  flex
                  hitSlop={spacing.xs}
                  key={item.id}
                  onPress={item.onPress}
                  radius="md"
                  style={dynamicStyles.categoryCard}
                >
                  <AppImage
                    contentFit="cover"
                    showLoadingState={false}
                    source={{ uri: item.imageUrl }}
                    style={dynamicStyles.categoryCardImage}
                  />
                  <AbsoluteFill
                    style={[styles.absoluteFill, dynamicStyles.categoryCardOverlay]}
                  />
                  <AppView style={dynamicStyles.tileContent}>
                    <AppText numberOfLines={1} style={dynamicStyles.categoryCardTitle}>
                      {item.label}
                    </AppText>
                  </AppView>
                </AppView>
              ))}
            </Row>
          ))}
        </Stack>
      </Stack>
    );
  }, [
    categoryRows,
    dynamicStyles.categoryCard,
    dynamicStyles.categoryCardImage,
    dynamicStyles.categoryCardOverlay,
    dynamicStyles.categoryCardTitle,
    dynamicStyles.tileContent,
    spacing.xs,
  ]);

  const talentSection = useMemo(() => {
    if (talentItems.length === 0) {
      return null;
    }

    return (
      <Stack gap="md">
        <AppText variant="subtitle">{APP_STRINGS.search.popularTalentSection}</AppText>
        <ContentCarousel
          contentPaddingHorizontal="none"
          data={talentItems}
          itemGap="md"
          itemWidth={88}
          keyExtractor={(item) => item.id}
          renderItem={renderTalentItem}
        />
      </Stack>
    );
  }, [renderTalentItem, talentItems]);

  const recommendedSection = useMemo(() => {
    if (!recommendedHero && recommendedItems.length === 0) {
      return null;
    }

    return (
      <Stack gap="lg">
        <AppText variant="subtitle">{APP_STRINGS.search.recommendedSection}</AppText>
        {recommendedHero ? (
          <AppView
            accessibilityLabel={recommendedHero.title}
            accessibilityRole={recommendedHero.onPress ? 'button' : undefined}
            hitSlop={spacing.xs}
            onPress={recommendedHero.onPress}
            radius="md"
            style={dynamicStyles.recommendedHero}
          >
            <AppImage
              contentFit="cover"
              showLoadingState={false}
              source={{ uri: recommendedHero.imageUrl }}
              style={dynamicStyles.recommendedHeroImage}
            />
            <AbsoluteFill
              style={[styles.absoluteFill, dynamicStyles.recommendedHeroOverlay]}
            />
            <AppView style={dynamicStyles.recommendedHeroBadgeRow}>
              {recommendedHero.badgeLabel ? (
                <Badge label={recommendedHero.badgeLabel} tone="primary" />
              ) : null}
            </AppView>
            <Stack gap="xs" padding="lg" style={dynamicStyles.recommendedHeroContent}>
              <AppText style={dynamicStyles.recommendedHeroTitle}>
                {recommendedHero.title}
              </AppText>
              {recommendedHero.metadataLabel ? (
                <AppText style={dynamicStyles.recommendedHeroMetadata}>
                  {recommendedHero.metadataLabel}
                </AppText>
              ) : null}
            </Stack>
          </AppView>
        ) : null}
        {recommendedItems.length > 0 ? (
          <ContentCarousel
            contentPaddingHorizontal="none"
            data={recommendedItems}
            itemGap="md"
            itemWidth={144}
            keyExtractor={(item) => item.id}
            renderItem={renderRecommendedMovie}
          />
        ) : null}
      </Stack>
    );
  }, [
    dynamicStyles.recommendedHero,
    dynamicStyles.recommendedHeroBadgeRow,
    dynamicStyles.recommendedHeroContent,
    dynamicStyles.recommendedHeroImage,
    dynamicStyles.recommendedHeroMetadata,
    dynamicStyles.recommendedHeroOverlay,
    dynamicStyles.recommendedHeroTitle,
    recommendedHero,
    recommendedItems,
    renderRecommendedMovie,
    spacing.xs,
  ]);

  const discoverySkeleton = useMemo(
    () => (
      <AppScrollView contentContainerStyle={dynamicStyles.discoveryContent} style={styles.fill}>
        <Container>
          <Stack style={dynamicStyles.verticalSectionStack}>
            <Stack gap="md">
              <SkeletonBlock height={moderateScale(24)} width={moderateScale(168)} />
              <GenreChipGroup
                items={SEARCH_RESULTS_SKELETON_IDS.map((itemId) => ({
                  disabled: true,
                  id: itemId,
                  label: '      ',
                }))}
              />
            </Stack>
            <Stack gap="md">
              <SkeletonBlock height={moderateScale(24)} width={moderateScale(116)} />
              <Row gap="md">
                <SkeletonBlock
                  height={dynamicStyles.skeletonCategoryCard.height as number}
                  style={dynamicStyles.skeletonCategoryCard}
                />
                <SkeletonBlock
                  height={dynamicStyles.skeletonCategoryCard.height as number}
                  style={dynamicStyles.skeletonCategoryCard}
                />
              </Row>
              <Row gap="md">
                <SkeletonBlock
                  height={dynamicStyles.skeletonCategoryCard.height as number}
                  style={dynamicStyles.skeletonCategoryCard}
                />
                <SkeletonBlock
                  height={dynamicStyles.skeletonCategoryCard.height as number}
                  style={dynamicStyles.skeletonCategoryCard}
                />
              </Row>
            </Stack>
            <Stack gap="md">
              <SkeletonBlock height={moderateScale(24)} width={moderateScale(132)} />
              <ContentCarousel
                contentPaddingHorizontal="none"
                data={SEARCH_RESULTS_SKELETON_IDS}
                itemGap="md"
                itemWidth={88}
                keyExtractor={(item) => item}
                renderItem={() => (
                  <Stack
                    alignItems="center"
                    gap="sm"
                    style={dynamicStyles.skeletonTalentCard}
                  >
                    <SkeletonBlock
                      height={dynamicStyles.skeletonTalentAvatar.height as number}
                      radius={moderateScale(36)}
                      style={dynamicStyles.skeletonTalentAvatar}
                    />
                    <SkeletonBlock height={moderateScale(14)} width="70%" />
                  </Stack>
                )}
              />
            </Stack>
            <Stack gap="lg">
              <SkeletonBlock height={moderateScale(24)} width={moderateScale(180)} />
              <SkeletonBlock
                height={dynamicStyles.skeletonHeroCard.height as number}
                style={dynamicStyles.skeletonHeroCard}
              />
              <ContentCarousel
                contentPaddingHorizontal="none"
                data={SEARCH_RESULTS_SKELETON_IDS}
                itemGap="md"
                itemWidth={144}
                keyExtractor={(item) => item}
                renderItem={() => (
                  <AppView style={dynamicStyles.skeletonPosterCard}>
                    <SkeletonPoster />
                  </AppView>
                )}
              />
            </Stack>
          </Stack>
        </Container>
      </AppScrollView>
    ),
    [
      dynamicStyles.discoveryContent,
      dynamicStyles.skeletonCategoryCard,
      dynamicStyles.skeletonHeroCard,
      dynamicStyles.skeletonPosterCard,
      dynamicStyles.skeletonTalentAvatar,
      dynamicStyles.skeletonTalentCard,
      dynamicStyles.verticalSectionStack,
    ],
  );

  const discoveryContent = useMemo(
    () => (
      <AppScrollView
        contentContainerStyle={dynamicStyles.discoveryContent}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        style={styles.fill}
      >
        <Container>
          <Stack style={dynamicStyles.verticalSectionStack}>
            {trendingSection}
            {categoriesSection}
            {talentSection}
            {recommendedSection}
          </Stack>
        </Container>
      </AppScrollView>
    ),
    [
      categoriesSection,
      dynamicStyles.discoveryContent,
      dynamicStyles.verticalSectionStack,
      isRefreshing,
      onRefresh,
      recommendedSection,
      talentSection,
      trendingSection,
    ],
  );

  if (isResultsMode) {
    return (
      <Screen
        backgroundColorToken="background"
        paddingHorizontal={undefined}
        safeAreaEdges={SEARCH_SAFE_AREA_EDGES}
      >
        <StatusBar style={statusBarStyle} />
        {headerComponent}
        {isResultsLoading && results.length === 0 ? (
          <AppFlatList
            contentContainerStyle={dynamicStyles.resultsContent}
            data={SEARCH_RESULTS_SKELETON_IDS}
            keyExtractor={(item) => item}
            renderItem={renderSkeletonResultItem}
            style={styles.fill}
          />
        ) : resultsErrorTitle && resultsErrorDescription && results.length === 0 ? (
          <AppView flex>
            <ErrorView
              description={resultsErrorDescription}
              onRetry={onRetry}
              title={resultsErrorTitle}
            />
          </AppView>
        ) : results.length === 0 ? (
          <AppView flex>
            <EmptyView
              actionLabel={APP_STRINGS.common.retry}
              description={APP_STRINGS.search.emptyStateDescription}
              illustration={emptyIllustration}
              onAction={onRetry}
              title={APP_STRINGS.search.emptyStateTitle}
            />
          </AppView>
        ) : (
          <AppFlatList
            contentContainerStyle={dynamicStyles.resultsContent}
            contentGap="lg"
            data={results}
            initialNumToRender={8}
            keyExtractor={(item) => item.id}
            maxToRenderPerBatch={10}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            removeClippedSubviews
            renderItem={renderResultsItem}
            style={styles.fill}
            windowSize={7}
          />
        )}
      </Screen>
    );
  }

  return (
    <Screen
      backgroundColorToken="background"
      paddingHorizontal={undefined}
      safeAreaEdges={SEARCH_SAFE_AREA_EDGES}
    >
      <StatusBar style={statusBarStyle} />
      {headerComponent}
      {isDiscoveryLoading ? (
        discoverySkeleton
      ) : discoveryErrorTitle && discoveryErrorDescription && !discoveryHasContent ? (
        <AppView flex>
          <ErrorView
            description={discoveryErrorDescription}
            onRetry={onRetry}
            title={discoveryErrorTitle}
          />
        </AppView>
      ) : (
        discoveryContent
      )}
    </Screen>
  );
};

SearchViewComponent.displayName = 'SearchView';

export const SearchView = memo(SearchViewComponent);
