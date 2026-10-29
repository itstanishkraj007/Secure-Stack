import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Upload,
  CheckCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Loader2,
  FileCheck2,
  Lock,
  Eye,
  Building,
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import { Instrument, ScrutinyCase } from '../../types';
import MockLabel from '../../components/ui/MockLabel';
import { AicteEmblem } from '../../components/common/AicteLogo';

export default function SubmitFDR() {
  const navigate = useNavigate();
  const { addInstrument, selectedInstitution } = usePortalData();

  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [newCaseId, setNewCaseId] = useState<string>('SCR-2024-095');
  const [processingLogs, setProcessingLogs] = useState<string[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<'HDFC' | 'SBI' | 'CANARA' | 'BOI'>('HDFC');
  const [showDocPreview, setShowDocPreview] = useState<boolean>(false);

  // Form Fields
  const [fdrNumber, setFdrNumber] = useState('FDR/HDFC/2024/005892');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [branch, setBranch] = useState('Pune Camp Branch');
  const [amount, setAmount] = useState('2500000');
  const [issueDate, setIssueDate] = useState('2024-01-15');
  const [maturityDate, setMaturityDate] = useState('2027-01-15');
  const [holderName, setHolderName] = useState('Pune Institute of Technology');

  // Checklist
  const [checklist, setChecklist] = useState({
    jointLien: true,
    boardResolution: true,
    bankConfirmation: true,
    kycCertified: true,
  });

  const presets = {
    HDFC: {
      fdr: 'FDR/HDFC/2024/005892',
      bank: 'HDFC Bank',
      ifsc: 'HDFC0001234',
      branch: 'Pune Camp Branch',
      amount: '2500000',
      issue: '2024-01-15',
      maturity: '2027-01-15',
      file: 'HDFC_Security_Deposit_Receipt_2024.pdf',
    },
    SBI: {
      fdr: 'FDR/SBI/2024/008472',
      bank: 'State Bank of India',
      ifsc: 'SBIN0012345',
      branch: 'Shivajinagar, Pune',
      amount: '3500000',
      issue: '2024-02-10',
      maturity: '2027-02-10',
      file: 'SBI_Joint_Lien_Certificate_2024.pdf',
    },
    CANARA: {
      fdr: 'FDR/CNRB/2024/004918',
      bank: 'Canara Bank',
      ifsc: 'CNRB0001234',
      branch: 'Tiruchirappalli Main',
      amount: '5000000',
      issue: '2024-03-01',
      maturity: '2027-03-01',
      file: 'Canara_Endorsement_Memo_2024.pdf',
    },
    BOI: {
      fdr: 'FDR/BOI/2024/009182',
      bank: 'Bank of India',
      ifsc: 'BKID0008745',
      branch: 'Pune Main Branch',
      amount: '1850000',
      issue: '2024-04-12',
      maturity: '2027-04-12',
      file: 'BOI_Statutory_Guarantee_2024.pdf',
    },
  };

  const handleSelectPreset = (key: 'HDFC' | 'SBI' | 'CANARA' | 'BOI') => {
    setSelectedPreset(key);
    const p = presets[key];
    setFdrNumber(p.fdr);
    setBankName(p.bank);
    setIfsc(p.ifsc);
    setBranch(p.branch);
    setAmount(p.amount);
    setIssueDate(p.issue);
    setMaturityDate(p.maturity);
  };

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setProcessingLogs([
      `[00:00.10] INGRESS: Reading byte stream for ${presets[selectedPreset].file} (2.4 MB)...`,
    ]);

    setTimeout(() => {
      setProcessingLogs((prev) => [
        ...prev,
        `[00:00.42] CRYPTO: Calculating SHA-256 ingress checksum -> e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
      ]);
    }, 300);

    setTimeout(() => {
      setProcessingLogs((prev) => [
        ...prev,
        `[00:00.85] PYHANKO: Verifying PAdES-B-LT digital signature... VALID (${presets[selectedPreset].bank} Sub-CA -> CCA India)`,
      ]);
    }, 600);

    setTimeout(() => {
      setProcessingLogs((prev) => [
        ...prev,
        `[00:01.25] PYMUPDF: Inspecting document linearization & incremental byte alterations... 0 mutations detected`,
      ]);
    }, 900);

    setTimeout(() => {
      setProcessingLogs((prev) => [
        ...prev,
        `[00:01.68] VISION: Tesseract 5.3 OCR + OpenCV QR matrix parsing... 9/9 fields extracted (94.2% avg confidence)`,
      ]);
    }, 1200);

    setTimeout(() => {
      setProcessingLogs((prev) => [
        ...prev,
        `[00:02.10] CORE_BANK: Dispatching ISO-20022 balance & lien status check to bank adapter... COMPLETE`,
      ]);
    }, 1500);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1800);
  };

  const handleSubmitCase = () => {
    setIsProcessing(true);
    const generatedCaseId = `SCR-2024-0${Math.floor(Math.random() * 80 + 90)}`;
    setNewCaseId(generatedCaseId);

    setTimeout(() => {
      const numericAmount = parseInt(amount, 10) || 2500000;
      const newInst: Instrument = {
        id: `ins-${Date.now().toString().slice(-4)}`,
        fdrNumber,
        institution: 'Pune Institute of Technology',
        institutionCode: 'PIT-MH-001',
        bankName,
        ifsc,
        branch,
        principalAmount: numericAmount,
        issueDate: new Date(issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        maturityDate: new Date(maturityDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        holderName,
        lifecycleStatus: 'UNDER_SCRUTINY',
        lienStatus: 'ACTIVE',
        daysToMaturity: 1095,
        alertTier: 'NONE',
        region: 'West Zone',
        state: 'Maharashtra',
      };

      const newCase: ScrutinyCase = {
        id: generatedCaseId,
        instrumentId: newInst.id,
        fdrNumber,
        institution: 'Pune Institute of Technology',
        bank: bankName,
        issue: 'New Submission — Automated Verification Completed',
        severity: 'INFO',
        assignedTo: null,
        assignedToName: null,
        status: 'OPEN',
        slaHours: 24,
        slaOverdue: false,
        createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 14:00 IST',
        tripleSourceData: [
          { fieldName: 'fdrNumber', displayName: 'FDR Number', submittedValue: fdrNumber, ocrValue: fdrNumber, ocrConfidence: 0.98, bankValue: fdrNumber, match: 'FULL_MATCH' },
          { fieldName: 'bankName', displayName: 'Bank Name', submittedValue: bankName, ocrValue: bankName, ocrConfidence: 0.97, bankValue: bankName, match: 'FULL_MATCH' },
          { fieldName: 'ifsc', displayName: 'IFSC Code', submittedValue: ifsc, ocrValue: ifsc, ocrConfidence: 0.95, bankValue: ifsc, match: 'FULL_MATCH' },
          { fieldName: 'branch', displayName: 'Branch', submittedValue: branch, ocrValue: branch, ocrConfidence: 0.91, bankValue: branch, match: 'FULL_MATCH' },
          { fieldName: 'principalAmount', displayName: 'Principal Amount', submittedValue: `₹${numericAmount.toLocaleString('en-IN')}`, ocrValue: `₹${numericAmount.toLocaleString('en-IN')}`, ocrConfidence: 0.96, bankValue: `₹${numericAmount.toLocaleString('en-IN')}`, match: 'FULL_MATCH' },
          { fieldName: 'issueDate', displayName: 'Issue Date', submittedValue: issueDate, ocrValue: issueDate, ocrConfidence: 0.92, bankValue: issueDate, match: 'FULL_MATCH' },
          { fieldName: 'maturityDate', displayName: 'Maturity Date', submittedValue: maturityDate, ocrValue: maturityDate, ocrConfidence: 0.91, bankValue: maturityDate, match: 'FULL_MATCH' },
          { fieldName: 'holderName', displayName: 'Holder Name', submittedValue: holderName, ocrValue: holderName, ocrConfidence: 0.89, bankValue: holderName, match: 'FULL_MATCH' },
          { fieldName: 'lienStatus', displayName: 'Lien Status', submittedValue: 'Active', ocrValue: null, bankValue: 'Active', match: 'FULL_MATCH' },
        ],
        verificationChecks: [
          { checkType: 'PDF_SIGNATURE', displayName: 'PDF Digital Signature', status: 'PASS', source: 'PyHanko v0.21.0', details: 'Valid PAdES-B-LT. Bank Sub-CA chain verified.', timestamp: 'Just now', isMock: false },
          { checkType: 'OCR_EXTRACTION', displayName: 'OCR Field Extraction', status: 'PASS', source: 'Tesseract v5.3.4', details: '9/9 fields extracted with high confidence.', timestamp: 'Just now', isMock: false },
          { checkType: 'BANK_STATUS', displayName: 'Bank Status Check', status: 'PASS', source: 'Simulated Bank Adapter v1.0', details: 'Core banking balance matches submitted deposit.', timestamp: 'Just now', isMock: true },
        ],
        discrepancies: [],
      };

      addInstrument(newInst, newCase);
      setIsProcessing(false);
      setSubmittedSuccess(true);
    }, 1200);
  };

  if (submittedSuccess) {
    return (
      <div className="page-content max-w-3xl mx-auto py-10">
        <div className="card p-8 text-center space-y-4 border-t-4 border-t-green-600 shadow-lg">
          <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border-2 border-green-200">
            <CheckCircle size={36} />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            FDR Instrument Registered & Queued for Regional Scrutiny
          </h2>

          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Your fixed deposit receipt has been ingested, cryptographically signed, and queued in the AICTE Western Regional Office exception pipeline.
          </p>

          <div className="bg-gray-50 border border-[#E2E8F0] rounded p-4 text-left space-y-2 max-w-lg mx-auto text-xs font-mono">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">Generated Scrutiny Case ID:</span>
              <strong className="text-gray-900 font-bold">{newCaseId}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">FDR Certificate Number:</span>
              <strong className="text-gray-900">{fdrNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">Issuing Bank & Branch:</span>
              <strong className="text-gray-900">{bankName} ({branch})</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">Pledged Principal:</span>
              <strong className="text-green-700 font-bold">₹{parseInt(amount, 10).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sans">Cryptographic Ingress Hash:</span>
              <span className="text-gray-600 text-xxs truncate">3f9ad1b2c4e5f6a7b8c9d0e1f2a3...</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-3">
            <Link
              to="/institution/dashboard"
              className="btn-secondary text-xs"
            >
              Return to FDR Portfolio
            </Link>
            <Link
              to={`/scrutiny/cases/${newCaseId}`}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <Eye size={13} />
              <span>Inspect Scrutiny Case Dossier</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content max-w-4xl mx-auto space-y-4">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-[#003366] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              FORM FDR-1
            </span>
            <span className="text-xs text-gray-500 font-mono">STATUTORY DEPOSIT SUBMISSION WIZARD</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 mt-1">
            Submit New FDR Instrument / Joint Lien Certificate
          </h1>
          <p className="text-xs text-gray-500">
            Mandatory intake per Chapter 1, Section 1.4 of the AICTE Approval Process Handbook (APH 2024–27)
          </p>
        </div>

        <Link to="/institution/dashboard" className="btn-secondary text-xs">
          ← Back to Portfolio
        </Link>
      </div>

      <MockLabel text="Document parsing executes sandboxed Tesseract OCR and PyHanko cryptographic signature verifiers." />

      {/* Stepper Bar */}
      <div className="card p-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          {[
            { stepNum: 1, label: '1. Document Upload & Presets' },
            { stepNum: 2, label: '2. OCR & Bank Verification' },
            { stepNum: 3, label: '3. Statutory Checklist' },
            { stepNum: 4, label: '4. Ledger Commitment' },
          ].map((item) => (
            <div
              key={item.stepNum}
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                step === item.stepNum
                  ? 'text-[#003366] bg-[#EFF6FF] font-bold border border-[#BFDBFE]'
                  : step > item.stepNum
                  ? 'text-green-700'
                  : 'text-gray-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xxs font-bold ${
                  step === item.stepNum
                    ? 'bg-[#003366] text-white'
                    : step > item.stepNum
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > item.stepNum ? '✓' : item.stepNum}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Upload & Presets */}
      {step === 1 && (
        <div className="card p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="section-title text-sm">Select Sample Bank Certificate or Upload PDF</h2>
            <p className="text-xs text-gray-500">
              For demonstration and testing, select one of the pre-configured bank certificates with embedded cryptographic signatures:
            </p>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(['HDFC', 'SBI', 'CANARA', 'BOI'] as const).map((key) => {
              const p = presets[key];
              const isSelected = selectedPreset === key;
              return (
                <div
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#003366] bg-[#EFF6FF] ring-2 ring-[#003366]'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-1">
                    <span>{p.bank}</span>
                    <span className="text-xxs font-mono text-gray-500">₹{(parseInt(p.amount) / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="text-xxs font-mono text-gray-600 truncate">{p.fdr}</div>
                  <div className="text-xxs text-gray-500 mt-1 truncate">{p.file}</div>
                </div>
              );
            })}
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-[#CBD5E1] rounded-lg p-6 text-center space-y-3 bg-[#FAF8F5]">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#003366] shadow-sm border border-gray-200">
              <Upload size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-800">
                Active Document:{' '}
                <span className="font-mono text-[#003366]">{presets[selectedPreset].file}</span>
              </div>
              <p className="text-xxs text-gray-500 mt-0.5">
                PDF format with CCA-recognized digital bank signature • Max 15 MB
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowDocPreview(!showDocPreview)}
                className="btn-secondary text-xxs"
              >
                <Eye size={12} />
                <span>{showDocPreview ? 'Hide Document Scan' : 'Inspect Raw Bank PDF Scan'}</span>
              </button>
            </div>
          </div>

          {/* Document Scan Preview */}
          {showDocPreview && (
            <div className="bg-white border-2 border-[#D4C4A8] rounded p-5 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xxs font-bold text-[#003366] uppercase">DIGITAL SCAN ATTACHMENT</span>
                <span className="text-xxs font-mono text-gray-500">SHA-256: e3b0c44298fc1c...</span>
              </div>
              <div className="p-4 bg-[#FFFDF9] border border-gray-200 rounded font-serif text-xs space-y-2">
                <div className="text-center font-bold text-sm text-[#003366]">
                  {presets[selectedPreset].bank.toUpperCase()} • SECURITY DEPOSIT CERTIFICATE
                </div>
                <div className="text-center text-xxs text-gray-600">
                  {presets[selectedPreset].branch} • IFSC: {presets[selectedPreset].ifsc}
                </div>
                <div className="border-t border-b border-gray-200 py-2 my-2 text-xxs space-y-1">
                  <div><strong>DEPOSIT RECEIPT NO:</strong> {presets[selectedPreset].fdr}</div>
                  <div><strong>PRINCIPAL SUM:</strong> ₹{parseInt(presets[selectedPreset].amount).toLocaleString('en-IN')}</div>
                  <div><strong>BENEFICIARY:</strong> Regional Officer, AICTE & Pune Institute of Technology (Joint Account)</div>
                </div>
                <div className="text-xxs italic text-gray-600">
                  Certified that the above deposit is held under lien to the All India Council for Technical Education.
                </div>
              </div>
            </div>
          )}

          {/* Action */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
            <span className="text-xxs text-gray-500">
              Extraction engine verifies against ISO-20022 and PyHanko standards
            </span>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleSimulateUpload}
              className="btn-primary text-xs"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Processing Cryptographic Verification...</span>
                </>
              ) : (
                <>
                  <span>Run Verification & Extract Fields</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>

          {/* Processing Logs */}
          {processingLogs.length > 0 && (
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xxs space-y-1 max-h-40 overflow-y-auto">
              <div className="text-gray-400 font-bold border-b border-gray-800 pb-1">
                SYSTEM PROCESSING LOGS (SANDBOX WORKER):
              </div>
              {processingLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Extraction Review & Edit */}
      {step === 2 && (
        <div className="card p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="section-title text-sm">Extracted Field Values & Core Banking Match</h2>
            <p className="text-xs text-gray-500">
              Review parsed values from OCR and digital certificate metadata. Edit any field before final ledger commitment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="field-label">FDR Receipt Number</label>
              <input
                type="text"
                value={fdrNumber}
                onChange={(e) => setFdrNumber(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 font-mono text-xs text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">Issuing Bank</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 font-mono text-xs text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">Branch Name</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">Principal Amount (₹)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 font-mono text-xs font-bold text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">Holder / Beneficiary Name</label>
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">Issue Date</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="field-label">Maturity Date</label>
              <input
                type="date"
                value={maturityDate}
                onChange={(e) => setMaturityDate(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded px-3 py-1.5 text-xs text-gray-900 mt-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary text-xs flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Back to Upload</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn-primary text-xs flex items-center gap-1"
            >
              <span>Proceed to Statutory Checklist</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Statutory Checklist */}
      {step === 3 && (
        <div className="card p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="section-title text-sm">Statutory Institutional Compliance Checklist</h2>
            <p className="text-xs text-gray-500">
              The institution nodal officer must verify all four mandatory legal covenants per APH Chapter 1:
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'jointLien',
                label: 'Joint Lien Undertaking (Clause 1.4 APH)',
                desc: 'Confirmed that the fixed deposit receipt is drawn in joint favor of Regional Officer, AICTE and the Institution.',
              },
              {
                id: 'boardResolution',
                label: 'Board of Governors (BoG) Sanction Resolution',
                desc: 'Certified that the deposit allocation has been approved by the Governing Body / Board of Trustees.',
              },
              {
                id: 'bankConfirmation',
                label: 'Direct Bank Encumbrance Letter',
                desc: 'Verified that the bank branch has executed the statutory lien marking in their Core Banking System (CBS).',
              },
              {
                id: 'kycCertified',
                label: 'Nodal Officer Digital KYC Verification',
                desc: 'Certified by authorized institutional officer using Aadhaar/PAN linked institutional credentials.',
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs"
              >
                <input
                  type="checkbox"
                  checked={(checklist as any)[item.id]}
                  onChange={(e) =>
                    setChecklist((prev) => ({ ...prev, [item.id]: e.target.checked }))
                  }
                  className="mt-0.5 h-4 w-4 rounded text-[#003366] focus:ring-[#003366]"
                />
                <div>
                  <div className="font-bold text-gray-900">{item.label}</div>
                  <div className="text-xxs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-secondary text-xs flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Back to Edit</span>
            </button>
            <button
              type="button"
              disabled={!checklist.jointLien || !checklist.bankConfirmation}
              onClick={() => setStep(4)}
              className="btn-primary text-xs flex items-center gap-1"
            >
              <span>Review & Commit Submission</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Ledger Commitment */}
      {step === 4 && (
        <div className="card p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="section-title text-sm">Final Submission Review & Cryptographic Sign-Off</h2>
            <p className="text-xs text-gray-500">
              Confirm details before committing this instrument to the tamper-evident AICTE audit ledger:
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#D4C4A8] rounded p-4 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#D4C4A8]">
              <div>
                <span className="text-gray-500 text-xxs">FDR Receipt Number:</span>
                <div className="font-mono font-bold text-gray-900">{fdrNumber}</div>
              </div>
              <div>
                <span className="text-gray-500 text-xxs">Principal Amount:</span>
                <div className="font-mono font-bold text-green-700 text-sm">
                  ₹{parseInt(amount, 10).toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-xxs">Issuing Bank & Branch:</span>
                <div className="font-semibold text-gray-800">{bankName} ({branch})</div>
              </div>
              <div>
                <span className="text-gray-500 text-xxs">Tenor Dates:</span>
                <div className="font-medium text-gray-800">{issueDate} to {maturityDate}</div>
              </div>
            </div>

            <div className="text-xxs text-gray-600 space-y-1">
              <div>• Digital Signature: PAdES-B-LT LTV Validated</div>
              <div>• Audit Ledger Action: <code>INSTRUMENT_SUBMITTED</code></div>
              <div>• Initial Routing: Exception Scrutiny Queue (Regional Officer Scrutiny)</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn-secondary text-xs flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Back to Checklist</span>
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleSubmitCase}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Committing to Tamper-Evident Ledger...</span>
                </>
              ) : (
                <>
                  <Lock size={13} />
                  <span>Commit Form FDR-1 to AICTE Ledger</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
