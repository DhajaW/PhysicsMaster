'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, RefreshCw, CheckCircle, Award, Play, Pause, ArrowLeft } from 'lucide-react';

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
          isOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

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

        {/* සම්පත් පොත් සාරාංශය: යාන්ත්ර විද්යාව */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> සම්පත් පොත් සාරාංශය: යාන්ත්ර විද්යාව
          </h2>

          {/* 01. ප්රගති විද්යාව */}
          <Accordion title="01. ප්රගති විද්යාව (Kinematics)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ප්රවේගය (Velocity):</strong> යම් ඔස්සේ වස්තුවක විස්ථාපනය වෙනස් වීමේ සීඝ්රතාවයි.</li>
                  <li><strong>සාපේක්ෂ ප්රවේගය (Relative Velocity):</strong> යම් සමුද්දේශ රාමුවකට (Frame of reference) සාපේක්ෂව වස්තුවක් ගමන් කරන ප්රවේගයයි.</li>
                  <li><strong>ත්වරණය (Acceleration):</strong> කාලය සමග ප්රවේගය වෙනස් වීමේ සීඝ්රතාවයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border">
                  <li>v = u + at</li>
                  <li>s = ((u + v) / 2)t</li>
                  <li>s = ut + ½at²</li>
                  <li>v² = u² + 2as (u: ආරම්භක ප්රවේගය, v: අවසාන ප්රවේගය, a: ත්වරණය, s: විස්ථාපනය, t: කාලය)</li>
                  <li>සාපේක්ෂ ප්රවේගය: v_A,B = v_A,E + v_E,B (E යනු පොළොව වේ)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>විස්ථාපන - කාල ප්රස්ථාරය:</strong> අනුක්රමණය මගින් ප්රවේගය ලබා දේ.</li>
                  <li><strong>ප්රවේග - කාල ප්රස්ථාරය:</strong> අනුක්රමණය මගින් ත්වරණය ලබා දෙන අතර, ප්රස්ථාරය සහ කාල අක්ෂය අතර වර්ගඵලය මගින් විස්ථාපනය ලබා දේ.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">v = u + at ඇතුළු චලිත සමීකරණ යෙදිය හැක්කේ නියත ත්වරණයකින් (Constant Acceleration) චලිත වන වස්තු සඳහා පමණි. ත්වරණය විචල්ය නම් ප්රස්ථාර භාවිත කළ යුතුය.</p>
              </div>
            </div>
          </Accordion>

          {/* 02. බලය හා චලිතය */}
          <Accordion title="02. බලය හා චලිතය (Force and Motion)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ගම්යතාව (Momentum):</strong> වස්තුවක ස්කන්ධයෙහිත් ප්රවේගයෙහිත් ගුණිතයයි (p = mv).</li>
                  <li><strong>ආවේගය (Impulse):</strong> බලය සහ බලය ක්රියා කළ කාලයෙහි ගුණිතයයි. මෙය ගම්යතා වෙනසට සමාන වේ.</li>
                  <li><strong>ඝර්ෂණය (Friction):</strong> එකිනෙක ස්පර්ශව පවතින පෘෂ්ඨ දෙකක් අතර ලිස්සා යාම හෝ ලිස්සා යාමට දරන උත්සාහය වළක්වන බලයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border">
                  <li>නිව්ටන්ගේ දෙවන නියමය: F = ma</li>
                  <li>ආවේගය: I = F × t = mv - mu</li>
                  <li>ඝර්ෂණ නියමය: F = μR (F: සීමාකාරී/ගතික ඝර්ෂණය, μ: ඝර්ෂණ සංගුණකය, R: අභිලම්බ ප්රතික්රියාව)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>රේඛීය ගම්යතාව සංස්ථිති මූලධර්මය:</strong> බාහිර අසමතුලිත බලයක් ක්රියා නොකරයි නම්, පද්ධතියක මුළු ගම්යතාව නියතව පවතී.</li>
                  <li><strong>සීමාකාරී ඝර්ෂණය:</strong> වස්තුවක් චලිත වීම ඇරඹෙන මොහොතේ පවතින උපරිම ස්ථිතික ඝර්ෂණ බලයයි.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">F = ma යෙදීමේ දී, F යනු වස්තුව මත ක්රියාකරන සම්ප්රයුක්ත බලය (Resultant Force) විය යුතුමය. හුදෙක් එක් බලයක් පමණක් යෙදීමෙන් පිළිතුරු වැරදේ.</p>
              </div>
            </div>
          </Accordion>

          {/* 03. කාර්යය, ශක්තිය සහ ජවය */}
          <Accordion title="03. කාර්යය, ශක්තිය සහ ජවය (Work, Energy & Power)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>කාර්යය (Work):</strong> වස්තුවක් මත බලයක් යෙදූ විට බලයේ දිශාවට සිදුවන විස්ථාපනය හා බලයේ ගුණිතයයි.</li>
                  <li><strong>ජවය (Power):</strong> කාර්යය කිරීමේ සීඝ්රතාව හෙවත් ශක්තිය මාරු වීමේ සීඝ්රතාවයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border">
                  <li>කාර්යය: W = Fs cos(θ)</li>
                  <li>චාලක ශක්තිය: K.E = ½mv²</li>
                  <li>විභව ශක්තිය: P.E = mgh</li>
                  <li>ප්රත්යාස්ථ විභව ශක්තිය: W = ½kx²</li>
                  <li>ජවය: P = W/t හෝ P = Fv</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">W = Fs සමීකරණය භාවිත කළ හැක්කේ නියත බලයක් ඇති විට පමණි. දුන්නක් ඇදීම වැනි විචල්ය බලයක් ඇති අවස්ථාවල ප්රස්ථාරයේ වර්ගඵලය මගින් (උදා: ½Fx) කාර්යය සෙවිය යුතුය.</p>
              </div>
            </div>
          </Accordion>

          {/* 04. භ්රමණ හා වෘත්තාකාර චලිතය */}
          <Accordion title="04. භ්රමණ හා වෘත්තාකාර චලිතය (Rotational Motion)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>කෝණික ප්රවේගය (ω):</strong> කෝණික විස්ථාපනය වෙනස් වීමේ සීඝ්රතාවයි (ω = Δθ / Δt).</li>
                  <li><strong>අවස්ථිති ඝූර්ණය (I):</strong> භ්රමණ චලිතයේ දී වස්තුවක් සිය අවස්ථිති තත්ත්වය වෙනස් කිරීමට දක්වන විරෝධයයි (I = Σmr²).</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border">
                  <li>රේඛීය හා කෝණික සම්බන්ධතා: v = rω, a = rα</li>
                  <li>කේන්ද්රාභිසාරී ත්වරණය: a = v²/r = rω²</li>
                  <li>කෝණික ගම්යතාව (L): L = Iω</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">බාහිර ව්යාවර්තයක් (External Torque) නොමැති නම් Iω = නියතයකි. දෑත් දිගු කර භ්රමණය වන අයෙකු දෑත් හැකිලූ විට I අඩුවන බැවින් කෝණික ප්රවේගය (ω) වැඩි වේ.</p>
              </div>
            </div>
          </Accordion>

          {/* 05. ද්රවස්ථිති හා තරල ගති විද්යාව */}
          <Accordion title="05. ද්රවස්ථිති හා තරල ගති විද්යාව (Hydrostatics)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ඝනත්වය (Density):</strong> ඒකක පරිමාවක ස්කන්ධයයි (ρ = m/V).</li>
                  <li><strong>උත්ප්ලාවකතාව (Upthrust):</strong> තරලයක ගිලී ඇති වස්තුවක් මත තරලය මගින් ඉහළට ඇති කරන සම්ප්රයුක්ත බලයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border">
                  <li>ද්රවස්ථිති පීඩනය: P = hρg</li>
                  <li>සාන්තත්ය සමීකරණය: A₁v₁ = A₂v₂</li>
                  <li>බර්නූලි සමීකරණය: P + ½ρv² + hρg = නියතයකි</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">බර්නූලි මූලධර්මය යෙදිය හැක්කේ දුස්ස්රාවී නොවන, අසම්පීඩ්ය, අනාකූල තරල ප්රවාහ සඳහා පමණි.</p>
              </div>

              {/* Density Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b-2 border-blue-100">
                      <th className="p-2 font-semibold text-blue-900">ද්රව්යය</th>
                      <th className="p-2 font-semibold text-blue-900">ඝනත්වය (kg m⁻³)</th>
                      <th className="p-2 font-semibold text-blue-900">සාපේක්ෂ ඝනත්වය</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">ජලය</td><td className="p-2">1.0 × 10³ (1000)</td><td className="p-2">1.00</td></tr>
                    <tr className="border-b"><td className="p-2">රසදිය</td><td className="p-2">13.6 × 10³ (13600)</td><td className="p-2">13.6</td></tr>
                    <tr className="border-b"><td className="p-2">මුහුදු ජලය</td><td className="p-2">1.03 × 10³ (1030)</td><td className="p-2">1.03</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

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
