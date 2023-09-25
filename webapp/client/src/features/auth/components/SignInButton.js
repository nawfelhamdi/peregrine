import React from 'react';
import {  useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../config/authConfig';

function SignInButton() {

  const { instance } = useMsal();

  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance.loginPopup({
      ...loginRequest,
      redirectUri: '/redirect'
    }).catch((error) => console.log(error));
  };

  return (
    <button
      onClick={handleLoginPopup}
      className="whitespace-nowrap inline-flex items-center justify-center h-12  md:h-12 px-6 md:px-8 font-medium tracking-wide text-skin-inverted bg-skin-button-accent transition duration-200 rounded shadow-md hover:opacity-80 focus:shadow-outline focus:outline-none"
    >
      Sign In
    </button>
  );
}

export default SignInButton

