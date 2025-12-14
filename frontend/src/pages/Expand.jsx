/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useTheme } from '../context/ThemeContext';
import { dsModules } from '../data/modules';
import Navbar from '../components/layout/Navbar';
import { ArrowLeft, BookOpen, AlertCircle, Share2, Globe } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Expand() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const fgRef = useRef();
  
  // State
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState('focused'); // 'focused' (original) or 'galaxy' (new)
  const [activeModuleId, setActiveModuleId] = useState(searchParams.get('module') || dsModules[0].id);

  // Sync URL with active module
  useEffect(() => {
      setSearchParams({ module: activeModuleId });
  }, [activeModuleId]);

  // Transform Data based on View Mode
  const graphData = useMemo(() => {
    if (viewMode === 'galaxy') {
        // --- NEW CONNECTED VIEW (ALL MODULES) ---
        const nodes = dsModules.map(m => ({
            id: m.id,
            name: m.title,
            val: 10,
            group: 'main',
            color: m.color,
            desc: m.longDescription,
            ...m
        }));

        // Add "Concept" nodes for all prerequisites to link them together naturally?
        // Or just link known modules.
        // For the "Galaxy", let's be smart: Link modules that share prerequisites or link linearly?
        // Let's just dump everything like before but cleaner.
        const links = [];
        
        // Add nodes for "concepts" (prerequisites) to create a web
        dsModules.forEach(m => {
            if (m.prerequisites) {
                m.prerequisites.forEach(p => {
                    // Check if prereq title is "Linked Lists" -> Link to main module 03
                    if (p.title === "Linked Lists") {
                        links.push({ source: 'ds-linked', target: m.id });
                    }
                    // Else: Check if p.id is already a main module?
                    else if (!nodes.find(n => n.id === p.id)) {
                        nodes.push({
                            id: p.id,
                            name: p.title,
                            val: 3,
                            type: 'concept',
                            group: 'prereq',
                            desc: p.description,
                            color: theme === 'dark' ? '#ffffff' : '#666666'
                        });
                        links.push({ source: p.id, target: m.id });
                    } else {
                         // Fallback logic if needed
                         links.push({ source: p.id, target: m.id });
                    }
                });
            }
        });
        return { nodes, links };
    } else {
        // --- FOCUSED VIEW (ORIGINAL HTML LOGIC) ---
        const module = dsModules.find(m => m.id === activeModuleId);
        if (!module) return { nodes: [], links: [] };

        const nodes = [
            {
                id: module.id,
                name: module.title,
                desc: module.longDescription,
                group: 'main',
                color: module.color,
                val: 10
            }
        ];

        const links = [];
        if (module.prerequisites) {
            module.prerequisites.forEach(p => {
                nodes.push({
                    id: p.id,
                    name: p.title,
                    desc: p.description,
                    group: 'prereq',
                    color: theme === 'dark' ? '#ffffff' : '#666666',
                    val: 3
                });
                links.push({ source: module.id, target: p.id });
            });
        }
        
        return { nodes, links };
    }
  }, [viewMode, activeModuleId, theme]);

  // Center graph on data change
  useEffect(() => {
      if (fgRef.current) {
          setTimeout(() => fgRef.current.zoomToFit(600, 50), 200);
      }
      setSelectedNode(null); 
      // If focused mode, auto-select main module?
      if (viewMode === 'focused') {
          const m = dsModules.find(x => x.id === activeModuleId);
          if (m) {
              // We can select it but maybe user just wants to see structure first
          }
      }
  }, [graphData]);


  const handleNodeClick = (node) => {
    setSelectedNode(node);
    // Shift graph to the left to make room for the panel
    // We want the node to be at roughly 25% of the screen width (left side)
    const currentZoom = fgRef.current.zoom();
    const shift = (window.innerWidth / 4) / currentZoom; 
    
    // We shift the visual center to the RIGHT, so the node moves LEFT relative to viewport
    fgRef.current.centerAt(node.x + shift, node.y, 1000);
    // Removed zoom() call to preserve user's zoom level
  };

  const handleBackgroundClick = () => {
    setSelectedNode(null);
    fgRef.current.zoomToFit(1000);
  };

  const bgColor = theme === 'dark' ? '#0f172a' : '#f8fafc';
  const textColor = theme === 'dark' ? '#f1f5f9' : '#1e293b';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* Custom Header similar to original */}
      <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-20 transition-all duration-300">
          <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-sm flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-blue-400 tracking-wide flex items-baseline gap-2">
                       Data Structures <span className="text-sm font-normal text-slate-500 dark:text-slate-500 tracking-normal">// Interactive Canvas</span>
                  </h1>
              </div>
          </div>

          <div className="flex items-center gap-3">
              <button 
                onClick={() => setViewMode(prev => prev === 'focused' ? 'galaxy' : 'focused')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    viewMode === 'galaxy' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                  {viewMode === 'focused' ? <Globe className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                  {viewMode === 'focused' ? 'Enter Galaxy Mode' : 'Focus View'}
              </button>
          </div>
      </header>

      {/* Navigation Bar (Original Style) - Only visible in Focused Mode */}
      {viewMode === 'focused' && (
          <nav className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur list-none scrollbar-hide z-10">
              {dsModules.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModuleId(m.id)}
                    className={`flex-shrink-0 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                        activeModuleId === m.id 
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10' 
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                      {m.title}
                  </button>
              ))}
          </nav>
      )}
      
      <div className="flex-1 relative">
         <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            backgroundColor="rgba(0,0,0,0)"
            
            // --- NODE RENDERING ---
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name;
              const fontSize = (node.group === "main" ? 14 : 12) / globalScale;
              const isSelected = selectedNode && node.id === selectedNode.id;
              const isLight = theme === 'light';
    
              // 1. Draw Outer Glow (Halo) - Enhanced if selected
              if (node.group === "main" || isSelected) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.val * (isSelected ? 1.5 : 1.2), 0, 2 * Math.PI, false);
                ctx.fillStyle = isSelected 
                  ? "rgba(255, 215, 0, 0.3)" 
                  : isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)";
                ctx.fill();
              }
    
              // 2. Draw Node Circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
    
              let nodeColor = node.color;
              if (!nodeColor || node.group !== 'main') {
                 nodeColor = isLight ? "#666666" : "#ffffff";
              }
              ctx.fillStyle = isSelected ? "#ffd700" : nodeColor;
              
              ctx.shadowBlur = isSelected ? 30 : 15;
              ctx.shadowColor = isSelected ? "#ffd700" : nodeColor;
              ctx.fill();
              ctx.shadowBlur = 0; // Reset
    
              // 3. Draw Text Label
              ctx.font = `${node.group === "main" ? "bold" : ""} ${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = isLight ? "#1a1a1a" : "#ffffff";
              ctx.fillText(label, node.x, node.y + node.val + 8);
            }}
            
            nodePointerAreaPaint={(node, color, ctx) => {
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.arc(node.x, node.y, node.val + 5, 0, 2 * Math.PI, false);
               ctx.fill();
            }}
    
            // --- LINK RENDERING ---
            linkColor={link => {
                if (selectedNode && (link.source.id === selectedNode.id || link.target.id === selectedNode.id)) {
                    return "#ff0055";
                }
                return theme === 'light' ? "rgba(0, 102, 204, 0.2)" : "rgba(137, 207, 240, 0.2)";
            }}
            linkWidth={link => (selectedNode && (link.source.id === selectedNode.id || link.target.id === selectedNode.id)) ? 3 : 2}
            linkDirectionalParticles={3}
            linkDirectionalParticleWidth={3}
            linkDirectionalParticleColor={() => theme === 'light' ? "#0066cc" : "#89cff0"}
            
            onNodeClick={handleNodeClick}
            onBackgroundClick={handleBackgroundClick}
            
            // Forces
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
          />

         {/* Info Panel - Sliding from right */}
         <div 
            className={`absolute right-4 top-4 w-80 glass-panel p-6 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-l-[3px] shadow-2xl transition-all duration-300 transform ${
                selectedNode ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
            }`}
            style={{ borderLeftColor: selectedNode?.color || '#3b82f6' }}
         >
            {selectedNode && (
                <>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: selectedNode.color || '#3b82f6' }}>
                        {selectedNode.group === 'main' ? 'Main Module' : 'Prerequisite'}
                    </h4>
                    <h2 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">
                        {selectedNode.name}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {selectedNode.desc || "No description available."}
                    </p>

                    <div className="flex gap-2">
                        {selectedNode.group === 'main' && (
                            <Link 
                                to={`/quiz?topic=${selectedNode.name}`}
                                className="flex-1 py-2 text-center bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                Take Quiz
                            </Link>
                        )}
                         <button 
                            onClick={handleBackgroundClick}
                            className="flex-1 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300"
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
         </div>

         <div className="absolute bottom-6 left-6 pointer-events-none text-xs font-mono text-slate-400 dark:text-slate-600">
             &gt; MODE: {viewMode.toUpperCase()} | Drag to pan • Scroll to zoom
         </div>
      </div>
    </div>
  );
}
