import React from 'react';
import { connect } from 'react-redux';
import { getArchiveFiles } from '../../../actions';

function DirectoryCard({
  directory,
  container,
  children,

  isOpen,
  seletedRow,
  handleOpenDetails,
  getArchiveFiles,
}) {
  const handleFilesDetails = (directory) => {
    getArchiveFiles(directory, container);
  };
  return (
    <div className="border rounded shadow-sm">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-end flex-row-reverse	 w-full p-4 focus:outline-none"
        onClick={() => {
          handleFilesDetails(directory.name);
          handleOpenDetails(directory.name);
        }}
      >
        <div className="text-sm	md:text-md font-medium flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10  w-10 text-skin-base mx-auto ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span> {directory.name}</span>
        </div>
        <div className="flex items-center justify-center p-2 w-8 h-8 border rounded-full">
          <svg
            viewBox="0 0 24 24"
            className={`w-3 text-gray-600 transition-transform duration-200 ${
              isOpen && seletedRow === directory.name
                ? 'transform rotate-180 z-0'
                : ''
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpen && seletedRow === directory.name && (
        <div className="p-4 pt-0">
          <p className="text-gray-700">{children}</p>
        </div>
      )}
    </div>
  );
}

const mapActionsToProps = {
  getArchiveFiles,
};
export default connect(null, mapActionsToProps)(DirectoryCard);
