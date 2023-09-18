import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../utils/authConfig';
import { connect } from 'react-redux';
import { setAuthorizationHeader } from '../actions';
import axios from 'axios';
function SignInButton(props) {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        const accessToken = `bearer ${res.idToken}`;
        sessionStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common['Authorization'] = accessToken;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <button
      onClick={() => handleLogin()}
      className="whitespace-nowrap inline-flex items-center justify-center h-12  md:h-12 px-6 md:px-8 font-medium tracking-wide text-skin-inverted bg-skin-button-accent transition duration-200 rounded shadow-md hover:opacity-80 focus:shadow-outline focus:outline-none"
    >
      Sign In
    </button>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapActionsToProps = {
  setAuthorizationHeader,
};
export default connect(mapStateToProps, mapActionsToProps)(SignInButton);

