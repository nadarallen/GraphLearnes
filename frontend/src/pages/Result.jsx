import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Home, Share2, ClipboardCheck, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'; // Added icons
import Background3D from '../components/background/Background3D';

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { results = [], total = 0 } = location.state || {};
    
    // Safety check: if no state, redirect (or show empty)
    useEffect(() => {
        if (!location.state) {
            // navigate('/'); // Optional: redirect if accessed directly
        }
    }, [location, navigate]);

    // Calculate Scores
    const correctCount = results.filter(r => r.status === 'Correct').length;
    const incorrectCount = results.filter(r => r.status === 'Wrong').length;
    const scorePercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    // Theme Logic 
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
    
    // Toggle Theme Handler
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Helper for circle color
    const getCircleColor = (pct) => {
        if (pct >= 70) return '#22c55e'; // Green
        if (pct >= 40) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
            {/* 3D Background */}
            <Background3D variant="default" />

            {/* Header */}
            <header className="fixed top-0 w-full h-16 z-50 glass-panel flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg">
                        <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100 logo-font">
                        Graph<span className="text-blue-600 dark:text-blue-400">Edu</span>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="theme-btn px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {isDark ? "☀ Light" : "☾ Dark"}
                    </button>
                    <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Home className="w-4 h-4" /> Dashboard
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 pt-24 pb-10 relative z-10">
                <div className="glass-panel w-full max-w-4xl rounded-3xl p-8 md:p-10 relative animate-fade-in-up">
                    
                    {/* Top Section: Score & Summary */}
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                        {/* Score Circle */}
                        <div className="w-48 h-48 relative flex-shrink-0">
                            <svg viewBox="0 0 36 36" className="circular-chart w-full h-full">
                                <path 
                                    className="circle-bg" 
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                    stroke={isDark ? '#334155' : '#e2e8f0'} 
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                <path 
                                    className="circle" 
                                    strokeDasharray={`${scorePercentage}, 100`} 
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    stroke={getCircleColor(scorePercentage)}
                                    fill="none"
                                />
                                <text 
                                    x="18" 
                                    y="18" 
                                    className="percentage" 
                                    dominantBaseline="middle" 
                                    textAnchor="middle"
                                    style={{ fontSize: '0.6em', fontWeight: 'bold', fill: isDark ? '#f1f5f9' : '#1e293b' }}
                                >
                                    {scorePercentage}%
                                </text>
                            </svg>
                        </div>

                        {/* Right Stats */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="mb-6">
                                <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                                    Quiz Completed
                                </h2>
                                <h1 className="text-3xl font-bold text-slate-800 dark:text-white logo-font">
                                    Programming Quiz
                                </h1>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">Total</div>
                                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{total}</div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-800/30">
                                    <div className="text-green-600 dark:text-green-400 text-xs font-bold uppercase mb-1">Correct</div>
                                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">{correctCount}</div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-800/30">
                                    <div className="text-red-500 dark:text-red-400 text-xs font-bold uppercase mb-1">Incorrect</div>
                                    <div className="text-2xl font-bold text-red-700 dark:text-red-400">{incorrectCount}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section: Review */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                             <ClipboardCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                             Answer Review
                        </h3>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {results.map((r, i) => {
                                const isCorrect = r.status === 'Correct';
                                return (
                                    <div 
                                        key={i} 
                                        className={`review-item p-5 rounded-xl border ${
                                            isCorrect 
                                            ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20' 
                                            : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/20'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1">
                                                {isCorrect 
                                                    ? <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                                                    : <XCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
                                                }
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                                                        Q{r.qNo}. {r.question}
                                                    </h4>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                                                        isCorrect 
                                                        ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50'
                                                        : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/50'
                                                    }`}>
                                                        {r.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-3">
                                                    <div className="bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                        <span className="text-slate-400 dark:text-slate-500 text-xs block uppercase font-bold">Your Answer</span>
                                                        <span className={isCorrect ? "text-green-700 dark:text-green-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
                                                            {r.userAns || "Skipped"}
                                                        </span>
                                                    </div>
                                                    <div className="bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                        <span className="text-slate-400 dark:text-slate-500 text-xs block uppercase font-bold">Correct Answer</span>
                                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{r.correctAns}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 flex justify-center gap-4">
                        <Link 
                            to="/dashboard" 
                            className="px-8 py-3 bg-slate-800 dark:bg-blue-600 text-white rounded-xl font-medium hover:bg-slate-900 dark:hover:bg-blue-700 transition-all shadow-lg shadow-slate-800/20 dark:shadow-blue-900/20 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Return to Dashboard
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}
