import { combineReducers } from 'redux';

import sidebarNavReducer from '../features/shareds/navigation/reducer';
import projectReducer from '../features/project/reducer';
import archivesReducer from '../features/archives/reducer';
import dataGovernanceReducer from '../features/governance/reducer';
import authReducer from '../features/auth/reducer';

const rootReducer = combineReducers({
  sidebarItems: sidebarNavReducer,
  project: projectReducer,
  archives: archivesReducer,
  dataGovernance: dataGovernanceReducer,
  auth: authReducer,
});

export default rootReducer;
