'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, Zap, RefreshCw, ArrowLeft } from 'lucide-react';

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
          isOpen ? 'max-h-[1200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function ElectrostaticsPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';

  // Simulator State
  const [chargeSetup, setChargeSetup] = useState('unlike'); // unlike, like_positive, like_negative

  // Mini Quiz State
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const checkQuiz = () => {
    if (userAnswer === 'radii') {
      setQuizFeedback(
        isEnglish
          ? '🎉 Correct! When two conducting spheres are brought into contact, their charges redistribute directly proportional to their radii (Q₁/Q₂ = R/r). This is a secret frequently tested in exam MCQs!'
          : '🎉 නිවැරදියි! සන්නායක ගෝල දෙකක් එකිනෙක ස්පර්ශ කළ විට ඒවායේ ආරෝපණ නැවත බෙදී යන්නේ ඒවායේ අරයයන්ට (Radii) අනුලෝමව සමානුපාතිකවයි (Q₁/Q₂ = R/r). විභාගයේදී නිතරම MCQ වලට එන රහසකි!'
      );
    } else {
      setQuizFeedback(
        isEnglish
          ? '❌ Incorrect! Remember, charges redistribute based on the radii of the spheres, not their mass or volume.'
          : '❌ වැරදියි! මතක තබාගන්න, ආරෝපණ බෙදී යන්නේ ස්කන්ධය හෝ පරිමාව මත නොව, ගෝලවල අරයයන්ට (Radii) අනුලෝමව සමානුපාතිකවයි.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-2xl shadow-md">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 text-left">
            <span className="bg-blue-500/30 border border-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 06</span>
            <h1 className="text-3xl font-bold mt-2">
              {isEnglish ? 'Electrostatic Fields (Unit 06) - Study Guide' : 'ස්ථිති විද්‍යුත් ක්ෂේත්‍ර (Electrostatic Fields) - අධ්‍යයන පිටුව'}
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              {isEnglish 
                ? 'Coulomb\'s law, electric field intensity, field lines, and capacitance concepts.' 
                : 'කූලෝම් නියමය, විද්‍යුත් ක්ෂේත්‍ර තීව්‍රතාවය, බල රේඛා සහ ධාරිත්‍රක සංකල්ප.'}
            </p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" /> {isEnglish ? 'Resource Book Core Concepts' : 'සම්පත් පොත් මූලික සංකල්ප'}
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                • <strong className="text-slate-800">{isEnglish ? 'Electric Field Lines:' : 'විද්‍යුත් බල රේඛා:'}</strong>{' '}
                {isEnglish
                  ? 'Imaginary lines showing the direction a free positive charge would move in an electric field. They always start from the positive (+) terminal and end at the negative (-) terminal.'
                  : 'විද්‍යුත් ක්ෂේත්‍රයක ඇති නිදහස් ධන ආරෝපණයක් චලනය වන දිශාව පෙන්වන මනඃකල්පිත රේඛා වේ. ඒවා සැමවිටම ධන (+) අග්‍රයෙන් ආරම්භ වී සෘණ (-) අග්‍රයෙන් අවසන් වේ.'}
              </li>
              <li>
                • <strong className="text-slate-800">{isEnglish ? 'Field Intensity (E):' : 'ක්ෂේත්‍ර තීව්‍රතාවය (E):'}</strong>{' '}
                {isEnglish
                  ? 'The intensity of a uniform electric field can be found using the equation E = V/d (where V is the potential difference and d is the distance between plates).'
                  : 'E = V/d සමීකරණය මගින් ඒකාකාර විද්‍යුත් ක්ෂේත්‍රයක තීව්‍රතාවය සෙවිය හැක (මෙහි V යනු විභව අන්තරය සහ d යනු තහඩු අතර දුරයි).'}
              </li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-500" /> {isEnglish ? 'Paper Marking Secrets (Exam Traps)' : 'Paper Marking රහස් (Exam Traps)'}
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg">
                <span className="font-bold text-cyan-800 block">
                  {isEnglish ? '⚠️ Field Line Drawing Trap (Drawing Rules):' : '⚠️ බල රේඛා ඇඳීමේ උගුල (Drawing Rules):'}
                </span>
                {isEnglish
                  ? 'If you draw electric field lines intersecting each other in the exam, you will lose all marks! Furthermore, lines must always be drawn perpendicular (90°) to the surfaces where they start and end.'
                  : 'විභාගයේදී විද්‍යුත් බල රේඛා එකිනෙක කැපෙන සේ ඇන්දොත් ලකුණු සම්පූර්ණයෙන්ම කැපේ! එමෙන්ම රේඛා ආරම්භ වන සහ අවසන් වන පෘෂ්ඨයන්ට ඒවා සෑමවිටම ලම්බකව (90°) ඇඳිය යුතුය.'}
              </div>
              <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg">
                <span className="font-bold text-cyan-800 block">
                  {isEnglish ? '⚠️ Field Line Arrows:' : '⚠️ බල රේඛාවල ඊතල (Arrows):'}
                </span>
                {isEnglish
                  ? 'Arrowheads must always point away from positive charges and towards negative charges. Field lines drawn without arrows will not receive any marks.'
                  : 'ඊතල හිස් සෑමවිටම ධන ආරෝපණයෙන් ඉවතටත්, සෘණ ආරෝපණය දෙසටත් යොමු විය යුතුය. ඊතල නැතිව අඳින බල රේඛාවලට ලකුණු ලැබෙන්නේ නැත.'}
              </div>
            </div>
          </div>
        </div>

        {/* සම්පත් පොත් සාරාංශය: ස්ථිති විද්‍යුත් ක්ෂේත්‍ර */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Electrostatic Fields' : 'සම්පත් පොත් සාරාංශය: ස්ථිති විද්‍යුත් ක්ෂේත්‍ර'}
          </h2>

          {/* 1. කූලෝම් නියම */}
          <Accordion title={isEnglish ? "01. Coulomb's Law" : "01. කූලෝම් නියමය (Coulomb's Law)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <p>
                  {isEnglish
                    ? <span><strong>Coulomb's Law:</strong> The mutual electrostatic force acting between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.</span>
                    : <span><strong>කූලෝම් නියමය:</strong> ලක්ෂීය ආරෝපණ දෙකක් අතර ක්රියා කරන අන්යෝන්ය විද්යුත් බලය, ආරෝපණවල ගුණිතයට අනුලෝමව ද දුරෙහි වර්ගයට ප්රතිලෝමව ද සමානුපාතික වේ.</span>}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Formulas and Equations:' : 'සූත්ර සහ සමීකරණ (Equations):'}</h4>
                <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                  F = (1 / 4πε₀) * (Q₁Q₂ / r²) ({isEnglish ? 'ε₀ = Permittivity of free space' : 'ε₀ = රික්තයේ පාරවේද්යතාව'})
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'Like charges (+, + or -, -) repel each other, while unlike charges (+, -) attract each other.'
                      : 'සජාතීය ආරෝපණ (+, + හෝ -, -) විකර්ෂණය වන අතර විජාතීය ආරෝපණ (+, -) ආකර්ෂණය වේ.'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'This law applies ONLY to point charges. It cannot be applied directly to large charged objects.'
                    : 'මෙම නියමය අදාළ වන්නේ ලක්ෂීය (Point) ආරෝපණ සඳහා පමණි. විශාල ආරෝපිත වස්තු සඳහා සෘජුවම යෙදිය නොහැක.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 2. විද්යුත් ක්ෂේත්ර තීව්රතාව සහ ගවුස් ප්රමේයය */}
          <Accordion title={isEnglish ? "02. Electric Field Intensity & Gauss's Theorem" : "02. විද්යුත් ක්ෂේත්ර තීව්රතාව සහ ගවුස් ප්රමේයය (Electric Field Intensity & Gauss's Law)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Electric Field Intensity (E):' : 'විද්යුත් ක්ෂේත්ර තීව්රතාව (E):'}</strong>{' '}
                    {isEnglish
                      ? 'The force acting on a unit positive charge placed at a given point in the electric field.'
                      : 'ක්ෂේත්රයක යම් ලක්ෂ්යයක තැබූ ඒකක ධන ආරෝපණයක් මත ක්රියා කරන බලයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? "Gauss's Theorem:" : 'ගවුස් ප්රමේයය (Gauss\'s Theorem):'}</strong>{' '}
                    {isEnglish
                      ? 'The total electric flux through any closed surface is equal to the net charge enclosed by that surface divided by ε₀.'
                      : 'ඕනෑම සංවෘත පෘෂ්ඨයක් හරහා ඇති මුළු විද්යුත් ස්රාවය, එම පෘෂ්ඨයෙන් වටකර ඇති ශුද්ධ ආරෝපණය ε₀ න් බෙදූ විට ලැබෙන අගයට සමාන වේ.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Formulas and Equations:' : 'සූත්ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? 'Field Intensity:' : 'තීව්රතාව:'} E = F / q = (1 / 4πε₀) * (Q / r²)</li>
                  <li>{isEnglish ? 'Flux:' : 'ස්්රාවය:'} φ = EA = Q / ε₀</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'The electric field intensity at any point inside a conducting sphere is zero (E = 0).'
                      : 'සන්නායක ගෝලයක අභ්යන්තරයේ ඕනෑම ලක්ෂ්යයක විද්යුත් ක්ෂේත්ර තීව්රතාව ශුන්ය වේ (E = 0).'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'When drawing electric field lines, it is compulsory that they never intersect each other and are perpendicular to the conducting surface (with arrows from + to -).'
                    : 'විද්යුත් බල රේඛා අඳින විට ඒවා කිසිවිටෙකත් එකිනෙක කැපී නොයන සේත්, සන්නායක පෘෂ්ඨයට ලම්බකවත් (+ සිට - දක්වා ඊතල සහිතව) ඇඳීම අනිවාර්ය වේ.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 3. විද්යුත් විභවය */}
          <Accordion title={isEnglish ? "03. Electric Potential" : "03. විද්යුත් විභවය (Electric Potential)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <p>
                  <strong>{isEnglish ? 'Electric Potential (V):' : 'විද්යුත් විභවය (V):'}</strong>{' '}
                  {isEnglish
                    ? 'The work done in bringing a unit positive charge from infinity to a given point in an electric field.'
                    : 'අනන්තයේ සිට ඒකක ධන ආරෝපණයක් විද්යුත් ක්ෂේත්රයේ යම් ලක්ෂ්යයකට ගෙන ඒමට කළ යුතු කාර්යයයි.'}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Formulas and Equations:' : 'සූත්ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? 'Potential:' : 'විභවය:'} V = (1 / 4πε₀) * (Q / r)</li>
                  <li>{isEnglish ? 'Work Done:' : 'කළ කාර්යය:'} W = V * q</li>
                  <li>{isEnglish ? 'Relationship between Intensity and Potential:' : 'තීව්රතාව සහ විභවය අතර සම්බන්ධය:'} E = V / d {isEnglish ? '(for parallel plates)' : '(සමාන්තර තහඩු සඳහා)'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'Potential is a scalar quantity. A positive charge creates a positive potential, while a negative charge creates a negative potential.'
                      : 'විභවය අදිශ රාශියකි. ධන ආරෝපණයක් මගින් ධන විභවයක් ද, සෘණ ආරෝපණයක් මගින් සෘණ විභවයක් ද ඇති කරයි.'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'The potential inside a conducting sphere is constant. It is exactly equal to the potential on the surface of the sphere (V_inside = V_surface).'
                    : 'සන්නායක ගෝලයක අභ්යන්තරයේ ඇති විභවය නියත අගයකි. එය ගෝලයේ මතුපිට පෘෂ්ඨයේ ඇති විභවයට හරියටම සමාන වේ (V_inside = V_surface).'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 4. ධාරිත්රක */}
          <Accordion title={isEnglish ? "04. Capacitors" : "04. ධාරිත්රක (Capacitors)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <p>
                  <strong>{isEnglish ? 'Capacitance (C):' : 'ධාරිතාව (Capacitance - C):'}</strong>{' '}
                  {isEnglish
                    ? 'The amount of charge that must be given to a conductor to increase its potential by one unit.'
                    : 'සන්නායකයක විභවය ඒකකයකින් වැඩි කිරීමට ඊට ලබා දිය යුතු ආරෝපණ ප්රමාණයයි.'}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Formulas and Equations:' : 'සූත්ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? 'Capacitance:' : 'ධාරිතාව:'} C = Q / V</li>
                  <li>{isEnglish ? 'For a parallel plate capacitor:' : 'සමාන්තර තහඩු ධාරිත්රකයක් සඳහා:'} C = ε₀ A / d</li>
                  <li>{isEnglish ? 'Stored Energy:' : 'ගබඩා වන ශක්තිය:'} W = 1/2 * QV = 1/2 * CV²</li>
                  <li>{isEnglish ? 'Capacitors in series:' : 'ධාරිත්රක ශ්රේණිගතව:'} 1/C_total = 1/C₁ + 1/C₂</li>
                  <li>{isEnglish ? 'Capacitors in parallel:' : 'ධාරිත්රක සමාන්තරගතව:'} C_total = C₁ + C₂</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'When a dielectric material is placed between the plates, the capacitance increases by k times (C = kε₀ A / d). The dielectric constant k is always greater than 1.'
                      : 'තහඩු අතර පාරවිද්යුත් ද්රව්යයක් (Dielectric) තැබූ විට ධාරිතාව k ගුණයකින් වැඩි වේ (C = kε₀ A / d). පාරවිද්යුත් නියතය k සෑමවිටම 1ට වඩා විශාල අගයකි.'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'If a capacitor is disconnected from the electric source (cell) and a dielectric material is inserted, the charge (Q) remains constant. If it is inserted while still connected to the cell, the potential difference (V) remains constant.'
                    : 'ධාරිත්රකයක් විද්යුත් ප්රභවයකින් (කෝෂයකින්) විසන්ධි කර පාරවිද්යුත් ද්රව්යය ඇතුළු කළහොත් ආරෝපණය (Q) නියතව පවතින අතර, කෝෂයට සම්බන්ධ කර තිබියදීම ඇතුළු කළහොත් විභව අන්තරය (V) නියතව පවතී.'}
                </p>
              </div>
            </div>
          </Accordion>

        </div>

        {/* 3D Field Lines Simulator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8 text-left">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              ⚡ {isEnglish ? '3D Electric Field Lines Simulator' : '3D Electric Field Lines Simulator (බල රේඛා සමාකරණය)'}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {isEnglish 
                ? 'Observe live how electric field lines behave as you change the charge configuration.' 
                : 'ආරෝපණ පද්ධති වෙනස් කරමින් විද්‍යුත් බල රේඛා හැසිරෙන ආකාරය සජීවීව නිරීක්ෂණය කරන්න.'}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Box */}
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-700 block">
                  {isEnglish ? 'Select Charge Configuration:' : 'ආරෝපණ පද්ධතිය තෝරන්න:'}
                </label>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setChargeSetup('unlike')}
                    className={`p-2.5 rounded-lg text-xs font-bold border text-left transition cursor-pointer ${chargeSetup === 'unlike' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700'}`}
                  >
                    {isEnglish ? '🔵 Two unlike charges (+ and -)' : '🔵 ධන (+) සහ සෘණ (-) ආරෝපණ දෙකක්'}
                  </button>
                  <button 
                    onClick={() => setChargeSetup('like_positive')}
                    className={`p-2.5 rounded-lg text-xs font-bold border text-left transition cursor-pointer ${chargeSetup === 'like_positive' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700'}`}
                  >
                    {isEnglish ? '🔴 Two like charges (+ and +)' : '🔴 ධන (+) ආරෝපණ දෙකක් (Like Charges)'}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-300 text-xs rounded-xl font-mono mt-4">
                {chargeSetup === 'unlike' ? (
                  <span>
                    {isEnglish 
                      ? '💡 Attractive Field: Field lines emerge from positive (+) and terminate on negative (-). No neutral point in between.' 
                      : '💡 ආකර්ෂණ බල ක්ෂේත්‍රයක්: බල රේඛා ධන (+) සිට පිටත්ව සෘණ (-) වෙත ළඟා වේ. මැද නිෂ්ක්‍රීය ලක්ෂ්‍යයක් නැත.'}
                  </span>
                ) : (
                  <span>
                    {isEnglish 
                      ? '💡 Repulsive Field: Field lines repel each other. A neutral point where field intensity is zero arises exactly at the center between the spheres.' 
                      : '💡 විකර්ෂණ බල ක්ෂේත්‍රයක්: බල රේඛා එකිනෙක විකර්ෂණය වේ. ගෝල දෙක මධ්‍යයේ ක්ෂේත්‍ර තීව්‍රතාව ශුන්‍ය වන උදාසීන ලක්ෂ්‍යයක් (Neutral Point) හටගනී.'}
                  </span>
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
                  <text x="200" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {isEnglish ? 'Neutral Point (N)' : 'උදාසීන ලක්ෂ්‍යය (N)'}
                  </text>
                )}
              </svg>

            </div>
          </div>
        </div>

        {/* Mini Quiz Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-left">
          <h3 className="text-base font-bold text-slate-950 mb-3 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" /> {isEnglish ? 'Exam Question Breakdown (Mini Quiz)' : 'විභාග ප්‍රශ්න විමර්ශනය (Mini Quiz)'}
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            {isEnglish 
              ? 'When two charged conducting spheres are touched together and then separated, in what ratio is the charge distributed between them?' 
              : 'ආරෝපිත සන්නායක ගෝල දෙකක් එකිනෙක ස්පර්ශ කර වෙන් කළ විට, ඒවා මත ආරෝපණ බෙදී යන්නේ කුමන අනුපාතයකටද?'}
          </p>
          
          <div className="space-y-2 max-w-md">
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="electroQuiz" value="mass" onChange={(e) => setUserAnswer(e.target.value)} className="text-blue-600" />{' '}
              {isEnglish ? 'Proportional to the masses of the spheres' : 'ගෝලවල ස්කන්ධවලට සමානුපාතිකව'}
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="electroQuiz" value="radii" onChange={(e) => setUserAnswer(e.target.value)} className="text-blue-600" />{' '}
              {isEnglish ? 'Directly proportional to the radii of the spheres' : 'ගෝලවල අරයයන්ට (Radii) අනුලෝමව සමානුපාතිකව'}
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="electroQuiz" value="volume" onChange={(e) => setUserAnswer(e.target.value)} className="text-blue-600" />{' '}
              {isEnglish ? 'Inversely proportional to the volumes of the spheres' : 'ගෝලවල පරිමාවන්ට ප්‍රතිලෝමව සමානුපාතිකව'}
            </label>
          </div>

          <button onClick={checkQuiz} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer border-0">
            {isEnglish ? 'Submit Answer' : 'පිළිතුර ඉදිරිපත් කරන්න'}
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
