'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, ArrowLeft } from 'lucide-react';

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
          isOpen ? 'max-h-[1400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function QuantumPhysicsPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';
  const [lightColor, setLightColor] = useState('red'); // red, green, uv
  const [electronsEjected, setElectronsEjected] = useState(false);
  const [quantumFeedback, setQuantumFeedback] = useState('');

  useEffect(() => {
    if (lightColor === 'uv') {
      setElectronsEjected(true);
      setQuantumFeedback(
        isEnglish
          ? '🎉 Excellent! The frequency of Ultraviolet (UV) rays is greater than the threshold frequency (Threshold Frequency f₀), so electrons are instantaneously ejected from the metal plate! (E = hf - Φ)'
          : '🎉 නියමයි! පාරජම්බුල (UV) කිරණවල සංඛ්‍යාතය දේහලී සංඛ්‍යාතයට (Threshold Frequency f0) වඩා වැඩි බැවින් ලෝහ තහඩුවෙන් ඉලෙක්ට්‍රෝන ක්ෂණිකව ගැලවී පිටතට විසි වේ! (E = hf - Φ)'
      );
    } else {
      setElectronsEjected(false);
      setQuantumFeedback(
        isEnglish
          ? `❌ No electrons are ejected! The energy of ${lightColor === 'red' ? 'red' : 'green'} light is less than the work function (Work Function Φ) of the metal. No matter how much you increase the light intensity (brightness), if the frequency is insufficient, electrons will never be ejected!`
          : `❌ ඉලෙක්ට්‍රෝන ගැලවෙන්නේ නැත! ${lightColor === 'red' ? 'රතු' : 'කොළ'} ආලෝකයේ ශක්තිය ලෝහයේ කාර්ය ශ්‍රිතයට (Work Function Φ) වඩා අඩුය. ආලෝකයේ තීව්‍රතාවය (දීප්තිය) කොතරම් වැඩි කළත් සංඛ්‍යාතය මදි නම් ඉලෙක්ට්‍රෝන කිසිවිටකත් ගැලවෙන්නේ නැත!`
      );
    }
  }, [lightColor, isEnglish]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 text-left">
            <span className="bg-fuchsia-500/30 border border-fuchsia-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 11</span>
            <h1 className="text-3xl font-bold mt-2">
              {isEnglish ? 'Matter and Radiation (Unit 11) - Study Guide' : 'පදාර්ථ හා විකිරණ (Matter and Radiation)'}
            </h1>
            <p className="text-fuchsia-100 text-sm mt-1">
              {isEnglish 
                ? 'Quantum physics, X-rays, photoelectric effect, and radioactivity.' 
                : 'ක්වොන්ටම් භෞතික විද්‍යාව, එක්ස්-කිරණ, ප්‍රකාශ විද්‍යුත් ආචරණය සහ විකිරණශීලිතාව.'}
            </p>
          </div>
        </div>

        {/* Theory & Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-fuchsia-600" /> {isEnglish ? 'Syllabus Core Concepts' : 'මූලික සංකල්ප'}
            </h2>
            {isEnglish ? (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">Photoelectric Effect:</strong> The phenomenon of instantaneous emission of electrons when high-frequency light photons strike a metal surface (Emax = hf - Φ).</li>
                <li>• <strong className="text-slate-800">Half-life (T1/2):</strong> The time taken for exactly half of the radioactive nuclei in a sample to decay (T1/2 = 0.693/λ).</li>
              </ul>
            ) : (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">ප්‍රකාශ විද්‍යුත් ආචරණය:</strong> ලෝහ පෘෂ්ඨයක් මතට ඉහළ සංඛ්‍යාතයක් සහිත ආලෝක ෆෝටෝන පතිත වූ විට ක්ෂණිකව ඉලෙක්ට්‍රෝන පිටවීමේ සංසිද්ධියයි (Emax = hf - Φ).</li>
                <li>• <strong className="text-slate-800">අර්ධ ආයු කාලය (T1/2):</strong> විකිරණශීලී පරමාණු සංඛ්‍යාවෙන් හරියටම අඩක් ක්ෂය වීමට ගතවන කාලයයි (T1/2 = 0.693/λ).</li>
              </ul>
            )}
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-500" /> {isEnglish ? 'Marking Secrets & Traps' : 'Paper Marking රහස්'}
            </h2>
            <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs md:text-sm text-purple-900">
              {isEnglish ? (
                <>
                  <strong>⚠️ Stopping Potential Graph Trap:</strong> When drawing the V₀ vs f graph in the exam, the negative intercept (-Φ/e) on the vertical axis must be shown cutting through the negative side. Otherwise, marks will be lost!
                </>
              ) : (
                <>
                  <strong>⚠️ නිවාරක විභව (Stopping Potential) ප්‍රස්ථාර උගුල:</strong> විභාගයේදී V0 එදිරිව f ප්‍රස්ථාරය අඳින විට, නිවාරක විභව අක්ෂයේ සෘණ අගය (-Φ/e) සිරස් අක්ෂයේ සෘණ පැත්ත කපාගෙන යන සේ අනිවාර්යයෙන්ම ඇඳ දැක්විය යුතුය. නැතහොත් ලකුණු නොලැබේ!
                </>
              )}
            </div>
          </div>
        </div>

        {/* සම්පත් පොත් සාරාංශය: පදාර්ථ හා විකිරණ */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Matter and Radiation' : 'සම්පත් පොත් සාරාංශය: පදාර්ථ හා විකිරණ'}
          </h2>

          {/* 1. තාප විකිරණය සහ කෘෂ්ණ වස්තු */}
          <Accordion title={isEnglish ? "01. Thermal Radiation and Blackbodies" : "01. තාප විකිරණය සහ කෘෂ්ණ වස්තු (Thermal Radiation and Blackbodies)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Thermal Radiation:</strong> Electromagnetic radiation emitted by a warm object due to its temperature.</li>
                      <li><strong>Ideal Blackbody:</strong> An ideal body that completely absorbs electromagnetic radiation of all wavelengths falling on it.</li>
                      <li><strong>Emissivity (e):</strong> The ratio of the heat energy emitted by a surface per unit area per unit time to that emitted by a perfect blackbody at the same temperature.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>Wien&apos;s Displacement Law: λ_m * T = C (C = 2.898 × 10⁻³ m K, λ_m = wavelength corresponding to maximum intensity, T = absolute temperature)</li>
                      <li>Stefan&apos;s Law: E = σT⁴ and P = AσT⁴ (E = power emitted per unit area, P = total power, σ = Stefan&apos;s constant, T = absolute temperature, A = surface area)</li>
                      <li>Planck&apos;s Equation: E = nhf (E = energy, h = Planck&apos;s constant, f = frequency, n = integer)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>As the temperature of an object increases, the wavelength corresponding to maximum intensity (λ_m) shifts towards shorter wavelengths (Wien&apos;s Law).</li>
                      <li>According to Planck&apos;s hypothesis, radiation energy is not emitted continuously, but in discrete packets of energy called &quot;quanta&quot; or &quot;photons&quot;.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Notes/Traps:</h4>
                    <p className="text-sm mt-1 text-amber-900">When applying Stefan&apos;s law and Wien&apos;s law, the temperature (T) must always be substituted in Kelvin (K) (absolute temperature).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>තාප විකිරණය (Thermal Radiation):</strong> උණුසුම් වස්තුවක උෂ්ණත්වය හේතුවෙන් විමෝචනය වන විද්‍යුත් චුම්භක විකිරණ වේ.</li>
                      <li><strong>පරිපූර්ණ කෘෂ්ණ වස්තුව (Ideal Blackbody):</strong> තමා මත පතිත වන සියලුම තරංග ආයාමවලින් යුත් විකිරණ සම්පූර්ණයෙන්ම අවශෝෂණය කර ගන්නා පරමාදර්ශී වස්තුවකි.</li>
                      <li><strong>විමෝචකතාව (Emissivity - e):</strong> යම් පෘෂ්ඨයක් ඒකක කාලයකදී ඒකක වර්ගඵලයකින් විමෝචනය කරන තාපය, එම උෂ්ණත්වයේදීම කෘෂ්ණ වස්තුවක් විමෝචනය කරන තාපයට දක්වන අනුපාතයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>වීන් විස්ථාපන නියමය (Wien&apos;s Displacement Law): λ_m * T = C (C = 2.898 × 10⁻³ m K, λ_m = උපරිම තීව්‍රතාවට අනුරූප තරංග ආයාමය, T = නිරපේක්ෂ උෂ්ණත්වය)</li>
                      <li>ස්ටෙෆාන් නියමය (Stefan&apos;s Law): E = σT⁴ සහ P = AσT⁴ (E = ඒකක වර්ගඵලයකින් පිටවන ක්ෂමතාව, P = මුළු ක්ෂමතාව, σ = ස්ටෙෆාන් නියතය, T = නිරපේක්ෂ උෂ්ණත්වය, A = වර්ගඵලය)</li>
                      <li>ප්ලාන්ක් සමීකරණය (Planck&apos;s Equation): E = nhf (E = ශක්තිය, h = ප්ලාන්ක් නියතය, f = සංඛ්‍යාතය, n = පූර්ණ සංඛ්‍යාවකි)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>වස්තුවක උෂ්ණත්වය වැඩි වන විට, උපරිම තීව්‍රතාවට අනුරූප තරංග ආයාමය (λ_m) කෙටි තරංග ආයාම දෙසට විස්ථාපනය වේ (වීන් නියමය).</li>
                      <li>ප්ලාන්ක් කල්පිතයට අනුව විකිරණ ශක්තිය ගලා යන්නේ අඛණ්ඩව නොව &quot;ක්වොන්ටා (Quanta)&quot; හෙවත් &quot;ෆෝටෝන (Photons)&quot; නම් ශක්ති පැකට් වශයෙනි.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ස්ටෙෆාන් නියමය සහ වීන් නියමය යෙදීමේදී උෂ්ණත්වය (T) අනිවාර්යයෙන්ම කෙල්වින් (K) හෙවත් නිරපේක්ෂ උෂ්ණත්වයෙන් ආදේශ කළ යුතු ම ය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 2. ප්‍රකාශ විද්‍යුත් ආචරණය */}
          <Accordion title={isEnglish ? "02. Photoelectric Effect" : "02. ප්‍රකාශ විද්‍යුත් ආචරණය (Photoelectric Effect)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Photoelectric Effect:</strong> The phenomenon of electron emission when light (electromagnetic radiation) falls on a metal surface.</li>
                      <li><strong>Work Function (ϕ):</strong> The minimum energy required to liberate an electron from the metal surface.</li>
                      <li><strong>Threshold Frequency (f₀):</strong> The minimum frequency of incident light required to cause electron emission.</li>
                      <li><strong>Stopping Potential (V_s):</strong> The minimum opposing potential difference required to stop the photoelectrons with maximum kinetic energy.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>Einstein&apos;s Photoelectric Equation: hf = ϕ + K_max</li>
                      <li>Work Function: ϕ = hf₀</li>
                      <li>Maximum Kinetic Energy: K_max = eV_s (e = electron charge)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Photoelectron emission is an instantaneous process (no time delay).</li>
                      <li>The maximum kinetic energy of the emitted electrons does not depend on the intensity of the incident light, but only on its frequency.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Notes/Traps:</h4>
                    <p className="text-sm mt-1 text-amber-900">Although increasing the intensity of incident light increases the photoelectric current, the stopping potential (V_s) remains unchanged. It depends only on the frequency of the light.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>ප්‍රකාශ විද්‍යුත් ආචරණය (Photoelectric Effect):</strong> ලෝහ පෘෂ්ඨයක් මත ආලෝකය (විද්‍යුත් චුම්භක විකිරණ) පතිත වූ විට ඉලෙක්ට්‍රෝන විමෝචනය වීමේ සංසිද්ධියයි.</li>
                      <li><strong>කාර්ය ශ්‍රිතය (Work Function - ϕ):</strong> ලෝහ පෘෂ්ඨයෙන් ඉලෙක්ට්‍රෝනයක් නිදහස් කිරීම සඳහා ලබා දිය යුතු අවම ශක්තියයි.</li>
                      <li><strong>දේහලී සංඛ්‍යාතය (Threshold Frequency - f₀):</strong> ඉලෙක්ට්‍රෝන විමෝචනය කළ හැකි අවම ආලෝක සංඛ්‍යාතයයි.</li>
                      <li><strong>නිවාරක විභවය (Stopping Potential - V_s):</strong> විමෝචනය වන උපරිම චාලක ශක්තියක් ඇති ඉලෙක්ට්‍රෝන නවතාලීම සඳහා යෙදිය යුතු අවම ප්‍රතිවිරුද්ධ විභව අන්තරයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>අයින්ස්ටයින්ගේ ප්‍රකාශ විද්‍යුත් සමීකරණය: hf = ϕ + K_max</li>
                      <li>කාර්ය ශ්‍රිතය: ϕ = hf₀</li>
                      <li>උපරිම චාලක ශක්තිය (Maximum Kinetic Energy): K_max = eV_s (e = ඉලෙක්ට්‍රෝන ආරෝපණය)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ප්‍රකාශ ඉලෙක්ට්‍රෝන විමෝචනය වීම ක්ෂණිකව සිදුවන ක්‍රියාවලියකි (කාල පමාවක් නැත).</li>
                      <li>විමෝචනය වන ඉලෙක්ට්‍රෝනවල උපරිම චාලක ශක්තිය පතිත ආලෝකයේ තීව්‍රතාව මත රඳා නොපවතින අතර එය සංඛ්‍යාතය මත රඳා පවතී.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">පතිත ආලෝකයේ තීව්‍රතාව (Intensity) වැඩි කළ විට ප්‍රකාශ විද්‍යුත් ධාරාව වැඩි වුවද නිවාරක විභවය (V_s) වෙනස් නොවේ. එය රඳා පවතින්නේ ආලෝකයේ සංඛ්‍යාතය මත පමණි.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 3. පදාර්ථයේ තරංග ස්වභාවය සහ X-කිරණ */}
          <Accordion title={isEnglish ? "03. Wave Nature of Matter and X-Rays" : "03. පදාර්ථයේ තරංග ස්වභාවය සහ X-කිරණ (Wave Nature of Matter and X-Rays)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Matter Waves:</strong> The De Broglie concept stating that a wave is associated with every moving particle.</li>
                      <li><strong>X-Rays:</strong> Short wavelength electromagnetic waves produced when electrons traveling at high speeds hit a metal target and decelerate.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>De Broglie Wavelength: λ = h / p = h / mv</li>
                      <li>Using Kinetic Energy (K) or Accelerating Potential (V): λ = h / √(2mK) = h / √(2mVe)</li>
                      <li>Minimum X-Ray Wavelength: λ_min = hc / eV (V = voltage applied to the X-ray tube, e = electron charge)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>The wave nature and diffraction of electrons are utilized in the operation of electron microscopes.</li>
                      <li>The X-ray spectrum consists of two parts: a continuous spectrum and a characteristic spectrum.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Notes/Traps:</h4>
                    <p className="text-sm mt-1 text-amber-900">Increasing the accelerating voltage (V) of an X-ray tube decreases the λ_min of the continuous spectrum. However, the positions of the characteristic X-ray lines do not change; they depend only on the nature of the target metal.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>පදාර්ථ තරංග (Matter Waves):</strong> චලනය වන සෑම අංශුවක් සමඟම තරංගයක් ආශ්‍රිත වී ඇති බව දැක්වෙන ඩි බ්‍රොග්ලි (De Broglie) සංකල්පයයි.</li>
                      <li><strong>X-කිරණ (X-Rays):</strong> ඉතා ඉහළ වේගයකින් ගමන් කරන ඉලෙක්ට්‍රෝන, ලෝහ ඉලක්කයක හැපී වේගය අඩුවීමේදී නිපදවෙන කෙටි තරංග ආයාම සහිත විද්‍යුත් චුම්භක තරංග වේ.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>ඩි බ්‍රොග්ලි තරංග ආයාමය: λ = h / p = h / mv</li>
                      <li>චාලක ශක්තිය (K) හෝ ත්වරක විභවය (V) ඇසුරෙන්: λ = h / √(2mK) = h / √(2mVe)</li>
                      <li>X-කිරණ අවම තරංග ආයාමය: λ_min = hc / eV (V = X-කිරණ නළයට යොදන වෝල්ටීයතාව, e = ඉලෙක්ට්‍රෝන ආරෝපණය)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ඉලෙක්ට්‍රෝන අන්වීක්ෂවල (Electron microscopes) ක්‍රියාකාරිත්වය සඳහා ඉලෙක්ට්‍රෝනවල තරංග ස්වභාවය හා විවර්තනය (Diffraction) යොදා ගැනේ.</li>
                      <li>X-කිරණ වර්ණාවලිය සන්තතික වර්ණාවලියක් (Continuous spectrum) සහ ලාක්ෂණික වර්ණාවලියක් (Characteristic spectrum) යන කොටස් දෙකකින් සමන්විත වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">X-කිරණ නළයක ත්වරක විභවය (V) වැඩි කළ විට සන්තතික වර්ණාවලියේ λ_min අගය අඩුවේ. එහෙත් ලාක්ෂණික X-කිරණ රේඛාවල පිහිටීම වෙනස් නොවේ; එය ඉලක්ක ලෝහයේ ස්වභාවය මත පමණක් රඳා පවතී.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 4. විකිරණශීලිතාව සහ න්‍යෂ්ටික භෞතිකය */}
          <Accordion title={isEnglish ? "04. Radioactivity and Nuclear Physics" : "04. විකිරණශීලිතාව සහ න්‍යෂ්ටික භෞතිකය (Radioactivity and Nuclear Physics)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Mass Defect (Δm):</strong> The difference between the total mass of individual free nucleons and the actual mass of the nucleus formed.</li>
                      <li><strong>Binding Energy (BE):</strong> The minimum energy required to separate the nucleons (protons and neutrons) in a nucleus to infinity.</li>
                      <li><strong>Half-life (T_1/2):</strong> The time required for half of the initial nuclei in a radioactive sample to decay.</li>
                      <li><strong>Nuclear Fission:</strong> The splitting of a heavy nucleus into lighter nuclei. Fusion is the combining of light nuclei to form a heavier nucleus.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>{"Einstein's Mass-Energy Relation: E = mc² or E = Δm × 931.5 MeV"}</li>
                      <li>{"Radioactive Decay Law: N = N_0 * e^{-λt} and A = A_0 * e^{-λt} (λ = decay constant, A = activity)"}</li>
                      <li>{"Half-life: T_1/2 = ln2 / λ = 0.693 / λ"}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>An α particle is a helium nucleus (⁴₂He), a β particle is an electron (⁰₋₁e), and γ is electromagnetic radiation.</li>
                      <li>γ rays have the highest penetrating power, whereas α particles have the highest ionizing power.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Notes/Traps:</h4>
                    <p className="text-sm mt-1 text-amber-900">When balancing nuclear reaction equations, both the total atomic number (Z) and the total mass number (A) must be conserved (equal on both sides).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>ස්කන්ධ දෝෂය (Mass Defect - Δm):</strong> න්‍යෂ්ටියක් සෑදීමේදී නිදහස් නියුක්ලියෝනවල මුළු ස්කන්ධයත්, සෑදුණු න්‍යෂ්ටියේ ස්කන්ධයත් අතර ඇති වෙනසයි.</li>
                      <li><strong>බන්ධන ශක්තිය (Binding Energy - BE):</strong> න්‍යෂ්ටියක ඇති නියුක්ලියෝන (ප්‍රෝටෝන හා නියුට්‍රෝන) එකිනෙකින් වෙන් කර අනන්තයට ගෙන යාමට අවශ්‍ය අවම ශක්තියයි.</li>
                      <li><strong>අර්ධ ආයු කාලය (Half-life - T_1/2):</strong> විකිරණශීලී සාම්පලයක ආරම්භක න්‍යෂ්ටි සංඛ්‍යාවෙන් හරි අඩක් ක්ෂය වී යාමට ගතවන කාලයයි.</li>
                      <li><strong>න්‍යෂ්ටික විඛණ්ඩනය (Nuclear Fission):</strong> විශාල න්‍යෂ්ටියක් කුඩා න්‍යෂ්ටි දෙකකට කැඩී යාමයි. විලයනය (Fusion) යනු කුඩා න්‍යෂ්ටි එකතු වී විශාල න්‍යෂ්ටියක් සෑදීමයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>අයින්ස්ටයින්ගේ ස්කන්ධ-ශක්ති සමීකරණය: E = mc² හෝ E = Δm × 931.5 MeV</li>
                      <li>{"විකිරණශීලී ක්ෂය වීමේ නියමය: N = N_0 * e^{-λt} සහ A = A_0 * e^{-λt} (λ = ක්ෂය නියතය, A = සක්‍රියතාව)"}</li>
                      <li>{"අර්ධ ආයු කාලය: T_1/2 = ln2 / λ = 0.693 / λ"}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>α අංශුවක් යනු හීලියම් න්‍යෂ්ටියකි (⁴₂He), β අංශුවක් යනු ඉලෙක්ට්‍රෝනයකි (⁰₋₁e), γ යනු විද්‍යුත් චුම්භක තරංගයකි.</li>
                      <li>γ කිරණවලට වැඩිම විනිවිද යාමේ හැකියාව ඇති අතර α කිරණවලට වැඩිම අයනීකරණ හැකියාව ඇත.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">න්‍යෂ්ටික ප්‍රතික්‍රියාවක සමීකරණයක් තුලනය කිරීමේදී දෙපසම මුළු පරමාණුක අංකය (Z) සහ මුළු ස්කන්ධ අංකය (A) අනිවාර්යයෙන්ම සංස්ථිතික විය යුතුය (සමාන විය යුතුය).</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 5. මූලික අංශු සහ මූලික බල */}
          <Accordion title={isEnglish ? "05. Fundamental Particles and Forces" : "05. මූලික අංශු සහ මූලික බල (Fundamental Particles and Forces)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Fermions:</strong> Fundamental particles of matter, which include Quarks and Leptons.</li>
                      <li><strong>Bosons:</strong> Exchange particles that mediate the fundamental forces (e.g. gluons, photons).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>Proton composition: uud (charge: +2/3 + 2/3 - 1/3 = +1e)</li>
                      <li>Neutron composition: udd (charge: +2/3 - 1/3 - 1/3 = 0)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <p>There are 4 fundamental forces in nature: Strong force, Electromagnetic force, Weak force, and Gravitational force.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>ෆර්මියෝන (Fermions):</strong> පදාර්ථ සෑදී ඇති මූලික අංශු වන ක්වාක් (Quarks) සහ ලෙප්ටෝන (Leptons) මීට අයත් වේ.</li>
                      <li><strong>බෝසෝන (Bosons):</strong> මූලික බල හුවමාරු කර ගන්නා අතරමැදි අංශු වේ (උදා: ග්ලූවෝන, ෆෝටෝන).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>ප්‍රෝටෝනයේ සංයුතිය (Quark composition): uud (ආරෝපණය: +2/3 + 2/3 - 1/3 = +1e)</li>
                      <li>නියුට්‍රෝනයේ සංයුතිය: udd (ආරෝපණය: +2/3 - 1/3 - 1/3 = 0)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <p>ස්වභාවධර්මයේ මූලික බල 4ක් ඇත: ප්‍රබල බලය (Strong force), විද්‍යුත් චුම්භක බලය (Electromagnetic force), දුබල බලය (Weak force), ගුරුත්වාකර්ෂණ බලය (Gravitational force).</p>
                  </div>
                </>
              )}

              {/* Fundamental Forces Table */}
              <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Force' : 'බලය (Force)'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Relative Strength' : 'සාපේක්ෂ ප්‍රබලතාව (Relative Strength)'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Acts on' : 'ක්‍රියාත්මක වන්නේ කුමක් මත ද?'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Range' : 'පරාසය (Range)'}</th>
                      <th className="p-3 font-bold text-slate-800">{isEnglish ? 'Action / Scenario' : 'බලය යෙදෙන අවස්ථා'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Strong Force (Strong)' : 'ප්‍රබල බලය (Strong)'}</td>
                      <td className="p-3 text-slate-600">1</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Quarks' : 'ක්වාක් (Quarks)'}</td>
                      <td className="p-3 text-slate-600">10⁻¹⁵ m</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Binding protons and neutrons inside nucleus' : 'න්‍යෂ්ටිය තුළ ප්‍රෝටෝන හා නියුට්‍රෝන එකට බැඳී තබා ගැනීම'}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Electromagnetic' : 'විද්‍යුත් චුම්භක (Electromagnetic)'}</td>
                      <td className="p-3 text-slate-600">10⁻²</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Electric charges' : 'විද්‍යුත් ආරෝපණ'}</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Infinite' : 'අනන්තයි'}</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Holding atoms together, collisions' : 'පරමාණු එකට බැඳී පවතින ගැටීම්'}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Weak Force (Weak)' : 'දුබල බලය (Weak)'}</td>
                      <td className="p-3 text-slate-600">10⁻¹³</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Leptons and Quarks' : 'ලෙප්ටෝන හා ක්වාක්'}</td>
                      <td className="p-3 text-slate-600">10⁻¹⁸ m</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Radioactive decay (e.g. β decay)' : 'විකිරණශීලී decay (උදා: β decay)'}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">{isEnglish ? 'Gravitational' : 'ගුරුත්වාකර්ෂණ (Gravitational)'}</td>
                      <td className="p-3 text-slate-600">10⁻³⁹</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'All masses' : 'සියලු ස්කන්ධ'}</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Infinite' : 'අනන්තයි'}</td>
                      <td className="p-3 text-slate-600">{isEnglish ? 'Holding planets in solar system' : 'සෞරග්‍රහ පද්ධතියේ ග්‍රහයින් රඳවා ගැනීම'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

        </div>

        {/* Photoelectric Effect Tool Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5 text-left font-sans">
            <h3 className="text-lg font-bold flex items-center gap-2">
              ⚛️ {isEnglish ? 'Photoelectric Effect Playground' : 'Photoelectric Effect Playground (ප්‍රකාශ විද්‍යුත් ආචරණය)'}
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            <div className="md:col-span-4 space-y-4">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Select color of incident light:' : 'පතිත වන ආලෝකයේ වර්ණය තෝරන්න:'}
              </label>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setLightColor('red')} 
                  className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'red' ? 'bg-red-600 text-white shadow font-sans' : 'bg-slate-100 text-slate-700 font-sans'}`}
                >
                  {isEnglish ? '🔴 Red Light (Low Frequency)' : '🔴 රතු ආලෝකය (Low Frequency)'}
                </button>
                <button 
                  onClick={() => setLightColor('green')} 
                  className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'green' ? 'bg-green-600 text-white shadow font-sans' : 'bg-slate-100 text-slate-700 font-sans'}`}
                >
                  {isEnglish ? '🟢 Green Light (Medium Frequency)' : '🟢 කොළ ආලෝකය (Medium Frequency)'}
                </button>
                <button 
                  onClick={() => setLightColor('uv')} 
                  className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'uv' ? 'bg-fuchsia-600 text-white shadow font-sans' : 'bg-slate-100 text-slate-700 font-sans'}`}
                >
                  {isEnglish ? '⚡ Ultraviolet Rays (High Frequency UV)' : '⚡ පාරජම්බුල කිරණ (High Frequency UV)'}
                </button>
              </div>
            </div>
            <div className="md:col-span-8 bg-slate-950 h-52 rounded-xl relative flex items-center justify-center border overflow-hidden p-4">
              {/* Light Ray Visual Representation inside Widget */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${lightColor === 'red' ? 'from-red-500' : lightColor === 'green' ? 'from-green-500' : 'from-fuchsia-400'} to-transparent opacity-60`}></div>
              <div className="bg-slate-800 w-32 h-12 rounded border border-slate-600 flex items-center justify-center text-xs text-slate-300 font-bold">
                {isEnglish ? 'Metal Plate (Metal)' : 'ලෝහ තහඩුව (Metal)'}
              </div>
              {electronsEjected && (
                <div className="absolute right-12 flex gap-2 animate-ping">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                </div>
              )}
              {quantumFeedback && (
                <div className="absolute bottom-2 left-2 right-2 text-[10px] md:text-xs bg-slate-900/90 text-slate-300 p-2 rounded text-center border border-slate-800 font-sans">
                  {quantumFeedback}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
