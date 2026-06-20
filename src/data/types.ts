/**
 * Shared domain types. Mirrors MetacuraWeb/src/types/* and src/data/mockRecords.ts.
 */
export type RecordType =
  | 'Lab'
  | 'CT'
  | 'MRI'
  | 'Ultrasound'
  | 'Medication'
  | 'Voice'
  | 'Visit'
  | 'Prescription';

export type Flag = 'high' | 'low' | 'normal';

export type FlaggedValue = {
  label: string;
  value: string;
  unit?: string;
  flag: Flag;
  range?: string; // "Healthy range < 100"
  sourceLine: number; // line in the source document
};

export type MedicalRecord = {
  id: string;
  title: string;
  type: RecordType;
  source: string;
  date: string; // "Jan 14, 2025"
  summary: string;
  citedSources: number;
  values?: FlaggedValue[];
  findings?: string[];
};

// Source document = ordered lines, one of which is highlighted by the Source sheet.
export type SourceLineKind = 'title' | 'section' | 'meta' | 'value' | 'text';
export type SourceLine = {
  n: number;
  kind: SourceLineKind;
  text: string;
  flag?: Flag;
};
export type SourceDocument = {
  recordId: string;
  fileName: string;
  lines: SourceLine[];
};

export type ReportTier = 'summary' | 'insights' | 'opinion';
export type PaidTier = 'insights' | 'opinion';

export type ReportTierDef = {
  id: ReportTier;
  name: string;
  price: 0 | 2 | 4;
  priceLabel: string;
  tagline: string;
  features: string[];
  cta: string;
  badge?: string;
  featured?: boolean;
  clinical?: boolean;
};

export type Receipt = {
  id: string;
  title: string;
  date: string;
  plan: string;
  status: 'Paid' | 'Pending';
  amount: string;
};

export type ShareScope = 'all' | 'specific' | 'one_report';
export type ShareStatus = 'active' | 'expired' | 'revoked';
export type ShareLink = {
  id: string;
  label: string;
  scope: ShareScope;
  views: number;
  sharedAt: string;
  expiresAt: string;
  status: ShareStatus;
};

export type ProfileType =
  | 'myself'
  | 'my_child'
  | 'my_parent'
  | 'my_patient'
  | 'other';

export type Dependent = {
  id: string;
  name: string;
  mycareId: string;
  phone: string;
  records: number;
  focus: string;
  relationship: string;
  added: string;
  isPrimary: boolean;
};

// Sample detail content backing the Family member detail screen (32a).
// Mirrors the web DependentDashboard's managed-member overview.
export type DataCompositionItem = {
  label: string;
  value: string;
  unit: string;
  stat: string;
  tone: 'normal' | 'low' | 'high';
};

export type DelegatedAccess = {
  name: string;
  role: string;
  access: string;
  temporary: boolean;
  initials: string;
};

export type DependentDetail = {
  emergency: { bloodType: string; allergies: string; primaryContact: string };
  latestInsight: { date: string; text: string };
  dataComposition: DataCompositionItem[];
  delegatedAccess: DelegatedAccess[];
};
