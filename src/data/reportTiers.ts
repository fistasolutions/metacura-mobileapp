import { ReportTierDef } from './types';

export const REPORT_TIERS: ReportTierDef[] = [
  {
    id: 'summary',
    name: 'MyCare ID · Free Forever',
    price: 0,
    priceLabel: 'Free forever',
    tagline:
      'Create your MyCare ID. Upload any health document. See it on your timeline, in plain English. Your data, never trained on. Yours forever.',
    features: [
      'Up to 50 record inputs',
      'Health Summary Report',
      '30-day timeline view',
      'Secure encrypted storage',
      'PDF export',
    ],
    cta: 'Open Summary',
    badge: 'Start here',
  },
  {
    id: 'insights',
    name: 'MyCare ID + Insights',
    price: 2,
    priceLabel: '$2 per report',
    tagline:
      'A deeper read of your records. Flags, trends, source-linked answers to your questions. One-time, two dollars. No subscription.',
    features: [
      'Up to 75 record inputs',
      'Health Insights Report',
      'Full lifetime timeline',
      'Health insights & trend detection',
      '10 AI Voice & Text queries',
      'Source-linked answers',
      'PDF + FHIR R4 export',
    ],
    cta: 'Run Insights · $2',
    featured: true,
  },
  {
    id: 'opinion',
    name: 'Quiet Second Opinion',
    price: 4,
    priceLabel: '$4 per report',
    tagline:
      'Before a major medical decision, get a clinical-grade Second Opinion report. Reads across all your records. Source-linked logic. Private. Nobody knows you ran it.',
    features: [
      'Unlimited record inputs',
      'Clinical Second Opinion Report',
      'Full lifetime timeline',
      'Health insights & trend detection',
      '10 AI Voice & Text queries',
      'Source-linked answers',
      'Symptomatic history mapping',
      'Clinical reasoning logs',
      'PDF + FHIR R4 export',
      'Priority clinical support',
    ],
    cta: 'Run Second Opinion · $4',
    badge: 'Clinical Grade',
    clinical: true,
  },
];
