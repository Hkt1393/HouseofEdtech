/**
 * TMDB-specific configuration and Home-section metadata.
 */

import { APP_STRINGS } from './strings';

export const TMDB_CONFIG = {
  apiBaseUrl: 'https://api.themoviedb.org/3',
  defaultLanguage: 'en-US',
  defaultRegion: 'US',
  imageBaseUrl: 'https://image.tmdb.org/t/p',
  homeInitialPage: 1,
  backdropSize: 'w1280',
  posterSize: 'w342',
} as const;

export const TMDB_ENV_KEYS = {
  accessToken: 'EXPO_PUBLIC_TMDB_ACCESS_TOKEN',
  apiKey: 'EXPO_PUBLIC_TMDB_API_KEY',
} as const;

export const TMDB_HOME_SECTION_DEFINITIONS = {
  trending: {
    description: APP_STRINGS.home.trendingMoviesSectionDescription,
    endpoint: '/trending/movie/day',
    title: APP_STRINGS.home.trendingMoviesSection,
  },
  popular: {
    description: APP_STRINGS.home.popularMoviesSectionDescription,
    endpoint: '/movie/popular',
    title: APP_STRINGS.home.popularMoviesSection,
  },
  topRated: {
    description: APP_STRINGS.home.topRatedSectionDescription,
    endpoint: '/movie/top_rated',
    title: APP_STRINGS.home.topRatedSection,
  },
  upcoming: {
    description: APP_STRINGS.home.upcomingSectionDescription,
    endpoint: '/movie/upcoming',
    title: APP_STRINGS.home.upcomingSection,
  },
  nowPlaying: {
    description: APP_STRINGS.home.nowPlayingSectionDescription,
    endpoint: '/movie/now_playing',
    title: APP_STRINGS.home.nowPlayingSection,
  },
} as const;

export const TMDB_HOME_SECTION_ORDER = [
  'trending',
  'popular',
  'topRated',
  'upcoming',
  'nowPlaying',
] as const satisfies ReadonlyArray<keyof typeof TMDB_HOME_SECTION_DEFINITIONS>;

export type TmdbHomeSectionKey = keyof typeof TMDB_HOME_SECTION_DEFINITIONS;
