import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Share2, BrainCircuit, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Background3D from '../components/background/Background3D';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS FOR CARDS ---

function Card1() {
    const container = useRef();
    const satellitesRef = useRef([]);

    // Mouse Repulsion Logic
    const handleMouseMove = (e) => {
        const rect = container.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        satellitesRef.current.forEach(sat => {
            if(!sat) return;
            const ox = parseFloat(sat.dataset.ox);
            const oy = parseFloat(sat.dataset.oy);
            
            const dx = ox - mouseX;
            const dy = oy - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                const moveX = (dx / dist) * force * 30;
                const moveY = (dy / dist) * force * 30;
                gsap.to(sat, { x: moveX, y: moveY, duration: 0.5, ease: "power2.out" });
            } else {
                gsap.to(sat, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
            }
        });
    };

    const handleMouseLeave = () => {
        satellitesRef.current.forEach(sat => {
            gsap.to(sat, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        });
    };

    const addSatellite = (el) => { if (el && !satellitesRef.current.includes(el)) satellitesRef.current.push(el); };

    return (
        <div className="glass-card flex-1 feature-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
             <div className="card-graphic" ref={container}>
                <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-full pointer-events-none">
                     <g>
                        <line x1="150" y1="100" x2="80" y2="60" className="link" />
                        <line x1="150" y1="100" x2="80" y2="140" className="link" />
                        <line x1="150" y1="100" x2="220" y2="60" className="link" />
                        <line x1="150" y1="100" x2="220" y2="140" className="link" />
                     </g>
                     <g>
                        <circle cx="150" cy="100" r="12" className="node" />
                        <circle cx="80" cy="60" r="8" className="node satellite" data-ox="80" data-oy="60" ref={addSatellite} />
                        <circle cx="80" cy="140" r="8" className="node satellite" data-ox="80" data-oy="140" ref={addSatellite} />
                        <circle cx="220" cy="60" r="8" className="node satellite" data-ox="220" data-oy="60" ref={addSatellite} />
                        <circle cx="220" cy="140" r="8" className="node satellite" data-ox="220" data-oy="140" ref={addSatellite} />
                     </g>
                </svg>
             </div>
             <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                    <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Connect the Dots</h3>
             </div>
             <p className="text-base text-slate-600 dark:text-slate-400">
                Move your mouse over the graph. See how nodes react and connect, just like concepts in your brain.
             </p>
        </div>
    )
}

function Card2() {
    const container = useRef();
    const tl = useRef();

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true });
        tl.current.to(".path-line", { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" })
                  .to(".checkpoint-1", { fill: "#8b5cf6", duration: 0.2 }, 0.1)
                  .to(".checkpoint-2", { fill: "#8b5cf6", duration: 0.2 }, 0.75)
                  .to(".checkpoint-3", { fill: "#8b5cf6", duration: 0.2 }, 1.4);
    }, { scope: container });

    return (
        <div 
            className="glass-card flex-1 feature-card" 
            onMouseEnter={() => tl.current.play()} 
            onMouseLeave={() => tl.current.reverse()}
        >
             <div className="card-graphic" ref={container}>
                <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-full pointer-events-none">
                     <path d="M40,150 C100,150 100,50 150,50 C200,50 200,150 260,150" className="path-bg" />
                     <path d="M40,150 C100,150 100,50 150,50 C200,50 200,150 260,150" className="path-line" />
                     
                     <circle cx="40" cy="150" r="8" fill="#fff" stroke="#8b5cf6" strokeWidth="3" className="checkpoint-1" />
                     <circle cx="150" cy="50" r="8" fill="#fff" stroke="#8b5cf6" strokeWidth="3" className="checkpoint-2" />
                     <circle cx="260" cy="150" r="8" fill="#fff" stroke="#8b5cf6" strokeWidth="3" className="checkpoint-3" />
                </svg>
             </div>
             <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Smart Prereqs</h3>
             </div>
             <p className="text-base text-slate-600 dark:text-slate-400">
                Hover to flow through the curriculum. Our AI maps the optimal path from A to B.
             </p>
        </div>
    )
}

function Card3() {
    const container = useRef();
    const tl = useRef();

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true });
        tl.current.to(".success-ring", { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" })
                  .to(".success-check", { strokeDashoffset: 0, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
                  .to(".pulse-circle", { opacity: 0.2, scale: 1.2, duration: 0.4, repeat: 1, yoyo: true }, 0);
    }, { scope: container });

    return (
        <div 
            className="glass-card flex-1 feature-card" 
            onMouseEnter={() => tl.current.play()} 
            onMouseLeave={() => tl.current.reverse()}
        >
             <div className="card-graphic" ref={container}>
                <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-full pointer-events-none">
                     <circle cx="150" cy="100" r="45" className="pulse-circle" />
                     <circle cx="150" cy="100" r="30" fill="none" strokeWidth="4" className="ring-bg" />
                     <circle cx="150" cy="100" r="30" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="188" strokeDashoffset="188" className="success-ring" transform="rotate(-90 150 100)" />
                     <path d="M135,100 L145,110 L165,85" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50" strokeDashoffset="50" className="success-check" />
                </svg>
             </div>
             <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-green-600 dark:text-green-400">
                    <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Adaptive Tests</h3>
             </div>
             <p className="text-base text-slate-600 dark:text-slate-400">
                Hover to take the test. Experience instant feedback loops that accelerate mastery.
             </p>
        </div>
    )
}

export default function Landing() {
  const container = useRef();
  
  useGSAP(() => {
    // Hero Section
    const tl = gsap.timeline();
    tl.to("#hero-title", {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
    }).to("#hero-sub", {
      opacity: 1, y: 0, duration: 1, delay: -0.5, ease: "power3.out",
    });

    // Hero Parallax
    gsap.to("#sec-1", {
      scrollTrigger: {
        trigger: "#sec-1",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0, scale: 0.9,
    });

    // Section 2
    gsap.to(".section-title", {
      scrollTrigger: { trigger: "#sec-2", start: "top 70%" },
      opacity: 1, y: 0, duration: 1,
    });
    gsap.to(".section-desc", {
      scrollTrigger: { trigger: "#sec-2", start: "top 60%" },
      opacity: 1, y: 0, duration: 1, delay: 0.2,
    });

    // Section 3 Cards Animation Entrance
    const cards = gsap.utils.toArray(".feature-card");
    cards.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: { trigger: "#sec-3", start: "top 75%" },
        opacity: 1, y: 0, duration: 1, delay: i * 0.2, ease: "back.out(1.7)",
      });
    });

    // CTA
    gsap.to(".cta-title", {
       scrollTrigger: { trigger: "#sec-4", start: "top 70%" },
       opacity: 1, scale: 1, duration: 0.8,
    });
    gsap.to(".cta-sub", {
        scrollTrigger: { trigger: "#sec-4", start: "top 65%" },
        opacity: 1, y: 0, duration: 0.8, delay: 0.2,
    });
    gsap.to(".cta-btn", {
        scrollTrigger: { trigger: "#sec-4", start: "top 60%" },
        opacity: 1, y: 0, duration: 0.5, delay: 0.4,
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      <Background3D variant="default" />
      <Navbar type="landing" />

      <main>
        {/* Section 1: Introduction */}
        <section id="sec-1" className="min-h-screen flex flex-col justify-center items-center relative p-8">
          <h1 id="hero-title" className="text-6xl md:text-9xl font-black text-center tracking-tighter opacity-0 translate-y-12 bg-gradient-to-br from-slate-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent pb-4">
            Learning isn't<br />Linear.
          </h1>
          <p id="hero-sub" className="text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-400 text-center mt-8 max-w-3xl opacity-0 translate-y-12">
            Why force your brain into a straight line when knowledge is a network?
          </p>
          <div className="absolute bottom-10 animate-bounce text-slate-400 dark:text-slate-600">
            <ChevronDown className="w-10 h-10" />
          </div>
        </section>

        {/* Section 2: Problem */}
        <section id="sec-2" className="min-h-screen flex flex-col justify-center items-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title opacity-0 translate-y-12 text-5xl md:text-7xl font-bold mb-8">
                Traditional Ed is Broken.
            </h2>
            <p className="section-desc opacity-0 translate-y-12 text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed">
                Textbooks treat concepts like isolated islands.<br/>
                Chapter 1. Chapter 2. Chapter 3.<br/>
                <span className="text-blue-600 dark:text-blue-400 font-bold">But that's not how memory works.</span>
            </p>
          </div>
        </section>

        {/* Section 3: Solution (Restored Glass Cards) */}
        <section id="sec-3" className="min-h-screen flex flex-col md:flex-row gap-8 items-stretch justify-center px-4 max-w-7xl mx-auto w-full py-20">
            <Card1 />
            <Card2 />
            <Card3 />
        </section>

        {/* Section 4: CTA */}
        <section id="sec-4" className="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-t from-blue-50 to-transparent dark:from-slate-900/80">
            <h2 className="cta-title opacity-0 scale-90 text-6xl md:text-8xl font-bold mb-10 text-center">
                Ready to Liftoff?
            </h2>
            <p className="cta-sub opacity-0 translate-y-8 text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl text-center">
                Join thousands of students mastering Data Structures the smart way.
            </p>
            <Link to="/login" className="cta-btn opacity-0 translate-y-8 flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-full font-bold text-xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-600/30">
                Enter the Graph <ArrowRight className="w-6 h-6" />
            </Link>
        </section>
      </main>
    </div>
  );
}
