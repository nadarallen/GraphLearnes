import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Background3D from '../components/background/Background3D';
import { dsModules as staticModules } from '../data/modules';
import { 
    Box, Layers, Link as LinkIcon, GitBranch, Share2, Search, 
    AlertCircle, CheckCircle2, Network 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const iconMap = {
    'ds-intro': Box,
    'ds-stacks': Layers,
    'ds-linked': LinkIcon,
    'ds-trees': GitBranch,
    'ds-graphs': Share2,
    'ds-search': Search
};

const tailwindColorMap = {
    'ds-intro': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
    'ds-stacks': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
    'ds-linked': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
    'ds-trees': { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
    'ds-graphs': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    'ds-search': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400' },
}

function ModuleCard({ module, isOpen, onToggle }) {
    const Icon = iconMap[module.id] || Box;
    const colors = tailwindColorMap[module.id] || tailwindColorMap['ds-intro'];

    return (
        <div 
            className="glass-panel rounded-2xl p-6 cursor-pointer group hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 mb-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-800"
            onClick={onToggle}
        >
            <div className="flex items-start justify-between mb-2">
                <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded uppercase">
                    {(module.title || '').split('.')[0]}
                </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {(module.title || '').split('. ')[1] || module.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {module.longDescription}
            </p>

            <div 
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-slate-200/60 dark:border-slate-700 mt-4 pt-4">
                         <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-3 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" /> Prerequisites
                         </h4>
                         <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                            {module.prerequisites && module.prerequisites.slice(0, 3).map(p => (
                                <li key={p.id} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400"/>
                                    {p.title}
                                </li>
                            ))}
                         </ul>

                         <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Link 
                                to={`/expand?module=${module.id}`}
                                onClick={e => e.stopPropagation()} 
                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium text-sm"
                            >
                                <Network className="w-4 h-4 mr-2" /> View Graph
                            </Link>
                            <Link 
                                to={`/quiz?topic=${module.title}`}
                                onClick={e => e.stopPropagation()} 
                                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-lg shadow-blue-600/20"
                            >
                                Start Quiz
                            </Link>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModuleId, setOpenModuleId] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt fetch from backend
    axios.get('/api/modules')
         .then(res => {
             // If backend structure matches perfectly
             if (res.data && res.data.length > 0) {
                 setModules(res.data);
             } else {
                 setModules(staticModules);
             }
             setLoading(false);
         })
         .catch(err => {
             console.warn("Backend not reachable or error, falling back to static data:", err);
             setModules(staticModules);
             setLoading(false);
         });
  }, []);

  const toggleModule = (id) => {
      setOpenModuleId(openModuleId === id ? null : id);
  }

  const leftModules = modules.filter((_, i) => i % 2 === 0);
  const rightModules = modules.filter((_, i) => i % 2 !== 0);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950">
      <Background3D variant="default" />
      <Navbar type="dashboard" onSidebarToggle={() => setSidebarOpen(true)} />
      
      <div className="flex pt-16 min-h-screen">
         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto w-full relative z-10">
            <div className="mb-10 animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Data Structures</h1>
                <p className="text-slate-500 dark:text-slate-400">Master the building blocks of efficient software.</p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-500">Loading modules...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col w-full">
                        {leftModules.map(m => (
                            <ModuleCard 
                                key={m.id} 
                                module={m} 
                                isOpen={openModuleId === m.id} 
                                onToggle={() => toggleModule(m.id)}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col w-full">
                        {rightModules.map(m => (
                            <ModuleCard 
                                key={m.id} 
                                module={m} 
                                isOpen={openModuleId === m.id} 
                                onToggle={() => toggleModule(m.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
         </main>
      </div>
    </div>
  );
}
