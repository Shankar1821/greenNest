import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  { name: 'John Doe', email: 'john@example.com', password: 'password123' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('greennest_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('greennest_registered_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  useEffect(() => {
    localStorage.setItem('greennest_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (email, password) => {
    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (matchedUser) {
      const sessionUser = { name: matchedUser.name, email: matchedUser.email };
      setUser(sessionUser);
      localStorage.setItem('greennest_user', JSON.stringify(sessionUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const register = (name, email, password) => {
    const emailExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser = { name, email, password };
    setRegisteredUsers((prev) => [...prev, newUser]);
    
    const sessionUser = { name, email };
    setUser(sessionUser);
    localStorage.setItem('greennest_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('greennest_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
