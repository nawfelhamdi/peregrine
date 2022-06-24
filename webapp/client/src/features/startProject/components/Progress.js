import React from 'react';

export default function Progress({ value }) {
  let styleProgress = {
    width: `${value}%`,
  };
  return (
    <div
      className={`${
        value < 100 ? 'animate-pulse' : ''
      }  w-full bg-[#e3e3e3] rounded-md duration-300 transition`}
    >
      <div className={` bg-blue-400 rounded-md`} style={styleProgress}>
        <div className="text-white text-center font-medium flex items-center justify-center px-6 space-x-1">
          <span>{value}</span>
          <span>%</span>
          {value !== 0 ? <span>Done!</span> : null}
        </div>
      </div>
    </div>
  );
}
