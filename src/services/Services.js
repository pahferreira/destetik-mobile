/**
 * @format
 * @flow
 */

import api from './config';

const getAvailables = async (): Promise<any> => {
  try {
    const response = await api.get('/api/provided/available');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const add = async (newService: Object): Promise<any> => {
  try {
    const response = await api.post('/api/provided/create', newService);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAvailables, add };
