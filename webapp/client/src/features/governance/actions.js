import {
  LOADING_DATA_PROFILING_FILES,
  GET_DATA_PROFILING_FILES,
  LOADING_DATA_HEALTH_CHECK,
  GET_DATA_HEALTH_CHECK,
  GET_ERRORS,
  SET_SORT_PROFILING_DATA_FILES,
  SET_SEARCH_DATA,
  SET_SORT_BY_UPDATED_DATE,
  SET_SORT_BY_CREATED_DATE,
} from './types';

import axios from 'axios';

export const getProfilingFiles = () => (dispatch) => {
  dispatch({ type: LOADING_DATA_PROFILING_FILES });
  axios
    .get(`${process.env.REACT_APP_API_URL}/governance/profiling`)
    .then((res) => {
      dispatch({
        type: GET_DATA_PROFILING_FILES,
        payload: res.data.files,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
      });
    });
};
export const getDataHealthCheck = () => (dispatch) => {
  dispatch({ type: LOADING_DATA_HEALTH_CHECK });
  axios
    .get(`${process.env.REACT_APP_API_URL}/governance/`)
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
  if (!sort) {
    dispatch({ type: SET_SORT_PROFILING_DATA_FILES, payload: sort });
  } else {
    dispatch(getProfilingFiles());
  }
};
export const sortByCreatedDate = (sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SET_SORT_BY_CREATED_DATE, payload: sort });
  } else {
    dispatch(getProfilingFiles());
  }
};
export const sortByUpdatedDate = (sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SET_SORT_BY_UPDATED_DATE, payload: sort });
  } else {
    dispatch(getProfilingFiles());
  }
};

export const search = (searchInput) => (dispatch) => {
  dispatch({ type: SET_SEARCH_DATA, payload: searchInput });
};
