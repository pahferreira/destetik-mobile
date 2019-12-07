/**
 * @format
 * @flow
 */

import api, { apiAuth } from './config';
import type { UserType } from '../utils/context/Context';

type RegisterType = {
  name: string,
  email: string,
  password: string,
  password2: string,
};

type LoginType = {
  email: string,
  password: string,
};

type UpdateUserType = {
  name?: string,
  email?: string,
  phone?: string,
  address?: {
    zipCode?: string,
    street?: string,
    district?: string,
    houseNumber?: string,
  },
};

const register = async (userData: RegisterType): Promise<?any> => {
  try {
    const response = await apiAuth.post('api/user/register', userData);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error.response);
    const message = Object.values(error.response.data)[0];
    throw { message };
  }
};

const login = async (userData: LoginType): Promise<?string> => {
  try {
    const response = await apiAuth.post('api/user/login', userData);
    if (response.status === 200) {
      return response.data.token;
    }
    return null;
  } catch (error) {
    console.log(error.response);
    const message = Object.values(error.response.data)[0];
    throw { message };
  }
};

const current = async () => {
  try {
    const response = await api.get('/api/user/current');
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

const update = async (userNewData: UpdateUserType): Promise<?UserType> => {
  try {
    const response = await api.patch('/api/user/update', userNewData);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    const message = Object.values(error.response.data)[0];
    throw { message };
  }
};

const getAll = async (): Promise<any> => {
  try {
    const response = await api.get('api/user/all');
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

export default { register, login, current, update, getAll };
