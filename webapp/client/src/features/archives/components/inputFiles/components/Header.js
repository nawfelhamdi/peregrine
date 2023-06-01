import React from 'react';
import Tabs from './Tabs';
import Search from './Search';

export default function Header({ container, setContainer, prefix }) {
  return (
    <div className="bg-white shadow-none lg:shadow-md px-4 md:px-16 w-full relative lg:fixed mt-16 border-t border-white py-4">
      <div className=" flex justify-between items-start mb-4 flex-col lg:flex-row space-y-4 lg:space-y-0">
        <Tabs
          container={container}
          setContainer={setContainer}
          prefix={prefix}
        />
        <Search container={container} />
      </div>
    </div>
  );
}
