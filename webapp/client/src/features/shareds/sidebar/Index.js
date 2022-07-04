import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNavigation } from './actions';
import logo from '../../../assets/logo.png';

function Sidebar(props) {
  //   const [open, setOpen] = useState(false); //TODO: add mobile side bar
  const [seleted, setSelected] = useState('File Catalog');
  let query = useLocation();

  useEffect(() => {
    let navItem = query.pathname.split('/')[1].replace('-', '');
    let currentItem = query.pathname.split('/')[1].replace('-', ' ');
    props.setNavigation(navItem, currentItem);
  }, []);
  return (
    <div className="w-40 sm:w-56 duration-300 p-0 relative z-30 hidden lg:block h-full fixed top-0 z-0 left-0 bg-skin-base">
      <div className="bg-skin-base  h-screen fixed  w-40 sm:w-56  p-8 hidden lg:block">
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
        {props.sidebarItems.navigation.map((item, index) => (
          <>
            <div key={index} className="text-center h-screen">
              <p
                className={`${
                  seleted === item.name
                    ? 'text-skin-base border-2 transition animation-300 border-[#FFE416]'
                    : 'text-white'
                } flex items-center justify-center text-lg font-bold rounded-md w-full h-12 bg-[#555555]`}
                onClick={() => setSelected(item.name)}
              >
                <Link to={item.url}>{item.name}</Link>
              </p>
              {item.subNavItems.map((item, index) => (
                <div className="ml-4">
                  <Link
                    to={item.url}
                    key={index}
                    onClick={() => setSelected(item.name)}
                  >
                    <p
                      className={`${
                        seleted === item.name
                          ? 'text-skin-base border-2 transition animation-300 border-[#FFE416]'
                          : 'text-white'
                      } flex items-center justify-center text-md font-semibold my-3 text-white rounded-md w-full h-12 bg-[#555555]`}
                    >
                      {item.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sidebarItems: state.sidebarItems,
});

const mapActionsToProps = { setNavigation };
export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
