import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ReportsTabs() {
  const [active, setActiveTab] = useState('');
  let query = useLocation();
  useEffect(() => {
    setActiveTab(query.pathname);
  }, []);
  return (
    <div className="flex relative z-90">
      <div className="flex items-center space-x-2 mx-2 lg:space-x-8">
        <Link
          to="/archives/gmm-reports"
          className={`${
            active === '/archives/gmm-reports' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8  font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          GMM
        </Link>

        <Link
          to="/archives/paa-reports"
          className={`${
            active === '/archives/paa-reports' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8 font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          PAA
        </Link>
      </div>
    </div>
  );
}
