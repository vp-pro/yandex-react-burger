import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRouteElement = ({ element: Element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const all = useSelector((state) => state.auth);

  console.log('isAuthernticated?', all)
  return isAuthenticated ? Element : <Navigate to="/login" replace/>;
};

export default ProtectedRouteElement