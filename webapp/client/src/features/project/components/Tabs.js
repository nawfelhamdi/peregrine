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
  // cursor: 'not-allowed', // TODO: add this the disableed tabs
};

function Tabs(props) {
  return (
    <div className="bg-white shadow-none lg:shadow-md  md:px-16 w-full relative lg:fixed mt-16 border-t border-white py-4 z-0 lg:z-20">
      <div className=" flex justify-between items-start mb-4 flex-col lg:flex-row space-y-4 lg:space-y-0">
        <div className="flex py-8 px-2 py-5 w-full  relative z-90">
          <div className="flex items-center w-full space-x-1 lg:space-x-8">
            <button>
              <NavLink
                to={
                  props.project.navigationTabs.indexOf('start') !== -1
                    ? 'start'
                    : '#'
                }
                className="flex flex-col lg:flex-row py-2 items-center h-14 lg:h-12 px-3 text-sm font-medium lg:font-bold tracking-wide transition duration-200 rounded-md shadow-md"
                style={({ isActive }) =>
                  isActive &&
                  props.project.navigationTabs.indexOf('start') !== -1
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
                  props.project.navigationTabs.indexOf('run') !== -1
                    ? 'run'
                    : '#'
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
              onClick={() => localStorage.setItem('resultsActiveTab', 'export')}
              to={
                props.project.navigationTabs.indexOf('results') !== -1
                  ? 'results'
                  : '#'
              }
              style={({ isActive }) =>
                isActive &&
                props.project.navigationTabs.indexOf('results') !== -1
                  ? activeStyle
                  : notActiveStyle
              }
            >
              <button className="flex flex-col lg:flex-row py-2 items-center h-14 lg:h-12  px-3 text-sm font-medium lg:font-bold tracking-wide transition duration-200 rounded-md shadow-md">
                <span className="px-2 h-5 w-5 md:h-8 md:w-8 lg:mr-2  rounded-full  font-medium text-sm md:text-lg lg:font-bold transition duration-300 rounded-full bg-white flex items-center justify-center">
                  4
                </span>
                <span className="hidden lg:block mr-1">Results and </span>
                Reports
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, null)(Tabs);
