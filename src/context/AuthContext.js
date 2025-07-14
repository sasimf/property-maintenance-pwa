import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // On init, try to load user from localStorage
  const [user, setUserState] = useState(() => {
    const json = localStorage.getItem('pm_user');
    return json ? JSON.parse(json) : null;
  });

  // Wrap setter so we also persist to localStorage
  const setUser = userObj => {
    if (userObj) {
      localStorage.setItem('pm_user', JSON.stringify(userObj));
    } else {
      localStorage.removeItem('pm_user');
    }
    setUserState(userObj);
  };

  // Optional: clear user on logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
