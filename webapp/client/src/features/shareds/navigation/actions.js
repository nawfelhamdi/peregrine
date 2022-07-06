import { SET_NAVIGATIONS } from './types';

export const setNavigation = (navItem, currentItem) => (dispatch) => {
  // localStorage.setItem('activeItem', activeItem);
  dispatch({ type: SET_NAVIGATIONS, payload: { navItem, currentItem } });
};
