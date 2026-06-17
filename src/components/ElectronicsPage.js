'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, Zap, Cpu, Activity, ArrowLeft } from 'lucide-react';

export default function ElectronicsPage() {
  // Logic Gate Simulator States
  const [gateType, setGateType] = useState('AND');
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [outputY, setOutputY] = useState(0);

  // Logic Gate Logic
  useEffect(() => {
    let result = 0;
    switch (gateType) {
      case 'AND': result = inputA && inputB; break;
      case 'OR': result = inputA || inputB; break;
      case 'NOT': result = inputA === 0 ? 1 : 0; break;
      case 'NAND': result = !(inputA && inputB) ? 1 : 0; break;
      case 'NOR': result = !(inputA || inputB) ? 1 : 0; break;
      case 'XOR': result = inputA ^ inputB; break;
      default: result = 0;
    }
    setOutputY(result);
  }, [gateType, inputA, inputB]);

  // Quiz State
  const [quizAns, setQuizAns] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const checkQuiz = () => {
    if (quizAns === '180') {
      setQuizFeedback('🎉 නිවැරදියි! පොදු විමෝචක (Common Emitter) ප්‍රවර්ධකයක ප්‍රතිදාන සංඥාව සහ ප්‍රදාන සංඥාව අතර 180° ක අවස්ථා විපර්යාසයක් (Phase Inversion) පවතී. විභාගයේදී රචනා ප්‍රශ්න වලදී මෙය ඇඳ පෙන්වීම අනිවාර්ය වේ!');
    } else {
      setQuizFeedback('❌ වැරදියි! මතක තබාගන්න, පොදු විමෝචක ප්‍රවර්ධකයකදී පමණක් සංඥාව උඩු යටිකුරු වේ (එනම් 180° ක වෙනසක් සිදු වේ).');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-purple-700 to-blue-800 p-6 rounded-2xl shadow-xl border border-purple-500/30">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <div>
              <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 09</span>
              <h1 className="text-3xl font-bold mt-1">ඉලෙක්ට්‍රොනික විද්‍යාව (Electronics)</h1>
            </div>
          </div>
          <p className="text-purple-200 text-sm mt-3">අර්ධ සන්නායක, ට්‍රාන්සිස්ටර, මෙහෙයුම් ප්‍රවර්ධක සහ තාර්කික ද්වාරවල ලෝකය.</p>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
            <h2 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• <strong className="text-slate-100">P-N සන්ධි දියෝඩය:</strong> පෙරබෑවුම් (Forward Bias) අවස්ථාවේදී ධාරාව ගලා යන අතර, පසුබෑවුම් (Reverse Bias) අවස්ථාවේදී ධාරාව ගලා නොයයි.</li>
              <li>• <strong className="text-slate-100">ට්‍රාන්සිස්ටරය:</strong> පොදු විමෝචක වින්‍යාසයේදී මෙය ප්‍රවර්ධකයක් ලෙස හෝ ස්විචයක් ලෙස ක්‍රියා කරයි.</li>
              <li>• <strong className="text-slate-100">මෙහෙයුම් ප්‍රවර්ධක (Op-Amps):</strong> ඉතා ඉහළ ප්‍රදාන ප්‍රතිරෝධයක් සහ ඉතා ඉහළ වෝල්ටීයතා ලාභයක් සහිත IC වර්ගයකි.</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
            <h2 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <span className="font-bold text-rose-300 block">⚠️ අවස්ථා විපර්යාසය (Phase Inversion):</span>
                පොදු විමෝචක (CE) ප්‍රවර්ධකයක ප්‍රතිදාන සංඥාව ප්‍රදාන සංඥාවට සාපේක්ෂව 180° ක් වෙනස් වේ. ප්‍රස්ථාර අඳින විට මෙය අනිවාර්යයෙන්ම දැක්විය යුතුය.
              </div>
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <span className="font-bold text-rose-300 block">⚠️ තාර්කික ද්වාර සත්‍යතා වගු:</span>
                සත්‍යතා වගුවක ප්‍රතිදානය (Output) ලිවීමේදී 0 සහ 1 භාවිත කළ යුතුය. ඇතැම් විට විභාගයේදී High/Low ලෙසද ඇසිය හැක.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Logic Gate Playground */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden mb-8">
          <div className="bg-slate-900 p-5 border-b border-slate-700">
            <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-400">
              <Zap className="w-5 h-5 fill-cyan-400" /> Logic Gate Playground (තාර්කික ද්වාර පුවරුව)
            </h3>
            <p className="text-slate-500 text-xs mt-1">තාර්කික ද්වාරයක ක්‍රියාකාරීත්වය සත්‍යතා වගුවට අනුව සජීවීව පරීක්ෂා කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase">ද්වාරය තෝරන්න:</label>
                <select 
                  value={gateType} 
                  onChange={(e) => setGateType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-400 font-bold p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  <option value="AND">AND Gate</option>
                  <option value="OR">OR Gate</option>
                  <option value="NOT">NOT Gate (Inverter)</option>
                  <option value="NAND">NAND Gate</option>
                  <option value="NOR">NOR Gate</option>
                  <option value="XOR">XOR Gate</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 block uppercase">ප්‍රදානයන් (Inputs):</label>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                    className={`flex-1 p-3 rounded-lg font-bold transition-all cursor-pointer ${inputA === 1 ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-slate-900 border border-slate-700 text-slate-500'}`}
                  >
                    Input A: {inputA}
                  </button>
                  {gateType !== 'NOT' && (
                    <button 
                      onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                      className={`flex-1 p-3 rounded-lg font-bold transition-all cursor-pointer ${inputB === 1 ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-slate-900 border border-slate-700 text-slate-500'}`}
                    >
                      Input B: {inputB}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Simulator Area */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center relative min-h-[280px]">
              {/* LED Output Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${outputY === 1 ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse' : 'bg-slate-800'}`}></div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Output Status</span>
              </div>

              {/* Logic Circuit Visual Representation */}
              <div className="flex items-center gap-8">
                {/* Inputs */}
                <div className="flex flex-col gap-10">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${inputA === 1 ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500'}`}>A</div>
                   {gateType !== 'NOT' && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${inputB === 1 ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500'}`}>B</div>
                   )}
                </div>

                {/* Gate Symbol Representation */}
                <div className="bg-slate-900 w-32 h-20 rounded-xl border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-black text-xl shadow-inner">
                  {gateType}
                </div>

                {/* Output */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-0.5 bg-slate-700"></div>
                  <div className={`text-4xl font-black ${outputY === 1 ? 'text-cyan-400' : 'text-slate-700'}`}>
                    Y = {outputY}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 bg-slate-900/50 border border-slate-800 rounded-lg text-[11px] text-slate-500 font-mono">
                BOOLEAN: {gateType === 'AND' ? 'Y = A . B' : gateType === 'OR' ? 'Y = A + B' : gateType === 'NOT' ? 'Y = Ā' : gateType === 'NAND' ? 'Y = A . B (inverted)' : gateType === 'NOR' ? 'Y = A + B (inverted)' : 'Y = A ⊕ B'}
              </div>
            </div>
          </div>
        </div>

        {/* Mini Quiz Box */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-md border-l-4 border-l-purple-600">
          <h3 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-purple-500" /> විභාග ප්‍රශ්න විමර්ශනය (Mini Quiz)
          </h3>
          <p className="text-xs text-slate-400 mb-4">පොදු විමෝචක (Common Emitter) ප්‍රවර්ධකයක, ප්‍රදාන සංඥාවට සාපේක්ෂව ප්‍රතිදාන සංඥාවේ "අවස්ථා වෙනස" (Phase Difference) කොපමණද?</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <button 
              onClick={() => setQuizAns('0')}
              className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${quizAns === '0' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
            >
              0° (එකම අවස්ථාවේ)
            </button>
            <button 
              onClick={() => setQuizAns('90')}
              className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${quizAns === '90' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
            >
              90°
            </button>
            <button 
              onClick={() => setQuizAns('180')}
              className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${quizAns === '180' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
            >
              180° (විපර්යාසය)
            </button>
          </div>

          <button onClick={checkQuiz} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-lg text-xs transition shadow-lg shadow-purple-900/50 cursor-pointer">
            පිළිතුර ඉදිරිපත් කරන්න
          </button>

          {quizFeedback && (
            <div className="mt-4 p-4 bg-slate-900 border border-slate-700 text-slate-200 text-xs md:text-sm font-medium rounded-lg border-l-4 border-l-cyan-500 animate-fade-in">
              {quizFeedback}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
