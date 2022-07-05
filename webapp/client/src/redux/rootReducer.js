import { combineReducers } from 'redux';

import sidebarNavReducer from '../features/shareds/sidebar/reducer';
import projectReducer from '../features/startProject/reducer';
import archivesReducer from '../features/archives/reducer';
import dataReducer from '../features/data/reducer';
import authReducer from '../pages/auth/reducer';

const rootReducer = combineReducers({
  sidebarItems: sidebarNavReducer,
  project: projectReducer,
  archives: archivesReducer,
  data: dataReducer,
  auth: authReducer,
});

export default rootReducer;
