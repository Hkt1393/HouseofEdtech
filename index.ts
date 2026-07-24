import './global.css';

import React from 'react';
import { registerRootComponent } from 'expo';

import App from './App';
import { ThemeProvider } from './src/theme';

const Root = () => {
  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(App),
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
