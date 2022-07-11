import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

let activeStyle = {
  background: '#ffe600',
  color: '#333333',
  borderRadius: '5px',
};
let notActiveStyle = {
  background: '#cccccc',
  color: '#333333',
  borderRadius: '5px',
};

function Tabs(props) {
  return (
    <div className="flex py-8 px-2 py-5 md:max-w-full md:px-8 relative z-90">
      <div className="flex items-center space-x-1 lg:space-x-8">
        <button>
          <NavLink
            to={
              props.project.navigationTabs.indexOf('start') !== -1
                ? 'start'
                : '#'
            }
            className="flex flex-col lg:flex-row py-2 items-center h-14 lg:h-12  px-3 text-sm font-medium lg:font-bold tracking-wide transition duration-200 rounded-md shadow-md"
            style={({ isActive }) =>
              isActive && props.project.navigationTabs.indexOf('start') !== -1
                ? activeStyle
                : notActiveStyle
            }
          >
            <span className="px-2 h-5 w-5 md:h-8 md:w-8 lg:mr-2  rounded-full  font-medium text-sm md:text-lg lg:font-bold transition duration-300 rounded-full bg-white flex items-center justify-center">
              1
            </span>
            Start
          </NavLink>
        </button>
        <button>
          <NavLink
            to={
              props.project.navigationTabs.indexOf('preparation') !== -1
                ? 'preparation'
                : '#'
            }
            className="flex flex-col lg:flex-row py-2 items-center h-14 lg:h-12  px-3 text-sm font-medium lg:font-bold tracking-wide transition duration-200 rounded-md shadow-md"
            style={({ isActive }) =>
              isActive &&
              props.project.navigationTabs.indexOf('preparation') !== -1
                ? activeStyle
                : notActiveStyle
            }
          >
            <span className="px-2 h-5 w-5 md:h-8 md:w-8 lg:mr-2  rounded-full  font-medium text-sm md:text-lg lg:font-bold transition duration-300 rounded-full bg-white flex items-center justify-center">
              2
            </span>
            Preparation
          </NavLink>
        </button>
        <button>
          <NavLink
            to={
              props.project.navigationTabs.indexOf('run') !== -1 ? 'run' : '#'
            }
            className="flex flex-col lg:flex-row py-2 items-center h-14 lg:h-12  px-3 text-sm font-medium lg:font-bold tracking-wide transition duration-200 rounded-md shadow-md"
            style={({ isActive }) =>
              isActive && props.project.navigationTabs.indexOf('run') !== -1
                ? activeStyle
                : notActiveStyle
            }
          >
            <span className="px-2 h-5 w-5 md:h-8 md:w-8 lg:mr-2  rounded-full  font-medium text-sm md:text-lg lg:font-bold transition duration-300 rounded-full bg-white flex items-center justify-center">
              3
            </span>
            Run Moody's RI
          </NavLink>
        </button>
        <NavLink
          to={
            props.project.navigationTabs.indexOf('validate') !== -1
              ? 'validate'
              : '#'
          }
          style={({ isActive }) =>
            isActive && props.project.navigationTabs.indexOf('validate') !== -1
              ? activeStyle
              : notActiveStyle
          }
        >
          <button className="flex flex-col lg:flex-row py-2 items-center h-14 lg:h-12  px-3 text-sm font-medium lg:font-bold tracking-wide transition duration-200 rounded-md shadow-md">
            <span className="px-2 h-5 w-5 md:h-8 md:w-8 lg:mr-2  rounded-full  font-medium text-sm md:text-lg lg:font-bold transition duration-300 rounded-full bg-white flex items-center justify-center">
              4
            </span>
            Validate
          </button>
        </NavLink>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, null)(Tabs);
