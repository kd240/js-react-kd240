import React from 'react';
import { appState } from './appState';

export const appContext = React.createContext({
  appState,
});
