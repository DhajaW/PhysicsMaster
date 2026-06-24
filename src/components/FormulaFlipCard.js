"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Copy, Play, RotateCcw } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";

// LaTeX Rendering Component
function Latex({ math, block = false }) {
  try {
    const html = katex.renderToString(math, {
      displayMode: block,
      throwOnError: false,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    return <span>{math}</span>;
  }
}

export default function FormulaFlipCard({ item, lang = "si", copyToClipboard, copiedId }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isEnglish = lang === "en";

  // Simulation States
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTime, setSimTime] = useState(0);
  const [simV, setSimV] = useState(0);
  const [simS, setSimS] = useState(0);
  
  // Animation Ref
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Reset simulation state when flipped back or ID changes
  useEffect(() => {
    resetSimulation();
    return () => cancelAnimationFrame(requestRef.current);
  }, [isFlipped, item.id]);

  const resetSimulation = () => {
    cancelAnimationFrame(requestRef.current);
    setIsSimulating(false);
    setSimTime(0);
    previousTimeRef.current = undefined;

    // Reset initial formula-specific values
    if (item.id === 1) {
      setSimV(0); // u = 0
      setSimS(0);
    } else if (item.id === 2) {
      setSimS(0);
    } else if (item.id === 4) {
      setSimS(0); // position for box
    } else if (item.id === 19) {
      setSimTime(0);
    }
  };

  // Simulation animation loop
  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      setSimTime((prevTime) => {
        // Accelerate simulation time slightly faster than wall time for compact UI feel
        const nextTime = prevTime + (deltaTime / 1000) * 1.2;
        
        if (item.id === 1) {
          // v = u + at (u=0, a=2, t_max=5)
          const limitTime = Math.min(nextTime, 5);
          setSimV(0 + 2 * limitTime);
          setSimS(0.5 * 2 * limitTime * limitTime); // s = 1/2 a t^2
          if (limitTime >= 5) {
            setIsSimulating(false);
            return 5;
          }
          return limitTime;
        } else if (item.id === 2) {
          // s = ut + 1/2at^2 (u=5, a=2, t_max=4)
          const limitTime = Math.min(nextTime, 4);
          setSimS(5 * limitTime + 0.5 * 2 * limitTime * limitTime);
          if (limitTime >= 4) {
            setIsSimulating(false);
            return 4;
          }
          return limitTime;
        } else if (item.id === 4) {
          // F = ma (m=5, a=4, animate force push for 3 seconds)
          const limitTime = Math.min(nextTime, 3);
          setSimS(0.5 * 4 * limitTime * limitTime); // visual distance
          if (limitTime >= 3) {
            setIsSimulating(false);
            return 3;
          }
          return limitTime;
        } else if (item.id === 19) {
          // v = fλ (f=10Hz, λ=0.5m, continuous animation)
          return nextTime;
        }
        
        return nextTime;
      });
    }
    
    previousTimeRef.current = time;
    if (isSimulating) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isSimulating) {
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isSimulating]);

  const toggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
    } else {
      if (
        (item.id === 1 && simTime >= 5) ||
        (item.id === 2 && simTime >= 4) ||
        (item.id === 4 && simTime >= 3)
      ) {
        // Reset if reached limit
        setSimTime(0);
        setSimV(0);
        setSimS(0);
      }
      setIsSimulating(true);
    }
  };

  const isCopied = copiedId === item.id;
  const localizedName = isEnglish && item.name_en ? item.name_en : item.name;
  const localizedDesc = isEnglish && item.description_en ? item.description_en : item.description;

  // Determine category display style
  const getCategoryStyle = (tags = "") => {
    const t = tags.toLowerCase();
    if (t.includes("modern")) return { name: isEnglish ? "Modern" : "නවීන භෞතික විද්‍යාව", color: "bg-purple-950/40 text-purple-400 border-purple-800/50" };
    if (t.includes("ohm") || t.includes("resistors") || t.includes("current") || t.includes("magnetic")) return { name: isEnglish ? "Electricity" : "විද්‍යුත් & චුම්භක", color: "bg-blue-950/40 text-blue-400 border-blue-800/50" };
    if (t.includes("heat") || t.includes("gas") || t.includes("thermal")) return { name: isEnglish ? "Thermal" : "තාපය", color: "bg-orange-950/40 text-orange-400 border-orange-800/50" };
    if (t.includes("wave") || t.includes("oscillation")) return { name: isEnglish ? "Waves" : "දෝලන & තරංග", color: "bg-teal-950/40 text-teal-400 border-teal-800/50" };
    if (t.includes("density") || t.includes("pressure") || t.includes("upthrust")) return { name: isEnglish ? "Matter" : "පදාර්ථයේ ගුණ", color: "bg-emerald-950/40 text-emerald-400 border-emerald-800/50" };
    return { name: isEnglish ? "Mechanics" : "යාන්ත්‍ර විද්‍යාව", color: "bg-red-950/40 text-red-400 border-red-800/50" };
  };

  const catDetails = getCategoryStyle(item.tags);

  return (
    <div className="perspective-1000 w-full h-[380px] md:h-[400px] select-none">
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
        
        {/* ========================================================
            FRONT SIDE (The Formula Card)
            ======================================================== */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-slate-950 border border-slate-900 p-6 flex flex-col justify-between shadow-2xl overflow-hidden hover:border-blue-500/40 transition-colors duration-300 group">
          
          {/* Subtle Cybernetic Background Details */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all duration-500" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-500" />

          <div>
            {/* Header badges */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-extrabold text-slate-500 tracking-wider">
                FORMULA #{item.id.toString().padStart(2, "0")}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${catDetails.color}`}>
                {catDetails.name}
              </span>
            </div>

            {/* Formula Title */}
            <h3 className="text-base md:text-lg font-extrabold text-white leading-snug group-hover:text-blue-400 transition-colors">
              {localizedName}
            </h3>

            {/* Formula Description */}
            <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed line-clamp-3">
              {localizedDesc}
            </p>
          </div>

          {/* Glowing Chalkboard Formula Box */}
          <div className="relative bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[90px] md:min-h-[110px] overflow-hidden shadow-inner group-hover:border-blue-500/30 transition-colors duration-300 my-4">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Copy Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(item.formula, item.id);
              }}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
              title={isEnglish ? "Copy LaTeX Formula" : "සූත්‍රය Copy කරන්න"}
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <div className="text-xl md:text-2xl text-cyan-400 font-bold select-all text-center leading-relaxed max-w-full overflow-x-auto scrollbar-none">
              <Latex math={item.formula} block={true} />
            </div>
          </div>

          {/* Footer Panel */}
          <div className="pt-3 border-t border-slate-900 flex items-center justify-between z-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">SI Unit</span>
              <span className="text-xs font-bold text-slate-300">
                <Latex math={item.unit} />
              </span>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 cursor-pointer border border-blue-500/20"
            >
              {isEnglish ? "View Example" : "උදාහරණයක් බලන්න"} 🔄
            </button>
          </div>
        </div>

        {/* ========================================================
            BACK SIDE (The Interactive Example)
            ======================================================== */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-slate-950 border border-slate-900 p-6 flex flex-col justify-between shadow-2xl text-left overflow-y-auto">
          
          <div className="space-y-4">
            {/* Header badges */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold text-blue-400 tracking-wider">
                {isEnglish ? "INTERACTIVE EXAMPLE" : "ප්‍රායෝගික උදාහරණය"}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${catDetails.color}`}>
                {catDetails.name}
              </span>
            </div>

            {/* Formula Title on back */}
            <h4 className="text-sm font-bold text-white leading-tight">
              {localizedName}
            </h4>

            {/* Interactive Simulation Area */}
            {item.id === 1 && (
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-3.5 space-y-3.5">
                {/* Scenario text */}
                <p className="text-xs text-slate-350 leading-relaxed font-medium bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                  🚗 <span className="font-bold text-blue-400">{isEnglish ? "Scenario: " : "සිද්ධිය: "}</span>
                  {isEnglish
                    ? "A car starts from rest (u = 0) and accelerates at 2 ms⁻² for 5 seconds."
                    : "මෝටර් රථයක් නිශ්චලතාවයේ සිට 2 ms⁻² ක නියත ත්වරණයකින් තත්පර 5ක් ගමන් කරයි."}
                </p>

                {/* Physics Track Visualization */}
                <div className="relative h-12 bg-slate-950 border border-slate-900 rounded-lg overflow-hidden flex items-end pb-1.5 px-3">
                  {/* Distance Markers */}
                  <div className="absolute inset-x-0 bottom-0.5 flex justify-between px-2 text-[8px] text-slate-650 select-none">
                    <span>0m</span>
                    <span>5m</span>
                    <span>10m</span>
                    <span>15m</span>
                    <span>20m</span>
                    <span>25m</span>
                  </div>
                  
                  {/* Road centerline dash pattern */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-slate-800/40 h-0 w-full" />
                  
                  {/* Animating Car */}
                  <div
                    className="absolute bottom-3 text-xl transition-all duration-75 ease-out"
                    style={{ left: `${(simS / 25) * 82 + 2}%` }}
                  >
                    🚗
                  </div>
                </div>

                {/* Live Readout / Calculations */}
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-900/80 font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500">Initial u:</span> 0 ms⁻¹
                  </div>
                  <div>
                    <span className="text-slate-500">Accel a:</span> 2 ms⁻²
                  </div>
                  <div>
                    <span className="text-slate-500">Time t:</span>{" "}
                    <span className="text-cyan-400 font-bold">{simTime.toFixed(1)} s</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Distance s:</span>{" "}
                    <span className="text-indigo-400">{simS.toFixed(1)} m</span>
                  </div>
                  <div className="col-span-2 mt-1.5 pt-1.5 border-t border-slate-900 flex justify-between items-center text-xs font-bold text-slate-200">
                    <span>Result Velocity v:</span>
                    <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded">
                      v = 0 + (2 × {simTime.toFixed(1)}) = <span className="font-mono text-[13px]">{simV.toFixed(1)} ms⁻¹</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {item.id === 2 && (
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-3.5 space-y-3.5">
                <p className="text-xs text-slate-350 leading-relaxed font-medium bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                  🚗 <span className="font-bold text-blue-400">{isEnglish ? "Scenario: " : "සිද්ධිය: "}</span>
                  {isEnglish
                    ? "A car starts with 5 ms⁻¹ (u = 5) and accelerates at 2 ms⁻² for 4 seconds."
                    : "මෝටර් රථයක් 5 ms⁻¹ ක ආරම්භක ප්‍රවේගයෙන් සහ 2 ms⁻² ක නියත ත්වරණයකින් තත්පර 4ක් ගමන් කරයි."}
                </p>

                {/* Physics Track */}
                <div className="relative h-12 bg-slate-950 border border-slate-900 rounded-lg overflow-hidden flex items-end pb-1.5 px-3">
                  <div className="absolute inset-x-0 bottom-0.5 flex justify-between px-2 text-[8px] text-slate-650 select-none">
                    <span>0m</span>
                    <span>10m</span>
                    <span>20m</span>
                    <span>30m</span>
                    <span>36m</span>
                  </div>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-slate-800/40 h-0 w-full" />
                  <div
                    className="absolute bottom-3 text-xl transition-all duration-75 ease-out"
                    style={{ left: `${(simS / 36) * 82 + 2}%` }}
                  >
                    🚗
                  </div>
                </div>

                {/* Calculation */}
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-900/80 font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500">Initial u:</span> 5 ms⁻¹
                  </div>
                  <div>
                    <span className="text-slate-500">Accel a:</span> 2 ms⁻²
                  </div>
                  <div>
                    <span className="text-slate-500">Time t:</span>{" "}
                    <span className="text-cyan-400 font-bold">{simTime.toFixed(1)} s</span>
                  </div>
                  <div className="col-span-2 mt-1.5 pt-1.5 border-t border-slate-900 flex justify-between items-center text-xs font-bold text-slate-200">
                    <span>Result s:</span>
                    <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded">
                      s = (5×{simTime.toFixed(1)}) + (0.5×2×{simTime.toFixed(1)}²) = <span className="font-mono text-[13px]">{simS.toFixed(1)} m</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {item.id === 4 && (
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-3.5 space-y-3.5">
                <p className="text-xs text-slate-350 leading-relaxed font-medium bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                  📦 <span className="font-bold text-blue-400">{isEnglish ? "Scenario: " : "සිද්ධිය: "}</span>
                  {isEnglish
                    ? "A 5 kg block (m = 5) is pushed with an acceleration of 4 ms⁻² (a = 4)."
                    : "5 kg ස්කන්ධයක් ඇති වස්තුවකට 4 ms⁻² ක ත්වරණයක් ලබා දීමට අවශ්‍ය බලය."}
                </p>

                {/* Block Physics Track */}
                <div className="relative h-12 bg-slate-950 border border-slate-900 rounded-lg overflow-hidden flex items-center px-4">
                  <div className="absolute inset-x-0 bottom-0.5 flex justify-between px-2 text-[8px] text-slate-650 select-none">
                    <span>Start</span>
                    <span>End</span>
                  </div>
                  {/* Push Arrow & Box */}
                  <div 
                    className="absolute flex items-center gap-1 transition-all duration-75 ease-out"
                    style={{ left: `${(simS / 18) * 60 + 5}%` }}
                  >
                    <span 
                      className="text-amber-500 font-bold transition-all duration-300"
                      style={{ 
                        fontSize: isSimulating ? '16px' : '12px',
                        textShadow: '0 0 8px rgba(245, 158, 11, 0.8)' 
                      }}
                    >
                      {isSimulating ? "⚡ ➔" : "➔"}
                    </span>
                    <span className="text-2xl">📦</span>
                  </div>
                </div>

                {/* Calculation */}
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-900/80 font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500">Mass m:</span> 5 kg
                  </div>
                  <div>
                    <span className="text-slate-500">Accel a:</span> 4 ms⁻²
                  </div>
                  <div className="col-span-2 mt-1.5 pt-1.5 border-t border-slate-900 flex justify-between items-center text-xs font-bold text-slate-200">
                    <span>Required Force F:</span>
                    <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded">
                      F = 5 × 4 = <span className="font-mono text-[13px]">20 N</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {item.id === 19 && (
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-3.5 space-y-3.5">
                <p className="text-xs text-slate-350 leading-relaxed font-medium bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                  🌊 <span className="font-bold text-blue-400">{isEnglish ? "Scenario: " : "සිද්ධිය: "}</span>
                  {isEnglish
                    ? "A wave oscillates at a frequency of 10 Hz with a wavelength of 0.5 m."
                    : "10 Hz ක සංඛ්‍යාතයකින් යුත් තරංගයක තරංග ආයාමය 0.5 m වේ."}
                </p>

                {/* Wave simulation */}
                <div className="relative h-12 bg-slate-950 border border-slate-900 rounded-lg overflow-hidden flex items-center justify-center px-4">
                  <svg className="w-full h-8 stroke-cyan-400 fill-none" viewBox="0 0 100 20">
                    <path
                      d={
                        isSimulating
                          ? `M 0 10 Q 12.5 ${10 + 6 * Math.sin(simTime * 6)}, 25 10 T 50 10 T 75 10 T 100 10`
                          : "M 0 10 Q 12.5 4, 25 10 T 50 10 T 75 10 T 100 10"
                      }
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Calculation */}
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-900/80 font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500">Frequency f:</span> 10 Hz
                  </div>
                  <div>
                    <span className="text-slate-500">Wavelength λ:</span> 0.5 m
                  </div>
                  <div className="col-span-2 mt-1.5 pt-1.5 border-t border-slate-900 flex justify-between items-center text-xs font-bold text-slate-200">
                    <span>Wave Speed v:</span>
                    <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded">
                      v = 10 × 0.5 = <span className="font-mono text-[13px]">5 ms⁻¹</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback breakdown/generic info for other formulas */}
            {![1, 2, 4, 19].includes(item.id) && (
              <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-4 space-y-4">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2">
                  {isEnglish ? "Variable Breakdown" : "භෞතික රාශි විග්‍රහය"}
                </h5>
                <div className="space-y-2 text-xs text-slate-350">
                  {/* Generic description */}
                  <p className="italic text-[11px] text-slate-450 leading-relaxed">
                    {localizedDesc}
                  </p>
                  
                  {/* Parameter explanation wrapper */}
                  <div className="pt-2">
                    <p className="font-bold text-blue-400 text-[10px] mb-1 uppercase tracking-wider">
                      {isEnglish ? "Formula variables:" : "සමීකරණයේ සංකේත:"}
                    </p>
                    <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-3 flex flex-col justify-center items-center font-mono text-cyan-400 font-bold min-h-[50px]">
                      <Latex math={item.formula} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Simulation Buttons & Back Button */}
          <div className="pt-3 border-t border-slate-900 flex items-center justify-between z-10">
            {/* Simulation controls */}
            {[1, 2, 4, 19].includes(item.id) ? (
              <div className="flex gap-2">
                <button
                  onClick={toggleSimulation}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-cyan-400 hover:text-cyan-300 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm"
                  title={isSimulating ? (isEnglish ? "Pause" : "නතර කරන්න") : (isEnglish ? "Run simulation" : "ධාවනය කරන්න")}
                >
                  <Play className={`w-3.5 h-3.5 ${isSimulating ? "animate-pulse fill-cyan-400" : ""}`} />
                  <span className="text-[10px]">{isSimulating ? (isEnglish ? "Pause" : "නවතන්න") : (isEnglish ? "Run" : "ධාවනය")}</span>
                </button>
                <button
                  onClick={resetSimulation}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  title={isEnglish ? "Reset" : "ප්‍රතිසම්භූත කරන්න"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {isEnglish ? "Interactive Card" : "අන්තර්ක්‍රියාකාරී"}
              </div>
            )}

            {/* Back flip button */}
            <button
              onClick={() => setIsFlipped(false)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-800 hover:border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-sm"
            >
              {isEnglish ? "Back" : "ආපසු හැරෙන්න"} ↩️
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
