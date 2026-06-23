'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, RefreshCw, CheckCircle, Plus, ArrowLeft } from 'lucide-react';

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

export default function ThermalPhysicsPage({ lang = 'si' }) {
  const isEnglish = lang === 'en';

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
      
      // Below or equal to 18C -> Surface gets cloudy (Condensation)
      if (nextTemp <= dewPointTrue) {
        setIsCloudy(true);
      }
    }
  };

  const recordDewPoint = () => {
    if (currentTemp === dewPointTrue) {
      setDewFeedback({
        status: 'correct',
        msg: isEnglish
          ? '🎉 Correct! Dew point = 18°C. At this temperature, the air is saturated with the water vapour present in it. (Actual vapour pressure = Saturated vapour pressure)'
          : `🎉 නිවැරදියි! තුෂාර අංකය = 18°C. මෙම උෂ්ණත්වයේදී වාතයේ ඇති ජල වාෂ්ප සන්තෘප්ත වීමට ප්‍රමාණවත් වේ. (සැබෑ වාෂ්ප පීඩනය = සන්තෘප්ත වාෂ්ප පීඩනය)`
      });
    } else if (currentTemp < dewPointTrue) {
      setDewFeedback({
        status: 'error',
        msg: isEnglish
          ? `❌ Exam Trap! You are too late! Water droplets (dew) have already formed on the surface. You must record the temperature at the exact instant the surface starts to get cloudy. (Your recorded temp: ${currentTemp}°C)`
          : `❌ Exam Trap! ඔබ ප්‍රමාද වැඩියි! පෘෂ්ඨය මත දැනටමත් ජල බින්දු (Dew) සෑදී අවසන්. මීදුම ගතිය මතු වූ මුල්ම ක්ෂණයෙන්ම උෂ්ණත්වය වාර්තා කළ යුතුය. (ඔබේ උෂ්ණත්වය: ${currentTemp}°C)`
      });
    } else {
      setDewFeedback({
        status: 'error',
        msg: isEnglish
          ? `❌ Incorrect! The surface is still shiny. Condensation has not started yet. (Current temp: ${currentTemp}°C)`
          : `❌ වැරදියි! පෘෂ්ඨය තවමත් දීප්තිමත්ව පවතී. ජල වාෂ්ප ඝනීභවනය වීම ආරම්භ වී නැත. (වත්මන් උෂ්ණත්වය: ${currentTemp}°C)`
      });
    }
  };

  // Apparatus Test Logic
  const runApparatusTest = () => {
    if (calorimeterMaterial === 'none') {
      setSetupFeedback({ 
        status: 'error', 
        msg: isEnglish 
          ? '❌ Please select a calorimeter material for the mixture first.' 
          : '❌ කරුණාකර මිශ්‍රණය දැමීම සඳහා කැලරිමීටර බඳුනක් තෝරාගන්න.' 
      });
      return;
    }
    if (calorimeterMaterial === 'glass') {
      setSetupFeedback({ 
        status: 'error', 
        msg: isEnglish
          ? '❌ Exam Trap! Glass beakers cannot be used. Glass has a high specific heat capacity, absorbing excessive heat and creating temperature gradients. Use a copper calorimeter.'
          : '❌ Exam Trap! වීදුරු බීකර භාවිත කළ නොහැක. වීදුරු සතු ඉහළ විශිෂ්ට තාප ධාරිතාව නිසා තාපය වැඩිපුර අවශෝෂණය කර ගන්නා අතර උෂ්ණත්ව අනුක්‍රමණ සාදයි. තඹ (Copper) බඳුනක් භාවිත කරන්න.' 
      });
      return;
    }
    if (!thermometerInSteam) {
      setSetupFeedback({ 
        status: 'error', 
        msg: isEnglish
          ? '❌ Exam Trap! The thermometer bulb in the steam generator must not be immersed in water. It must only be in the steam space above the water level!'
          : '❌ Exam Trap! වාෂ්ප ජනකයේ උෂ්ණත්වමාන බල්බය ජලයේ ගිලී නොතිබිය යුතුය. එය තිබිය යුත්තේ ජල මට්ටමට ඉහළින් වාෂ්ප අවකාශයේ පමණි!' 
      });
      return;
    }
    if (!hasSteamTrap) {
      setSetupFeedback({ 
        status: 'error', 
        msg: isEnglish
          ? '❌ Experiment Failed! Droplets already condensed along the steam tube entered the mixture. To measure latent heat (mL) accurately, a steam trap must be connected in the middle.'
          : '❌ පරීක්ෂණය අසාර්ථකයි! වාෂ්ප නළය දිගේ දැනටමත් ඝනීභවනය වූ ජල බින්දු මිශ්‍රණයට එකතු විය. ගුප්ත තාපය (mL) නිවැරදිව සෙවීමට නම් වාෂ්ප උගුලක් (Steam Trap) මැදට සම්බන්ධ කළ යුතුමයි.' 
      });
      return;
    }

    setSetupFeedback({
      status: 'correct',
      msg: isEnglish
        ? '🎉 Excellent! You set up the apparatus correctly satisfying all paper marking scheme conditions. You can now calculate experimental values accurately.'
        : '🎉 විශිෂ්ටයි! ඔබ සියලුම Paper Marking කොන්දේසි සපුරාලමින් නිවැරදි ඇටවුම සකස් කළේය. දැන් පරීක්ෂණාත්මක අගයන් නිවැරදිව ගණනය කළ හැක.'
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-md">
          <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> {isEnglish ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
          </Link>
          <div className="mt-2 text-left">
            <span className="bg-orange-400/30 border border-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 04</span>
            <h1 className="text-3xl font-bold mt-2">
              {isEnglish ? 'Thermal Physics (Unit 04) - Study Guide' : 'තාප භෞතික විද්‍යාව (Thermal Physics) - අධ්‍යයන පිටුව'}
            </h1>
            <p className="text-orange-100 text-sm mt-1">
              {isEnglish 
                ? 'Dew point, calorimetry change of state, and Newton\'s law of cooling exam trends.' 
                : 'තුෂාර අංකය, කැලරිමිතිය අවස්ථා විපර්යාස සහ නිව්ටන්ගේ සිසිලන නියමයේ විභාග රටා.'}
            </p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-605" /> 
              {isEnglish ? 'Syllabus Core Concepts' : 'සම්පත් පොත් මූලික සංකල්ප'}
            </h2>
            {isEnglish ? (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">Dew Point:</strong> The temperature to which a given volume of air must be cooled for it to become saturated with the water vapour it contains.</li>
                <li>• <strong className="text-slate-850">Principle of Mixtures:</strong> If there is no heat exchange with the environment, <span className="font-semibold text-slate-800">total heat lost = total heat gained</span> (Q = mcΔθ and Q = mL).</li>
              </ul>
            ) : (
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• <strong className="text-slate-800">තුෂාර අංකය (Dew Point):</strong> ලබා දී ඇති වාතය පරිමාවක් සන්තෘප්ත කිරීමට එහි ඇති ජල වාෂ්ප ප්‍රමාණයම ප්‍රමාණවත් වන උෂ්ණත්වයයි.</li>
                <li>• <strong className="text-slate-800">මිශ්‍රණ මූලධර්මය:</strong> බාහිර පරිසරය සමග තාප හුවමාරුවක් සිදු නොවේ නම්, <span className="font-semibold text-slate-850">පද්ධතිය පිට කළ මුළු තාපය = පද්ධතිය ලබාගත් මුළු තාපය</span> (Q = mcΔθ සහ Q = mL).</li>
              </ul>
            )}
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> 
              {isEnglish ? 'Marking Secrets & Traps' : 'Paper Marking රහස් (Exam Traps)'}
            </h2>
            {isEnglish ? (
              <div className="space-y-3 text-xs md:text-sm">
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="font-bold text-amber-850 block">⚠️ Minimizing Environmental Heat Loss:</span>
                  To minimize heat loss in calorimetry, the initial (θ₁) and final (θ₂) temperatures must be set symmetrically around room temperature (θ) such that θ₂ = 2θ - θ₁.
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="font-bold text-amber-850 block">⚠️ Function of the Steam Trap:</span>
                  To prevent water droplets already condensed in the tube from entering the calorimeter and altering calculations.
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>

        {/* Resources Book Summary Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-150 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📘</span> {isEnglish ? 'Resource Book Summary: Thermal Physics' : 'සම්පත් පොත් සාරාංශය: තාප භෞතික විද්‍යාව'}
          </h2>

          {/* 01. Temperature and Thermal Expansion */}
          <Accordion title={isEnglish ? "01. Temperature and Thermal Expansion" : "01. උෂ්ණත්වය සහ තාප ප්‍රසාරණය (Temperature and Thermal Expansion)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Thermal Equilibrium:</strong> State in which there is no net flow of thermal energy between two objects in thermal contact.</li>
                      <li>• <strong>Zeroth Law of Thermodynamics:</strong> If two thermodynamic systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.</li>
                      <li>• <strong>Coefficient of Linear Expansion (α):</strong> The fractional increase in length per unit rise in temperature.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Kelvin Temperature: T = θ + 273.15 <span className="text-slate-500 text-xs">(T: Kelvin, θ: Celsius)</span></li>
                      <li>• Linear Expansion: Δl = l₀ αΔθ</li>
                      <li>• Area Expansion: ΔA = A₀ βΔθ <span className="text-slate-500 text-xs">(β = 2α)</span></li>
                      <li>• Volume Expansion: ΔV = V₀ γΔθ <span className="text-slate-500 text-xs">(γ = 3α)</span></li>
                      <li>• Real liquid expansion: γ_real = γ_app + γ_vessel <span className="text-slate-500 text-xs">(Real expansion = Apparent expansion + Vessel expansion)</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• The constant volume gas thermometer is considered the standard reference thermometer.</li>
                      <li>• Anomalous expansion of water occurs between 0°C and 4°C. At 4°C, water has minimum volume and maximum density.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">When calculating liquid expansion, the expansion of the containment vessel must always be taken into account.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>තාප සමතුලිතතාව (Thermal Equilibrium):</strong> වස්තු දෙකක් අතර ශුද්ධ තාප ගලා යාමක් සිදු නොවන තත්ත්වයයි.</li>
                      <li><strong>තාපගති විද්යාවේ ශුන්යාදි නියමය (Zeroth Law of Thermodynamics):</strong> වස්තු දෙකක් තෙවන වස්තුවක් සමඟ වෙන වෙනම...</li>
                      <li><strong>රේඛීය ප්‍රසාරණතාව (α):</strong> ඒකක උෂ්ණත්ව නැඟීමක දී වස්තුවක දිගෙහි ඇති වන භාගික ප්‍රසාරණයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>කෙල්වින උෂ්ණත්වය: T = θ + 273.15</li>
                      <li>රේඛීය ප්‍රසාරණය: Δl = l₀ αΔθ</li>
                      <li>වර්ගඵල ප්‍රසාරණය: ΔA = A₀ βΔθ (β = 2α)</li>
                      <li>පරිමා ප්‍රසාරණය: ΔV = V₀ γΔθ (γ = 3α)</li>
                      <li>ද්‍රවයක දෘශ්ය ප්‍රසාරණය: γ_real = γ_app + γ_vessel</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>නියත පරිමා වායු උෂ්ණත්වමානය ඉතා නිවැරදි, සම්මත උෂ්ණත්වමානයක් ලෙස සැලකේ.</li>
                      <li>ජලයේ අසාමාන්ය ප්‍රසාරණය සිදුවන්නේ 0°C සිට 4°C දක්වා පරාසයේ ය. 4°C දී ජලයේ පරිමාව අවම වන අතර ඝනත්වය උපරිම වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ද්‍රවයක ප්‍රසාරණය ගණනය කිරීමේදී, ද්‍රවය පවතින බඳුනේ ප්‍රසාරණය ද අනිවාර්යයෙන් සැලකිය යුතු ය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 02. Gas Laws and Kinetic Theory */}
          <Accordion title={isEnglish ? "02. Gas Laws and Kinetic Theory" : "02. වායු නියම සහ චාලක අණුකවාදය (Gas Laws and Kinetic Theory)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Boyle&apos;s Law:</strong> The volume of a fixed mass of gas is inversely proportional to its pressure at a constant temperature (p ∝ 1/V).</li>
                      <li>• <strong>Charles&apos;s Law:</strong> The volume of a fixed mass of gas is directly proportional to its absolute temperature at a constant pressure (V ∝ T).</li>
                      <li>• <strong>Root Mean Square Speed (c_rms):</strong> The square root of the mean of the squares of the speeds of gas molecules.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Ideal Gas Equation: pV = nRT</li>
                      <li>• Kinetic Theory Equation: pV = 1/3 * Nm * c_rms²</li>
                      <li>• Average Kinetic Energy of a molecule: E_k = 3/2 * kT</li>
                      <li>• c_rms Formula: c_rms = √(3RT / M) = √(3p / ρ)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• An ideal gas has zero intermolecular attractive forces.</li>
                      <li>• Dalton&apos;s Law of Partial Pressures: The total pressure of a mixture of non-reacting gases is equal to the sum of the partial pressures of individual gases (p = p_A + p_B + p_C).</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">When applying pV = nRT, temperature (T) must always be substituted in Kelvin. Substituting in Celsius is a critical error.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>බොයිල් නියමය:</strong> නියත උෂ්ණත්වයේ දී නියත වායු ස්කන්ධයක පීඩනය එහි පරිමාවට ප්‍රතිලෝමව සමානුපාතික වේ (p ∝ 1/V).</li>
                      <li><strong>චාල්ස් නියමය:</strong> නියත පීඩනයේ දී නියත වායු ස්කන්ධයක පරිමාව එහි නිරපේක්ෂ උෂ්ණත්වයට අනුලෝමව සමානුපාතික වේ (V ∝ T).</li>
                      <li><strong>වර්ග මධ්යන්ය මූල වේගය (c_rms):</strong> වායු අණු වල වේගවල වර්ගයන්ගේ මධ්යන්යයේ වර්ගමූලයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>pV = nRT</li>
                      <li>pV = 1/3 * Nm * c_rms²</li>
                      <li>E_k = 3/2 * kT</li>
                      <li>c_rms = √(3RT / M) = √(3p / ρ)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>පරිපූර්ණ වායුවක අණු අතර අන්තර් අණුක ආකර්ෂණ බල නොමැති තරම් කුඩා ය.</li>
                      <li>ඩෝල්ටන්ගේ ආංශික පීඩන නියමය: p = p_A + p_B + p_C</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">pV=nRT වැනි වායු සමීකරණ යෙදීමේ දී උෂ්ණත්වය (T) අනිවාර්යයෙන්ම කෙල්වින් (Kelvin) වලින් ආදේශ කළ යුතු ම ය. සෙල්සියස් වලින් ආදේශ කිරීමෙන් මුළු ගැටළුවම වැරදේ.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 03. Calorimetry and Change of State */}
          <Accordion title={isEnglish ? "03. Calorimetry and Change of State" : "03. තාපමිතිය සහ අවස්ථා විපර්යාස (Calorimetry and Change of State)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Heat Capacity (C):</strong> The quantity of heat required to raise the temperature of the object by 1 K.</li>
                      <li>• <strong>Specific Heat Capacity (c):</strong> The quantity of heat required to raise the temperature of 1 kg of a substance by 1 K.</li>
                      <li>• <strong>Specific Latent Heat (l):</strong> The quantity of heat required to change the state of 1 kg of a substance without any change of temperature.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Heat for temperature change: Q = mcΔθ</li>
                      <li>• Heat for phase change: Q = ml</li>
                      <li>• Newton&apos;s Law of Cooling: dQ/dt = kA(θ - θ_R) <span className="text-slate-500 text-xs">(Rate of heat loss is proportional to temperature difference with the surroundings)</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• During a change of state, temperature remains constant despite heat exchange.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">The Principle of Mixtures (heat lost = heat gained) is valid only for adiabatic systems where no heat escapes to or enters from the surroundings.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>තාප ධාරිතාව (C):</strong> වස්තුවක උෂ්ණත්වය 1 K කින් ඉහළ නැංවීමට අවශ්ය තාප ප්‍රමාණයයි.</li>
                      <li><strong>විශිෂ්ට තාප ධාරිතාව (c):</strong> ද්‍රව්යයක 1 kg ස්කන්ධයක උෂ්ණත්වය 1 K කින් ඉහළ නැංවීමට අවශ්ය තාප ප්‍රමාණයයි.</li>
                      <li><strong>විශිෂ්ට ගුප්ත තාපය (l):</strong> නියත උෂ්ණත්වයක දී ද්‍රව්යයක 1 kg ස්කන්ධයක් එක් අවස්ථාවක සිට තවත් අවස්ථාවකට පත් කිරීමට ලබා දිය යුතු/පිට කළ යුතු තාපයයි.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>Q = mcΔθ</li>
                      <li>Q = ml</li>
                      <li>dQ/dt = kA(θ - θ_R)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>අවස්ථා විපර්යාසයක් සිදුවන විට, තාපය ලබා දුන්න ද පද්ධතියේ උෂ්ණත්වය නියතව පවතී.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">මිශ්‍රණ මූලධර්මය යෙදිය හැක්කේ පද්ධතියෙන් පිටතට හෝ පරිසරයෙන් පද්ධතියට තාප සංක්‍රමණයක් සිදු නොවන අවස්ථාවල දී පමණි.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 04. Vapours, Humidity and Thermodynamics */}
          <Accordion title={isEnglish ? "04. Vapours, Humidity and Thermodynamics" : "04. වාෂ්ප, ආර්ද්‍රතාව සහ තාපගති විද්යාව (Vapours, Humidity & Thermodynamics)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Saturated Vapour:</strong> A vapour that is in equilibrium with its liquid phase (holds maximum possible vapour).</li>
                      <li>• <strong>Dew Point:</strong> The temperature at which the water vapour present in the air is just sufficient to saturate it.</li>
                      <li>• <strong>Relative Humidity (RH):</strong> RH = ( mass of water vapour in a given volume / mass of water vapour required to saturate the same volume at the same temperature ) × 100%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <ul className="list-none pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>• Relative Humidity (Pressure based): RH = ( partial pressure of water vapour (p) / saturated water vapour pressure (P₀) ) × 100%</li>
                      <li>• First Law of Thermodynamics: ΔQ = ΔU + ΔW</li>
                      <li>• Work done by system (at constant pressure): ΔW = pΔV</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• Saturated vapours do not obey gas laws (pV = nRT).</li>
                      <li>• At constant temperature, saturated vapour pressure does not depend on volume.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">Sign convention is critical in ΔQ = ΔU + ΔW. Heat given to system ΔQ(+), work done by system ΔW(+), temperature increase ΔU(+).</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>සන්තෘප්ත වාෂ්පය (Saturated Vapour):</strong> යම් අවකාශයක පැවතිය හැකි උපරිම වාෂ්ප ප්‍රමාණය අඩංගු වන අවස්ථාවයි.</li>
                      <li><strong>තුෂාර අංකය (Dew Point):</strong> ලබා දී ඇති වාෂ්ප ප්‍රමාණයකින් පමණක් අදාළ පරිමාව සන්තෘප්ත වන උෂ්ණත්වයයි.</li>
                      <li><strong>සාපේක්ෂ ආර්ද්‍රතාව (RH):</strong> RH = ( පවතින වාෂ්ප ස්කන්ධය / අවශ්‍ය වාෂ්ප ස්කන්ධය ) × 100%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <ul className="list-disc pl-5 font-mono text-sm space-y-1 bg-slate-50 p-3 rounded border text-slate-800">
                      <li>RH = ( p / P₀ ) × 100%</li>
                      <li>ΔQ = ΔU + ΔW</li>
                      <li>ΔW = pΔV</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>සන්තෘප්ත වාෂ්ප, වායු නියම (pV = nRT) අනුගමනය නොකරයි.</li>
                      <li>නියත උෂ්ණත්වයේ දී සන්තෘප්ත වාෂ්ප පීඩනය පරිමාව මත රඳා නොපවතී.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">ΔQ = ΔU + ΔW සමීකරණය යෙදීමේ දී ලකුණු සම්මුතිය අනිවාර්ය වේ. පද්ධතියට තාපය දෙන විට ΔQ(+), පද්ධතිය මගින් කාර්යය කරන විට ΔW(+), පද්ධතියේ උෂ්ණත්වය වැඩි වන විට ΔU(+) ලෙස ගත යුතු ය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* 05. Transmission of Heat */}
          <Accordion title={isEnglish ? "05. Transmission of Heat" : "05. තාප සංක්‍රමණය (Transmission of Heat)"}>
            <div className="space-y-4 text-slate-700">
              {isEnglish ? (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">Core Definitions:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• <strong>Conduction:</strong> Transfer of heat through atomic/molecular collisions (requires medium).</li>
                      <li>• <strong>Convection:</strong> Transfer of heat by actual movement of fluid particles (requires medium).</li>
                      <li>• <strong>Radiation:</strong> Transfer of heat via electromagnetic waves (requires no medium).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Equations:</h4>
                    <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                      Rate of heat conduction: dQ / dt = kA(θ₁ - θ₂) / l <span className="text-slate-500 text-xs">(k: thermal conductivity, A: cross-sectional area, l: length)</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Key Points:</h4>
                    <ul className="list-none pl-5 space-y-1">
                      <li>• In a fully lagged bar, the rate of heat flow is constant at all points along the bar.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2"><span>⚠️</span> Exam Trap Notes:</h4>
                    <p className="text-sm mt-1 text-amber-900">The heat conduction equation can only be applied after the system has reached steady state, when temperature at any point does not change with time.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-bold text-slate-900">ප්‍රධාන අර්ථ දැක්වීම් (Definitions):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>සන්නයනය:</strong> අංශුවෙන් අංශුවට තාපය මාරු වීම (මාධ්යය අවශ්යයි).</li>
                      <li><strong>සංවහනය:</strong> තරලයක අංශු චලනය වීමෙන් තාපය රැගෙන යාම (මාධ්යය අවශ්යයි).</li>
                      <li><strong>විකිරණය:</strong> විද්යුත් චුම්භක තරංග ලෙස තාපය ගමන් කිරීම (මාධ්යයක් අවශ්ය නැත).</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">සූත්‍ර සහ සමීකරණ (Equations):</h4>
                    <p className="bg-slate-50 p-2.5 rounded font-mono text-sm border text-slate-800">
                      dQ / dt = kA(θ₁ - θ₂) / l
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">වැදගත් කරුණු (Key Points):</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>ලෝහ දණ්ඩක් දිගේ තාපය සන්නයනය වීමේදී, දණ්ඩ පරිවාරක කර ඇත්නම් තාප සන්නයන සීඝ්‍රතාව දණ්ඩේ සෑම ලක්ෂ්යයකදීම නියත වේ.</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h4 className="font-bold text-amber-850 flex items-center gap-2"><span>⚠️</span> විශේෂ සටහන් (Exam Notes/Traps):</h4>
                    <p className="text-sm mt-1 text-amber-900">තාප සන්නයන සමීකරණය යෙදිය හැක්කේ පද්ධතිය අනවර්ත අවස්ථාවට පැමිණි පසු පමණි. එනම් දණ්ඩේ එක් එක් ලක්ෂ්යයේ උෂ්ණත්වය කාලය සමඟ වෙනස් නොවන අවස්ථාවේදී ය.</p>
                  </div>
                </>
              )}
            </div>
          </Accordion>

          {/* Physical Constants Table */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-left">
              <span>📊</span> {isEnglish ? 'Unit 4: Standard Physical Constants' : 'ඒකක 4: සම්මත භෞතික නියත සහ අගයන් (Standard Physical Constants)'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-100">
                    <th className="p-3 font-semibold text-blue-900">{isEnglish ? 'Physical Quantity' : 'භෞතික රාශිය (Physical Quantity)'}</th>
                    <th className="p-3 font-semibold text-blue-900">{isEnglish ? 'Standard Value' : 'සම්මත අගය (Standard Value)'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">{isEnglish ? 'Triple Point of Water' : 'ජලයේ ත්‍රිත්ව ලක්ෂ්‍යය (Triple Point of Water)'}</td>
                    <td className="p-3 font-mono">273.16 K</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">{isEnglish ? 'Celsius and Kelvin Interval' : 'සෙල්සියස් සහ කෙල්වින් අන්තරය'}</td>
                    <td className="p-3">{isEnglish ? '1°C interval is equal to 1 K interval' : '1°C = 1 K අන්තරයකට සමාන වේ'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">{isEnglish ? 'Universal Gas Constant (R)' : 'වායු නියතය (Universal Gas Constant - R)'}</td>
                    <td className="p-3 font-mono">8.31 J mol⁻¹ K⁻¹</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">{isEnglish ? 'Avogadro Constant (N_A)' : 'ඇවගාඩ්‍රෝ අංකය (Avogadro Constant - N_A)'}</td>
                    <td className="p-3 font-mono">6.02 × 10²³ mol⁻¹</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">{isEnglish ? 'Standard Atmospheric Pressure (1 atm)' : 'සම්මත පීඩනය (Standard Pressure - 1 atm)'}</td>
                    <td className="p-3 font-mono">760 mm Hg (1.01 × 10⁵ Pa)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">{isEnglish ? 'Boltzmann Constant (k)' : 'බොල්ට්ස්මාන් නියතය (Boltzmann Constant - k)'}</td>
                    <td className="p-3 font-mono">1.38 × 10⁻²³ J K⁻¹</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Simulator A: Dew Point Mini-Game */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-8 text-left">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              {isEnglish ? '❄️ Dew Point Measurement Virtual Lab' : '❄️ තුෂාර අංකය සෙවීමේ අතථ්‍ය පරීක්ෂණය'}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {isEnglish 
                ? 'Add ice cubes to cool the vessel and record the temperature at the exact instant condensation appears.' 
                : 'බඳුනට අයිස් කැට එකතු කරමින් පෘෂ්ඨය මීදුම් සහිත වන මොහොතේම උෂ්ණත්වය සටහන් කරන්න.'}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block mb-1">{isEnglish ? 'Current Temperature' : 'වත්මන් උෂ්ණත්වය'}</span>
                <span className="text-3xl font-mono font-bold text-blue-600">{currentTemp}°C</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={addIceCube}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-2.5 rounded-lg text-xs transition cursor-pointer border-0"
                >
                  {isEnglish ? '❄️ Add Ice Cube (-2°C)' : '❄️ අයිස් කැටයක් එකතු කරන්න (-2°C)'}
                </button>
                <button 
                  onClick={recordDewPoint}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold p-2.5 rounded-lg text-xs transition cursor-pointer border-0"
                >
                  {isEnglish ? '🛑 Record Dew Point Temperature' : '🛑 තුෂාර උෂ්ණත්වය වාර්තා කරන්න'}
                </button>
              </div>
            </div>

            {/* Visual Box for Calorimeter Surface */}
            <div className="md:col-span-7 bg-slate-200 h-44 rounded-xl flex flex-col items-center justify-center relative border border-slate-300 transition-all">
              <div className={`w-32 h-32 rounded-lg border-4 ${isCloudy ? 'bg-slate-300/80 border-slate-400 shadow-inner' : 'bg-slate-100 border-slate-400 shadow-md'} flex items-center justify-center transition-all duration-500`}>
                <span className="text-slate-800 font-bold text-xs">
                  {isCloudy 
                    ? (isEnglish ? '🌫️ Surface is cloudy' : '🌫️ පෘෂ්ඨය මීදුම් සහිතයි (Cloudy)') 
                    : (isEnglish ? '✨ Surface is shiny' : '✨ පෘෂ්ඨය දීප්තිමත් (Shiny)')}
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden text-left">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              {isEnglish ? '🧪 Calorimetry Apparatus Builder Game' : '🧪 කැලරිමිතිය ඇටවුම් පරීක්ෂණ පුවරුව'}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {isEnglish 
                ? 'Select correct setup elements to satisfy paper marking conditions and execute the test.' 
                : 'විභාගයේදී ලකුණු ලැබෙන පරිදි නිවැරදි උපාංග තෝරා පරීක්ෂණය ක්‍රියාත්මක කරන්න.'}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Option 1: Material */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {isEnglish ? '1. Select Calorimeter Material:' : '1. කැලරිමීටර බඳුනේ ද්‍රව්‍යය තෝරන්න:'}
                </label>
                <select 
                  value={calorimeterMaterial}
                  onChange={(e) => setCalorimeterMaterial(e.target.value)}
                  className="w-full p-2 bg-white border rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                >
                  <option value="none">{isEnglish ? '-- Select --' : '-- තෝරන්න --'}</option>
                  <option value="copper">{isEnglish ? 'Copper Calorimeter' : 'තඹ බඳුන (Copper Calorimeter)'}</option>
                  <option value="glass">{isEnglish ? 'Glass Beaker' : 'වීදුරු බීකරය (Glass Beaker)'}</option>
                </select>
              </div>

              {/* Option 2: Thermometer Placement */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {isEnglish ? '2. Placement of Steam Generator Thermometer Bulb:' : '2. වාෂ්ප ජනකයේ උෂ්ණත්වමානය තබන ස්ථානය:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setThermometerInSteam(false)}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${!thermometerInSteam ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white text-slate-700'}`}
                  >
                    {isEnglish ? '💧 Immersed in boiling water' : '💧 උණු වතුර ඇතුළේ ගිල්වා'}
                  </button>
                  <button 
                    onClick={() => setThermometerInSteam(true)}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${thermometerInSteam ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white text-slate-700'}`}
                  >
                    {isEnglish ? '💨 In the steam space above' : '💨 ඉහළ වාෂ්ප අවකාශයේ'}
                  </button>
                </div>
              </div>

              {/* Option 3: Steam Trap Toggle */}
              <div className="flex items-center justify-between pt-2">
                <label className="text-xs font-bold text-slate-700">
                  {isEnglish ? '3. Connect a Steam Trap in line:' : '3. වාෂ්ප උගුලක් (Steam Trap) සම්බන්ධ කිරීම:'}
                </label>
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
                  {isEnglish ? '🚀 Execute Test' : '🚀 පරීක්ෂණය ක්‍රියාත්මක කරන්න'}
                </button>
                <button 
                  onClick={resetAll}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold p-2 rounded-lg text-xs transition cursor-pointer border-0"
                >
                  <RefreshCw className="w-3 h-3 inline mr-1" /> {isEnglish ? 'Reset' : 'Reset'}
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
                  {isEnglish 
                    ? 'Select apparatus options correctly and click "Execute Test". You can learn the exam marks scheme criteria from this.' 
                    : 'උපාංග නිවැරදිව තෝරා "පරීක්ෂණය ක්‍රියාත්මක කරන්න" බටනය ක්‍ලික් කරන්න. විභාගයේදී ලකුණු ලැබෙන ක්‍රමවේදය මෙයින් උගත හැක.'}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
