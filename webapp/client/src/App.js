import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
//  UI
import Home from './pages/home/Index';
import Privacy from './pages/privacy/Index';
import Policy from './pages/policy/Index';
import TermOfUse from './pages/termOfUse/Index';
// utils
import PrivateRoute from './utils/PrivateRoute';
import roles from './utils/roles';
import Unauthorized from './features/shareds/navigation/components/Unauthorized';
// Auth
import Login from './features/auth/Index';
// Start Project feature
import StartProject from './features/project/Index';
import Start from './features/project/components/Start';
import Preparation from './features/project/components/Preparation';
import RunMoodys from './features/project/components/RunMoodys';
import Outputs from './features/project/components/results/Outputs';
import Reports from './features/project/components/results/Reports';
// Archive feature
import Archives from './features/archives/Index';
import Archive from './features/archives/components/archive/Index';
import InputFiles from './features/archives/components/inputFiles/Index';
import OutputFiles from './features/archives/components/outputFiles/Index';
import PaaReports from './features/archives/components/reports/PaaReports';
import GmmReports from './features/archives/components/reports/GmmReports';
// Data Governance
import DataGovernance from './features/governance/Index';
import Profiling from './features/governance/components/Profiling';
import QualityStatus from './features/governance/components/QualityStatus';
import DataLineage from './features/governance/components/DataLineage';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          {/* public routes */}

          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/term-of-use" element={<TermOfUse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* private routes */}

          <Route element={<PrivateRoute />}>
            <Route path="/start-project" element={<StartProject />}>
              <Route path="start" element={<Start />} />
              <Route path="preparation" element={<Preparation />} />
              <Route path="run" element={<RunMoodys />} />
              <Route path="results/reports" element={<Reports />} />
              <Route path="results" element={<Outputs />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/archives" element={<Archives />}>
              <Route path="archive" element={<Archive />} />
              <Route path="input-files" element={<InputFiles />} />
              <Route path="output-files" element={<OutputFiles />} />
              <Route path="paa-reports" element={<PaaReports />} />
              <Route path="gmm-reports" element={<GmmReports />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.ROLE_ADMIN]} />}>
            <Route path="/data-governance" element={<DataGovernance />}>
              <Route path="data-profiling" element={<Profiling />} />
              <Route path="quality" element={<QualityStatus />} />
              <Route path="lineage" element={<DataLineage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
