// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Or any auth logic you use

  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
