import {
  LOADING_ARCHIVES_DIRECTORIES,
  GET_ARCHIVES_DIRECTORIES,
  LOADING_ARCHIVES_FILES,
  GET_ARCHIVES_FILES,
  GET_ERRORS,
} from './types';

import axios from 'axios';

export const getArchiveDirectories = () => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES_DIRECTORIES });
  axios
    .get(`${process.env.REACT_APP_API_URL}/archives`)
    .then((res) => {
      dispatch({
        type: GET_ARCHIVES_DIRECTORIES,
        payload: res.data.directories,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const getArchivesFiles = (diretoryId) => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES_FILES });
  axios
    .get(`${process.env.REACT_APP_API_URL}/archives/${diretoryId}`)
    .then((res) => {
      dispatch({
        type: GET_ARCHIVES_FILES,
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
