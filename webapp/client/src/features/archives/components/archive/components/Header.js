import React from 'react';
import Tabs from './Tabs';
import Search from './Search';
import Sort from './Sort';

export default function Header({ sort, handleSort, container, setContainer }) {
  return (
    <div className="bg-white shadow-none lg:shadow-md px-4 md:px-16 w-full relative lg:fixed mt-16 border-t border-white py-4 z-10">
      <div className=" flex justify-between items-start mb-4 flex-col lg:flex-row space-y-4 lg:space-y-0">
        <Tabs container={container} setContainer={setContainer} />
        <Search container={container} />
      </div>
      <Sort sort={sort} handleSort={handleSort} />
    </div>
  );
}
