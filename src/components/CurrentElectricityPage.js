'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, Zap, RefreshCw, Sliders, AlertTriangle, ArrowLeft } from 'lucide-react';

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
              <li>• <strong className="text-slate-800">කර්චොෆ් 2 වන නියමය:</strong> ඕනෑම සංවෘත පරිපථ පුඩුවක් වටා විභව අන්තරයන්ගේ වීජීය එකතුව ශුන්‍ය වේ (ΣV = 0). මෙය ශක්ති සංරක්ෂණ නියමයයි.</li>
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

        {/* සම්පත් පොත් සාරාංශය: ධාරා විද්‍යුතය */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> සම්පත් පොත් සාරාංශය: ධාරා විද්‍යුතය
          </h2>

          {/* 1. විද්‍යුත් ධාරාව සහ ඕම්ගේ නියමය */}
          <Accordion title="01. විද්‍යුත් ධාරාව සහ ඕම්ගේ නියමය (Current and Ohm's Law)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>විද්‍යුත් ධාරාව (I):</strong> සන්නායකයක හරස්කඩක් හරහා ආරෝපණ ගලා යාමේ සීඝ්‍රතාවයි.</li>
                  <li><strong>ප්ලාවිත ප්‍රවේගය (Drift Velocity - v):</strong> සන්නායකයක් තුළින් ධාරාව ගමන් කිරීමේදී නිදහස් ඉලෙක්ට්‍රෝන චලනය වන මධ්‍යන්‍ය වේගයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>I = Q / t</li>
                  <li>I = nAev (n = ඒකක පරිමාවක නිදහස් ඉලෙක්ට්‍රෝන ගණන, A = හරස්කඩ වර්ගඵලය, e = ඉලෙක්ට්‍රෝනයක ආරෝපණය, v = ප්ලාවිත ප්‍රවේගය)</li>
                  <li>ඕම්ගේ නියමය: V = IR</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ඕම්ගේ නියමය වලංගු වන්නේ සන්නායකයේ උෂ්ණත්වය සහ අනෙකුත් භෞතික තත්ත්ව නියතව පවතින තාක් කල් පමණි.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">I = nAev සමීකරණයට අනුව, වයරයක හරස්කඩ වර්ගඵලය (A) අඩු වන විට ප්ලාවිත ප්‍රවේගය (v) වැඩි වේ.</p>
              </div>
            </div>
          </Accordion>

          {/* 2. ප්‍රතිරෝධය සහ ප්‍රතිරෝධකතාව */}
          <Accordion title="02. ප්‍රතිරෝධය සහ ප්‍රතිරෝධකතාව (Resistance and Resistivity)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ප්‍රතිරෝධකතාව (ρ):</strong> ද්‍රව්‍යයක ඒකක දිගකින් සහ ඒකක හරස්කඩ වර්ගඵලයකින් යුත් කොටසක ප්‍රතිරෝධයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>R = ρ * l / A</li>
                  <li>ප්‍රතිරෝධ ශ්‍රේණිගතව: R = R₁ + R₂ + R₃</li>
                  <li>ප්‍රතිරෝධ සමාන්තරගතව: 1/R = 1/R₁ + 1/R₂ + 1/R₃</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ලෝහවල උෂ්ණත්වය වැඩි වන විට එහි ප්‍රතිරෝධය වැඩි වේ [R_θ = R_0(1 + αθ)]. අර්ධ සන්නායකවල උෂ්ණත්වය වැඩි වන විට ප්‍රතිරෝධය අඩු වේ.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ලෝහ කම්බියක් ඇද එහි දිග මුල් දිග මෙන් දෙගුණයක් (2l) කළහොත්, එහි පරිමාව නියත බැවින් වර්ගඵලය අඩක් වේ (A/2). මේ නිසා නව ප්‍රතිරෝධය 4 ගුණයකින් වැඩි වේ.</p>
              </div>
            </div>
          </Accordion>

          {/* 3. විද්‍යුත් ගාමක බලය සහ කර්චොෆ් නියම */}
          <Accordion title="03. විද්‍යුත් ගාමක බලය සහ කර්චොෆ් නියම (EMF and Kirchhoff&apos;s Laws)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>විද්‍යුත් ගාමක බලය (EMF - E):</strong> කෝෂයක් තුළින් ඒකක ධන ආරෝපණයක් ගෙන යාමේදී කෝෂය මගින් ලබා දෙන ශක්තියයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>විභව අන්තරය: V = E - Ir (කෝෂය විසර්ජනය වන විට)</li>
                  <li>කර්චොෆ්ගේ පළමු නියමය: ΣI = 0 (සන්ධියකට එන සහ පිටවන ධාරාවල වීජීය ඓක්‍යය ශුන්‍ය වේ)</li>
                  <li>කර්චොෆ්ගේ දෙවන නියමය: ΣE = ΣIR (සංවෘත පුඩුවක)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>කර්චොෆ්ගේ පළමු නියමය මගින් ආරෝපණ සංස්ථිතිය ද, දෙවන නියමය මගින් ශක්ති සංස්ථිතිය ද නියෝජනය වේ.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">කර්චොෆ් දෙවන නියමය සංවෘත පුඩුවකට යෙදීමේදී එකම අතට ගමන් කරමින් (දක්ෂිණාවර්තව හෝ වාමාවර්තව) කෝෂවල (+) හෝ (-) දිශාවන් නිවැරදිව ආදේශ කළ යුතුමය.</p>
              </div>
            </div>
          </Accordion>

          {/* 4. මිනුම් උපකරණ: මීටර් සේතුව සහ විභවමානය */}
          <Accordion title="04. මිනුම් උපකරණ: මීටර් සේතුව සහ විභවමානය (Measuring Instruments)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>විභවමානය (Potentiometer):</strong> පරිපථයකින් කිසිදු ධාරාවක් ලබා නොගෙන (ශුන්‍ය උත්ක්‍රමණ ක්‍රමයට) විභව අන්තරයක් හෝ වි.ගා.බ. ඉතා නිවැරදිව මැනිය හැකි උපකරණයකි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>මීටර් සේතුව (වීට්ස්ටන් සේතු මූලධර්මය): P / Q = l₁ / l₂</li>
                  <li>විභවමානය: සමතුලිත දිග මනින විභවයට සමානුපාතික වේ (V ∝ l)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>විභවමානයේ සමතුලිත ලක්ෂ්‍යය කම්බියේ මැදට වන්නට ලබා ගැනීමෙන් කියවීමේ ප්‍රතිශත දෝෂය අවම කරගත හැක.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">විභවමාන පරීක්ෂණයක් සාර්ථක වීමට නම්, ප්‍රධාන පරිපථයේ ඇති කෝෂයේ වි.ගා.බ. අනිවාර්යයෙන්ම මනිනු ලබන කෝෂයේ වි.ගා.බ. ට වඩා විශාල විය යුතුය (E &gt; E_x). එසේ නොමැති නම් කම්බිය මත සමතුලිත ලක්ෂ්‍යයක් නොලැබේ.</p>
              </div>
            </div>
          </Accordion>

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
