// src/auth/AuthProvider.js
import { createContext, useContext, useEffect, useState } from 'react';

import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: loading
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [role, setUserRole] = useState("user");


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth');
        setIsAuthenticated(true);
        setUserRole(res.data.role);
      } catch(err) {
        setIsAuthenticated(false);
        setUserRole("user");
      }
    };
    checkAuth();
  }, []);

  
  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated , isLoggingOut, setIsLoggingOut, role, setUserRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
