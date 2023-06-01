import { LOADING_USER, SET_LOCATION_PATH } from './types';

// Login
export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
};

export const setLocationPath = (location) => (dispatch) => {
  dispatch({ type: SET_LOCATION_PATH, payload: location });
};
