/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import Context, { reducer, initialState } from './src/utils/context/Context';

const App: () => React$Node = () => {
  const [state: State, dispatch: any] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <AppNavigation style={styles.main} />
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
