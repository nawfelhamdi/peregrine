import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
// pages
import Home from './pages/home/Index';
import Login from './pages/auth/Index';
// Start Project feature
import StartProject from './features/startProject/Index';
import Start from './features/startProject/components/Start';
import Preparation from './features/startProject/components/Preparation';
import RunMoodys from './features/startProject/components/RunMoodys';
import Validation from './features/startProject/components/Validation';
// Archive feature
import Archive from './features/archives/Index';
import FileCatalog from './features/archives/components/FileCatalog';
import InputFiles from './features/archives/components/InputFiles';
import OutputFiles from './features/archives/components/OutputFiles';
import Reports from './features/archives/components/Reports';

// Data Governance
import Data from './features/data/Index';
import Profiling from './features/data/components/Profiling';
import Quality from './features/data/components/Quality';

// Data Governance
import ReportsOutput from './features/reports/Index';
import Download from './features/reports/components/Download';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start-project" element={<StartProject />}>
            <Route path="start" element={<Start />} />
            <Route path="preparation" element={<Preparation />} />
            <Route path="run" element={<RunMoodys />} />
            <Route path="validate" element={<Validation />} />
          </Route>
          <Route path="/archive" element={<Archive />}>
            <Route path="file-catalog" element={<FileCatalog />} />
            <Route path="input-files" element={<InputFiles />} />
            <Route path="output-files" element={<OutputFiles />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="/data" element={<Data />}>
            <Route path="profiling" element={<Profiling />} />
            <Route path="quality" element={<Quality />} />
          </Route>
          <Route path="/reports" element={<ReportsOutput />}>
            <Route path="download" element={<Download />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
