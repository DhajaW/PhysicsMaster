"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Target, Calculator, Brain, Heart } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';

// NotebookLM Blueprint එක මත පදනම් වූ පාඩම් දත්ත
const physicsUnits = [
  { id: '01', name: 'මිනුම (Measurement)', icon: '📐', topics: 'භෞතික රාශි, මාන, මිනුම් උපකරණ, දෛශික', color: 'from-blue-500 to-indigo-600' },
  { id: '02', name: 'යාන්ත්ර විද්යාව (Mechanics)', icon: '⚙️', topics: 'බලය හා චලිතය, කාර්යය-ශක්තිය, භ්රමණ චලිතය', color: 'from-red-500 to-orange-600' },
  { id: '03', name: 'දෝලන හා තරංග (Waves)', icon: '🌊', topics: 'සරල අනුවර්තීය චලිතය, ධ්වනි විද්යාව, ප්රකාශ විද්යාව', color: 'from-teal-500 to-emerald-600' },
  { id: '04', name: 'තාප භෞතික විද්යාව (Thermal)', icon: '🔥', topics: 'තාපමිතිය, තාප ප්රසාරණය, තාප සංක්රමණය', color: 'from-orange-500 to-amber-600' },
  { id: '05', name: 'ගුරුත්වාකර්ෂණ ක්ෂේත්ර', icon: '🌍', topics: 'නිව්ටන්ගේ ගුරුත්වාකර්ෂණ නියමය, චන්ද්රිකා කක්ෂ', color: 'from-purple-500 to-indigo-600' },
  { id: '06', name: 'ස්ථිති විද්යුත් ක්ෂේත්ර', icon: '⚡', topics: 'විද්යුත් බල රේඛා, විද්යුත් විභවය, ධාරිත්රක', color: 'from-blue-600 to-cyan-500' },
  { id: '07', name: '💡 ධාරා විද්යුත් (Current)', icon: '🔌', topics: 'ඕම්ගේ නියමය, කර්චොෆ් නියම, පරිපථ සටහන්', color: 'from-yellow-500 to-orange-600' },
  { id: '08', name: 'විද්යුත් චුම්භකත්වය', icon: '🧲', topics: 'චුම්භක ක්ෂේත්ර, විද්යුත් චුම්භක ප්රේරණය', color: 'from-violet-600 to-purple-500' },
  { id: '09', name: 'ඉලෙක්ට්රොනික විද්යාව', icon: '🎛️', topics: 'අර්ධ සන්නායක, ට්රාන්සිස්ටර, තාර්කික ද්වාර', color: 'from-pink-500 to-rose-600' },
  { id: '10', name: 'පදාර්ථයේ යාන්ත්රික ගුණ', icon: '🧪', topics: 'ප්රත්යාස්ථතාව, දුස්ස්රාවිතාව, පෘෂ්ඨික ආතතිය', color: 'from-emerald-500 to-cyan-600' },
  { id: '11', name: 'පදාර්ථ හා විකිරණ (Radiation)', icon: '⚛️', topics: 'ප්රකාශ විද්යුත් ආචරණය, X-කිරණ, විකිරණශීලිතාව', color: 'from-fuchsia-600 to-purple-600' }
];

export default function PhysicsDashboard() {
  const [completedUnits, setCompletedUnits] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('physics_progress_v1');
    if (saved) {
      try {
        setCompletedUnits(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleUnit = (id) => {
    const updated = {
      ...completedUnits,
      [id]: !completedUnits[id]
    };
    setCompletedUnits(updated);
    localStorage.setItem('physics_progress_v1', JSON.stringify(updated));
  };

  const totalUnits = physicsUnits.length;
  const completedCount = Object.keys(completedUnits).filter(key => completedUnits[key]).length;
  const progressPercent = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0;

  // Gamified ranks based on progress
  let rankName = "භෞතික විද්‍යා ආධුනිකයා 📐";
  let rankDesc = "අදම ඔයාගේ A/L Physics ගමන ආරම්භ කරන්න!";
  let rankColor = "from-slate-400 to-slate-500";

  if (completedCount >= 11) {
    rankName = "Quantum මහාචාර්ය ⚛️🏆";
    rankDesc = "නියමයි! ඔබ සියලුම ඒකක සාර්ථකව අවසන් කර ඇත!";
    rankColor = "from-yellow-500 via-amber-500 to-orange-500 animate-pulse";
  } else if (completedCount >= 9) {
    rankName = "අයින්ස්ටයින්ගේ අනුගාමිකයා 🧠⚡";
    rankDesc = "විශිෂ්ටයි! ඔබ සැබෑ භෞතික විද්‍යා විශාරදයෙක් වීමට ඉතා ආසන්නයි!";
    rankColor = "from-fuchsia-500 to-purple-600";
  } else if (completedCount >= 7) {
    rankName = "ගුරුත්වාකර්ෂණ මාස්ටර් 🌍🧲";
    rankDesc = "නියමයි මචන්! තව ඒකක කිහිපයයි. දිගටම යමු!";
    rankColor = "from-indigo-500 to-blue-600";
  } else if (completedCount >= 4) {
    rankName = "පරිපථ ශිල්පී 🔌🔋";
    rankDesc = "සාර්ථකව ඉදිරියට යනවා! ඔබේ උත්සාහය විශිෂ්ටයි.";
    rankColor = "from-emerald-500 to-teal-600";
  } else if (completedCount >= 1) {
    rankName = "පරීක්ෂණ සහායක 🧪⚙️";
    rankDesc = "පළමු පියවර සාර්ථකයි! දිගටම පාඩම් ටික එකතු කරමු.";
    rankColor = "from-cyan-500 to-blue-500";
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Section */}
            <div className="scale-75 sm:scale-100 origin-center flex-shrink-0">
              <AnimatedLogo />
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-base">
              <Link href="/lessons" className="flex items-center text-gray-600 hover:text-blue-600 font-medium">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1" />
                <span className="hidden sm:inline">පාඩම් මාලා</span>
              </Link>
              <Link href="/exam-secrets" className="flex items-center text-gray-600 hover:text-blue-600 font-medium">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1" />
                <span className="hidden sm:inline">විභාග රහස්</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-10 text-center md:text-left bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 tracking-wide">
              <span>භෞතික විද්‍යාව මොළේට</span>
              <span 
                className="inline-flex items-center justify-center hover:scale-125 transition-transform duration-300 cursor-default align-middle animate-pulse"
                style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.75))' }}
              >
                <Brain className="w-8 h-8 md:w-9 md:h-9 text-pink-500 fill-pink-500" />
              </span>
              <span>වගේම හදවතටත්</span>
              <span 
                className="inline-flex items-center justify-center hover:scale-125 transition-transform duration-300 cursor-default align-middle"
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.8))',
                  animation: 'pulse 1s ease-in-out infinite'
                }}
              >
                <Heart className="w-8 h-8 md:w-9 md:h-9 text-rose-500 fill-rose-500" />
              </span>
              <span>දැනෙන්න ඉගෙන ගමු!</span>
              <span className="inline-block hover:rotate-12 hover:-translate-y-1 transition-all duration-300 cursor-default origin-bottom-right ml-1">
                👋
              </span>
            </h1>
            <p className="text-slate-300 max-w-2xl text-base md:text-lg">
              සම්පත් පොත්වල අන්තර්ගතය, ප්රායෝගික උදාහරණ, විභාගයේදී ලකුණු ලැබෙන Paper Marking රහස් සහ Interactive Simulators සියල්ල එකම තැනකින්.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <Link 
              href="/formulas" 
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg border border-blue-500 hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Formula Cheat Sheet 🧮
            </Link>
            <a 
              href="#model-papers" 
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg border border-cyan-500 hover:-translate-y-0.5"
            >
              <Brain className="w-5 h-5 mr-2" />
              Model Papers 📝
            </a>
          </div>
        </div>

        {/* Progress Tracker Section */}
        {isLoaded && (
          <div className="mb-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  📊 මගේ අධ්‍යයන ප්‍රගතිය (Study Progress Tracker)
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  A/L Physics ගොඩදාන්න ඔයා සම්පූර්ණ කරපු පාඩම් ටික පහල පාඩම්වලින් ටික් කරලා ප්‍රගතිය මෙතනින් බලාගන්න.
                </p>
              </div>
              <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${rankColor} text-white font-bold text-sm shadow-sm flex items-center gap-1.5`}>
                <span>කාණ්ඩය:</span>
                <span>{rankName}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-lg">
                  නිමකළ ඒකක: {completedCount} / {totalUnits}
                </span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {progressPercent}% සම්පූර්ණයි
                </span>
              </div>
              
              {/* Outer Progress Bar */}
              <div className="w-full bg-gray-105 h-5 rounded-full overflow-hidden border border-gray-200 relative shadow-inner">
                {/* Inner animated bar */}
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Shiny overlay */}
                  <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite] rounded-full"></div>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 italic text-center md:text-left mt-2">
                {rankDesc}
              </p>
            </div>
          </div>
        )}

        {/* Model Papers Section */}
        <div id="model-papers" className="mb-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm scroll-mt-20">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            📝 ආදර්ශ ප්‍රශ්න පත්‍ර (Model Papers MCQ)
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            A/L විභාගයට සමාන මට්ටමේ බහුවරණ ප්‍රශ්න පත්‍ර (MCQ Papers) කාලය මැන ක්‍රියාත්මක කර ඔබේ සූදානම පරීක්ෂා කරන්න.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paper 01 Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white border border-slate-700 flex flex-col justify-between hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  Paper 01
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2">
                  මිනුම ප්‍රශ්න පත්‍රය 01 (Measurement)
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  මිනුම් උපකරණ, මාන, භෞතික රාශි සහ දෛශික ආශ්‍රිත පළමු ඒකකය (Unit 01) සඳහා විශේෂයෙන් සකස් කළ බහුවරණ ප්‍රශ්න පත්‍රය.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-450 font-semibold flex items-center gap-1">
                  ⏱️ පැය 2:00 | 📝 MCQ 50
                </span>
                <Link 
                  href="/quiz?paper=1"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow transition-all hover:-translate-y-0.5"
                >
                  ආරම්භ කරන්න 🚀
                </Link>
              </div>
            </div>

            {/* Paper 02 Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white border border-slate-700 flex flex-col justify-between hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <div>
                <span className="px-2.5 py-1 rounded-md bg-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
                  Paper 02
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2">
                  යාන්ත්‍ර විද්‍යාව ප්‍රශ්න පත්‍රය 02 (Mechanics)
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  බලය හා චලිතය, කාර්යය-ශක්තිය, භ්‍රමණ චලිතය සහ තරල යාන්ත්‍ර විද්‍යාව ආශ්‍රිත දෙවන ඒකකය (Unit 02) සඳහා විශේෂයෙන් සකස් කළ බහුවරණ ප්‍රශ්න පත්‍රය.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-450 font-semibold flex items-center gap-1">
                  ⏱️ පැය 2:00 | 📝 MCQ 50
                </span>
                <Link 
                  href="/quiz?paper=2"
                  className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow transition-all hover:-translate-y-0.5"
                >
                  ආරම්භ කරන්න 🚀
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsUnits.map((unit) => (
            <div 
              key={unit.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 group text-left relative overflow-hidden"
            >
              {/* Card Link Overlay */}
              <Link 
                href={`/units/${unit.id}`}
                className="absolute inset-0 z-10"
              />

              {/* Checkbox button positioned in top right */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleUnit(unit.id);
                  }}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                    completedUnits[unit.id]
                      ? 'bg-green-500 border-green-500 text-white shadow-md scale-110'
                      : 'border-gray-300 hover:border-blue-500 hover:scale-105 bg-white'
                  }`}
                  title={completedUnits[unit.id] ? "නිම නොකළ ලෙස ලකුණු කරන්න" : "නිම කළ බව සලකුණු කරන්න"}
                  aria-label={`Mark Unit ${unit.id} as completed`}
                >
                  {completedUnits[unit.id] ? (
                    <svg className="w-4 h-4 fill-current font-bold" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                    </svg>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-transparent hover:bg-slate-200"></span>
                  )}
                </button>
              </div>

              {/* Content Wrapper */}
              <div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl text-white shadow-sm mb-4`}>
                  {unit.icon}
                </div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Unit {unit.id}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                  {unit.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {unit.topics}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>ඇතුළු වන්න</span>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
