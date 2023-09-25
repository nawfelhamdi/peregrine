import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLocationPath } from '../actions';
import { AuthenticatedTemplate } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";

const PrivateRoute = (props) => {

  const location = useLocation();
  useEffect(() => {
    props.setLocationPath(JSON.stringify(location.pathname));
  }, []);

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return activeAccount ? (
    <AuthenticatedTemplate>
      <Outlet />
    </AuthenticatedTemplate>
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
