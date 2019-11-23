/**
 * @format
 */

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'https://destetik-backend.herokuapp.com/',
  timeout: 5000,
});

api.interceptors.request.use(async req => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      if (req.headers) {
        req.headers.Authorization = token;
      }
    }
    return req;
  } catch (error) {
    console.log(error);
  }
});

export const apiAuth = axios.create({
  baseURL: 'https://destetik-backend.herokuapp.com/',
  timeout: 5000,
});

export default api;
