import React, { useState } from 'react';
import Task1 from './forms/Task1';
import Task2 from './forms/Task2';
import Task3 from './forms/Task3';

const tabs = [
  {
    id: 1,
    label: 'Task 1',
    sublabel: 'Student Registration',
    description: 'React Hook Form with basic validation',
    color: 'from-amber-500 to-rose-500',
    border: 'border-amber-500/50',
    ring: 'ring-amber-500/20',
    text: 'text-amber-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Task 2',
    sublabel: 'Secure Signup',
    description: 'React Hook Form + Yup Schema Validation',
    color: 'from-violet-500 to-fuchsia-500',
    border: 'border-violet-500/50',
    ring: 'ring-violet-500/20',
    text: 'text-violet-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'Task 3',
    sublabel: 'Multi-Step Admission',
    description: '4-step wizard with per-step validation',
    color: 'from-teal-500 to-emerald-500',
    border: 'border-teal-500/50',
    ring: 'ring-teal-500/20',
    text: 'text-teal-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function FormDemo() {
  const [activeTab, setActiveTab] = useState(1);
  const active = tabs.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#080810] font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#080810]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          {/* Title */}
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              🗂️ Form Tasks Demo
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">React Hook Form · Yup · Multi-step Wizard</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={activeTab !== tab.id ? tab.text : 'text-white'}>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Task Info Strip */}
        <div className="max-w-5xl mx-auto mt-3">
          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl bg-white/3 border ${active.border} text-xs`}>
            <span className={`${active.text} font-bold`}>{active.label}:</span>
            <span className="text-white font-semibold">{active.sublabel}</span>
            <span className="text-slate-500">—</span>
            <span className="text-slate-400">{active.description}</span>
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div key={activeTab} className="animate-fade-in">
        {activeTab === 1 && <Task1 />}
        {activeTab === 2 && <Task2 />}
        {activeTab === 3 && <Task3 />}
      </div>
    </div>
  );
}
