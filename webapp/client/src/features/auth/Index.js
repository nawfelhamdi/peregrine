import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import texture from '../../assets/texture.svg';
import { useMsal } from "@azure/msal-react";
import { connect } from 'react-redux';
import SignInButton from './components/SignInButton';

function Auth(props) {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <div className="relative flex flex-col-reverse px-4 mx-auto lg:block lg:flex-col md:px-8 max-w-xl sm:max-w-full md:max-h-screen justify-center">
      {!activeAccount ? null : <Navigate to={props.auth.locationPath} />}
      <div className="z-0 hidden bg-[#D3DEFA] lg:flex justify-start min-h-screen -mx-4 overflow-hidden  lg:w-1/2 lg:absolute lg:justify-end lg:bottom-0 lg:left-0 lg:items-center">
        <img
          src={texture}
          alt="Login"
          className="object-contain h-screen w-full "
        />
      </div>
      <div className="relative flex justify-end min-w-xl mx-auto xl:pr-32 lg:max-w-screen-xl h-screen md:pt-28">
        <div className="mb-16 lg:pr-5 lg:max-w-lg lg:mb-0 lg:w-[420px] ">
          <div className="mx-auto md:max-w-md mb-6">
            <Link to="/">
              <div className="mt-10 mb-8 max-w-xs">
                <img
                  src={logo}
                  alt="Peregrine"
                  className="w-[80px] h-[80px] bg-skin-button-accent rounded"
                />
              </div>
            </Link>
            <Link to="/">
              <button className="inline-flex items-start justify-between h-6 y-3 font-semibold tracking-wide text-[#939393] transition duration-200 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </button>
            </Link>
            <h2 className="my-4 max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Welcome to Peregrine
            </h2>
            <div className="mt-12">
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Auth);
