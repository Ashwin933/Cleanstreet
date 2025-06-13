import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const storedUser = localStorage.getItem('cleanstreet_user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const { token, ...userWithoutToken } = userData;
    setUser(userWithoutToken);
    localStorage.setItem('cleanstreet_user', JSON.stringify(userWithoutToken));
    if (token) {
      localStorage.setItem('token', token); 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cleanstreet_user');
    localStorage.removeItem('token'); 
  };

  const isAdmin = user && user.role === 'ADMIN';
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 