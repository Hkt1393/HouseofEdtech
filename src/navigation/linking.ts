import type { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';

import { APP_CONFIG, ROUTES } from '../constants';

import type { RootStackParamList } from './types';

export const linking = {
  prefixes: [APP_CONFIG.deepLinkPrefix],
  config: {
    initialRouteName: ROUTES.SPLASH,
    screens: {
      [ROUTES.SPLASH]: 'splash',
      [ROUTES.AUTH]: {
        screens: {
          [ROUTES.LOGIN]: 'login',
        },
      },
      [ROUTES.MAIN_TABS]: {
        screens: {
          [ROUTES.HOME]: 'home',
          [ROUTES.SEARCH]: 'search',
          [ROUTES.DOWNLOADS]: 'downloads',
          [ROUTES.PROFILE]: 'profile',
        },
      },
      [ROUTES.MOVIE_DETAILS]: 'movie-details',
      [ROUTES.SETTINGS]: 'settings',
    },
  },
  getInitialURL: async () => Linking.getInitialURL(),
  subscribe: (listener: (url: string) => void) => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      subscription.remove();
    };
  },
} as const satisfies LinkingOptions<RootStackParamList>;
