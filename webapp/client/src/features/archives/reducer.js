import { LOADING_ARCHIVES, GET_ARCHIVES } from './types';

const initialState = {
  loading: false,
  files: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ARCHIVES:
      return {
        ...state,
        loading: true,
      };
    case GET_ARCHIVES:
      return {
        ...state,
        loading: false,
        files: action.payload,
      };

    default:
      return state;
  }
}
