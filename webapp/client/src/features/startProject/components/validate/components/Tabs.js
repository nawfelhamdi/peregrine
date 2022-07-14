import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../../../../archives/actions';

function Tabs(props) {
  const handleGetBlobFiles = (activeTab) => {
    props.getFiles(
      props.container,
      `output/${activeTab}/${props.moodyProjectId}`
    );
    props.setActiveTab(activeTab);
  };

  return (
    <div className="flex relative z-90">
      <div className="flex items-center space-x-2 mx-2 lg:space-x-8">
        <button
          onClick={() => handleGetBlobFiles('export')}
          className={`${
            props.activeTab === 'export' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8 font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          Output Files
        </button>
        <button
          onClick={() => handleGetBlobFiles('report')}
          className={`${
            props.activeTab === 'report' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8 font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          Disclosure Reports
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getFiles,
};
export default connect(mapStateToProps, mapActionsToProps)(Tabs);
