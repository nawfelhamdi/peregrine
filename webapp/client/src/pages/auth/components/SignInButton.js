import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../utils/authConfig';
export default function SignInButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      // console.log(e);
    });
    console.log('login');
  };

  return (
    <button
      onClick={() => handleLogin()}
      className="inline-flex items-center justify-center h-12 md:h-12 px-12 md:px-12 font-medium tracking-wide text-skin-inverted bg-skin-button-accent transition duration-200 rounded shadow-md hover:opacity-80 focus:shadow-outline focus:outline-none"
    >
      Sign In
    </button>
  );
}
