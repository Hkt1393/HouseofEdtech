import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Linking, Share } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

import { APP_CONFIG, APP_STRINGS, ROUTES } from '../../constants';
import {
  movieRepository,
  type HomeMovieItem,
  type MovieDetailItem,
} from '../../services';
import type { RootStackScreenProps } from '../../types';
import type { CastMember } from '../../components/ui';

import {
  DetailsView,
  type DetailGalleryCard,
  type DetailHeroPill,
  type DetailInformationItem,
  type DetailMovieCardItem,
  type DetailTabItem,
} from './view';

interface ScreenErrorState {
  readonly description: string;
  readonly title: string;
}

interface DetailsScreenState {
  readonly error: ScreenErrorState | null;
  readonly isLoading: boolean;
  readonly isRefreshing: boolean;
  readonly item: MovieDetailItem | null;
}

const DETAILS_TAB_ITEMS = [
  {
    key: 'details',
    label: APP_STRINGS.details.detailsTab,
  },
  {
    key: 'cast',
    label: APP_STRINGS.details.castTab,
  },
  {
    key: 'similar',
    label: APP_STRINGS.details.similarTab,
  },
  {
    key: 'recommended',
    label: APP_STRINGS.details.recommendedTab,
  },
  {
    key: 'gallery',
    label: APP_STRINGS.details.galleryTab,
  },
] as const satisfies ReadonlyArray<DetailTabItem>;

const dateFormatter = new Intl.DateTimeFormat(APP_CONFIG.defaultLocale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const currencyFormatter = new Intl.NumberFormat(APP_CONFIG.defaultLocale, {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency',
});

const compactCurrencyFormatter = new Intl.NumberFormat(APP_CONFIG.defaultLocale, {
  currency: 'USD',
  maximumFractionDigits: 1,
  notation: 'compact',
  style: 'currency',
});

const createInitialState = (): DetailsScreenState => ({
  error: null,
  isLoading: true,
  isRefreshing: false,
  item: null,
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

const formatRuntime = (runtimeMinutes: number | null): string => {
  if (!runtimeMinutes || runtimeMinutes <= 0) {
    return APP_STRINGS.common.notAvailable;
  }

  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  if (hours <= 0) {
    return `${runtimeMinutes}${APP_STRINGS.home.minutesShort}`;
  }

  if (minutes <= 0) {
    return `${hours}${APP_STRINGS.home.hoursShort}`;
  }

  return `${hours}${APP_STRINGS.home.hoursShort} ${minutes}${APP_STRINGS.home.minutesShort}`;
};

const formatReleaseDate = (releaseDate: string): string => {
  if (!releaseDate.trim()) {
    return APP_STRINGS.common.notAvailable;
  }

  const timestamp = new Date(releaseDate).getTime();

  if (Number.isNaN(timestamp)) {
    return APP_STRINGS.common.notAvailable;
  }

  return dateFormatter.format(new Date(timestamp));
};

const formatCurrencyValue = (value: number | null): string => {
  if (!value || value <= 0) {
    return APP_STRINGS.common.notAvailable;
  }

  return value >= 1_000_000
    ? compactCurrencyFormatter.format(value)
    : currencyFormatter.format(value);
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

const buildHeroMetadataLabel = (movie: MovieDetailItem): string | undefined => {
  const metadataItems = [
    movie.releaseYear ? String(movie.releaseYear) : null,
    movie.runtimeMinutes ? formatRuntime(movie.runtimeMinutes) : null,
    movie.ageCertification,
    ...movie.genres.slice(0, 2).map((genre) => genre.label),
  ].filter(Boolean);

  return metadataItems.length > 0
    ? metadataItems.join(APP_STRINGS.details.yearAndMetadataSeparator)
    : undefined;
};

const buildHeroPills = (movie: MovieDetailItem): ReadonlyArray<DetailHeroPill> => {
  const pills: DetailHeroPill[] = [
    {
      id: 'media-type',
      label: APP_STRINGS.details.movieBadge,
      tone: 'primary',
    },
  ];

  if (movie.rating !== null) {
    pills.push({
      iconName: 'star',
      id: 'rating',
      label: `${movie.rating}${APP_STRINGS.details.ratingOutOfTenSuffix}`,
      tone: 'neutral',
    });
  }

  return pills;
};

const mapInformationItems = (
  movie: MovieDetailItem,
): ReadonlyArray<DetailInformationItem> => {
  const genreValue =
    movie.genres.map((genre) => genre.label).join(', ') ||
    APP_STRINGS.common.notAvailable;
  const companiesValue =
    movie.productionCompanies.join(', ') || APP_STRINGS.common.notAvailable;

  return [
    {
      id: 'release-date',
      label: APP_STRINGS.details.releaseDateLabel,
      value: formatReleaseDate(movie.releaseDate),
    },
    {
      id: 'language',
      label: APP_STRINGS.details.languageLabel,
      value: movie.language ?? APP_STRINGS.common.notAvailable,
    },
    {
      id: 'runtime',
      label: APP_STRINGS.details.runtimeLabel,
      value: formatRuntime(movie.runtimeMinutes),
    },
    {
      id: 'genres',
      label: APP_STRINGS.details.genresLabel,
      value: genreValue,
    },
    {
      id: 'status',
      label: APP_STRINGS.details.statusLabel,
      value: movie.status ?? APP_STRINGS.common.notAvailable,
    },
    {
      id: 'budget',
      label: APP_STRINGS.details.budgetLabel,
      value: formatCurrencyValue(movie.budget),
    },
    {
      id: 'revenue',
      label: APP_STRINGS.details.revenueLabel,
      value: formatCurrencyValue(movie.revenue),
    },
    {
      id: 'companies',
      label: APP_STRINGS.details.productionCompaniesLabel,
      value: companiesValue,
    },
  ];
};

const buildTrailerSubtitle = (movie: MovieDetailItem): string | undefined => {
  const trailer = movie.trailer;

  if (!trailer) {
    return undefined;
  }

  const metadataItems = [trailer.type, trailer.site].filter(Boolean);

  return metadataItems.length > 0
    ? metadataItems.join(APP_STRINGS.details.yearAndMetadataSeparator)
    : undefined;
};

const mapMovieCardItem = (
  movie: HomeMovieItem,
  onPress: () => void,
): DetailMovieCardItem => ({
  accessibilityLabel: movie.title,
  id: movie.id,
  metadataLabel: buildMovieMetadataLabel(movie),
  onPress,
  posterUrl: movie.posterUrl || movie.backdropUrl,
  showImageLoadingState: false,
  title: movie.title,
});

const mapCastItems = (movie: MovieDetailItem): ReadonlyArray<CastMember> => {
  return movie.cast.map((member) => ({
    id: member.id,
    imageUrl: member.imageUrl,
    name: member.name,
    subtitle: member.character || undefined,
  }));
};

const mapGalleryItems = (
  movie: MovieDetailItem,
): ReadonlyArray<DetailGalleryCard> => {
  return movie.images.map((image) => ({
    aspectRatio: image.aspectRatio,
    id: image.id,
    imageUrl: image.imageUrl,
  }));
};

const prefetchMovieAssets = async (movie: MovieDetailItem): Promise<void> => {
  const uniqueUrls = Array.from(
    new Set(
      [
        movie.backdropUrl,
        movie.posterUrl,
        movie.trailer?.thumbnailUrl ?? '',
        ...movie.images.map((image) => image.imageUrl),
        ...movie.cast.map((member) => member.imageUrl ?? ''),
        ...movie.similar.flatMap((item) => [item.posterUrl, item.backdropUrl]),
        ...movie.recommendations.flatMap((item) => [
          item.posterUrl,
          item.backdropUrl,
        ]),
      ].filter((imageUrl): imageUrl is string => imageUrl.trim().length > 0),
    ),
  );

  if (uniqueUrls.length === 0) {
    return;
  }

  await Promise.allSettled(
    uniqueUrls.map((imageUrl) => ExpoImage.prefetch(imageUrl, 'memory-disk')),
  );
};

const DetailsContainerComponent = ({
  navigation,
  route,
}: RootStackScreenProps<typeof ROUTES.MOVIE_DETAILS>) => {
  const { movieId } = route.params;
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const [state, setState] = useState<DetailsScreenState>(createInitialState);
  const [selectedTab, setSelectedTab] = useState<DetailTabItem['key']>('details');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadDetails = useCallback(
    async (
      options?: {
        readonly forceRefresh?: boolean;
        readonly isRefreshing?: boolean;
      },
    ) => {
      const requestId = requestIdRef.current + 1;

      requestIdRef.current = requestId;

      if (options?.forceRefresh) {
        movieRepository.clearMovieDetailCache(movieId);
      }

      setState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: currentState.item ? currentState.isLoading : !options?.isRefreshing,
        isRefreshing: Boolean(options?.isRefreshing),
      }));

      const response = await movieRepository.getMovieDetails(movieId, {
        forceRefresh: options?.forceRefresh,
      });

      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      if (!response.success || !response.data) {
        const nextError = buildErrorState(
          response.error?.message ?? response.message,
          response.error?.code,
        );

        setState((currentState) => ({
          ...currentState,
          error: currentState.item ? null : nextError,
          isLoading: false,
          isRefreshing: false,
        }));

        return;
      }

      await prefetchMovieAssets(response.data);

      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      setState({
        error: null,
        isLoading: false,
        isRefreshing: false,
        item: response.data,
      });
    },
    [movieId],
  );

  useEffect(() => {
    setState(createInitialState());
    setSelectedTab('details');
    setIsFavorite(false);
    setIsOverviewExpanded(false);
    setIsGalleryVisible(false);
    setGalleryInitialIndex(0);

    void loadDetails();
  }, [loadDetails, movieId]);

  const openExternalUrl = useCallback(async (url?: string | null) => {
    if (!url) {
      return;
    }

    try {
      await Linking.openURL(url);
    } catch {
      // Ignore open-url failures and keep the screen stable.
    }
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRefresh = useCallback(() => {
    void loadDetails({
      forceRefresh: true,
      isRefreshing: true,
    });
  }, [loadDetails]);

  const handleRetry = useCallback(() => {
    void loadDetails({
      forceRefresh: true,
    });
  }, [loadDetails]);

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((currentValue) => !currentValue);
  }, []);

  const handleOverviewToggle = useCallback(() => {
    setIsOverviewExpanded((currentValue) => !currentValue);
  }, []);

  const handleSelectTab = useCallback((tabKey: DetailTabItem['key']) => {
    setSelectedTab(tabKey);
  }, []);

  const handleGalleryImagePress = useCallback((index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryVisible(true);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setIsGalleryVisible(false);
  }, []);

  const handleSharePress = useCallback(async () => {
    if (!state.item) {
      return;
    }

    try {
      await Share.share({
        message: state.item.homepageUrl ?? state.item.tmdbShareUrl,
        title: state.item.title,
        url: state.item.homepageUrl ?? state.item.tmdbShareUrl,
      });
    } catch {
      // Ignore share failures and keep the screen usable.
    }
  }, [state.item]);

  const playUrl = state.item?.trailer?.url ?? state.item?.homepageUrl ?? null;

  const handleFooterActionPress = useCallback(() => {
    void openExternalUrl(playUrl);
  }, [openExternalUrl, playUrl]);

  const handleTrailerActionPress = useCallback(() => {
    void openExternalUrl(state.item?.trailer?.url);
  }, [openExternalUrl, state.item?.trailer?.url]);

  const handleOpenMovie = useCallback(
    (nextMovieId: string) => {
      navigation.push(ROUTES.MOVIE_DETAILS, {
        movieId: nextMovieId,
      });
    },
    [navigation],
  );

  const heroPills = useMemo(
    () => (state.item ? buildHeroPills(state.item) : []),
    [state.item],
  );

  const castItems = useMemo<ReadonlyArray<CastMember>>(
    () => (state.item ? mapCastItems(state.item) : []),
    [state.item],
  );

  const galleryItems = useMemo<ReadonlyArray<DetailGalleryCard>>(
    () => (state.item ? mapGalleryItems(state.item) : []),
    [state.item],
  );

  const informationItems = useMemo<ReadonlyArray<DetailInformationItem>>(
    () => (state.item ? mapInformationItems(state.item) : []),
    [state.item],
  );

  const similarItems = useMemo<ReadonlyArray<DetailMovieCardItem>>(
    () =>
      state.item
        ? state.item.similar.map((movie) =>
            mapMovieCardItem(movie, () => {
              handleOpenMovie(movie.id);
            }),
          )
        : [],
    [handleOpenMovie, state.item],
  );

  const recommendedItems = useMemo<ReadonlyArray<DetailMovieCardItem>>(
    () =>
      state.item
        ? state.item.recommendations.map((movie) =>
            mapMovieCardItem(movie, () => {
              handleOpenMovie(movie.id);
            }),
          )
        : [],
    [handleOpenMovie, state.item],
  );

  const trailerCard = useMemo(
    () =>
      state.item?.trailer
        ? {
            imageUrl:
              state.item.trailer.thumbnailUrl ||
              state.item.backdropUrl ||
              state.item.posterUrl,
            subtitle: buildTrailerSubtitle(state.item),
            title: state.item.trailer.name || APP_STRINGS.details.trailerSection,
          }
        : null,
    [state.item],
  );

  return (
    <DetailsView
      castItems={castItems}
      errorDescription={state.error?.description}
      errorTitle={state.error?.title}
      footerActionDisabled={!playUrl}
      galleryInitialIndex={galleryInitialIndex}
      galleryItems={galleryItems}
      heroBackdropUrl={state.item?.backdropUrl ?? state.item?.posterUrl ?? ''}
      heroMetadataLabel={state.item ? buildHeroMetadataLabel(state.item) : undefined}
      heroPills={heroPills}
      heroTitle={state.item?.title ?? ''}
      informationItems={informationItems}
      isFavorite={isFavorite}
      isGalleryVisible={isGalleryVisible}
      isLoading={state.isLoading}
      isOverviewExpanded={isOverviewExpanded}
      isRefreshing={state.isRefreshing}
      onBackPress={handleBackPress}
      onCloseGallery={handleCloseGallery}
      onFooterActionPress={handleFooterActionPress}
      onGalleryImagePress={handleGalleryImagePress}
      onOverviewToggle={handleOverviewToggle}
      onRefresh={handleRefresh}
      onRetry={handleRetry}
      onSelectTab={handleSelectTab}
      onSharePress={handleSharePress}
      onToggleFavorite={handleToggleFavorite}
      onTrailerActionPress={handleTrailerActionPress}
      overview={
        state.item?.overview ||
        state.item?.tagline ||
        APP_STRINGS.common.notAvailable
      }
      recommendedItems={recommendedItems}
      selectedTab={selectedTab}
      similarItems={similarItems}
      tabItems={DETAILS_TAB_ITEMS}
      trailerActionDisabled={!state.item?.trailer?.url}
      trailerCard={trailerCard}
    />
  );
};

DetailsContainerComponent.displayName = 'DetailsContainer';

export const DetailsContainer = memo(DetailsContainerComponent);
