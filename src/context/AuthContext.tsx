import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPersona, UserRole } from '../types';
import { userPersonas } from '../data/fixtures/institutions';

export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  INSTITUTION: '/institution/dashboard',
  SCRUTINY: '/scrutiny/queue',
  CLEARANCE: '/clearance',
  EXECUTIVE: '/executive',
  AUDIT_ADMIN: '/audit',
};

export const ROLE_METADATA: Record<UserRole, { title: string; subtitle: string; icon: string; badgeColor: string }> = {
  INSTITUTION: {
    title: 'Institution Nodal Desk',
    subtitle: 'Deposit Submissions, Portfolio Surveillance & Renewal Desk',
    icon: '🏛️',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  SCRUTINY: {
    title: 'Regional Scrutiny Desk',
    subtitle: 'Automated Discrepancy Scrutiny & Statutory Deficit Memos',
    icon: '🔍',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  CLEARANCE: {
    title: 'Multi-Cell Clearance Bureau',
    subtitle: 'Sequential 5-Gate Settlement, Rule 04 Penalty Assessment & NOC Desk',
    icon: '📋',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
  },
  EXECUTIVE: {
    title: 'Executive Command Center',
    subtitle: 'Pan-India ₹3,200+ Cr Surveillance, Regional Exposure & Interventions',
    icon: '📊',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  AUDIT_ADMIN: {
    title: 'Tamper-Evident Audit Desk',
    subtitle: 'SHA-256 Hash Chain Verification & Digital Audit Trail Certification',
    icon: '🔐',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
  },
};

interface AuthContextType {
  user: UserPersona;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('secure_stack_active_role') as UserRole;
      return saved && userPersonas[saved] ? saved : 'INSTITUTION';
    } catch {
      return 'INSTITUTION';
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const loginAs = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('secure_stack_active_role', selectedRole);
    } catch (e) {
      console.warn('Failed to save role to localStorage', e);
    }
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
