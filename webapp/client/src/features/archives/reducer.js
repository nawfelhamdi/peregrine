import {
  LOADING_ARCHIVES_FILES,
  GET_ARCHIVES_FILES,
  SET_SORT,
  SET_SORT_BY_FILE_NAME,
  SET_SEARCH,
  // GET_ERRORS,
  // archive
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
  SORT_FILES_BY_FILE_NAME,
  SORT_FILES_BY_CREATED_DATE,
  SORT_FILES_BY_UPDATED_DATE,
  SORT_FILES_SUBFOLDER,
} from './types';

const initialState = {
  loadingArchives: false,
  archives: [],

  loadingArchiveFiles: false,
  archiveFiles: [],

  loadingFiles: false,
  files: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // archives
    case LOADING_ARCHIVES:
      return {
        ...state,
        loadingArchives: true,
      };
    case GET_ARCHIVES:
      return {
        ...state,
        loadingArchives: false,
        archives: action.payload,
      };
    case SET_SORT_ARCHIVES:
      let archives = state.archives.sort((a, b) => -1);
      return {
        archives: archives,
      };
    case SET_SEARCH_ARCHIVES:
      let search = state.archives.filter(
        (element) => element.name === action.payload
      );

      return {
        archives: search,
      };
    case LOADING_ARCHIVE_FILES:
      return {
        ...state,
        loadingArchiveFiles: true,
      };
    case GET_ARCHIVE_FILES:
      return {
        ...state,
        loadingArchiveFiles: false,
        archiveFiles: action.payload,
      };
    // input files
    case LOADING_FILES:
      return {
        ...state,
        loadingFiles: true,
      };
    case GET_FILES:
      return {
        ...state,
        loadingFiles: false,
        files: action.payload,
      };
    case SET_SEARCH_FILES:
      return {
        files: state.files.filter(
          (element) =>
            element.fileName === action.payload ||
            element.projectId === action.payload
        ),
      };
    case SORT_FILES_BY_PROJET_ID:
      return {
        files: state.files.sort((a, b) => -1),
      };
    case SORT_FILES_BY_FILE_NAME:
      return {
        files: state.files.sort((a, b) => {
          if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) {
            return -1;
          }
          if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) {
            return 1;
          }
          return 0;
        }),
      };
    case SORT_FILES_SUBFOLDER:
      return {
        files: state.files.sort((a, b) => {
          if (a.subfolder.toLowerCase() < b.subfolder.toLowerCase()) {
            return -1;
          }
          if (a.subfolder.toLowerCase() > b.subfolder.toLowerCase()) {
            return 1;
          }
          return 0;
        }),
      };
    case SORT_FILES_BY_CREATED_DATE:
      return {
        files: state.files.sort((a, b) => {
          return -1;
        }),
      };
    case SORT_FILES_BY_UPDATED_DATE:
      return {
        files: state.files.sort((a, b) => {
          return -1;
        }),
      };
    //
    case SET_SORT:
      let files = state.files.sort((a, b) => -1);
      return {
        files: files,
      };
    case SET_SORT_BY_FILE_NAME:
      let orderfiles = state.files.sort((a, b) => {
        if (a.fileName > b.fileName) {
          return -1;
        }
        if (a.fileName < b.fileName) {
          return 1;
        }
        return 0;
      });
      return {
        files: orderfiles,
      };
    case SORT_ARCHIVE_BY_UPDATED_DATE:
      let orderfilesByUpadtedDate = state.files.sort((a, b) => {
        return -1;
      });
      return {
        files: orderfilesByUpadtedDate,
      };
    case SORT_ARCHIVE_BY_CREATED_DATE:
      let orderfilesByCreatedDate = state.files.sort((a, b) => {
        return -1;
      });
      return {
        files: orderfilesByCreatedDate,
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
    case SET_SEARCH_ARCHIVE:
      let searcheDirectories = state.files.filter(
        (element) =>
          element.fileName === action.payload ||
          element.projectId === action.payload
      );
      return {
        directories: searcheDirectories,
      };
    default:
      return state;
  }
}
