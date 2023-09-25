import {
  LOADING_USER,
  SET_LOCATION_PATH,
  GET_ERRORS,
  SET_AUTHENTICATED,
} from './types';

import axios from 'axios';

export const signin = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`${process.env.REACT_APP_API_URL}/auth/signin`)
    .then((res) => {
      console.log('signin', res);
      // dispatch({
      //   type: SET_AUTHENTICATED,
      //   payload: res.data.archives,
      // });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const setAuthorizationHeader = (token) => {
  const accessToken = `bearer ${token}`;
  sessionStorage.setItem('accessToken', accessToken);
  axios.defaults.headers.common['Authorization'] = accessToken;
};


export const setLocationPath = (location) => (dispatch) => {
  dispatch({ type: SET_LOCATION_PATH, payload: location });
};
