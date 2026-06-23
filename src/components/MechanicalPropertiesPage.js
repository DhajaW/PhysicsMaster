'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, Zap, Play, ArrowLeft } from 'lucide-react';

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

// Viscosity Simulator Component to isolate high-frequency re-renders
function ViscosityDropSimulationScreen({ liquid, isDropping, setIsDropping, onDropFinish, startDropTrigger, isEnglish }) {
  const [ballY, setBallY] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // When startDropTrigger changes, reset states and start animation
  useEffect(() => {
    if (startDropTrigger > 0) {
      setBallY(0);
      setVelocity(0);
    }
  }, [startDropTrigger]);

  useEffect(() => {
    let id;
    if (isDropping && ballY < 150) {
      const terminalVelocity = liquid === 'water' ? 8 : 2;
      id = setInterval(() => {
        setBallY((prev) => {
          const next = prev + terminalVelocity;
          if (next >= 150) {
            setIsDropping(false);
            setVelocity(terminalVelocity);
            onDropFinish(terminalVelocity);
            return 150;
          }
          setVelocity(Math.min(terminalVelocity, parseFloat((prev * 0.1).toFixed(1))));
          return next;
        });
      }, 50);
    }
    return () => clearInterval(id);
  }, [isDropping, ballY, liquid, setIsDropping, onDropFinish]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full notranslate" translate="no">
      <div className="md:col-span-5 flex flex-col justify-end">
        <div className="p-4 bg-slate-950 font-mono text-xs text-center rounded-xl text-white">
          {isEnglish ? 'Current Velocity: ' : 'වත්මන් වේගය: '}<span className="text-yellow-400 font-bold">{velocity} m/s</span>
        </div>
      </div>
      <div className="md:col-span-7 bg-slate-900 h-64 rounded-xl relative flex items-center justify-center border border-slate-800">
        <div className="w-16 h-48 bg-slate-800 border-2 border-slate-700 rounded-b-xl relative overflow-hidden flex justify-center">
          <div className="absolute w-4 h-4 bg-slate-400 rounded-full border border-slate-200 transition-all duration-75" style={{ top: `${ballY}px` }}></div>
        </div>
      </div>
    </div>
  );
}

export default function MechanicalPropertiesPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';
  const [liquid, setLiquid] = useState('water'); // water or glycerin
  const [isDropping, setIsDropping] = useState(false);
  const [startDropTrigger, setStartDropTrigger] = useState(0);
  const [unit10Feedback, setUnit10Feedback] = useState('');

  const startDrop = () => {
    setStartDropTrigger((prev) => prev + 1);
    setIsDropping(true);
    setUnit10Feedback(
      isEnglish
        ? '🧪 The sphere falls freely... its velocity increases gradually and then becomes constant (terminal velocity).'
        : '🧪 ගෝලය නිදහසේ පහළට වැටේ... වේගය ක්‍රමයෙන් වැඩි වී පසුව නියත වේ (ආන්ත ප්‍රවේගය).'
    );
  };

  const handleDropFinish = (terminalVelocity) => {
    setUnit10Feedback(
      isEnglish
        ? `🎉 Terminated! The sphere has reached its terminal velocity (Terminal Velocity = ${terminalVelocity} m/s). According to Stokes' Law, force balance is: W = U + F (where F = 6πηrv).`
        : `🎉 නිශ්චලයි! ගෝලය එහි ආන්ත ප්‍රවේගයට (Terminal Velocity = ${terminalVelocity} m/s) ළඟා විය. ස්ටෝක්ස් නියමයට අනුව බල සමතුලිතතාව: W = U + F (මෙහි F = 6πηrv වේ).`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white p-6 rounded-2xl shadow-md">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 text-left">
            <span className="bg-emerald-400/30 border border-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 10</span>
            <h1 className="text-3xl font-bold mt-2">
              {isEnglish ? 'Mechanical Properties of Matter (Unit 10)' : 'පදාර්ථයේ යාන්ත්‍රික ගුණ (Mechanical Properties of Matter)'}
            </h1>
            <p className="text-emerald-100 text-sm mt-1">
              {isEnglish
                ? 'Exam secrets of elasticity, Young\'s modulus, viscosity, and surface tension.'
                : 'ප්‍රත්‍යාස්ථතාව, යං මාපාංකය, දුස්ස්‍රාවිතාව සහ පෘෂ්ඨික ආතතියේ විභාග රහස්.'}
            </p>
          </div>
        </div>

        {/* Theory & Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> {isEnglish ? 'Core Concepts' : 'මූලික සංකල්ප'}
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                • <strong className="text-slate-800">{isEnglish ? 'Hooke\'s Law:' : 'හූක් නියමය:'}</strong>{' '}
                {isEnglish
                  ? 'Within the limit of proportionality, the extension (e) of a wire is directly proportional to the applied load (F) (F = ke).'
                  : 'සමානුපාතික සීමාව තුළ කම්බියක ඇති වන විතතිය (e), ඒ මත යෙදූ භාරයට (F) අනුලෝමව සමානුපාතික වේ (F = ke).'}
              </li>
              <li>
                • <strong className="text-slate-800">{isEnglish ? 'Stokes\' Law (F = 6πηrv):' : 'ස්ටෝක්ස් නියමය (F = 6πηrv):'}</strong>{' '}
                {isEnglish
                  ? 'The formula for finding the viscous drag force acting on a small spherical object moving through a viscous medium.'
                  : 'දුස්ස්‍රාවී මාධ්‍යයක් තුළින් චලනය වන කුඩා ගෝලීය වස්තුවක් මත ක්‍රියා කරන දුස්ස්‍රාවිතා බලය සෙවීමේ සූත්‍රයයි.'}
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-500" /> {isEnglish ? 'Paper Marking Secrets' : 'Paper Marking රහස්'}
            </h2>
            <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg text-xs md:text-sm text-cyan-900">
              {isEnglish ? (
                <span><strong>⚠️ Unit Conversion Trap:</strong> In Young's modulus (Y) calculations, the diameter of the wire is often given in millimeters (mm). Students frequently forget to convert it to meters (m), losing all marks! (1 mm = 10⁻³ m).</span>
              ) : (
                <span><strong>⚠️ ඒකක පරිවර්තන උගුල:</strong> යං මාපාංකය (Y) සෙවීමේ ගණන් වලදී කම්බියේ විෂ්කම්භය මිලිමීටර (mm) වලින් දෙන අතර, ළමයි එය මීටර (m) වලට පරිවර්තනය කිරීමට අමතක කිරීම නිසා මුළු ලකුණුම නැති කර ගනිති! (1 mm = 10⁻³ m).</span>
              )}
            </div>
          </div>
        </div>

        {/* සම්පත් පොත් සාරාංශය: පදාර්ථයේ යාන්ත්‍රික ගුණ */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Mechanical Properties of Matter' : 'සම්පත් පොත් සාරාංශය: පදාර්ථයේ යාන්ත්‍රික ගුණ'}
          </h2>

          {/* 1. ප්‍රත්‍යාස්ථතාව සහ හුක් නියමය */}
          <Accordion title={isEnglish ? "01. Elasticity and Hooke's Law" : "01. ප්‍රත්‍යාස්ථතාව සහ හුක් නියමය (Elasticity and Hooke's Law)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Elasticity:' : 'ප්‍රත්‍යාස්ථතාව (Elasticity):'}</strong>{' '}
                    {isEnglish
                      ? 'The ability of a material to deform under an applied force and return to its original shape and size when the force is removed.'
                      : 'බාහිර බලයක් යෙදූ විට හැඩය හෝ ප්‍රමාණය වෙනස් වී, බලය ඉවත් කළ විට නැවත මුල් හැඩයට හෝ ප්‍රමාණයට පත්වීමට ද්‍රව්‍යවලට ඇති හැකියාවයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Tensile Stress:' : 'ආතන ප්‍රත්‍යාබලය (Tensile Stress):'}</strong>{' '}
                    {isEnglish
                      ? 'The tensile force acting per unit cross-sectional area of an object.'
                      : 'වස්තුවක ඒකක හරස්කඩ වර්ගඵලයක් මත ක්‍රියා කරන ආතන බලයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Tensile Strain:' : 'ආතන වික්‍රියාව (Tensile Strain):'}</strong>{' '}
                    {isEnglish
                      ? 'The extension (change in length) per unit original length of the object.'
                      : 'වස්තුවක ඒකක දිගක ඇතිවන විතතියයි (දිගෙහි වෙනස් වීමයි).'}
                  </li>
                  <li>
                    <strong>{isEnglish ? "Young's Modulus (Y):" : 'යං මාපාංකය (Young\'s Modulus - Y):'}</strong>{' '}
                    {isEnglish
                      ? 'The ratio of tensile stress to tensile strain within the limit of elasticity.'
                      : 'ප්‍රත්‍යාස්ථතා සීමාව තුළ ආතන ප්‍රත්‍යාබලය හා ආතන වික්‍රියාව අතර අනුපාතයයි.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-950">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? "Hooke's Law:" : 'හුක් නියමය:'} F = ke</li>
                  <li>{isEnglish ? 'Stress:' : 'ප්‍රත්‍යාබලය:'} Stress = F / A</li>
                  <li>{isEnglish ? 'Strain:' : 'වික්‍රියාව:'} Strain = e / l</li>
                  <li>{isEnglish ? "Young's Modulus:" : 'යං මාපාංකය:'} Y = (F * l) / (A * e)</li>
                  <li>{isEnglish ? 'Energy stored in wire:' : 'ඇදෙන කම්බියක ගබඩා වන ශක්තිය:'} W = 1/2 * Fe</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{isEnglish ? 'Strain has no units or dimensions.' : 'වික්‍රියාවට ඒකක හෝ මාන නොමැත.'}</li>
                  <li>
                    {isEnglish
                      ? 'On a stress-strain graph, the plot is a straight line from the origin to the proportional limit (Hooke\'s law is obeyed).'
                      : 'ප්‍රත්‍යාබල - වික්‍රියා ප්‍රස්ථාරයේ මූල ලක්ෂ්‍යයේ සිට සමානුපාතික සීමාව (Proportional Limit) දක්වා ප්‍රස්ථාරය සරල රේඛාවක් වේ (හුක් නියමය පිළිපදී).'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'Young\'s modulus (Y) equation applies only within the elastic limit. Moreover, since Young\'s modulus changes with temperature, the temperature must remain constant during the calculations.'
                    : 'යං මාපාංක (Y) සමීකරණය යෙදිය හැක්කේ ප්‍රත්‍යාස්ථතා සීමාව (Elastic limit) ඇතුළතදී පමණි. එමෙන්ම කම්බියක උෂ්ණත්වය වෙනස් වන විට එහි යං මාපාංකය ද වෙනස් වන බැවින් සමීකරණ යෙදීමේදී උෂ්ණත්වය නියතව පැවතිය යුතුය.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 2. දුස්ස්‍රාවිතාව සහ තරල ප්‍රවාහය */}
          <Accordion title={isEnglish ? "02. Viscosity and Fluid Flow" : "02. දුස්ස්‍රාවිතාව සහ තරල ප්‍රවාහය (Viscosity and Fluid Flow)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Viscosity:' : 'දුස්ස්‍රාවිතාව (Viscosity):'}</strong>{' '}
                    {isEnglish
                      ? 'The internal frictional force arising between layers of a fluid opposing their relative motion.'
                      : 'ද්‍රවයක් ප්‍රවාහය වීමේදී ද්‍රව ස්තර අතර සාපේක්ෂ චලිතයට එරෙහිව ඇතිවන ඝර්ෂණ බලයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Streamline Flow:' : 'අනාකූල ප්‍රවාහය (Streamline Flow):'}</strong>{' '}
                    {isEnglish
                      ? 'The orderly, steady flow of fluid particles where each particle passes a point along the same path with the same velocity.'
                      : 'ද්‍රව අංශු එකම මාර්ගයක, එකම වේගයෙන් ගමන් කරන ක්‍රමානුකූල (ආස්තරීය) ප්‍රවාහයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Velocity Gradient:' : 'ප්‍රවේග අනුක්‍රමණය (Velocity Gradient):'}</strong>{' '}
                    {isEnglish
                      ? 'The rate of change of velocity with distance perpendicular to the layers of flow (dv / dx).'
                      : 'ප්‍රවේග අනුක්‍රමණය (Velocity Gradient) යනු ද්‍රව ස්තර අතර පරතරය අනුව ප්‍රවේගයේ වෙනස් වීමේ සීඝ්‍රතාවයි (dv / dx).'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? 'Viscous force:' : 'දුස්ස්‍රාවී බලය:'} F = η * A * (dv / dx)</li>
                  <li>{isEnglish ? "Poiseuille's Equation:" : 'පොයිසෙල් සමීකරණය:'} V / t = (π * a⁴ * Δp) / (8 * η * l)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'The coefficient of viscosity (η) of liquids decreases as temperature increases.'
                      : 'උෂ්ණත්වය වැඩි වන විට ද්‍රවවල දුස්ස්‍රාවිතා සංගුණකය (η) අඩුවේ.'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'When a fluid flows through a tube, the velocity of the layers near the wall is zero, while the velocity of the layer along the axis is maximum.'
                      : 'නළයක් තුළින් ද්‍රවයක් ගලා යාමේදී නළයේ බිත්තිය අසල ස්තරවල ප්‍රවේගය ශුන්‍ය වන අතර කේන්ද්‍රය දිගේ යන ස්තරයේ ප්‍රවේගය උපරිම වේ.'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'Poiseuille\'s equation applies only to streamline flow. This means it holds only when the pressure difference is small, the tube is horizontal and narrow, and the fluid is incompressible. Applying it to turbulent flow is incorrect.'
                    : 'පොයිසෙල් සමීකරණය යෙදිය හැක්කේ අනාකූල (Streamline) ප්‍රවාහ සඳහා පමණි. එනම් පීඩන අන්තරය විශාල නොවන විට, නළය තිරස් හා සිහින් වන විට සහ ද්‍රවය අසම්පීඩ්‍ය වන විට පමණි. ආකූල (Turbulent) ප්‍රවාහ සඳහා මෙය යෙදීමෙන් පිළිතුරු වැරදේ.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 3. ස්ටෝක්ස් නියමය සහ ආන්ත ප්‍රවේගය */}
          <Accordion title={isEnglish ? "03. Stokes' Law and Terminal Velocity" : "03. ස්ටෝක්ස් නියමය සහ ආන්ත ප්‍රවේගය (Stokes' Law and Terminal Velocity)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? "Stokes' Law:" : 'ස්ටෝක්ස් නියමය (Stokes\' Law):'}</strong>{' '}
                    {isEnglish
                      ? 'The formula for finding the viscous frictional force acting on a small spherical object moving through a viscous fluid.'
                      : 'දුස්ස්‍රාවී තරලයක් තුළින් චලනය වන කුඩා ගෝලාකාර වස්තුවක් මත ක්‍රියා කරන දුස්ස්‍රාවී ඝර්ෂණ බලය සෙවීමේ නියමයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Terminal Velocity (v):' : 'ආන්ත ප්‍රවේගය (Terminal Velocity - v):'}</strong>{' '}
                    {isEnglish
                      ? 'The constant maximum velocity attained by an object falling through a fluid when the downward gravitational weight is balanced by the upward forces (upthrust + viscous force).'
                      : 'තරලයක් තුළින් වස්තුවක් පහළට වැටෙන විට, පහළට ක්‍රියා කරන බරට ඉහළට ක්‍රියා කරන (උත්ප්‍ලාවක බලය + දුස්ස්‍රාවී බලය) සමාන වීමෙන් වස්තුව ලබාගන්නා නියත උපරිම ප්‍රවේගයයි.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? "Stokes' Force:" : 'ස්ටෝක්ස් බලය:'} F = 6 * π * η * a * v</li>
                  <li>{isEnglish ? 'Terminal Velocity:' : 'ආන්ත ප්‍රවේගය:'} v = (2 * a² * (ρ - σ) * g) / (9 * η)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'If the density of the sphere is greater than the density of the fluid (ρ > σ), it moves downwards; if less (ρ < σ), it moves upwards (e.g., an air bubble in water).'
                      : 'ගෝලයේ ඝනත්වය තරලයේ ඝනත්වයට වඩා වැඩි නම් (ρ > σ) ගෝලය පහළට ද, අඩු නම් (ρ < σ) ඉහළට ද (උදා: ජලය තුළ වායු බුබුලක්) ගමන් කරයි.'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'Stokes\' law applies only to small, spherical, smooth objects in an infinitely wide stationary fluid. In practical experiments, container wall effects and fluid turbulence can cause errors.'
                    : 'ස්ටෝක්ස් නියමය යෙදිය හැක්කේ කුඩා, ගෝලාකාර, සුමට වස්තු සඳහා සහ අසීමිතව පැතිරුණු නිශ්චල තරල සඳහා පමණි. ප්‍රායෝගික පරීක්ෂණ වලදී බඳුනේ බිත්ති වල බලපෑම සහ තරලය නිශ්චලව නොතිබීම නිසා දෝෂ ඇතිවිය හැක.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 4. පෘෂ්ඨික ආතතිය සහ කේශිකත්වය */}
          <Accordion title={isEnglish ? "04. Surface Tension and Capillarity" : "04. පෘෂ්ඨික ආතතිය සහ කේශිකත්වය (Surface Tension and Capillarity)"}>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Definitions:' : 'ප්‍රධාන අර්ථ දැක්වීම් (Definitions):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{isEnglish ? 'Surface Tension (T):' : 'පෘෂ්ඨික ආතතිය (Surface Tension - T):'}</strong>{' '}
                    {isEnglish
                      ? 'The force acting per unit length perpendicular to a hypothetical line drawn on the liquid surface, acting along the surface.'
                      : 'ද්‍රව පෘෂ්ඨයක් මත ඇඳි කල්පිත රේඛාවක ඒකක දිගක් මත රේඛාවට ලම්බකව ද්‍රව පෘෂ්ඨය දිගේ ක්‍රියා කරන බලයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Angle of Contact (θ):' : 'ස්පර්ශ කෝණය (Angle of Contact - θ):'}</strong>{' '}
                    {isEnglish
                      ? 'The angle measured inside the liquid between the solid surface and the tangent drawn to the liquid surface at the point of contact.'
                      : 'ද්‍රවයක් හා ඝන පෘෂ්ඨයක් ස්පර්ශ වන ලක්ෂ්‍යයේදී ද්‍රව පෘෂ්ඨයට අඳින ලද ස්පර්ශකයත් ඝන පෘෂ්ඨයත් අතර ද්‍රවය තුළින් මනිනු ලබන කෝණයයි.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Capillarity:' : 'කේශිකත්වය (Capillarity):'}</strong>{' '}
                    {isEnglish
                      ? 'The phenomenon of the rise or fall of liquid level when a narrow tube is dipped in the liquid.'
                      : 'සිහින් නළයක් ද්‍රවයක ගිල්වූ විට ද්‍රව මට්ටම ඉහළ යාම හෝ පහළ යාමේ සංසිද්ධියයි.'}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-950">{isEnglish ? 'Formulas and Equations:' : 'සූත්‍ර සහ සමීකරණ (Equations):'}</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>{isEnglish ? 'Surface Tension:' : 'පෘෂ්ඨික ආතතිය:'} T = F / l</li>
                  <li>{isEnglish ? 'Surface Energy:' : 'පෘෂ්ඨික ශක්තිය:'} E = T * ΔA</li>
                  <li>{isEnglish ? 'Excess Pressure:' : 'අතිරික්ත පීඩනය:'} {isEnglish ? 'Soap bubble: ΔP = 4T/r, Drop/Air bubble: ΔP = 2T/r' : 'සබන් බුබුලකට ΔP = 4T / r, ද්‍රව බිංදුවකට/වායු බුබුලකට ΔP = 2T / r'}</li>
                  <li>{isEnglish ? 'Capillary rise:' : 'කේශික නැඟීම:'} h = (2 * T * cosθ) / (r * ρ * g)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isEnglish ? 'Key Points:' : 'වැදගත් කරුණු (Key Points):'}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {isEnglish
                      ? 'The contact angle between pure water and clean glass is zero (0°). Therefore, cos0° = 1 is used in calculations.'
                      : 'පිරිසිදු ජලය සහ පිරිසිදු වීදුරු අතර ස්පර්ශ කෝණය ශුන්‍ය (0°) වේ. එබැවින් cos0° = 1 ලෙස ගෙන ගණනය කිරීම් සිදු කෙරේ.'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Adding soap or detergent decreases the surface tension of water.'
                      : 'සබන් හෝ ඩිටර්ජන්ට් (Detergent) යෙදූ විට ජලයේ පෘෂ්ඨික ආතතිය අඩුවේ.'}
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> {isEnglish ? 'Special Notes (Exam Notes/Traps):' : 'විශේෂ සටහන් (Exam Notes/Traps):'}</h4>
                <p className="text-sm mt-1 text-amber-900">
                  {isEnglish
                    ? 'Since a soap bubble has two surfaces (inner and outer), you must multiply the surface energy and excess pressure equations by 2. An air bubble has only one surface. In capillary rise calculations (h), measurements must be taken from the bottom of the meniscus.'
                    : 'සබන් බුබුලකට පෘෂ්ඨ දෙකක් (ඇතුළත සහ පිටත) ඇති බැවින් පෘෂ්ඨික ශක්තිය සෙවීමේදී සහ අතිරික්ත පීඩනය සෙවීමේදී අනිවාර්යයෙන්ම සමීකරණය 2න් ගුණ කළ යුතුය. වායු බුබුලකට ඇත්තේ එක් පෘෂ්ඨයක් පමණි. කේශික නැඟීම ගණනය කිරීමේදී (h), මිනුම ගත යුත්තේ චන්ද්‍රකයේ (Meniscus) පතුලේ සිටය.'}
                </p>
              </div>
            </div>
          </Accordion>

          {/* 5. වැදගත් රාශිවල මාන සහ ඒකක සංසන්දනය */}
          <Accordion title={isEnglish ? "05. Standard Units & Dimensions" : "05. වැදගත් රාශිවල මාන සහ ඒකක සංසන්දනය (Standard Units & Dimensions)"}>
            <div className="space-y-4 text-slate-700">
              <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Physical Quantity' : 'භෞතික රාශිය (Physical Quantity)'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Symbol' : 'සම්මත සංකේතය (Symbol)'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'SI Unit' : 'SI ඒකකය (SI Unit)'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Dimensions' : 'මාන (Dimensions)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Tensile Stress' : 'ආතන ප්‍රත්‍යාබලය (Tensile Stress)'}</td>
                      <td className="p-3 text-slate-600">-</td>
                      <td className="p-3 text-slate-600">N m⁻² (or Pa)</td>
                      <td className="p-3 font-mono text-slate-600">ML⁻¹ T⁻²</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? "Young's Modulus" : "යං මාපාංකය (Young's Modulus)"}</td>
                      <td className="p-3 text-slate-600">Y</td>
                      <td className="p-3 text-slate-600">N m⁻² (or Pa)</td>
                      <td className="p-3 font-mono text-slate-600">ML⁻¹ T⁻²</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Coefficient of Viscosity' : 'දුස්ස්‍රාවිතා සංගුණකය (Coefficient of Viscosity)'}</td>
                      <td className="p-3 text-slate-600">η</td>
                      <td className="p-3 text-slate-600">N s m⁻² (or Pa s)</td>
                      <td className="p-3 font-mono text-slate-600">ML⁻¹ T⁻¹</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Surface Tension' : 'පෘෂ්ඨික ආතතිය (Surface Tension)'}</td>
                      <td className="p-3 text-slate-600">T</td>
                      <td className="p-3 text-slate-600">N m⁻¹</td>
                      <td className="p-3 font-mono text-slate-600">MT⁻²</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Force Constant' : 'බල නියතය (Force Constant)'}</td>
                      <td className="p-3 text-slate-600">k</td>
                      <td className="p-3 text-slate-600">N m⁻¹</td>
                      <td className="p-3 font-mono text-slate-600">MT⁻²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

        </div>

        {/* Viscosity Test Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden text-left bg-white">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              💧 {isEnglish ? 'Viscosity Drop Test' : 'Viscosity Drop Test (දුස්ස්‍රාවිතා පරීක්ෂණය)'}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 space-y-4">
                <label className="text-xs font-bold text-slate-700 block">
                  {isEnglish ? 'Select Liquid:' : 'ද්‍රවය තෝරන්න:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setLiquid('water')} className={`p-2 rounded-lg text-xs font-bold cursor-pointer transition ${liquid === 'water' ? 'bg-emerald-600 text-white shadow' : 'bg-white border text-slate-700'}`}>
                    {isEnglish ? '💧 Water' : '💧 ජලය (Water)'}
                  </button>
                  <button onClick={() => setLiquid('glycerin')} className={`p-2 rounded-lg text-xs font-bold cursor-pointer transition ${liquid === 'glycerin' ? 'bg-emerald-600 text-white shadow' : 'bg-white border text-slate-700'}`}>
                    {isEnglish ? '🍯 Glycerin' : '🍯 ග්‍ලිසරින් (Glycerin)'}
                  </button>
                </div>
                <button onClick={startDrop} className="w-full bg-slate-900 text-white p-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow cursor-pointer hover:bg-slate-800 transition border-0">
                  <Play className="w-4 h-4" /> {isEnglish ? 'Release Sphere' : 'ගෝලය අත්හරින්න'}
                </button>
              </div>
              <div className="md:col-span-7 relative">
                <ViscosityDropSimulationScreen 
                  liquid={liquid}
                  isDropping={isDropping}
                  setIsDropping={setIsDropping}
                  onDropFinish={handleDropFinish}
                  startDropTrigger={startDropTrigger}
                  isEnglish={isEnglish}
                />
                {unit10Feedback && <div className="absolute bottom-2 left-2 right-2 text-[11px] bg-slate-950/90 text-slate-300 p-2 rounded text-center font-mono z-20">{unit10Feedback}</div>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
