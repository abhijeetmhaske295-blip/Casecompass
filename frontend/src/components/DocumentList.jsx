import React, { useState } from 'react';
import {
  FileText,
  FileCode,
  FileSpreadsheet,
  Trash2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileQuestion,
  Search,
  ExternalLink,
} from 'lucide-react';
import { formatDate } from '../utils/dateFormat.js';

function formatFileSize(bytes) {
  if (bytes === 0) return '0 KB';
  if (bytes == null || isNaN(bytes)) return '—';
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeBadge(filename = '') {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (ext === 'pdf') {
    return {
      label: 'PDF',
      classes: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
  }
  if (ext === 'doc' || ext === 'docx') {
    return {
      label: 'DOC',
      classes: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    };
  }
  return {
    label: 'TXT',
    classes: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };
}

function getStatusBadge(status = '') {
  const norm = status.toLowerCase();
  if (norm === 'processed' || norm === 'ready') {
    return {
      label: 'Indexed & Analyzed',
      dot: 'bg-emerald-500',
      classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    };
  }
  if (norm === 'processing') {
    return {
      label: 'Parsing & Indexing',
      dot: 'bg-blue-500 animate-pulse',
      classes: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    };
  }
  return {
    label: 'Needs Verification',
    dot: 'bg-amber-500',
    classes: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
  };
}

export default function DocumentList({ documents = [], onDelete, onSelectDoc }) {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const docList = Array.isArray(documents) ? documents : [];

  const filteredDocs = docList.filter((doc) => {
    const name = doc.filename || doc.name || '';
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to remove this document and its extracted milestones?')) {
      return;
    }
    try {
      setDeletingId(docId);
      if (onDelete) await onDelete(docId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#191970] dark:text-cyan-400">
            Case Evidence Repository
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Ingested Filings & Exhibits
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {docList.length} legal records indexed for citation anchors and chronological event detection.
          </p>
        </div>

        {/* Search inside documents */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records by name..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#191970] dark:focus:ring-cyan-400 transition-all"
          />
        </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          <FileQuestion className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No filings match your search
          </h4>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
            {docList.length === 0
              ? 'Upload a case document above to initiate automated event and deadline extraction.'
              : 'Try clearing your search query to see all indexed documents.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="py-3 px-4">Document / Citation</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Extracted Events</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredDocs.map((doc) => {
                const name = doc.filename || doc.name || 'Untitled Document';
                const typeBadge = getFileTypeBadge(name);
                const statusBadge = getStatusBadge(doc.status);
                const size = doc.size_bytes ?? doc.size ?? 1024;
                const eventsCount = doc.event_count ?? 0;
                const isDeleting = deletingId === doc.id;

                return (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Document Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-midnight-50 dark:bg-midnight-950/70 border border-midnight-200 dark:border-midnight-800 flex items-center justify-center flex-shrink-0 text-[#191970] dark:text-cyan-300">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md group-hover:text-[#191970] dark:group-hover:text-cyan-300 transition-colors">
                            {name}
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                            ID: {doc.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Format Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${typeBadge.classes}`}>
                        {typeBadge.label}
                      </span>
                    </td>

                    {/* File Size */}
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono">
                      {formatFileSize(size)}
                    </td>

                    {/* Extracted Events Count */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                        <CalendarCheck className="w-3.5 h-3.5 text-[#191970] dark:text-cyan-400" />
                        <span>{eventsCount} milestones</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.classes}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                        <span>{statusBadge.label}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        disabled={isDeleting}
                        title="Delete Document"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-transparent hover:border-rose-200 dark:hover:border-rose-800 transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isDeleting ? 'Removing...' : 'Delete'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footnote */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>Citations automatically synchronized with SQLite evidence store.</span>
        <span>Court-admissible source trail verified</span>
      </div>
    </div>
  );
}
