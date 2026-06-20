import { Dependent, DependentDetail, Receipt, ShareLink } from './types';

export const CURRENT_USER = {
  fullName: 'Sarah Jenkins',
  mycareId: 'MC-7F3A-21',
  memberSince: 'Jan 2024',
  records: 24,
  initials: 'SJ',
};

export const PROFILE_STATS = [
  { value: '152', label: 'Total Records' },
  { value: '12', label: 'Clinics Connected' },
  { value: '4', label: 'MyCare IDs' },
  { value: '100%', label: 'Data Secured' },
  { value: '2', label: 'Active Shares' },
  { value: '$6', label: 'Lifetime Spend' },
];

export const DEPENDENTS: Dependent[] = [
  {
    id: 'p1',
    name: 'Sarah Jenkins',
    mycareId: 'MC-7F3A-21',
    phone: '+1 415 555 0132',
    records: 24,
    focus: 'General Wellness',
    relationship: 'Primary',
    added: 'Jan 2024',
    isPrimary: true,
  },
  {
    id: 'p2',
    name: 'Leo Jenkins',
    mycareId: 'MC-2B9C-04',
    phone: '+1 415 555 0132',
    records: 8,
    focus: 'Pediatric Care',
    relationship: 'Child',
    added: 'Mar 2024',
    isPrimary: false,
  },
  {
    id: 'p3',
    name: 'Margaret Jenkins',
    mycareId: 'MC-5E1D-77',
    phone: '+1 415 555 0190',
    records: 41,
    focus: 'Heart & Cardiovascular',
    relationship: 'Parent',
    added: 'Apr 2024',
    isPrimary: false,
  },
  {
    id: 'p4',
    name: 'Ravi Patel',
    mycareId: 'MC-9A3F-12',
    phone: '+1 415 555 0177',
    records: 0,
    focus: 'Chronic Condition',
    relationship: 'Patient',
    added: 'Jun 2024',
    isPrimary: false,
  },
];

// Sample managed-member overview shown on the Family member detail screen (32a).
export const DEPENDENT_DETAIL: DependentDetail = {
  emergency: {
    bloodType: 'O Positive',
    allergies: 'Penicillin',
    primaryContact: 'Sarah · Mother',
  },
  latestInsight: {
    date: 'Dec 10',
    text: 'Annual physical review · all metabolic markers are normal. The next required vaccination (DTaP) is due in 3 months based on current guidelines.',
  },
  dataComposition: [
    { label: 'Clinical Notes', value: '120', unit: 'docs', stat: 'Normal', tone: 'normal' },
    { label: 'Lab Results', value: '62', unit: 'panels', stat: 'Low', tone: 'low' },
    { label: 'Imaging', value: '12', unit: 'scans', stat: 'High', tone: 'high' },
    { label: 'Prescriptions', value: '45', unit: 'meds', stat: 'Normal', tone: 'normal' },
  ],
  delegatedAccess: [
    { name: 'William Davis', role: 'Co-Parent', access: 'Full Access', temporary: false, initials: 'WD' },
    { name: 'Lincoln High School', role: 'School Nurse', access: 'Temporary', temporary: true, initials: 'LH' },
  ],
};

export const RECEIPTS: Receipt[] = [
  { id: 'r1', title: 'Second Opinion Report', date: 'May 28, 2026', plan: 'Second Opinion', status: 'Paid', amount: '$4.00' },
  { id: 'r2', title: 'Insights Report', date: 'Apr 15, 2026', plan: 'Insights', status: 'Paid', amount: '$2.00' },
  { id: 'r3', title: 'Insights Report', date: 'Mar 02, 2026', plan: 'Insights', status: 'Paid', amount: '$2.00' },
  { id: 'r4', title: 'Second Opinion Report', date: 'Jan 19, 2026', plan: 'Second Opinion', status: 'Paid', amount: '$4.00' },
];

export const SHARE_LINKS: ShareLink[] = [
  { id: 's1', label: 'Dr. Sharma · Cardiology', scope: 'all', views: 3, sharedAt: 'Jun 02, 2026', expiresAt: 'Jun 09, 2026', status: 'active' },
  { id: 's2', label: 'City Radiology', scope: 'specific', views: 1, sharedAt: 'May 18, 2026', expiresAt: 'May 25, 2026', status: 'expired' },
  { id: 's3', label: 'Insurance review', scope: 'one_report', views: 0, sharedAt: 'Apr 30, 2026', expiresAt: 'May 30, 2026', status: 'revoked' },
];
