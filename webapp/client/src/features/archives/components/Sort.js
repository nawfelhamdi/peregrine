import React from 'react';

export default function Sort({ sort, handleSort }) {
  return (
    <div className="flex items-center mx-8 bg-blue-700 hover:bg-blue-800 h-12 px-4 rounded">
      <p className="font-medium text-white">Sort</p>
      <button
        className="flex items-center justify-center w-8 h-8 bg-white border rounded-full mx-2"
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
    </div>
  );
}
