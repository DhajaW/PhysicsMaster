'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, RefreshCw, CheckCircle, Plus, ArrowLeft } from 'lucide-react';

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

export default function ThermalPhysicsPage() {
  // Simulator 1: Dew Point Mini-Game States
  const [currentTemp, setCurrentTemp] = useState(30); // Start at 30C room temp
  const [isCloudy, setIsCloudy] = useState(false);
  const [dewFeedback, setDewFeedback] = useState({ status: '', msg: '' });
  const dewPointTrue = 18; // Correct dew point for simulation

  // Simulator 2: Apparatus Builder States
  const [hasSteamTrap, setHasSteamTrap] = useState(false);
  const [thermometerInSteam, setThermometerInSteam] = useState(false);
  const [calorimeterMaterial, setCalorimeterMaterial] = useState('none'); // copper or glass
  const [setupFeedback, setSetupFeedback] = useState({ status: '', msg: '' });

  // Dew Point Temperature Drop Logic
  const addIceCube = () => {
    if (currentTemp > 10) {
      const nextTemp = currentTemp - 2;
      setCurrentTemp(nextTemp);
      
      // 18C ට වඩා අඩු හෝ සමාන වෙද්දී පිටත පෘෂ්ඨය මීදුමෙන් වැසී යයි (Condensation)
      if (nextTemp <= dewPointTrue) {
        setIsCloudy(true);
      }
    }
  };

  const recordDewPoint = () => {
    if (currentTemp === dewPointTrue) {
      setDewFeedback({
        status: 'correct',
        msg: `🎉 නිවැරදියි! තුෂාර අංකය = 18°C. මෙම උෂ්ණත්වයේදී වාතයේ ඇති ජල වාෂ්ප සන්තෘප්ත වීමට ප්‍රමාණවත් වේ. (සැබෑ වාෂ්ප පීඩනය = සන්තෘප්ත වාෂ්ප පීඩනය)`
      });
    } else if (currentTemp < dewPointTrue) {
      setDewFeedback({
        status: 'error',
        msg: `❌ Exam Trap! ඔබ ප්‍රමාද වැඩියි! පෘෂ්ඨය මත දැනටමත් ජල බින්දු (Dew) සෑදී අවසන්. මීදුම ගතිය මතු වූ මුල්ම ක්ෂණයෙන්ම උෂ්ණත්වය වාර්තා කළ යුතුය. (ඔබේ උෂ්ණත්වය: ${currentTemp}°C)`
      });
    } else {
      setDewFeedback({
        status: 'error',
        msg: `❌ වැරදියි! පෘෂ්ඨය තවමත් දීප්තිමත්ව පවතී. ජල වාෂ්ප ඝනීභවනය වීම ආරම්භ වී නැත. (වත්මන් උෂ්ණත්වය: ${currentTemp}°C)`
      });
    }
  };

  // Apparatus Test Logic
  const runApparatusTest = () => {
    if (calorimeterMaterial === 'none') {
      setSetupFeedback({ status: 'error', msg: '❌ කරුණාකර මිශ්‍රණය දැමීම සඳහා කැලරිමීටර බඳුනක් තෝරාගන්න.' });
      return;
    }
    if (calorimeterMaterial === 'glass') {
      setSetupFeedback({ status: 'error', msg: '❌ Exam Trap! වීදුරු බීකර භාවිත කළ නොහැක. වීදුරු සතු ඉහළ විශිෂ්ට තාප ධාරිතාව නිසා තාපය වැඩිපුර අවශෝෂණය කර ගන්නා අතර උෂ්ණත්ව අනුක්‍රමණ සාදයි. තඹ (Copper) බඳුනක් භාවිත කරන්න.' });
      return;
    }
    if (!thermometerInSteam) {
      setSetupFeedback({ status: 'error', msg: '❌ Exam Trap! වාෂ්ප ජනකයේ උෂ්ණත්වමාන බල්බය ජලයේ ගිලී නොතිබිය යුතුය. එය තිබිය යුත්තේ ජල මට්ටමට ඉහළින් වාෂ්ප අවකාශයේ පමණි!' });
      return;
    }
    if (!hasSteamTrap) {
      setSetupFeedback({ status: 'error', msg: '❌ පරීක්ෂණය අසාර්ථකයි! වාෂ්ප නළය දිගේ දැනටමත් ඝනීභවනය වූ ජල බින්දු මිශ්‍රණයට එකතු විය. ගුප්ත තාපය (mL) නිවැරදිව සෙවීමට නම් වාෂ්ප උගුලක් (Steam Trap) මැදට සම්බන්ධ කළ යුතුමයි.' });
      return;
    }

    setSetupFeedback({
      status: 'correct',
      msg: '🎉 විශිෂ්ටයි! ඔබ සියලුම Paper Marking කොන්දේසි සපුරාලමින් නිවැරදි ඇටවුම සකස් කළේය. දැන් පරීක්ෂණාත්මක අගයන් නිවැරදිව ගණනය කළ හැක.'
    });
  };

  const resetAll = () => {
    setCurrentTemp(30);
    setIsCloudy(false);
    setDewFeedback({ status: '', msg: '' });
    setHasSteamTrap(false);
    setThermometerInSteam(false);
    setCalorimeterMaterial('none');
    setSetupFeedback({ status: '', msg: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-orange-400/30 border border-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 04</span>
            <h1 className="text-3xl font-bold mt-2">තාප භෞතික විද්‍යාව (Thermal Physics)</h1>
            <p className="text-orange-100 text-sm mt-1">තුෂාර අංකය, කැලරිමිතිය අවස්ථා විපර්යාස සහ නිව්ටන්ගේ සිසිලන නියමයේ විභාග රටා.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">තුෂාර අංකය (Dew Point):</strong> ලබා දී ඇති වාතය පරිමාවක් සන්තෘප්ත කිරීමට එහි ඇති ජල වාෂ්ප ප්‍රමාණයම ප්‍රමාණවත් වන උෂ්ණත්වයයි.</li>
              <li>• <strong className="text-slate-800">මිශ්‍රණ මූලධර්මය:</strong> බාහිර පරිසරය සමග තාප හුවමාරුවක් සිදු නොවේ නම්, <span className="font-semibold text-slate-800">පද්ධතිය පිට කළ මුළු තාපය = පද්ධතිය ලබාගත් මුළු තාපය</span> (Q = mcΔθ සහ Q = mL).</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-800 block">⚠️ පරිසර තාප හානිය අවම කිරීමේ රීතිය:</span>
                කැලරිමිතියේදී පරිසරයට සිදුවන තාප හානිය වැළැක්වීමට ආරම්භක (θ₁) සහ අවසාන (θ₂) උෂ්ණත්වයන් කාමර උෂ්ණත්වය (θ) දෙපස සමානව පිහිටන සේ සකස් කළ යුතුය. සමීකරණය: θ₂ = 2θ - θ₁.
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-800 block">⚠️ වාෂ්ප උගුලේ (Steam Trap) කාර්යය:</span>
                නළය තුළදී කලින්ම ඝනීභවනය වී ද්‍රව බවට පත් වූ ජල බින්දු කැලරිමීටරය තුළට ඇතුළු වීම වැළැක්වීම.
              </div>
            </div>
          </div>
        </div>

        {/* සම්පත් පොත් සාරාංශය: තාප භෞතික විද්‍යාව */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> සම්පත් පොත් සාරාංශය: තාප භෞතික විද්‍යාව
          </h2>

          {/* 01. උෂ්ණත්වය සහ තාප ප්රසාරණය */}
          <Accordion title="01. උෂ්ණත්වය සහ තාප ප්රසාරණය (Temperature and Thermal Expansion)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>තාප සමතුලිතතාව (Thermal Equilibrium):</strong> වස්තු දෙකක් අතර ශුද්ධ තාප ගලා යාමක් සිදු නොවන තත්ත්වයයි.</li>
                  <li><strong>තාපගති විද්යාවේ ශුන්යාදි නියමය (Zeroth Law of Thermodynamics):</strong> වස්තු දෙකක් තෙවන වස්තුවක් සමඟ වෙන වෙනම තාප සමතුලිතතාවේ පවතී නම්, පළමු වස්තු දෙක ද එකිනෙක සමඟ තාප සමතුලිතතාවේ පවතී.</li>
                  <li><strong>රේඛීය ප්රසාරණතාව (Coefficient of Linear Expansion - α):</strong> ඒකක උෂ්ණත්ව නැඟීමක දී වස්තුවක දිගෙහි ඇති වන භාගික ප්රසාරණයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>කෙල්වින උෂ්ණත්වය: T = θ + 273.15 (T = කෙල්වින් උෂ්ණත්වය, θ = සෙල්සියස් උෂ්ණත්වය)</li>
                  <li>රේඛීය ප්රසාරණය: Δl = l₀ αΔθ</li>
                  <li>වර්ගඵල ප්රසාරණය: ΔA = A₀ βΔθ (β = 2α)</li>
                  <li>පරිමා ප්රසාරණය: ΔV = V₀ γΔθ (γ = 3α)</li>
                  <li>ද්රවයක දෘශ්ය ප්රසාරණය: γ_real = γ_app + γ_vessel (සත්ය ප්රසාරණතාව = දෘශ්ය ප්රසාරණතාව + බඳුනේ ප්රසාරණතාව)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>නියත පරිමා වායු උෂ්ණත්වමානය (Constant volume gas thermometer) ඉතා නිවැරදි, සම්මත උෂ්ණත්වමානයක් ලෙස සැලකේ.</li>
                  <li>ජලයේ අසාමාන්ය ප්රසාරණය (Anomalous expansion of water) සිදුවන්නේ 0°C සිට 4°C දක්වා පරාසයේ ය. 4°C දී ජලයේ පරිමාව අවම වන අතර ඝනත්වය උපරිම වේ.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ද්රවයක ප්රසාරණය (Expansion of liquids) ගණනය කිරීමේදී, ද්රවය පවතින බඳුනේ ප්රසාරණය (Expansion of the vessel) ද අනිවාර්යයෙන් සැලකිය යුතු ය.</p>
              </div>
            </div>
          </Accordion>

          {/* 02. වායු නියම සහ චාලක අණුකවාදය */}
          <Accordion title="02. වායු නියම සහ චාලක අණුකවාදය (Gas Laws and Kinetic Theory)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>බොයිල් නියමය (Boyle&apos;s Law):</strong> නියත උෂ්ණත්වයේ දී නියත වායු ස්කන්ධයක පීඩනය එහි පරිමාවට ප්රතිලෝමව සමානුපාතික වේ (p ∝ 1/V).</li>
                  <li><strong>චාල්ස් නියමය (Charles&apos;s Law):</strong> නියත පීඩනයේ දී නියත වායු ස්කන්ධයක පරිමාව එහි නිරපේක්ෂ උෂ්ණත්වයට අනුලෝමව සමානුපාතික වේ (V ∝ T).</li>
                  <li><strong>වර්ග මධ්යන්ය මූල වේගය (Root Mean Square Speed - c_rms):</strong> වායු අණු වල වේගවල වර්ගයන්ගේ මධ්යන්යයේ වර්ගමූලයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>පරිපූර්ණ වායු සමීකරණය: pV = nRT</li>
                  <li>චාලක වායු සමීකරණය: pV = 1/3 * Nm * c_rms²</li>
                  <li>අණුවක මධ්යන්ය චාලක ශක්තිය: E_k = 3/2 * kT</li>
                  <li>c_rms සමීකරණය: c_rms = √(3RT / M) = √(3p / ρ)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>පරිපූර්ණ වායුවක (Ideal gas) අණු අතර අන්තර් අණුක ආකර්ෂණ බල නොමැති තරම් කුඩා ය.</li>
                  <li>ඩෝල්ටන්ගේ ආංශික පීඩන නියමය (Dalton&apos;s Law of Partial Pressures): වායු මිශ්රණයක මුළු පීඩනය එක් එක් වායුව මගින් ඇති කරන ආංශික පීඩන වල ඓක්යයට සමාන වේ (p = p_A + p_B + p_C).</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">pV=nRT වැනි වායු සමීකරණ යෙදීමේ දී උෂ්ණත්වය (T) අනිවාර්යයෙන්ම කෙල්වින් (Kelvin) වලින් ආදේශ කළ යුතු ම ය. සෙල්සියස් වලින් ආදේශ කිරීමෙන් මුළු ගැටළුවම වැරදේ.</p>
              </div>
            </div>
          </Accordion>

          {/* 03. තාපමිතිය සහ අවස්ථා විපර්යාස */}
          <Accordion title="03. තාපමිතිය සහ අවස්ථා විපර්යාස (Calorimetry and Change of State)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>තාප ධාරිතාව (Heat Capacity - C):</strong> වස්තුවක උෂ්ණත්වය 1 K කින් ඉහළ නැංවීමට අවශ්ය තාප ප්රමාණයයි.</li>
                  <li><strong>විශිෂ්ට තාප ධාරිතාව (Specific Heat Capacity - c):</strong> ද්රව්යයක 1 kg ස්කන්ධයක උෂ්ණත්වය 1 K කින් ඉහළ නැංවීමට අවශ්ය තාප ප්රමාණයයි.</li>
                  <li><strong>විශිෂ්ට ගුප්ත තාපය (Specific Latent Heat - l):</strong> නියත උෂ්ණත්වයක දී ද්රව්යයක 1 kg ස්කන්ධයක් එක් අවස්ථාවක සිට තවත් අවස්ථාවකට පත් කිරීමට ලබා දිය යුතු/පිට කළ යුතු තාපයයි.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>උෂ්ණත්ව විචලනයක දී තාපය: Q = mcΔθ</li>
                  <li>අවස්ථා විපර්යාසයක දී තාපය: Q = ml</li>
                  <li>නිව්ටන්ගේ සිසිලන නියමය: dQ/dt = kA(θ - θ_R) (සිසිලන සීඝ්රතාව පරිසරය සමඟ ඇති උෂ්ණත්ව අන්තරයට සමානුපාතික වේ)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>අවස්ථා විපර්යාසයක් (Change of state) සිදුවන විට, තාපය ලබා දුන්න ද පද්ධතියේ උෂ්ණත්වය නියතව පවතී.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">මිශ්රණ මූලධර්මය (Principle of Mixtures - තාප හානිය = තාප ලාභය) යෙදිය හැක්කේ පද්ධතියෙන් පිටතට හෝ පරිසරයෙන් පද්ධතියට තාප සංක්රමණයක් සිදු නොවන (Adiabatic) අවස්ථාවල දී පමණි.</p>
              </div>
            </div>
          </Accordion>

          {/* 04. වාෂ්ප, ආර්ද්රතාව සහ තාපගති විද්යාව */}
          <Accordion title="04. වාෂ්ප, ආර්ද්රතාව සහ තාපගති විද්යාව (Vapours, Humidity & Thermodynamics)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>සන්තෘප්ත වාෂ්පය (Saturated Vapour):</strong> යම් අවකාශයක පැවතිය හැකි උපරිම වාෂ්ප ප්රමාණය අඩංගු වන අවස්ථාවයි.</li>
                  <li><strong>තුෂාර අංකය (Dew Point):</strong> ලබා දී ඇති වාෂ්ප ප්රමාණයකින් පමණක් අදාළ පරිමාව සන්තෘප්ත වන උෂ්ණත්වයයි.</li>
                  <li><strong>සාපේක්ෂ ආර්ද්රතාව (Relative Humidity - RH):</strong> RH = ( දැනට පවතින වාෂ්ප ස්කන්ධය / එම උෂ්ණත්වයේදීම සන්තෘප්ත කිරීමට අවශ්ය වාෂ්ප ස්කන්ධය ) × 100%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                  <li>සාපේක්ෂ ආර්ද්රතාව (පීඩන ඇසුරෙන්): RH = ( පවතින වාෂ්පයේ ආංශික පීඩනය (p) / එම උෂ්ණත්වයේ සන්තෘප්ත වාෂ්ප පීඩනය (P₀) ) × 100%</li>
                  <li>තාපගති විද්යාවේ පළමුවැනි නියමය: ΔQ = ΔU + ΔW</li>
                  <li>පද්ධතියක් කළ කාර්යය (නියත පීඩනයේදී): ΔW = pΔV</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>සන්තෘප්ත වාෂ්ප, වායු නියම (pV = nRT) අනුගමනය නොකරයි.</li>
                  <li>නියත උෂ්ණත්වයේ දී සන්තෘප්ත වාෂ්ප පීඩනය පරිමාව මත රඳා නොපවතී (තිරස් ප්රස්ථාරයකි).</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">ΔQ = ΔU + ΔW සමීකරණය යෙදීමේ දී ලකුණු සම්මුතිය (Sign Convention) අනිවාර්ය වේ. පද්ධතියට තාපය දෙන විට ΔQ(+), පද්ධතිය මගින් කාර්යය කරන විට ΔW(+), පද්ධතියේ උෂ්ණත්වය වැඩි වන විට ΔU(+) ලෙස ගත යුතු ය.</p>
              </div>
            </div>
          </Accordion>

          {/* 05. තාප සංක්රමණය */}
          <Accordion title="05. තාප සංක්රමණය (Transmission of Heat)">
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900">ප්රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>සන්නයනය (Conduction):</strong> අංශුවෙන් අංශුවට තාපය මාරු වීම (මාධ්යය අවශ්යයි).</li>
                  <li><strong>සංවහනය (Convection):</strong> තරලයක අංශු චලනය වීමෙන් තාපය රැගෙන යාම (මාධ්යය අවශ්යයි).</li>
                  <li><strong>විකිරණය (Radiation):</strong> විද්යුත් චුම්භක තරංග ලෙස තාපය ගමන් කිරීම (මාධ්යයක් අවශ්ය නැත).</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">සූත්ර සහ සමීකරණ (Equations):</h4>
                <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                  තාප සන්නයන සීඝ්රතාව: ΔQ / Δt = kA(θ₁ - θ₂) / l (k = තාප සන්නායකතාව, A = හරස්කඩ වර්ගඵලය, l = දණ්ඩේ දිග)
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ලෝහ දණ්ඩක් දිගේ තාපය සන්නයනය වීමේදී, දණ්ඩ පරිවාරක කර ඇත්නම් තාප සන්නයන සීඝ්රතාව දණ්ඩේ සෑම ලක්ෂ්යයකදීම නියත වේ.</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                <p className="text-sm mt-1 text-amber-900">තාප සන්නයන සමීකරණය යෙදිය හැක්කේ පද්ධතිය අනවර්ත අවස්ථාවට (Steady State) පැමිණි පසු පමණි. එනම් දණ්ඩේ එක් එක් ලක්ෂ්යයේ උෂ්ණත්වය කාලය සමඟ වෙනස් නොවන අවස්ථාවේදී ය.</p>
              </div>
            </div>
          </Accordion>

          {/* Physical Constants Table */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>📊</span> ඒකක 4: සම්මත භෞතික නියත සහ අගයන් (Standard Physical Constants)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-100">
                    <th className="p-3 font-semibold text-blue-900">භෞතික රාශිය (Physical Quantity)</th>
                    <th className="p-3 font-semibold text-blue-900">සම්මත අගය (Standard Value)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">ජලයේ ත්‍රිත්ව ලක්ෂ්‍යය (Triple Point of Water)</td>
                    <td className="p-3 font-mono">273.16 K</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">සෙල්සියස් සහ කෙල්වින් අන්තරය</td>
                    <td className="p-3">1°C = 1 K අන්තරයකට සමාන වේ</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">වායු නියතය (Universal Gas Constant - R)</td>
                    <td className="p-3 font-mono">8.31 J mol⁻¹ K⁻¹</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">ඇවගාඩ්රෝ අංකය (Avogadro Constant - N_A)</td>
                    <td className="p-3 font-mono">6.02 × 10²³ mol⁻¹</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">සම්මත පීඩනය (Standard Pressure - 1 atm)</td>
                    <td className="p-3 font-mono">760 mm Hg (1.01 × 10⁵ Pa)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">බොල්ට්ස්මාන් නියතය (Boltzmann Constant - k)</td>
                    <td className="p-3 font-mono">1.38 × 10⁻²³ J K⁻¹</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Simulator A: Dew Point Mini-Game */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-8">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">❄️ තුෂාර අංකය සෙවීමේ අතථ්‍ය පරීක්ෂණය</h3>
            <p className="text-slate-400 text-xs mt-1">බඳුනට අයිස් කැට එකතු කරමින් පෘෂ්ඨය මීදුම් සහිත වන මොහොතේම උෂ්ණත්වය සටහන් කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block mb-1">වත්මන් උෂ්ණත්වය</span>
                <span className="text-3xl font-mono font-bold text-blue-600">{currentTemp}°C</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={addIceCube}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-2.5 rounded-lg text-xs transition cursor-pointer border-0"
                >
                  ❄️ අයිස් කැටයක් එකතු කරන්න (-2°C)
                </button>
                <button 
                  onClick={recordDewPoint}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold p-2.5 rounded-lg text-xs transition cursor-pointer border-0"
                >
                  🛑 තුෂාර උෂ්ණත්වය වාර්තා කරන්න
                </button>
              </div>
            </div>

            {/* Visual Box for Calorimeter Surface */}
            <div className="md:col-span-7 bg-slate-200 h-44 rounded-xl flex flex-col items-center justify-center relative border border-slate-300 transition-all">
              <div className={`w-32 h-32 rounded-lg border-4 ${isCloudy ? 'bg-slate-300/80 border-slate-400 shadow-inner' : 'bg-slate-100 border-slate-400 shadow-md'} flex items-center justify-center transition-all duration-500`}>
                <span className="text-slate-800 font-bold text-xs">
                  {isCloudy ? '🌫️ පෘෂ්ඨය මීදුම් සහිතයි (Cloudy)' : '✨ පෘෂ්ඨය දීප්තිමත් (Shiny)'}
                </span>
              </div>
            </div>
          </div>
          {dewFeedback.msg && (
            <div className={`m-6 p-3.5 rounded-lg text-xs font-medium border ${dewFeedback.status === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              {dewFeedback.msg}
            </div>
          )}
        </div>

        {/* Simulator B: Apparatus Builder Exam Game */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">🧪 කැලරිමිතිය ඇටවුම් පරීක්ෂණ පුවරුව</h3>
            <p className="text-slate-400 text-xs mt-1">විභාගයේදී ලකුණු ලැබෙන පරිදි නිවැරදි උපාංග තෝරා පරීක්ෂණය ක්‍රියාත්මක කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Option 1: Material */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">1. කැලරිමීටර බඳුනේ ද්‍රව්‍යය තෝරන්න:</label>
                <select 
                  value={calorimeterMaterial}
                  onChange={(e) => setCalorimeterMaterial(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                >
                  <option value="none">-- තෝරන්න --</option>
                  <option value="copper">තඹ බඳුන (Copper Calorimeter)</option>
                  <option value="glass">වීදුරු බීකරය (Glass Beaker)</option>
                </select>
              </div>

              {/* Option 2: Thermometer Placement */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">2. වාෂ්ප ජනකයේ උෂ්ණත්වමානය තබන ස්ථානය:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setThermometerInSteam(false)}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${!thermometerInSteam ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white text-slate-700'}`}
                  >
                    💧 උණු වතුර ඇතුළේ ගිල්වා
                  </button>
                  <button 
                    onClick={() => setThermometerInSteam(true)}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${thermometerInSteam ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white text-slate-700'}`}
                  >
                    💨 ඉහළ වාෂ්ප අවකාශයේ
                  </button>
                </div>
              </div>

              {/* Option 3: Steam Trap Toggle */}
              <div className="flex items-center justify-between pt-2">
                <label className="text-xs font-bold text-slate-700">3. වාෂ්ප උගුලක් (Steam Trap) සම්බන්ධ කිරීම:</label>
                <input 
                  type="checkbox" 
                  checked={hasSteamTrap}
                  onChange={(e) => setHasSteamTrap(e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  onClick={runApparatusTest}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold p-2 rounded-lg text-xs shadow-sm transition cursor-pointer border-0"
                >
                  🚀 පරීක්ෂණය ක්‍රියාත්මක කරන්න
                </button>
                <button 
                  onClick={resetAll}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold p-2 rounded-lg text-xs transition cursor-pointer border-0"
                >
                  <RefreshCw className="w-3 h-3 inline mr-1" /> Reset
                </button>
              </div>
            </div>

            {/* Results Feedback box */}
            <div className="flex flex-col justify-center">
              {setupFeedback.msg ? (
                <div className={`p-4 rounded-xl text-xs font-medium border ${setupFeedback.status === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  {setupFeedback.msg}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-dashed rounded-xl text-center text-xs text-slate-400">
                  උපාංග නිවැරදිව තෝරා "පරීක්ෂණය ක්‍රියාත්මක කරන්න" බටනය ක්ලික් කරන්න. විභාගයේදී ලකුණු ලැබෙන ක්‍රමවේදය මෙයින් උගත හැක.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
