import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../shareds/navigation/Index';
import Tabs from './components/Tabs';
import Topbar from '../shareds/navigation/components/Topbar';

export default function Index() {
  return (
    <div className="flex h-full bg-white">
      <Sidebar />
      <div className="flex-1">
        <div className="w-full relative">
          <div className="w-full relative z-10">
            <Topbar />
          </div>
          <div className="px-2 pt-8 md:max-w-full md:px-8">
            <Tabs />
          </div>
          <div className="relative z-0 md:max-w-full px-2 md:px-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
