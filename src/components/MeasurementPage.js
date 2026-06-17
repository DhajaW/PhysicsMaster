'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, RotateCw, CheckCircle, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MeasurementPage() {
  // Simulator States
  const [thicknessMode, setThicknessMode] = useState('wire'); // wire or coin
  const [isRotated, setIsRotated] = useState(false);
  const [usedThimbleOnly, setUsedThimbleOnly] = useState(false);
  const [clampedWithRatchet, setClampedWithRatchet] = useState(false);
  const [userReading, setUserReading] = useState('');
  const [feedback, setFeedback] = useState({ status: '', msg: '' });

  // Fixed values for simulation (True values)
  const zeroError = -0.02; // mm (Marking Scheme Trap 4)
  const wireDiameter = 1.54; // mm
  const coinThickness = 2.00; // mm

  const handleThimbleClick = () => {
    setUsedThimbleOnly(true);
    setClampedWithRatchet(false);
    setFeedback({
      status: 'error',
      msg: '❌ Exam Trap! ඔබ වස්තුව තද කිරීමට සිලින්ඩරය (Thimble) පමණක් භාවිත කළේය! මෙයින් වස්තුව විරූපණය විය හැක. අවසාන තද කිරීම සඳහා සෑම විටම රැචට්ටුව (Ratchet) භාවිත කරන්න.'
    });
  };

  const handleRatchetClick = () => {
    if (!usedThimbleOnly) {
      setClampedWithRatchet(true);
      setFeedback({
        status: 'success',
        msg: '🎵 ටික්-ටික්-ටික්! රැචට්ටුව නිවැරදිව ක්‍රියාත්මක විය. දැන් මිනුම ලබාගෙන පහතින් ඇතුළත් කරන්න. (මතක තබාගන්න: මූලාංක දෝෂය -0.02 mm වේ!)'
      });
    }
  };

  const checkAnswer = () => {
    if (!clampedWithRatchet) {
      setFeedback({ status: 'error', msg: '❌ කරුණාකර මුලින්ම රැචට්ටුව (Ratchet) භාවිත කර වස්තුව නිවැරදිව සිර කරගන්න.' });
      return;
    }

    if (thicknessMode === 'wire' && !isRotated) {
      setFeedback({ status: 'error', msg: '❌ ව්‍යූහගත රචනා ප්‍රශ්න පත්‍රයේ උගුලක්! කම්බිය ඒකාකාරී සිලින්ඩරයක්දැයි බැලීමට එය 90° කින් කරකවා තවත් ස්ථානයකින් මිනුම ගත යුතුමයි!' });
      return;
    }

    const correctValue = thicknessMode === 'wire' ? wireDiameter : coinThickness;
    // Observed = Correct + ZeroError (Since True = Observed - ZeroError => Observed = 1.54 + (-0.02) = 1.52)
    const expectedObserved = correctValue + zeroError; 
    
    if (parseFloat(userReading) === expectedObserved) {
      setFeedback({
        status: 'correct',
        msg: `🎉 නිවැරදියි! පාඨාංකය = ${expectedObserved} mm. සැබෑ අගය සෙවීමේදී: පාඨාංකය - (මූලාංක දෝෂය) = ${expectedObserved} - (-0.02) = ${correctValue} mm වේ!`
      });
    } else {
      setFeedback({
        status: 'error',
        msg: `❌ වැරදියි! නැවත උත්සාහ කරන්න. (ඉඟිය: මූලාංක දෝෂය සලකා බලා [පාඨාංකය = සැබෑ අගය + මූලාංක දෝෂය] අගය ගණනය කරන්න)`
      });
    }
  };

  const resetSim = () => {
    setIsRotated(false);
    setUsedThimbleOnly(false);
    setClampedWithRatchet(false);
    setUserReading('');
    setFeedback({ status: '', msg: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-blue-500/30 border border-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 01</span>
            <h1 className="text-3xl font-bold mt-2">මිනුම (Measurement) - අධ්‍යයන පිටුව</h1>
            <p className="text-blue-100 text-sm mt-1">සම්පත් පොතේ සාරාංශය සහ විභාග මට්ටමේ අතථ්‍ය පරීක්ෂණ මෙතැනින් ඉගෙන ගන්න.</p>
          </div>
        </div>

        {/* 1. Core Theory & Exam Traps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">මූලික රාශි 7:</strong> දිග (m), ස්කන්ධ (kg), කාලය (s), උෂ්ණත්වය (K), විද්‍යුත් ධාරාව (A), පදාර්ථ ප්‍රමාණය (mol), දීප්ත තීව්‍රතාව (cd).</li>
              <li>• <strong className="text-slate-800">ප්‍රතිශත දෝෂය:</strong> මනිනු ලබන අගය විශාල වන විට ප්‍රතිශත දෝෂය අඩු වේ. (මීටර රූලකින් 10 m මැනීම 10 cm මැනීමට වඩා නිරවද්‍ය වේ).</li>
              <li>• <strong className="text-slate-800">ගෝලමාන සූත්‍රය:</strong> වක්‍රතා අරය R = a² / 6h + h / 2 (තාච්චියක වක්‍රතාව මැනීමට යොදා ගත හැක).</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-800 block">⚠️ රැචට්ටුවේ (Ratchet) කාර්යය:</span>
                වස්තුව මත අනවශ්‍ය තෙරපුමක් ඇතිවීම වැළැක්වීම හෝ වස්තුව විරූපණය වීම වැළැක්වීම. (මෙය විභාගයට නිතරම අසන ප්‍රශ්නයකි!)
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-800 block">⚠️ කම්බියක විෂ්කම්භය මැනීම:</span>
                කම්බිය සැබෑ සිලින්ඩරයක් දැයි බැලීමට එය 90° කින් කරකවා වෙනස් ස්ථාන කිහිපයකින් මිනුම් ලබාගත යුතුය.
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Simulator Component */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">📐 මයික්‍රොමීටර ඉස්කුරුප්පු ආමාන අතථ්‍ය පරීක්ෂණය</h3>
            <p className="text-slate-400 text-xs mt-1">මූලාංක දෝෂය (Zero Error) = -0.02 mm සහිත උපකරණයකි.</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Box: Control Elements */}
            <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">1. මැනිය යුතු වස්තුව තෝරන්න:</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button 
                    onClick={() => { setThicknessMode('wire'); resetSim(); }}
                    className={`p-2.5 rounded-lg font-medium text-sm transition ${thicknessMode === 'wire' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
                  >
                    💡 තඹ කම්බිය
                  </button>
                  <button 
                    onClick={() => { setThicknessMode('coin'); resetSim(); }}
                    className={`p-2.5 rounded-lg font-medium text-sm transition ${thicknessMode === 'coin' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
                  >
                    🪙 රු. 5 කාසිය
                  </button>
                </div>

                <label className="text-sm font-bold text-slate-700 block mb-2">2. උපකරණය ක්‍රියාත්මක කරන්න:</label>
                <div className="space-y-2">
                  <button 
                    onClick={handleThimbleClick}
                    className="w-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold p-3 rounded-lg flex justify-between items-center"
                  >
                    <span> Thimble (සිලින්ඩරය) කරකවන්න</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button 
                    onClick={handleRatchetClick}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold p-3 rounded-lg flex justify-between items-center shadow-sm"
                  >
                    <span> Ratchet (රැචට්ටුව) කරකවා සිර කරන්න</span>
                    <span className="bg-amber-600 text-white px-1.5 py-0.5 rounded text-[10px]">ටික්-ටික්</span>
                  </button>
                </div>

                {thicknessMode === 'wire' && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <button 
                      onClick={() => setIsRotated(true)}
                      className={`w-full p-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition ${isRotated ? 'bg-green-100 border-green-300 text-green-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                    >
                      <RotateCw className="w-4 h-4" /> කම්බිය 90° කින් කරකවන්න {isRotated && '(කැරකැවිණි ✅)'}
                    </button>
                  </div>
                )}
              </div>

              <button onClick={resetSim} className="mt-6 text-xs text-slate-500 hover:text-slate-800 underline text-left bg-transparent border-0 cursor-pointer">
                පරීක්ෂණය නැවත මුල සිට ආරම්භ කරන්න
              </button>
            </div>

            {/* Right Box: Simulation Area & Input */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              {/* Visual Display */}
              <div className="bg-slate-900 rounded-xl p-6 min-h-[180px] flex flex-col items-center justify-center text-white text-center relative border border-slate-800">
                {clampedWithRatchet ? (
                  <div className="space-y-2">
                    <div className="text-xs text-green-400 font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4" /> වස්තුව නිවැරදිව සිරවී ඇත
                    </div>
                    <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg font-mono text-sm">
                      {thicknessMode === 'wire' ? (
                        <>
                          ප්‍රධාන පරිමාණ කියවීම: <span className="text-yellow-400 font-bold">1.50 mm</span><br />
                          වෘත්තාකාර පරිමාණ කියවීම: <span className="text-yellow-400 font-bold">2 වන සේනාව</span>
                        </>
                      ) : (
                        <>
                          ප්‍රධාන පරිමාණ කියවීම: <span className="text-yellow-400 font-bold">1.50 mm</span><br />
                          වෘත්තාකාර පරිමාණ කියවීම: <span className="text-yellow-400 font-bold">48 වන සේනාව</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : usedThimbleOnly ? (
                  <div className="text-red-400 text-sm font-bold max-w-sm">
                    ⚠️ වැරදියි! කම්බිය/කාසිය තෙරපුම නිසා විරූපණය විය. කරුණාකර Reset කර රැචට්ටුව භාවිත කරන්න.
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm">
                    වස්තුවක් තෝරා රැචට්ටුව (Ratchet) මගින් සිර කරන්න. එවිට උපකරණයේ මිනුම් දර්ශනය වනු ඇත.
                  </div>
                )}
              </div>

              {/* User Answer Submission */}
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="text-xs font-bold text-slate-700 block mb-1">ඔබට ලැබුණු අවසාන පාඨාංකය (Observed Reading) ඇතුළත් කරන්න (mm වලින්):</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    step="0.01"
                    value={userReading}
                    onChange={(e) => setUserReading(e.target.value)}
                    placeholder="0.00" 
                    className="flex-1 bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button onClick={checkAnswer} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition shadow-sm cursor-pointer">
                    පිළිතුර පරීක්ෂා කරන්න
                  </button>
                </div>
              </div>

              {/* Dynamic Feedback Msg */}
              {feedback.msg && (
                <div className={`mt-3 p-3.5 rounded-lg text-xs md:text-sm font-medium border ${
                  feedback.status === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 
                  feedback.status === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 
                  'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                  {feedback.msg}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
