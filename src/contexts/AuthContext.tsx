import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useTranslation } from '../hooks/useTranslation';

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  id_number: string | null;
  role: string;
  scopes: string[];
  
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const t = useTranslation();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      const userInfo = authService.getUserInfo();
      const tokens = authService.getTokens();

      if (userInfo && tokens) {
        setUser(userInfo);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (phone: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ phone, password });
      
      // Save tokens and user info
      authService.saveTokens({
        access: response.access,
        refresh: response.refresh
      });
      
      authService.saveUserInfo(response.user);
      
      setUser(response.user);
      setIsAuthenticated(true);
      navigate('/admin/admin');
    } catch (err: any) {
      // Handle error messages
      if (err.response && err.response.status === 400) {
        setError(t.invalidCredentials || 'Invalid phone number or password');
      } else {
        setError(t.loginError || 'An error occurred during login');
      }
      navigate('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};