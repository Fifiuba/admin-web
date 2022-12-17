import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {AdminContext} from '../App';
import getAdmin from '../services/getAdmin';

export const ProtectedRoute = ({redirectTo='/'}) => {
  const admin = React.useContext(AdminContext);
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  if (!admin[0] && !token) {
    return <Navigate to={redirectTo}/>;
  } else if (!admin[0] && token) {
    getAdmin(token).then((res) => {
      if (!res) {
        return <Navigate to={redirectTo}/>;
      } else {
        admin[1](res.data);
      }
    });
  } else {
    return <Outlet/>;
  }
};
