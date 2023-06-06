import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MobileSidebar from './MobileSidebar';
import ProfileMenu from '../../../../shareds/ProfileMenu';

function Topbar({ currentItem }) {
  return (
    <div className="fixed w-full top-0 left-0 pl-0 lg:pl-56 z-90">
      <div className="flex justify-between items-center w-full h-16 px-4 md:px-16 bg-skin-base">
        <div className="flex items-center h-12 space-x-2 md:space-x-4 ">
          <MobileSidebar />
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-skin-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-skin-muted"
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
          <p className="text-white text-sm md:text-lg font-medium md:font-semibold capitalize">
            {currentItem}
          </p>
        </div>
        <ul className="flex items-center space-x-2  md:space-x-4">
          <li>
            <Link to="#" className="hidden md:flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-skin-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link to="#" className="hidden md:flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-skin-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <ProfileMenu />
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentItem: state.sidebarItems.currentItem,
});

export default connect(mapStateToProps, null)(Topbar);