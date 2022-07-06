import { combineReducers } from 'redux';

import sidebarNavReducer from '../features/shareds/navigation/reducer';
import projectReducer from '../features/startProject/reducer';
import archivesReducer from '../features/archives/reducer';
import dataGovernanceReducer from '../features/dataGovernance/reducer';
import authReducer from '../pages/auth/reducer';

const rootReducer = combineReducers({
  sidebarItems: sidebarNavReducer,
  project: projectReducer,
  archives: archivesReducer,
  dataGovernance: dataGovernanceReducer,
  auth: authReducer,
});

export default rootReducer;
