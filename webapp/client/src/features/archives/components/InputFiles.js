import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ContainerTabs from './ContainerTabs';
import PrefixSearch from './PrefixSearch';

import { connect } from 'react-redux';
import { listArchiveBlobs, sortByModifiedAt } from '../actions';

function InputFiles(props) {
  const [container, setContainer] = useState('gmm');
  const [prefix, setPrefix] = useState('raw');
  const [sort, setSort] = useState(false);

  useEffect(() => {
    props.listArchiveBlobs(container, prefix);
  }, [container]);
  const handleSerchBlobs = () => {
    props.listArchiveBlobs(container, prefix);
  };
  const handleSortByModifiedAt = () => {
    setSort(!sort);
    props.sortByModifiedAt();
  };
  return (
    <div className="px-4 py-16 md:px-16 lg:py-20">
      <div className="flex justify-between items-start">
        <ContainerTabs setContainer={setContainer} />
        <PrefixSearch
          prefix={prefix}
          setPrefix={setPrefix}
          handleSerchBlobs={handleSerchBlobs}
        />
      </div>
      <div className="border border-[#EAEAF2] rounded-md p-0">
        {/* Header */}
        <div className="h-12  px-4 py-3  border-b border-[#EAEAF2]  bg-gray-200 rounded-t-md hidden sm:block">
          <div className="flex justify-between">
            <div className="text-xs text-gray-600 flex items-center justify-center">
              <p className="text-sm font-medium">Directory</p>
              <button
                className="flex items-center justify-center w-8 h-8 bg-white border rounded-full mx-2"
                onClick={() => handleSortByModifiedAt()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200  ${
                    sort ? 'transform rotate-180' : ''
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
            <div className="text-xs text-gray-600">
              <p className="text-sm font-medium">Filename</p>
            </div>
            <div className="flex justify-between w-full sm:w-1/3">
              <div className="text-xs text-gray-600">
                <p className="text-sm font-medium">Last Modified At</p>
              </div>
              <div className="text-xs text-gray-600 ">
                <p className="text-sm font-medium float-left">Created At</p>
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
                        Directory:
                        <span className="text-sm ml-2 text-black">
                          {file.name.split('/')[1]}
                        </span>
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 block sm:hidden mb-2">
                      <p className="text-sm font-medium">
                        Filename:
                        <span className="text-sm ml-2 text-black">
                          {file.name.split('/').pop()}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs text-gray-600 sm:block hidden">
                        <p className="text-sm font-medium">
                          {file.name.split('/')[1]}
                        </p>
                      </div>
                      <div className="text-xs text-gray-600 sm:block hidden">
                        <p className="text-sm font-medium">
                          {file.name.split('/').pop()}
                        </p>
                      </div>
                      <div className="flex justify-between w-full sm:w-1/3">
                        <div className="text-xs text-gray-600">
                          <p className="text-sm font-medium block sm:hidden">
                            Modified At:
                          </p>
                          <p className="text-sm sm:font-medium ">
                            {moment(file.properties.lastModified).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </p>
                        </div>
                        <div className="text-xs text-gray-600 ">
                          <p className="text-sm font-medium block sm:hidden">
                            Created At:
                          </p>
                          <p className="text-sm sm:font-medium">
                            {moment(file.properties.createdOn).format(
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
              <p className="text-center my-4">No blobs archive blobs found.</p>
            )}
          </div>
        ) : (
          <p className="text-center my-4">Loading ...</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  listArchiveBlobs,
  sortByModifiedAt,
};
export default connect(mapStateToProps, mapActionsToProps)(InputFiles);
