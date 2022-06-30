import React from 'react';
import { Link } from 'react-router-dom';

export default function Validation() {
  return (
    <div className="my-8 border border-[#EAEAF2] rounded-md">
      {/* Header */}
      <div className="h-12  px-4 py-3  border-b border-[#EAEAF2] bg-gray-200 rounded-t-md">
        <div className="flex justify-between">
          <div className="text-xs text-gray-600">
            <p className="text-sm font-medium">Filename</p>
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <div className="h-12  px-4 py-3 border-t border-[#EAEAF2]">
          <div className="flex justify-between">
            <div className="text-xs text-gray-600">
              <p className="text-sm font-medium">file_sample.svg</p>
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
            <div className="flex items-center justify-center w-5 h-5  rounded-full bg-black">
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
          </div>
        </div>
      ))}
      {/* Buttons */}
      {/* <div className="flex items-center justify-between">
        <button className="flex items-center my-8 h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left">
          <Link
            to="/start-project/run"
            className="flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </Link>
        </button>
        <button className="my-8 disabled:bg-[#cccccc] inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left">
          <div className="flex items-center">
            <span>Export files</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      </div> */}
    </div>
  );
}
