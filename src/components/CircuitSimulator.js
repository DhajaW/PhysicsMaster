'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, AlertTriangle, Zap, HelpCircle } from 'lucide-react';

export default function CircuitSimulator() {
  // Simulator States
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(6); // Ohms
  const [current, setCurrent] = useState(2); // Amperes
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // ඕම්ගේ නියමය අනුව ධාරාව සජීවීව ගණනය කිරීම (I = V / R)
  useEffect(() => {
    if (resistance > 0) {
      const calculatedCurrent = voltage / resistance;
      setCurrent(parseFloat(calculatedCurrent.toFixed(2)));
      
      // ළමයා ප්රතිරෝධය ඕනෑවට වඩා අඩු කර ධාරාව 4A පැනලා ගියොත් Trap Alert එකක් දානවා
      if (calculatedCurrent > 4) {
        setShowErrorAlert(true);
      } else {
        setShowErrorAlert(false);
      }
    }
  }, [voltage, resistance]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden font-sans my-6">
      
      {/* Widget Header */}
      <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800">
        <div>
          <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Unit 07: Interactive Widget</span>
          <h2 className="text-2xl font-bold mt-2 flex items-center gap-2 text-white">
            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" /> ධාරා විද්යුත් ඕම්ගේ නියම Simulator එක
          </h2>
          <p className="text-slate-400 text-sm mt-1">පරිපථයේ වෝල්ටීයතාව සහ ප්රතිරෝධය වෙනස් කරමින් සජීවීව වෙනස්කම් නිරීක්ෂණය කරන්න.</p>
        </div>
        <button 
          onClick={() => { setVoltage(12); setResistance(6); }}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-lg border border-slate-700 transition"
        >
          <RefreshCw className="w-4 h-4" /> මුල සිට ආරම්භ කරන්න
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Sliders Controls */}
        <div className="lg:col-span-5 p-6 bg-slate-50 border-r border-slate-200 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Sliders className="w-4 h-4" /> පාලක පුවරුව (Controls)
            </h3>

            {/* Voltage Control Slider */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-700">🔋 වෝල්ටීයතාව (Voltage - V)</label>
                <span className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{voltage} V</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="24" 
                step="1"
                value={voltage} 
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0V</span>
                <span>12V</span>
                <span>24V</span>
              </div>
            </div>

            {/* Resistance Control Slider */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-700">🎛️ ප්රතිරෝධය (Resistance - R)</label>
                <span className="text-lg font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">{resistance} Ω</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="0.5"
                value={resistance} 
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1 Ω</span>
                <span>10 Ω</span>
                <span>20 Ω</span>
              </div>
            </div>
          </div>

          {/* Real-time Math Output */}
          <div className="mt-8 bg-indigo-950 text-white p-4 rounded-xl shadow-inner border border-indigo-800">
            <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider block mb-1">සූත්රය සහ ආදේශය (Ohm's Law)</span>
            <div className="font-mono text-base flex items-center justify-center py-2 bg-slate-900/50 rounded-lg border border-indigo-900">
              <span className="text-yellow-400 font-bold">I</span> &nbsp;=&nbsp; 
              <span className="text-blue-400">V</span> / <span className="text-emerald-400">R</span> &nbsp;⇒&nbsp; 
              <span className="font-bold text-yellow-400">{current}A</span> = {voltage}V / {resistance}Ω
            </div>
          </div>
        </div>

        {/* Right Side: Live Visual Circuit Diagram & Exam Traps */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-white">
          
          {/* Dynamic SVG Circuit Display */}
          <div className="flex-1 flex items-center justify-center p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl relative min-h-[250px]">
            
            <svg viewBox="0 0 400 240" className="w-full max-w-[360px] h-auto">
              {/* Main Main Wire Loop */}
              <path d="M 60,60 L 340,60 L 340,180 L 60,180 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
              
              {/* ධාරාව වැඩි වෙද්දී වේගයෙන් දුවන Dynamic Electron Flow Dots */}
              {current > 0 && (
                <path 
                  d="M 60,60 L 340,60 L 340,180 L 60,180 Z" 
                  fill="none" 
                  stroke="#fbbf24" 
                  strokeWidth="4" 
                  strokeDasharray="10, 15" 
                  strokeLinecap="round"
                  style={{
                    animation: `dash ${12 / current}s linear infinite`
                  }}
                />
              )}

              {/* Battery Component With Polarity Labels */}
              <g transform="translate(40, 120)">
                <line x1="20" y1="-30" x2="20" y2="0" stroke="#475569" strokeWidth="4" />
                <line x1="20" y1="30" x2="20" y2="60" stroke="#475569" strokeWidth="4" />
                <line x1="5" y1="0" x2="35" y2="0" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
                <line x1="12" y1="15" x2="28" y2="15" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
                <line x1="5" y1="30" x2="35" y2="30" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
                <line x1="12" y1="45" x2="28" y2="45" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
                
                {/* Exam Point: ධ්රැවීයතාව සටහන් කිරීම */}
                <text x="42" y="3" fill="#2563eb" fontSize="14" fontWeight="bold">+</text>
                <text x="42" y="52" fill="#475569" fontSize="14" fontWeight="bold">-</text>
                <text x="-15" y="30" fill="#1e293b" fontSize="12" fontWeight="bold">{voltage}V</text>
              </g>

              {/* Resistor Component */}
              <g transform="translate(160, 45)">
                <rect x="0" y="0" width="80" height="30" fill="#f1f5f9" stroke="#10b981" strokeWidth="4" rx="4" />
                <text x="40" y="20" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="bold">{resistance} Ω</text>
                <path d="M 5,15 L 15,7 L 25,23 L 35,7 L 45,23 L 55,7 L 65,23 L 75,15" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.4" />
              </g>

              {/* Ammeter Component */}
              <g transform="translate(315, 100)">
                <circle cx="25" cy="25" r="22" fill="#fff" stroke="#eab308" strokeWidth="4" />
                <text x="25" y="31" textAnchor="middle" fill="#a16207" fontSize="16" fontWeight="bold">A</text>
                <text x="54" y="29" fill="#a16207" fontSize="12" fontWeight="bold">{current} A</text>
              </g>
            </svg>

            {/* Badge Overlay */}
            <div className="absolute top-3 right-3 bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${current > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
              ධාරාව: {current} A
            </div>
          </div>

          {/* CSS Animation Tag for SVG Flow */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes dash {
              to {
                stroke-dashoffset: -100;
              }
            }
          `}} />

          {/* Dynamic Pedagogy Alerts (Paper Marking Tricks) */}
          <div className="mt-4">
            {showErrorAlert ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-red-800">⚠️ අධික ධාරා අනතුරු ඇඟවීම් (Overload Alert)</h4>
                  <p className="text-xs text-red-700 mt-1">ප්රතිරෝධය සීමාවට වඩා අඩු වීම නිසා පරිපථය හරහා විශාල ධාරාවක් ({current}A) ගලා යයි. විභාගයේදී මෙවැනි ප්රශ්න වලදී කෝෂයේ අභ්යන්තර ප්රතිරෝධය (r) නොසලකා හැරීමෙන් ළමයින්ගේ ලකුණු කැපී යයි!</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-800">💡 Paper Marking රහස: ධ්රැවීයතාව (+ / -)</h4>
                  <p className="text-xs text-amber-700 mt-1">ළමයි විභාගයේදී පරිපථ අඳින කොට වැඩිපුරම වරද්දන්නේ කෝෂයේ දිග ඉර ධන (+) සහ කෙටි ඉර සෘණ (-) ලෙස ලකුණු නොකිරීමයි. අපේ ඇප් එකෙන් ඒක නිතරම මතක් කරනවා.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
