import { combineReducers } from 'redux';

import sidebarNavReducer from '../features/shareds/sidebar/reducer';
import projectReducer from '../features/startProject/reducer';
import authReducer from '../pages/auth/reducer';

const rootReducer = combineReducers({
  sidebarItems: sidebarNavReducer,
  project: projectReducer,
  auth: authReducer,
});

export default rootReducer;
