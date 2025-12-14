import React, { useState } from 'react';
import { Layers, ChevronDown, Cpu, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  const [isDsOpen, setIsDsOpen] = useState(true);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
        />
      )}

      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/30 z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                Curriculum
            </div>
            
            <nav className="space-y-2">
                <div className="group">
                    <button 
                        onClick={() => setIsDsOpen(!isDsOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-blue-50/80 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl font-medium transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    >
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5" />
                            <span>Data Structures</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDsOpen && (
                        <div className="mt-2 space-y-1 ml-4 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                            {[
                                "1. Introduction", "2. Stacks & Queues", "3. Linked List", 
                                "4. Trees", "5. Graphs", "6. Searching"
                            ].map((item, i) => (
                                <Link 
                                    key={i} 
                                    to="#" 
                                    className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Link to="#" className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Cpu className="w-5 h-5" />
                    <span>Algorithms (DSGT)</span>
                </Link>
                
                <Link to="#" className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <BarChart2 className="w-5 h-5" />
                    <span>Progress Analytics</span>
                </Link>
            </nav>

            <div className="mt-auto pt-10">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-blue-500/20">
                    <div className="text-xs opacity-80 mb-1">Current Graph Score</div>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-white h-full w-[85%] rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
}
