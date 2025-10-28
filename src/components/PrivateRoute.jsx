import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './FireBase';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;