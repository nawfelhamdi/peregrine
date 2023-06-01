import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getArchiveFiles } from '../../../actions';

function Main(props) {
  return (
    <div className="border border-[#EAEAF2] rounded-md p-0">
      {/* List Header */}
      <div className="h-12  px-4 py-3  border-b border-[#EAEAF2]  bg-gray-200 rounded-t-md hidden sm:block">
        <div className="flex justify-between">
          <div className="text-xs text-gray-600">
            <p className="text-sm font-medium">Filename</p>
          </div>
          <div className="flex justify-between w-full sm:w-1/2">
            <div className="text-xs text-gray-600">
              <p className="text-sm font-medium">Last Modified At</p>
            </div>
            <div className="text-xs text-gray-600 ">
              <p className="text-sm font-medium float-left">Created At</p>
            </div>
          </div>
        </div>
      </div>
      {/* List Body */}
      {!props.archives.loadingArchiveFiles ? (
        <div>
          {props.archives.archiveFiles.map((file, index) => (
            <div
              key={index}
              className="h-24 sm:h-12 px-4 py-3 border-b border-[#EAEAF2]"
            >
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
                  <p className="text-sm font-medium">{file.fileName}</p>
                </div>
                <div className="flex justify-between w-full sm:w-1/2">
                  <div className="text-xs text-gray-600">
                    <p className="text-sm font-medium block sm:hidden">
                      Modified At:
                    </p>
                    <p className="text-xs text-sm font-normal sm:font-medium">
                      {moment(file.lastModified).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </p>
                  </div>
                  <div className="text-xs text-gray-600 ">
                    <p className="text-sm font-medium block sm:hidden">
                      Created At:
                    </p>
                    <p className="text-xs text-sm font-normal sm:font-medium">
                      {moment(file.createdOn).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center my-4 font-bold">Loading ...</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getArchiveFiles,
};
export default connect(mapStateToProps, mapActionsToProps)(Main);
