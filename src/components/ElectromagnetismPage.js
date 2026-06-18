'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, Zap, ArrowLeft } from 'lucide-react';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-none py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-slate-800 hover:text-indigo-650 transition-colors py-2 focus:outline-none"
      >
        <span className="text-base md:text-lg">{title}</span>
        <svg
          className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

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

        {/* සම්පත් පොත් සාරාංශය: චුම්භක ක්ෂේත්‍ර */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> සම්පත් පොත් සාරාංශය: චුම්භක ක්ෂේත්‍ර (විද්‍යුත් චුම්භකත්වය)
          </h2>

          {/* 1. චුම්භක ක්ෂේත්රයක් තුළ ආරෝපණ සහ ධාරා මත බලය */}
          <Accordion title="01. චුම්භක ක්ෂේත්රයක් තුළ ආරෝපණ සහ ධාරා මත බලය">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <p>ගමන් කරන විද්යුත් ආරෝපණයක් හෝ ධාරාවක් ගෙනයන සන්නායකයක් චුම්භක ක්ෂේත්රයක් තුළ තැබූ විට ඒ මත චුම්භක බලයක් ක්රියා කරයි.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>ආරෝපණයක් මත බලය: F = Bqv sin θ</li>
                  <li>ධාරා සන්නායකයක් මත බලය: F = BIl sin θ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>චුම්භක බලයේ දිශාව <strong>ෆ්ලෙමින්ගේ වමත් නියමය (Fleming&apos;s Left Hand Rule)</strong> මගින් සොයාගත හැක.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ආරෝපණයක් චුම්භක ක්ෂේත්රයට <strong>සමාන්තරව</strong> ගමන් කරන විට හෝ <strong>නිශ්චලව</strong> පවතින විට ඒ මත චුම්භක බලයක් ක්රියා නොකරයි (v = 0 හෝ θ = 0 බැවින් බලය ශුන්ය වේ).</p>
              </div>
            </div>
          </Accordion>

          {/* 2. චුම්භක ස්රාව ඝනත්වය සහ බයෝ-සවා නියමය */}
          <Accordion title="02. චුම්භක ස්රාව ඝනත්වය සහ බයෝ-සවා නියමය (Biot-Savart Law)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <p><strong>බයෝ-සවා නියමය (Biot-Savart Law):</strong> ධාරා අංශුවක් මගින් යම් ලක්ෂ්යයක ඇති කරන චුම්භක ස්රාව ඝනත්වය සෙවීම සඳහා භාවිතා වේ.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>අනන්ත දිග සෘජු කම්බියකට: B = μ₀ I / (2π r)</li>
                  <li>වෘත්තාකාර දඟරයක කේන්ද්රයේ: B = μ₀ NI / (2r)</li>
                  <li>පරිනාලිකාවක (Solenoid) අක්ෂය මත: B = μ₀ nI</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>චුම්භක ක්ෂේත්රයේ දිශාව <strong>දකුණත් ග්රහණ නියමය (Right Hand Grip Rule)</strong> භාවිතයෙන් සෙවිය හැක.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ධාරා ගෙනයන සමාන්තර සන්නායක දෙකක ධාරාව <strong>එකම දිශාවට</strong> ගමන් කරන විට ඒවා එකිනෙක <strong>ආකර්ෂණය</strong> වේ. විරුද්ධ දිශාවන්ට ගමන් කරන විට විකර්ෂණය වේ.</p>
              </div>
            </div>
          </Accordion>

          {/* 3. හෝල් ආචරණය */}
          <Accordion title="03. හෝල් ආචරණය (Hall Effect)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <p><strong>හෝල් ආචරණය (Hall Effect):</strong> ධාරාවක් ගමන් කරන සන්නායකයක් හරහා ලම්බකව චුම්භක ක්ෂේත්රයක් යෙදූ විට, සන්නායකයේ හරස්කඩ දෙපසින් විභව අන්තරයක් හටගැනීමේ සංසිද්ධියයි.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>හෝල් වෝල්ටීයතාවය: V_H = Bvd (v = ප්ලාවිත ප්රවේගය, d = පළල)</li>
                  <li>හෝල් විද්යුත් ක්ෂේත්රය: E = Bv</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>මෙය යම් ද්රව්යයක ආරෝපණ වාහක වර්ගය (ඉලෙක්ට්රෝන ද එසේත් නැත්නම් කුහර ද යන්න) හඳුනා ගැනීමට ප්රායෝගිකව යොදා ගැනේ.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ගණනය කිරීම් වලදී ලෝහ පටියක් තුළ ඉලෙක්ට්රෝන චලනය වන දිශාව, <strong>සම්මත ධාරාව ගමන් කරන දිශාවට ප්රතිවිරුද්ධ</strong> බව මතක තබා ගන්න.</p>
              </div>
            </div>
          </Accordion>

          {/* 4. විද්යුත් චුම්භක ප්රේරණය */}
          <Accordion title="04. විද්යුත් චුම්භක ප්රේරණය (Electromagnetic Induction)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ෆැරඩේ නියමය (Faraday&apos;s Law):</strong> පරිපථයක් හා සම්බන්ධ චුම්භක ස්රාවය වෙනස් වීමේදී එහි ප්රේරිත විද්යුත් ගාමක බලයක් හටගන්නා අතර, එය ස්රාවය වෙනස් වීමේ සීඝ්රතාවට අනුලෝමව සමානුපාතික වේ.</li>
                  <li><strong>ලෙන්ස් නියමය (Lenz&apos;s Law):</strong> ප්රේරිත විද්යුත් ධාරාවේ දිශාව සැමවිටම එය ඇතිවීමට හේතු වූ වෙනසට විරුද්ධ වන අයුරින් ක්රියා කරයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>E = -dΦ / dt (සෘණ ලකුණින් ලෙන්ස් නියමය දැක්වේ)</li>
                  <li>චලනය වන සෘජු සන්නායකයක් සඳහා: E = Blv</li>
                  <li>භ්රමණය වන දඟරයක (ජනක යන්ත්රයක) උපරිම ප්රේරිත වි.ගා.බ.: E = NABω</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ලෙන්ස් නියමය යනු <strong>ශක්ති සංරක්ෂණ මූලධර්මයේම</strong> තවත් මුහුණුවරක් බව විභාග ප්රශ්නවල නිතර අසනු ලැබේ. ප්රේරිත දිශාව සෙවීමට ෆ්ලෙමින්ගේ දකුණත් නියමය (Fleming&apos;s Right Hand Rule) භාවිත කරන්න.</li>
                </ul>
              </div>
            </div>
          </Accordion>

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
