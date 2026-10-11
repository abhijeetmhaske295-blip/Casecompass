import React, { useState } from 'react';
import { FileCode, Copy, Check, Download, Code2, Layers, ShieldCheck, Smartphone } from 'lucide-react';
import { KOTLIN_ARCHITECTURE_FILES, KotlinFile } from '../data/kotlinComposeCode';

interface KotlinArchitectureViewerProps {
  isDark: boolean;
}

export const KotlinArchitectureViewer: React.FC<KotlinArchitectureViewerProps> = ({ isDark }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile: KotlinFile = KOTLIN_ARCHITECTURE_FILES[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const fullBundle = KOTLIN_ARCHITECTURE_FILES.map(
      (f) => `// ==========================================\n// FILE: ${f.path}\n// PACKAGE: ${f.package}\n// ==========================================\n\n${f.code}\n\n`
    ).join('\n');

    const blob = new Blob([fullBundle], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CaseCompass-Android-Kotlin-Compose-Architecture.kt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-7 rounded-3xl soft-transition ${
          isDark ? 'soft-card-dark' : 'soft-card-light'
        } flex flex-col md:flex-row md:items-center justify-between gap-4`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold">
              Jetpack Compose Material3
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              Kotlin 2.0 • MVVM + StateFlow
            </span>
          </div>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-[#22252A]'
            }`}
          >
            Production Android Architecture
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
            Clean, modular Android codebase with unidirectional state flow, custom Canvas timeline node connectors, zero-extrapolation legal rules, and Material 3 design tokens.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              isDark ? 'soft-btn-secondary-dark' : 'soft-btn-secondary-light'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-blue-600" />
                Copy File
              </>
            )}
          </button>
          <button
            onClick={handleDownloadAll}
            className="px-5 py-2 rounded-xl text-xs font-semibold soft-btn-primary flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Code (.kt)
          </button>
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: File Tree */}
        <div
          className={`lg:col-span-4 p-4 rounded-3xl ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1 mb-2 flex items-center justify-between">
            <span>Kotlin File Tree</span>
            <span className="font-mono text-[10px] text-blue-600 font-bold">
              {KOTLIN_ARCHITECTURE_FILES.length} Files
            </span>
          </div>

          <div className="space-y-1">
            {KOTLIN_ARCHITECTURE_FILES.map((file, idx) => {
              const isActive = idx === activeFileIndex;
              return (
                <button
                  key={file.name}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25'
                      : isDark
                      ? 'text-neutral-300 hover:bg-neutral-800/60'
                      : 'text-neutral-700 hover:bg-neutral-200/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className={`text-[10px] ml-2 ${isActive ? 'text-white/80' : 'text-neutral-400'}`}>
                    {file.package.split('.').pop()}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`mt-4 p-3.5 rounded-2xl text-xs leading-relaxed ${
              isDark ? 'soft-inset-dark text-neutral-400' : 'soft-inset-light text-neutral-600'
            }`}
          >
            <strong className="block text-blue-600 dark:text-blue-400 mb-0.5">{activeFile.name}</strong>
            {activeFile.description}
          </div>
        </div>

        {/* Right Column: Code Viewer */}
        <div
          className={`lg:col-span-8 rounded-3xl overflow-hidden flex flex-col ${
            isDark ? 'soft-card-dark' : 'soft-card-light'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200/60 dark:border-neutral-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-400">
              <Code2 className="w-4 h-4 text-blue-600" />
              <strong className={isDark ? 'text-white' : 'text-[#22252A]'}>{activeFile.name}</strong>
              <span className="hidden sm:inline text-neutral-400">({activeFile.path})</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors cursor-pointer"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div
            className={`p-5 overflow-x-auto max-h-[580px] text-xs font-mono leading-relaxed select-text ${
              isDark ? 'bg-[#121418] text-neutral-300' : 'soft-inset-light text-neutral-800'
            }`}
          >
            <pre>
              <code>{activeFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
