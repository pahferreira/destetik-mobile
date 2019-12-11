/**
 * @flow
 * @format
 */

import { createContext } from 'react';

// Types
type AddressType = {
  cep: string,
  city: string,
  district: string,
  houseNumber: string,
  street: string,
  geoLocation: {
    lat: number,
    lng: number,
  },
};

type ServiceType = {
  description: string,
  image: string,
  name: string,
};

type ProvidedServiceType = {
  price: number,
  serviceId: ServiceType,
  userId: string,
};

export type UserType = {
  email: string,
  name: string,
  phone: string,
  profileImg: string,
  qtEvaluation: number,
  rates: Array<string>,
  rating: number,
  address: AddressType,
  services: Array<ProvidedServiceType>,
};

type SelectedServiceType = {
  image: number,
  name: string,
};

export type State = {
  token: string,
  user: UserType,
  selectedService: SelectedServiceType,
};

export type Action = {
  type: string,
  payload: any,
};

// Initial State
export const initialState: State = {
  token: '',
  user: {
    email: '',
    name: '',
    phone: '',
    profileImg: '',
    qtEvaluation: 0,
    rates: [],
    rating: 0,
    address: {},
    services: [],
  },
  selectedService: {},
};

// Actions
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'UPDATED_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SELECT_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
      };

    case 'SERVICE_ADDED':
      return {
        ...state,
        user: {
          ...state.user,
          services: [...state.user.services, action.payload],
        },
      };
    default:
      return state;
  }
}

export default createContext<any>(initialState);
