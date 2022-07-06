import {
  LOADING_ARCHIVES_DIRECTORIES,
  GET_ARCHIVES_DIRECTORIES,
  LOADING_ARCHIVES_FILES,
  GET_ARCHIVES_FILES,
  SET_SORT,
  SET_SORT_BY_FILE_NAME,
  SET_SORT_FILE_CATALOG,
  GET_ERRORS,
  SET_SEARCH,
} from './types';

import axios from 'axios';

export const getArchiveDirectories = (container, directory) => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES_DIRECTORIES });
  let directoryReq = directory ? `&directory=${directory}` : '';
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/archives/directories?container=${container}${directoryReq}`
    )
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

export const getArchivesFiles = (diretoryId, container) => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES_FILES });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/archives/directories/files/${diretoryId}?container=${container}`
    )
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

export const listArchiveBlobs = (container, prefix) => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES_FILES });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/archives/?container=${container}&prefix=${prefix}`
    )
    .then((res) => {
      dispatch({
        type: GET_ARCHIVES_FILES,
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
export const listGmmReports = () => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES_FILES });
  axios
    .get(`${process.env.REACT_APP_API_URL}/archives/gmm-reports`)
    .then((res) => {
      dispatch({
        type: GET_ARCHIVES_FILES,
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

export const sort = () => (dispatch) => {
  dispatch({ type: SET_SORT });
};
export const sortByfileName = (sort) => (dispatch) => {
  dispatch({ type: SET_SORT_BY_FILE_NAME, payload: sort });
};
export const sortFileCatalog = () => (dispatch) => {
  dispatch({ type: SET_SORT_FILE_CATALOG });
};

export const search = (searchInput) => (dispatch) => {
  dispatch({ type: SET_SEARCH, payload: searchInput });
};
