// src/auth/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoggingOut } = useAuth();
      
  if (isAuthenticated === null) return <p>Loading...</p>; // or spinner
  if( isLoggingOut ) return <Navigate to='/'/>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};
