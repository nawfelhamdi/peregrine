import { Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import { closeUnauthorizedModal, openUnauthorizedModal } from '../actions';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import axios from "axios"

function UnauthorizedModal(props) {
  const cancelButtonRef = useRef(null);
    
  const { instance, accounts} = useMsal();

  useEffect(() => {
    if (props.auth.fireSsoSilent) {
      console.log('ssoSilent');
      instance
        .ssoSilent({
          scopes: ['user.read'],
          loginHint: accounts[0].username,
        })
        .then((res) => {
          props.setAuthorizationHeader(res.idToken);
          console.log('res of ssoSilent', res);
        })
        .catch((error) => {
          console.log('openUnauthorizedModal', error);
          // if (error instanceof InteractionRequiredAuthError) {
          // props.openUnauthorizedModal();
          //   instance.loginRedirect();
          // }
        });
    }
    // eslint-disable-next-line
  }, [props.auth.fireSsoSilent]);


  const handleOnClose = () => {
    props.closeUnauthorizedModal();
    handleLogout()
  };

    const handleLogout = () => {
      instance.logoutPopup({
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/',
      });
      sessionStorage.clear();
  };
  
  return (
    <Transition.Root show={props.auth.isUnauthorized} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleOnClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Login session expired
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your login session has expired. Please log in to
                          regain access
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => handleOnClose()}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapActionsToProps = {
  closeUnauthorizedModal,
  openUnauthorizedModal,
};
export default connect(mapStateToProps, mapActionsToProps)(UnauthorizedModal);
