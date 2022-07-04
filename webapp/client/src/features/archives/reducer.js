import {
  LOADING_ARCHIVES_DIRECTORIES,
  GET_ARCHIVES_DIRECTORIES,
  LOADING_ARCHIVES_FILES,
  GET_ARCHIVES_FILES,
  SET_SORT,
  SET_SORT_FILE_CATALOG,
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
    case SET_SORT_FILE_CATALOG:
      let directories = state.directories.sort((a, b) => -1);
      return {
        directories: directories,
      };

    default:
      return state;
  }
}
