import React from 'react';
import { Link } from 'react-router-dom';

export default function Validate() {
  return (
    <div className="my-8">
      <table className="w-full text-center rounded-md">
        <thead className="border-b bg-skin-base text-white rounded-md">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-white px-2 py-4"
            >
              File Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-2 py-4"
            >
              Status
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white px-2 py-4"
            >
              Errors (if any)
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#F9F9F9]">
          {[1, 2].map((item) => (
            <tr className="border-b border-white">
              <td className='px-2 py-3" whitespace-nowrap text-sm font-medium text-gray-900 '>
                <p className="font-bold">business8_entries.csv</p>
              </td>
              <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-white">
                <div className="flex items-center justify-center w-8 h-8 mx-auto  rounded-full bg-green-700 sm:w-12 sm:h-12">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-white"></td>
            </tr>
          ))}
          <tr className="border-b border-white">
            <td className='px-2 py-3" whitespace-nowrap text-sm font-medium text-gray-900 '>
              <p className="font-bold">Reports</p>
            </td>
            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-white">
              <div className="flex items-center justify-center w-8 h-8 mx-auto  rounded-full bg-green-700 sm:w-12 sm:h-12">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </td>
            <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-white"></td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-between">
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
      </div>
    </div>
  );
}
