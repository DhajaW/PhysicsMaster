'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, Zap, Play, ArrowLeft } from 'lucide-react';

export default function MechanicalPropertiesPage() {
  const [liquid, setLiquid] = useState('water'); // water or glycerin
  const [ballY, setBallY] = useState(0); // 0 to 150px motion
  const [velocity, setVelocity] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [unit10Feedback, setUnit10Feedback] = useState('');

  useEffect(() => {
    let id;
    if (isDropping && ballY < 150) {
      // ග්ලිසරින්වල දුස්ස්රාවිතාව වැඩි නිසා ආන්ත ප්‍රවේගය අඩු වේ, ජලයේ වේගය වැඩියි!
      const terminalVelocity = liquid === 'water' ? 8 : 2;
      id = setInterval(() => {
        setBallY((prev) => {
          const next = prev + terminalVelocity;
          if (next >= 150) {
            setIsDropping(false);
            setVelocity(terminalVelocity);
            setUnit10Feedback(`🎉 නිශ්චලයි! ගෝලය එහි ආන්ත ප්‍රවේගයට (Terminal Velocity = ${terminalVelocity} m/s) ළඟා විය. ස්ටෝක්ස් නියමයට අනුව බල සමතුලිතතාව: W = U + F (මෙහි F = 6πηrv වේ).`);
            return 150;
          }
          // Acceleration phase qualitatively simulated
          setVelocity(Math.min(terminalVelocity, parseFloat((prev * 0.1).toFixed(1))));
          return next;
        });
      }, 50);
    }
    return () => clearInterval(id);
  }, [isDropping, ballY, liquid]);

  const startDrop = () => {
    setBallY(0);
    setVelocity(0);
    setIsDropping(true);
    setUnit10Feedback('🧪 ගෝලය නිදහසේ පහළට වැටේ... වේගය ක්‍රමයෙන් වැඩි වී පසුව නියත වේ (ආන්ත ප්‍රවේගය).');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-emerald-400/30 border border-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 10</span>
            <h1 className="text-3xl font-bold mt-2">පදාර්ථයේ යාන්ත්‍රික ගුණ (Mechanical Properties of Matter)</h1>
            <p className="text-emerald-100 text-sm mt-1">ප්‍රත්‍යාස්ථතාව, යං මාපාංකය, දුස්ස්රාවිතාව සහ පෘෂ්ඨික ආතතියේ විභාග රහස්.</p>
          </div>
        </div>

        {/* Theory & Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-emerald-600" /> මූලික සංකල්ප</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">හූක් නියමය:</strong> සමානුපාතික සීමාව තුළ කම්බියක ඇති වන විතතිය (e), ඒ මත යෙදූ භාරයට (F) අනුලෝමව සමානුපාතික වේ (F = ke).</li>
              <li>• <strong className="text-slate-800">ස්ටෝක්ස් නියමය (F = 6πηrv):</strong> දුස්ස්රාවී මාධ්‍යයක් තුළින් චලනය වන කුඩා ගෝලීය වස්තුවක් මත ක්‍රියා කරන දුස්ස්රාවිතා බලය සෙවීමේ සූත්‍රයයි.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-cyan-500" /> Paper Marking රහස්</h2>
            <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg text-xs md:text-sm text-cyan-900">
              <strong>⚠️ ඒකක පරිවර්තන උගුල:</strong> යං මාපාංකය (Y) සෙවීමේ ගණන් වලදී කම්බියේ විෂ්කම්භය මිලිමීටර (mm) වලින් දෙන අතර, ළමයි එය මීටර (m) වලට පරිවර්තනය කිරීමට අමතක කිරීම නිසා මුළු ලකුණුම නැති කර ගනිති! (1 mm = 10⁻³ m).
            </div>
          </div>
        </div>

        {/* Viscosity Test Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5"><h3 className="text-lg font-bold flex items-center gap-2">💧 Viscosity Drop Test (දුස්ස්රාවිතා පරීක්ෂණය)</h3></div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-4">
              <label className="text-xs font-bold text-slate-700 block">ද්‍රවය තෝරන්න:</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { setLiquid('water'); setBallY(0); setVelocity(0); }} className={`p-2 rounded-lg text-xs font-bold cursor-pointer transition ${liquid === 'water' ? 'bg-emerald-600 text-white shadow' : 'bg-white border text-slate-700'}`}>💧 ජලය (Water)</button>
                <button onClick={() => { setLiquid('glycerin'); setBallY(0); setVelocity(0); }} className={`p-2 rounded-lg text-xs font-bold cursor-pointer transition ${liquid === 'glycerin' ? 'bg-emerald-600 text-white shadow' : 'bg-white border text-slate-700'}`}>🍯 ග්ලිසරින් (Glycerin)</button>
              </div>
              <button onClick={startDrop} className="w-full bg-slate-900 text-white p-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow cursor-pointer hover:bg-slate-800 transition"><Play className="w-4 h-4" /> ගෝලය අත්හරින්න</button>
              <div className="p-4 bg-slate-950 font-mono text-xs text-center rounded-xl text-white">වත්මන් වේගය: <span className="text-yellow-400 font-bold">{velocity} m/s</span></div>
            </div>
            <div className="md:col-span-7 bg-slate-900 h-64 rounded-xl relative flex items-center justify-center border border-slate-800">
              <div className="w-16 h-48 bg-slate-800 border-2 border-slate-700 rounded-b-xl relative overflow-hidden flex justify-center">
                <div className={`absolute w-4 h-4 bg-slate-400 rounded-full border border-slate-200 transition-all duration-75`} style={{ top: `${ballY}px` }}></div>
              </div>
              {unit10Feedback && <div className="absolute bottom-2 left-2 right-2 text-[11px] bg-slate-950/90 text-slate-300 p-2 rounded text-center font-mono">{unit10Feedback}</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
