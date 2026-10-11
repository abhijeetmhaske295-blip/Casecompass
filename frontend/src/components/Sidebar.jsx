import React from 'react';
import {
  Compass,
  LayoutDashboard,
  FileText,
  CalendarClock,
  ClockAlert,
  AlertTriangle,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar({ currentPage, onNavigate, counts = {} }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      badge: counts.documents != null ? String(counts.documents) : '3',
    },
    {
      id: 'timeline',
      label: 'Case Timeline',
      icon: CalendarClock,
      badge: counts.events != null ? String(counts.events) : '5',
    },
    {
      id: 'deadlines',
      label: 'Deadlines',
      icon: ClockAlert,
      badge: counts.deadlines != null ? String(counts.deadlines) : '2',
      badgeColor: 'bg-amber-400 text-slate-900',
    },
    {
      id: 'issues',
      label: 'Conflicts & Gaps',
      icon: AlertTriangle,
      badge: counts.issues != null ? String(counts.issues) : '1',
      badgeColor: 'bg-rose-500 text-white',
    },
  ];

  return (
    <aside className="w-64 bg-[#191970] text-white flex flex-col flex-shrink-0 h-screen sticky top-0 select-none shadow-xl border-r border-[#191970]/50 z-40 transition-all duration-200">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10 bg-[#121255]">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shadow-inner border border-white/15">
          <Compass className="w-5 h-5 text-cyan-300" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
            CaseCompass
          </h1>
          <p className="text-[10px] font-medium tracking-wider uppercase text-cyan-300/80">
            Litigation Intelligence
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/50">
          Core Workspaces
        </p>
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-white text-[#191970] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                    isActive ? 'text-[#191970]' : 'text-cyan-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-[#191970] text-white' : 'bg-white/20 text-white')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Processing Engine Status Box */}
      <div className="p-4 m-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-white">
          <Cpu className="w-4 h-4 text-cyan-300" />
          <span>CaseCompass Core</span>
        </div>
        <p className="text-[11px] text-white/70 leading-relaxed mb-3">
          FastAPI + SQLite DB persistent extraction engine active.
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/60">
          <span>Engine v1.2</span>
          <span className="flex items-center gap-1 text-emerald-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Synced
          </span>
        </div>
      </div>
    </aside>
  );
}
