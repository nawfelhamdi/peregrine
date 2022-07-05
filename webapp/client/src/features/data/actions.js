import {
  LOADING_DATA_HEALTH_CHECK,
  GET_DATA_HEALTH_CHECK,
  GET_ERRORS,
  SET_SORT_BY_FILE_NAME,
  SET_SEARCH,
} from './types';

import axios from 'axios';

export const getDataHealthCheck = () => (dispatch) => {
  dispatch({ type: LOADING_DATA_HEALTH_CHECK });
  axios
    .get(`${process.env.REACT_APP_API_URL}/data/`)
    .then((res) => {
      dispatch({
        type: GET_DATA_HEALTH_CHECK,
        payload: res.data.result,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const sortByfileName = (sort) => (dispatch) => {
  dispatch({ type: SET_SORT_BY_FILE_NAME, payload: sort });
};

export const search = (searchInput) => (dispatch) => {
  dispatch({ type: SET_SEARCH, payload: searchInput });
};
