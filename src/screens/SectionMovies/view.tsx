import React, { memo, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppFlatList, AppText, AppView } from '../../components/base';
import { EmptyView, ErrorView, SkeletonPoster } from '../../components/feedback';
import { SkeletonBlock } from '../../components/feedback/shared';
import { Container, Row, Screen, Stack } from '../../components/layout';
import { SearchCard, type SearchCardProps } from '../../components/ui';
import { AppIcon } from '../../components/ui/shared';
import { APP_STRINGS } from '../../constants';
import { useTheme } from '../../theme';

import { styles } from './styles';

const SECTION_MOVIES_SAFE_AREA_EDGES = ['bottom'] as const;
const SECTION_MOVIES_SKELETON_ITEMS = [
  'section-movies-skeleton-1',
  'section-movies-skeleton-2',
  'section-movies-skeleton-3',
  'section-movies-skeleton-4',
] as const;

export interface SectionMovieListItem extends SearchCardProps {
  readonly id: string;
}

export interface SectionMoviesViewProps {
  readonly errorDescription?: string;
  readonly errorTitle?: string;
  readonly isLoading: boolean;
  readonly isLoadingMore: boolean;
  readonly isRefreshing: boolean;
  readonly items: ReadonlyArray<SectionMovieListItem>;
  readonly onEndReached?: () => void;
  readonly onRefresh: () => void;
  readonly onRetry: () => void;
  readonly sectionSubtitle?: string;
}

const SectionMoviesSkeletonRowComponent = () => {
  return (
    <Container>
      <Row alignItems="center" gap="lg" style={styles.skeletonRow}>
        <AppView style={styles.skeletonArtwork}>
          <SkeletonPoster />
        </AppView>
        <Stack gap="sm" style={styles.skeletonTextColumn}>
          <SkeletonBlock height={styles.skeletonTextLine.height as number} style={styles.skeletonTextLine} width="76%" />
          <SkeletonBlock height={styles.skeletonTextLine.height as number} style={styles.skeletonTextLine} width="58%" />
          <SkeletonBlock
            height={styles.skeletonTextLineShort.height as number}
            style={styles.skeletonTextLineShort}
            width="42%"
          />
        </Stack>
      </Row>
    </Container>
  );
};

SectionMoviesSkeletonRowComponent.displayName = 'SectionMoviesSkeletonRow';

const SectionMoviesViewComponent = ({
  errorDescription,
  errorTitle,
  isLoading,
  isLoadingMore,
  isRefreshing,
  items,
  onEndReached,
  onRefresh,
  onRetry,
  sectionSubtitle,
}: SectionMoviesViewProps) => {
  const { colors, isDark } = useTheme();
  const statusBarStyle = useMemo(() => (isDark ? 'light' : 'dark'), [isDark]);

  const emptyIllustration = useMemo(
    () => (
      <AppView
        alignItems="center"
        backgroundColorToken="surfaceSecondary"
        center
        radius="full"
        style={styles.emptyStateIconContainer}
      >
        <AppIcon color={colors.info} name="info" size={styles.emptyStateIcon.width as number} />
      </AppView>
    ),
    [colors.info],
  );

  const headerComponent = useMemo(() => {
    if (!sectionSubtitle) {
      return null;
    }

    return (
      <Container>
        <Stack gap="xs" style={styles.header}>
          <AppText colorToken="textSecondary">
            {sectionSubtitle}
          </AppText>
        </Stack>
      </Container>
    );
  }, [sectionSubtitle]);

  const footerComponent = useMemo(() => {
    if (!isLoadingMore) {
      return null;
    }

    return (
      <AppView style={styles.loadingFooter}>
        <SectionMoviesSkeletonRowComponent />
      </AppView>
    );
  }, [isLoadingMore]);

  const keyExtractor = useCallback((item: SectionMovieListItem) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: SectionMovieListItem }) => (
      <Container>
        <SearchCard {...item} />
      </Container>
    ),
    [],
  );

  const renderSkeletonItem = useCallback(
    ({ item: _item }: { item: string }) => <SectionMoviesSkeletonRowComponent />,
    [],
  );

  if (isLoading && items.length === 0) {
    return (
      <Screen
        backgroundColorToken="background"
        paddingHorizontal={undefined}
        safeAreaEdges={SECTION_MOVIES_SAFE_AREA_EDGES}
      >
        <StatusBar style={statusBarStyle} />
        <AppFlatList
          ListHeaderComponent={headerComponent}
          contentGap="lg"
          data={SECTION_MOVIES_SKELETON_ITEMS}
          keyExtractor={(item) => item}
          renderItem={renderSkeletonItem}
          style={styles.fill}
        />
      </Screen>
    );
  }

  if (errorTitle && errorDescription && items.length === 0) {
    return (
      <Screen
        backgroundColorToken="background"
        paddingHorizontal={undefined}
        safeAreaEdges={SECTION_MOVIES_SAFE_AREA_EDGES}
      >
        <StatusBar style={statusBarStyle} />
        <ErrorView description={errorDescription} onRetry={onRetry} title={errorTitle} />
      </Screen>
    );
  }

  if (items.length === 0) {
    return (
      <Screen
        backgroundColorToken="background"
        paddingHorizontal={undefined}
        safeAreaEdges={SECTION_MOVIES_SAFE_AREA_EDGES}
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
      backgroundColorToken="background"
      paddingHorizontal={undefined}
      safeAreaEdges={SECTION_MOVIES_SAFE_AREA_EDGES}
    >
      <StatusBar style={statusBarStyle} />
      <AppFlatList
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        contentGap="lg"
        data={items}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={renderItem}
        style={styles.fill}
      />
    </Screen>
  );
};

SectionMoviesViewComponent.displayName = 'SectionMoviesView';

export const SectionMoviesView = memo(SectionMoviesViewComponent);
