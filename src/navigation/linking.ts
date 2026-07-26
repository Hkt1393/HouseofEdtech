import type { LinkingOptions } from '@react-navigation/native';

import { APP_CONFIG, ROUTES, ROUTE_PATHS } from '../constants';

import type { RootStackParamList } from './types';

export const linking = {
  prefixes: [APP_CONFIG.deepLinkPrefix],
  config: {
    initialRouteName: ROUTES.SPLASH,
    screens: {
      [ROUTES.SPLASH]: ROUTE_PATHS.SPLASH,
      [ROUTES.AUTH]: {
        screens: {
          [ROUTES.LOGIN]: ROUTE_PATHS.LOGIN,
        },
      },
      [ROUTES.MAIN_TABS]: {
        screens: {
          [ROUTES.HOME]: ROUTE_PATHS.HOME,
          [ROUTES.SEARCH]: ROUTE_PATHS.SEARCH,
          [ROUTES.PROFILE]: ROUTE_PATHS.PROFILE,
        },
      },
      [ROUTES.MOVIE_DETAILS]: ROUTE_PATHS.MOVIE_DETAILS,
      [ROUTES.SETTINGS]: ROUTE_PATHS.SETTINGS,
    },
  },
} as const satisfies LinkingOptions<RootStackParamList>;
