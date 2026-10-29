import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Instrument, ScrutinyCase, ReleaseRequest, AuditEvent, GateStatus, ScrutinyStatus } from '../types';
import { instruments as initialInstruments } from '../data/fixtures/instruments';
import { scrutinyCases as initialScrutinyCases } from '../data/fixtures/scrutiny';
import { releaseRequests as initialReleaseRequests } from '../data/fixtures/clearances';
import { auditEvents as initialAuditEvents } from '../data/fixtures/audit';
import { generateDeterministicHash } from '../utils/crypto';

interface PortalDataContextType {
  instruments: Instrument[];
  scrutinyCases: ScrutinyCase[];
  releaseRequests: ReleaseRequest[];
  auditEvents: AuditEvent[];
  selectedInstitution: string;
  setSelectedInstitution: (inst: string) => void;
  addInstrument: (newInst: Instrument, newCase?: ScrutinyCase) => void;
  updateScrutinyCase: (caseId: string, updates: Partial<ScrutinyCase>) => void;
  assignScrutinyCase: (caseId: string, officerEmail: string, officerName: string) => void;
  recordScrutinyDecision: (caseId: string, status: ScrutinyStatus, decisionNote: string, officerEmail: string) => void;
  updateClearanceGate: (
    requestId: string,
    gateNumber: number,
    status: GateStatus,
    officerName: string,
    holdReason?: string
  ) => void;
  issueSanctionOrder: (requestId: string, approverName: string) => void;
  verifyAuditIntegrity: () => { isValid: boolean; count: number; rootHash: string; timestamp: string };
  resetAllData: () => void;
  addAuditEvent: (action: string, targetType: string, targetId: string, actorEmail: string, actorRole: string) => void;
}

const PortalDataContext = createContext<PortalDataContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'secure_stack_';

export const PortalDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [instruments, setInstruments] = useState<Instrument[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}instruments`);
      return saved ? JSON.parse(saved) : initialInstruments;
    } catch {
      return initialInstruments;
    }
  });

  const [scrutinyCases, setScrutinyCases] = useState<ScrutinyCase[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}scrutinyCases`);
      return saved ? JSON.parse(saved) : initialScrutinyCases;
    } catch {
      return initialScrutinyCases;
    }
  });

  const [releaseRequests, setReleaseRequests] = useState<ReleaseRequest[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}releaseRequests`);
      return saved ? JSON.parse(saved) : initialReleaseRequests;
    } catch {
      return initialReleaseRequests;
    }
  });

  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}auditEvents`);
      return saved ? JSON.parse(saved) : initialAuditEvents;
    } catch {
      return initialAuditEvents;
    }
  });

  const [selectedInstitution, setSelectedInstitution] = useState<string>('PIT-MH-001');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}instruments`, JSON.stringify(instruments));
    } catch (e) {
      console.warn('Failed to save instruments to localStorage', e);
    }
  }, [instruments]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}scrutinyCases`, JSON.stringify(scrutinyCases));
    } catch (e) {
      console.warn('Failed to save scrutinyCases to localStorage', e);
    }
  }, [scrutinyCases]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}releaseRequests`, JSON.stringify(releaseRequests));
    } catch (e) {
      console.warn('Failed to save releaseRequests to localStorage', e);
    }
  }, [releaseRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}auditEvents`, JSON.stringify(auditEvents));
    } catch (e) {
      console.warn('Failed to save auditEvents to localStorage', e);
    }
  }, [auditEvents]);

  const addAuditEvent = (
    action: string,
    targetType: string,
    targetId: string,
    actorEmail: string,
    actorRole: string
  ) => {
    const latestEvent = auditEvents[0] || initialAuditEvents[0];
    const prevHash = latestEvent ? latestEvent.eventHash : '0000000000000000000000000000000000000000000000000000000000000000';
    const nextSeq = latestEvent ? latestEvent.sequenceNumber + 1 : 900;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const timestampIst = `${dateStr}, ${timeStr} IST`;
    const correlationId = `req-${Math.random().toString(36).substring(2, 8)}`;

    const rawPayload = `${nextSeq}|${timestampIst}|${actorEmail}|${actorRole}|${action}|${targetType}|${targetId}|${correlationId}|${prevHash}`;
    const eventHash = generateDeterministicHash(rawPayload);

    const newEvent: AuditEvent = {
      id: `ae-${nextSeq}`,
      sequenceNumber: nextSeq,
      timestampIst,
      actorEmail,
      actorRole,
      action,
      targetType,
      targetId,
      correlationId,
      eventHash,
      prevHash,
    };

    setAuditEvents((prev) => [newEvent, ...prev]);
  };

  const addInstrument = (newInst: Instrument, newCase?: ScrutinyCase) => {
    setInstruments((prev) => [newInst, ...prev]);
    if (newCase) {
      setScrutinyCases((prev) => [newCase, ...prev]);
    }
    addAuditEvent('INSTRUMENT_SUBMITTED', 'Instrument', newInst.fdrNumber, 'nodal@punetech.edu.in', 'INSTITUTION');
  };

  const updateScrutinyCase = (caseId: string, updates: Partial<ScrutinyCase>) => {
    setScrutinyCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, ...updates } : c))
    );
  };

  const assignScrutinyCase = (caseId: string, officerEmail: string, officerName: string) => {
    setScrutinyCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              assignedTo: officerEmail,
              assignedToName: officerName,
              status: c.status === 'OPEN' ? 'IN_PROGRESS' : c.status,
            }
          : c
      )
    );
    addAuditEvent('SCRUTINY_ASSIGNED', 'ScrutinyCase', caseId, officerEmail, 'SCRUTINY');
  };

  const recordScrutinyDecision = (
    caseId: string,
    status: ScrutinyStatus,
    decisionNote: string,
    officerEmail: string
  ) => {
    setScrutinyCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status,
              discrepancies: c.discrepancies.map((d) => ({
                ...d,
                status: status === 'RESOLVED' ? 'RESOLVED' : d.status,
              })),
            }
          : c
      )
    );
    addAuditEvent('DECISION_RECORDED', 'ScrutinyCase', caseId, officerEmail, 'SCRUTINY');
  };

  const updateClearanceGate = (
    requestId: string,
    gateNumber: number,
    status: GateStatus,
    officerName: string,
    holdReason?: string
  ) => {
    setReleaseRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const updatedGates = req.gates.map((g) => {
          if (g.number === gateNumber) {
            return {
              ...g,
              status,
              officerName,
              holdReason: status === 'CLEARED' ? undefined : holdReason || g.holdReason,
              updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              isSequentiallyBlocked: false,
            };
          }
          // If gate 4 is cleared, unblock gate 5
          if (gateNumber === 4 && status === 'CLEARED' && g.number === 5) {
            return {
              ...g,
              isSequentiallyBlocked: false,
              status: g.status === 'NOT_STARTED' ? 'PENDING' : g.status,
            };
          }
          return g;
        });

        const allCleared = updatedGates.every((g) => g.status === 'CLEARED');
        const hasHold = updatedGates.some((g) => g.status === 'ON_HOLD');
        const hasRejected = updatedGates.some((g) => g.status === 'REJECTED');

        let overallStatus = req.overallStatus;
        if (allCleared) {
          overallStatus = 'PENDING_APPROVAL';
        } else if (hasRejected) {
          overallStatus = 'BLOCKED';
        } else if (hasHold) {
          overallStatus = 'BLOCKED';
        }

        return {
          ...req,
          gates: updatedGates,
          overallStatus,
        };
      })
    );

    addAuditEvent(
      status === 'CLEARED' ? 'GATE_CLEARED' : 'GATE_HELD',
      'ClearanceGate',
      `${requestId}-G${gateNumber}`,
      'meena.agarwal@aicte.gov.in',
      'CLEARANCE'
    );
  };

  const issueSanctionOrder = (requestId: string, approverName: string) => {
    setReleaseRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, overallStatus: 'APPROVED' } : r))
    );
    addAuditEvent('RELEASE_APPROVED', 'ReleaseRequest', requestId, 'dr.iyer@aicte.gov.in', 'EXECUTIVE');
  };

  const verifyAuditIntegrity = () => {
    const rootHash = auditEvents[0]?.eventHash || '3f9ad1b2c4e5...';
    return {
      isValid: true,
      count: auditEvents.length,
      rootHash,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  };

  const resetAllData = () => {
    setInstruments(initialInstruments);
    setScrutinyCases(initialScrutinyCases);
    setReleaseRequests(initialReleaseRequests);
    setAuditEvents(initialAuditEvents);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}instruments`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}scrutinyCases`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}releaseRequests`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}auditEvents`);
  };

  return (
    <PortalDataContext.Provider
      value={{
        instruments,
        scrutinyCases,
        releaseRequests,
        auditEvents,
        selectedInstitution,
        setSelectedInstitution,
        addInstrument,
        updateScrutinyCase,
        assignScrutinyCase,
        recordScrutinyDecision,
        updateClearanceGate,
        issueSanctionOrder,
        verifyAuditIntegrity,
        resetAllData,
        addAuditEvent,
      }}
    >
      {children}
    </PortalDataContext.Provider>
  );
};

export const usePortalData = (): PortalDataContextType => {
  const context = useContext(PortalDataContext);
  if (!context) {
    throw new Error('usePortalData must be used within a PortalDataProvider');
  }
  return context;
};
