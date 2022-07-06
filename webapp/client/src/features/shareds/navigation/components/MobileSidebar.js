import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Disclosure, Transition, Dialog } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { connect } from 'react-redux';

function styleNavItem(current) {
  let navItemStyle = classNames({
    'flex items-center text-sm py-4 px-6 mr-8 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-r-md hover:bg-skin-fill hover:shadow-md hover:text-white transition duration-300 ease-in-out': true,
    'bg-skin-fill text-white transition duration-300 ease-in-out': current,
    'text-[#848F97]': !current,
  });
  return navItemStyle;
}

function MobileSidebar(props) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div>
      <div className=" flex md:hidden">
        <Disclosure.Button className="p-1 rounded-md bg-[#E5E5E5] text-skin-base hover:text-skin-inverted hover:bg-skin-fill transition duration-300 ease-in-out">
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
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="p-1 rounded-md bg-[#E5E5E5] text-skin-base hover:text-skin-inverted hover:bg-skin-fill transition duration-300 ease-in-out"
                  onClick={() => setIsShowing(false)}
                >
                  <XIcon className="h-8 w-8" />
                </button>
              </div>
              <ul className="relative pt-5">
                {props.sidebarItems.navigation.map((item) => (
                  <li className="relative my-5" key={item.title}>
                    <Link
                      to={item.href}
                      className={styleNavItem(
                        props.dashboardNav.currentItem === item.title
                      )}
                      onClick={() => props.setCurrentNavItem(item.title)}
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  sidebarItems: state.sidebarItems,
});
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(MobileSidebar);
