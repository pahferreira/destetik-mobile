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

const remove = async (serviceId: string): Promise<any> => {
  try {
    const response = await api.delete(`/api/provided/delete/${serviceId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAvailables, add, remove };
