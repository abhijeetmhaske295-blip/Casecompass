/**
 * CaseCompass: Legal Case Timeline & Action Organizer
 * Core Data Models matching Kotlin Jetpack Compose Domain Types
 */

export type EventType = 
  | 'FILING'
  | 'ORDER'
  | 'HEARING'
  | 'DISCOVERY'
  | 'COMMUNICATION'
  | 'DEADLINE';

export type GapSeverity = 'CRITICAL' | 'MODERATE' | 'LOW';

export type ReviewStatus = 'VERIFIED' | 'PENDING' | 'FLAGGED';

export interface DateConflict {
  primaryDate: string;
  primarySource: string;
  primarySentence: string;
  conflictingDate: string;
  conflictingSource: string;
  conflictingSentence: string;
  conflictDescription: string;
}

export interface CaseEvent {
  id: string;
  date: string;
  dateDisplay: string;
  isDateConfident: boolean;
  unconfidentReason?: string;
  title: string;
  summary: string;
  eventType: EventType;
  sourceDocument: string;
  sourceSentence: string;
  hasConflict: boolean;
  conflictDetails?: DateConflict;
  legalTerms: string[];
  reviewStatus: ReviewStatus;
  verificationNote?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface LegalGap {
  id: string;
  title: string;
  referencedDocument: string;
  description: string;
  severity: GapSeverity;
  sourceSentence: string;
  discoveredInDocument: string;
  isResolved?: boolean;
}

export interface ExplicitDeadline {
  id: string;
  dueDate: string;
  dueDateDisplay: string;
  title: string;
  obligatedParty: string;
  sourceSentence: string;
  sourceDocument: string;
  statutoryBasis?: string;
  isCourtMandated: boolean;
  isCompleted?: boolean;
}

export interface LegalTermExplanation {
  term: string;
  definition: string;
  proceduralContext: string;
  latinEtymology?: string;
  verbatimUsage: string;
  sourceDocument: string;
  sourceType: 'Pre-indexed' | 'AI Verified';
}

export interface SourceDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  pageCount?: number;
  content: string;
}

export interface LegalCaseData {
  id: string;
  caseNumber: string;
  caseTitle: string;
  courtJurisdiction: string;
  presidingJudge: string;
  caseType: string;
  filingDate: string;
  documents: SourceDocument[];
  events: CaseEvent[];
  gaps: LegalGap[];
  explicitDeadlines: ExplicitDeadline[];
  rawText: string;
}

export type TimelineFilter = 
  | 'ALL' 
  | 'CONFLICTS' 
  | 'DEADLINES' 
  | 'GAPS' 
  | 'VERIFIED' 
  | 'PENDING' 
  | 'FLAGGED'
  | 'ANALYTICS';
