import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArchiveDirectories } from '../actions';

function DirectoryCard({ directory }) {
  return (
    <Link to={`${directory.name.split('/')[2]}`}>
      <div className="overflow-hidden border w-[200px] rounded duration-300 transform bg-white hover:bg-skin-base hover:text-white transition ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10  w-10 text-skin-base mx-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <div className="py-2">
          <div className="flex justify-center hover:text-deep-purple-accent-700">
            <p className="text-md font-medium text-center">
              {directory.name.split('/')[2]}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Directories(props) {
  useEffect(() => {
    props.getArchiveDirectories();
  }, []);
  return (
    <div className="pl-16 py-16 sm:max-w-xl">
      {!props.archives.loadingDirectories ? (
        <div className="grid gap-2 grid-col sm:mx-auto">
          {props.archives.directories.map((directory, index) => (
            <DirectoryCard key={index} directory={directory} />
          ))}
        </div>
      ) : (
        <p className="text-center">Loading ...</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getArchiveDirectories,
};
export default connect(mapStateToProps, mapActionsToProps)(Directories);
