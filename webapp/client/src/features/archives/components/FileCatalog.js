import React, { useState, useEffect } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

import MainListItem from './MainListItem';
import ContainerTabs from './ContainerTabs';
import SearchFileCatalog from './SearchFileCatalog';
import Sort from './Sort';
import { connect } from 'react-redux';
import {
  getArchiveDirectories,
  getArchivesFiles,
  sortFileCatalog,
} from '../actions';
const DirectoryCard = ({
  directory,
  container,
  children,
  getArchivesFiles,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seletedRow, setSeletedRow] = useState('');
  const handleFilesDetails = (directory) => {
    getArchivesFiles(directory.name.split('/')[2], container);
    setIsOpen(!isOpen);
    setSeletedRow(directory.name);
    console.log(directory.name);
    console.log(seletedRow);
  };
  return (
    <div className="border rounded shadow-sm">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-end flex-row-reverse	 w-full p-4 focus:outline-none"
        onClick={() => handleFilesDetails(directory)}
      >
        <div className="text-md font-medium flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10  w-10 text-skin-base mx-auto ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span> {directory.name.split('/')[2]}</span>
        </div>
        <div className="flex items-center justify-center w-8 h-8 border rounded-full">
          <svg
            viewBox="0 0 24 24"
            className={`w-3 text-gray-600 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
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
};

function FileCatalog(props) {
  const [container, setContainer] = useState('gmm');
  const [sort, setSort] = useState(false);

  useEffect(() => {
    props.getArchiveDirectories(container);
  }, [container]);

  const handleSort = () => {
    setSort(!sort);
    props.sortFileCatalog();
  };

  return (
    <div class="px-4 py-16 md:px-16 lg:py-20">
      <div className="flex justify-between items-start mb-8 flex-col md:flex-row">
        <div className="flex items-center justify-between mb-8 md:mb-0 ">
          <ContainerTabs setContainer={setContainer} />
          <Sort handleSort={handleSort} sort={sort} />
        </div>
        <SearchFileCatalog container={container} />
      </div>
      <div class="space-y-4">
        <div className="flex items-center my-2">
          <AiFillInfoCircle className="h-8 w-8  text-black" />
          <p className="ml-4 font-semibold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6  w-6 text-skin-base mx-auto mx-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span>Project ID + Project Name + time stamp</span>
          </p>
        </div>
        {!props.archives.loadingDirectories ? (
          <>
            {props.archives.directories.length > 0 ? (
              <div className="grid gap-2 grid-col sm:mx-auto">
                {props.archives.directories.map((directory, index) => (
                  <DirectoryCard
                    key={index}
                    directory={directory}
                    container={container}
                    children={<MainListItem />}
                    getArchivesFiles={props.getArchivesFiles}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center my-16">No blobs archive found.</p>
            )}
          </>
        ) : (
          <p className="text-center">Loading ...</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getArchiveDirectories,
  getArchivesFiles,
  sortFileCatalog,
};
export default connect(mapStateToProps, mapActionsToProps)(FileCatalog);
