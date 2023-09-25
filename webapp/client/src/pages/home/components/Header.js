import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import SignInButton from '../../../features/auth/components/SignInButton';
import ProfileMenu from '../../../shareds/ProfileMenu';
import { AuthenticatedTemplate } from "@azure/msal-react";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

export default function Header() {

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <div className="shadow-md bg-skin-base relative z-90">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <img
              src={logo}
              className="w-full h-full bg-skin-button-accent rounded"
              alt="Peregrine"
            />
          </Link>
          <h1 className="max-w-lg  font-sans text-xl font-medium md:text-2xl md:font-bold leading-none tracking-tight text-skin-muted sm:text-4xl w-full mx-auto text-center">
            Peregrine
          </h1>
          <ul className="flex items-center space-x-4 md:space-x-8 ">
            <li>
              <Link to="#" className="flex items-center justify-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-skin-base hover:opacity-80 transition duration-200"
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
            <li>{activeAccount ? <ProfileMenu /> : <SignInButton />}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
