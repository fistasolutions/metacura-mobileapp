import { MedicalRecord, SourceDocument } from './types';

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'cmp',
    title: 'Comprehensive Metabolic Panel',
    type: 'Lab',
    source: 'Apollo Diagnostics',
    date: 'Jan 14, 2025',
    citedSources: 14,
    summary:
      'Your panel is mostly in range. LDL cholesterol is high at 142 mg/dL and vitamin D is low at 22 ng/mL. Everything else, including glucose and kidney markers, looks normal for you.',
    values: [
      { label: 'LDL Cholesterol', value: '142', unit: 'mg/dL', flag: 'high', range: 'Healthy range < 100', sourceLine: 4 },
      { label: 'Total Cholesterol', value: '214', unit: 'mg/dL', flag: 'high', range: 'Healthy range < 200', sourceLine: 5 },
      { label: 'HDL Cholesterol', value: '58', unit: 'mg/dL', flag: 'normal', range: 'Healthy range > 40', sourceLine: 6 },
      { label: 'Triglycerides', value: '130', unit: 'mg/dL', flag: 'normal', range: 'Healthy range < 150', sourceLine: 7 },
      { label: 'Vitamin D', value: '22', unit: 'ng/mL', flag: 'low', range: 'Healthy range 30 to 100', sourceLine: 8 },
      { label: 'Fasting Glucose', value: '92', unit: 'mg/dL', flag: 'normal', range: 'Healthy range 70 to 99', sourceLine: 9 },
    ],
  },
  {
    id: 'mri',
    title: 'MRI Lumbar Spine',
    type: 'MRI',
    source: 'City Radiology',
    date: 'Jan 18, 2025',
    citedSources: 6,
    summary:
      'Mild degenerative change at L4-L5 and L5-S1. Vertebral alignment is normal. No nerve compression. This is common and matches your reported lower-back stiffness.',
    findings: [
      'Vertebral alignment normal',
      'L4-L5 mild disc bulge',
      'L5-S1 disc desiccation',
      'No spinal canal stenosis',
    ],
  },
  {
    id: 'visit',
    title: 'Follow-up Consultation',
    type: 'Visit',
    source: 'Dr. Sharma',
    date: 'Jan 21, 2025',
    citedSources: 4,
    summary:
      'Plan from your follow-up: start dietary changes for elevated LDL, begin vitamin D 2000 IU daily, and a referral to physical therapy for your lower back.',
    findings: [
      'Elevated LDL, begin dietary plan',
      'Vitamin D, begin 2000 IU daily',
      'Physical therapy referral for lumbar spine',
    ],
  },
];

export const MOCK_SOURCE_DOCUMENTS: Record<string, SourceDocument> = {
  cmp: {
    recordId: 'cmp',
    fileName: 'CMP_Bloodwork.pdf',
    lines: [
      { n: 1, kind: 'title', text: 'Comprehensive Metabolic Panel' },
      { n: 2, kind: 'meta', text: 'Apollo Diagnostics · Collected Jan 14, 2025' },
      { n: 3, kind: 'section', text: 'Lipid Panel' },
      { n: 4, kind: 'value', text: 'LDL Cholesterol      142 mg/dL   (ref < 100)', flag: 'high' },
      { n: 5, kind: 'value', text: 'Total Cholesterol    214 mg/dL   (ref < 200)', flag: 'high' },
      { n: 6, kind: 'value', text: 'HDL Cholesterol       58 mg/dL   (ref > 40)', flag: 'normal' },
      { n: 7, kind: 'value', text: 'Triglycerides        130 mg/dL   (ref < 150)', flag: 'normal' },
      { n: 8, kind: 'value', text: 'Vitamin D             22 ng/mL   (ref 30-100)', flag: 'low' },
      { n: 9, kind: 'value', text: 'Fasting Glucose       92 mg/dL   (ref 70-99)', flag: 'normal' },
      { n: 10, kind: 'section', text: 'Notes' },
      { n: 11, kind: 'text', text: 'Reference ranges from your lab. Compared to your own history.' },
    ],
  },
  mri: {
    recordId: 'mri',
    fileName: 'MRI_Lumbar_Spine.pdf',
    lines: [
      { n: 1, kind: 'title', text: 'MRI Lumbar Spine, without contrast' },
      { n: 2, kind: 'meta', text: 'City Radiology · Jan 18, 2025' },
      { n: 3, kind: 'section', text: 'Findings' },
      { n: 4, kind: 'text', text: 'Vertebral alignment is normal.' },
      { n: 5, kind: 'text', text: 'L4-L5: mild disc bulge without canal stenosis.' },
      { n: 6, kind: 'text', text: 'L5-S1: disc desiccation, mild.' },
      { n: 7, kind: 'section', text: 'Impression' },
      { n: 8, kind: 'text', text: 'Mild degenerative change. No nerve compression.' },
    ],
  },
  visit: {
    recordId: 'visit',
    fileName: 'Visit_Note_Jan21.pdf',
    lines: [
      { n: 1, kind: 'title', text: 'Follow-up Consultation' },
      { n: 2, kind: 'meta', text: 'Dr. Sharma · Jan 21, 2025' },
      { n: 3, kind: 'section', text: 'Plan' },
      { n: 4, kind: 'text', text: '1. Elevated LDL, begin dietary plan.' },
      { n: 5, kind: 'text', text: '2. Vitamin D, begin 2000 IU daily.' },
      { n: 6, kind: 'text', text: '3. Physical therapy referral for lumbar spine.' },
    ],
  },
};
