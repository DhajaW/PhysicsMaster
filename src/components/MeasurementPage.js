'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, RotateCw, CheckCircle, Award, ArrowRight, ArrowLeft } from 'lucide-react';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-none py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-slate-800 hover:text-indigo-600 transition-colors py-2 focus:outline-none"
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

        {/* සම්පත් පොත් සාරාංශය: මිනුම */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> සම්පත් පොත් සාරාංශය: මිනුම
          </h2>

          {/* 01. භෞතික රාශි සහ ඒකක */}
          <Accordion title="01. භෞතික රාශි සහ ඒකක (Physical Quantities and Units)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>මූලික රාශි (Base Quantities):</strong> වෙනත් කිසිදු භෞතික රාශියක් ඇසුරෙන් ප්රකාශ කළ නොහැකි, ස්වාධීන රාශීන් ය.</li>
                  <li><strong>ව්යුත්පන්න රාශි (Derived Quantities):</strong> මූලික රාශි දෙකක් හෝ කිහිපයක් ගුණ කිරීමෙන් හෝ බෙදීමෙන් ලබා ගන්නා රාශීන් ය.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>SI ඒකක පද්ධතියේ මූලික රාශි 7ක් සහ පරිපූරක රාශි 2ක් ඇත (තල කෝණය සහ ඝන කෝණය).</li>
                  <li>ඒකක ලිවීමේදී බහු වචන භාවිත නොකෙරේ (උදා: 5 kg මිස 5 kgs නොවේ).</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ගුණිතයක් ලෙස ඒකක ලිවීමේදී මූල ඒකක අතර එක් පරතරයක් (Space) අනිවාර්යයෙන් තැබිය යුතුය (උදා: 10 m s⁻¹ නිවැරදිය, 10 ms⁻¹ යනු තත්පරයට මිලිමීටර නොව ප්‍රතිලෝම මිලි තත්පර වේ).</p>
              </div>

              {/* SI Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-blue-50 border-b-2 border-blue-100">
                      <th className="p-2 font-semibold text-blue-900">භෞතික රාශිය</th>
                      <th className="p-2 font-semibold text-blue-900">SI ඒකකය</th>
                      <th className="p-2 font-semibold text-blue-900">සංකේතය</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">දිග (Length)</td><td className="p-2">මීටරය</td><td className="p-2 font-mono">m</td></tr>
                    <tr className="border-b"><td className="p-2">ස්කන්ධය (Mass)</td><td className="p-2">කිලෝග්රෑමය</td><td className="p-2 font-mono">kg</td></tr>
                    <tr className="border-b"><td className="p-2">කාලය (Time)</td><td className="p-2">තත්පරය</td><td className="p-2 font-mono">s</td></tr>
                    <tr className="border-b"><td className="p-2">උෂ්ණත්වය (Temperature)</td><td className="p-2">කෙල්විනය</td><td className="p-2 font-mono">K</td></tr>
                    <tr className="border-b"><td className="p-2">විද්යුත් ධාරාව (Electric Current)</td><td className="p-2">ඇම්පියරය</td><td className="p-2 font-mono">A</td></tr>
                    <tr className="border-b"><td className="p-2">පදාර්ථ ප්‍රමාණය (Amount of Substance)</td><td className="p-2">මවුලය</td><td className="p-2 font-mono">mol</td></tr>
                    <tr className="border-b"><td className="p-2">දීප්ත තීව්රතාව (Luminous Intensity)</td><td className="p-2">කැන්ඩෙලාව</td><td className="p-2 font-mono">cd</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

          {/* 02. මාන සහ මාන විශ්ලේෂණය */}
          <Accordion title="02. මාන සහ මාන විශ්ලේෂණය (Dimensions)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <p><strong>මාන (Dimensions):</strong> භෞතික රාශියක් මූලික රාශිවලට බැඳී ඇති ආකාරය දක්වන සංකේතාත්මක ප්රකාශනයකි.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <p className="bg-gray-50 p-2 rounded font-mono text-sm border">මාන සමජාතීයතාව: a = bc + d/e සමීකරණයක් නම්, [a] = [bc] = [d/e] විය යුතුමය.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ප්රධාන මාන සංකේත: ස්කන්ධය M, දිග L, කාලය T.</li>
                  <li>ඉලක්කම්, වර්තනාංකය, ඝර්ෂණ සංගුණකය වැනි ඒකක රහිත රාශිවලට මාන නොමැත.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">මාන විශ්ලේෂණය භාවිතයෙන් සමීකරණයක ඇති නියතවල (Constants) අගය සෙවිය නොහැක.</p>
              </div>
            </div>
          </Accordion>

          {/* 03. දෝෂ සහ මිනුම් උපකරණ */}
          <Accordion title="03. දෝෂ සහ මිනුම් උපකරණ (Errors and Instruments)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>ඒකාංග දෝෂ (Systematic Errors):</strong> උපකරණයේ දෝෂ හෝ වැරදි පරිහරණය නිසා එක් දිශාවකට පමණක් සිදුවන දෝෂ.</li>
                  <li><strong>අහඹු දෝෂ (Random Errors):</strong> පරීක්ෂණයේ නිරීක්ෂණ ගන්නා විට අහඹු ලෙස සිදුවන දෝෂ. මධ්යන්යය ගැනීමෙන් මෙය අවම කළ හැක.</li>
                  <li><strong>කුඩා ම මිනුම (Least Count):</strong> මිනුම් උපකරණයකින් ලබා ගත හැකි කුඩා ම මිනුමයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <p className="bg-gray-50 p-2 rounded font-mono text-sm border">ප්රතිශත දෝෂය = (නිරපේක්ෂ දෝෂය / මැනිය යුතු මිනුම) × 100%</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">සාමාන්ය මීටර රූලක කුඩා ම මිනුම 1 mm වේ. ප්රතිශත දෝෂය 1% කට වඩා අඩුවෙන් තබා ගැනීමට නම් මීටර රූලෙන් මනින අවම දිග 100 mm (10 cm) විය යුතුය.</p>
              </div>
            </div>
          </Accordion>

          {/* 04. වර්නියර් සහ මයික්රොමීටර */}
          <Accordion title="04. වර්නියර් සහ මයික්රොමීටර උපකරණ">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>අන්තරාලය (Pitch):</strong> මයික්රොමීටර ඉස්කුරුප්පුවේ දීදාලය (Thimble) එක් සම්පූර්ණ වටයක් කරකැවීමේ දී ඉස්කුරුප්පුව ගමන් කරන රේඛීය දුරයි.</li>
                  <li><strong>මූලාංක දෝෂය (Zero Error):</strong> උපකරණයේ හනු ස්පර්ශ වන විට ප්රධාන පරිමාණයේ ශුන්යය සහ අනෙක් පරිමාණයේ ශුන්යය සමපාත නොවීමයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                <ul className="list-disc pl-5 space-y-1 font-mono text-sm">
                  <li>මයික්රොමීටර කුඩා ම මිනුම = අන්තරාලය / වෘත්තාකාර පරිමාණයේ කොටස් ගණන</li>
                  <li>ගෝලමානය: වක්රතා අරය R = a² / 6h + h / 2</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <ul className="list-disc pl-5 text-sm mt-1 text-amber-900 space-y-1">
                  <li><strong>මයික්රොමීටර රැචට්ටුව (Ratchet):</strong> වස්තුව සිර කිරීමේදී අනිවාර්යයෙන්ම රැචට්ටුව පමණක් කරකැවිය යුතුය.</li>
                  <li><strong>ගෝලමානය:</strong> පරීක්ෂණයට පෙර අනිවාර්යයෙන්ම තල වීදුරු පෘෂ්ඨයක් මත තබා එහි මූලාංක දෝෂය ලබා ගත යුතුය.</li>
                </ul>
              </div>
            </div>
          </Accordion>

          {/* 05. අදිශ සහ දෛශික */}
          <Accordion title="05. අදිශ සහ දෛශික (Scalars and Vectors)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම්:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>අදිශ (Scalars):</strong> විශාලත්වයක් පමණක් ඇති, දිශාවක් නොමැති භෞතික රාශීන් (උදා: දුර, කාලය, ස්කන්ධය).</li>
                  <li><strong>දෛශික (Vectors):</strong> විශාලත්වයක් මෙන්ම දිශාවක් ද ඇති, විශේෂයෙන් &quot;දෛශික ආකලන නියම&quot; පිළිපදින භෞතික රාශීන් (උදා: විස්ථාපනය, ප්රවේගය).</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">යම් රාශියකට විශාලත්වයක් සහ දිශාවක් තිබූ පමණින් එය දෛශිකයක් නොවේ; එය අනිවාර්යයෙන්ම &quot;දෛශික ආකලන නියම&quot; (Vector laws of addition) පිළිපැදිය යුතුය.</p>
              </div>
            </div>
          </Accordion>

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
