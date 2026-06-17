'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, RefreshCw, CheckCircle, Award, Play, Pause, ArrowLeft } from 'lucide-react';

export default function MechanicsPage() {
  // Simulator 1: Ice Skater Angular Momentum States
  const [armsExtended, setArmsExtended] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Simulator 2: Motion Sign Convention States
  const [chosenDirection, setChosenDirection] = useState('up'); // up is positive or down is positive
  const [uInput, setUInput] = useState('10'); // Initial velocity
  const [tInput, setTInput] = useState('2');  // Time
  const [motionFeedback, setMotionFeedback] = useState({ status: '', msg: '' });

  // Ice Skater Rotation Logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      // අත් ළං කරගත් විට අවස්ථිති ඝූර්ණය (I) අඩු වේ, කෝණික ප්‍රවේගය (w) වැඩි වේ! (L = Iw නියතයකි)
      const speed = armsExtended ? 3 : 9; 
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + speed) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying, armsExtended]);

  // Motion Equation Check Logic
  const checkMotionEquation = () => {
    const u = parseFloat(uInput);
    const t = parseFloat(tInput);
    const g = 9.8; // m/s^2 (Resource Book Value)

    if (isNaN(u) || isNaN(t)) {
      setMotionFeedback({ status: 'error', msg: '❌ කරුණාකර නිවැරදි සංඛ්‍යාත්මක අගයන් ඇතුළත් කරන්න.' });
      return;
    }

    // සිරස්ව ඉහළට විසි කළ වස්තුවක විස්ථාපනය s = ut - 0.5gt^2
    // ඉහළ දිශාව (+) ලෙස ගත්තොත්: u ධන වේ, g ඍණ වේ.
    // පහළ දිශාව (+) ලෙස ගත්තොත්: u ඍණ වේ, g ධන වේ.
    let correctS;
    if (chosenDirection === 'up') {
      correctS = (u * t) - (0.5 * g * t * t);
    } else {
      correctS = (-u * t) + (0.5 * g * t * t);
    }

    setMotionFeedback({
      status: 'correct',
      msg: `✅ නිවැරදියි! ඔබ තෝරාගත් ${chosenDirection === 'up' ? '↑ ඉහළ' : '↓ පහළ'} දිශාව ධන ලෙස සලකා ආදේශ කළ විට විස්ථාපනය (s) = ${correctS.toFixed(2)} m වේ. විභාගයේදී ලකුණු ලැබෙන්නේ මේ දිශානුගත ඊතලය නිවැරදිව දැක්වුවහොත් පමණි!`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-red-500/30 border border-red-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 02</span>
            <h1 className="text-3xl font-bold mt-2">යාන්ත්‍ර විද්‍යාව (Mechanics)</h1>
            <p className="text-red-100 text-sm mt-1">ප්‍රගති විද්‍යාව, නිව්ටන් නියම සහ භ්‍රමණ චලිතයේ විභාග රහස් සජීවීව ඉගෙන ගන්න.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-red-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">නිව්ටන්ගේ 1 නියමය (අවස්ථිතිය):</strong> බාහිර අසමතුලිත බලයක් නොයෙදෙන තාක් සෑම වස්තුවක්ම නිශ්චලතාවයේ හෝ ඒකාකාර ප්‍රවේගයෙන් සරල රේඛීයව චලනය වෙමින් පවතී.</li>
              <li>• <strong className="text-slate-800">කෝණික ගම්‍යතා සංරක්ෂණ නියමය:</strong> පද්ධතියක් මත ක්‍රියා කරන බාහිර ව්‍යවර්තය ශුන්‍ය නම්, පද්ධතියේ මුළු කෝණික ගම්‍යතාව (L = Iω) නියතව පවතී.</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="font-bold text-orange-800 block">⚠️ චලිත සමීකරණ උගුල (Sign Convention):</span>
                v = u + at හෝ s = ut + ½at² යෙදීමේදී ධන දිශාව සලකුණු නොකළහොත් ව්‍යුහගත රචනා ප්‍රශ්න වලදී ලකුණු කැපේ!
              </div>
              <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="font-bold text-orange-800 block">⚠️ අවස්ථිති ඝූර්ණය (I) සෙවීම:</span>
                ඝූර්ණය ගණනය කිරීමේදී, වස්තුව කැරකෙන 'අක්ෂය' (Axis of Rotation) නිවැරදිව හඳුනා නොගැනීම ළමයි කරන ලොකුම වරදකි.
              </div>
            </div>
          </div>
        </div>

        {/* Simulator 1: Ice Skater Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-8">
          <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2 text-white">⛸️ කෝණික ගම්‍යතා (Angular Momentum) Simulator</h3>
              <p className="text-slate-400 text-xs mt-1">Ice Skater කෙනෙකු අත් හැකිලීමේදී සහ දිග හැරීමේදී සිදුවන වෙනස බලන්න.</p>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg border border-slate-700 transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-2">අත් පිහිටීම වෙනස් කරන්න:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setArmsExtended(true)}
                    className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer ${armsExtended ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
                  >
                    👐 අත් දිග හැරීම (Extended)
                  </button>
                  <button 
                    onClick={() => setArmsExtended(false)}
                    className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer ${!armsExtended ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
                  >
                    🧍 අත් හැකිලීම (Folded)
                  </button>
                </div>
              </div>

              <div className="p-4 bg-indigo-900 text-white rounded-xl text-xs font-mono space-y-2">
                <div>• අවස්ථිති ඝූර්ණය (I): <span className="text-yellow-400 font-bold">{armsExtended ? 'ඉහළයි (High)' : 'පහළයි (Low)'}</span></div>
                <div>• කෝණික ප්‍රවේගය (ω): <span className="text-yellow-400 font-bold">{armsExtended ? 'සෙමින් (Slow)' : 'වේගවත් (Fast)'}</span></div>
                <div className="text-[11px] text-indigo-300 border-t border-indigo-800 pt-2">L = Iω නියතව පවතින නිසා I අඩු වන විට වේගය (ω) වැඩි වේ!</div>
              </div>
            </div>

            {/* Live Animation Graphic Visual */}
            <div className="md:col-span-7 bg-slate-950 h-56 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-800">
              <div 
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                className="w-24 h-24 rounded-full border-4 border-dashed border-red-500 flex items-center justify-center transition-transform duration-75"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl shadow-lg">
                  {armsExtended ? '👐' : '🧍'}
                </div>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
                සජීවී භ්‍රමණ සමාකරණය
              </div>
            </div>
          </div>
        </div>

        {/* Simulator 2: Sign Convention Tool */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">🎯 චලිත සමීකරණ ලකුණු පරිවර්තන සේවාව</h3>
            <p className="text-slate-400 text-xs mt-1">සිරස් චලිතයේදී දිශාවන් ආදේශ කිරීමේ විභාග රටාව පුහුණු වන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">1. ධන (+) ලෙස සලකන දිශාව තෝරන්න:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setChosenDirection('up')}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${chosenDirection === 'up' ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white text-slate-700'}`}
                  >
                    ↑ ඉහළ දිශාව ධන (+)
                  </button>
                  <button 
                    onClick={() => setChosenDirection('down')}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${chosenDirection === 'down' ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white text-slate-700'}`}
                  >
                    ↓ පහළ දිශාව ධන (+)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">ආරම්භක ප්‍රවේගය u (m/s):</label>
                  <input 
                    type="number" 
                    value={uInput} 
                    onChange={(e) => setUInput(e.target.value)}
                    className="w-full p-2 bg-white border rounded-lg text-sm font-mono focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">කාලය t (s):</label>
                  <input 
                    type="number" 
                    value={tInput} 
                    onChange={(e) => setTInput(e.target.value)}
                    className="w-full p-2 bg-white border rounded-lg text-sm font-mono focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={checkMotionEquation}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer border-0"
              >
                සමීකරණය ආදේශ කර බලන්න
              </button>
            </div>

            <div className="flex flex-col justify-center">
              {motionFeedback.msg ? (
                <div className={`p-4 rounded-xl text-xs md:text-sm font-medium border ${motionFeedback.status === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  {motionFeedback.msg}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-dashed rounded-xl text-center text-xs text-slate-400">
                  දිශාව සහ අගයන් ඇතුළත් කර s = ut + ½at² ආදේශයේ වෙනස නිරීක්ෂණය කරන්න.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
