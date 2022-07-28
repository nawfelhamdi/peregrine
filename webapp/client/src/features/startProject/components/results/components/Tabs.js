import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../../../../archives/actions';
import { Link } from 'react-router-dom';

function Tabs() {
  const [activeTab, setActiveTab] = useState('export');

  useEffect(() => {
    setActiveTab(localStorage.getItem('resultsActiveTab'));
  }, [activeTab]);

  const handleSetActiveTab = (activeTab) => {
    setActiveTab(activeTab);
    localStorage.setItem('resultsActiveTab', activeTab);
  };
  return (
    <div className="space-y-2">
      <Link
        to="results"
        onClick={() => handleSetActiveTab('export')}
        className={`${
          activeTab === 'export'
            ? 'text-skin-base border-2 transition animation-300 border-[#FFE416]'
            : 'text-white'
        } flex items-center flex-col justify-center text-lg font-semibold rounded-md w-full h-12 bg-[#555555] px-2`}
      >
        Output Files
      </Link>
      <Link
        to="results/reports"
        onClick={() => handleSetActiveTab('report')}
        className={`${
          activeTab === 'report'
            ? 'text-skin-base border-2 transition animation-300 border-[#FFE416]'
            : 'text-white'
        } flex items-center flex-col justify-center text-lg font-semibold rounded-md w-full h-12 bg-[#555555] px-2`}
      >
        Disclosure Reports
      </Link>
    </div>
  );
}

const mapActionsToProps = {
  getFiles,
};
export default connect(null, mapActionsToProps)(Tabs);
