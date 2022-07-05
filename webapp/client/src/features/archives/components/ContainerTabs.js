import React, { useState } from 'react';

export default function ContainerTabs(props) {
  const [seleted, setSelected] = useState('gmm');

  const handleSlectMesearmentApproach = (approach) => {
    setSelected(approach);
    props.setContainer(approach);
  };

  return (
    <div className="flex relative z-90">
      <div className="flex items-center space-x-2 mx-2 lg:space-x-8">
        <button
          onClick={() => handleSlectMesearmentApproach('gmm')}
          className={`${
            seleted === 'gmm' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8  font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          GMM
        </button>
        <button
          onClick={() => handleSlectMesearmentApproach('paa')}
          className={`${
            seleted === 'paa' ? 'bg-[#ffe600]' : 'bg-[#cccccc]'
          } text-[#333333] flex items-center py-2 items-center h-12 px-4 md:px-8 font-bold tracking-wide transition duration-200 rounded-md shadow-md `}
        >
          PAA
        </button>
      </div>
    </div>
  );
}
