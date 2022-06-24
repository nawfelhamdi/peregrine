import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './sidebar/Index';

export default function Layout() {
  return (
    <div className="flex h-full bg-white relative">
      <Sidebar />
      <div className="flex-1">
        <div className="w-full relative">
          <div className="w-full relative z-10">
            <Topbar />
          </div>
          <div className="relative z-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}