import { UserPersona, UserRole } from '../../types';

export const userPersonas: Record<UserRole, UserPersona> = {
  INSTITUTION: {
    role: 'INSTITUTION',
    name: 'Dr. Anil Sharma',
    designation: 'Nodal Officer',
    employeeId: 'AICTE-NOD-2847',
    email: 'nodal@punetech.edu.in',
    institution: 'Pune Institute of Technology',
  },
  SCRUTINY: {
    role: 'SCRUTINY',
    name: 'Ravi Shankar Prasad',
    designation: 'Regional Scrutiny Officer, West Zone',
    employeeId: 'AICTE-SCR-1023',
    email: 'ravi.prasad@aicte.gov.in',
  },
  CLEARANCE: {
    role: 'CLEARANCE',
    name: 'Meena Agarwal',
    designation: 'Internal Clearance Officer',
    employeeId: 'AICTE-CLR-0458',
    email: 'meena.agarwal@aicte.gov.in',
  },
  EXECUTIVE: {
    role: 'EXECUTIVE',
    name: 'Dr. Krishnamurthy Iyer',
    designation: 'Regulation Bureau Head',
    employeeId: 'AICTE-EXC-0012',
    email: 'dr.iyer@aicte.gov.in',
  },
  AUDIT_ADMIN: {
    role: 'AUDIT_ADMIN',
    name: 'K.R. Narayanan',
    designation: 'System Auditor & Super Admin',
    employeeId: 'AICTE-AUD-0003',
    email: 'k.narayanan@aicte.gov.in',
  },
};
