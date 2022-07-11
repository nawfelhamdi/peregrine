import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { connect } from 'react-redux';
import {
  getFiles,
  sortFilesByProjectId,
  sortFilesByFileName,
  sortFilesByUpdatedDate,
  sortFilesByCreatedDate,
} from '../../actions';

import Header from './components/Header';

function OutputFiles(props) {
  const [container, setContainer] = useState('gmm');
  const [sortProjectID, setSortProjectID] = useState(false);
  const [sortByfileName, setSortByfileName] = useState(false);
  const [sortByCreatedDate, setSortByCreatedDate] = useState(false);
  const [sortByUpdatedDate, setSortByUpdatedDate] = useState(false);

  const prefix = 'output/export';

  useEffect(() => {
    props.getFiles(container, prefix);
  }, []);

  const handleSortFilesByProjectId = () => {
    props.sortFilesByProjectId(container, prefix, sortProjectID);
    setSortProjectID(!sortProjectID);
    setSortByfileName(false);
    setSortByCreatedDate(false);
    setSortByUpdatedDate(false);
  };

  const handleSortByFileName = () => {
    setSortByfileName(!sortByfileName);
    setSortProjectID(false);
    setSortByCreatedDate(false);
    setSortByUpdatedDate(false);
    props.sortFilesByFileName(container, prefix, sortByfileName);
  };
  const handleSortByCreatedDate = () => {
    props.sortFilesByCreatedDate(container, prefix, sortByCreatedDate);
    setSortByCreatedDate(!sortByCreatedDate);
    setSortByfileName(false);
    setSortByUpdatedDate(false);
    setSortProjectID(false);
  };
  const handleSortByUpdatedDate = () => {
    props.sortFilesByUpdatedDate(container, prefix, sortByUpdatedDate);
    setSortByUpdatedDate(!sortByUpdatedDate);
    setSortByfileName(false);
    setSortByCreatedDate(false);
    setSortProjectID(false);
  };

  return (
    <>
      <Header
        container={container}
        setContainer={setContainer}
        prefix={prefix}
      />
      <div class="px-4 py-8 md:px-16 lg:pt-56">
        <div className="border border-[#EAEAF2] rounded-md p-0">
          {/* Header */}
          <div className="h-12  px-4 py-3  border-b border-[#EAEAF2]  bg-gray-200 rounded-t-md hidden sm:block">
            <div className="flex justify-between">
              <div className="text-xs text-gray-600 flex items-center justify-center">
                <p className="text-sm font-medium">Project ID</p>
                <button
                  className={`flex items-center justify-center w-8 h-8 border rounded-full mx-2 ${
                    sortProjectID ? 'bg-skin-button-accent' : 'bg-white'
                  }`}
                  onClick={() => handleSortFilesByProjectId()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200  ${
                      sortProjectID ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-xs text-gray-600 flex items-center justify-center">
                <p className="text-sm font-medium">File Name</p>
                <button
                  className={`flex items-center justify-center w-8 h-8 border rounded-full mx-2 ${
                    sortByfileName ? 'bg-skin-button-accent' : 'bg-white'
                  }`}
                  onClick={() => handleSortByFileName()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200  ${
                      sortByfileName ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between w-full sm:w-1/3">
                <div className="text-xs text-gray-600 flex items-center justify-center">
                  <p className="text-sm font-medium">Modified At</p>
                  <button
                    className={`flex items-center justify-center w-8 h-8 border rounded-full mx-2 ${
                      sortByUpdatedDate ? 'bg-skin-button-accent' : 'bg-white'
                    }`}
                    onClick={() => handleSortByUpdatedDate()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200  ${
                        sortByUpdatedDate ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-xs text-gray-600 ">
                  <p className="text-sm font-medium float-left items-center justify-center">
                    Created At
                  </p>
                  <button
                    className={`flex items-center justify-center w-8 h-8 border rounded-full mx-2 ${
                      sortByCreatedDate ? 'bg-skin-button-accent' : 'bg-white'
                    }`}
                    onClick={() => handleSortByCreatedDate()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200  ${
                        sortByCreatedDate ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          {!props.archives.loadingFiles ? (
            <div>
              {props.archives.files.length > 0 ? (
                <div>
                  {props.archives.files.map((file, index) => (
                    <div
                      key={index}
                      className="h-30 sm:h-12 px-4 py-3 border-b border-[#EAEAF2]"
                    >
                      <div className="text-xs text-gray-600 block sm:hidden mb-2">
                        <p className="text-sm font-medium">
                          Project ID:
                          <span className="text-sm ml-2 text-black">
                            {file.projectId}
                          </span>
                        </p>
                      </div>
                      <div className="text-xs text-gray-600 block sm:hidden mb-2">
                        <p className="text-sm font-medium">
                          File Name:
                          <span className="text-sm ml-2 text-black">
                            {file.fileName}
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <div className="text-xs text-gray-600 sm:block hidden">
                          <p className="text-sm font-medium">
                            {file.projectId}
                          </p>
                        </div>
                        <div className="text-xs text-gray-600 sm:block hidden">
                          <p className="text-sm font-medium">{file.fileName}</p>
                        </div>
                        <div className="flex justify-between w-full sm:w-1/3">
                          <div className="text-xs text-gray-600">
                            <p className="text-sm font-medium block sm:hidden">
                              Modified At:
                            </p>
                            <p className="text-sm sm:font-medium ">
                              {moment(file.lastModified).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </p>
                          </div>
                          <div className="text-xs text-gray-600 ">
                            <p className="text-sm font-medium block sm:hidden">
                              Created At:
                            </p>
                            <p className="text-sm sm:font-medium">
                              {moment(file.createdOn).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center my-4">No blobs archive found.</p>
              )}
            </div>
          ) : (
            <p className="text-center my-4">Loading ...</p>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getFiles,
  sortFilesByProjectId,
  sortFilesByFileName,
  sortFilesByUpdatedDate,
  sortFilesByCreatedDate,
};
export default connect(mapStateToProps, mapActionsToProps)(OutputFiles);
