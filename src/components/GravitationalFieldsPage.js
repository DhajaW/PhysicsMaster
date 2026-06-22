'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, RefreshCw, Zap, Play, ArrowLeft } from 'lucide-react';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-none py-3 text-left">
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

// Satellite Simulator Visual Component to isolate state updates and prevent page-wide flickering
function SatelliteSimulationScreen({ satelliteStatus, velocitySlider, isEnglish }) {
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    let interval;
    if (satelliteStatus === 'orbit') {
      interval = setInterval(() => {
        setOrbitAngle((prev) => (prev + (velocitySlider * 0.5)) % 360);
      }, 40);
    }
    return () => clearInterval(interval);
  }, [satelliteStatus, velocitySlider]);

  return (
    <div className="lg:col-span-7 bg-slate-950 h-64 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-900 notranslate" translate="no">
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
        <div className="absolute text-sm animate-bounce text-red-500 font-bold bg-slate-900/80 px-2 py-1 rounded border border-red-800">
          {isEnglish ? '🔥 Crashed!' : '🔥 කඩා වැටුණි!'}
        </div>
      )}

      {satelliteStatus === 'escape' && (
        <div className="absolute text-sm text-cyan-400 font-bold bg-slate-900/80 px-2 py-1 rounded border border-cyan-800 animate-pulse">
          {isEnglish ? '🚀 Escaping Field...' : '🚀 ක්ෂේත්‍රයෙන් ඉවතට ඇදී යයි...'}
        </div>
      )}
    </div>
  );
}

export default function GravitationalFieldsPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';

  // Orbit Simulator States
  const [velocitySlider, setVelocitySlider] = useState(7.9); // km/s (Standard orbital speed)
  const [satelliteStatus, setSatelliteStatus] = useState('orbit'); // orbit, crash, escape
  const [simFeedback, setSimFeedback] = useState({ status: 'normal', msg: '' });

  // Quiz State
  const [selectedEnergyAns, setSelectedEnergyAns] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  // Simulator Engine logic
  useEffect(() => {
    const v = velocitySlider;
    let status = 'orbit';
    let msg = isEnglish 
      ? '✨ The satellite moves in a stable orbit around the Earth. (v = v_orbit)' 
      : '✨ චන්ද්‍රිකාව පෘථිවිය වටා ස්ථාවර කක්ෂයක ගමන් කරයි. (v = v_orbit)';

    if (v < 7.0) {
      status = 'crash';
      msg = isEnglish
        ? '❌ Crash! Insufficient orbital velocity causing the satellite to fall to Earth due to gravity.'
        : '❌ අනතුරක්! කක්ෂීය ප්‍රවේගය මදි වීම නිසා චන්ද්‍රිකාව පෘථිවි ගුරුත්වාකර්ෂණයට හසුවී බිමට කඩා වැටේ (Crash).';
    } else if (v >= 11.2) {
      status = 'escape';
      msg = isEnglish
        ? '🚀 Escaped! The satellite exceeds Earth\'s escape velocity (Escape Velocity ≥ 11.2 km/s) and escapes the gravitational field.'
        : '🚀 නිදහස් විය! චන්ද්‍රිකාව පෘථිවියේ පලායන ප්‍රවේගය (Escape Velocity ≥ 11.2 km/s) පසුකර ගුරුත්වාකර්ෂණ ක්ෂේත්‍රයෙන් ඉවතට ඇදී යයි.';
    }

    setSatelliteStatus(status);
    setSimFeedback({ status, msg });
  }, [velocitySlider, isEnglish]);

  const checkEnergyQuiz = () => {
    if (selectedEnergyAns === 'negative') {
      setQuizFeedback(
        isEnglish
          ? '🎉 Correct! The total mechanical energy of an orbiting satellite (E = K.E. + P.E.) is always negative (-) (E = -GMm/2r). This indicates the satellite is bound to the Earth\'s field. A major marking scheme secret!'
          : '🎉 නිවැරදියි! කක්ෂගත චන්ද්‍රිකාවක මුළු ශක්තිය (E = K.E. + P.E.) සෑම විටම ඍණ (-) අගයක් ගනී (E = -GMm/2r). එයින් අදහස් වන්නේ චන්ද්‍රිකාව පෘථිවි ක්ෂේත්‍රයට බැඳී පවතින බවයි. විභාගයේදී ලකුණු ලැබෙන ලොකුම රහසකි!'
      );
    } else {
      setQuizFeedback(
        isEnglish
          ? '❌ Incorrect! Remember, as long as the satellite remains bound in orbit and not free, its total mechanical energy cannot be positive or zero. It is always negative.'
          : '❌ වැරදියි! මතක තබාගන්න, චන්ද්‍රිකාව නිදහස් නොවී පෘථිවිය වටා බැඳී පවතින තාක් එහි මුළු ශක්තිය ධන හෝ ශුන්‍ය විය නොහැක. එය සෑම විටම ඍණ අගයකි.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-purple-650 to-indigo-600 text-white p-6 rounded-2xl shadow-md">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 text-left">
            <span className="bg-purple-500/30 border border-purple-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 05</span>
            <h1 className="text-3xl font-bold mt-2">
              {isEnglish ? 'Gravitational Fields (Unit 05) - Study Guide' : 'ගුරුත්වාකර්ෂණ ක්ෂේත්‍ර (Gravitational Fields) - අධ්‍යයන පිටුව'}
            </h1>
            <p className="text-purple-100 text-sm mt-1">
              {isEnglish 
                ? 'Newton\'s law of universal gravitation, orbital velocities, and satellite energy distributions.' 
                : 'නිව්ටන්ගේ විශ්ව ගුරුත්වාකර්ෂණ නියමයන්, කක්ෂීය ප්‍රවේගයන් සහ චන්ද්‍රිකා ශක්ති විභේදන.'}
            </p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-605" /> 
              {isEnglish ? 'Syllabus Core Concepts' : 'සම්පත් පොත් මූලික සංකල්ප'}
            </h2>
            {isEnglish ? (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">Newton&apos;s Law of Gravitation:</strong> Every particle of matter in the universe attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers (F = GMm/r²).</li>
                <li>• <strong className="text-slate-850">Escape Velocity:</strong> The minimum velocity required for an object to escape Earth\'s gravitational field (vₑ = √(2GM/R)), which is approximately 11.2 km/s for Earth.</li>
              </ul>
            ) : (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">නිව්ටන්ගේ ගුරුත්වාකර්ෂණ නියමය:</strong> විශ්වයේ ඕනෑම ස්කන්ධ දෙකක් අතර ඇති වන ආකර්ෂණ බලය, ස්කන්ධයන්ගේ ගුණිතයට අනුලෝමවත්, ඒවා අතර දුරෙහි වර්ගයට ප්‍රතිලෝමවත් සමානුපාතික වේ (F = GMm/r²).</li>
                <li>• <strong className="text-slate-855">පලායන ප්‍රවේගය (Escape Velocity):</strong> වස්තුවක් පෘථිවි ගුරුත්වාකර්ෂණ ක්ෂේත්‍රයෙන් සම්පූර්ණයෙන්ම ඉවතට විසි කිරීමට ලබා දිය යුතු අවම ප්‍රවේගයයි (vₑ = √(2GM/R)). පෘථිවිය සඳහා මෙහි අගය 11.2 km/s කි.</li>
              </ul>
            )}
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-500" /> 
              {isEnglish ? 'Marking Secrets & Traps' : 'Paper Marking රහස් (Exam Traps)'}
            </h2>
            {isEnglish ? (
              <div className="space-y-3 text-xs md:text-sm">
                <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <span className="font-bold text-indigo-850 block">⚠️ The G vs g Confusion Trap:</span>
                  The universal gravitational constant (G) is a universal constant. But the acceleration due to gravity (g) varies depending on position and altitude. Confusing these in derivations will cost marks.
                </div>
                <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <span className="font-bold text-indigo-850 block">⚠️ Orbital Radius of Satellite (r):</span>
                  Many students substitute only Earth\'s radius (R) instead of (r). The actual orbital radius is the distance from Earth\'s center, i.e., r = R + h (where h is height from Earth\'s surface).
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs md:text-sm">
                <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <span className="font-bold text-indigo-805 block">⚠️ G සහ g පටලවා ගැනීමේ උගුල:</span>
                  විශ්ව ගුරුත්වාකර්ෂණ නියතය (G) යනු මුළු විශ්වයටම නියත අගයකි. නමුත් ගුරුත්වජ ත්වරණය (g) යනු ස්ථානයෙන් ස්ථානයට (උන්නතාංශය අනුව) වෙනස් වන රාශියකි. සූත්‍ර සාධනයේදී මෙය පටලවා ගතහොත් ලකුණු කැපේ.
                </div>
                <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <span className="font-bold text-indigo-805 block">⚠️ චන්ද්‍රිකාවක කක්ෂීය අරය (r):</span>
                  ගණන් හැදීමේදී බොහෝ සිසුන් r වෙනුවට පෘථිවි අරය (R) පමණක් ආදේශ කරයි. සැබෑ අරය විය යුත්තේ පෘථිවි මධ්‍යයේ සිට ඇති දුරයි, එනම්: r = R + h (මෙහි h යනු පෘථිවි පෘෂ්ඨයේ සිට උසයි).
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resources Book Summary Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Gravitational Fields' : 'සම්පත් පොත් සාරාංශය: ගුරුත්වාකර්ෂණ ක්ෂේත්‍ර'}
          </h2>

          {/* 1. Gravitational Force and Laws */}
          <Accordion title={isEnglish ? "01. Gravitational Force and Laws" : "01. ගුරුත්වාකර්ෂණ බලය සහ නියම (Gravitational Force and Laws)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <p><strong>Newton&apos;s Law of Gravitation:</strong> Every point mass attracts every other point mass by a force pointing along the line intersecting both points. The force is proportional to the product of the two masses and inversely proportional to the square of the distance between them.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                      F = G * M * m / r² <span className="text-slate-500 text-xs">(G: Universal gravitational constant, M, m: masses, r: distance between centers)</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Gravitational force is always attractive. It acts along the line joining the centers of mass.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">Here, r is the distance between their centers of mass, not surface-to-surface. For planets, the planet\'s radius (R) must be added (r = R + h).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <p><strong>නිව්ටන්ගේ ගුරුත්වාකර්ෂණ නියමය (Newton&apos;s Law of Gravitation):</strong> විශ්වයේ ඕනෑම ලක්ෂීය ස්කන්ධ දෙකක් අතර අන්යෝන්ය ආකර්ෂණ බලය, ස්කන්ධවල ගුණිතයට අනුලෝමව ද, දුරෙහි වර්ගයට ප්රතිලෝමව ද සමානුපාතික වේ.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                      F = G * M * m / r² (G = සර්වත්ර ගුරුත්වාකර්ෂණ නියතය, M, m = ස්කන්ධ, r = දුර)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ගුරුත්වාකර්ෂණ බලය සැමවිටම ආකර්ෂණ බලයකි. එය ස්කන්ධ කේන්ද්ර යා කරන සරල රේඛාව ඔස්සේ ක්රියා කරයි.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">මෙම සමීකරණයේ r යනු වස්තුවල පෘෂ්ඨ අතර දුර නොව, <strong>ස්කන්ධ කේන්ද්ර දෙක අතර දුරයි</strong>. පෘථිවිය වැනි විශාල ග්රහලෝක සඳහා ගණනය කිරීම්වලදී ග්රහලෝකයේ අරය ද (R) r සඳහා එකතු කළ යුතුමය (r = R + h).</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 2. Gravitational Field Intensity */}
          <Accordion title={isEnglish ? "02. Gravitational Field Intensity" : "02. ගුරුත්වාකර්ෂණ ක්ෂේත්ර තීව්රතාව (Gravitational Field Intensity)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <p><strong>Gravitational Field Intensity (g):</strong> The gravitational force acting per unit mass placed at a given point in the gravitational field.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• g = F / m</li>
                      <li>• At distance r from a point mass M: g = GM / r²</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• It is a vector quantity directed towards the center of mass.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">Inside a solid sphere (like Earth), intensity is directly proportional to distance (g ∝ r). Outside, it is inversely proportional to the square of distance (g ∝ 1/r²).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <p><strong>ක්ෂේත්ර තීව්රතාව (g):</strong> ගුරුත්වාකර්ෂණ ක්ෂේත්රයක යම් ලක්ෂ්යයක තැබූ ඒකක ස්කන්ධයක් මත ක්රියා කරන ගුරුත්වාකර්ෂණ බලයයි.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>g = F / m</li>
                      <li>ලක්ෂීය ස්කන්ධයකට දුර r හිදී: g = GM / r²</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>මෙය දෛශික රාශියකි. දිශාව ස්කන්ධ කේන්ද්රය දෙසට වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ඝන ගෝලයක (පෘථිවිය වැනි) အභ්යන්තරයේදී තීව්රතාව දුරට අනුලෝමව සමානුපාතික වේ (g ∝ r). එහෙත් පෘෂ්ඨයෙන් පිටතදී එය දුරෙහි වර්ගයට ප්රතිලෝමව සමානුපාතික වේ (g ∝ 1/r²). ප්රස්ථාර ඇඳීමේදී මේ වෙනස අනිවාර්යයෙන් පෙන්විය යුතුය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 3. Gravitational Potential */}
          <Accordion title={isEnglish ? "03. Gravitational Potential" : "03. ගුරුත්වාකර්ෂණ විභවය (Gravitational Potential)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <p><strong>Gravitational Potential (V):</strong> The work done by the gravitational force in bringing a unit mass from infinity to that point in the gravitational field.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Potential: V = -GM / r</li>
                      <li>• Gravitational Potential Energy: U = -GMm / r</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Potential is a scalar quantity. It is zero at infinity.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">Gravitational potential is always negative (-). Forgetting the negative sign in calculations is a common way to lose all marks.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <p><strong>ගුරුත්වාකර්ෂණ විභවය (V):</strong> අනන්තයේ සිට ඒකක ස්කන්ධයක් ගුරුත්වාකර්ෂණ ක්ෂේත්රයේ යම් ලක්ෂ්යයකට ගෙන ඒමේදී ගුරුත්වාකර්ෂණ බලය මගින් කරන ලද කාර්යයයි.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>V = -GM / r</li>
                      <li>E = -GMm / r</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>විභවය අදිශ රාශියකි. අනන්තයේදී විභවය ශුන්ය වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ගුරුත්වාකර්ෂණ විභවය <strong>සෑම විටම සෘණ අගයකි (-)</strong>. ගණනය කිරීම්වලදී සෘණ ලකුණ අමතක කිරීමෙන් මුළු ලකුණුම අහිමි විය හැක.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 4. Satellite Motion */}
          <Accordion title={isEnglish ? "04. Satellite Motion" : "04. චන්ද්රිකා චලිතය (Satellite Motion)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <p><strong>Geostationary Satellites:</strong> Satellites that remain in a fixed position relative to an observer on the Earth&apos;s surface.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Orbital speed: v = √(GM / r)</li>
                      <li>• Time period: T = 2π√(r³ / GM)</li>
                      <li>• Escape Velocity: v = √(2gR)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• The orbital period of a geostationary satellite is 24 hours, orbiting in the equatorial plane.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">The total mechanical energy of a satellite in orbit is negative (E = -GMm / 2r). If total energy becomes zero or positive, the satellite escapes orbit.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <p><strong>භූ ස්ථාවර චන්ද්රිකා (Geostationary Satellites):</strong> පෘථිවිය මත සිටින නිරීක්ෂකයෙකුට නිශ්චලව පවතින සේ පෙනෙන චන්ද්රිකා වේ.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>v = √(GM / r)</li>
                      <li>T = 2π√(r³ / GM)</li>
                      <li>v = √(2gR)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>භූ ස්ථාවර චන්ද්රිකාවක ආවර්ත කාලය පැය 24 කි. එය ගමන් කළ යුත්තේ සමකය තලයේමය.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-855 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">කක්ෂයක ගමන් කරන චන්ද්රිකාවක මුළු ශක්තිය සෘණ වේ (E = -GMm / 2r). මුළු ශක්තිය ශුන්ය (0) හෝ ධන (+) වූ විට චන්ද්රිකාව කක්ෂයෙන් ඉවතට පලා යයි.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>
        </div>

        {/* Satellite Orbit Simulator Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8 text-left">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              {isEnglish ? '🌍 Satellite Orbit Simulator' : '🌍 Satellite Orbit Simulator (චන්ද්‍රිකා කක්ෂ සමාකරණය)'}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {isEnglish 
                ? 'Adjust the velocity slider and observe its live effect on the satellite\'s orbit.' 
                : 'ප්‍රවේගය වෙනස් කරමින් චන්ද්‍රිකාවේ කක්ෂයට සිදුවන බලපෑම සජීවීව නිරීක්ෂණය කරන්න.'}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    {isEnglish ? '🚀 Satellite Velocity:' : '🚀 චන්ද්‍රිකාවේ ප්‍රවේගය (Velocity):'}
                  </label>
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
                  <span>{isEnglish ? '3.0 km/s (Low)' : '3.0 km/s (අඩු)'}</span>
                  <span>{isEnglish ? '7.9 km/s (Orbital)' : '7.9 km/s (කක්ෂීය)'}</span>
                  <span>{isEnglish ? '11.2 km/s (Escape)' : '11.2 km/s (පලායන)'}</span>
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
            <SatelliteSimulationScreen 
              satelliteStatus={satelliteStatus}
              velocitySlider={velocitySlider}
              isEnglish={isEnglish}
            />
          </div>
        </div>

        {/* Mini Quiz Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-left">
          <h3 className="text-base font-bold text-slate-950 mb-3 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-purple-600" /> 
            {isEnglish ? 'Exam Question Check (Mini Quiz)' : 'විභාග ප්‍රශ්න විමර්ශනය (Mini Quiz)'}
          </h3>
          <p className="text-xs text-slate-650 mb-4">
            {isEnglish 
              ? 'What is the sign of the "Total Mechanical Energy" of a satellite in a stable orbit around Earth?' 
              : 'පෘථිවිය වටා ස්ථාවර කක්ෂයක ඇති චන්ද්‍රිකාවක "මුළු යාන්ත්‍රික ශක්තියේ" ලකුණ කුමක්ද?' }
          </p>
          
          <div className="space-y-2 max-w-md">
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="energyQuiz" value="positive" onChange={(e) => setSelectedEnergyAns(e.target.value)} className="text-purple-600" /> 
              {isEnglish ? 'Positive (+) value' : 'ධන (+) අගයක් ගනී'}
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="energyQuiz" value="zero" onChange={(e) => setSelectedEnergyAns(e.target.value)} className="text-purple-600" /> 
              {isEnglish ? 'Zero (0)' : 'ශුන්‍ය (Zero) වේ'}
            </label>
            <label className="flex items-center gap-2 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-slate-100 transition">
              <input type="radio" name="energyQuiz" value="negative" onChange={(e) => setSelectedEnergyAns(e.target.value)} className="text-purple-600" /> 
              {isEnglish ? 'Negative (-) value' : 'ඍණ (-) අගයක් ගනී'}
            </label>
          </div>

          <button onClick={checkEnergyQuiz} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer border-0">
            {isEnglish ? 'Submit Answer' : 'පිළිතුර ඉදිරිපත් කරන්න'}
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
