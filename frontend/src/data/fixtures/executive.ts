export const kpis = {
  active: 1247,
  expiringSoon: 89,
  underScrutiny: 34,
  blocked: 7,
  releasedThisYear: 413,
  totalValueCr: 3247.2,
  avgProcessingDays: 4.2,
  pendingReleaseValueCr: 847.6,
};

export const regionStats = [
  { state: 'Maharashtra', institutions: 234, activeFDRs: 487, totalValueCr: 482.3, expiring30d: 23, openIssues: 3 },
  { state: 'Tamil Nadu', institutions: 198, activeFDRs: 391, totalValueCr: 367.1, expiring30d: 18, openIssues: 1 },
  { state: 'Karnataka', institutions: 176, activeFDRs: 334, totalValueCr: 289.4, expiring30d: 12, openIssues: 0 },
  { state: 'Uttar Pradesh', institutions: 289, activeFDRs: 521, totalValueCr: 501.8, expiring30d: 31, openIssues: 5 },
  { state: 'Rajasthan', institutions: 143, activeFDRs: 287, totalValueCr: 224.6, expiring30d: 9, openIssues: 0 },
  { state: 'Delhi', institutions: 67, activeFDRs: 134, totalValueCr: 201.6, expiring30d: 4, openIssues: 0 },
  { state: 'Telangana', institutions: 112, activeFDRs: 224, totalValueCr: 198.7, expiring30d: 8, openIssues: 0 },
  { state: 'Gujarat', institutions: 128, activeFDRs: 243, totalValueCr: 181.7, expiring30d: 7, openIssues: 0 },
];

export const monthlyData = [
  { month: 'Nov \'23', submitted: 78, released: 34 },
  { month: 'Dec \'23', submitted: 65, released: 28 },
  { month: 'Jan \'24', submitted: 112, released: 45 },
  { month: 'Feb \'24', submitted: 89, released: 38 },
  { month: 'Mar \'24', submitted: 134, released: 52 },
  { month: 'Apr \'24', submitted: 97, released: 41 },
  { month: 'May \'24', submitted: 103, released: 39 },
  { month: 'Jun \'24', submitted: 88, released: 35 },
  { month: 'Jul \'24', submitted: 92, released: 31 },
  { month: 'Aug \'24', submitted: 76, released: 28 },
  { month: 'Sep \'24', submitted: 115, released: 47 },
  { month: 'Oct \'24', submitted: 94, released: 36 },
];

export const interventionCases = [
  { id: 'REL-2024-011', institution: 'COEP Technological University', amount: 1850000, reason: 'All 5 clearance gates passed — Final Release Authority approval required', urgency: 'HIGH' },
  { id: 'REL-2024-008', institution: 'IIT Bombay Research Park', amount: 7500000, reason: 'Penalty waiver request — ₹75,000 (RULE-04 candidate). Requires executive sign-off.', urgency: 'MEDIUM' },
  { id: 'SCR-2024-082', institution: 'Amity University, Noida', amount: 4200000, reason: 'Vigilance hold override requested — VI-2024-029 inquiry closed by Vigilance dept.', urgency: 'MEDIUM' },
  { id: 'SCR-2024-079', institution: 'Lovely Professional University', amount: 3100000, reason: 'Bank verification failed 3 consecutive times — manual status check required', urgency: 'LOW' },
  { id: 'REL-2024-006', institution: 'XLRI Jamshedpur', amount: 2800000, reason: 'Co-ed to women college conversion — non-refund rule RULE-06 applicability review', urgency: 'LOW' },
];

export const processingStats = [
  { checkType: 'PDF Signature', total: 1842, passRate: 94.2, failRate: 3.1, unknownRate: 2.7, avgMs: 1240 },
  { checkType: 'QR Code Decode', total: 1842, passRate: 71.3, failRate: 12.4, unknownRate: 16.3, avgMs: 380 },
  { checkType: 'OCR Extraction', total: 1842, passRate: 88.6, failRate: 4.2, unknownRate: 7.2, avgMs: 3200 },
  { checkType: 'Bank Status [MOCK]', total: 1842, passRate: 81.4, failRate: 8.3, unknownRate: 10.3, avgMs: 1850 },
  { checkType: 'Image Heuristic', total: 1842, passRate: 68.2, failRate: 0, unknownRate: 31.8, avgMs: 2100 },
];
