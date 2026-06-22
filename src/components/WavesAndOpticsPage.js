'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, Eye, Sliders, RefreshCw, ArrowLeft } from 'lucide-react';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-none py-3 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-slate-800 hover:text-indigo-655 transition-colors py-2 focus:outline-none"
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

export default function WavesAndOpticsPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';

  // Optics Simulator States
  const [lensType, setLensType] = useState('convex'); // convex or concave
  const [objectDistance, setObjectDistance] = useState(150); // px from lens
  const [showArrows, setShowArrows] = useState(true);
  const [opticsFeedback, setOpticsFeedback] = useState({ status: '', msg: '' });

  // Calculate Image position based on Lens Formula (Qualitative approach for visual rendering)
  // Standard focal length = 80px
  const f = 80;
  const isRealImage = objectDistance > f;
  
  // Lens Formula: 1/v - 1/u = 1/f (Sign convention adjusted for rendering)
  let imageDistance = 0;
  let imageHeight = 40;
  
  if (lensType === 'convex') {
    if (objectDistance === f) {
      imageDistance = 999; // Infinity
    } else {
      imageDistance = (objectDistance * f) / (objectDistance - f);
      imageHeight = 40 * (imageDistance / objectDistance);
    }
  } else {
    // Concave lens always virtual, diminished
    imageDistance = -(objectDistance * f) / (objectDistance + f);
    imageHeight = 40 * (Math.abs(imageDistance) / objectDistance);
  }

  const checkRayDiagram = () => {
    if (!showArrows) {
      setOpticsFeedback({
        status: 'error',
        msg: isEnglish
          ? '❌ Exam Trap! You did not draw arrows on the ray diagram! In the exam, you will receive zero marks if the direction of light travel is not indicated by arrows.'
          : '❌ Exam Trap! ඔබ කිරණ සටහනේ ඊතල (Arrows) සලකුණු කළේ නැත! ආලෝකය ගමන් කරන දිශාව ඊතල මගින් නොදැක්වුවහොත් විභාගයේදී සම්පූර්ණ ලකුණු අහිමි වේ!'
      });
    } else {
      let natureStr = '';
      if (objectDistance < f && lensType === 'convex') {
        natureStr = isEnglish ? 'virtual, upright, and magnified' : 'අතථ්‍ය, උඩුකුරු සහ විශාලිත';
      } else if (lensType === 'convex') {
        natureStr = isEnglish ? 'real, inverted' : 'සැබෑ, යටිකුරු';
      } else {
        natureStr = isEnglish ? 'virtual, upright, and diminished' : 'අතථ්‍ය, උඩුකුරු සහ කුඩා වූ';
      }
      setOpticsFeedback({
        status: 'correct',
        msg: isEnglish
          ? `✅ Excellent! Correct ray diagram with direction arrows. The refraction through a ${lensType === 'convex' ? 'convex lens' : 'concave lens'} and the nature of the image (${natureStr}) are correctly represented.`
          : `✅ විශිෂ්ටයි! ඊතල සහිත නිවැරදි කිරණ සටහනක්. ${lensType === 'convex' ? 'උත්තල කාචයක' : 'අවතල කාචයක'} වර්තනය සිදුවන ආකාරය සහ බිම්බයේ ස්වභාවය (${natureStr}) නිවැරදිව නිරූපණය වේ.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-teal-650 to-emerald-600 text-white p-6 rounded-2xl shadow-md">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 text-left">
            <span className="bg-teal-500/30 border border-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 03</span>
            <h1 className="text-3xl font-bold mt-2">
              {isEnglish ? 'Oscillations & Waves (Unit 03) - Study Guide' : 'දෝලන හා තරංග (Oscillations & Waves) - අධ්‍යයන පිටුව'}
            </h1>
            <p className="text-teal-100 text-sm mt-1">
              {isEnglish 
                ? 'Simple harmonic motion, sound waves, and practical secrets of geometrical optics.' 
                : 'සරල අනුවර්තීය චලිතය, ධ්වනිය සහ ජ්‍යාමිතික ප්‍රකාශ විද්‍යාවේ ප්‍රායෝගික රහස්.'}
            </p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-650" /> 
              {isEnglish ? 'Syllabus Core Concepts' : 'සම්පත් පොත් මූලික සංකල්ප'}
            </h2>
            {isEnglish ? (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">Simple Harmonic Motion (SHM):</strong> Acceleration of the object is directly proportional to its displacement from equilibrium and is always directed towards the equilibrium position (a = -ω²x).</li>
                <li>• <strong className="text-slate-850">Speed of Sound (Resonance Tube):</strong> By finding resonance lengths l₁ and l₂ for frequency f, sound speed in air can be calculated using v = 2f(l₂ - l₁).</li>
              </ul>
            ) : (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">සරල අනුවර්තී චලිතය (ස.අ.ච.):</strong> වස්තුවක ත්වරණය සමතුලිත පිහිටුමේ සිට විස්ථාපනයට අනුලෝමව සමානුපාතික වන අතර, දිශාව සෑම විටම සමතුලිත පිහිටුම දෙසට යොමු වේ (a = -ω²x).</li>
                <li>• <strong className="text-slate-800">ධ්වනි ප්‍රවේගය (නළයක අනුනාදය):</strong> සංවෘත නළයක මූලික ප්‍රස්පන්දය (A) සහ නිෂ්පන්දය (N) පිහිටීම අනුව v = 2f(l₂ - l₁) සූත්‍රයෙන් වාතයේ ධ්වනි ප්‍රවේගය සෙවිය හැක.</li>
              </ul>
            )}
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-500" /> 
              {isEnglish ? 'Marking Secrets & Traps' : 'Paper Marking රහස් (Exam Traps)'}
            </h2>
            {isEnglish ? (
              <div className="space-y-3 text-xs md:text-sm">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="font-bold text-emerald-850 block">⚠️ Optics Ray Diagram Trap:</span>
                  When drawing rays through lenses or prisms, failing to indicate light direction using arrows leads to losing all marks (zero marks) for the diagram!
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="font-bold text-emerald-850 block">⚠️ Nodes (N) and Antinodes (A):</span>
                  In resonance tube questions, when drawing stationary wave patterns inside the tube, you must clearly mark the open end as an antinode (A) and the closed end as a node (N).
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs md:text-sm">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="font-bold text-emerald-800 block">⚠️ ප්‍රකාශ විද්‍යාව කිරණ සටහන් උගුල:</span>
                  කාච හෝ ප්‍රිස්ම හරහා ආලෝකය ඇඳීමේදී කිරණ මත ඊතල (Arrows) ලකුණු නොකළහොත්, මුළු ලකුණු ප්‍රමාණයම (Zero Marks) අහිමි වේ!
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="font-bold text-emerald-800 block">⚠️ නිෂ්පන්ද (N) සහ ප්‍රස්පන්ද (A):</span>
                  අනුනාද නළ පාඩමේ ව්‍යුහගත ප්‍රශ්න වලදී නළය ඇතුළේ තරංග හැඩය අඳින විට විවෘත කෙළවර ප්‍රස්පන්දයක් (A) ලෙසත්, වැසුණු කෙළවර නිෂ්පන්දයක් (N) ලෙසත් පැහැදිලිව ලකුණු කළ යුතුය.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resources Book Summary Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Oscillations, Waves & Optics' : 'සම්පත් පොත් සාරාංශය: දෝලන, තරංග සහ ආලෝකය'}
          </h2>

          {/* 01. Simple Harmonic Motion and Oscillations */}
          <Accordion title={isEnglish ? "01. Simple Harmonic Motion and Oscillations" : "01. සරල අනුවර්තී චලිතය සහ දෝලන (Simple Harmonic Motion and Oscillations)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Simple Harmonic Motion (SHM):</strong> Periodic motion where the acceleration is directly proportional to the displacement from the equilibrium position and is always directed towards the equilibrium.</li>
                      <li>• <strong>Damped Oscillations:</strong> Oscillations where the amplitude decreases over time due to resistive forces (air resistance, friction).</li>
                      <li>• <strong>Resonance:</strong> The phenomenon where a system oscillates with maximum amplitude when the frequency of an external periodic force equals the natural frequency of the system.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• SHM Acceleration: a = -ω² x <span className="text-slate-500 text-xs">(a: acceleration, ω: angular frequency, x: displacement. Negative sign shows direction is opposite to displacement)</span></li>
                      <li>• SHM Velocity: v = ±ω√(A² - x²) <span className="text-slate-500 text-xs">(A: amplitude)</span></li>
                      <li>• Simple Pendulum Time Period: T = 2π√(l/g)</li>
                      <li>• Spring-mass system Time Period: T = 2π√(m/k)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• At the equilibrium position (x = 0), the velocity of the object is maximum and the acceleration is zero.</li>
                      <li>• At the extreme ends (x = A), the velocity is zero and the acceleration is maximum.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">For simple pendulum motion to be considered SHM, the angle of oscillation must be very small (θ &lt; 10°) so that sin θ ≈ θ.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>සරල අනුවර්තී චලිතය (Simple Harmonic Motion - SHM):</strong> වස්තුවක ත්වරණය නිරතුරුවම සමතුලිත පිහිටීමේ සිට ඇති විස්ථාපනයට අනුලෝමව සමානුපාතික වන අතර, සෑම විටම සමතුලිත පිහිටීම දෙසට යොමුව ඇති චලිතයයි.</li>
                      <li><strong>පරිමන්දිත කම්පන (Damped Oscillations):</strong> වාත ප්රතිරෝධය හෝ ඝර්ෂණ බල හේතුවෙන් දෝලනයක විස්තාරය ක්රමයෙන් අඩුවී යාමයි.</li>
                      <li><strong>අනුනාදය (Resonance):</strong> බාහිරින් යදන ආවර්ත බලයක සංඛ්යාතය, පද්ධතියේ ස්වාභාවික සංඛ්යාතයට සමාන වූ විට පද්ධතිය උපරිම විස්තාරයකින් කම්පනය වීමේ සංසිද්ධියයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>SHM ත්වරණය: a = -ω² x (a = ත්වරණය, ω = කෝණික ප්රවේගය, x = විස්ථාපනය)</li>
                      <li>SHM ප්රවේගය: v = ±ω√(A² - x²) (A = විස්තාරය)</li>
                      <li>සරල අවලම්බයේ ආවර්ත කාලය (Simple Pendulum): T = 2π√(l/g)</li>
                      <li>දුන්නක ආවර්ත කාලය (Spring-mass system): T = 2π√(m/k)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>SHM හි සමතුලිත පිහිටීමේදී (x = 0), වස්තුවේ ප්රවේගය උපරිම වන අතර ත්වරණය ශුන්ය වේ.</li>
                      <li>චලිතයේ අන්තවලදී (x = A), ප්රවේගය ශුන්ය වන අතර ත්වරණය උපරිම වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">සරල අවලම්බයක චලිතය SHM ලෙස සැලකීමට නම්, එහි දෝලන කෝණය (විස්තාරය) ඉතා කුඩා විය යුතුමය (කෝණය &lt; 10°). sin θ ≈ θ ලෙස ගත හැක්කේ එවිට පමණි.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 02. Wave Motion and Properties */}
          <Accordion title={isEnglish ? "02. Wave Motion and Properties" : "02. තරංග චලිතය සහ ගුණ (Wave Motion and Properties)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Transverse Waves:</strong> Waves in which the particles of the medium vibrate perpendicular to the direction of wave propagation (e.g. water ripples, light).</li>
                      <li>• <strong>Longitudinal Waves:</strong> Waves in which the particles of the medium vibrate parallel to the direction of wave propagation (e.g. sound waves).</li>
                      <li>• <strong>Wavelength (λ):</strong> The distance between two consecutive particles in the same phase.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                      Wave Equation: v = fλ <span className="text-slate-500 text-xs">(v: wave speed, f: frequency, λ: wavelength)</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Waves display 4 phenomena: Reflection, Refraction, Diffraction, and Interference.</li>
                      <li>• Principle of Superposition: The resultant displacement is the vector sum of individual wave displacements.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">When a wave travels from one medium to another (refraction), its speed (v) and wavelength (λ) change, but its <strong>frequency (f) remains constant</strong>.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>තීර්යක් තරංග (Transverse Waves):</strong> මාධ්යයේ අංශු කම්පනය වන දිශාව, තරංගය ප්රගමනය වන දිශාවට ලම්බක වන තරංග වේ (උදා: ජල තරංග, ආලෝකය).</li>
                      <li><strong>අන්වායාම තරංග (Longitudinal Waves):</strong> මාධ්යයේ අංශු කම්පනය වන දිශාව, තරංගය ගමන් ගන්නා දිශාවට සමාන්තර වන තරංග වේ (උදා: ධ්වනි තරංග).</li>
                      <li><strong>තරංග ආයාමය (Wavelength - λ):</strong> එකම කලාවේ පවතින ආසන්නතම අංශු දෙකක් අතර දුරයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සමීකරණ:</h4>
                    <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                      තරංග සමීකරණය: v = fλ
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>තරංගයක ගුණ 4 කි: පරාවර්තනය, වර්තනය, විවර්තනය, හා නිරෝධනය.</li>
                      <li>නිරෝධනයේදී සම්ප්රයුක්ත විස්ථාපනය යනු තනි තනි තරංගවල විස්ථාපනවල දෛශික ඓක්යයට සමාන වේ (අධිස්ථාපන මූලධර්මය).</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">තරංගයක් එක් මාධ්යයකින් තවත් මාධ්යයකට ගමන් කිරීමේදී (වර්තනය), එහි වේගය (v) සහ තරංග ආයාමය (λ) වෙනස් වුවද <strong>සංඛ්යාතය (f) නියතව පවතී</strong>.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 03. Stationary Waves and Sound Pipes */}
          <Accordion title={isEnglish ? "03. Stationary Waves and Sound Pipes" : "03. ස්ථාවර තරංග සහ ධ්වනි නළ (Stationary Waves and Sound Pipes)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Nodes:</strong> Points in a stationary wave that remain permanently at rest (zero displacement).</li>
                      <li>• <strong>Antinodes:</strong> Points in a stationary wave where displacement is maximum.</li>
                      <li>• <strong>Fundamental Note:</strong> The lowest frequency note that a system can produce (f₀).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Speed of transverse wave on string: v = √(T/m) <span className="text-slate-500 text-xs">(T: tension, m: mass per unit length)</span></li>
                      <li>• Fundamental frequency of string: f₀ = 1/(2l) * √(T/m)</li>
                      <li>• Closed Pipes: f_n = nv / 4l (n = 1, 3, 5...)</li>
                      <li>• Open Pipes: f_n = nv / 2l (n = 1, 2, 3...)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Closed pipes produce only odd harmonics (1, 3, 5...).</li>
                      <li>• Open pipes produce all harmonics (1, 2, 3, 4...).</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">In practical sound pipe problems, <strong>end correction (e)</strong> must be considered. A closed pipe has one end correction (l → l + e), and an open pipe has two end corrections (l → l + 2e).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>නිෂ්පන්ද (Nodes):</strong> ස්ථාවර තරංගයක විස්ථාපනය සෑම විටම ශුන්ය වන ලක්ෂ්ය.</li>
                      <li><strong>ප්රස්පන්ද (Antinodes):</strong> ස්ථාවර තරංගයක විස්ථාපනය උපරිම වන ලක්ෂ්ය.</li>
                      <li><strong>මූලික ස්වරය (Fundamental Note):</strong> පද්ධතියක් කම්පනය විය හැකි අවම සංඛ්යාතයයි (f₀).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>තන්තුවක තරංග වේගය: v = √(T/m)</li>
                      <li>තන්තුවක මූලික සංඛ්යාතය: f₀ = 1/(2l) * √(T/m)</li>
                      <li>සංවෘත නළ (Closed Pipes): f_n = nv / 4l (n = 1, 3, 5...)</li>
                      <li>විවෘත නළ (Open Pipes): f_n = nv / 2l (n = 1, 2, 3...)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>සංවෘත නළ තුළ නිපදවෙන්නේ ඔත්තේ ගුණාකාර ප්රසංවාද පමණි (1, 3, 5).</li>
                      <li>විවෘත නළ තුළ සියලුම ප්රසංවාද නිපදවේ (1, 2, 3, 4).</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ප්රායෝගිකව ධ්වනි නළ ගැටළු විසඳීමේදී අන්ත ශෝධනය (e) අනිවාර්යයෙන් සැලකිය යුතුය. සංවෘත නළයක එක් කෙළවරක පමණක් අන්ත ශෝධනයක් ඇති අතර, විවෘත නළයක දෙකෙළවරම අන්ත ශෝධන පවතී (l → l + 2e).</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 04. Doppler Effect & Nature of Sound */}
          <Accordion title={isEnglish ? "04. Doppler Effect & Nature of Sound" : "04. ඩොප්ලර් ආචරණය සහ ධ්වනියේ ස්වභාවය (Doppler Effect & Nature of Sound)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Doppler Effect:</strong> The apparent change in frequency of sound heard due to the relative motion between the sound source and the observer.</li>
                      <li>• <strong>Loudness:</strong> The subjective sensation of sound depending on the physical intensity of the wave.</li>
                      <li>• <strong>Pitch:</strong> The subjective sensation of sound depending on the physical frequency of the wave.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Doppler Formula: f = ((v ± u₀) / (v ∓ u_s)) * f₀ <span className="text-slate-500 text-xs">(v: speed of sound, u₀: speed of observer, u_s: speed of source)</span></li>
                      <li>• Sound Intensity Level: β = 10 log₁₀(I / I₀) dB</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Frequency increases as observer and source move closer, and decreases as they move apart.</li>
                      <li>• The human audio frequency range is 20 Hz to 20,000 Hz.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">Always carefully check speed directions in the Doppler formula. If the source moves towards the observer, the denominator is (v - u_s). If there is wind, its speed must be added or subtracted from sound speed depending on direction.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>ඩොප්ලර් ආචරණය (Doppler Effect):</strong> ධ්වනි ප්රභවය සහ නිරීක්ෂකයා අතර සාපේක්ෂ චලිතයක් පවතින විට, නිරීක්ෂකයාට ඇසෙන සංඛ්යාතය ප්රභවයේ නියම සංඛ්යාතයට වඩා වෙනස් වී ඇසීමේ සංසිද්ධියයි.</li>
                      <li><strong>හඬේ සැර (Loudness):</strong> ධ්වනි තීව්රතාවය (Intensity) මත රඳා පවතින ශ්රවණ සංවේදනයයි.</li>
                      <li><strong>තාරතාව (Pitch):</strong> ධ්වනියේ සංඛ්යාතය (Frequency) මත රඳා පවතින ශ්රවණ සංවේදනයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>ඩොප්ලර් සමීකරණය: f = ((v ± u₀) / (v ∓ u_s)) * f₀</li>
                      <li>තීව්රතා මට්ටම (Intensity Level): β = 10 log₁₀(I / I₀) dB</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>නිරීක්ෂකයා ප්රභවය දෙසට චලිත වන විට ඇසෙන සංඛ්යාතය වැඩි වේ. ප්රභවයෙන් ඉවතට යන විට අඩුවේ.</li>
                      <li>මිනිස් කනෙහි ශ්රවණ පරාසය 20 Hz සිට 20,000 Hz දක්වා වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ඩොප්ලර් සමීකරණය යෙදීමේදී වේගයන්ගේ දිශාවන් අනිවාර්යයෙන්ම නිවැරදිව ආදේශ කළ යුතුය. ප්රභවය නිරීක්ෂකයා වෙතට එයි නම් හරය (v - u_s) වේ. සුළඟක් හමා යයි නම් එහි වේගය ධ්වනි වේගයට එකතු කිරීම හෝ අඩු කිරීම කළ යුතුය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 05. Geometrical Optics */}
          <Accordion title={isEnglish ? "05. Geometrical Optics" : "05. ජ්යාමිතික ප්රකාශ විද්යාව (Geometrical Optics)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Critical Angle (c):</strong> The angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90°.</li>
                      <li>• <strong>Total Internal Reflection (TIR):</strong> The complete reflection of light back into the denser medium when the angle of incidence exceeds the critical angle.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Snell&apos;s Law: n₁ sin i₁ = n₂ sin i₂</li>
                      <li>• Critical Angle: sin c = 1 / n</li>
                      <li>• Lens Formula: 1/v - 1/u = 1/f</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Convex lenses act as converging lenses, while concave lenses act as diverging lenses.</li>
                      <li>• Minimum deviation in a prism occurs when the angle of incidence equals the angle of emergence.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">The Cartesian sign convention is mandatory. Distances in the direction of light are (+), opposite are (-), and focal length of convex lenses is (+).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>අවධි කෝණය (Critical Angle - c):</strong> ඝනතර මාධ්යයක සිට විරල මාධ්යයකට ආලෝකය ගමන් කරන විට, වර්තන කෝණය 90° වීමට අනුරූප පතන කෝණයයි.</li>
                      <li><strong>පූර්ණ අභ්යන්තර පරාවර්තනය (Total Internal Reflection):</strong> පතන කෝණය අවධි කෝණයට වඩා විශාල වූ විට ආලෝකය වර්තනය නොවී සම්පූර්ණයෙන්ම එම මාධ්යය තුළටම පරාවර්තනය වීමයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>ස්නෙල් නියමය: n₁ sin i₁ = n₂ sin i₂</li>
                      <li>අවධි කෝණය: sin c = 1 / n</li>
                      <li>කාච සූත්රය: 1/v - 1/u = 1/f</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>උත්තල කාච අභිසාරී කාච ලෙසද, අවතල කාච අපසාරී කාච ලෙසද ක්රියා කරයි.</li>
                      <li>ප්රිස්මයක අවම අපගමනය සිදුවන්නේ පතන කෝණය සහ නිර්ගත කෝණය සමාන වන විටය.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">කාච සමීකරණ යෙදීමේදී කාටිසියානු ලකුණු සම්මුතිය භාවිතය අනිවාර්ය වේ. ආලෝකය ගමන් කරන දිශාවට මනින දුර ධන (+) ලෙසත්, ඊට විරුද්ධ දිශාවට මනින දුර සෘණ (-) ලෙසත්, උත්තල කාච සඳහා නාභිය දුර ධන (+) ලෙසත් ආදේශ කළ යුතුය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 06. Human Eye & Optical Instruments */}
          <Accordion title={isEnglish ? "06. Human Eye & Optical Instruments" : "06. මිනිස් ඇස සහ ප්රකාශ උපකරණ (Human Eye & Optical Instruments)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Myopia (Short-sightedness):</strong> Difficulty seeing distant objects clearly because the image forms in front of the retina.</li>
                      <li>• <strong>Hypermetropia (Long-sightedness):</strong> Difficulty seeing near objects clearly because the image forms behind the retina.</li>
                      <li>• <strong>Angular Magnification (m):</strong> The ratio of the angle subtended by the image to that subtended by the object at the unaided eye.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Simple Microscope Magnification: m = D / u</li>
                      <li>• Telescope Magnification (Normal adjustment): m = f_o / f_e</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Myopia is corrected using a concave lens; Hypermetropia is corrected using a convex lens.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">For maximum magnification, the final image must form at the near point D = 25 cm. For relaxed eye viewing, normal adjustment is used where the final image forms at infinity.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>අවිදුර දෘෂ්ටිකත්වය (Myopia):</strong> දුර ඇති වස්තු පැහැදිලිව නොපෙනී යාම (ප්රතිබිම්බය දෘෂ්ටි විතානයට ඉදිරියෙන් සෑදේ).</li>
                      <li><strong>දුර දෘෂ්ටිකත්වය (Hypermetropia):</strong> ළඟ ඇති වස්තු පැහැදිලිව නොපෙනී යාම (ප්රතිබිම්බය දෘෂ්ටි විතානයට පිටුපසින් සෑදේ).</li>
                      <li><strong>කෝණික විශාලනය (m):</strong> උපකරණයෙන් සාදන ප්රතිබිම්බය මගින් ඇසෙහි ආපාතිත කෝණයත්, උපකරණය නොමැතිව වස්තුව මගින් ඇසෙහි ආපාතිත කෝණයත් අතර අනුපාතයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>සරල අන්වීක්ෂයේ විශාලනය: m = D / u</li>
                      <li>දුරේක්ෂයේ විශාලනය (සාමාන්ය සීරුවාරුව): m = f_o / f_e</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>අවිදුර දෘෂ්ටිකත්වයට පිළියමක් ලෙස අවතල කාච ද, දුර දෘෂ්ටිකත්වයට පිළියමක් ලෙස උත්තල කාච ද භාවිත කෙරේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ඕනෑම ප්රකාශ උපකරණයකින් උපරිම විශාලනයක් ලබා ගැනීමට නම්, අවසාන ප්රතිබිම්බය ඇසේ අවිදුර ලක්ෂ්යයේ (D = 25 cm) සෑදිය යුතුය. නමුත් ඇසට විඩාවක් නොමැතිව බැලීම සඳහා සාමාන්ය සීරුවාරුව භාවිත කරන අතර එහිදී අවසාන ප්රතිබිම්බය අනන්තයේ සෑදෙන සේ සකස් කරයි.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* Standard Audio Thresholds Table */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-left">
              <span>🔊</span> {isEnglish ? 'Standard Audio Thresholds for Human Ear' : 'මිනිස් කන සඳහා ධ්වනියේ සම්මත අගයන් (Standard Audio Thresholds for Human Ear)'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-100">
                    <th className="p-3 font-semibold text-blue-900">{isEnglish ? 'Hearing Limit' : 'ශ්රවණ සීමාව (Hearing Limit)'}</th>
                    <th className="p-3 font-semibold text-blue-900">{isEnglish ? 'Intensity' : 'ධ්වනි තීව්රතාවය / Intensity'}</th>
                    <th className="p-3 font-semibold text-blue-900">{isEnglish ? 'Intensity Level' : 'තීව්රතා මට්ටම / Intensity Level'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">
                      {isEnglish ? 'Threshold of Hearing - Minimum audible level' : 'ශ්රව්යතා දේහලිය (Threshold of Hearing) - අවම ඇසෙන සීමාව'}
                    </td>
                    <td className="p-3 font-mono">10⁻¹² W m⁻²</td>
                    <td className="p-3 font-mono">0 dB</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">
                      {isEnglish ? 'Threshold of Pain - Painful level' : 'වේදනා දේහලිය (Threshold of Pain) - කනට වේදනා දෙන සීමාව'}
                    </td>
                    <td className="p-3 font-mono">1 W m⁻²</td>
                    <td className="p-3 font-mono">120 dB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Interactive Virtual Optics Bench Simulator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              {isEnglish ? '👁️ Virtual Optics Bench' : '👁️ Virtual Optics Bench (අතථ්‍ය ප්‍රකාශ බංකුව)'}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {isEnglish 
                ? 'Observe ray refraction and image formation depending on the object distance.' 
                : 'වස්තුව තබන දුර අනුව කිරණ වර්තනය වී බිම්බය (Image) සෑදෙන ආකාරය අධ්‍යයනය කරන්න.'}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Controls Panel */}
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sliders className="w-4 h-4" /> {isEnglish ? 'Settings' : 'පාලක (Settings)'}
              </h4>

              {/* Lens Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">{isEnglish ? 'Select Lens Type:' : 'කාච වර්ගය තෝරන්න:'}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setLensType('convex')}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${lensType === 'convex' ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-slate-700'}`}
                  >
                    {isEnglish ? '🔍 Convex Lens' : '🔍 උත්තල කාචය (Convex)'}
                  </button>
                  <button 
                    onClick={() => setLensType('concave')}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${lensType === 'concave' ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-slate-700'}`}
                  >
                    {isEnglish ? '👓 Concave Lens' : '👓 අවතල කාචය (Concave)'}
                  </button>
                </div>
              </div>

              {/* Object Distance Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">{isEnglish ? 'Object Distance (u):' : 'වස්තු දුර (u):'}</label>
                  <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{objectDistance} cm</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="250" 
                  value={objectDistance} 
                  onChange={(e) => { setObjectDistance(Number(e.target.value)); setOpticsFeedback({ status: '', msg: '' }); }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  {isEnglish ? 'Focal length (f) is taken as 80 cm.' : 'නාභි දුර (f) = 80 cm ලෙස සලකා ඇත.'}
                </span>
              </div>

              {/* Toggle Arrow Checkbox */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <label className="text-xs font-bold text-slate-700">{isEnglish ? 'Draw arrows on rays:' : 'කිරණ මත ඊතල (Arrows) දැක්වීම:'}</label>
                <input 
                  type="checkbox" 
                  checked={showArrows}
                  onChange={(e) => { setShowArrows(e.target.checked); setOpticsFeedback({ status: '', msg: '' }); }}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <button 
                onClick={checkRayDiagram}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition cursor-pointer border-0"
              >
                {isEnglish ? 'Verify Ray Diagram' : 'කිරණ සටහන පරීක්ෂා කරන්න'}
              </button>
            </div>

            {/* Live Ray Diagram Rendering Screen */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              {/* Bench Display Box */}
              <div className="bg-slate-950 rounded-xl p-4 min-h-[220px] flex items-center justify-center relative overflow-hidden border border-slate-800">
                
                {/* Visual Representation Graphic inside Simulator */}
                <svg viewBox="0 0 500 200" className="w-full h-auto">
                  {/* Principal Axis (ප්‍රධාන අක්ෂය) */}
                  <line x1="10" y1="100" x2="490" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                  <text x="400" y="90" fill="#475569" fontSize="10">{isEnglish ? 'Principal Axis' : 'ප්‍රධාන අක්ෂය'}</text>

                  {/* Lens Center Line */}
                  <line x1="250" y1="20" x2="250" y2="180" stroke="#38bdf8" strokeWidth="3" />
                  {/* Focal Points */}
                  <circle cx="170" cy="100" r="3" fill="#ef4444" />
                  <text x="165" y="115" fill="#ef4444" fontSize="10">F</text>
                  <circle cx="330" cy="100" r="3" fill="#ef4444" />
                  <text x="325" y="115" fill="#ef4444" fontSize="10">F</text>

                  {/* Object Arrow (වස්තුව) */}
                  {/* Object is at (250 - objectDistance) */}
                  <g transform={`translate(${250 - objectDistance}, 100)`}>
                    <line x1="0" y1="0" x2="0" y2="-40" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="0,-44 -4,-38 4,-38" fill="#f43f5e" />
                    <text x="-15" y="-48" fill="#f43f5e" fontSize="10" fontWeight="bold">{isEnglish ? 'Object' : 'වස්තුව'}</text>
                  </g>

                  {/* Ray 1: Parallel to principal axis then through focus */}
                  <path 
                    d={`M ${250 - objectDistance},60 L 250,60 L ${lensType === 'convex' ? '330,100 L 450,160' : '400,25'}`} 
                    fill="none" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                  />
                  {showArrows && (
                    <g fill="#fbbf24">
                      <polygon points="150,60 144,56 144,64" />
                      {lensType === 'convex' ? (
                        <polygon points="290,80 286,75 293,78" />
                      ) : (
                        <polygon points="290,48 285,52 292,46" />
                      )}
                    </g>
                  )}

                  {/* Ray 2: Through optical center */}
                  <line x1={250 - objectDistance} y1="60" x2="380" y2={100 + (40 * (380 - 250) / objectDistance)} stroke="#a855f7" strokeWidth="2" />
                  {showArrows && (
                    <g fill="#a855f7">
                      <polygon points="200,84 195,80 202,82" />
                    </g>
                  )}

                  {/* Image Arrow Rendering (බිම්බය) */}
                  {lensType === 'convex' && isRealImage && (
                    <g transform={`translate(${250 + imageDistance}, 100)`}>
                      <line x1="0" y1="0" x2="0" y2={imageHeight} stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                      <polygon points={`0,${imageHeight + 4} -4,${imageHeight} 4,${imageHeight}`} fill="#34d399" />
                      <text x="10" y="20" fill="#34d399" fontSize="10" fontWeight="bold">
                        {isEnglish ? 'Image (Real)' : 'බිම්බය (සැබෑ)'}
                      </text>
                    </g>
                  )}
                </svg>

              </div>

              {/* Feedback Display Box */}
              {opticsFeedback.msg && (
                <div className={`mt-4 p-4 rounded-xl text-xs md:text-sm font-medium border ${opticsFeedback.status === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  {opticsFeedback.msg}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
