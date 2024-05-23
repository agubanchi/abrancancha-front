import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userId, setUserId] = useState(() => user ? user.id : null); // Agrega userId al estado

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [userList, setUserList] = useState(() => {
    const storedUsers = localStorage.getItem('userList');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (user) {
      setFormData(user);
      setUserId(user.id); // Actualiza userId cuando se actualiza el usuario
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const addUser = (userData) => {
    const newUser = { ...userData, id: uuidv4() };
    setUserList((prevList) => [...prevList, newUser]);
  };

  const deleteUser = (id) => {
    setUserList((prevList) => prevList.filter((user) => user.id !== id));
  };

  const getUserById = (id) => {
    setActiveId(id);
  };

  const updateUser = (data) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.id === activeId ? { ...user, ...data } : user
      )
    );
    setActiveId(null);
  };

  return (
    <AuthContext.Provider
      value={{ user,userId, formData, setFormData, login, logout, userList, addUser, deleteUser, getUserById, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
