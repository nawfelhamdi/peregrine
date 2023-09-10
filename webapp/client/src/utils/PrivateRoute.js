import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { useIsAuthenticated } from '@azure/msal-react';
import { setLocationPath } from '../features/auth/actions';

const PrivateRoute = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  useEffect(() => {
    props.setLocationPath(JSON.stringify(location.pathname));
    console.log('private route');
  }, []);
  return isAuthenticated ? (
    <Outlet />
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
