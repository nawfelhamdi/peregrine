import React from 'react';
import { connect } from 'react-redux';
import { getFiles } from '../../../actions';

function ContainerTabs(props) {
  const handleGetBlobFiles = (container) => {
    props.setContainer(container);
    props.getFiles(container, props.prefix);
  };

  return (
    <div className="flex relative z-90">
      <div className="flex items-center space-x-2 mx-2 lg:space-x-8">
        <button
          onClick={() => handleGetBlobFiles('gmm')}
          className={`${
            props.container === 'gmm' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8 font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          GMM
        </button>
        <button
          onClick={() => handleGetBlobFiles('paa')}
          className={`${
            props.container === 'paa' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8 font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          PAA
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
export default connect(mapStateToProps, mapActionsToProps)(ContainerTabs);
