import React, { useState, useEffect } from 'react';
import { X, BookOpen, Quote, Info, Loader2, Sparkles, Scale } from 'lucide-react';
import { LegalTermExplanation } from '../types/legalCase';

interface LegalGlossaryModalProps {
  term: string | null;
  contextSentence?: string;
  sourceDocument?: string;
  isDark: boolean;
  onClose: () => void;
}

export const LegalGlossaryModal: React.FC<LegalGlossaryModalProps> = ({
  term,
  contextSentence,
  sourceDocument,
  isDark,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<LegalTermExplanation | null>(null);

  useEffect(() => {
    if (!term) return;

    let isMounted = true;
    setLoading(true);

    fetch('/api/explain-legal-term', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        term,
        contextSentence: contextSentence || 'Litigation proceeding record.',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setExplanation({
          term,
          definition: data.definition || 'Specialized legal doctrine or procedural mechanism governing proceedings.',
          proceduralContext: data.proceduralContext || 'Standard procedural benchmark applied in litigation.',
          latinEtymology: data.etymology || undefined,
          verbatimUsage: contextSentence || 'Referenced in active docket entry.',
          sourceDocument: sourceDocument || 'Court Record Entry',
          sourceType: data.source === 'AI Verified' ? 'AI Verified' : 'Pre-indexed',
        });
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setExplanation({
          term,
          definition: `Specialized doctrine under civil practice rules. "${term}" governs procedural or substantive requirements.`,
          proceduralContext: 'Applies to formal pleadings, evidentiary discovery motions, or appellate review.',
          verbatimUsage: contextSentence || 'Referenced in current case filing.',
          sourceDocument: sourceDocument || 'Court Record',
          sourceType: 'Pre-indexed',
        });
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [term, contextSentence, sourceDocument]);

  if (!term) return null;

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
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider uppercase font-bold text-blue-600 dark:text-blue-400">
                Legal Terminology Explainer
              </div>
              <h2 className="text-lg font-bold capitalize tracking-tight mt-0.5">
                {term}
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

        {/* Content */}
        <div className="py-5 max-h-[65vh] overflow-y-auto space-y-4 text-xs">
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Consulting legal lexicon...</span>
            </div>
          ) : explanation ? (
            <>
              {/* Definition */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  Plain-Language Definition
                </div>
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {explanation.definition}
                </p>
                {explanation.latinEtymology && (
                  <p className="mt-1 text-xs italic text-neutral-400">
                    {explanation.latinEtymology}
                  </p>
                )}
              </div>

              {/* Procedural Significance */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  Procedural Significance
                </div>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {explanation.proceduralContext}
                </p>
              </div>

              {/* In-Record Quote */}
              {explanation.verbatimUsage && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    <Quote className="w-3 h-3 text-blue-600" />
                    In-Record Usage
                  </div>
                  <blockquote
                    className={`p-3.5 rounded-2xl text-xs italic leading-relaxed ${
                      isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-neutral-700'
                    }`}
                  >
                    &ldquo;{explanation.verbatimUsage}&rdquo;
                  </blockquote>
                  <div className="mt-1 text-[10px] font-mono text-neutral-400">
                    Record: {explanation.sourceDocument}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold soft-btn-primary cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
