import { ReactNode } from 'react';
import GovHeader from './GovHeader';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import { UserPersona, UserRole } from '../../types';

interface AppLayoutProps {
  children: ReactNode;
  user: UserPersona;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function AppLayout({ children, user, activeRole, onRoleChange }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* Top Gov Header */}
      <GovHeader user={user} activeRole={activeRole} onRoleChange={onRoleChange} />

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} activeRole={activeRole} onRoleChange={onRoleChange} />

        <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#F8FAFC]">
          <Breadcrumb />
          <div className="flex-1 overflow-y-auto min-h-0 bg-[#F8FAFC]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
