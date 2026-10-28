import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import { UserRole } from './types';
import { userPersonas } from './data/fixtures/institutions';
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import SubmitFDR from './pages/institution/SubmitFDR';
import ScrutinyQueue from './pages/scrutiny/ScrutinyQueue';
import CaseDetail from './pages/scrutiny/CaseDetail';
import LifecycleDashboard from './pages/lifecycle/LifecycleDashboard';
import ClearanceHub from './pages/clearance/ClearanceHub';
import ExecutiveDashboard from './pages/executive/ExecutiveDashboard';
import AuditLedger from './pages/audit/AuditLedger';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>('INSTITUTION');
  const user = userPersonas[activeRole] || userPersonas.INSTITUTION;

  return (
    <BrowserRouter>
      <AppLayout user={user} activeRole={activeRole} onRoleChange={setActiveRole}>
        <Routes>
          <Route path="/" element={<Navigate to="/institution/dashboard" replace />} />
          <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
          <Route path="/institution/submit" element={<SubmitFDR />} />
          <Route path="/scrutiny/queue" element={<ScrutinyQueue />} />
          <Route path="/scrutiny/cases/:id" element={<CaseDetail />} />
          <Route path="/lifecycle" element={<LifecycleDashboard />} />
          <Route path="/clearance" element={<ClearanceHub />} />
          <Route path="/executive" element={<ExecutiveDashboard />} />
          <Route path="/audit" element={<AuditLedger />} />
          <Route path="*" element={<Navigate to="/institution/dashboard" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
