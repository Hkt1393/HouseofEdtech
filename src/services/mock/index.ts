/**
 * Typed accessors and lightweight mutable state for mock backend datasets.
 */

import type {
  AppSettings,
  Banner,
  Category,
  CategoryRow,
  ContinueWatching,
  DownloadItem,
  DownloadsOverview,
  Movie,
  MovieDetails,
  SearchHistory,
  SearchResult,
  SearchSuggestion,
  StorageInfo,
  ThemePreference,
  TrendingMovie,
  TrendingSearch,
  UserProfile,
  WatchHistory,
} from '../../types';

import bannersSource from './banners.json';
import categoriesSource from './categories.json';
import downloadsSource from './downloads.json';
import moviesSource from './movies.json';
import profileSource from './profile.json';
import searchSource from './search.json';
import settingsSource from './settings.json';

interface MoviesMockData {
  readonly movies: ReadonlyArray<Movie>;
  readonly movieDetails: ReadonlyArray<MovieDetails>;
  readonly continueWatching: ReadonlyArray<ContinueWatching>;
  readonly trending: ReadonlyArray<TrendingMovie>;
}

interface BannersMockData {
  readonly banners: ReadonlyArray<Banner>;
}

interface CategoriesMockData {
  readonly categories: ReadonlyArray<Category>;
  readonly rows: ReadonlyArray<CategoryRow>;
}

interface ProfileMockData {
  readonly profile: UserProfile;
  readonly watchHistory: ReadonlyArray<WatchHistory>;
}

interface DownloadsMockData {
  readonly items: ReadonlyArray<DownloadItem>;
  readonly storageInfo: StorageInfo;
}

interface SearchMockData {
  readonly results: ReadonlyArray<SearchResult>;
  readonly suggestions: ReadonlyArray<SearchSuggestion>;
  readonly trendingSearches: ReadonlyArray<TrendingSearch>;
  readonly recentSearches: ReadonlyArray<SearchHistory>;
}

interface SettingsMockData {
  readonly settings: AppSettings;
}

const moviesMockData = moviesSource as MoviesMockData;
const bannersMockData = bannersSource as BannersMockData;
const categoriesMockData = categoriesSource as CategoriesMockData;
const profileMockData = profileSource as ProfileMockData;
const downloadsMockData = downloadsSource as DownloadsMockData;
const searchMockData = searchSource as SearchMockData;
const settingsMockData = settingsSource as SettingsMockData;

const downloadStorageCapacityBytes = downloadsMockData.storageInfo.totalBytes;

const cloneDownloadItem = (item: DownloadItem): DownloadItem => ({
  ...item,
});

const cloneProfile = (profile: UserProfile): UserProfile => ({
  ...profile,
  subscription: {
    ...profile.subscription,
  },
});

const cloneSettings = (settings: AppSettings): AppSettings => ({
  ...settings,
  appearance: {
    ...settings.appearance,
  },
  notifications: {
    ...settings.notifications,
  },
  playback: {
    ...settings.playback,
  },
});

let downloadItemsState: ReadonlyArray<DownloadItem> = downloadsMockData.items.map(
  cloneDownloadItem,
);
let profileState: UserProfile = cloneProfile(profileMockData.profile);
let settingsState: AppSettings = cloneSettings(settingsMockData.settings);

const calculateStorageInfo = (
  items: ReadonlyArray<DownloadItem>,
): StorageInfo => {
  const usedBytes = items.reduce((total, item) => total + item.downloadedBytes, 0);
  const availableBytes = Math.max(downloadStorageCapacityBytes - usedBytes, 0);
  const usagePercentage =
    downloadStorageCapacityBytes === 0
      ? 0
      : Number(
          ((usedBytes / downloadStorageCapacityBytes) * 100).toFixed(1),
        );

  return {
    usedBytes,
    availableBytes,
    totalBytes: downloadStorageCapacityBytes,
    usagePercentage,
  };
};

/**
 * Returns the full movie catalog source.
 */
export const getMockMovies = (): ReadonlyArray<Movie> => moviesMockData.movies;

/**
 * Returns full movie details records.
 */
export const getMockMovieDetails = (): ReadonlyArray<MovieDetails> => {
  return moviesMockData.movieDetails;
};

/**
 * Returns continue-watching progress entries.
 */
export const getMockContinueWatching = (): ReadonlyArray<ContinueWatching> => {
  return moviesMockData.continueWatching;
};

/**
 * Returns ranked trending titles.
 */
export const getMockTrendingMovies = (): ReadonlyArray<TrendingMovie> => {
  return moviesMockData.trending;
};

/**
 * Returns hero banner data.
 */
export const getMockBanners = (): ReadonlyArray<Banner> => bannersMockData.banners;

/**
 * Returns category metadata.
 */
export const getMockCategories = (): ReadonlyArray<Category> => {
  return categoriesMockData.categories;
};

/**
 * Returns curated category rows with embedded cards.
 */
export const getMockCategoryRows = (): ReadonlyArray<CategoryRow> => {
  return categoriesMockData.rows;
};

/**
 * Returns the active profile state.
 */
export const getMockProfile = (): UserProfile => profileState;

/**
 * Returns persisted watch-history records.
 */
export const getMockWatchHistory = (): ReadonlyArray<WatchHistory> => {
  return profileMockData.watchHistory;
};

/**
 * Returns the current settings state.
 */
export const getMockSettings = (): AppSettings => settingsState;

/**
 * Updates the in-memory theme preference and returns the next settings state.
 */
export const updateMockTheme = (themeMode: ThemePreference): AppSettings => {
  settingsState = {
    ...settingsState,
    appearance: {
      ...settingsState.appearance,
      themeMode,
    },
  };

  return settingsState;
};

/**
 * Updates the in-memory language preference across settings and profile state.
 */
export const updateMockLanguage = (language: string): AppSettings => {
  settingsState = {
    ...settingsState,
    language,
    playback: {
      ...settingsState.playback,
      defaultAudioLanguage: language,
      defaultSubtitleLanguage: language,
    },
  };

  profileState = {
    ...profileState,
    preferredLanguage: language,
  };

  return settingsState;
};

/**
 * Returns the current downloads overview.
 */
export const getMockDownloadsOverview = (): DownloadsOverview => ({
  items: downloadItemsState,
  storageInfo: calculateStorageInfo(downloadItemsState),
});

/**
 * Returns whether a download exists in the current mock state.
 */
export const hasMockDownload = (downloadId: string): boolean => {
  return downloadItemsState.some((item) => item.id === downloadId);
};

/**
 * Removes a download from the current mock state if it exists.
 */
export const removeMockDownload = (downloadId: string): boolean => {
  const nextItems = downloadItemsState.filter((item) => item.id !== downloadId);

  if (nextItems.length === downloadItemsState.length) {
    return false;
  }

  downloadItemsState = nextItems;

  return true;
};

/**
 * Returns the searchable result dataset.
 */
export const getMockSearchResults = (): ReadonlyArray<SearchResult> => {
  return searchMockData.results;
};

/**
 * Returns the type-ahead suggestion dataset.
 */
export const getMockSearchSuggestions = (): ReadonlyArray<SearchSuggestion> => {
  return searchMockData.suggestions;
};

/**
 * Returns trending search entries.
 */
export const getMockTrendingSearches = (): ReadonlyArray<TrendingSearch> => {
  return searchMockData.trendingSearches;
};

/**
 * Returns persisted recent search entries.
 */
export const getMockRecentSearches = (): ReadonlyArray<SearchHistory> => {
  return searchMockData.recentSearches;
};
