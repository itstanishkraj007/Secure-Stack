import { useState } from 'react';
import {
  Upload,
  CheckCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Loader2,
} from 'lucide-react';
import MockLabel from '../../components/ui/MockLabel';

export default function SubmitFDR() {
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  // Form Fields
  const [fdrNumber, setFdrNumber] = useState('FDR/HDFC/2024/008912');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [branch, setBranch] = useState('Shivajinagar Branch, Pune');
  const [amount, setAmount] = useState('2500000');
  const [issueDate, setIssueDate] = useState('2024-10-15');
  const [maturityDate, setMaturityDate] = useState('2027-10-15');
  const [holderName, setHolderName] = useState('Pune Institute of Technology');

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1200);
  };

  const handleSubmitCase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSubmittedSuccess(true);
    }, 1000);
  };

  if (submittedSuccess) {
    return (
      <div className="page-content max-w-3xl mx-auto py-10">
        <div className="card p-8 text-center space-y-4 border-t-4 border-t-green-600">
          <div className="w-14 h-14 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200">
            <CheckCircle size={32} />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Instrument Successfully Registered & Queued for Scrutiny
          </h2>

          <div className="bg-gray-50 border border-[#E2E8F0] rounded p-4 text-left space-y-2 max-w-lg mx-auto text-xs font-mono">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">Scrutiny Case ID:</span>
              <strong className="text-gray-900">SCR-2024-092</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">Document SHA-256:</span>
              <span className="text-gray-700 truncate max-w-[240px]">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500 font-sans">FDR Number:</span>
              <span className="text-gray-900 font-bold">{fdrNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-sans">Assigned Desk:</span>
              <span className="text-blue-700 font-sans font-semibold">Western Regional Office (WRO) Pune</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 max-w-md mx-auto">
            An automated audit event was recorded with cryptographic hash linking. Regional scrutiny officer will verify
            digital signature and bank status before final lifecycle activation.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <a href="/scrutiny/cases/SCR-2024-089" className="btn-primary">
              View Scrutiny Pipeline
            </a>
            <a href="/institution/dashboard" className="btn-secondary">
              Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content max-w-4xl mx-auto space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">
            Submit Fixed Deposit Receipt (FDR) / Security Instrument
          </h1>
          <p className="text-xs text-gray-500">
            AICTE Security Deposit Portal • Automatic OCR extraction & multi-source verification
          </p>
        </div>
        <div className="text-xxs font-mono text-gray-500 bg-white border border-[#E2E8F0] px-2 py-1 rounded">
          REGULATION CLAUSE 1.4 APH
        </div>
      </div>

      <MockLabel text="All OCR extraction pipelines run with sandboxed Tesseract & PyMuPDF workers." />

      {/* Progress Step Bar */}
      <div className="card p-3">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Upload & Pre-Flight' },
            { num: 2, label: 'OCR Extraction Review' },
            { num: 3, label: 'Supporting Documents' },
            { num: 4, label: 'Consent & Confirmation' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? 'bg-[#003366] text-white'
                    : step > s.num
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  step === s.num ? 'text-[#003366] font-bold' : 'text-gray-500'
                }`}
              >
                {s.label}
              </span>
              {s.num < 4 && <div className="w-8 h-px bg-gray-300 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Upload */}
      {step === 1 && (
        <div className="card p-6 space-y-4">
          <div className="border-2 border-dashed border-[#E2E8F0] hover:border-[#003366] rounded-lg p-8 text-center bg-gray-50/50 transition-colors">
            <Upload size={36} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-sm font-semibold text-gray-900">Upload Original Bank FDR Document (PDF)</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Supports digitally signed PDF or scanned bank receipts up to 25 MB. Sha-256 hash calculated at ingress.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleSimulateUpload}
                disabled={isProcessing}
                className="btn-primary"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Analyzing Document via Tesseract OCR...</span>
                  </>
                ) : (
                  <>
                    <FileText size={14} />
                    <span>Select Synthetic FDR Sample (HDFC_FDR_2024.pdf)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="info-box">
            <strong>Mandatory Requirements:</strong> FDR must explicitly state joint lien in favor of{' '}
            <em>"Regional Officer, AICTE Western Regional Office, Mumbai"</em> with minimum tenure of 8 years.
          </div>
        </div>
      )}

      {/* STEP 2: OCR Extraction Review */}
      {step === 2 && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#B7791F]" />
                <h3 className="section-title">Automated Field Extraction (Human-in-the-Loop)</h3>
              </div>
              <p className="text-xxs text-gray-500">
                Extracted via Tesseract v5.3 + PyMuPDF • Review confidence values before submitting
              </p>
            </div>
            <span className="text-xxs font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
              9/9 FIELDS LOCATED (AVG CONFIDENCE 93%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="field-label">FDR Instrument Number</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={fdrNumber}
                  onChange={(e) => setFdrNumber(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs font-mono font-bold"
                />
                <span className="text-xxs text-green-700 font-bold bg-green-50 px-1.5 py-1 rounded border border-green-200">
                  98%
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Bank Name</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs font-semibold"
                />
                <span className="text-xxs text-green-700 font-bold bg-green-50 px-1.5 py-1 rounded border border-green-200">
                  96%
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Bank IFSC Code</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs font-mono"
                />
                <span className="text-xxs text-green-700 font-bold bg-green-50 px-1.5 py-1 rounded border border-green-200">
                  95%
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Branch Details</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs"
                />
                <span className="text-xxs text-green-700 font-bold bg-green-50 px-1.5 py-1 rounded border border-green-200">
                  91%
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Principal Amount (₹ INR)</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-300 rounded px-3 py-1.5 text-xs font-mono font-bold text-gray-900"
                />
                <span className="text-xxs text-amber-700 font-bold bg-amber-50 px-1.5 py-1 rounded border border-amber-200">
                  74% Confirmed
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Holder / Beneficiary Name</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs font-medium"
                />
                <span className="text-xxs text-green-700 font-bold bg-green-50 px-1.5 py-1 rounded border border-green-200">
                  88%
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Issue Date</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs mt-1"
              />
            </div>

            <div>
              <label className="field-label">Maturity Date (Calculated Tenure: 3 Years)</label>
              <input
                type="date"
                value={maturityDate}
                onChange={(e) => setMaturityDate(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs mt-1"
              />
            </div>
          </div>

          <div className="flex justify-between pt-3 border-t border-[#E2E8F0]">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary">
              <ArrowLeft size={14} /> Back
            </button>
            <button type="button" onClick={() => setStep(3)} className="btn-primary">
              Continue to Supporting Documents <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Supporting Docs */}
      {step === 3 && (
        <div className="card p-5 space-y-4">
          <h3 className="section-title">Supporting Documents & Affidavit Checklist</h3>
          <p className="text-xs text-gray-500">
            Per Chapter 1 of AICTE Approval Process Handbook (APH), attach notarized documents.
          </p>

          <div className="space-y-2.5">
            {[
              { title: 'Board Resolution for FDR Pledge / Lien', req: 'Mandatory', file: 'Board_Resolution_Pledge_2024.pdf' },
              { title: 'Institution Affidavit on ₹100 Stamp Paper', req: 'Mandatory', file: 'Notarized_Affidavit_FDR.pdf' },
              { title: 'Chartered Accountant Net-Worth Certificate', req: 'Mandatory (Tier 1)', file: 'CA_Certificate_FY24.pdf' },
              { title: 'Bank Joint Lien Endorsement Letter', req: 'Mandatory', file: 'HDFC_Joint_Lien_Letter.pdf' },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-[#E2E8F0] rounded">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={16} className="text-green-600" />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{doc.title}</div>
                    <div className="text-xxs text-gray-500 font-mono">{doc.file} (SHA-256 Verified)</div>
                  </div>
                </div>
                <span className="text-xxs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">
                  ATTACHED
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-3 border-t border-[#E2E8F0]">
            <button type="button" onClick={() => setStep(2)} className="btn-secondary">
              <ArrowLeft size={14} /> Back
            </button>
            <button type="button" onClick={() => setStep(4)} className="btn-primary">
              Review & Sign Consent <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Submit */}
      {step === 4 && (
        <div className="card p-5 space-y-4">
          <h3 className="section-title">Final Review & Account Aggregator Consent</h3>

          <div className="bg-gray-50 border border-[#E2E8F0] rounded p-4 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500">Institution:</span>{' '}
                <strong>Pune Institute of Technology</strong>
              </div>
              <div>
                <span className="text-gray-500">Principal Deposit:</span>{' '}
                <strong className="text-gray-900 font-mono">₹25,00,000</strong>
              </div>
              <div>
                <span className="text-gray-500">FDR Number:</span>{' '}
                <strong className="font-mono">{fdrNumber}</strong>
              </div>
              <div>
                <span className="text-gray-500">Bank:</span>{' '}
                <strong>{bankName} ({ifsc})</strong>
              </div>
              <div>
                <span className="text-gray-500">Tenure:</span>{' '}
                <span>15 Oct 2024 to 15 Oct 2027 (3 Years)</span>
              </div>
              <div>
                <span className="text-gray-500">Lien Designation:</span>{' '}
                <span className="text-blue-700 font-semibold">AICTE Joint RO Lien</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs space-y-1">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <Shield size={14} />
              Consent Declaration (DPDP Act 2023 & RBI Account Aggregator Framework)
            </div>
            <p className="text-blue-800 text-xxs">
              By submitting this instrument, Pune Institute of Technology authorizes AICTE to verify the encumbrance,
              lien, and balance status periodically via authorized Account Aggregator & Banking APIs for regulatory compliance.
            </p>
          </div>

          <div className="flex justify-between pt-3 border-t border-[#E2E8F0]">
            <button type="button" onClick={() => setStep(3)} className="btn-secondary">
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              onClick={handleSubmitCase}
              disabled={isProcessing}
              className="btn-primary"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Recording Audit Hash & Case...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={14} />
                  <span>Final Submit for Scrutiny</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
