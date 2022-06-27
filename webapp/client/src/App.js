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
import Validate from './features/startProject/components/Validate';
// Archive feature
import Archive from './features/archives/Index';
import Diretories from './features/archives/components/Diretories';
import Files from './features/archives/components/Files';

// Reports feature
import Reports from './features/reports/Index';

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
            <Route path="validate" element={<Validate />} />
          </Route>
          <Route path="/archive" element={<Archive />}>
            <Route path="directories" element={<Diretories />} />
            <Route path="directories/:diretoryId" element={<Files />} />
          </Route>
          <Route path="/reports" element={<Reports />}></Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
