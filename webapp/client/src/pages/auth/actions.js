import { LOADING_USER } from './types';

// Login
export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  console.log(userData);
};
