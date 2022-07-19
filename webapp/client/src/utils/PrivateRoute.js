import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import { setLocationPath } from '../features/auth/actions';
const PrivateRoute = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const location = useLocation();
  useEffect(() => {
    props.setLocationPath(JSON.stringify(location.pathname));
  }, []);
  // const { allowedRoles } = props;
  return isAuthenticated ? (
    props.allowedRoles === undefined ? (
      <Outlet />
    ) : props.allowedRoles.filter((element) =>
        accounts[0].idTokenClaims.roles.includes(element)
      ).length === 0 ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapActionsToProps = {
  setLocationPath,
};
export default connect(mapStateToProps, mapActionsToProps)(PrivateRoute);

// import React from "react";
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { connect } from "react-redux";

// const PrivateRoute = (props) => {
//   const location = useLocation();
//   const { auth, allowedRoles } = props;
//   return auth.isAuthenticated ? (
//     allowedRoles.indexOf(auth.user.role) !== -1 ? (
//       <Outlet />
//     ) : (
//       <Navigate to='/unauthorized' state={{ from: location }} replace />
//     )
//   ) : (
//     <Navigate to='/login' state={{ from: location }} replace />
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// export default connect(mapStateToProps, null)(PrivateRoute);
