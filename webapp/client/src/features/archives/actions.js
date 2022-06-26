import { LOADING_ARCHIVES, GET_ARCHIVES, GET_ERRORS } from './types';

import axios from 'axios';

export const getArchives = () => (dispatch) => {
  dispatch({ type: LOADING_ARCHIVES });
  axios
    .get(`${process.env.REACT_APP_API_URL}/archives`)
    .then((res) => {
      dispatch({
        type: GET_ARCHIVES,
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
