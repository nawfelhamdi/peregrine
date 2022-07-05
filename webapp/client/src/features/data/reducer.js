import {
  LOADING_DATA_HEALTH_CHECK,
  GET_DATA_HEALTH_CHECK,
  // GET_ERRORS,
  SET_SORT_BY_FILE_NAME,
  SET_SEARCH,
} from './types';

const initialState = {
  loading: false,
  columns: [],

  loadingFiles: false,
  files: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA_HEALTH_CHECK:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_HEALTH_CHECK:
      return {
        ...state,
        loading: false,
        columns: action.payload,
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
    case SET_SEARCH:
      let searchedfiles = state.files.filter(
        (element) =>
          element.fileName === action.payload ||
          element.projectId === action.payload
      );
      return {
        files: searchedfiles,
      };
    default:
      return state;
  }
}
