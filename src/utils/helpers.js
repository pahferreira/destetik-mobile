/**
 * @format
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';

export const setUser = async (token: string): Promise<any> => {
  await AsyncStorage.setItem('token', token);
};

export const getUser = async (): Promise<?string> => {
  return await AsyncStorage.getItem('token');
};
