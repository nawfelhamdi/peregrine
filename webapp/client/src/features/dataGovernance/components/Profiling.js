import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import Search from './Search';
import { connect } from 'react-redux';
import { getProfilingFiles, sortByfileName } from '../actions';
import moment from 'moment';
const { BlobServiceClient } = require('@azure/storage-blob');

function Profiling(props) {
  const [sortByfileName, setSortByfileName] = useState(false);
  useEffect(() => {
    props.getProfilingFiles();
  }, []);

  const account = 'peregrineblob';
  const sas =
    '?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupitfx&se=2022-07-30T18:00:17Z&st=2022-07-05T10:00:17Z&spr=https&sig=%2F4m%2BnV9irJZpPUPIg71P5sarSd%2FXRsfIe%2B%2BHLhMorwQ%3D';

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${sas}`
  );
  async function download(fileName) {
    const containerClient = blobServiceClient.getContainerClient('testoutput');
    const blobClient = containerClient.getBlobClient(fileName);

    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(
      await downloadBlockBlobResponse.blobBody
    );
    console.log('Downloaded blob content', downloaded);

    var file = new File([downloaded], `${fileName}`, {
      type: 'application/octet-stream',
    });
    saveAs(file);

    // [Browsers only] A helper method used to convert a browser Blob into string.
    async function blobToString(blob) {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
          resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
      });
    }
  }
  const handleSortByFileName = () => {
    setSortByfileName(!sortByfileName);
    props.sortByfileName(sortByfileName);
  };

  return (
    <div className="px-4 py-16 md:px-16 lg:py-20">
      <div className="flex justify-between items-start mb-8">
        <Search />
      </div>
      <div className="my-8 border border-[#EAEAF2] rounded-md">
        {/* Header */}
        <div className="h-12  px-4 py-3  border-b border-[#EAEAF2]  bg-gray-200 rounded-t-md hidden sm:block">
          <div className="flex justify-between">
            <div className="text-xs text-gray-600 flex items-center justify-center">
              <p className="text-sm font-medium">File Name</p>
              <button
                className="flex items-center justify-center w-8 h-8 bg-white border rounded-full mx-2"
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
              <div className="text-xs text-gray-600">
                <p className="text-sm font-medium">Last Modified At</p>
              </div>
              <div className="text-xs text-gray-600 ">
                <p className="text-sm font-medium float-left">Created At</p>
              </div>
              <div className="text-xs text-gray-600 ">
                <p className="text-sm font-medium float-left">Download</p>
              </div>
            </div>
          </div>
        </div>
        {/* Body */}
        {!props.dataGovernance.loadingProfilingFiles ? (
          <div>
            {props.dataGovernance.profilingfiles ? (
              <div>
                {props.dataGovernance.profilingfiles.map((file, index) => (
                  <div
                    key={index}
                    className="h-30 sm:h-12 px-4 py-3 border-b border-[#EAEAF2]"
                  >
                    <div className="text-xs text-gray-600 block sm:hidden mb-2">
                      <p className="text-sm font-medium">
                        File Name:
                        <button
                          onClick={() => download(file.fileName)}
                          className="text-sm ml-2 text-black underline flex justify-between w-full"
                        >
                          <span> {file.fileName}</span>
                          <div className="flex items-center justify-center items-center w-5 h-5  rounded-full bg-[#1996fc]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                              />
                            </svg>
                          </div>
                        </button>
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-xs text-gray-600 sm:block hidden">
                        <button
                          onClick={() => download(file.fileName)}
                          className="text-sm font-medium underline"
                        >
                          {file.fileName}
                        </button>
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
                        <div className="text-xs text-gray-600 sm:block hidden">
                          <button
                            onClick={() => download(file.fileName)}
                            className="flex items-center justify-center w-5 h-5  rounded-full bg-[#1996fc]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                              />
                            </svg>
                          </button>
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
  );
}

const mapStateToProps = (state) => ({
  dataGovernance: state.dataGovernance,
});
const mapActionsToProps = {
  getProfilingFiles,
  sortByfileName,
};
export default connect(mapStateToProps, mapActionsToProps)(Profiling);
