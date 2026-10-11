import React from 'react';
import { Calendar, Building, Quote, ShieldCheck } from 'lucide-react';
import { ExplicitDeadline } from '../types/legalCase';

interface DeadlineCardProps {
  deadline: ExplicitDeadline;
  isDark: boolean;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline, isDark }) => {
  return (
    <div
      className={`p-5 rounded-2xl soft-transition ${
        isDark ? 'soft-card-dark' : 'soft-card-light'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-mono font-bold tracking-tight shadow-sm">
            DUE: {deadline.dueDateDisplay}
          </span>
        </div>

        <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          Strict Non-Extrapolated
        </span>
      </div>

      <h4
        className={`text-base font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-[#22252A]'
        }`}
      >
        {deadline.title}
      </h4>

      <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
        <Building className="w-3.5 h-3.5 text-neutral-400" />
        <span>Obligated Party:</span>
        <strong className={isDark ? 'text-neutral-200' : 'text-[#22252A]'}>
          {deadline.obligatedParty}
        </strong>
      </div>

      {deadline.statutoryBasis && (
        <div className="mt-1 text-xs font-mono text-neutral-400">
          Governing Basis: {deadline.statutoryBasis}
        </div>
      )}

      {/* Verbatim Source Quote (Sunken Inset Surface) */}
      <div className="mt-3.5 pt-3 border-t border-neutral-200/60 dark:border-neutral-800">
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
          <Quote className="w-3 h-3 text-blue-600" />
          Verbatim Source Sentence In Court Record
        </div>
        <p
          className={`p-3 rounded-xl text-xs italic leading-relaxed ${
            isDark ? 'soft-inset-dark text-neutral-300' : 'soft-inset-light text-neutral-700'
          }`}
        >
          &ldquo;{deadline.sourceSentence}&rdquo;
        </p>
        <div className="mt-1 text-[10px] font-mono text-neutral-400">
          Record: {deadline.sourceDocument}
        </div>
      </div>
    </div>
  );
};
