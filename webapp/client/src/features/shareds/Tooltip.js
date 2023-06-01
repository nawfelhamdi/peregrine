import React from 'react';

export default function Tooltip({ children, tooltipText }) {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = '5px';
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = '10px';
  }
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute bg-gradient-to-r from-black  w-52 to-gray-700 text-white text-xs px-2 py-2 rounded flex items-center transition-all duration-150"
        style={{ left: '100%', opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-black h-3 w-3 absolute"
          style={{ left: '-6px', transform: 'rotate(45deg)' }}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  );
}
