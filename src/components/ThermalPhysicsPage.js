'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, RefreshCw, CheckCircle, Plus, ArrowLeft } from 'lucide-react';

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
