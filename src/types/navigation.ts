/**
 * Centralized navigation param lists and helper prop types.
 */

import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ROUTES } from '../constants';

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
};

export type MainTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: undefined;
  [ROUTES.DOWNLOADS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [ROUTES.MAIN_TABS]: NavigatorScreenParams<MainTabParamList>;
  [ROUTES.MOVIE_DETAILS]: undefined;
  [ROUTES.SETTINGS]: undefined;
};

export type RootStackRouteName = keyof RootStackParamList;
export type AuthStackRouteName = keyof AuthStackParamList;
export type MainTabRouteName = keyof MainTabParamList;

export type RootStackScreenProps<RouteName extends RootStackRouteName> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

export type AuthStackScreenProps<RouteName extends AuthStackRouteName> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, RouteName>,
    RootStackScreenProps<typeof ROUTES.AUTH>
  >;

export type MainTabScreenProps<RouteName extends MainTabRouteName> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, RouteName>,
    RootStackScreenProps<typeof ROUTES.MAIN_TABS>
  >;

export type RootStackNavigationProp<RouteName extends RootStackRouteName> =
  NativeStackNavigationProp<RootStackParamList, RouteName>;

export type AuthStackNavigationProp<RouteName extends AuthStackRouteName> =
  CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    RootStackNavigationProp<typeof ROUTES.AUTH>
  >;

export type MainTabNavigationProp<RouteName extends MainTabRouteName> =
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, RouteName>,
    RootStackNavigationProp<typeof ROUTES.MAIN_TABS>
  >;

export type MainTabRouteProp<RouteName extends MainTabRouteName> = RouteProp<
  MainTabParamList,
  RouteName
>;
