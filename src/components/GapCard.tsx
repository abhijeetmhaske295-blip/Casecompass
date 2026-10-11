import React from 'react';
import { AlertCircle, FileQuestion, Quote } from 'lucide-react';
import { LegalGap } from '../types/legalCase';

interface GapCardProps {
  gap: LegalGap;
  isDark: boolean;
}

export const GapCard: React.FC<GapCardProps> = ({ gap, isDark }) => {
  return (
    <div
      className={`p-5 rounded-2xl soft-transition ${
        isDark ? 'soft-card-dark' : 'soft-card-light'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {gap.severity} Procedural Gap
        </span>
        <span className="text-[11px] font-mono text-neutral-400">
          Omitted Record
        </span>
      </div>

      <h4
        className={`text-base font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-[#22252A]'
        }`}
      >
        {gap.title}
      </h4>

      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
        {gap.description}
      </p>

      <div className="mt-2.5 text-xs flex items-center gap-2 text-neutral-400">
        <FileQuestion className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Missing Target Document:</span>
        <strong className={isDark ? 'text-neutral-200' : 'text-[#22252A]'}>
          {gap.referencedDocument}
        </strong>
      </div>

      <div className="mt-3.5 pt-3 border-t border-neutral-200/60 dark:border-neutral-800">
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
          <Quote className="w-3 h-3 text-blue-600" />
          Referencing Sentence In Docket
        </div>
        <p
          className={`p-3 rounded-xl text-xs italic leading-relaxed ${
            isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-neutral-700'
          }`}
        >
          &ldquo;{gap.sourceSentence}&rdquo;
        </p>
        <div className="mt-1 text-[10px] font-mono text-neutral-400">
          Discovered in: {gap.discoveredInDocument}
        </div>
      </div>
    </div>
  );
};
