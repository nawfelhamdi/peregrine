import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getArchiveDirectories, getArchivesFiles } from '../actions';
import MainListItem from './MainListItem';
import ContainerTabs from './ContainerTabs';

const DirectoryCard = ({
  directory,
  container,
  children,
  getArchivesFiles,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seletedRow, setSeletedRow] = useState('');
  const handleFilesDatils = (directory) => {
    getArchivesFiles(directory.name.split('/')[2], container);
    setIsOpen(!isOpen);
    setSeletedRow(directory.name);
  };
  return (
    <div className="border rounded shadow-sm">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-end flex-row-reverse	 w-full p-4 focus:outline-none"
        onClick={() => handleFilesDatils(directory)}
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

function Main(props) {
  const [container, setContainer] = useState('gmm');

  useEffect(() => {
    props.getArchiveDirectories(container);
  }, [container]);
  return (
    <div class="px-4 py-16 md:px-16 lg:py-20">
      <ContainerTabs setContainer={setContainer} />
      <div class="space-y-4">
        {!props.archives.loadingDirectories ? (
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
};
export default connect(mapStateToProps, mapActionsToProps)(Main);
