'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, RefreshCw, Zap, Play, ArrowLeft } from 'lucide-react';

export default function GravitationalFieldsPage() {
  // Orbit Simulator States
  const [velocitySlider, setVelocitySlider] = useState(7.9); // km/s (Standard orbital speed)
  const [satelliteStatus, setSatelliteStatus] = useState('orbit'); // orbit, crash, escape
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [simFeedback, setSimFeedback] = useState({ status: 'normal', msg: '✨ චන්ද්‍රිකාව පෘථිවිය වටා ස්ථාවර කක්ෂයක ගමන් කරයි.' });

  // Quiz State
  const [selectedEnergyAns, setSelectedEnergyAns] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  // Simulator Engine logic
  useEffect(() => {
    const v = velocitySlider;
    let status = 'orbit';
    let msg = '✨ චන්ද්‍රිකාව පෘථිවිය වටා ස්ථාවර කක්ෂයක ගමන් කරයි. (v = v_orbit)';

    if (v < 7.0) {
      status = 'crash';
      msg = '❌ අනතුරක්! කක්ෂීය ප්‍රවේගය මදි වීම නිසා චන්ද්‍රිකාව පෘථිවි ගුරුත්වාකර්ෂණයට හසුවී බිමට කඩා වැටේ (Crash).';
    } else if (v >= 11.2) {
      status = 'escape';
      msg = '🚀 නිදහස් විය! චන්ද්‍රිකාව පෘථිවියේ පලායන ප්‍රවේගය (Escape Velocity ≥ 11.2 km/s) පසුකර ගුරුත්වාකර්ෂණ ක්ෂේත්‍රයෙන් ඉවතට ඇදී යයි.';
    }

    setSatelliteStatus(status);
    setSimFeedback({ status, msg });
  }, [velocitySlider]);

  // Orbit Animation Ring
  useEffect(() => {
    let interval;
    if (satelliteStatus === 'orbit') {
      interval = setInterval(() => {
        setOrbitAngle((prev) => (prev + (velocitySlider * 0.5)) % 360);
      }, 40);
    }
    return () => clearInterval(interval);
  }, [satelliteStatus, velocitySlider]);

  const checkEnergyQuiz = () => {
    if (selectedEnergyAns === 'negative') {
      setQuizFeedback('🎉 නිවැරදියි! කක්ෂගත චන්ද්‍රිකාවක මුළු ශක්තිය (E = K.E. + P.E.) සෑම විටම ඍණ (-) අගයක් ගනී (E = -GMm/2r). එයින් අදහස් වන්නේ චන්ද්‍රිකාව පෘථිවි ක්ෂේත්‍රයට බැඳී පවතින බවයි. විභාගයේදී ලකුණු ලැබෙන ලොකුම රහසකි!');
    } else {
      setQuizFeedback('❌ වැරදියි! මතක තබාගන්න, චන්ද්‍රිකාව නිදහස් නොවී පෘථිවිය වටා බැඳී පවතින තාක් එහි මුළු ශක්තිය ධන හෝ ශුන්‍ය විය නොහැක. එය සෑම විටම ඍණ අගයකි.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-purple-500/30 border border-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 05</span>
            <h1 className="text-3xl font-bold mt-2">ගුරුත්වාකර්ෂණ ක්ෂේත්‍ර (Gravitational Fields)</h1>
            <p className="text-purple-100 text-sm mt-1">නිව්ටන්ගේ විශ්ව ගුරුත්වාකර්ෂණ නියමයන්, කක්ෂීය ප්‍රවේගයන් සහ චන්ද්‍රිකා ශක්ති විභේදන.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">නිව්ටන්ගේ ගුරුත්වාකර්ෂණ නියමය:</strong> විශ්වයේ ඕනෑම ස්කන්ධ දෙකක් අතර ඇති වන ආකර්ෂණ බලය, ස්කන්ධයන්ගේ ගුණිතයට අනුලෝමවත්, ඒවා අතර දුරෙහි වර්ගයට ප්‍රතිලෝමවත් සමානුපාතික වේ (F = GMm/r²).</li>
              <li>• <strong className="text-slate-800">පලායන ප්‍රවේගය (Escape Velocity):</strong> වස්තුවක් පෘථිවි ගුරුත්වාකර්ෂණ ක්ෂේත්‍රයෙන් සම්පූර්ණයෙන්ම ඉවතට විසි කිරීමට ලබා දිය යුතු අවම ප්‍රවේගයයි (vₑ = √(2GM/R)). පෘථිවිය සඳහා මෙහි අගය 11.2 km/s කි.</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                <span className="font-bold text-indigo-800 block">⚠️ G සහ g පටලවා ගැනීමේ උගුල:</span>
                විශ්ව ගුරුත්වාකර්ෂණ නියතය (G) යනු මුළු විශ්වයටම නියත අගයකි. නමුත් ගුරුත්වජ ත්වරණය (g) යනු ස්ථානයෙන් ස්ථානයට (උන්නතාංශය අනුව) වෙනස් වන රාශියකි. සූත්‍ර සාධනයේදී මෙය පටලවා ගතහොත් ලකුණු කැපේ.
              </div>
              <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                <span className="font-bold text-indigo-800 block">⚠️ චන්ද්‍රිකාවක කක්ෂීය අරය (r):</span>
                ගණන් හැදීමේදී බොහෝ සිසුන් r වෙනුවට පෘථිවි අරය (R) පමණක් ආදේශ කරයි. සැබෑ අරය විය යුත්තේ පෘථිවි මධ්‍යයේ සිට ඇති දුරයි, එනම්: r = R + h (මෙහි h යනු පෘථිවි පෘෂ්ඨයේ සිට උසයි).
              </div>
            </div>
          </div>
        </div>

        {/* Satellite Orbit Simulator Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">🌍 Satellite Orbit Simulator (චන්ද්‍රිකා කක්ෂ සමාකරණය)</h3>
            <p className="text-slate-400 text-xs mt-1">ප්‍රවේගය වෙනස් කරමින් චන්ද්‍රිකාවේ කක්ෂයට සිදුවන බලපෑම සජීවීව නිරීක්ෂණය කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">🚀 චන්ද්‍රිකාවේ ප්‍රවේගය (Velocity):</label>
                  <span className="text-sm font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{velocitySlider} km/s</span>
                </div>
                <input 
                  type="range" 
                  min="3.0" 
                  max="14.0" 
                  step="0.1"
                  value={velocitySlider} 
                  onChange={(e) => setVelocitySlider(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>3.0 km/s (අඩු)</span>
                  <span>7.9 km/s (කක්ෂීය)</span>
                  <span>11.2 km/s (පලායන)</span>
                </div>
              </div>

              {/* Dynamic Status Display Card */}
              <div className={`mt-6 p-4 rounded-xl border text-xs md:text-sm font-medium ${
                satelliteStatus === 'orbit' ? 'bg-green-50 border-green-200 text-green-800' :
                satelliteStatus === 'crash' ? 'bg-red-50 border-red-200 text-red-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                {simFeedback.msg}
              </div>
            </div>

            {/* Orbit Graphics Screen */}
            <div className="lg:col-span-7 bg-slate-950 h-64 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-900">
              {/* Earth Graphic */}
              <div className="w-16 h-16 bg-blue-500 rounded-full border-2 border-cyan-400 flex items-center justify-center text-xl shadow-lg z-10">
                🌍
              </div>

              {/* Orbit Path Ring */}
              {satelliteStatus === 'orbit' && (
                <div className="absolute w-44 h-44 rounded-full border border-dashed border-slate-700 animate-spin" style={{ animationDuration: '20s' }}></div>
              )}

              {/* Moving Satellite Graphic */}
              {satelliteStatus === 'orbit' && (
                <div 
                  className="absolute w-44 h-44 flex items-center justify-center transition-transform duration-75"
                  style={{ transform: `rotate(${orbitAngle}deg)` }}
                >
                  <div className="text-sm absolute -top-2 transform rotate-90">🛰️</div>
                </div>
              )}

              {satelliteStatus === 'crash' && (
                <div className="absolute text-sm animate-bounce text-red-500 font-bold bg-slate-900/80 px-2 py-1 rounded border border-red-800">🔥 කඩා වැටුණි!</div>
              )}

              {satelliteStatus === 'escape' && (
                <div className="absolute text-sm text-cyan-400 font-bold bg-slate-900/80 px-2 py-1 rounded border border-cyan-800 animate-pulse">🚀 ක්ෂේත්‍රයෙන් ඉවතට ඇදී යයි...</div>
              )}
            </div>
          </div>
        </div>

        {/* Mini Quiz Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-950 mb-3 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-purple-600" /> විභාග ප්‍රශ්න විමර්ශනය (Mini Quiz)
          </h3>
          <p className="text-xs text-slate-650 mb-4">පෘථිවිය වටා ස්ථාවර කක්ෂයක ඇති චන්ද්‍රිකාවක \"මුළු යාන්ත්‍රික ශක්තියේ\" ලකුණ කුමක්ද?</p>
          
          <div className="space-y-2 max-w-md">
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="energyQuiz" value="positive" onChange={(e) => setSelectedEnergyAns(e.target.value)} className="text-purple-600" /> ධන (+) අගයක් ගනී
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="energyQuiz" value="zero" onChange={(e) => setSelectedEnergyAns(e.target.value)} className="text-purple-600" /> ශුන්‍ය (Zero) වේ
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="energyQuiz" value="negative" onChange={(e) => setSelectedEnergyAns(e.target.value)} className="text-purple-600" /> ඍණ (-) අගයක් ගනී
            </label>
          </div>

          <button onClick={checkEnergyQuiz} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer border-0">
            පිළිතුර ඉදිරිපත් කරන්න
          </button>

          {quizFeedback && (
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 text-purple-950 text-xs md:text-sm font-medium rounded-lg">
              {quizFeedback}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
