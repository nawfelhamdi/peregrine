import {
  LOADING_DATA_PROFILING_FILES,
  GET_DATA_PROFILING_FILES,
  LOADING_DATA_HEALTH_CHECK,
  GET_DATA_HEALTH_CHECK,
  // GET_ERRORS,
  SET_SORT_PROFILING_DATA_FILES,
  SET_SEARCH_DATA,
  SET_SORT_BY_UPDATED_DATE,
  SET_SORT_BY_CREATED_DATE,
} from './types';

const initialState = {
  loading: false,
  columns: [],

  loadingProfilingFiles: false,
  profilingfiles: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA_PROFILING_FILES:
      return {
        ...state,
        loadingProfilingFiles: true,
      };
    case GET_DATA_PROFILING_FILES:
      return {
        ...state,
        loadingProfilingFiles: false,
        profilingfiles: action.payload,
      };
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
    case SET_SORT_PROFILING_DATA_FILES:
      let orderfiles = state.profilingfiles.sort((a, b) => {
        if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) {
          return -1;
        }
        if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      return {
        profilingfiles: orderfiles,
      };
    case SET_SORT_BY_UPDATED_DATE:
      let orderfilesByUpadtedDate = state.profilingfiles.sort((a, b) => {
        return -1;
      });
      return {
        profilingfiles: orderfilesByUpadtedDate,
      };
    case SET_SORT_BY_CREATED_DATE:
      let orderfilesByCreatedDate = state.profilingfiles.sort((a, b) => {
        return -1;
      });
      return {
        profilingfiles: orderfilesByCreatedDate,
      };
    case SET_SEARCH_DATA:
      let searchedProfilingfiles = state.profilingfiles.filter(
        (element) =>
          element.fileName === action.payload ||
          element.projectId === action.payload
      );
      return {
        profilingfiles: searchedProfilingfiles,
      };

    default:
      return state;
  }
}
