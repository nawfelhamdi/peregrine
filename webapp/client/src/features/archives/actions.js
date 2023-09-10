import {
  LOADING_ARCHIVES_FILES,
  GET_ARCHIVES_FILES,
  SET_SORT,
  GET_ERRORS,
  SET_SEARCH,
  // archives
  LOADING_ARCHIVES,
  GET_ARCHIVES,
  SET_SORT_ARCHIVES,
  SET_SEARCH_ARCHIVES,
  LOADING_ARCHIVE_FILES,
  GET_ARCHIVE_FILES,
  SET_SEARCH_ARCHIVE,
  SORT_ARCHIVE_BY_UPDATED_DATE,
  SORT_ARCHIVE_BY_CREATED_DATE,
  // files
  LOADING_FILES,
  GET_FILES,
  SET_SEARCH_FILES,
  SORT_FILES_BY_PROJET_ID,
  SORT_FILES_SUBFOLDER,
  SORT_FILES_BY_FILE_NAME,
  SORT_FILES_BY_CREATED_DATE,
  SORT_FILES_BY_UPDATED_DATE,
} from './types';
import { checkUnauthorizeError } from '../auth/actions';

import axios from 'axios';
// archives
export const getArchives = (container) => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/archives/archive?container=${container}`
    )
    .then((res) => {
      dispatch({
        type: GET_ARCHIVES,
        payload: res.data.archives,
      });
    })
    .catch((error) => {
      dispatch(checkUnauthorizeError(error));
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const sortAchives = () => (dispatch) => {
  dispatch({ type: SET_SORT_ARCHIVES });
};

export const searchAchives = (directory) => (dispatch) => {
  dispatch({ type: SET_SEARCH_ARCHIVES, payload: directory });
};

export const getArchiveFiles = (diretoryId, container) => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVE_FILES });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/archives/archive/${diretoryId}?container=${container}`
    )
    .then((res) => {
      dispatch({
        type: GET_ARCHIVE_FILES,
        payload: res.data.archivefiles,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(checkUnauthorizeError(error));
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const searchAchive = () => (dispatch) => {
  dispatch({ type: SET_SEARCH_ARCHIVE });
};
//  files
export const getFiles = (container, prefix) => (dispatch) => {
  dispatch({ type: LOADING_FILES });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/archives/files/?container=${container}&prefix=${prefix}`
    )
    .then((res) => {
      dispatch({
        type: GET_FILES,
        payload: res.data.files,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(checkUnauthorizeError(error));
      dispatch({
        type: GET_ERRORS,
      });
    });
};
export const searchFiles = (searchInput) => (dispatch) => {
  dispatch({ type: SET_SEARCH_FILES, payload: searchInput });
};

export const sortFilesByProjectId = (container, prefix, sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SORT_FILES_BY_PROJET_ID, payload: sort });
  } else if (prefix === 'subfloder') {
    dispatch(listGmmReports(container));
  } else {
    dispatch(getFiles(container, prefix));
  }
};
export const sortFilesBySubfoler = (container, prefix, sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SORT_FILES_SUBFOLDER, payload: sort });
  } else if (prefix === 'subfloder') {
    dispatch(listGmmReports(container));
  } else {
    dispatch(getFiles(container, prefix));
  }
};
export const sortFilesByFileName = (container, prefix, sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SORT_FILES_BY_FILE_NAME, payload: sort });
  } else if (prefix === 'subfloder') {
    dispatch(listGmmReports(container));
  } else {
    dispatch(getFiles(container, prefix));
  }
};

export const sortFilesByUpdatedDate =
  (container, prefix, sort) => (dispatch) => {
    if (!sort) {
      dispatch({ type: SORT_FILES_BY_UPDATED_DATE, payload: sort });
    } else if (prefix === 'subfloder') {
      dispatch(listGmmReports(container));
    } else {
      dispatch(getFiles(container, prefix));
    }
  };

export const sortFilesByCreatedDate =
  (container, prefix, sort) => (dispatch) => {
    if (!sort) {
      dispatch({ type: SORT_FILES_BY_CREATED_DATE, payload: sort });
    } else if (prefix === 'subfloder') {
      dispatch(listGmmReports(container));
    } else {
      dispatch(getFiles(container, prefix));
    }
  };

// to remove
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
      dispatch(checkUnauthorizeError(error));
      dispatch({
        type: GET_ERRORS,
      });
    });
};
export const listGmmReports = () => (dispatch) => {
  dispatch({ type: LOADING_FILES });
  axios
    .get(`${process.env.REACT_APP_API_URL}/archives/gmm-reports`)
    .then((res) => {
      dispatch({
        type: GET_FILES,
        payload: res.data.result,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(checkUnauthorizeError(error));
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const sort = () => (dispatch) => {
  dispatch({ type: SET_SORT });
};
export const sortByfileName = (sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SORT_ARCHIVE_BY_UPDATED_DATE, payload: sort });
  } else {
    dispatch(listArchiveBlobs());
  }
};

export const search = (searchInput) => (dispatch) => {
  dispatch({ type: SET_SEARCH, payload: searchInput });
};
// archive

export const sortByCreatedDate = (sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SORT_ARCHIVE_BY_CREATED_DATE, payload: sort });
  } else {
    dispatch(listArchiveBlobs());
  }
};

export const sortByUpdatedDate = (sort) => (dispatch) => {
  if (!sort) {
    dispatch({ type: SORT_ARCHIVE_BY_UPDATED_DATE, payload: sort });
  } else {
    dispatch(listArchiveBlobs());
  }
};

export const getResulsFiles = (prefix) => (dispatch) => {
  let projectId = localStorage.getItem('projectId');
  axios
    .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
    .then((res) => {
      if (res.data.project) {
        dispatch(
          getFiles(
            res.data.project.measurement_model.toLowerCase(),
            `output/${prefix}/${res.data.project.moody_project_id}`
          )
        );
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(checkUnauthorizeError(error));
    });
};
