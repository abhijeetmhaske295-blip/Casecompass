import React from 'react';
import { X, FileText, CheckCircle2, Search, ExternalLink, Bookmark } from 'lucide-react';
import { SourceDocument, CaseEvent } from '../types/legalCase';

interface DocumentSidePanelProps {
  documents: SourceDocument[];
  activeEvent: CaseEvent | null;
  rawText: string;
  isDark: boolean;
  onClose: () => void;
}

export const DocumentSidePanel: React.FC<DocumentSidePanelProps> = ({
  documents,
  activeEvent,
  rawText,
  isDark,
  onClose,
}) => {
  const [selectedDocId, setSelectedDocId] = React.useState<string>(
    documents[0]?.id || 'raw_docket'
  );

  const activeDoc = documents.find((d) => d.id === selectedDocId);
  const displayContent = activeDoc ? activeDoc.content : rawText;

  // Highlight search sentence
  const targetSentence = activeEvent?.sourceSentence || '';

  return (
    <aside
      className={`w-full lg:w-96 rounded-3xl p-5 flex flex-col shrink-0 soft-transition ${
        isDark ? 'soft-card-dark text-white' : 'soft-card-light text-[#22252A]'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-tight">Source Document Viewer</h3>
            <span className="text-[10px] text-neutral-400 font-mono">Side-by-Side Context Verification</span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close document viewer"
          className="p-1 rounded-full text-neutral-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Document Selector Pills */}
      <div className="py-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-semibold">
        <button
          onClick={() => setSelectedDocId('raw_docket')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer soft-transition ${
            selectedDocId === 'raw_docket'
              ? 'bg-blue-600 text-white shadow-xs'
              : isDark
              ? 'bg-neutral-800 text-neutral-300'
              : 'bg-neutral-200/60 text-neutral-600'
          }`}
        >
          Complete Docket Record
        </button>
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDocId(doc.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer truncate max-w-[150px] soft-transition ${
              selectedDocId === doc.id
                ? 'bg-blue-600 text-white shadow-xs'
                : isDark
                ? 'bg-neutral-800 text-neutral-300'
                : 'bg-neutral-200/60 text-neutral-600'
            }`}
          >
            {doc.name.split(' - ')[0]}
          </button>
        ))}
      </div>

      {/* Target Citation Highlight Banner */}
      {activeEvent && (
        <div
          className={`p-3 rounded-2xl mb-3 text-xs ${
            isDark ? 'soft-inset-dark text-blue-300' : 'soft-inset-light text-blue-900'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-blue-600 dark:text-blue-400 mb-1">
            <Bookmark className="w-3 h-3" />
            Active Timeline Event Reference
          </div>
          <div className="font-semibold text-xs leading-tight mb-1">
            {activeEvent.title} ({activeEvent.dateDisplay})
          </div>
          <p className="text-[11px] italic opacity-80 line-clamp-2">
            &ldquo;{activeEvent.sourceSentence}&rdquo;
          </p>
        </div>
      )}

      {/* Document Text Body */}
      <div
        className={`grow p-3.5 rounded-2xl overflow-y-auto max-h-[500px] text-xs font-mono leading-relaxed select-text ${
          isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-neutral-800'
        }`}
      >
        <pre className="whitespace-pre-wrap font-sans text-xs">
          {displayContent.split('\n').map((paragraph, idx) => {
            const isMatch = targetSentence && paragraph.toLowerCase().includes(targetSentence.toLowerCase().slice(0, 30));
            return (
              <p
                key={idx}
                className={`mb-2.5 p-1 rounded-lg transition-colors ${
                  isMatch
                    ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/40 font-medium'
                    : ''
                }`}
              >
                {paragraph}
              </p>
            );
          })}
        </pre>
      </div>

      <div className="pt-3 text-[10px] text-neutral-400 text-center font-mono">
        Strict Zero-Hallucination · Verbatim In-File Attribution
      </div>
    </aside>
  );
};
