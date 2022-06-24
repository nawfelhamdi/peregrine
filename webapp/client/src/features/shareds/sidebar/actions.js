import { SET_NAVIGATIONS } from './types';

export const setNavigation = (navItem, currentItem) => (dispatch) => {
  dispatch({ type: SET_NAVIGATIONS, payload: { navItem, currentItem } });
};
