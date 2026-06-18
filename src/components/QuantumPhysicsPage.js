'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, Award, ArrowLeft } from 'lucide-react';

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
          isOpen ? 'max-h-[1400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function QuantumPhysicsPage() {
  const [lightColor, setLightColor] = useState('red'); // red, green, uv
  const [electronsEjected, setElectronsEjected] = useState(false);
  const [quantumFeedback, setQuantumFeedback] = useState('');

  useEffect(() => {
    if (lightColor === 'uv') {
      setElectronsEjected(true);
      setQuantumFeedback('🎉 නියමයි! පාරජම්බුල (UV) කිරණවල සංඛ්‍යාතය දේහලී සංඛ්‍යාතයට (Threshold Frequency f0) වඩා වැඩි බැවින් ලෝහ තහඩුවෙන් ඉලෙක්ට්‍රෝන ක්ෂණිකව ගැලවී පිටතට විසි වේ! (E = hf - Φ)');
    } else {
      setElectronsEjected(false);
      setQuantumFeedback(`❌ ඉලෙක්ට්‍රෝන ගැලවෙන්නේ නැත! ${lightColor === 'red' ? 'රතු' : 'කොළ'} ආලෝකයේ ශක්තිය ලෝහයේ කාර්ය ශ්‍රිතයට (Work Function Φ) වඩා අඩුය. ආලෝකයේ තීව්‍රතාවය (දීප්තිය) කොතරම් වැඩි කළත් සංඛ්‍යාතය මදි නම් ඉලෙක්ට්‍රෝන කිසිවිටකත් ගැලවෙන්නේ නැත!`);
    }
  }, [lightColor]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-fuchsia-500/30 border border-fuchsia-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 11</span>
            <h1 className="text-3xl font-bold mt-2">පදාර්ථ හා විකිරණ (Matter and Radiation)</h1>
            <p className="text-fuchsia-100 text-sm mt-1">ක්වොන්ටම් භෞතික විද්‍යාව, එක්ස්-කිරණ, ප්‍රකාශ විද්‍යුත් ආචරණය සහ විකිරණශීලිතාව.</p>
          </div>
        </div>

        {/* Theory & Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-fuchsia-600" /> මූලික සංකල්ප</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">ප්‍රකාශ විද්‍යුත් ආචරණය:</strong> ලෝහ පෘෂ්ඨයක් මතට ඉහළ සංඛ්‍යාතයක් සහිත ආලෝක ෆෝටෝන පතිත වූ විට ක්ෂණිකව ඉලෙක්ට්‍රෝන පිටවීමේ සංසිද්ධියයි (Emax = hf - Φ).</li>
              <li>• <strong className="text-slate-800">අර්ධ ආයු කාලය (T1/2):</strong> විකිරණශීලී පරමාණු සංඛ්‍යාවෙන් හරියටම අඩක් ක්ෂය වීමට ගතවන කාලයයි (T1/2 = 0.693/λ).</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-purple-500" /> Paper Marking රහස්</h2>
            <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs md:text-sm text-purple-900">
              <strong>⚠️ නිවාරක විභව (Stopping Potential) ප්‍රස්ථාර උගුල:</strong> විභාගයේදී V0 එදිරිව f ප්‍රස්ථාරය අඳින විට, නිවාරක විභව අක්ෂයේ සෘණ අගය (-Φ/e) සිරස් අක්ෂයේ සෘණ පැත්ත කපාගෙන යන සේ අනිවාර්යයෙන්ම ඇඳ දැක්විය යුතුය. නැතහොත් ලකුණු නොලැබේ!
            </div>
          </div>
        </div>

        {/* සම්පත් පොත් සාරාංශය: පදාර්ථ හා විකිරණ */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> සම්පත් පොත් සාරාංශය: පදාර්ථ හා විකිරණ
          </h2>

          {/* 1. තාප විකිරණය සහ කෘෂ්ණ වස්තු */}
          <Accordion title="01. තාප විකිරණය සහ කෘෂ්ණ වස්තු (Thermal Radiation and Blackbodies)">
            <div className="space-y-4 text-slate-700">
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
            </div>
          </Accordion>

          {/* 2. ප්‍රකාශ විද්‍යුත් ආචරණය */}
          <Accordion title="02. ප්‍රකාශ විද්‍යුත් ආචරණය (Photoelectric Effect)">
            <div className="space-y-4 text-slate-700">
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
            </div>
          </Accordion>

          {/* 3. පදාර්ථයේ තරංග ස්වභාවය සහ X-කිරණ */}
          <Accordion title="03. පදාර්ථයේ තරංග ස්වභාවය සහ X-කිරණ (Wave Nature of Matter and X-Rays)">
            <div className="space-y-4 text-slate-700">
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
                  <li>{"ඩි බ්‍රොග්ලි තරංග ආයාමය: λ = h / p = h / mv"}</li>
                  <li>{"චාලක ශක්තිය (K) හෝ ත්වරක විභවය (V) ඇසුරෙන්: λ = h / √(2mK) = h / √(2mVe)"}</li>
                  <li>{"X-කිරණ අවම තරංග ආයාමය: λ_min = hc / eV (V = X-කිරණ නළයට යොදන වෝල්ටීයතාව, e = ඉලෙක්ට්‍රෝන ආරෝපණය)"}</li>
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
            </div>
          </Accordion>

          {/* 4. විකිරණශීලිතාව සහ න්‍යෂ්ටික භෞතිකය */}
          <Accordion title="04. විකිරණශීලිතාව සහ න්‍යෂ්ටික භෞතිකය (Radioactivity and Nuclear Physics)">
            <div className="space-y-4 text-slate-700">
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
            </div>
          </Accordion>

          {/* 5. මූලික අංශු සහ මූලික බල */}
          <Accordion title="05. මූලික අංශු සහ මූලික බල (Fundamental Particles and Forces)">
            <div className="space-y-4 text-slate-700">
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
                  <li>{"ප්‍රෝටෝනයේ සංයුතිය (Quark composition): uud (ආරෝපණය: +2/3 + 2/3 - 1/3 = +1e)"}</li>
                  <li>{"නියුට්‍රෝනයේ සංයුතිය: udd (ආරෝපණය: +2/3 - 1/3 - 1/3 = 0)"}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <p>ස්වභාවධර්මයේ මූලික බල 4ක් ඇත: ප්‍රබල බලය (Strong force), විද්‍යුත් චුම්භක බලය (Electromagnetic force), දුබල බලය (Weak force), ගුරුත්වාකර්ෂණ බලය (Gravitational force).</p>
              </div>

              {/* Fundamental Forces Table */}
              <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-800">බලය (Force)</th>
                      <th className="p-3 font-bold text-slate-800">සාපේක්ෂ ප්‍රබලතාව (Relative Strength)</th>
                      <th className="p-3 font-bold text-slate-800">ක්‍රියාත්මක වන්නේ කුමක් මත ද?</th>
                      <th className="p-3 font-bold text-slate-800">පරාසය (Range)</th>
                      <th className="p-3 font-bold text-slate-800">බලය යෙදෙන අවස්ථා</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">ප්‍රබල බලය (Strong)</td>
                      <td className="p-3 text-slate-600">1</td>
                      <td className="p-3 text-slate-600">ක්වාක් (Quarks)</td>
                      <td className="p-3 text-slate-600">10⁻¹⁵ m</td>
                      <td className="p-3 text-slate-600">න්‍යෂ්ටිය තුළ ප්‍රෝටෝන හා නියුට්‍රෝන එකට බැඳී තබා ගැනීම</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">විද්‍යුත් චුම්භක (Electromagnetic)</td>
                      <td className="p-3 text-slate-600">10⁻²</td>
                      <td className="p-3 text-slate-600">විද්‍යුත් ආරෝපණ</td>
                      <td className="p-3 text-slate-600">අනන්තයි</td>
                      <td className="p-3 text-slate-600">පරමාණු එකට බැඳී පවතින ගැටීම්</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">දුබල බලය (Weak)</td>
                      <td className="p-3 text-slate-600">10⁻¹³</td>
                      <td className="p-3 text-slate-600">ලෙප්ටෝන හා ක්වාක්</td>
                      <td className="p-3 text-slate-600">10⁻¹⁸ m</td>
                      <td className="p-3 text-slate-600">විකිරණශීලී ක්ෂය වීම් (උදා: β ක්ෂය වීම්)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-700">ගුරුත්වාකර්ෂණ (Gravitational)</td>
                      <td className="p-3 text-slate-600">10⁻³⁹</td>
                      <td className="p-3 text-slate-600">සියලු ස්කන්ධ</td>
                      <td className="p-3 text-slate-600">අනන්තයි</td>
                      <td className="p-3 text-slate-600">සෞරග්‍රහ පද්ධතියේ ග්‍රහයින් රඳවා ගැනීම</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion>

        </div>

        {/* Photoelectric Effect Tool Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5"><h3 className="text-lg font-bold flex items-center gap-2">⚛️ Photoelectric Effect Playground (ප්‍රකාශ විද්‍යුත් ආචරණය)</h3></div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 space-y-4">
              <label className="text-xs font-bold text-slate-700 block">පතිත වන ආලෝකයේ වර්ණය තෝරන්න:</label>
              <div className="flex flex-col gap-2">
                <button onClick={() => setLightColor('red')} className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'red' ? 'bg-red-600 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>🔴 රතු ආලෝකය (Low Frequency)</button>
                <button onClick={() => setLightColor('green')} className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'green' ? 'bg-green-600 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>🟢 කොළ ආලෝකය (Medium Frequency)</button>
                <button onClick={() => setLightColor('uv')} className={`p-2.5 rounded-lg text-xs font-bold text-left cursor-pointer transition ${lightColor === 'uv' ? 'bg-fuchsia-600 text-white shadow' : 'bg-slate-100 text-slate-700'}`}>⚡ පාරජම්බුල කිරණ (High Frequency UV)</button>
              </div>
            </div>
            <div className="md:col-span-8 bg-slate-950 h-52 rounded-xl relative flex items-center justify-center border overflow-hidden p-4">
              {/* Light Ray Visual Representation inside Widget */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${lightColor === 'red' ? 'from-red-500' : lightColor === 'green' ? 'from-green-500' : 'from-fuchsia-400'} to-transparent opacity-60`}></div>
              <div className="bg-slate-800 w-32 h-12 rounded border border-slate-600 flex items-center justify-center text-xs text-slate-300 font-bold">ලෝහ තහඩුව (Metal)</div>
              {electronsEjected && (
                <div className="absolute right-12 flex gap-2 animate-ping"><div className="w-3 h-3 bg-cyan-400 rounded-full"></div><div className="w-3 h-3 bg-cyan-400 rounded-full"></div></div>
              )}
              {quantumFeedback && <div className="absolute bottom-2 left-2 right-2 text-[10px] md:text-xs bg-slate-900/90 text-slate-300 p-2 rounded text-center border border-slate-800">{quantumFeedback}</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
