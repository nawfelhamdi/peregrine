import {
  LOADING_ARCHIVES_DIRECTORIES,
  GET_ARCHIVES_DIRECTORIES,
  LOADING_ARCHIVES_FILES,
  GET_ARCHIVES_FILES,
  SET_SORT,
  SET_SORT_FILE_CATALOG,
  SET_SORT_BY_FILE_NAME,
  SET_SEARCH,
  // GET_ERRORS,
} from './types';

const initialState = {
  loadingDirectories: false,
  directories: [],
  loadingFiles: false,
  files: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ARCHIVES_DIRECTORIES:
      return {
        ...state,
        loadingDirectories: true,
      };
    case GET_ARCHIVES_DIRECTORIES:
      return {
        ...state,
        loadingDirectories: false,
        directories: action.payload,
      };
    case LOADING_ARCHIVES_FILES:
      return {
        ...state,
        loadingFiles: true,
      };
    case GET_ARCHIVES_FILES:
      return {
        ...state,
        loadingFiles: false,
        files: action.payload,
      };
    case SET_SORT:
      let files = state.files.sort((a, b) => -1);
      return {
        files: files,
      };
    case SET_SORT_BY_FILE_NAME:
      let orderfiles = state.files.sort((a, b) => {
        if (action.payload) {
          if (a.fileName < b.fileName) {
            return -1;
          }
          if (a.fileName > b.fileName) {
            return 1;
          }
          return 0;
        } else {
          if (a.fileName < b.fileName) {
            return 1;
          }
          if (a.fileName > b.fileName) {
            return -1;
          }
          return 0;
        }
      });
      return {
        files: orderfiles,
      };
    case SET_SORT_FILE_CATALOG:
      let directories = state.directories.sort((a, b) => -1);
      return {
        directories: directories,
      };
    case SET_SEARCH:
      let searchedfiles = state.files.filter(
        (element) =>
          element.fileName === action.payload ||
          element.projectId === action.payload
      );
      console.log('filter');
      return {
        files: searchedfiles,
      };
    default:
      return state;
  }
}
