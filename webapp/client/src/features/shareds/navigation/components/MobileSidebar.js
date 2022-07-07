import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { Disclosure, Transition, Dialog } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { connect } from 'react-redux';
import { setNavigation } from '../actions';

function MobileSidebar(props) {
  const [isShowing, setIsShowing] = useState(false);
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
    setIsShowing(false);
  };
  return (
    <Disclosure>
      <div className="flex lg:hidden">
        <Disclosure.Button className="p-1 rounded-md bg-[#555555] text-skin-base hover:text-skin-inverted hover:bg-skin-fill transition duration-300 ease-in-out">
          <MenuIcon
            className="block h-8 w-8"
            onClick={() => setIsShowing((isShowing) => !isShowing)}
          />
        </Disclosure.Button>
      </div>
      <Transition.Root show={isShowing} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setIsShowing}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-skin-base shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex justify-end">
                <button
                  type="button"
                  className="p-1 rounded-md bg-[#555555] text-skin-base hover:text-skin-inverted hover:bg-skin-fill transition duration-300 ease-in-out"
                  onClick={() => setIsShowing(false)}
                >
                  <XIcon className="h-8 w-8" />
                </button>
              </div>
              <ul className="relative pt-5">
                {props.sidebarItems.navigation.map((item) => (
                  <li className="relative my-5 px-4" key={item.title}>
                    <Link
                      to={item.url}
                      className={`${
                        activeTab === item.url
                          ? 'text-skin-base border-2 transition animation-300 border-[#FFE416]'
                          : 'text-white'
                      } flex items-center flex-col justify-center text-lg font-semibold rounded-md w-full h-12 bg-[#555555] px-2`}
                      onClick={() => handleSetActiveTab(item.url)}
                    >
                      <span className="text-lg font-medium">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </Disclosure>
  );
}

const mapStateToProps = (state) => ({
  sidebarItems: state.sidebarItems,
});
const mapActionsToProps = { setNavigation };
export default connect(mapStateToProps, mapActionsToProps)(MobileSidebar);
