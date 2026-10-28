export type LifecycleStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_SCRUTINY' | 'VERIFIED' | 'ACTIVE' | 'EXPIRING_SOON' | 'MATURED' | 'RELEASED' | 'REJECTED' | 'LOCKED';
export type CheckStatus = 'PASS' | 'FAIL' | 'INCONCLUSIVE' | 'UNKNOWN' | 'NOT_CHECKED' | 'NOT_APPLICABLE' | 'ERROR' | 'HEURISTIC';
export type GateStatus = 'CLEARED' | 'PENDING' | 'ON_HOLD' | 'REJECTED' | 'NOT_STARTED';
export type ScrutinyStatus = 'OPEN' | 'IN_PROGRESS' | 'HOLD' | 'RESOLVED' | 'ESCALATED';
export type Severity = 'CRITICAL' | 'MAJOR' | 'MEDIUM' | 'LOW' | 'INFO';
export type RuleStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'RETIRED' | 'CANDIDATE';
export type UserRole = 'INSTITUTION' | 'SCRUTINY' | 'CLEARANCE' | 'EXECUTIVE' | 'AUDIT_ADMIN';

export interface Instrument {
  id: string;
  fdrNumber: string;
  institution: string;
  institutionCode: string;
  bankName: string;
  ifsc: string;
  branch: string;
  principalAmount: number;
  issueDate: string;
  maturityDate: string;
  holderName: string;
  lifecycleStatus: LifecycleStatus;
  lienStatus: 'ACTIVE' | 'NOT_PLACED' | 'RELEASED';
  daysToMaturity: number;
  alertTier: 'T90' | 'T60' | 'T30' | 'T15' | 'T0' | 'NONE' | 'OVERDUE';
  parentInstrumentId?: string;
  region: string;
  state: string;
}

export interface TripleSourceField {
  fieldName: string;
  displayName: string;
  submittedValue: string;
  ocrValue: string | null;
  ocrConfidence?: number;
  bankValue: string | null;
  match: 'FULL_MATCH' | 'PARTIAL_MATCH' | 'MISMATCH' | 'UNAVAILABLE';
}

export interface VerificationCheck {
  checkType: string;
  displayName: string;
  status: CheckStatus;
  source: string;
  details: string;
  timestamp: string;
  isMock: boolean;
}

export interface Discrepancy {
  id: string;
  fieldName: string;
  submittedValue: string;
  observedValue: string;
  sourceReference: string;
  severity: Severity;
  status: 'OPEN' | 'RESOLVED' | 'WAIVED';
  createdAt: string;
}

export interface ScrutinyCase {
  id: string;
  instrumentId: string;
  fdrNumber: string;
  institution: string;
  bank: string;
  issue: string;
  severity: Severity;
  assignedTo: string | null;
  assignedToName: string | null;
  status: ScrutinyStatus;
  slaHours: number;
  slaOverdue: boolean;
  createdAt: string;
  tripleSourceData: TripleSourceField[];
  verificationChecks: VerificationCheck[];
  discrepancies: Discrepancy[];
}

export interface ClearanceGate {
  id: string;
  number: number;
  gateName: string;
  responsibleCell: string;
  officerName: string | null;
  status: GateStatus;
  holdReason?: string;
  updatedAt: string | null;
  isSequentiallyBlocked?: boolean;
}

export interface ReleaseRequest {
  id: string;
  instrumentId: string;
  fdrNumber: string;
  institution: string;
  amount: number;
  requestedBy: string;
  requestedAt: string;
  gates: ClearanceGate[];
  overallStatus: 'BLOCKED' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
}

export interface AuditEvent {
  id: string;
  sequenceNumber: number;
  timestampIst: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  correlationId: string;
  eventHash: string;
  prevHash: string;
}

export interface UserPersona {
  role: UserRole;
  name: string;
  designation: string;
  employeeId: string;
  email: string;
  institution?: string;
}
