import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('eyelura-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('eyelura-user');
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('eyelura-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eyelura-user');
    }
  }, [user]);

  const signin = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 1,
          name: email.split('@')[0],
          email: email
        };
        setUser(mockUser);
        setIsAuthModalOpen(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now(),
          name: name,
          email: email
        };
        setUser(mockUser);
        setIsAuthModalOpen(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    user,
    signin,
    signup,
    logout,
    isAuthModalOpen,
    authMode,
    setAuthMode,
    openAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};