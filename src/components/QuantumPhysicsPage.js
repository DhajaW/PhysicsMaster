'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, ArrowLeft } from 'lucide-react';

export default function QuantumPhysicsPage() {
  const [lightColor, setLightColor] = useState('red'); // red, green, uv
  const [electronsEjected, setElectronsEjected] = useState(false);
  const [quantumFeedback, setQuantumFeedback] = useState('');

  useEffect(() => {
    if (lightColor === 'uv') {
      setElectronsEjected(true);
      setQuantumFeedback('🎉 නියමයි! පාරජම්බුල (UV) කිරණවල සංඛ්‍යාතය දේහලී සංඛ්‍යාතයට (Threshold Frequency f0) වඩා වැඩි බැවින් ලෝහ තහඩුවෙන් ඉලෙක්ට්‍රෝන ක්ෂණිකව ගැලවී පිටතට විසි වේ! (E = hf - Φ)');
    } else {
      setElectronsEjected(false);
      setQuantumFeedback(`❌ ඉලෙක්ට්‍රෝන ගැලවෙන්නේ නැත! ${lightColor === 'red' ? 'රතු' : 'කොළ'} ආලෝකයේ ශක්තිය ලෝහයේ කාර්ය ශ්‍රිතයට (Work Function Φ) වඩා අඩුය. ආලෝකයේ තීව්‍රතාවය (දීප්තිය) කොතරම් වැඩි කළත් සංඛ්‍යාතය මදි නම් ඉලෙක්ට්‍රෝන කිසිවිටකත් ගැලවෙන්නේ නැත!`);
    }
  }, [lightColor]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-fuchsia-500/30 border border-fuchsia-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 11</span>
            <h1 className="text-3xl font-bold mt-2">පදාර්ථ හා විකිරණ (Matter and Radiation)</h1>
            <p className="text-fuchsia-100 text-sm mt-1">ක්වොන්ටම් භෞතික විද්‍යාව, එක්ස්-කිරණ, ප්‍රකාශ විද්‍යුත් ආචරණය සහ විකිරණශීලිතාව.</p>
          </div>
        </div>

        {/* Theory & Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-fuchsia-600" /> මූලික සංකල්ප</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">ප්‍රකාශ විද්‍යුත් ආචරණය:</strong> ලෝහ පෘෂ්ඨයක් මතට ඉහළ සංඛ්‍යාතයක් සහිත ආලෝක ෆෝටෝන පතිත වූ විට ක්ෂණිකව ඉලෙක්ට්‍රෝන පිටවීමේ සංසිද්ධියයි (Emax = hf - Φ).</li>
              <li>• <strong className="text-slate-800">අර්ධ ආයු කාලය (T1/2):</strong> විකිරණශීලී පරමාණු සංඛ්‍යාවෙන් හරියටම අඩක් ක්ෂය වීමට ගතවන කාලයයි (T1/2 = 0.693/λ).</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-purple-500" /> Paper Marking රහස්</h2>
            <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs md:text-sm text-purple-900">
              <strong>⚠️ නිවාරක විභව (Stopping Potential) ප්‍රස්ථාර උගුල:</strong> විභාගයේදී V0 එදිරිව f ප්‍රස්ථාරය අඳින විට, නිවාරක විභව අක්ෂයේ සෘණ අගය (-Φ/e) සිරස් අක්ෂයේ සෘණ පැත්ත කපාගෙන යන සේ අනිවාර්යයෙන්ම ඇඳ දැක්විය යුතුය. නැතහොත් ලකුණු නොලැබේ!
            </div>
          </div>
        </div>

        {/* Photoelectric Effect Tool Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5"><h3 className="text-lg font-bold flex items-center gap-2">⚛️ Photoelectric Effect Playground (ප්‍රකාශ විද්‍යුත් ආචරණය)</h3></div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 space-y-4">
              <label className="text-xs font-bold text-slate-700 block">පතිත වන ආලෝකයේ වර්ණය තෝරන්න:</label>
              <div className="flex flex-col gap-2">
                <button onClick={() => setLightColor('red')} className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'red' ? 'bg-red-600 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>🔴 රතු ආලෝකය (Low Frequency)</button>
                <button onClick={() => setLightColor('green')} className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'green' ? 'bg-green-600 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>🟢 කොළ ආලෝකය (Medium Frequency)</button>
                <button onClick={() => setLightColor('uv')} className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'uv' ? 'bg-fuchsia-600 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>⚡ පාරජම්බුල කිරණ (High Frequency UV)</button>
              </div>
            </div>
            <div className="md:col-span-8 bg-slate-950 h-52 rounded-xl relative flex items-center justify-center border overflow-hidden p-4">
              {/* Light Ray Visual Representation inside Widget */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${lightColor === 'red' ? 'from-red-500' : lightColor === 'green' ? 'from-green-500' : 'from-fuchsia-400'} to-transparent opacity-60`}></div>
              <div className="bg-slate-800 w-32 h-12 rounded border border-slate-600 flex items-center justify-center text-xs text-slate-300 font-bold">ලෝහ තහඩුව (Metal)</div>
              {electronsEjected && (
                <div className="absolute right-12 flex gap-2 animate-ping"><div className="w-3 h-3 bg-cyan-400 rounded-full"></div><div className="w-3 h-3 bg-cyan-400 rounded-full"></div></div>
              )}
              {quantumFeedback && <div className="absolute bottom-2 left-2 right-2 text-[10px] md:text-xs bg-slate-900/90 text-slate-300 p-2 rounded text-center border border-slate-800">{quantumFeedback}</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
