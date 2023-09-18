import {
  LOADING_USER,
  SET_LOCATION_PATH,
  SET_ERRORS,
  SET_AUTHENTICATED,
  SET_UNNAUTHOROZID,
  CLOSE_UNNAUTHOROZID_MODAL,
  FIRE_SSOSILENT,
} from './types';

import axios from 'axios';

export const setAuthorizationHeader = (token) => {
  const accessToken = `bearer ${token}`;
  sessionStorage.setItem('accessToken', accessToken);
  axios.defaults.headers.common['Authorization'] = accessToken;
};


export const setLocationPath = (location) => (dispatch) => {
  dispatch({ type: SET_LOCATION_PATH, payload: location });
};

export const checkUnauthorizeError = (error) => (dispatch) => {
  if (error && error.response && error.response.status === 401) {
    dispatch({ type: SET_UNNAUTHOROZID });
  }
};


export const closeUnauthorizedModal = () => (dispatch) => {
  dispatch({ type: CLOSE_UNNAUTHOROZID_MODAL });
};

export const openUnauthorizedModal = () => (dispatch) => {
  dispatch({ type: SET_UNNAUTHOROZID });
};
