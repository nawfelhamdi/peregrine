import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import Header from './components/Header';
import DirectoryCard from './components/DirectoryCard';

import { connect } from 'react-redux';
import { getArchives, getArchiveFiles, sortAchives } from '../../actions';

function Archive(props) {
  const [container, setContainer] = useState('gmm');
  const [sort, setSort] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [seletedRow, setSeletedRow] = useState('');

  const handleOpenDetails = (directory) => {
    setIsOpen(!isOpen);
    setSeletedRow(directory);
  };

  useEffect(() => {
    props.getArchives(container);
  }, []);

  const handleSort = () => {
    setSort(!sort);
    props.sortAchives();
  };

  return (
    <>
      <Header
        sort={sort}
        handleSort={handleSort}
        container={container}
        setContainer={setContainer}
      />
      <div className="px-4 md:px-16 pt-0 lg:pt-60 space-y-4">
        {!props.archives.loadingArchives ? (
          <>
            {props.archives.archives.length > 0 ? (
              <div className="grid gap-2 grid-col sm:mx-auto">
                {props.archives.archives.map((directory) => (
                  <DirectoryCard
                    isOpen={isOpen}
                    key={directory.name}
                    seletedRow={seletedRow}
                    handleOpenDetails={handleOpenDetails}
                    directory={directory}
                    container={container}
                    children={<Main />}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getArchives,
  getArchiveFiles,
  sortAchives,
};
export default connect(mapStateToProps, mapActionsToProps)(Archive);
