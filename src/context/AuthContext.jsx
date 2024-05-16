import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Al cargar el contexto, verifica si hay información de autenticación en el localStorage para usuario y admin
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');
    return storedUser ? JSON.parse(storedUser) : storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Limpia la información de autenticación del localStorage al cerrar sesión tanto para usuario como para admin
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
