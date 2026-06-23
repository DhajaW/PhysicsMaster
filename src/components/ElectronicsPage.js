'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, Zap, Cpu, Activity, ArrowLeft } from 'lucide-react';

function Accordion({ title, children, isDark = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-150'} last:border-none py-3`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center text-left font-bold transition-colors py-2 focus:outline-none ${isDark ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-800 hover:text-cyan-600'}`}
      >
        <span className="text-base md:text-lg">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function ElectronicsPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';

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
      setQuizFeedback(
        isEnglish
          ? '🎉 Correct! In a Common Emitter (CE) amplifier, there is a 180° phase inversion between the output and input signals. Drawing this in essay questions is mandatory!'
          : '🎉 නිවැරදියි! පොදු විමෝචක (Common Emitter) ප්‍රවර්ධකයක ප්‍රතිදාන සංඥාව සහ ප්‍රදාන සංඥාව අතර 180° ක අවස්ථා විපර්යාසයක් (Phase Inversion) පවතී. විභාගයේදී රචනා ප්‍රශ්න වලදී මෙය ඇඳ පෙන්වීම අනිවාර්ය වේ!'
      );
    } else {
      setQuizFeedback(
        isEnglish
          ? '❌ Incorrect! Remember, the signal inversion (180° phase difference) occurs only in the Common Emitter amplifier configuration.'
          : '❌ වැරදියි! මතක තබාගන්න, පොදු විමෝචක ප්‍රවර්ධකයකදී පමණක් සංඥාව උඩු යටිකුරු වේ (එනම් 180° ක වෙනසක් සිදු වේ).'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-purple-700 to-blue-800 p-6 rounded-2xl shadow-xl border border-purple-500/30">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <div>
              <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 09</span>
              <h1 className="text-3xl font-bold mt-1">
                {isEnglish ? 'Electronics (Unit 09) - Study Guide' : 'ඉලෙක්ට්‍රොනික විද්‍යාව (Electronics) - අධ්‍යයන පිටුව'}
              </h1>
            </div>
          </div>
          <p className="text-purple-200 text-sm mt-3">
            {isEnglish
              ? 'The world of semiconductors, transistors, operational amplifiers, and logic gates.'
              : 'අර්ධ සන්නායක, ට්‍රාන්සිස්ටර, මෙහෙයුම් ප්‍රවර්ධක සහ තාර්කික ද්වාරවල ලෝකය.'}
          </p>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Theory Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
            <h2 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" /> {isEnglish ? 'Resource Book Core Concepts' : 'සම්පත් පොත් මූලික සංකල්ප'}
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                • <strong className="text-slate-100">{isEnglish ? 'P-N Junction Diode:' : 'P-N සන්ධි දියෝඩය:'}</strong>{' '}
                {isEnglish
                  ? 'Current flows during forward bias, while current does not flow during reverse bias.'
                  : 'පෙරබෑවුම් (Forward Bias) අවස්ථාවේදී ධාරාව ගලා යන අතර, පසුබෑවුම් (Reverse Bias) අවස්ථාවේදී ධාරාව ගලා නොයයි.'}
              </li>
              <li>
                • <strong className="text-slate-100">{isEnglish ? 'Transistor:' : 'ට්‍රාන්සිස්ටරය:'}</strong>{' '}
                {isEnglish
                  ? 'In the Common Emitter configuration, it acts as an amplifier or a switch.'
                  : 'පොදු විමෝචක වින්‍යාසයේදී මෙය ප්‍රවර්ධකයක් ලෙස හෝ ස්විචයක් ලෙස ක්‍රියා කරයි.'}
              </li>
              <li>
                • <strong className="text-slate-100">{isEnglish ? 'Operational Amplifiers (Op-Amps):' : 'මෙහෙයුම් ප්‍රවර්ධක (Op-Amps):'}</strong>{' '}
                {isEnglish
                  ? 'A type of IC with very high input resistance and very high voltage gain.'
                  : 'ඉතා ඉහළ ප්‍රදාන ප්‍රතිරෝධයක් සහ ඉතා ඉහළ වෝල්ටීයතා ලාභයක් සහිත IC වර්ගයකි.'}
              </li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md">
            <h2 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> {isEnglish ? 'Paper Marking Secrets (Exam Traps)' : 'Paper Marking රහස් (Exam Traps)'}
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <span className="font-bold text-rose-300 block">
                  {isEnglish ? '⚠️ Phase Inversion:' : '⚠️ අවස්ථා විපර්යාසය (Phase Inversion):'}
                </span>
                {isEnglish
                  ? 'In a Common Emitter (CE) amplifier, the output signal has a 180° phase inversion relative to the input signal. This phase shift must be drawn correctly in graphs.'
                  : 'පොදු විමෝචක (CE) ප්‍රවර්ධකයක ප්‍රතිදාන සංඥාව ප්‍රදාන සංඥාවට සාපේක්ෂව 180° ක් වෙනස් වේ. ප්‍රස්ථාර අඳින විට මෙය අනිවාර්යයෙන්ම දැක්විය යුතුය.'}
              </div>
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <span className="font-bold text-rose-300 block">
                  {isEnglish ? '⚠️ Logic Gate Truth Tables:' : '⚠️ තාර්කික ද්වාර සත්‍යතා වගු:'}
                </span>
                {isEnglish
                  ? 'Always use 0 and 1 when writing outputs in a truth table. Sometimes exams might ask for High/Low, so pay close attention.'
                  : 'සත්‍යතා වගුවක ප්‍රතිදානය (Output) ලිවීමේදී 0 සහ 1 භාවිත කළ යුතුය. ඇතැම් විට විභාගයේදී High/Low ලෙසද ඇසිය හැක.'}
              </div>
            </div>
          </div>
        </div>

        {/* සම්පත් පොත් සාරාංශය: ඉලෙක්ට්‍රොනික විද්‍යාව */}
        <div className="bg-slate-850 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800 mb-8 bg-slate-800/40 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Electronics' : 'සම්පත් පොත් සාරාංශය: ඉලෙක්ට්‍රොනික විද්‍යාව'}
          </h2>

          {/* 1. අර්ධ සන්නායක සහ ඩයෝඩ */}
          <Accordion title={isEnglish ? "01. Semiconductors and Diodes" : "01. අර්ධ සන්නායක සහ දියෝඩ (Semiconductors and Diodes)"} isDark={true}>
            <div className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Intrinsic Semiconductors:' : 'සහජ අර්ධ සන්නායක (Intrinsic Semiconductors):'}</strong>{' '}
                    {isEnglish
                      ? 'Extremely pure semiconductors containing no impurities (e.g., pure Si, Ge).'
                      : 'කිසිදු අපද්‍රව්‍යයක් අඩංගු නොවන, අතිශය පිරිසිදු අර්ධ සන්නායක වේ (උදා: පිරිසිදු Si, Ge).'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Doping:' : 'මාත්‍රණය (Doping):'}</strong>{' '}
                    {isEnglish
                      ? 'The process of adding a very small amount of suitable impurity atoms to increase the conductivity of intrinsic semiconductors.'
                      : 'සහජ අර්ධ සන්නායකවල සන්නායකතාව වැඩි කිරීම සඳහා සුදුසු අපද්‍රව්‍ය පරමාණු (Impurity atoms) ඉතා කුඩා ප්‍රමාණයක් එකතු කිරීමේ ක්‍රියාවලියයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Depletion Region:' : 'වියුක්ති කලාපය (Depletion Region):'}</strong>{' '}
                    {isEnglish
                      ? 'The region near a p-n junction that is depleted of free charge carriers, containing only fixed ions.'
                      : 'p-n සන්ධියක් ආසන්නයේ නිදහස් ආරෝපණ වාහක නොමැති, නිශ්චල අයන පමණක් පවතින කලාපයයි.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-950/50 p-3 rounded border border-slate-800 text-cyan-300">
                  <li>{isEnglish ? 'Junction Current:' : 'සන්ධි ධාරාව:'} I_E = I_B + I_C</li>
                  <li>{isEnglish ? 'Zener Diode Power:' : 'සෙනර් ඩයෝඩයේ උපරිම ජවය:'} P_ZM = V_Z * I_ZM</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'In n-type semiconductors, majority carriers are electrons, while in p-type, majority carriers are holes.'
                      : 'n-වර්ගයේ බහුතර වාහක ඉලෙක්ට්‍රෝන වන අතර p-වර්ගයේ බහුතර වාහක කුහර (Holes) වේ.'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Forward biasing a p-n junction decreases the width of the depletion region, while reverse biasing increases it.'
                      : 'p-n සන්ධියක් පෙර නැඹුරු (Forward bias) කළ විට වියුක්ති කලාපයේ පළල අඩු වේ. පසු නැඹුරු (Reverse bias) කළ විට පළල වැඩි වේ.'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Silicon (Si) diodes have a knee voltage of ≈0.7 V, while Germanium (Ge) has ≈0.3 V.'
                      : 'සිලිකන් (Si) ඩයෝඩයක කැපුම් වෝල්ටීයතාව (Knee voltage) ≈0.7 V ද, ජර්මේනියම් (Ge) සඳහා ≈0.3 V ද වේ.'}
                  </li>
                </ul>
              </div>
              <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <h4 className="font-bold text-rose-350 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-rose-200">
                  {isEnglish
                    ? <span><strong>Zener Diode:</strong> For voltage regulation, it must always be connected in reverse bias. A series resistor (R) is compulsory to limit current.</span>
                    : <span><strong>සෙනර් ඩයෝඩය (Zener Diode):</strong> වෝල්ටීයතා නියාමනය (Voltage regulation) සඳහා මෙය සැමවිටම පරිපථයට සම්බන්ධ කළ යුත්තේ පසු නැඹුරු (Reverse biased) තත්ත්වයෙනි. එසේම ඒ හරහා ගලන ධාරාව සීමා කිරීමට ශ්‍රේණිගත ප්‍රතිරෝධකයක් (R) අනිවාර්යයෙන් තිබිය යුතුය.</span>}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 2. ද්විධ්‍රැවීය ට්‍රාන්සිස්ටර සහ ක්ෂේත්‍ර ආචරණ ට්‍රාන්සිස්ටර */}
          <Accordion title={isEnglish ? "02. Bipolar & Field Effect Transistors (BJT and FET)" : "02. ද්විධ්‍රැවීය ට්‍රාන්සිස්ටර සහ ක්ෂේත්‍ර ආචරණ ට්‍රාන්සිස්ටර (BJT and FET)"} isDark={true}>
            <div className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Bipolar Junction Transistors (BJT):' : 'ද්විධ්‍රැවීය ට්‍රාන්සිස්ටර (Bipolar Junction Transistors - BJT):'}</strong>{' '}
                    {isEnglish
                      ? 'Transistors in which both electrons and holes contribute to conduction (npn and pnp).'
                      : 'ඉලෙක්ට්‍රෝන සහ කුහර යන වාහක වර්ග දෙකම සන්නායකතාව සඳහා දායක වන ට්‍රාන්සිස්ටර වර්ගයකි (npn සහ pnp).'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Field Effect Transistors (FET):' : 'ක්ෂේත්‍ර ආචරණ ට්‍රාන්සිස්ටර (Field Effect Transistors - FET):'}</strong>{' '}
                    {isEnglish
                      ? 'Unipolar transistors in which current is carried by only one type of charge carrier (either electrons or holes).'
                      : 'එක් ආරෝපණ වාහක වර්ගයක් (ඉලෙක්ට්‍රෝන හෝ කුහර) පමණක් ධාරාව ගෙන යන ඒකධ්‍රැවීය (Unipolar) ට්‍රාන්සිස්ටරයකි.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-950/50 p-3 rounded border border-slate-800 text-cyan-300">
                  <li>{isEnglish ? 'BJT Current Gain:' : 'BJT ධාරා ලාභය:'} β = I_C / I_B</li>
                  <li>{isEnglish ? 'BJT Current Relationship:' : 'BJT ධාරා සම්බන්ධය:'} I_E = I_B + I_C</li>
                  <li>{isEnglish ? 'Output Loop Voltage Equation:' : 'වෝල්ටීයතා සමීකරණය (ප්‍රතිදාන පුඩුව):'} V_CE = V_CC - I_C * R_C</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'To act as an amplifier, a transistor must be operated in the active region (E-B forward biased, B-C reverse biased).'
                      : 'ට්‍රාන්සිස්ටරයක් වර්ධකයක් (Amplifier) ලෙස ක්‍රියා කිරීමට නම් එය සක්‍රිය ප්‍රදේශයේ (Active Region) පැවතිය යුතුය. මෙහිදී E-B සන්ධිය පෙර නැඹුරු ද, B-C සන්ධිය පසු නැඹුරු ද විය යුතුය.'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'To act as a switch, it operates only in cut-off (OFF) and saturation (ON) regions.'
                      : 'ට්‍රාන්සිස්ටරයක් ස්විචයක් (Switch) ලෙස භාවිත කිරීමේදී එය ක්‍රියා කරන්නේ කපාහැරීමේ ප්‍රදේශය (Cut-off - OFF තත්ත්වය) සහ සංතෘප්ත ප්‍රදේශය (Saturation - ON තත්ත්වය) තුළ පමණි.'}
                  </li>
                </ul>
              </div>
              <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <h4 className="font-bold text-rose-350 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-rose-200">
                  {isEnglish
                    ? 'BJT is a current-controlled device (IB controls IC), whereas FET is a voltage-controlled device (VGS controls ID).'
                    : 'BJT යනු ධාරා පාලිත (Current controlled) උපාංගයකි (I_B මගින් I_C පාලනය කරයි). නමුත් FET යනු වෝල්ටීයතා පාලිත (Voltage controlled) උපාංගයකි (V_GS මගින් I_D පාලනය කරයි).'}
                </p>
              </div>

              {/* BJT and JFET Comparison Table */}
              <div className="overflow-x-auto mt-4 rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800">
                      <th className="p-3 font-bold text-slate-200">{isEnglish ? 'Characteristic' : 'ලක්ෂණය (Characteristic)'}</th>
                      <th className="p-3 font-bold text-slate-200">{isEnglish ? 'BJT Transistor' : 'BJT ට්‍රාන්සිස්ටරය'}</th>
                      <th className="p-3 font-bold text-slate-200">{isEnglish ? 'JFET Transistor' : 'JFET ට්‍රාන්සිස්ටරය'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-slate-300">{isEnglish ? 'Control' : 'පාලනය (Control)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Current-controlled (controlled by IB)' : 'ධාරා පාලිත (I_B මගින් පාලනය වේ)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Voltage-controlled (controlled by VGS)' : 'වෝල්ටීයතා පාලිත (V_GS මගින් පාලනය වේ)'}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-slate-300">{isEnglish ? 'Input Resistance' : 'ප්‍රදාන ප්‍රතිරෝධය (Input Resistance)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Low (few kΩ)' : 'අඩුය (කිලෝ ඕම් / kΩ ගණනකි)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Very high (several MΩ)' : 'ඉතා ඉහළය (මෙගා ඕම් / MΩ ගණනකි)'}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-slate-300">{isEnglish ? 'Carrier Type' : 'ධාරා වර්ගය (Carrier Type)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Bipolar (holes and electrons)' : 'द्वිධ්‍රැවීය (කුහර සහ ඉලෙක්ට්‍රෝන)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Unipolar (either holes or electrons)' : 'ඒකධ්‍රැවීය (කුහර හෝ ඉලෙක්ට්‍රෝන පමණි)'}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-semibold text-slate-300">{isEnglish ? 'Noise Level' : 'ඝෝෂාව (Noise level)'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Higher' : 'වැඩිය'}</td>
                      <td className="p-3 text-slate-400">{isEnglish ? 'Very low' : 'ඉතා අඩුය'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

          {/* 3. කාරක වර්ධක */}
          <Accordion title={isEnglish ? "03. Operational Amplifiers (Op-Amps)" : "03. කාරක වර්ධක (Operational Amplifiers - Op-Amps)"} isDark={true}>
            <div className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන أර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Operational Amplifier:' : 'කාරක වර්ධකය:'}</strong>{' '}
                    {isEnglish
                      ? 'A basic electronic component with very high voltage gain (open-loop gain) that can amplify both DC and AC signals.'
                      : 'කාරක වර්ධකය යනු ඉතා ඉහළ වෝල්ටීයතා ලාභයක් (Open-loop gain) සහිත, සෘජු ධාරා (DC) මෙන්ම ප්‍රත්‍යාවර්ත ධාරා (AC) සංඥා වර්ධනය කළ හැකි මූලික ඉලෙක්ට්‍රොනික උපාංගයකි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Virtual Earth:' : 'අතාත්වික භූගතය (Virtual Earth):'}</strong>{' '}
                    {isEnglish
                      ? 'The concept that if one input (e.g., non-inverting) is grounded, the other input is considered to be virtually at ground potential (0 V).'
                      : 'වර්ධකයේ එක් ප්‍රදානයක් (උදා: අනපවර්තන ප්‍රදානය) භූගත කර ඇති විට, අනෙක් ප්‍රදානය ද භූගත විභවයට (0 V) ආසන්නව පවතින බව සැලකීමේ සංකල්පයයි.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-950/50 p-3 rounded border border-slate-800 text-cyan-300">
                  <li>{isEnglish ? 'Open-loop Gain:' : 'විවෘත පුඩු ලාභය:'} A_0 = V_out / (V_+ - V_-)</li>
                  <li>{isEnglish ? 'Inverting Amp Gain:' : 'අපවර්තන වර්ධකයේ (Inverting Amp) ලාභය:'} G = -R_f / R_in</li>
                  <li>{isEnglish ? 'Non-inverting Amp Gain:' : 'අනපවර්තන වර්ධකයේ (Non-inverting Amp) ලාභය:'} G = 1 + R_f / R_in</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'Ideal Op-Amp Characteristics: Infinite input resistance (Rin = ∞), zero output resistance (Rout = 0), infinite open-loop gain (A0 = ∞), infinite bandwidth.'
                      : 'පරමාදර්ශී (Ideal) Op-Amp ලක්ෂණ: අනන්ත ප්‍රදාන ප්‍රතිරෝධය (R_in = ∞), ශුන්‍ය ප්‍රතිදාන ප්‍රතිරෝධය (R_out = 0), අනන්ත විවෘත පුඩු ලාභය (A_0 = ∞), අනන්ත කලාප පළල (Infinite Bandwidth).'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Positive feedback is used for oscillators; negative feedback is used for amplifiers.'
                      : 'ධන ප්‍රතිපෝෂණය (Positive feedback) දෝලක (Oscillators) සඳහා ද, සෘණ ප්‍රතිපෝෂණය (Negative feedback) වර්ධක (Amplifiers) සඳහා ද භාවිත වේ.'}
                  </li>
                </ul>
              </div>
              <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <h4 className="font-bold text-rose-350 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-rose-200">
                  {isEnglish
                    ? <span><strong>Golden Rules:</strong> 1. Potential difference between inputs is zero (V+ = V-). 2. No current enters the input terminals (I+ = 0, I- = 0).</span>
                    : <span><strong>ස්වර්ණමය නීති දෙක (Golden Rules):</strong> ගැටළු විසඳීමේදී අනිවාර්යයෙන් යොදාගන්න. 1. ප්‍රදාන අග්‍ර දෙක අතර විභව අන්තරය ශුන්‍ය වේ (V_+ = V_-). 2. ප්‍රදාන අග්‍ර තුළට ධාරාවක් ගමන් නොකරයි (I_+ = 0, I_- = 0).</span>}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 4. සංඛ්‍යාංක ඉලෙක්ට්‍රොනික් විද්‍යාව */}
          <Accordion title={isEnglish ? "04. Digital Electronics" : "04. සංඛ්‍යාංක ඉලෙක්ට්‍රොනික් විද්‍යාව (Digital Electronics)"} isDark={true}>
            <div className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Logic Gates:' : 'තාර්කික ද්වාර (Logic Gates):'}</strong>{' '}
                    {isEnglish
                      ? 'Basic electronic circuits that manipulate digital signals (1 and 0) based on Boolean algebra.'
                      : 'තාර්කික ද්වාර යනු බූලියානු වීජ ගණිතය මත පදනම්ව සංඛ්‍යාංක සංඥා (1 සහ 0) හසුරුවන මූලික ඉලෙක්ට්‍රොනික පරිපථ වේ.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Universal Gates:' : 'සර්වත්‍ර ද්වාර (Universal Gates):'}</strong>{' '}
                    {isEnglish
                      ? 'Gates that can be used alone to build any other basic gate (e.g., NAND and NOR).'
                      : 'වෙනත් ඕනෑම මූලික ද්වාරයක් (AND, OR, NOT) නිර්මාණය කරගැනීම සඳහා තනිවම භාවිත කළ හැකි ද්වාර වේ (උදා: NAND සහ NOR).'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Flip-Flop:' : 'ෆ්‍ලිප්-ෆ්‍ලොපය (Flip-Flop):'}</strong>{' '}
                    {isEnglish
                      ? 'A basic memory element with two stable states that can store one bit of data (1 bit).'
                      : 'දත්ත බිටුවක් (1 bit) ගබඩා කර තබා ගත හැකි, ස්ථායී අවස්ථා දෙකක් ඇති මූලික මතක උපාංගයකි (Memory element).'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-950/50 p-3 rounded border border-slate-800 text-cyan-300">
                  <li>AND {isEnglish ? 'gate' : 'ද්වාරය'}: F = A · B</li>
                  <li>OR {isEnglish ? 'gate' : 'ද්වාරය'}: F = A + B</li>
                  <li>NOT {isEnglish ? 'gate' : 'ද්වාරය'}: F = Ā</li>
                  <li>NAND {isEnglish ? 'gate' : 'ද්වාරය'}: F = A · B (inverted)</li>
                  <li>NOR {isEnglish ? 'gate' : 'ද්වාරය'}: F = A + B (inverted)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-150">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'An S-R flip-flop can be constructed by cross-coupling two NOR gates.'
                      : 'NOR ද්වාර දෙකක් කතිර හැඩයට සම්බන්ධ කිරීමෙන් (Cross-coupled) S-R ෆ්‍ලිප්-ෆ්‍ලොපයක් සාදා ගත හැක.'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Flip-flops are widely used in registers and RAM computer memory designs.'
                      : 'මතක රෙජිස්ටර (Registers) සහ පරිගණක මතක (RAM) නිර්මාණය සඳහා ෆ්‍ලිප්-ෆ්‍ලොප් බහුලව භාවිත වේ.'}
                  </li>
                </ul>
              </div>
              <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <h4 className="font-bold text-rose-350 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-rose-200">
                  {isEnglish
                    ? 'In an S-R flip-flop constructed with NOR gates, applying 1 to both inputs (S=1, R=1) is an "invalid state" because it yields Q=0 and Q̄=0, which contradicts the complementary output principle.'
                    : 'NOR ද්වාර භාවිතයෙන් සෑදූ S-R ෆ්‍ලිප්-ෆ්‍ලොපයකදී, ප්‍රදානයන් දෙකටම එකවර 1 ලබා දීම (S=1, R=1) "වලංගු නොවන අවස්ථාවක්" (Invalid state) ලෙස සැලකේ. විභාගයේදී මෙහි ප්‍රතිදානයන් Q=0 සහ Q̄=0 ලෙස ලැබේ, එය ෆ්‍ලිප්-ෆ්‍ලොපයේ මූලධර්මයට පටහැනි බැවින් භාවිත නොකෙරේ.'}
                </p>
              </div>
            </div>
          </Accordion>

        </div>

        {/* Interactive Logic Gate Playground */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden mb-8 text-left">
          <div className="bg-slate-900 p-5 border-b border-slate-700">
            <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-400">
              <Zap className="w-5 h-5 fill-cyan-400" /> {isEnglish ? 'Logic Gate Playground' : 'Logic Gate Playground (තාර්කික ද්වාර පුවරුව)'}
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              {isEnglish
                ? 'Verify the logic gate output in real time according to the truth table.'
                : 'තාර්කික ද්වාරයක ක්‍රියාකාරීත්වය සත්‍යතා වගුවට අනුව සජීවීව පරීක්ෂා කරන්න.'}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase">
                  {isEnglish ? 'Select Gate:' : 'ද්වාරය තෝරන්න:'}
                </label>
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
                <label className="text-xs font-bold text-slate-400 block uppercase">
                  {isEnglish ? 'Inputs:' : 'ප්‍රදානයන් (Inputs):'}
                </label>
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
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {isEnglish ? 'Output Status' : 'Output Status'}
                </span>
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
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-md border-l-4 border-l-purple-600 text-left">
          <h3 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-purple-500" /> {isEnglish ? 'Exam Question Breakdown (Mini Quiz)' : 'විභාග ප්‍රශ්න විමර්ශනය (Mini Quiz)'}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {isEnglish
              ? 'In a Common Emitter (CE) amplifier, what is the "phase difference" of the output signal relative to the input signal?'
              : 'පොදු විමෝචක (Common Emitter) ප්‍රවර්ධකයක, ප්‍රදාන සංඥාවට සාපේක්ෂව ප්‍රතිදාන සංඥාවේ "අවස්ථා වෙනස" (Phase Difference) කොපමණද?'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <button 
              onClick={() => setQuizAns('0')}
              className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${quizAns === '0' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
            >
              0° {isEnglish ? '(In-phase)' : '(එකම අවස්ථාවේ)'}
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
              180° {isEnglish ? '(Phase Inversion)' : '(විපර්යාසය)'}
            </button>
          </div>

          <button onClick={checkQuiz} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-lg text-xs transition shadow-lg shadow-purple-900/50 cursor-pointer border-0">
            {isEnglish ? 'Submit Answer' : 'පිළිතුර ඉදිරිපත් කරන්න'}
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
