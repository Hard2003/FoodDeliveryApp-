import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const PublicRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
