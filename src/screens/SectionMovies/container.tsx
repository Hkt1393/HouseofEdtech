import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image as ExpoImage } from 'expo-image';

import { APP_STRINGS, ROUTES } from '../../constants';
import { movieRepository, type HomeMovieItem } from '../../services';
import type { RootStackScreenProps } from '../../types';

import { SectionMoviesView, type SectionMovieListItem } from './view';

interface ScreenErrorState {
  readonly description: string;
  readonly title: string;
}

interface SectionMoviesState {
  readonly error: ScreenErrorState | null;
  readonly hasLoadedOnce: boolean;
  readonly hasNextPage: boolean;
  readonly isLoading: boolean;
  readonly isLoadingMore: boolean;
  readonly isRefreshing: boolean;
  readonly items: ReadonlyArray<HomeMovieItem>;
  readonly page: number;
}

interface SectionMoviesBatchResult {
  readonly hasNextPage: boolean;
  readonly items: ReadonlyArray<HomeMovieItem>;
  readonly page: number;
}

const createInitialState = (): SectionMoviesState => ({
  error: null,
  hasLoadedOnce: false,
  hasNextPage: false,
  isLoading: true,
  isLoadingMore: false,
  isRefreshing: false,
  items: [],
  page: 0,
});

const buildErrorState = (message?: string, code?: string): ScreenErrorState => {
  if (code === 'TMDB_CONFIGURATION_ERROR' || code === 'TMDB_AUTHENTICATION_ERROR') {
    return {
      description: message ?? APP_STRINGS.errors.tmdbConfigurationDescription,
      title: APP_STRINGS.errors.configurationTitle,
    };
  }

  if (code === 'NETWORK_UNAVAILABLE') {
    return {
      description: APP_STRINGS.errors.networkDescription,
      title: APP_STRINGS.errors.networkTitle,
    };
  }

  return {
    description: message ?? APP_STRINGS.errors.genericDescription,
    title: APP_STRINGS.errors.genericTitle,
  };
};

const buildMovieMetadataLabel = (movie: HomeMovieItem): string | undefined => {
  const metadataItems = [
    movie.rating !== null ? `${APP_STRINGS.home.ratingSourceLabel} ${movie.rating}` : null,
    movie.releaseYear ? String(movie.releaseYear) : null,
  ].filter(Boolean);

  return metadataItems.length > 0
    ? metadataItems.join(APP_STRINGS.home.metadataSeparator)
    : undefined;
};

const mergeMovieItems = (
  currentItems: ReadonlyArray<HomeMovieItem>,
  nextItems: ReadonlyArray<HomeMovieItem>,
): ReadonlyArray<HomeMovieItem> => {
  const mergedItems = new Map<string, HomeMovieItem>();

  currentItems.forEach((item) => {
    mergedItems.set(item.id, item);
  });

  nextItems.forEach((item) => {
    mergedItems.set(item.id, item);
  });

  return Array.from(mergedItems.values());
};

const movieMatchesGenre = (movie: HomeMovieItem, genreId: string): boolean => {
  return movie.genreIds.some((movieGenreId) => String(movieGenreId) === genreId);
};

const prefetchMovieImages = async (
  movies: ReadonlyArray<HomeMovieItem>,
): Promise<void> => {
  const uniqueImageUrls = Array.from(
    new Set(
      movies
        .flatMap((movie) => [movie.posterUrl, movie.backdropUrl])
        .filter((imageUrl): imageUrl is string => imageUrl.length > 0),
    ),
  );

  if (uniqueImageUrls.length === 0) {
    return;
  }

  await Promise.allSettled(
    uniqueImageUrls.map((imageUrl) => ExpoImage.prefetch(imageUrl, 'memory-disk')),
  );
};

const SectionMoviesContainerComponent = ({
  navigation,
  route,
}: RootStackScreenProps<typeof ROUTES.SECTION_MOVIES>) => {
  const { genreId, sectionKey, sectionSubtitle } = route.params;
  const isMountedRef = useRef(true);
  const stateRef = useRef<SectionMoviesState>(createInitialState());
  const [state, setState] = useState<SectionMoviesState>(createInitialState);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const fetchSectionBatch = useCallback(
    async (
      page: number,
      forceRefresh: boolean = false,
    ): Promise<SectionMoviesBatchResult | null> => {
      let nextPage = page;

      while (true) {
        const response = await movieRepository.getHomeSection(sectionKey, {
          forceRefresh,
          page: nextPage,
        });

        if (!isMountedRef.current) {
          return null;
        }

        if (!response.success) {
          throw response;
        }

        const responseItems = genreId
          ? (response.data ?? []).filter((movie) => movieMatchesGenre(movie, genreId))
          : response.data ?? [];
        const resolvedPage = response.meta?.page ?? nextPage;
        const hasNextPage = response.meta?.hasNextPage ?? false;

        if (!genreId || responseItems.length > 0 || !hasNextPage) {
          return {
            hasNextPage,
            items: responseItems,
            page: resolvedPage,
          };
        }

        nextPage = resolvedPage + 1;
      }
    },
    [genreId, sectionKey],
  );

  const loadPage = useCallback(
    async (
      page: number,
      options?: {
        readonly forceRefresh?: boolean;
        readonly isLoadMore?: boolean;
        readonly isRefreshing?: boolean;
      },
    ) => {
      setState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: page === 1 && currentState.items.length === 0,
        isLoadingMore: Boolean(options?.isLoadMore),
        isRefreshing: Boolean(options?.isRefreshing),
      }));

      try {
        const batch = await fetchSectionBatch(page, Boolean(options?.forceRefresh));

        if (!batch || !isMountedRef.current) {
          return;
        }

        await prefetchMovieImages(batch.items);

        if (!isMountedRef.current) {
          return;
        }

        setState((currentState) => ({
          error: null,
          hasLoadedOnce: true,
          hasNextPage: batch.hasNextPage,
          isLoading: false,
          isLoadingMore: false,
          isRefreshing: false,
          items:
            page === 1
              ? batch.items
              : mergeMovieItems(currentState.items, batch.items),
          page: batch.page,
        }));
      } catch (response) {
        const errorResponse = response as Awaited<ReturnType<typeof movieRepository.getHomeSection>>;
        const nextError = buildErrorState(
          errorResponse.error?.message ?? errorResponse.message,
          errorResponse.error?.code,
        );

        setState((currentState) => ({
          ...currentState,
          error: currentState.items.length > 0 ? null : nextError,
          hasLoadedOnce: true,
          hasNextPage: false,
          isLoading: false,
          isLoadingMore: false,
          isRefreshing: false,
        }));
      }
    },
    [fetchSectionBatch],
  );

  useEffect(() => {
    void loadPage(1);
  }, [loadPage]);

  const handleOpenDetails = useCallback(
    (movieId: string) => {
      navigation.navigate(ROUTES.MOVIE_DETAILS, {
        movieId,
      });
    },
    [navigation],
  );

  const handleRefresh = useCallback(() => {
    void loadPage(1, {
      forceRefresh: true,
      isRefreshing: true,
    });
  }, [loadPage]);

  const handleRetry = useCallback(() => {
    void loadPage(1, {
      forceRefresh: true,
    });
  }, [loadPage]);

  const handleLoadMore = useCallback(() => {
    const currentState = stateRef.current;

    if (
      currentState.isLoading ||
      currentState.isLoadingMore ||
      currentState.isRefreshing ||
      !currentState.hasNextPage
    ) {
      return;
    }

    void loadPage(currentState.page + 1, {
      isLoadMore: true,
    });
  }, [loadPage]);

  const items = useMemo<ReadonlyArray<SectionMovieListItem>>(
    () =>
      state.items.map((movie) => ({
        accessibilityLabel: movie.title,
        id: movie.id,
        imageUrl: movie.posterUrl || movie.backdropUrl,
        metadataLabel: buildMovieMetadataLabel(movie),
        onPress: () => {
          handleOpenDetails(movie.id);
        },
        title: movie.title,
      })),
    [handleOpenDetails, state.items],
  );

  return (
    <SectionMoviesView
      errorDescription={state.error?.description}
      errorTitle={state.error?.title}
      isLoading={state.isLoading}
      isLoadingMore={state.isLoadingMore}
      isRefreshing={state.isRefreshing}
      items={items}
      onEndReached={state.hasNextPage ? handleLoadMore : undefined}
      onRefresh={handleRefresh}
      onRetry={handleRetry}
      sectionSubtitle={sectionSubtitle}
    />
  );
};

SectionMoviesContainerComponent.displayName = 'SectionMoviesContainer';

export const SectionMoviesContainer = memo(SectionMoviesContainerComponent);
