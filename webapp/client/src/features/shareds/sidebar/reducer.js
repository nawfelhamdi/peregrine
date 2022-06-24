import { SET_NAVIGATIONS } from './types';
import navigation from '../../../utils/sidebarNavItems';

const initialState = {
  navigation: [],
  currentItem: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAVIGATIONS:
      return {
        ...state,
        navigation: navigation[action.payload.navItem],
        currentItem: action.payload.currentItem,
      };

    default:
      return state;
  }
}
