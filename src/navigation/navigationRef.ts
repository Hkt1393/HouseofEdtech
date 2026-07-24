import {
  StackActions,
  createNavigationContainerRef,
  type ParamListBase,
} from '@react-navigation/native';

import type { RootStackParamList, RootStackRouteName } from './types';

type NavigationArgs<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> = undefined extends ParamList[RouteName]
  ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]]
  : [screen: RouteName, params: ParamList[RouteName]];

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

export const navigate = <RouteName extends RootStackRouteName>(
  ...args: NavigationArgs<RootStackParamList, RouteName>
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...(args as never));
  }
};

export const replace = <RouteName extends RootStackRouteName>(
  ...args: NavigationArgs<RootStackParamList, RouteName>
) => {
  if (navigationRef.isReady()) {
    const [name, params] = args;

    navigationRef.dispatch(StackActions.replace(name as string, params));
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const reset = (
  state: Parameters<typeof navigationRef.resetRoot>[0],
) => {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
};
