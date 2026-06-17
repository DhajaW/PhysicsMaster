'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, Zap, RefreshCw, Sliders, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function CurrentElectricityPage() {
  // --- Simulator 1: Ohm's Law States ---
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(6);
  const [current, setCurrent] = useState(2);
  const [showOverload, setShowOverload] = useState(false);

  // --- Simulator 2: Potentiometer States ---
  const [cellEmf, setCellEmf] = useState(1.5); // Unknown cell EMF
  const [jockeyPos, setJockeyPos] = useState(0); // 0 to 100cm
  const driverEmf = 2.0; // Driver cell (Standard)
  const balanceLength = (cellEmf / driverEmf) * 100;
  const [nullFound, setNullFound] = useState(false);

  // Ohm's Law Logic
  useEffect(() => {
    const i = voltage / resistance;
    setCurrent(parseFloat(i.toFixed(2)));
    setShowOverload(i > 4);
  }, [voltage, resistance]);

  // Potentiometer Check
  const checkBalance = () => {
    if (Math.abs(jockeyPos - balanceLength) < 1) {
      setNullFound(true);
    } else {
      setNullFound(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-blue-500/30 border border-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 07</span>
            <h1 className="text-3xl font-bold mt-2">ධාරා විද්‍යුතය (Current Electricity)</h1>
            <p className="text-blue-100 text-sm mt-1">ඕම්ගේ නියමයේ සිට පොටෙන්ෂියෝමීටරයේ සියුම් මිනුම් දක්වා විභාග රහස්.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">ඕම්ගේ නියමය (V = IR):</strong> නියත භෞතික තත්ත්ව යටතේ සන්නායකයක් හරහා ගලා යන ධාරාව එහි අග්‍ර අතර විභව අන්තරයට අනුලෝමව සමානුපාතික වේ.</li>
              <li>• <strong className="text-slate-800">කාචොෆ් 2 නියමය:</strong> ඕනෑම සංවෘත පරිපථ පුඩුවක් වටා විභව අන්තරයන්ගේ වීජීය එකතුව ශුන්‍ය වේ (ΣV = 0). මෙය ශක්ති සංරක්ෂණ නියමයයි.</li>
              <li>• <strong className="text-slate-800">පොටෙන්ෂියෝමීටරය:</strong> විභව අන්තර මැනීමේ වඩාත් නිරවද්‍ය ක්‍රමයයි. මෙහිදී ධාරාව ලබා නොගන්නා බැවින් කෝෂයක වි.ගා.බ. සැබෑ ලෙසම මැනිය හැක.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-800 block">⚠️ පරිපථ සටහන්වල ධ්‍රැවීයතාව (+ / -):</span>
                විභාගයේදී ඇමීටර, වෝල්ට්මීටර සහ කෝෂවල ධන-සෘණ අග්‍ර මාරු කළහොත් මුළු පරිපථයටම ලකුණු අහිමි වේ!
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-800 block">⚠️ පොටෙන්ෂියෝමීටර රීතිය:</span>
                සමතුලිත ලක්ෂ්‍යයක් ලබා ගැනීමට නම්, ක්‍රියාකාරී කෝෂයේ (Driver Cell) වි.ගා.බ. සෑමවිටම මනිනු ලබන කෝෂයේ වි.ගා.බ. ට වඩා වැඩි විය යුතුය.
              </div>
            </div>
          </div>
        </div>

        {/* Simulator 1: Ohm's Law Interactive Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">⚡ Ohm's Law Simulator (ඕම්ගේ නියමය)</h3>
            <p className="text-slate-400 text-xs mt-1">වෝල්ටීයතාව සහ ප්‍රතිරෝධය වෙනස් කර ධාරාවට සිදුවන බලපෑම සජීවීව බලන්න.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border">
                <label className="text-xs font-bold text-slate-700 block mb-2">වෝල්ටීයතාව (V): {voltage} V</label>
                <input type="range" min="0" max="24" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
                <label className="text-xs font-bold text-slate-700 block mt-4 mb-2">ප්‍රතිරෝධය (R): {resistance} Ω</label>
                <input type="range" min="1" max="20" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full accent-emerald-600 cursor-pointer" />
              </div>
              <div className="p-4 bg-indigo-900 text-white rounded-xl font-mono text-center">
                I = V / R ⇒ <span className="text-yellow-400 font-bold">{current} A</span>
              </div>
            </div>
            <div className="bg-slate-950 rounded-xl flex items-center justify-center p-4 relative min-h-[200px]">
              <svg viewBox="0 0 300 150" className="w-full h-auto">
                <rect x="50" y="30" width="200" height="90" fill="none" stroke="#475569" strokeWidth="3" />
                {current > 0 && (
                  <rect x="50" y="30" width="200" height="90" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10,15" style={{ animation: `dash ${10/current}s linear infinite` }} />
                )}
                <text x="150" y="140" textAnchor="middle" fill="#fff" fontSize="12">ධාරාව ගලායන වේගය: {current} A</text>
              </svg>
              {showOverload && <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded animate-pulse">⚠️ අධික ධාරාවක්!</div>}
            </div>
          </div>
        </div>

        {/* Simulator 2: Potentiometer Null Point Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">📏 පොටෙන්ෂියෝමීටර පරීක්ෂණය (Null Point)</h3>
            <p className="text-slate-400 text-xs mt-1">ජොකිය (Jockey) සර්පණය කරමින් ගැල්වනෝමීටරය ශුන්‍ය වන ස්ථානය (සමතුලිත දිග) සොයන්න.</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-700 block mb-2">ජොකියේ පිහිටීම (l): {jockeyPos} cm</label>
              <input type="range" min="0" max="100" step="0.5" value={jockeyPos} onChange={(e) => setJockeyPos(Number(e.target.value))} className="w-full accent-purple-600 cursor-pointer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-100 rounded-xl p-8 flex flex-col items-center justify-center relative border-2 border-slate-300">
                 {/* Galvanometer Visualization */}
                 <div className="w-24 h-24 rounded-full border-4 border-slate-800 bg-white flex items-center justify-center relative">
                    <div 
                      className="w-1 h-16 bg-red-600 rounded-full transition-transform duration-200 origin-bottom" 
                      style={{ transform: `rotate(${(jockeyPos - balanceLength) * 2}deg)`, marginBottom: '40px' }}
                    ></div>
                    <span className="absolute bottom-2 font-bold text-slate-800">G</span>
                 </div>
                 <p className="mt-4 text-xs font-bold text-slate-600">ගැල්වනෝමීටර දර්ශකය</p>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <button onClick={checkBalance} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-lg text-sm transition cursor-pointer border-0">
                  සමතුලිතතාව පරීක්ෂා කරන්න
                </button>
                {nullFound ? (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-bounce">
                    🎉 නිවැරදියි! ශුන්‍ය විවර්තන අවස්ථාව ලැබුණි. සමතුලිත දිග = {jockeyPos} cm. <br />
                    එවිට: E = (V/L) × l
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-dashed rounded-xl text-xs text-slate-400 text-center">
                    ජොකිය චලනය කර දර්ශකය 0 ට එනතෙක් සකසන්න.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global CSS for Animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes dash { to { stroke-dashoffset: -100; } }
        ` }} />

      </div>
    </div>
  );
}
