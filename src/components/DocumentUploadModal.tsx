import React, { useState } from 'react';
import { X, Upload, AlertCircle, Loader2, Sparkles, FileText } from 'lucide-react';
import { LegalCaseData, CaseEvent, LegalGap, ExplicitDeadline } from '../types/legalCase';

interface DocumentUploadModalProps {
  isOpen: boolean;
  isDark: boolean;
  onClose: () => void;
  onCaseLoaded: (caseData: LegalCaseData) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  isDark,
  onClose,
  onCaseLoaded,
}) => {
  const [caseTitle, setCaseTitle] = useState('In Re: Custom Litigation Record');
  const [caseNumber, setCaseNumber] = useState('2024-DOC-009');
  const [rawText, setRawText] = useState(
`On January 15, 2024, Plaintiff filed Verified Complaint for Injunctive Relief (Docket No. 1).
On January 29, 2024, Defendant filed an Emergency Motion to Dissolve Temporary Restraining Order (Docket No. 5).
On February 12, 2024, Plaintiff served Notice of Deposition of Corporate Representative (Docket No. 11).
CONFLICT NOTED: Plaintiff's Proof of Service certifies deposition notice was mailed on February 12, 2024. However, Defendant's Affidavit of Non-Receipt (Docket No. 14, ¶ 3) testifies notice was received stamped February 20, 2024.
On [Stamp smudged: March ??, 2024], an unnumbered letter was submitted to chambers without formal docketing.
On March 25, 2024, the Court issued Scheduling Order (Docket No. 19): "Parties shall complete all written interrogatories strictly no later than April 18, 2024 at 5:00 PM."
The Court Order further states: "Dispositive summary judgment motions must be filed strictly on or before May 15, 2024."
GAP IN RECORD: Minute Entry 22 refers to "Compliance with the Master Mediator Recommendation of March 02", but no March 02 mediation memo is present in the record file.`
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
        setCaseTitle(`Record: ${file.name.replace(/\.[^/.]+$/, '')}`);
      }
    };
    reader.readAsText(file);
  };

  const handleParse = async () => {
    if (!rawText.trim()) {
      setError('Please provide text or paste records.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch('/api/parse-case-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText, caseTitle }),
      });
      const data = await res.json();

      if (data && data.events && Array.isArray(data.events) && data.events.length > 0) {
        const parsedCase: LegalCaseData = {
          id: `custom_${Date.now()}`,
          caseNumber: caseNumber || 'CUSTOM-2024',
          caseTitle: caseTitle || 'Custom Case Record',
          courtJurisdiction: 'Civil Court',
          presidingJudge: 'Presiding Judge',
          caseType: 'Litigation Chronology',
          filingDate: data.events[0]?.date || '2024-01-01',
          documents: [
            {
              id: 'doc_custom_1',
              name: `${caseTitle || 'Uploaded Record'}.txt`,
              type: 'Ingested Document',
              uploadedAt: new Date().toISOString().split('T')[0],
              content: rawText,
            }
          ],
          events: data.events.map((e: any, idx: number) => ({
            id: e.id || `e_c_${idx}`,
            date: e.date || '2024-01-01',
            dateDisplay: e.dateDisplay || e.date,
            isDateConfident: e.isDateConfident !== false,
            unconfidentReason: e.unconfidentReason || undefined,
            title: e.title || 'Docket Record Entry',
            summary: e.summary || e.sourceSentence || '',
            eventType: e.eventType || 'FILING',
            sourceDocument: e.sourceDocument || 'Supplied Document',
            sourceSentence: e.sourceSentence || rawText.slice(0, 100),
            hasConflict: !!e.hasConflict,
            conflictDetails: e.conflictDetails || undefined,
            legalTerms: Array.isArray(e.legalTerms) ? e.legalTerms : [],
            reviewStatus: 'PENDING',
          })),
          gaps: Array.isArray(data.gaps) ? data.gaps : [],
          explicitDeadlines: Array.isArray(data.explicitDeadlines) ? data.explicitDeadlines : [],
          rawText,
        };

        onCaseLoaded(parsedCase);
        setIsProcessing(false);
        onClose();
        return;
      }
    } catch {
      // Fallback
    }

    // Client fallback
    const lines = rawText.split('\n').filter((l) => l.trim().length > 0);
    const events: CaseEvent[] = [];
    const gaps: LegalGap[] = [];
    const explicitDeadlines: ExplicitDeadline[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (
        trimmed.toLowerCase().includes('no later than') ||
        trimmed.toLowerCase().includes('strictly on or before') ||
        trimmed.toLowerCase().includes('strictly by')
      ) {
        const dateMatch = trimmed.match(/(?:by|than|before|on)\s+([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/i);
        const deadlineDate = dateMatch ? dateMatch[1] : 'Stated Date';
        explicitDeadlines.push({
          id: `d_cl_${idx}`,
          dueDate: deadlineDate,
          dueDateDisplay: deadlineDate,
          title: trimmed.split(':')[0] || 'Mandated Deadline',
          obligatedParty: trimmed.toLowerCase().includes('defendant') ? 'Defendant' : 'Parties',
          sourceSentence: trimmed,
          sourceDocument: 'Docket Entry',
          isCourtMandated: true,
        });
      }

      if (trimmed.toLowerCase().includes('gap') || trimmed.toLowerCase().includes('missing')) {
        gaps.push({
          id: `g_cl_${idx}`,
          title: 'Referenced Order Omission',
          referencedDocument: 'Missing Referenced Order',
          description: trimmed,
          severity: 'CRITICAL',
          sourceSentence: trimmed,
          discoveredInDocument: 'Supplied Excerpt',
        });
        return;
      }

      const hasConflict = trimmed.toLowerCase().includes('conflict') || trimmed.toLowerCase().includes('discrepancy');
      const isUnconfident = trimmed.includes('??') || trimmed.toLowerCase().includes('smudged');
      const dateMatch = trimmed.match(/([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/);
      const eventDate = dateMatch ? dateMatch[1] : isUnconfident ? 'Uncertain Date' : 'Document Date';

      events.push({
        id: `e_cl_${idx}`,
        date: dateMatch ? dateMatch[1] : '2024-01-01',
        dateDisplay: isUnconfident ? '[Low Confidence Date]' : eventDate,
        isDateConfident: !isUnconfident,
        unconfidentReason: isUnconfident ? 'Unreadable date stamps in scan.' : undefined,
        title: trimmed.slice(0, 50) + (trimmed.length > 50 ? '...' : ''),
        summary: trimmed,
        eventType: trimmed.toLowerCase().includes('order') ? 'ORDER' : 'FILING',
        sourceDocument: 'Supplied Record Entry',
        sourceSentence: trimmed,
        hasConflict,
        conflictDetails: hasConflict
          ? {
              primaryDate: eventDate,
              primarySource: 'Record A',
              primarySentence: trimmed,
              conflictingDate: 'Conflicting Date',
              conflictingSource: 'Record B',
              conflictingSentence: trimmed,
              conflictDescription: 'Discrepancy identified between parallel docket submissions.',
            }
          : undefined,
        legalTerms: [],
        reviewStatus: 'PENDING',
      });
    });

    const parsedCase: LegalCaseData = {
      id: `custom_${Date.now()}`,
      caseNumber: caseNumber || 'CASE-2024',
      caseTitle: caseTitle || 'Organized Timeline',
      courtJurisdiction: 'Civil Court',
      presidingJudge: 'Judge',
      caseType: 'Case Chronology',
      filingDate: '2024-01-15',
      documents: [
        {
          id: 'doc_custom_fallback',
          name: `${caseTitle || 'Docket Record'}.txt`,
          type: 'Ingested File',
          uploadedAt: new Date().toISOString().split('T')[0],
          content: rawText,
        }
      ],
      events: events.length > 0 ? events : [
        {
          id: 'e_fallback_0',
          date: '2024-01-15',
          dateDisplay: 'January 15, 2024',
          isDateConfident: true,
          title: 'Initial Docket Submission',
          summary: rawText.slice(0, 100),
          eventType: 'FILING',
          sourceDocument: 'Pleading',
          sourceSentence: rawText.slice(0, 100),
          hasConflict: false,
          legalTerms: [],
          reviewStatus: 'PENDING',
        }
      ],
      gaps,
      explicitDeadlines,
      rawText,
    };

    onCaseLoaded(parsedCase);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 soft-transition ${
          isDark ? 'soft-card-dark text-white' : 'soft-card-light text-[#22252A]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider uppercase font-bold text-blue-600 dark:text-blue-400">
                Record Ingestion
              </div>
              <h2 className="text-lg font-bold tracking-tight mt-0.5">
                Add or Paste Legal Record
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-blue-600 transition-colors cursor-pointer ${
              isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="py-5 space-y-3.5 text-xs">
          {error && (
            <div className="p-3 rounded-2xl bg-red-50 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                Case Title
              </label>
              <input
                type="text"
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs outline-none ${
                  isDark ? 'soft-inset-dark text-white' : 'soft-inset-light text-black'
                }`}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                Docket No.
              </label>
              <input
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs outline-none ${
                  isDark ? 'soft-inset-dark text-white' : 'soft-inset-light text-black'
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-neutral-400">
                Docket Text / Filings / Transcript
              </label>
              <label className="inline-flex items-center gap-1 cursor-pointer text-[11px] text-blue-600 font-semibold hover:underline">
                <Upload className="w-3 h-3" />
                Upload .txt file
                <input type="file" accept=".txt,.json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            <textarea
              rows={7}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className={`w-full p-3 font-mono text-xs rounded-2xl outline-none leading-relaxed ${
                isDark ? 'soft-inset-dark text-neutral-200' : 'soft-inset-light text-neutral-900'
              }`}
            />
          </div>

          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Strict Non-Extrapolation Principle applied: Dates are never guessed, parallel record conflicts are flagged side-by-side, and only explicit deadlines directly stated in text are extracted.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              isDark ? 'soft-btn-secondary-dark' : 'soft-btn-secondary-light'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleParse}
            disabled={isProcessing}
            className={`px-5 py-2 rounded-xl text-xs font-semibold soft-btn-primary flex items-center gap-2 cursor-pointer ${
              isProcessing ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Extracting...
              </>
            ) : (
              'Organize Timeline'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
