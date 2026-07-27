import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image as ExpoImage } from 'expo-image';

import { APP_STRINGS, ROUTES, TMDB_HOME_SECTION_DEFINITIONS, TMDB_HOME_SECTION_ORDER } from '../../constants';
import {
  movieRepository,
  type HomeGenreItem,
  type HomeMovieItem,
  type HomeSectionRequestOptions,
} from '../../services';
import type { AppImageSource } from '../../components/base';
import type { MetadataRowItem, MovieCardProps } from '../../components/ui';
import type { MainTabScreenProps } from '../../types';
import type { TmdbHomeSectionKey } from '../../constants';

import {
  type HomeCategoryChipItem,
  HomeView,
  type HomeHeroBannerViewModel,
  type HomeSectionItem,
} from './view';

interface ScreenErrorState {
  readonly description: string;
  readonly title: string;
}

interface HomeHeroState {
  readonly error: ScreenErrorState | null;
  readonly hasLoadedOnce: boolean;
  readonly isLoading: boolean;
  readonly item: HomeMovieItem | null;
}

interface HomeSectionState {
  readonly error: ScreenErrorState | null;
  readonly hasLoadedOnce: boolean;
  readonly hasNextPage: boolean;
  readonly isLoading: boolean;
  readonly isLoadingMore: boolean;
  readonly items: ReadonlyArray<HomeMovieItem>;
  readonly page: number;
}

type HomeSectionStateMap = Record<TmdbHomeSectionKey, HomeSectionState>;

interface HomeGenreState {
  readonly error: ScreenErrorState | null;
  readonly hasLoadedOnce: boolean;
  readonly isLoading: boolean;
  readonly items: ReadonlyArray<HomeGenreItem>;
}

const createInitialHeroState = (): HomeHeroState => ({
  error: null,
  hasLoadedOnce: false,
  isLoading: true,
  item: null,
});

const createInitialGenreState = (): HomeGenreState => ({
  error: null,
  hasLoadedOnce: false,
  isLoading: true,
  items: [],
});

const createInitialSectionState = (): HomeSectionState => ({
  error: null,
  hasLoadedOnce: false,
  hasNextPage: false,
  isLoading: true,
  isLoadingMore: false,
  items: [],
  page: 0,
});

const createInitialSectionStateMap = (): HomeSectionStateMap => {
  return TMDB_HOME_SECTION_ORDER.reduce<HomeSectionStateMap>((accumulator, sectionKey) => {
    accumulator[sectionKey] = createInitialSectionState();

    return accumulator;
  }, {} as HomeSectionStateMap);
};

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

const buildImageSource = (imageUrl?: string): AppImageSource | undefined => {
  if (!imageUrl) {
    return undefined;
  }

  return {
    uri: imageUrl,
  };
};

const buildRatingLabel = (rating: number | null): string | null => {
  if (rating === null) {
    return null;
  }

  return `${APP_STRINGS.home.ratingSourceLabel} ${rating}`;
};

const buildMovieMetadataLabel = (movie: HomeMovieItem): string | undefined => {
  const metadataItems = [
    buildRatingLabel(movie.rating),
    movie.releaseYear ? String(movie.releaseYear) : null,
  ].filter(Boolean);

  return metadataItems.length > 0
    ? metadataItems.join(APP_STRINGS.home.metadataSeparator)
    : undefined;
};

const resolveHeroImageUrl = (movie: HomeMovieItem | null): string | undefined => {
  if (!movie) {
    return undefined;
  }

  return movie.backdropUrl || movie.posterUrl || undefined;
};

const resolveMovieImageUrl = (movie: HomeMovieItem | null): string | undefined => {
  if (!movie) {
    return undefined;
  }

  return movie.posterUrl || movie.backdropUrl || undefined;
};

const prefetchHomeImageUrls = async (
  imageUrls: ReadonlyArray<string | null | undefined>,
): Promise<void> => {
  const uniqueImageUrls = Array.from(
    new Set(
      imageUrls.filter(
        (imageUrl): imageUrl is string =>
          typeof imageUrl === 'string' && imageUrl.length > 0,
      ),
    ),
  );

  if (uniqueImageUrls.length === 0) {
    return;
  }

  await Promise.allSettled(
    uniqueImageUrls.map((imageUrl) => ExpoImage.prefetch(imageUrl, 'memory-disk')),
  );
};

const buildHeroMetadataItems = (
  movie: HomeMovieItem | null,
): ReadonlyArray<MetadataRowItem> => {
  if (!movie) {
    return [];
  }

  const ratingLabel = buildRatingLabel(movie.rating);

  return [
    ratingLabel
      ? {
          id: `${movie.id}-rating`,
          label: ratingLabel,
          tone: 'neutral',
          variant: 'soft',
        }
      : null,
    movie.releaseYear
      ? {
          id: `${movie.id}-year`,
          label: String(movie.releaseYear),
          tone: 'neutral',
          variant: 'soft',
        }
      : null,
  ].filter(Boolean) as ReadonlyArray<MetadataRowItem>;
};

const mapMovieToMovieCardProps = (
  movie: HomeMovieItem,
  onPress: () => void,
): MovieCardProps => ({
  accessibilityLabel: movie.title,
  id: movie.id,
  imageTransitionDuration: 0,
  metadataLabel: buildMovieMetadataLabel(movie),
  onPress,
  posterUrl: movie.posterUrl || movie.backdropUrl,
  showImageLoadingState: false,
  thumbnailUrl: movie.backdropUrl || movie.posterUrl,
  title: movie.title,
});

const mergeHomeSectionItems = (
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

const buildVisibleSectionMovies = (
  sectionKey: TmdbHomeSectionKey,
  items: ReadonlyArray<HomeMovieItem>,
  heroItem: HomeMovieItem | null,
): ReadonlyArray<HomeMovieItem> => {
  if (sectionKey !== 'trending' || heroItem === null) {
    return items;
  }

  return items.filter((movie) => movie.id !== heroItem.id);
};

const movieMatchesGenre = (movie: HomeMovieItem, genreId: string): boolean => {
  return movie.genreIds.some((movieGenreId) => String(movieGenreId) === genreId);
};

const HomeContainerComponent = ({
  navigation,
}: MainTabScreenProps<typeof ROUTES.HOME>) => {
  const isMountedRef = useRef(true);
  const heroStateRef = useRef<HomeHeroState>(createInitialHeroState());
  const sectionStatesRef = useRef<HomeSectionStateMap>(createInitialSectionStateMap());

  const [genreState, setGenreState] = useState<HomeGenreState>(createInitialGenreState);
  const [heroState, setHeroState] = useState<HomeHeroState>(createInitialHeroState);
  const [isBlockingContentReveal, setIsBlockingContentReveal] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [sectionStates, setSectionStates] = useState<HomeSectionStateMap>(
    createInitialSectionStateMap,
  );

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    heroStateRef.current = heroState;
  }, [heroState]);

  useEffect(() => {
    sectionStatesRef.current = sectionStates;
  }, [sectionStates]);

  const handleOpenDetails = useCallback(
    (movieId: string) => {
      navigation.navigate(ROUTES.MOVIE_DETAILS, {
        movieId,
      });
    },
    [navigation],
  );

  const handleOpenProfile = useCallback(() => {
    navigation.navigate(ROUTES.PROFILE);
  }, [navigation]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate(ROUTES.SETTINGS);
  }, [navigation]);

  const loadHero = useCallback(
    async (options?: Pick<HomeSectionRequestOptions, 'forceRefresh'>) => {
      setHeroState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: currentState.item === null,
      }));

      const response = await movieRepository.getHomeHero({
        forceRefresh: options?.forceRefresh,
      });

      if (!isMountedRef.current) {
        return;
      }

      if (response.success) {
        await prefetchHomeImageUrls([
          resolveHeroImageUrl(response.data),
        ]);

        if (!isMountedRef.current) {
          return;
        }

        setHeroState({
          error: null,
          hasLoadedOnce: true,
          isLoading: false,
          item: response.data,
        });

        return;
      }

      const nextError = buildErrorState(
        response.error?.message ?? response.message,
        response.error?.code,
      );

      setHeroState((currentState) => ({
        ...currentState,
        error: currentState.item ? null : nextError,
        hasLoadedOnce: true,
        isLoading: false,
      }));
    },
    [],
  );

  const loadSection = useCallback(
    async (
      sectionKey: TmdbHomeSectionKey,
      options?: HomeSectionRequestOptions,
    ) => {
      const page = options?.page ?? 1;

      setSectionStates((currentState) => {
        const sectionState = currentState[sectionKey];

        return {
          ...currentState,
          [sectionKey]: {
            ...sectionState,
            error: null,
            isLoading: page === 1 && sectionState.items.length === 0,
            isLoadingMore: page > 1,
          },
        };
      });

      const response = await movieRepository.getHomeSection(sectionKey, options);

      if (!isMountedRef.current) {
        return;
      }

      if (response.success) {
        await prefetchHomeImageUrls(
          (response.data ?? []).map((movie) => resolveMovieImageUrl(movie)),
        );

        if (!isMountedRef.current) {
          return;
        }

        setSectionStates((currentState) => {
          const sectionState = currentState[sectionKey];
          const responseItems = response.data ?? [];
          const mergedItems =
            page > 1
              ? mergeHomeSectionItems(sectionState.items, responseItems)
              : responseItems;

          return {
            ...currentState,
            [sectionKey]: {
              error: null,
              hasLoadedOnce: true,
              hasNextPage: response.meta?.hasNextPage ?? false,
              isLoading: false,
              isLoadingMore: false,
              items: mergedItems,
              page: response.meta?.page ?? page,
            },
          };
        });

        return;
      }

      const nextError = buildErrorState(
        response.error?.message ?? response.message,
        response.error?.code,
      );

      setSectionStates((currentState) => {
        const sectionState = currentState[sectionKey];

        return {
          ...currentState,
          [sectionKey]: {
            ...sectionState,
            error: sectionState.items.length > 0 ? null : nextError,
            hasLoadedOnce: true,
            hasNextPage: false,
            isLoading: false,
            isLoadingMore: false,
          },
        };
      });
    },
    [],
  );

  const loadGenres = useCallback(
    async (options?: Pick<HomeSectionRequestOptions, 'forceRefresh'>) => {
      setGenreState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: currentState.items.length === 0,
      }));

      const response = await movieRepository.getHomeGenres({
        forceRefresh: options?.forceRefresh,
      });

      if (!isMountedRef.current) {
        return;
      }

      if (response.success) {
        setGenreState({
          error: null,
          hasLoadedOnce: true,
          isLoading: false,
          items: response.data ?? [],
        });

        return;
      }

      const nextError = buildErrorState(
        response.error?.message ?? response.message,
        response.error?.code,
      );

      setGenreState((currentState) => ({
        ...currentState,
        error: currentState.items.length > 0 ? null : nextError,
        hasLoadedOnce: true,
        isLoading: false,
      }));
    },
    [],
  );

  const loadAllHomeContent = useCallback(
    async (forceRefresh: boolean = false) => {
      const shouldBlockContentReveal =
        heroStateRef.current.item === null &&
        TMDB_HOME_SECTION_ORDER.every(
          (sectionKey) => sectionStatesRef.current[sectionKey].items.length === 0,
        );

      if (shouldBlockContentReveal) {
        setIsBlockingContentReveal(true);
      }

      if (forceRefresh) {
        setIsRefreshing(true);
        movieRepository.clearHomeCache();
      }

      try {
        await Promise.all([
          loadGenres({
            forceRefresh,
          }),
          loadHero({
            forceRefresh,
          }),
          ...TMDB_HOME_SECTION_ORDER.map((sectionKey) =>
            loadSection(sectionKey, {
              forceRefresh,
              page: 1,
            }),
          ),
        ]);
      } finally {
        if (isMountedRef.current && shouldBlockContentReveal) {
          setIsBlockingContentReveal(false);
        }

        if (isMountedRef.current && forceRefresh) {
          setIsRefreshing(false);
        }
      }
    },
    [loadGenres, loadHero, loadSection],
  );

  useEffect(() => {
    void loadAllHomeContent();
  }, [loadAllHomeContent]);

  const handleRefresh = useCallback(() => {
    void loadAllHomeContent(true);
  }, [loadAllHomeContent]);

  const handleRetry = useCallback(() => {
    void loadAllHomeContent(true);
  }, [loadAllHomeContent]);

  const handleRetryCategories = useCallback(() => {
    void loadGenres({
      forceRefresh: true,
    });
  }, [loadGenres]);

  const handleSelectGenre = useCallback((genreId: string) => {
    setSelectedGenreId(genreId);
  }, []);

  const handleLoadMore = useCallback(
    (sectionKey: TmdbHomeSectionKey) => {
      const sectionState = sectionStatesRef.current[sectionKey];

      if (
        sectionState.isLoading ||
        sectionState.isLoadingMore ||
        !sectionState.hasNextPage
      ) {
        return;
      }

      void loadSection(sectionKey, {
        page: sectionState.page + 1,
      });
    },
    [loadSection],
  );

  const homeHeroBanner = useMemo<HomeHeroBannerViewModel | null>(() => {
    const heroItem = heroState.item;

    if (!heroItem) {
      return null;
    }

    return {
      backgroundImageSource: buildImageSource(
        heroItem.backdropUrl || heroItem.posterUrl,
      ),
      backgroundImageTransitionDuration: 0,
      badgeLabel: APP_STRINGS.home.heroTitle,
      description: heroItem.overview || undefined,
      metadataItems: buildHeroMetadataItems(heroItem),
      onPrimaryAction: () => {
        handleOpenDetails(heroItem.id);
      },
      onSecondaryAction: () => {
        handleOpenDetails(heroItem.id);
      },
      primaryActionLabel: APP_STRINGS.common.playNow,
      secondaryActionLabel: APP_STRINGS.common.moreInfo,
      title: heroItem.title,
    };
  }, [handleOpenDetails, heroState.item]);

  const availableGenreIds = useMemo(() => {
    const genreIds = new Set<string>();

    TMDB_HOME_SECTION_ORDER.forEach((sectionKey) => {
      buildVisibleSectionMovies(
        sectionKey,
        sectionStates[sectionKey].items,
        heroState.item,
      ).forEach((movie) => {
        movie.genreIds.forEach((genreId) => {
          genreIds.add(String(genreId));
        });
      });
    });

    return genreIds;
  }, [heroState.item, sectionStates]);

  const activeGenreId = useMemo(() => {
    if (genreState.items.length === 0) {
      return null;
    }

    if (
      selectedGenreId &&
      genreState.items.some((genreItem) => genreItem.id === selectedGenreId)
    ) {
      return selectedGenreId;
    }

    return (
      genreState.items.find((genreItem) => availableGenreIds.has(genreItem.id))?.id ??
      genreState.items[0]?.id ??
      null
    );
  }, [availableGenreIds, genreState.items, selectedGenreId]);

  const categoryItems = useMemo<ReadonlyArray<HomeCategoryChipItem>>(
    () =>
      genreState.items.map((genreItem) => ({
        id: genreItem.id,
        isSelected: genreItem.id === activeGenreId,
        label: genreItem.label,
      })),
    [activeGenreId, genreState.items],
  );

  const handleOpenSection = useCallback(
    (section: HomeSectionItem) => {
      navigation.navigate(ROUTES.SECTION_MOVIES, {
        genreId: activeGenreId,
        sectionKey: section.sectionKey,
        sectionSubtitle: section.subtitle,
        sectionTitle: section.title,
      });
    },
    [activeGenreId, navigation],
  );

  const sectionLoadMoreHandlers = useMemo(
    () =>
      TMDB_HOME_SECTION_ORDER.reduce<Record<TmdbHomeSectionKey, () => void>>(
        (accumulator, sectionKey) => {
          accumulator[sectionKey] = () => {
            handleLoadMore(sectionKey);
          };

          return accumulator;
        },
        {} as Record<TmdbHomeSectionKey, () => void>,
      ),
    [handleLoadMore],
  );

  const sections = useMemo<ReadonlyArray<HomeSectionItem>>(
    () =>
      TMDB_HOME_SECTION_ORDER.map((sectionKey) => {
        const sectionState = sectionStates[sectionKey];
        const sectionDefinition = TMDB_HOME_SECTION_DEFINITIONS[sectionKey];
        const visibleItems = buildVisibleSectionMovies(
          sectionKey,
          sectionState.items,
          heroState.item,
        );
        const filteredItems =
          activeGenreId === null
            ? visibleItems
            : visibleItems.filter((movie) => movieMatchesGenre(movie, activeGenreId));

        return {
          id: `home-section-${sectionKey}`,
          isLoading: sectionState.isLoading,
          isLoadingMore: sectionState.isLoadingMore,
          items: filteredItems.map((movie) =>
            mapMovieToMovieCardProps(movie, () => {
              handleOpenDetails(movie.id);
            }),
          ),
          onEndReached: sectionState.hasNextPage
            ? sectionLoadMoreHandlers[sectionKey]
            : undefined,
          sectionKey,
          subtitle: sectionDefinition.description,
          title: sectionDefinition.title,
        };
      }).filter((section) => section.isLoading || section.items.length > 0),
    [activeGenreId, handleOpenDetails, heroState.item, sectionLoadMoreHandlers, sectionStates],
  );

  const primaryErrorState = useMemo<ScreenErrorState | null>(() => {
    const sectionError =
      TMDB_HOME_SECTION_ORDER
        .map((sectionKey) => sectionStates[sectionKey].error)
        .find(Boolean) ?? null;

    return heroState.error ?? sectionError;
  }, [heroState.error, sectionStates]);

  const allRequestsSettled = useMemo(
    () =>
      heroState.hasLoadedOnce &&
      TMDB_HOME_SECTION_ORDER.every(
        (sectionKey) => sectionStates[sectionKey].hasLoadedOnce,
      ),
    [heroState.hasLoadedOnce, sectionStates],
  );

  const hasSectionContent = useMemo(
    () => sections.some((section) => section.items.length > 0),
    [sections],
  );

  const isGenreSelectionEmpty = useMemo(
    () =>
      activeGenreId !== null &&
      genreState.hasLoadedOnce &&
      !genreState.isLoading &&
      allRequestsSettled &&
      !hasSectionContent,
    [
      activeGenreId,
      allRequestsSettled,
      genreState.hasLoadedOnce,
      genreState.isLoading,
      hasSectionContent,
    ],
  );

  const hasAnyContent = homeHeroBanner !== null || hasSectionContent;

  const shouldShowError = allRequestsSettled && !hasAnyContent && primaryErrorState !== null;
  const isEmpty = allRequestsSettled && !hasAnyContent && primaryErrorState === null;

  return (
    <HomeView
      categoryErrorDescription={genreState.error?.description}
      categoryErrorTitle={genreState.error?.title}
      categoryItems={categoryItems}
      errorDescription={shouldShowError ? primaryErrorState?.description : undefined}
      errorTitle={shouldShowError ? primaryErrorState?.title : undefined}
      headerTitle={APP_STRINGS.home.headerTitle}
      heroBanner={homeHeroBanner}
      isCategoriesLoading={genreState.isLoading}
      isEmpty={isEmpty}
      isGenreSelectionEmpty={isGenreSelectionEmpty}
      isInitialContentLoading={isBlockingContentReveal}
      isRefreshing={isRefreshing}
      onCategoryRetry={handleRetryCategories}
      onCategorySelect={handleSelectGenre}
      onMenuPress={handleOpenSettings}
      onProfilePress={handleOpenProfile}
      onRefresh={handleRefresh}
      onRetry={handleRetry}
      onSectionPress={handleOpenSection}
      profileFallbackLabel={APP_STRINGS.navigation.profile}
      sections={sections}
    />
  );
};

HomeContainerComponent.displayName = 'HomeContainer';

export const HomeContainer = memo(HomeContainerComponent);
