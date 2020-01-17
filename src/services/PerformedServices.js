/**
 * @format
 * @flow
 */

import api from './config';

const getPerformedServicesAsClient = async (): any => {
  try {
    const response = await api.get('/api/performed/showClient');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPerformedServicesAsProvider = async (): any => {
  try {
    const response = await api.get('/api/performed/showProvider');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const contractService = async (providedServiceId: ?string): any => {
  try {
    const contract = {
      providedServiceId,
    };
    const response = await api.post('/api/performed/create', contract);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getPerformedServicesAsClient,
  getPerformedServicesAsProvider,
  contractService,
};
