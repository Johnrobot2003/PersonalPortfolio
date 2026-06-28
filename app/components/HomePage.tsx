'use client';

import { useState, useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaGithub, FaReact, FaNodeJs } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { BiLogoTypescript, BiLogoMongodb, BiLogoPostgresql } from "react-icons/bi";
import { AiOutlineDotNet } from "react-icons/ai";
import { SiPrisma, SiExpress, SiTailwindcss } from "react-icons/si";

// Centralized tech stack registry mapping titles, colors, and components
const TECH_STACK = [
  { id: "ts", name: "TypeScript", Icon: BiLogoTypescript, color: "text-[#3178c6]" },
  { id: "mongo", name: "MongoDB", Icon: BiLogoMongodb, color: "text-[#47a248]" },
  { id: "express", name: "Express", Icon: SiExpress, color: "text-zinc-600 dark:text-zinc-400" },
  { id: "react", name: "React", Icon: FaReact, color: "text-[#61dafb]" },
  { id: "node", name: "Node.js", Icon: FaNodeJs, color: "text-[#339933]" },
  { id: "dotnet", name: ".NET Core", Icon: AiOutlineDotNet, color: "text-[#512bd4]" },
  { id: "next", name: "Next.js", Icon: RiNextjsLine, color: "text-black dark:text-white" },
  { id: "prisma", name: "Prisma", Icon: SiPrisma, color: "text-[#2d3748] dark:text-zinc-200" },
  { id: "tailwind", name: "Tailwind", Icon: SiTailwindcss, color: "text-[#38bdf8]" },
  { id: "postgres", name: "PostgreSQL", Icon: BiLogoPostgresql, color: "text-[#4169e1]" },
];

export default function HomePage() {
  // Game Play Lifecycle States
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "FINISHED">("IDLE");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeBugIdx, setActiveBugIdx] = useState<number | null>(null);
  
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Background game interval mechanics handler
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    // 1-second countdown clock ticker
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("FINISHED");
          setActiveBugIdx(null);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Dynamic bug pop-up position function
    const forceSpawnBug = () => {
      const randomIdx = Math.floor(Math.random() * TECH_STACK.length);
      setActiveBugIdx(randomIdx);
    };

    forceSpawnBug(); 
    gameIntervalRef.current = setInterval(forceSpawnBug, 850); 

    return () => {
      clearInterval(countdown);
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [gameState]);

  const startDebugging = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState("PLAYING");
  };

  const handleTechClick = (idx: number) => {
    // Standard profile mode: Normal click behavior
    if (gameState !== "PLAYING") return;

    // Game active mode: Process hit detection
    if (idx === activeBugIdx) {
      setScore((prev) => prev + 1);
      setActiveBugIdx(null); // Clear instantly for punchy action feedback

      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = setInterval(() => {
          setActiveBugIdx(Math.floor(Math.random() * TECH_STACK.length));
        }, 850);
      }
    } else {
      // Misclick penalty for blind clicking
      setScore((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl select-none">
      
      {/* --- PROFILE IDENTITY HEADER --- */}
      <div className="flex gap-8 items-center justify-center flex-col md:flex-row mt-6">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold fade-in-up delay-100">John Rohan Carson Acebo</h2>
          <h5 className="text-xl font-medium text-zinc-500 mt-2 fade-in-up delay-100">Full Stack Developer</h5>
          
          <div className="flex gap-6 justify-center md:justify-start mt-4">
            <a href="https://www.facebook.com/johnrohan.acebo" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:scale-125 transition-transform text-zinc-600 hover:text-[#1877f2]" />
            </a>
            <a href="https://www.instagram.com/century_tuna03/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:scale-125 transition-transform text-zinc-600 hover:text-[#e1306c]" />
            </a>
            <a href="https://github.com/Johnrobot2003" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-3xl hover:scale-125 transition-transform text-zinc-600 hover:text-black dark:hover:text-white" />
            </a>
          </div>
        </div>
        <img src="me.jpg" alt="John Rohan" className="rounded-full hover:scale-105 transition-transform size-48 object-cover border-4 border-zinc-100 dark:border-zinc-800 shadow-md"/>
      </div>
      
      {/* --- PROFESSIONAL PROFILE BIOGRAPHY --- */}
      <p className="text-center md:text-left mt-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto md:mx-0">
        Hi, I'm John Rohan! I'm a full stack developer specializing in building exceptional digital experiences. With a passion for coding and a knack for problem-solving, I create efficient and scalable web applications that delight users.
        Proficient in TypeScript, React, Node.js, and .NET Core, I thrive on turning complex challenges into elegant solutions. Whether it's crafting responsive user interfaces or designing robust backend systems, I'm dedicated to delivering high-quality code and seamless user experiences. Let's build something amazing together!
      </p>

      {/* --- MODULAR INTERACTIVE TECH STACK ARCHITECTURE --- */}
      <div className="mt-16 border rounded-2xl p-6 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm relative overflow-hidden shadow-sm">
        
        {/* Game HUD Board Overlay (Swaps automatically when user initializes the loop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-8 gap-3 font-mono">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Tech Stacks</h3>
            <p className="text-xs text-zinc-500">The software architectures I use to deploy applications.</p>
          </div>
          
          {gameState === "PLAYING" ? (
            <div className="flex gap-4 bg-zinc-900 text-white dark:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-inner">
              <div className="text-green-400">WHACKED: {score}</div>
              <div className="text-red-400">TIME: {timeLeft}s</div>
            </div>
          ) : gameState === "FINISHED" ? (
            <div className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
               Game Finished! your score: {score}
            </div>
          ) : (
            <button 
              onClick={startDebugging}
              className="text-[11px] font-bold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider"
            >
              🎮 Play Mini Game!
            </button>
          )}
        </div>

        {/* Dynamic Skills Interaction Area */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 justify-items-center py-2">
          {TECH_STACK.map(({ id, name, Icon, color }, idx) => {
            const isBugActive = idx === activeBugIdx;

            return (
              <button
                key={id}
                onClick={() => handleTechClick(idx)}
                disabled={gameState !== "PLAYING" && gameState !== "IDLE"}
                className={`w-full flex flex-col items-center justify-center p-4 border rounded-xl transition-all relative ${
                  isBugActive
                    ? "bg-red-500/10 border-red-500 text-red-500 animate-bounce scale-105 cursor-pointer shadow-md"
                    : gameState === "PLAYING"
                    ? "bg-zinc-100/40 dark:bg-zinc-900/40 border-transparent opacity-30 scale-95 grayscale cursor-default"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 shadow-sm cursor-default"
                }`}
              >
                {/* Micro Glitch Alert Stencil for live game targets */}
                {isBugActive && (
                  <span className="absolute -top-2.5 bg-red-600 text-[9px] font-mono text-white font-black px-1.5 py-0.5 rounded uppercase tracking-tighter animate-pulse shadow">
                    🔨 WHACK ME!
                  </span>
                )}

                <Icon className={`text-4xl ${isBugActive ? "text-red-500" : color}`} />
                <span className={`text-xs font-medium mt-2 font-mono ${isBugActive ? "text-red-600 font-bold" : "text-zinc-500 dark:text-zinc-400"}`}>
                  {name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reset / Post-Game Processing Panel */}
        {gameState === "FINISHED" && (
          <div className="mt-8 pt-4 border-t border-dashed flex justify-center animate-in fade-in zoom-in-95">
            <button 
              onClick={startDebugging}
               className="text-[11px] font-bold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider"
            >
               PLAY GAME AGAIN? 
            </button>
          </div>
        )}

      </div>
    </div>
  );
}