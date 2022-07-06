import { SET_NAVIGATIONS } from './types';
import navigation from '../../../utils/sidebarNavItems';

const initialState = {
  navigation: [],
  currentItem: '',
  activeItem: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAVIGATIONS:
      return {
        ...state,
        navigation: navigation[action.payload.navItem],
        currentItem: action.payload.currentItem,
        activeItem: action.payload.activeItem,
      };

    default:
      return state;
  }
}
