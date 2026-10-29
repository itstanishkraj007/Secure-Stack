import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth, ROLE_HOME_ROUTES } from './context/AuthContext';
import { PortalDataProvider } from './context/PortalDataContext';
import AppLayout from './components/layout/AppLayout';
import { UserRole } from './types';

// Public Pages
import HomePage from './pages/public/HomePage';
import FeaturesPage from './pages/public/FeaturesPage';
import LoginPage from './pages/public/LoginPage';

// Dashboard Pages
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import SubmitFDR from './pages/institution/SubmitFDR';
import ScrutinyQueue from './pages/scrutiny/ScrutinyQueue';
import CaseDetail from './pages/scrutiny/CaseDetail';
import LifecycleDashboard from './pages/lifecycle/LifecycleDashboard';
import ClearanceHub from './pages/clearance/ClearanceHub';
import ExecutiveDashboard from './pages/executive/ExecutiveDashboard';
import AuditLedger from './pages/audit/AuditLedger';

function DashboardLayoutWrapper() {
  const { user, role, loginAs } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: UserRole) => {
    loginAs(newRole);
    navigate(ROLE_HOME_ROUTES[newRole]);
  };

  return (
    <AppLayout user={user} activeRole={role} onRoleChange={handleRoleChange}>
      <Outlet />
    </AppLayout>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <AuthProvider>
      <PortalDataProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Authenticated Dashboard Routes */}
            <Route element={<DashboardLayoutWrapper />}>
              <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
              <Route path="/institution/submit" element={<SubmitFDR />} />
              <Route path="/scrutiny/queue" element={<ScrutinyQueue />} />
              <Route path="/scrutiny/cases/:id" element={<CaseDetail />} />
              <Route path="/lifecycle" element={<LifecycleDashboard />} />
              <Route path="/clearance" element={<ClearanceHub />} />
              <Route path="/executive" element={<ExecutiveDashboard />} />
              <Route path="/audit" element={<AuditLedger />} />

              {/* Aliases for legacy and portal URLs */}
              <Route path="/portal/institution" element={<Navigate to="/institution/dashboard" replace />} />
              <Route path="/portal/institution/dashboard" element={<InstitutionDashboard />} />
              <Route path="/portal/institution/submit" element={<SubmitFDR />} />
              <Route path="/portal/scrutiny" element={<Navigate to="/scrutiny/queue" replace />} />
              <Route path="/portal/scrutiny/queue" element={<ScrutinyQueue />} />
              <Route path="/portal/scrutiny/cases/:id" element={<CaseDetail />} />
              <Route path="/portal/lifecycle" element={<LifecycleDashboard />} />
              <Route path="/portal/clearance" element={<ClearanceHub />} />
              <Route path="/portal/executive" element={<ExecutiveDashboard />} />
              <Route path="/portal/audit" element={<AuditLedger />} />
            </Route>

            {/* Fallback to Public Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PortalDataProvider>
    </AuthProvider>
  );
}
