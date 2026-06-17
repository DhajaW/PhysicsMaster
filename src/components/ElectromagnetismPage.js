'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, Zap, ArrowLeft } from 'lucide-react';

export default function ElectromagnetismPage() {
  // Simulator States
  const [magnetPosition, setMagnetPosition] = useState(0); // 0 (Far) to 100 (Inside Coil)
  const [magnetDirection, setMagnetDirection] = useState('none'); // forward, backward, none
  const [galvanoDeflection, setGalvanoDeflection] = useState(0); // -45 to 45 degrees
  const [inducedPole, setInducedPole] = useState(''); // N, S, or none

  // Handle Magnet Movement
  const moveMagnetIn = () => {
    setMagnetDirection('forward');
    setMagnetPosition(100);
    setGalvanoDeflection(35); // Deflects right when entering
    setInducedPole('N'); // Lenz's Law: Opposes incoming North pole by creating a North pole
  };

  const moveMagnetOut = () => {
    setMagnetDirection('backward');
    setMagnetPosition(0);
    setGalvanoDeflection(-35); // Deflects left when leaving
    setInducedPole('S'); // Lenz's Law: Opposes leaving North pole by creating a South pole
  };

  const stopMagnet = () => {
    setMagnetDirection('none');
    setGalvanoDeflection(0); // No relative motion = No induced EMF (Faraday's Law)
    setInducedPole('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-purple-500/30 border border-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 08</span>
            <h1 className="text-3xl font-bold mt-2">විද්‍යුත් චුම්භකත්වය (Electromagnetism)</h1>
            <p className="text-purple-100 text-sm mt-1">චුම්භක ක්ෂේත්‍ර, මෝටර් සංකල්ප, ෆැරඩේ නියම සහ ලෙන්ස් නියමයේ සැබෑ භාවිතය.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">ෆැරඩේ නියමය:</strong> පරිපථයක් සමග බද්ධ වී පවතින චුම්භක ස්‍රාව බද්ධතාව වෙනස් වන විට, පරිපථය තුළ විද්‍යුත් ගාමක බලයක් (වි.ගා.බ.) ප්‍රේරණය වේ. ප්‍රේරිත වි.ගා.බ. අගය, ස්‍රාව බද්ධතාව වෙනස් වීමේ සීඝ්‍රතාවට අනුලෝමව සමානුපාතික වේ.</li>
              <li>• <strong className="text-slate-800">ලෙන්ස් නියමය (Lenz's Law):</strong> ප්‍රේරිත විද්‍යුත් ධාරාව ගලා යන්නේ එය ඇති කිරීමට හේතු වූ චුම්භක ස්‍රාව වෙනස් වීම හෝ චලිතය "විරුද්ධ වන" දිශාවටයි.</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg">
                <span className="font-bold text-purple-800 block">⚠️ සාපේක්ෂ චලිතයේ වැදගත්කම:</span>
                "චුම්භකයක් දඟරයක් තුළ නිශ්චලව තිබෙන විට ප්‍රේරිත ධාරාව කුමක්ද?" කියා විභාගයේදී ඇසුවොත් පිළිතුර ශුන්‍ය (Zero) වේ. ස්‍රාව වෙනස් වීමට නම් අනිවාර්යයෙන්ම "සාපේක්ෂ චලිතයක්" තිබිය යුතුය.
              </div>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg">
                <span className="font-bold text-purple-800 block">⚠️ ක්ෂේත්‍ර රේඛාවල දිශා ඊතල:</span>
                චුම්භක ක්ෂේත්‍ර රේඛා අඳින විට සෑමවිටම උතුරු (N) ධ්‍රැවයෙන් පිටතටත්, දකුණු (S) ධ්‍රැවය දෙසටත් ඊතල දැක්විය යුතුය. ඊතල නොදැක්වුවහොත් ලකුණු නොලැබේ.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Induction Simulator Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2">🧲 Electromagnetic Induction Simulator (ලෙන්ස් නියම පුවරුව)</h3>
            <p className="text-slate-400 text-xs mt-1">චුම්භකය දඟරය දෙසට චලනය කරමින් ප්‍රේරිත වි.ගා.බ. සහ ධ්‍රැවීයතාව සජීවීව අධ්‍යයනය කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Controller Buttons Box */}
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">චුම්භකය චලනය කරන්න:</label>
                
                <button 
                  onMouseDown={moveMagnetIn}
                  onMouseUp={stopMagnet}
                  onTouchStart={moveMagnetIn}
                  onTouchEnd={stopMagnet}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold p-3 rounded-lg text-xs flex justify-between items-center transition shadow-sm cursor-pointer"
                >
                  <span>➡️ දඟරය තුළට ඇතුළු කරන්න (Hold)</span>
                </button>

                <button 
                  onMouseDown={moveMagnetOut}
                  onMouseUp={stopMagnet}
                  onTouchStart={moveMagnetOut}
                  onTouchEnd={stopMagnet}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold p-3 rounded-lg text-xs flex justify-between items-center transition shadow-sm cursor-pointer"
                >
                  <span>⬅️ දඟරයෙන් පිටතට අදින්න (Hold)</span>
                </button>
              </div>

              <div className="p-3 bg-slate-900 text-slate-300 text-xs rounded-xl font-mono mt-4">
                <span className="text-amber-400 font-bold">💡 ක්‍රියාකරන රීතිය:</span> බටන් එක ඔබාගෙන සිටින විට (චලිතය පවතින තාක්) පමණක් ධාරාවක් ප්‍රේරණය වේ. අත හැරිය සැණින් චලිතය නැවතී දර්ශකය 0 වේ.
              </div>
            </div>

            {/* Visual Screen with SVG Coil, Magnet and Galvanometer */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="bg-slate-950 rounded-xl p-4 min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden border border-slate-900">
                
                {/* SVG Visual Display */}
                <svg viewBox="0 0 440 180" className="w-full h-auto">
                  
                  {/* Galvanometer Screen representation inside SVG */}
                  <g transform="translate(60, 90)">
                    <circle cx="0" cy="0" r="30" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
                    <line x1="0" y1="0" x2={galvanoDeflection * 0.5} y2={-22} stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="0" y="20" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">G</text>
                  </g>

                  {/* Wire Connections to Coil */}
                  <path d="M 60,120 L 180,140" fill="none" stroke="#64748b" strokeWidth="2" />
                  <path d="M 60,60 L 180,40" fill="none" stroke="#64748b" strokeWidth="2" />

                  {/* Copper Coil Loops (දඟරය) */}
                  <g transform="translate(180, 40)" fill="none" stroke="#b45309" strokeWidth="4">
                    <path d="M 0,20 C 20,20 20,80 0,80 C -20,80 -20,20 0,20 Z" />
                    <path d="M 20,20 C 40,20 40,80 20,80 C 0,80 0,20 20,20 Z" />
                    <path d="M 40,20 C 60,20 60,80 40,80 C 20,80 20,20 40,20 Z" />
                    <text x="-25" y="55" fill="#f59e0b" fontSize="14" fontWeight="bold" stroke="none">
                      {inducedPole && `[${inducedPole}]`}
                    </text>
                    <text x="20" y="-10" fill="#cbd5e1" fontSize="10" stroke="none" textAnchor="middle">කම්බි දඟරය</text>
                  </g>

                  {/* Moving Bar Magnet (චුම්භකය) */}
                  {/* Sliding X placement based on state */}
                  <g transform={`translate(${300 + (magnetPosition === 100 ? -50 : 0)}, 65)`}>
                    <rect x="0" y="0" width="50" height="30" fill="#ef4444" rx="2" />
                    <rect x="50" y="0" width="50" height="30" fill="#3b82f6" rx="2" />
                    <text x="25" y="20" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">N</text>
                    <text x="75" y="20" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">S</text>
                  </g>
                </svg>

                {/* Status Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-mono text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
                  {magnetDirection === 'forward' && '➡️ ලෙන්ස් නියමය: දඟරය උතුරු ධ්‍රැවයක් [N] සාදමින් චුම්භකය ඒම විරුද්ධ කරයි!'}
                  {magnetDirection === 'backward' && '⬅️ ලෙන්ස් නියමය: දඟරය දකුණු ධ්‍රැවයක් [S] සාදමින් චුම්භකය ඈත්වීම විරුද්ධ කරයි!'}
                  {magnetDirection === 'none' && '✨ සාපේක්ෂ චලිතයක් නැත ⇒ ප්‍රේරිත ධාරාව = 0'}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
