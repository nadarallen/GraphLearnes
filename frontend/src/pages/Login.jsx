import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Background3D from '../components/background/Background3D';
import Navbar from '../components/layout/Navbar';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      
      if (login(username, password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        // Shake animation effect could be added here
      }
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-100 flex flex-col overflow-hidden">
      <Background3D variant="network" />
      <Navbar type="landing" />

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
         
         <div 
            id="login-card" 
            className="glass-card-login w-full max-w-[440px] p-10 rounded-3xl relative transition-transform duration-100"
         >
             {/* Decorative Top Line */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-b-full opacity-70"></div>

             <div className="text-center mb-8">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4 ring-1 ring-blue-100 dark:ring-blue-800 shadow-sm">
                     <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                 </div>
                 <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white tracking-tight" style={{ fontFamily: '"Product Sans", sans-serif' }}>
                     Student Portal
                 </h1>
                 <p className="text-slate-500 dark:text-slate-400 text-sm">
                     Enter the Knowledge Graph
                 </p>
                 {error && (
                   <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm animate-pulse">
                       {error}
                   </div>
                 )}
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Username */}
                 <div className="input-group">
                     <input 
                        type="text" 
                        id="username" 
                        className="input-field" 
                        placeholder=" " 
                        required 
                     />
                     <label htmlFor="username" className="input-label">Graph ID / Email</label>
                 </div>

                 {/* Password */}
                 <div className="input-group">
                     <input 
                        type="password" 
                        id="password" 
                        className="input-field" 
                        placeholder=" " 
                        required 
                     />
                     <label htmlFor="password" className="input-label">Password</label>
                 </div>

                 <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                        <input type="checkbox" className="rounded bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" />
                        Remember node
                    </label>
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                        Lost access?
                    </a>
                 </div>

                 <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                 >
                    <span className="relative z-10">Initialize Session</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                 </button>
             </form>

             <div className="mt-8 text-center">
                 <p className="text-slate-500 dark:text-slate-400 text-sm">
                     Don't have a node yet? <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline hover:text-blue-700 dark:hover:text-blue-300">Join the Network</a>
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
}
