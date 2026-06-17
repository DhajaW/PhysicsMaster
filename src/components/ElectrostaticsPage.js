'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, Zap, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ElectrostaticsPage() {
  // Simulator State
  const [chargeSetup, setChargeSetup] = useState('unlike'); // unlike, like_positive, like_negative
  const [showFieldFeedback, setShowFieldFeedback] = useState(true);

  // Mini Quiz State
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const checkQuiz = () => {
    if (userAnswer === 'radii') {
      setQuizFeedback('🎉 නිවැරදියි! සන්නායක ගෝල දෙකක් එකිනෙක ස්පර්ශ කළ විට ඒවායේ ආරෝපණ නැවත බෙදී යන්නේ ඒවායේ අරයයන්ට (Radii) අනුලෝමව සමානුපාතිකවයි (Q₁/Q₂ = R/r). විභාගයේදී නිතරම MCQ වලට එන රහසකි!');
    } else {
      setQuizFeedback('❌ වැරදියි! මතක තබාගන්න, ආරෝපණ බෙදී යන්නේ ස්කන්ධය හෝ පරිමාව මත නොව, ගෝලවල අරයයන්ට (Radii) අනුලෝමව සමානුපාතිකවයි.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-blue-500/30 border border-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 06</span>
            <h1 className="text-3xl font-bold mt-2">ස්ථිති විද්‍යුත් ක්ෂේත්‍ර (Electrostatic Fields)</h1>
            <p className="text-blue-100 text-sm mt-1">කූලෝම් නියමය, විද්‍යුත් ක්ෂේත්‍ර තීව්‍රතාවය, බල රේඛා සහ ධාරිත්‍රක සංකල්ප.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">විද්‍යුත් බල රේඛා:</strong> විද්‍යුත් ක්ෂේත්‍රයක ඇති නිදහස් ධන ආරෝපණයක් චලනය වන දිශාව පෙන්වන මනඃකල්පිත රේඛා වේ. ඒවා සැමවිටම ධන (+) අග්‍රයෙන් ආරම්භ වී සෘණ (-) අග්‍රයෙන් අවසන් වේ.</li>
              <li>• <strong className="text-slate-800">ක්ෂේත්‍ර තීව්‍රතාවය (E):</strong> E = V/d සමීකරණය මගින් ඒකාකාර විද්‍යුත් ක්ෂේත්‍රයක තීව්‍රතාවය සෙවිය හැක (මෙහි V යනු විභව අන්තරය සහ d යනු තහඩු අතර දුරයි).</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg">
                <span className="font-bold text-cyan-800 block">⚠️ බල රේඛා ඇඳීමේ උගුල (Drawing Rules):</span>
                විභාගයේදී විද්‍යුත් බල රේඛා එකිනෙක කැපෙන සේ ඇන්දොත් ලකුණු සම්පූර්ණයෙන්ම කැපේ! එමෙන්ම රේඛා ආරම්භ වන සහ අවසන් වන පෘෂ්ඨයන්ට ඒවා සෑමවිටම ලම්බකව (90°) ඇඳිය යුතුය.
              </div>
              <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg">
                <span className="font-bold text-cyan-800 block">⚠️ බල රේඛාවල ඊතල (Arrows):</span>
                ඊතල හිස් සෑමවිටම ධන ආරෝපණයෙන් ඉවතටත්, සෘණ ආරෝපණය දෙසටත් යොමු විය යුතුය. ඊතල නැතිව අඳින බල රේඛාවලට ලකුණු ලැබෙන්නේ නැත.
              </div>
            </div>
          </div>
        </div>

        {/* 3D Field Lines Simulator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">⚡ 3D Electric Field Lines Simulator (බල රේඛා සමාකරණය)</h3>
            <p className="text-slate-400 text-xs mt-1">ආරෝපණ පද්ධති වෙනස් කරමින් විද්‍යුත් බල රේඛා හැසිරෙන ආකාරය සජීවීව නිරීක්ෂණය කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Box */}
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-700 block">ආරෝපණ පද්ධතිය තෝරන්න:</label>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setChargeSetup('unlike')}
                    className={`p-2.5 rounded-lg text-xs font-bold border text-left transition cursor-pointer ${chargeSetup === 'unlike' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700'}`}
                  >
                    🔵 ධන (+) සහ සෘණ (-) ආරෝපණ දෙකක්
                  </button>
                  <button 
                    onClick={() => setChargeSetup('like_positive')}
                    className={`p-2.5 rounded-lg text-xs font-bold border text-left transition cursor-pointer ${chargeSetup === 'like_positive' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700'}`}
                  >
                    🔴 ධන (+) ආරෝපණ දෙකක් (Like Charges)
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-300 text-xs rounded-xl font-mono mt-4">
                {chargeSetup === 'unlike' ? (
                  <span>💡 ආකර්ෂණ බල ක්ෂේත්‍රයක්: බල රේඛා ධන (+) සිට පිටත්ව සෘණ (-) වෙත ළඟා වේ. මැද නිෂ්ක්‍රීය ලක්ෂ්‍යයක් නැත.</span>
                ) : (
                  <span>💡 විකර්ෂණ බල ක්ෂේත්‍රයක්: බල රේඛා එකිනෙක විකර්ෂණය වේ. ගෝල දෙක මධ්‍යයේ ක්ෂේත්‍ර තීව්‍රතාව ශුන්‍ය වන නිෂ්ක්‍රීය ලක්ෂ්‍යයක් (Neutral Point) හටගනී.</span>
                )}
              </div>
            </div>

            {/* Canvas Display Screen */}
            <div className="lg:col-span-8 bg-slate-950 min-h-[240px] rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-900 p-4">
              
              {/* Dynamic SVG Drawing based on Charge Setup */}
              <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-auto">
                {chargeSetup === 'unlike' ? (
                  // Unlike charges: Curves connecting + and -
                  <g stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.8">
                    <path d="M 100,100 L 300,100" />
                    <path d="M 100,100 Q 200,40 300,100" />
                    <path d="M 100,100 Q 200,160 300,100" />
                    <path d="M 100,100 Q 200,-10 300,100" />
                    <path d="M 100,100 Q 200,210 300,100" />
                    {/* Arrows */}
                    <polygon points="205,100 198,96 198,104" fill="#38bdf8" stroke="none" />
                    <polygon points="205,70 198,66 200,74" fill="#38bdf8" stroke="none" />
                    <polygon points="205,130 198,134 200,126" fill="#38bdf8" stroke="none" />
                  </g>
                ) : (
                  // Like positive charges: Curves bending away
                  <g stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.8">
                    {/* Left charge lines */}
                    <path d="M 100,100 Q 150,50 150,0" />
                    <path d="M 100,100 Q 150,150 150,200" />
                    <path d="M 100,100 L 20,100" />
                    {/* Right charge lines */}
                    <path d="M 300,100 Q 250,50 250,0" />
                    <path d="M 300,100 Q 250,150 250,200" />
                    <path d="M 300,100 L 380,100" />
                    {/* Neutral Point Circle indicator */}
                    <circle cx="200" cy="100" r="4" fill="#e2e8f0" stroke="none" />
                  </g>
                )}

                {/* Left Node Graphic */}
                <g transform="translate(100, 100)">
                  <circle cx="0" cy="0" r="14" fill={chargeSetup === 'unlike' ? '#2563eb' : '#dc2626'} />
                  <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">+</text>
                </g>

                {/* Right Node Graphic */}
                <g transform="translate(300, 100)">
                  <circle cx="0" cy="0" r="14" fill={chargeSetup === 'unlike' ? '#475569' : '#dc2626'} />
                  <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
                    {chargeSetup === 'unlike' ? '-' : '+'}
                  </text>
                </g>
                
                {chargeSetup === 'like_positive' && (
                  <text x="200" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">නිෂ්ක්‍රීය ලක්ෂ්‍යය (N)</text>
                )}
              </svg>

            </div>
          </div>
        </div>

        {/* Mini Quiz Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-950 mb-3 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" /> විභාග ප්‍රශ්න විමර්ශනය (Mini Quiz)
          </h3>
          <p className="text-xs text-slate-600 mb-4">ආරෝපිත සන්නායක ගෝල දෙකක් එකිනෙක ස්පර්ශ කර වෙන් කළ විට, ඒවා මත ආරෝපණ බෙදී යන්නේ කුමන අනුපාතයකටද?</p>
          
          <div className="space-y-2 max-w-md">
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="electroQuiz" value="mass" onChange={(e) => setUserAnswer(e.target.value)} className="text-blue-600" /> ගෝලවල ස්කන්ධවලට සමානුපාතිකව
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="electroQuiz" value="radii" onChange={(e) => setUserAnswer(e.target.value)} className="text-blue-600" /> ගෝලවල අරයයන්ට (Radii) අනුලෝමව සමානුපාතිකව
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="electroQuiz" value="volume" onChange={(e) => setUserAnswer(e.target.value)} className="text-blue-600" /> ගෝලවල පරිමාවන්ට ප්‍රතිලෝමව සමානුපාතිකව
            </label>
          </div>

          <button onClick={checkQuiz} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer border-0">
            පිළිතුර ඉදිරිපත් කරන්න
          </button>

          {quizFeedback && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-950 text-xs md:text-sm font-medium rounded-lg animate-fade-in">
              {quizFeedback}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
