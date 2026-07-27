/**
 * Application-level configuration and non-visual foundation constants.
 */

const APP_SLUG = 'houseofedtechproject';
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 5000;
const HOURS_IN_DAY = 24;
const STANDARD_PAGE_SIZE = 20;
const LANDSCAPE_ASPECT_RATIO = 16 / 9;
const POSTER_ASPECT_RATIO = 2 / 3;
const SQUARE_ASPECT_RATIO = 1;
const DEFAULT_MAX_CONTENT_WIDTH = 1200;

export const APP_NAMESPACE = '@houseofedtechproject';

export const APP_CONFIG = {
  slug: APP_SLUG,
  deepLinkScheme: APP_SLUG,
  deepLinkPrefix: `${APP_SLUG}://`,
  defaultLocale: 'en-US',
  marketingVersion: '4.2.0',
  splashDurationMs: 2 * MILLISECONDS_IN_SECOND,
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

export const COMPONENT_DEFAULTS = {
  flatList: {
    windowSize: 5,
    initialNumToRender: 6,
    maxToRenderPerBatch: 8,
    removeClippedSubviews: true,
    keyboardShouldPersistTaps: 'handled',
    showsVerticalScrollIndicator: false,
  },
  scrollView: {
    bounces: false,
    keyboardShouldPersistTaps: 'handled',
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
  },
  textInput: {
    multilineMinHeight: 120,
  },
  video: {
    timeUpdateEventIntervalSeconds: 0.25,
  },
  layout: {
    maxContentWidth: DEFAULT_MAX_CONTENT_WIDTH,
    dividerThickness: 1,
    sectionHeaderMaxWidth: 720,
    sheetHandleWidth: 56,
    sheetHandleHeight: 4,
  },
  button: {
    iconSize: 18,
    iconSizemd:22,
    minHeightSm: 40,
    minHeightMd: 48,
    minHeightLg: 56,
    fabSize: 56,
    iconButtonSizeSm: 40,
    iconButtonSizeMd: 48,
    iconButtonSizeLg: 56,
  },
  media: {
    avatarSizeXs: 24,
    avatarSizeSm: 32,
    avatarSizeMd: 40,
    avatarSizeLg: 56,
    avatarSizeXl: 72,
    avatarSize2xl: 104,
    heroMinHeight: 320,
    progressLabelMinWidth: 40,
    posterWidth: 144,
    thumbnailWidth: 220,
  },
  navigation: {
    tabItemMinWidth: 72,
  },
  progress: {
    compactHeight: 4,
    defaultHeight: 6,
    largeHeight: 8,
  },
  modal: {
    dialogMaxWidth: 420,
    sheetMaxWidth: 720,
  },
  feedback: {
    skeletonPulseOpacity: 0.55,
  },
} as const;
