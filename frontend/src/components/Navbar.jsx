import React from 'react';
import { Sun, Moon, Briefcase, Activity, Bell, ShieldCheck } from 'lucide-react';

export default function Navbar({
  activeCase = 'Apex Corp v. Horizon Dynamics (CV-2024-08912)',
  darkMode = false,
  onToggleTheme,
}) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 shadow-sm">
      {/* Left: Active Litigation Badge */}
      <div className="flex items-center gap-3">
        <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Active Matter
        </span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-50 dark:bg-midnight-950/80 border border-midnight-200 dark:border-midnight-800 text-midnight-900 dark:text-midnight-200 shadow-sm">
          <Briefcase className="w-4 h-4 text-[#191970] dark:text-midnight-300 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold truncate max-w-[280px] sm:max-w-[420px]">
            {activeCase}
          </span>
        </div>
      </div>

      {/* Right: Actions, Theme Toggle, Status, Avatar */}
      <div className="flex items-center gap-3">
        {/* Engine Ready Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Legal Intelligence Online</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#191970] dark:focus:ring-midnight-400"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-[#191970] transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-[#191970] text-white flex items-center justify-center font-bold text-xs shadow-md ring-2 ring-slate-100 dark:ring-slate-800">
            AM
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">
              Counsel Portal
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Lead Litigator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
