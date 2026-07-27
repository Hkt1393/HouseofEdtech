import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';

import { APP_STRINGS, ROUTES, VALIDATION_RULES } from '../../constants';
import {
  movieRepository,
  searchRepository,
  type HomeGenreItem,
  type HomeMovieItem,
  type SearchPopularPerson,
} from '../../services';
import type {
  MainTabScreenProps,
  SearchResult,
  TrendingSearch,
} from '../../types';

import {
  SearchView,
  type SearchCategoryCardItem,
  type SearchMovieRailItem,
  type SearchRecommendedHeroItem,
  type SearchResultListItem,
  type SearchTalentItem,
  type SearchTrendingChipItem,
} from './view';

interface ScreenErrorState {
  readonly description: string;
  readonly title: string;
}

interface SearchDiscoveryState {
  readonly categories: ReadonlyArray<SearchCategoryCardItem>;
  readonly error: ScreenErrorState | null;
  readonly headerAvatarImageUrl: string | null;
  readonly isLoading: boolean;
  readonly recommendedHero: SearchRecommendedHeroItem | null;
  readonly recommendedItems: ReadonlyArray<SearchMovieRailItem>;
  readonly talentItems: ReadonlyArray<SearchTalentItem>;
  readonly trendingSearches: ReadonlyArray<SearchTrendingChipItem>;
}

interface SearchResultsState {
  readonly error: ScreenErrorState | null;
  readonly isLoading: boolean;
  readonly isRefreshing: boolean;
  readonly items: ReadonlyArray<SearchResultListItem>;
  readonly query: string;
}

const SEARCH_DEBOUNCE_MS = 400;

const createInitialDiscoveryState = (): SearchDiscoveryState => ({
  categories: [],
  error: null,
  headerAvatarImageUrl: null,
  isLoading: true,
  recommendedHero: null,
  recommendedItems: [],
  talentItems: [],
  trendingSearches: [],
});

const createInitialResultsState = (): SearchResultsState => ({
  error: null,
  isLoading: false,
  isRefreshing: false,
  items: [],
  query: '',
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

const buildGenreLookup = (
  genres: ReadonlyArray<HomeGenreItem>,
): ReadonlyMap<number, string> => {
  return new Map(
    genres.map((genre) => [Number(genre.id), genre.label]),
  );
};

const buildMovieMetadataLabel = (
  movie: HomeMovieItem,
  genreLookup: ReadonlyMap<number, string>,
): string | undefined => {
  const firstGenreLabel = movie.genreIds
    .map((genreId) => genreLookup.get(genreId))
    .find((label): label is string => Boolean(label));

  const metadataItems = [
    movie.rating !== null ? `${APP_STRINGS.home.ratingSourceLabel} ${movie.rating}` : null,
    movie.releaseYear ? String(movie.releaseYear) : null,
    firstGenreLabel ?? null,
  ].filter(Boolean);

  return metadataItems.length > 0
    ? metadataItems.join(APP_STRINGS.home.metadataSeparator)
    : undefined;
};

const mapMovieToRailItem = (
  movie: HomeMovieItem,
  genreLookup: ReadonlyMap<number, string>,
  onPress: () => void,
): SearchMovieRailItem => ({
  accessibilityLabel: movie.title,
  id: movie.id,
  metadataLabel: buildMovieMetadataLabel(movie, genreLookup),
  onPress,
  posterUrl: movie.posterUrl || movie.backdropUrl,
  showImageLoadingState: false,
  title: movie.title,
});

const mapSearchResultToListItem = (
  result: SearchResult,
  onPress: () => void,
): SearchResultListItem => {
  const metadataItems = [
    result.rating !== null ? `${APP_STRINGS.home.ratingSourceLabel} ${result.rating}` : null,
    result.releaseYear ? String(result.releaseYear) : null,
    result.genres.length > 1 ? result.genres[1] : null,
  ].filter(Boolean);

  return {
    accessibilityLabel: result.title,
    id: String(result.id),
    imageUrl: result.posterUrl || result.backdropUrl,
    metadataLabel:
      metadataItems.length > 0
        ? metadataItems.join(APP_STRINGS.home.metadataSeparator)
        : undefined,
    onPress,
    subtitle: result.genres[0] ?? undefined,
    title: result.title,
  };
};

const buildTrendingSearchItems = (
  items: ReadonlyArray<TrendingSearch>,
  onPress: (query: string) => void,
): ReadonlyArray<SearchTrendingChipItem> => {
  return items.map((item) => ({
    accessibilityLabel: item.query,
    id: item.id,
    label: item.query,
    onPress: () => {
      onPress(item.query);
    },
  }));
};

const buildTalentItems = (
  people: ReadonlyArray<SearchPopularPerson>,
): ReadonlyArray<SearchTalentItem> => {
  return people.map((person) => ({
    id: person.id,
    imageUrl: person.imageUrl,
    name: person.name,
  }));
};

const buildCategoryItems = (
  genres: ReadonlyArray<HomeGenreItem>,
  popularMovies: ReadonlyArray<HomeMovieItem>,
  onPress: (label: string) => void,
): ReadonlyArray<SearchCategoryCardItem> => {
  const genreLookup = buildGenreLookup(genres);
  const categoryCandidates = new Map<
    number,
    {
      readonly count: number;
      readonly imageUrl: string;
      readonly label: string;
    }
  >();

  popularMovies.forEach((movie) => {
    const imageUrl = movie.backdropUrl || movie.posterUrl;

    if (!imageUrl) {
      return;
    }

    movie.genreIds.forEach((genreId) => {
      const label = genreLookup.get(genreId);

      if (!label) {
        return;
      }

      const existingCandidate = categoryCandidates.get(genreId);

      categoryCandidates.set(genreId, {
        count: (existingCandidate?.count ?? 0) + 1,
        imageUrl: existingCandidate?.imageUrl ?? imageUrl,
        label,
      });
    });
  });

  return Array.from(categoryCandidates.entries())
    .sort((left, right) => right[1].count - left[1].count)
    .slice(0, 4)
    .map(([genreId, item]) => ({
      accessibilityLabel: item.label,
      id: String(genreId),
      imageUrl: item.imageUrl,
      label: item.label,
      onPress: () => {
        onPress(item.label);
      },
    }));
};

const buildRecommendedHero = (
  movie: HomeMovieItem | null,
  genreLookup: ReadonlyMap<number, string>,
  onPress: (movieId: string) => void,
): SearchRecommendedHeroItem | null => {
  if (!movie) {
    return null;
  }

  return {
    badgeLabel: APP_STRINGS.search.recommendedBadge,
    id: movie.id,
    imageUrl: movie.backdropUrl || movie.posterUrl,
    metadataLabel: buildMovieMetadataLabel(movie, genreLookup),
    onPress: () => {
      onPress(movie.id);
    },
    title: movie.title,
  };
};

const prefetchImageUrls = async (
  imageUrls: ReadonlyArray<string | null | undefined>,
): Promise<void> => {
  const uniqueImageUrls = Array.from(
    new Set(
      imageUrls.filter((imageUrl): imageUrl is string => Boolean(imageUrl && imageUrl.length > 0)),
    ),
  );

  if (uniqueImageUrls.length === 0) {
    return;
  }

  await Promise.allSettled(
    uniqueImageUrls.map((imageUrl) => ExpoImage.prefetch(imageUrl, 'memory-disk')),
  );
};

const SearchContainerComponent = ({
  navigation,
}: MainTabScreenProps<typeof ROUTES.SEARCH>) => {
  const discoveryRequestIdRef = useRef(0);
  const isTrendingPrefillRef = useRef(false);
  const isMountedRef = useRef(true);
  const resultsRequestIdRef = useRef(0);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [discoveryState, setDiscoveryState] = useState<SearchDiscoveryState>(
    createInitialDiscoveryState,
  );
  const [query, setQuery] = useState('');
  const [resultsState, setResultsState] = useState<SearchResultsState>(
    createInitialResultsState,
  );

  const normalizedQuery = query.trim().slice(0, VALIDATION_RULES.search.maxQueryLength);
  const normalizedDebouncedQuery = debouncedQuery
    .trim()
    .slice(0, VALIDATION_RULES.search.maxQueryLength);
  const isResultsMode =
    normalizedQuery.length >= VALIDATION_RULES.search.minQueryLength;

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const resetSearchState = useCallback(() => {
    isTrendingPrefillRef.current = false;
    resultsRequestIdRef.current += 1;
    setDebouncedQuery('');
    setQuery('');
    setResultsState(createInitialResultsState());
  }, []);

  const handleChangeQuery = useCallback((value: string) => {
    isTrendingPrefillRef.current = false;
    setQuery(value);
  }, []);

  const handleSelectTrendingQuery = useCallback((value: string) => {
    isTrendingPrefillRef.current = true;
    setQuery(value);
  }, []);

  const handleFillQuery = useCallback((value: string) => {
    isTrendingPrefillRef.current = false;
    setQuery(value);
  }, []);

  const handleOpenDetails = useCallback(
    (movieId: string) => {
      navigation.navigate(ROUTES.MOVIE_DETAILS, {
        movieId,
      });
    },
    [navigation],
  );

  const loadDiscovery = useCallback(
    async (forceRefresh: boolean = false) => {
      const requestId = discoveryRequestIdRef.current + 1;

      discoveryRequestIdRef.current = requestId;

      setDiscoveryState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: currentState.trendingSearches.length === 0 && currentState.categories.length === 0,
      }));

      const [
        trendingResponse,
        genresResponse,
        popularPeopleResponse,
        popularMoviesResponse,
        topRatedMoviesResponse,
      ] = await Promise.all([
        searchRepository.getTrendingSearches({ forceRefresh }),
        movieRepository.getHomeGenres({ forceRefresh }),
        searchRepository.getPopularPeople({ forceRefresh }),
        movieRepository.getHomeSection('popular', { forceRefresh }),
        movieRepository.getHomeSection('topRated', { forceRefresh }),
      ]);

      if (!isMountedRef.current || requestId !== discoveryRequestIdRef.current) {
        return;
      }

      const genres = genresResponse.success ? genresResponse.data ?? [] : [];
      const popularMovies = popularMoviesResponse.success
        ? popularMoviesResponse.data ?? []
        : [];
      const topRatedMovies = topRatedMoviesResponse.success
        ? topRatedMoviesResponse.data ?? []
        : [];
      const trendingSearches = trendingResponse.success
        ? trendingResponse.data ?? []
        : [];
      const popularPeople = popularPeopleResponse.success
        ? popularPeopleResponse.data ?? []
        : [];
      const genreLookup = buildGenreLookup(genres);
      const recommendedSource = topRatedMovies.length > 0 ? topRatedMovies : popularMovies;
      const recommendedHeroMovie =
        recommendedSource.find((movie) => movie.backdropUrl.length > 0) ??
        recommendedSource[0] ??
        null;
      const recommendedItems = recommendedSource
        .filter((movie) => movie.id !== recommendedHeroMovie?.id)
        .slice(0, 8)
        .map((movie) =>
          mapMovieToRailItem(movie, genreLookup, () => {
            handleOpenDetails(movie.id);
          }),
        );

      const nextState: SearchDiscoveryState = {
        categories: buildCategoryItems(genres, popularMovies, handleFillQuery),
        error: null,
        headerAvatarImageUrl:
          popularPeople.find((person) => person.imageUrl)?.imageUrl ?? null,
        isLoading: false,
        recommendedHero: buildRecommendedHero(
          recommendedHeroMovie,
          genreLookup,
          handleOpenDetails,
        ),
        recommendedItems,
        talentItems: buildTalentItems(popularPeople),
        trendingSearches: buildTrendingSearchItems(
          trendingSearches,
          handleSelectTrendingQuery,
        ),
      };

      await prefetchImageUrls([
        nextState.headerAvatarImageUrl,
        ...nextState.categories.map((item) => item.imageUrl),
        ...nextState.talentItems.map((item) => item.imageUrl),
        nextState.recommendedHero?.imageUrl ?? null,
        ...nextState.recommendedItems.map((item) => item.posterUrl),
      ]);

      if (!isMountedRef.current || requestId !== discoveryRequestIdRef.current) {
        return;
      }

      const hasContent =
        nextState.trendingSearches.length > 0 ||
        nextState.categories.length > 0 ||
        nextState.talentItems.length > 0 ||
        Boolean(nextState.recommendedHero) ||
        nextState.recommendedItems.length > 0;

      if (!hasContent) {
        const failingResponse =
          !trendingResponse.success ? trendingResponse
          : !genresResponse.success ? genresResponse
          : !popularPeopleResponse.success ? popularPeopleResponse
          : !popularMoviesResponse.success ? popularMoviesResponse
          : !topRatedMoviesResponse.success ? topRatedMoviesResponse
          : null;

        setDiscoveryState({
          ...nextState,
          error: buildErrorState(
            failingResponse?.error?.message ?? APP_STRINGS.search.discoveryErrorDescription,
            failingResponse?.error?.code,
          ),
        });

        return;
      }

      setDiscoveryState(nextState);
    },
    [handleFillQuery, handleOpenDetails, handleSelectTrendingQuery],
  );

  const loadSearchResults = useCallback(
    async (
      nextQuery: string,
      options?: {
        readonly forceRefresh?: boolean;
        readonly isRefreshing?: boolean;
      },
    ) => {
      const requestId = resultsRequestIdRef.current + 1;

      resultsRequestIdRef.current = requestId;

      setResultsState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: !options?.isRefreshing,
        isRefreshing: Boolean(options?.isRefreshing),
        query: nextQuery,
      }));

      const response = await searchRepository.searchMovies(nextQuery, {
        forceRefresh: options?.forceRefresh,
      });

      if (!isMountedRef.current || requestId !== resultsRequestIdRef.current) {
        return;
      }

      if (!response.success) {
        const nextError = buildErrorState(
          response.error?.message ?? response.message,
          response.error?.code,
        );

        setResultsState((currentState) => ({
          ...currentState,
          error: currentState.items.length > 0 ? null : nextError,
          isLoading: false,
          isRefreshing: false,
        }));

        return;
      }

      const nextItems = (response.data ?? []).map((item) =>
        mapSearchResultToListItem(item, () => {
          handleOpenDetails(String(item.id));
        }),
      );

      await prefetchImageUrls(
        (response.data ?? []).flatMap((item) => [item.posterUrl, item.backdropUrl]),
      );

      if (!isMountedRef.current || requestId !== resultsRequestIdRef.current) {
        return;
      }

      setResultsState({
        error: null,
        isLoading: false,
        isRefreshing: false,
        items: nextItems,
        query: nextQuery,
      });
    },
    [handleOpenDetails],
  );

  useEffect(() => {
    void loadDiscovery();
  }, [loadDiscovery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    if (normalizedQuery.length < VALIDATION_RULES.search.minQueryLength) {
      resultsRequestIdRef.current += 1;
      setResultsState(createInitialResultsState());
      return;
    }

    setResultsState((currentState) => {
      if (currentState.query === normalizedQuery && currentState.isLoading) {
        return currentState;
      }

      return {
        ...currentState,
        error: null,
        isLoading: true,
        isRefreshing: false,
        items: [],
        query: normalizedQuery,
      };
    });
  }, [normalizedQuery]);

  useEffect(() => {
    if (
      normalizedDebouncedQuery.length < VALIDATION_RULES.search.minQueryLength
    ) {
      return;
    }

    void loadSearchResults(normalizedDebouncedQuery);
  }, [loadSearchResults, normalizedDebouncedQuery]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!isTrendingPrefillRef.current) {
          return;
        }

        resetSearchState();
      };
    }, [resetSearchState]),
  );

  const handleMenuPress = useCallback(() => {
    navigation.navigate(ROUTES.SETTINGS);
  }, [navigation]);

  const handleProfilePress = useCallback(() => {
    navigation.navigate(ROUTES.PROFILE);
  }, [navigation]);

  const handleVoiceSearchPress = useCallback(() => {
    navigation.navigate(ROUTES.SETTINGS);
  }, [navigation]);

  const handleRefresh = useCallback(() => {
    if (isResultsMode && normalizedDebouncedQuery.length >= VALIDATION_RULES.search.minQueryLength) {
      void loadSearchResults(normalizedDebouncedQuery, {
        forceRefresh: true,
        isRefreshing: true,
      });

      return;
    }

    void loadDiscovery(true);
  }, [isResultsMode, loadDiscovery, loadSearchResults, normalizedDebouncedQuery]);

  const handleRetry = useCallback(() => {
    if (isResultsMode && normalizedDebouncedQuery.length >= VALIDATION_RULES.search.minQueryLength) {
      void loadSearchResults(normalizedDebouncedQuery, {
        forceRefresh: true,
      });

      return;
    }

    void loadDiscovery(true);
  }, [isResultsMode, loadDiscovery, loadSearchResults, normalizedDebouncedQuery]);

  const isResultsLoading =
    resultsState.isLoading ||
    (isResultsMode && normalizedQuery !== normalizedDebouncedQuery);

  return (
    <SearchView
      categories={discoveryState.categories}
      discoveryErrorDescription={discoveryState.error?.description}
      discoveryErrorTitle={discoveryState.error?.title}
      headerAvatarImageUrl={discoveryState.headerAvatarImageUrl}
      isDiscoveryLoading={discoveryState.isLoading}
      isRefreshing={isResultsMode ? resultsState.isRefreshing : false}
      isResultsLoading={isResultsLoading}
      isResultsMode={isResultsMode}
      onChangeQuery={handleChangeQuery}
      onMenuPress={handleMenuPress}
      onProfilePress={handleProfilePress}
      onRefresh={handleRefresh}
      onRetry={handleRetry}
      onVoiceSearchPress={handleVoiceSearchPress}
      query={query}
      recommendedHero={discoveryState.recommendedHero}
      recommendedItems={discoveryState.recommendedItems}
      results={resultsState.items}
      resultsErrorDescription={resultsState.error?.description}
      resultsErrorTitle={resultsState.error?.title}
      talentItems={discoveryState.talentItems}
      trendingSearches={discoveryState.trendingSearches}
    />
  );
};

SearchContainerComponent.displayName = 'SearchContainer';

export const SearchContainer = memo(SearchContainerComponent);
