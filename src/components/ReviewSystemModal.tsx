import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Edit3, Save, User, ShieldCheck, Quote } from 'lucide-react';
import { CaseEvent, ReviewStatus } from '../types/legalCase';

interface ReviewSystemModalProps {
  event: CaseEvent | null;
  isDark: boolean;
  onClose: () => void;
  onSaveEvent: (updatedEvent: CaseEvent) => void;
}

export const ReviewSystemModal: React.FC<ReviewSystemModalProps> = ({
  event,
  isDark,
  onClose,
  onSaveEvent,
}) => {
  if (!event) return null;

  const [title, setTitle] = useState(event.title);
  const [dateDisplay, setDateDisplay] = useState(event.dateDisplay);
  const [summary, setSummary] = useState(event.summary);
  const [status, setStatus] = useState<ReviewStatus>(event.reviewStatus || 'PENDING');
  const [verificationNote, setVerificationNote] = useState(event.verificationNote || '');
  const [verifiedBy, setVerifiedBy] = useState(event.verifiedBy || 'Reviewing Counsel');

  const handleSave = () => {
    onSaveEvent({
      ...event,
      title,
      dateDisplay,
      summary,
      reviewStatus: status,
      verificationNote,
      verifiedBy,
      verifiedAt: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl rounded-3xl p-6 sm:p-7 soft-transition ${
          isDark ? 'soft-card-dark text-white' : 'soft-card-light text-[#22252A]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider uppercase font-bold text-blue-600 dark:text-blue-400">
                Interactive Verification &amp; Review
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Review Event #{event.id}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="py-4 space-y-4 text-xs">
          {/* Status Segmented Buttons */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Verification Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('VERIFIED')}
                className={`py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 font-semibold text-xs cursor-pointer soft-transition ${
                  status === 'VERIFIED'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : isDark
                    ? 'soft-inset-dark text-neutral-400'
                    : 'soft-inset-light text-neutral-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('PENDING')}
                className={`py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 font-semibold text-xs cursor-pointer soft-transition ${
                  status === 'PENDING'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : isDark
                    ? 'soft-inset-dark text-neutral-400'
                    : 'soft-inset-light text-neutral-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pending</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('FLAGGED')}
                className={`py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 font-semibold text-xs cursor-pointer soft-transition ${
                  status === 'FLAGGED'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : isDark
                    ? 'soft-inset-dark text-neutral-400'
                    : 'soft-inset-light text-neutral-600'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Flagged</span>
              </button>
            </div>
          </div>

          {/* Title & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs outline-none ${
                  isDark ? 'soft-inset-dark text-white' : 'soft-inset-light text-black'
                }`}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                Date / Display Date
              </label>
              <input
                type="text"
                value={dateDisplay}
                onChange={(e) => setDateDisplay(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs outline-none ${
                  isDark ? 'soft-inset-dark text-white' : 'soft-inset-light text-black'
                }`}
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
              Event Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={`w-full p-2.5 rounded-xl text-xs outline-none leading-relaxed ${
                isDark ? 'soft-inset-dark text-white' : 'soft-inset-light text-black'
              }`}
            />
          </div>

          {/* Verification Notes */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
              Attorney Verification Notes / Flags
            </label>
            <input
              type="text"
              value={verificationNote}
              onChange={(e) => setVerificationNote(e.target.value)}
              placeholder="e.g. Verified against CM/ECF docket stamp. No service objection filed."
              className={`w-full px-3 py-2 rounded-xl text-xs outline-none ${
                isDark ? 'soft-inset-dark text-white' : 'soft-inset-light text-black'
              }`}
            />
          </div>

          {/* Verbatim Source Quote (Read-only reference) */}
          <div
            className={`p-3 rounded-2xl ${
              isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-neutral-700'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
              <Quote className="w-3 h-3 text-blue-600" />
              Source Citation (Non-Editable Ground Truth)
            </div>
            <p className="italic text-xs">&ldquo;{event.sourceSentence}&rdquo;</p>
            <div className="mt-1 text-[10px] font-mono text-neutral-400">
              Record: {event.sourceDocument}
            </div>
          </div>
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
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold soft-btn-primary flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Verification</span>
          </button>
        </div>
      </div>
    </div>
  );
};
