import React from 'react';
import Tooltip from '../../../../shareds/Tooltip';

export default function Sort({ sort, handleSort }) {
  return (
    <div className="flex items-center">
      <p className="font-medium">Project ID</p>

      <Tooltip
        tooltipText={
          !sort
            ? 'Order by descending Project ID'
            : 'Order by ascending Project ID'
        }
      >
        <button
          className={`flex items-center justify-center w-8 h-8 border rounded-full mx-2 ${
            sort ? 'bg-skin-button-accent' : 'bg-white'
          }`}
          //   className=""
          onClick={() => handleSort()}
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
      </Tooltip>

      <p className="ml-4 font-semibold flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8  w-8 text-skin-base mx-auto mx-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <span className="text-sm md:text:md">
          Project ID + Project Name + Time stamp
        </span>
      </p>
    </div>
  );
}
