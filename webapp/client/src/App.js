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
// Auth
import Login from './features/auth/Index';
// Start Project feature
import StartProject from './features/startProject/Index';
import Start from './features/startProject/components/Start';
import Preparation from './features/startProject/components/Preparation';
import RunMoodys from './features/startProject/components/RunMoodys';
import Outputs from './features/startProject/components/validate/Outputs';
// Archive feature
import Archives from './features/archives/Index';
import Archive from './features/archives/components/archive/Index';
import InputFiles from './features/archives/components/inputFiles/Index';
import OutputFiles from './features/archives/components/outputFiles/Index';
import PaaReports from './features/archives/components/reports/PaaReports';
import GmmReports from './features/archives/components/reports/GmmReports';
// Data Governance
import DataGovernance from './features/dataGovernance/Index';
import Profiling from './features/dataGovernance/components/Profiling';
import QualityStatus from './features/dataGovernance/components/QualityStatus';

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

          {/* private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/start-project" element={<StartProject />}>
              <Route path="start" element={<Start />} />
              <Route path="preparation" element={<Preparation />} />
              <Route path="run" element={<RunMoodys />} />
              <Route path="validate" element={<Outputs />} />
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
          <Route element={<PrivateRoute />}>
            <Route path="/data-governance" element={<DataGovernance />}>
              <Route path="data-profiling" element={<Profiling />} />
              <Route path="quality" element={<QualityStatus />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
