import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Search from './Search';
import { connect } from 'react-redux';
import { sortByfileName } from '../actions';
const { BlobServiceClient } = require('@azure/storage-blob');

function Profiling(props) {
  const [sortByfileName, setSortByfileName] = useState(false);

  const account = 'peregrineblob';
  const sas =
    '?sp=racwli&st=2022-07-04T15:31:19Z&se=2022-07-19T23:31:19Z&spr=https&sv=2021-06-08&sr=c&sig=HyKvbXvGUO8UuoLDaUN4V06SaVsKYSBvxdX%2FgephWAY%3D';
  const containerName = 'moody/output/1193';
  const blobName = 'lm_audits-2022-05-16T15-11-37Z.csv';

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${sas}`
  );
  async function download() {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(
      await downloadBlockBlobResponse.blobBody
    );
    console.log('Downloaded blob content', downloaded);
    // var blob = new Blob([downloaded], { type: 'text/plain;charset=utf-8' });
    // saveAs(blob, 'demo.svg');
    var file = new File([downloaded], 'lm_audits-2022-06-07T18-53-03Z.csv', {
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
        <div className="h-12  px-4 py-3  border-b border-[#EAEAF2] bg-gray-200 rounded-t-md">
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
            <div className="text-xs text-gray-600">
              <p className="text-sm font-medium">Status</p>
            </div>
            <div className="text-xs text-gray-600 ">
              <p className="text-sm font-medium">Owner / created by</p>
            </div>
            <div className="text-xs text-gray-600 ">
              <p className="text-sm font-medium">Dowload</p>
            </div>
          </div>
        </div>
        {/* Body */}
        {[1, 2, 3].map((item) => (
          <div className="h-12  px-4 py-3 border-t border-[#EAEAF2]">
            <div className="flex justify-between">
              <div className="text-xs text-gray-600">
                <p className="text-sm font-medium">
                  lm_audits-2022-06-07T18-53-03Z.csv
                </p>
              </div>
              <div className="flex items-center justify-center w-5 h-5  rounded-full bg-green-700">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-600 ">
                <p className="text-sm font-medium">Owner or created by</p>
              </div>
              <button
                onClick={download}
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
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionsToProps = {
  sortByfileName,
};
export default connect(mapStateToProps, mapActionsToProps)(Profiling);
