import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNavigation } from './actions';
import ResultSidebarTabs from '../../project/components/ResultSidebarTabs';
import logo from '../../../assets/logo.png';

function Sidebar(props) {
  const [activeTab, setActiveTab] = useState('');
  let query = useLocation();

  useEffect(() => {
    let navItem = query.pathname.split('/')[1].replace('-', '');
    let currentItem = query.pathname.split('/')[1].replace('-', ' ');
    props.setNavigation(navItem, currentItem);
    setActiveTab(localStorage.getItem('activeTab'));
  }, [activeTab]);

  const handleSetActiveTab = (activeTab) => {
    setActiveTab(activeTab);
    localStorage.setItem('activeTab', activeTab.split('/').pop());
  };
  return (
    <div className="w-40 sm:w-56 duration-300 p-0 relative z-30 hidden lg:block h-full fixed top-0 z-0 left-0 bg-skin-base">
      <div className="bg-skin-base  h-screen fixed  w-40 sm:w-56  p-6 hidden lg:block">
        <Link
          to="/"
          aria-label="Company"
          title="Company"
          className="flex items-center justify-center w-full mb-8"
        >
          <img
            src={logo}
            className="w-[75px] h-[75px] bg-skin-button-accent rounded"
            alt="Peregrine"
          />
        </Link>
        {props.sidebarItems.navigation.map((item) => (
          <div key={item.title} className="my-2">
            <Link to={item.url} onClick={() => handleSetActiveTab(item.url)}>
              <p
                className={`${
                  activeTab === item.url
                    ? 'text-skin-base border-2 transition animation-300 border-[#FFE416]'
                    : 'text-white'
                } flex items-center flex-col justify-center text-lg font-semibold rounded-md w-full h-12 bg-[#555555] px-2`}
              >
                {item.title}
                {item.subTitle ? (
                  <span className="text-xs font-medium"> {item.subTitle}</span>
                ) : null}
              </p>
            </Link>
          </div>
        ))}
        {/* This side bar items are showen only for in results and reports step for the start project feature */}
        {query.pathname === '/start-project/results' ||
        query.pathname === '/start-project/results/reports' ? (
          <ResultSidebarTabs />
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sidebarItems: state.sidebarItems,
});

const mapActionsToProps = { setNavigation };
export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
