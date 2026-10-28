import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserPersona, UserRole } from '../types';
import { userPersonas } from '../data/fixtures/institutions';

interface AuthContextType {
  user: UserPersona;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('INSTITUTION');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const loginAs = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const user = userPersonas[role] || userPersonas.INSTITUTION;

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
