/**
 * Application-level configuration and non-visual foundation constants.
 */

const APP_SLUG = 'houseofedtechproject';
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const HOURS_IN_DAY = 24;
const STANDARD_PAGE_SIZE = 20;
const LANDSCAPE_ASPECT_RATIO = 16 / 9;
const POSTER_ASPECT_RATIO = 2 / 3;
const SQUARE_ASPECT_RATIO = 1;

export const APP_NAMESPACE = '@houseofedtechproject';

export const APP_CONFIG = {
  slug: APP_SLUG,
  deepLinkScheme: APP_SLUG,
  deepLinkPrefix: `${APP_SLUG}://`,
  defaultLocale: 'en-US',
  supportedLocales: ['en-US'],
} as const;

export const PAGINATION_CONFIG = {
  initialPage: 1,
  homeRailPageSize: 12,
  searchPageSize: STANDARD_PAGE_SIZE,
  downloadsPageSize: STANDARD_PAGE_SIZE,
  watchHistoryPageSize: STANDARD_PAGE_SIZE,
} as const;

export const API_CONFIG = {
  mockDelayMs: 800,
  requestTimeoutMs: 10 * MILLISECONDS_IN_SECOND,
  cacheTtlMs: 5 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
  staleTtlMs: 1 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
  sessionRefreshBufferMs: 2 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
} as const;

export const MEDIA_LAYOUT = {
  heroAspectRatio: LANDSCAPE_ASPECT_RATIO,
  thumbnailAspectRatio: LANDSCAPE_ASPECT_RATIO,
  posterAspectRatio: POSTER_ASPECT_RATIO,
  avatarAspectRatio: SQUARE_ASPECT_RATIO,
  featuredCarouselCardWidth: 240,
  railPosterCardWidth: 144,
  railBackdropCardWidth: 220,
} as const;

export const DEFAULT_ASSET_KEYS = {
  avatar: 'default-avatar',
  poster: 'default-poster',
  thumbnail: 'default-thumbnail',
  backdrop: 'default-backdrop',
} as const;

export const SESSION_CONFIG = {
  maxConcurrentStreams: 2,
  watchHistoryRetentionHours: 7 * HOURS_IN_DAY,
  maxDownloadsPerDevice: 25,
} as const;
