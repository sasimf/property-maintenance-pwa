
// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// 1) Create the context
export const AuthContext = createContext({
  user: null,
  setUser: () => {}, 
});

export function AuthProvider({ children }) {
  // keep the currently‐logged‐in user here
  const [user, setUser] = useState(null);

  // on mount, try to load from localStorage (optional)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
