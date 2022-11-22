import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

export const ProtectedRoute = ({admin, redirectTo='/'}) => {
  /*if (!admin) {
    return <Navigate to={redirectTo}/>;
  }*/
  return <Outlet/>;
};
