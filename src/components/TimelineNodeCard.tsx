import React from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Quote, 
  Split, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  FileSearch, 
  ExternalLink 
} from 'lucide-react';
import { CaseEvent } from '../types/legalCase';

interface TimelineNodeCardProps {
  event: CaseEvent;
  isFirst: boolean;
  isLast: boolean;
  isExpanded: boolean;
  isDark: boolean;
  onToggleExpand: () => void;
  onLegalTermClick: (term: string, context: string, sourceDoc: string) => void;
  onReviewClick: () => void;
  onViewInDocClick: () => void;
}

export const TimelineNodeCard: React.FC<TimelineNodeCardProps> = ({
  event,
  isFirst,
  isLast,
  isExpanded,
  isDark,
  onToggleExpand,
  onLegalTermClick,
  onReviewClick,
  onViewInDocClick,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return {
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />,
          label: 'Verified by Counsel',
          className: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
        };
      case 'FLAGGED':
        return {
          icon: <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />,
          label: 'Flagged for Review',
          className: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',
        };
      default:
        return {
          icon: <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />,
          label: 'Pending Review',
          className: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300',
        };
    }
  };

  const statusBadge = getStatusBadge(event.reviewStatus || 'PENDING');

  return (
    <div className="relative flex gap-3 sm:gap-5 group">
      {/* Date Column (Tabular Alignment) */}
      <div className="hidden sm:block w-32 shrink-0 text-right pt-2">
        <span
          className={`font-mono text-xs font-semibold tracking-tight ${
            event.hasConflict
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : !event.isDateConfident
              ? 'text-neutral-400 italic'
              : isDark
              ? 'text-neutral-300'
              : 'text-neutral-600'
          }`}
        >
          {event.dateDisplay.split(' [')[0]}
        </span>
        <div className="text-[10px] tracking-wider uppercase font-semibold text-neutral-400 mt-0.5">
          {event.eventType}
        </div>
      </div>

      {/* Connected Line + Node dot */}
      <div className="flex flex-col items-center shrink-0 w-6">
        <div
          className={`w-0.5 ${isFirst ? 'h-4 opacity-0' : 'h-4'} ${
            isDark ? 'bg-neutral-800' : 'bg-neutral-300'
          }`}
        />
        <div
          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
            event.hasConflict
              ? 'bg-blue-600 ring-4 ring-blue-500/20 text-white shadow-sm'
              : !event.isDateConfident
              ? 'bg-amber-500 ring-2 ring-amber-400/20'
              : isDark
              ? 'bg-neutral-600 ring-2 ring-neutral-700'
              : 'bg-neutral-300 ring-2 ring-white'
          }`}
        >
          {event.hasConflict && (
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </div>
        <div
          className={`w-0.5 grow ${isLast ? 'opacity-0 min-h-[16px]' : 'min-h-[24px]'} ${
            isDark ? 'bg-neutral-800' : 'bg-neutral-300'
          }`}
        />
      </div>

      {/* Main Event Card (Soft Elevated Surface) */}
      <div
        className={`grow mb-4 rounded-2xl p-4 sm:p-5 soft-transition ${
          isDark ? 'soft-card-dark' : 'soft-card-light'
        } ${
          event.hasConflict
            ? 'ring-2 ring-blue-500/40'
            : ''
        }`}
      >
        {/* Top Badges & Verification Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Review Status Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight flex items-center gap-1 ${statusBadge.className}`}
            >
              {statusBadge.icon}
              {statusBadge.label}
            </span>

            {/* Conflict Badge */}
            {event.hasConflict && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1">
                <Split className="w-3 h-3" />
                Date Conflict
              </span>
            )}

            {/* Low confidence badge */}
            {!event.isDateConfident && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-semibold tracking-wide uppercase">
                Low Confidence
              </span>
            )}
          </div>

          {/* Quick Review & View Document Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewInDocClick();
              }}
              title="View in original document"
              className="px-2.5 py-1 rounded-xl text-[11px] font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <FileSearch className="w-3 h-3" />
              <span className="hidden sm:inline">View in Doc</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onReviewClick();
              }}
              title="Review & Verify event"
              className="px-2.5 py-1 rounded-xl text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden sm:inline">Review</span>
            </button>
          </div>
        </div>

        {/* Card Header & Title */}
        <div
          onClick={onToggleExpand}
          className="cursor-pointer select-none"
        >
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-sm sm:text-base font-semibold tracking-tight ${
                isDark ? 'text-white' : 'text-[#22252A]'
              }`}
            >
              {event.title}
            </h3>

            <button
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              className="p-1 rounded-full text-neutral-400 hover:text-blue-600 transition-colors shrink-0"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          <p
            className={`mt-1.5 text-xs sm:text-[13px] leading-relaxed ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            {event.summary}
          </p>
        </div>

        {/* Attorney verification notes if present */}
        {event.verificationNote && (
          <div
            className={`mt-2.5 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
              isDark ? 'bg-neutral-900/60 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[11px]">
              <strong>Counsel Note:</strong> {event.verificationNote}
              {event.verifiedBy && <span className="opacity-70"> — {event.verifiedBy}</span>}
            </span>
          </div>
        )}

        {/* SIDE-BY-SIDE CONFLICT BOX (Soft Inset Surface) */}
        {event.hasConflict && event.conflictDetails && (
          <div
            className={`mt-3.5 p-3.5 rounded-xl ${
              isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-[#22252A]'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Side-by-Side Record Divergence
            </div>
            <p className="text-xs text-neutral-500 mb-2.5">
              {event.conflictDetails.conflictDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl ${isDark ? 'bg-neutral-900/60' : 'bg-white/80'} shadow-xs`}>
                <div className="font-mono font-bold text-[11px] text-blue-600 dark:text-blue-400">
                  Record A: {event.conflictDetails.primaryDate}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 truncate">
                  {event.conflictDetails.primarySource}
                </div>
                <p className="mt-1 text-[11px] italic text-neutral-400 line-clamp-2">
                  &ldquo;{event.conflictDetails.primarySentence}&rdquo;
                </p>
              </div>

              <div className={`p-2.5 rounded-xl ${isDark ? 'bg-neutral-900/60' : 'bg-white/80'} shadow-xs`}>
                <div className="font-mono font-bold text-[11px] text-blue-600 dark:text-blue-400">
                  Record B: {event.conflictDetails.conflictingDate}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 truncate">
                  {event.conflictDetails.conflictingSource}
                </div>
                <p className="mt-1 text-[11px] italic text-neutral-400 line-clamp-2">
                  &ldquo;{event.conflictDetails.conflictingSentence}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Expandable Section: Verbatim Source & Legal Terms */}
        {isExpanded && (
          <div className="mt-3.5 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 space-y-3 text-xs animate-in fade-in duration-150">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  <Quote className="w-3 h-3 text-blue-600" />
                  Verbatim Source Sentence
                </div>
                <button
                  onClick={onViewInDocClick}
                  className="text-blue-600 font-semibold text-[11px] hover:underline flex items-center gap-0.5"
                >
                  Jump to file position
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
              <blockquote
                className={`p-3 rounded-xl italic leading-relaxed ${
                  isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-neutral-700'
                }`}
              >
                &ldquo;{event.sourceSentence}&rdquo;
              </blockquote>
              <div className="mt-1 text-[10px] font-mono text-neutral-400">
                Record: {event.sourceDocument}
              </div>
            </div>

            {/* Legal Terms Pills */}
            {event.legalTerms.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-neutral-400 font-medium">Doctrines:</span>
                {event.legalTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => onLegalTermClick(term, event.sourceSentence, event.sourceDocument)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
