import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Decode the JWT payload to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ user_id: payload.user_id, role: payload.role });
      } catch {
        logout();
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = (rawToken) => {
    setToken(rawToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
