/**
 * Centralized navigation route constants.
 */

export const ROUTES = {
  SPLASH: 'Splash',
  AUTH: 'Auth',
  LOGIN: 'Login',
  MAIN_TABS: 'MainTabs',
  HOME: 'Home',
  SEARCH: 'Search',
  DOWNLOADS: 'Downloads',
  PROFILE: 'Profile',
  MOVIE_DETAILS: 'MovieDetails',
  SETTINGS: 'Settings',
} as const;

export const AUTH_ROUTES = {
  LOGIN: ROUTES.LOGIN,
} as const;

export const MAIN_TAB_ROUTES = {
  HOME: ROUTES.HOME,
  SEARCH: ROUTES.SEARCH,
  PROFILE: ROUTES.PROFILE,
} as const;

export const ROOT_STACK_ROUTES = {
  SPLASH: ROUTES.SPLASH,
  AUTH: ROUTES.AUTH,
  MAIN_TABS: ROUTES.MAIN_TABS,
  MOVIE_DETAILS: ROUTES.MOVIE_DETAILS,
  SETTINGS: ROUTES.SETTINGS,
} as const;

export const ROUTE_PATHS = {
  SPLASH: 'splash',
  AUTH: 'auth',
  LOGIN: 'login',
  MAIN_TABS: 'main',
  HOME: 'home',
  SEARCH: 'search',
  DOWNLOADS: 'downloads',
  PROFILE: 'profile',
  MOVIE_DETAILS: 'movie-details/:movieId',
  SETTINGS: 'settings',
} as const;
