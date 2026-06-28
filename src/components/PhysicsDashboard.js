"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Target, Calculator, Brain, Heart, Loader2 } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import AdPlaceholder from '@/components/AdPlaceholder';
import { supabase } from '../../lib/supabase';
import { translations } from '@/lib/translations';
import ParticleBackground from '@/components/ParticleBackground';

// 11 Physics Units in Sinhala and English
const physicsUnitsSi = [
  { id: '01', name: 'මිනුම (Measurement)', icon: '📐', topics: 'භෞතික රාශි, මාන, මිනුම් උපකරණ, දෛශික', color: 'from-blue-500 to-indigo-600' },
  { id: '02', name: 'යාන්ත්‍ර විද්‍යාව (Mechanics)', icon: '⚙️', topics: 'බලය හා චලිතය, කාර්යය-ශක්තිය, භ්‍රමණ චලිතය', color: 'from-red-500 to-orange-600' },
  { id: '03', name: 'දෝලන හා තරංග (Waves)', icon: '🌊', topics: 'සරල අනුවර්තීය චලිතය, ධ්වනි විද්‍යාව, ප්‍රකාශ විද්‍යාව', color: 'from-teal-500 to-emerald-600' },
  { id: '04', name: 'තාප භෞතික විද්‍යාව (Thermal)', icon: '🔥', topics: 'තාපමිතිය, තාප ප්‍රසාරණය, තාප සංක්‍රමණය', color: 'from-orange-500 to-amber-600' },
  { id: '05', name: 'ගුරුත්වාකර්ෂණ ක්ෂේත්‍ර', icon: '🌍', topics: 'නිව්ටන්ගේ ගුරුත්වාකර්ෂණ නියමය, චන්ද්‍රිකා කක්ෂ', color: 'from-purple-500 to-indigo-600' },
  { id: '06', name: 'ස්ථිති විද්‍යුත් ක්ෂේත්‍ර', icon: '⚡', topics: 'විද්‍යුත් බල රේඛා, විද්‍යුත් විභවය, ධාරිත්‍රක', color: 'from-blue-600 to-cyan-500' },
  { id: '07', name: '💡 ධාරා විද්‍යුත් (Current)', icon: '🔌', topics: 'ඕම්ගේ නියමය, කර්චොෆ් නියම, පරිපථ සටහන්', color: 'from-yellow-500 to-orange-600' },
  { id: '08', name: 'විද්‍යුත් චුම්භකත්වය', icon: '🧲', topics: 'චුම්භක ක්ෂේත්‍ර, විද්‍යුත් චුම්භක ප්‍රේරණය', color: 'from-violet-600 to-purple-500' },
  { id: '09', name: 'ඉලෙක්ට්‍රොනික විද්‍යාව', icon: '🎛️', topics: 'අර්ධ සන්නායක, ට්‍රාන්සිස්ටර, තාර්කික ද්වාර', color: 'from-pink-500 to-rose-600' },
  { id: '10', name: 'පදාර්ථයේ යාන්ත්‍රික ගුණ', icon: '🧪', topics: 'ප්‍රත්යාස්ථතාව, දුස්ස්‍රාවිතාව, පෘෂ්ඨික ආතතිය', color: 'from-emerald-500 to-cyan-600' },
  { id: '11', name: 'පදාර්ථ හා විකිරණ (Radiation)', icon: '⚛️', topics: 'ප්‍රකාශ විද්‍යුත් ආචරණය, X-කිරණ, විකිරණශීලිතාව', color: 'from-fuchsia-600 to-purple-600' }
];

const physicsUnitsEn = [
  { id: '01', name: 'Measurement', icon: '📐', topics: 'Physical Quantities, Dimensions, Measuring Instruments, Vectors', color: 'from-blue-500 to-indigo-600' },
  { id: '02', name: 'Mechanics', icon: '⚙️', topics: 'Force and Motion, Work-Energy, Rotational Motion', color: 'from-red-500 to-orange-600' },
  { id: '03', name: 'Oscillations & Waves', icon: '🌊', topics: 'Simple Harmonic Motion, Acoustics, Optics', color: 'from-teal-500 to-emerald-600' },
  { id: '04', name: 'Thermal Physics', icon: '🔥', topics: 'Thermometry, Thermal Expansion, Heat Transfer', color: 'from-orange-500 to-amber-600' },
  { id: '05', name: 'Gravitational Fields', icon: '🌍', topics: 'Newtons Law of Gravitation, Satellite Orbits', color: 'from-purple-500 to-indigo-600' },
  { id: '06', name: 'Electrostatic Fields', icon: '⚡', topics: 'Electric Field Lines, Electric Potential, Capacitors', color: 'from-blue-600 to-cyan-500' },
  { id: '07', name: '💡 Current Electricity', icon: '🔌', topics: 'Ohms Law, Kirchhoffs Laws, Circuit Diagrams', color: 'from-yellow-500 to-orange-600' },
  { id: '08', name: 'Electromagnetism', icon: '🧲', topics: 'Magnetic Fields, Electromagnetic Induction', color: 'from-violet-600 to-purple-500' },
  { id: '09', name: 'Electronics', icon: '🎛️', topics: 'Semiconductors, Transistors, Logic Gates', color: 'from-pink-500 to-rose-600' },
  { id: '10', name: 'Mechanical Properties of Matter', icon: '🧪', topics: 'Elasticity, Viscosity, Surface Tension', color: 'from-emerald-500 to-cyan-600' },
  { id: '11', name: 'Matter and Radiation', icon: '⚛️', topics: 'Photoelectric Effect, X-Rays, Radioactivity', color: 'from-fuchsia-600 to-purple-600' }
];

// Carousel slide backgrounds and labels
const heroSlides = [
  {
    image: '/images/hero_einstein.png',
    si: 'ඇල්බට් අයින්ස්ටයින්',
    en: 'Albert Einstein',
    position: 'center 35%',
    size: 'cover',
    mirror: false
  },
  {
    image: '/images/hero_tesla.png',
    si: 'නිකොලා ටෙස්‍ලා',
    en: 'Nikola Tesla',
    position: 'center',
    size: 'cover',
    mirror: false
  },
  {
    image: '/images/hero_curie.png',
    si: 'මාරි කියුරි',
    en: 'Marie Curie',
    position: 'center',
    size: 'cover',
    mirror: false
  }
];

export default function PhysicsDashboard({ lang = 'si' }) {
  const [completedUnits, setCompletedUnits] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [availablePapers, setAvailablePapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const isEnglish = lang === 'en';
  const t = translations[lang] || translations.si;
  const physicsUnits = isEnglish ? physicsUnitsEn : physicsUnitsSi;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getUnitForPaper = (paperNo) => {
    const paddedId = paperNo.toString().padStart(2, '0');
    return physicsUnits.find(u => u.id === paddedId) || {
      name: isEnglish ? `Model Paper ${paperNo}` : `ප්‍රශ්න පත්‍රය ${paperNo}`,
      topics: isEnglish ? 'Questions from across the A/L Physics syllabus.' : 'භෞතික විද්‍යාව විෂය නිර්දේශය ආශ්‍රිත ප්‍රශ්න පත්‍රය.',
      color: 'from-slate-750 to-slate-850'
    };
  };

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

    const fetchAvailablePapers = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('paper_no');
        
        if (error) {
          console.error("Error fetching papers list:", error);
        } else if (data) {
          const uniquePapers = Array.from(
            new Set(data.map(q => parseInt(q.paper_no, 10)))
          )
          .filter(val => !isNaN(val))
          .sort((a, b) => a - b);
          setAvailablePapers(uniquePapers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPapers(false);
      }
    };
    
    fetchAvailablePapers();
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
  let rankName = isEnglish ? "Physics Novice 📐" : "භෞතික විද්‍යා ආධුනිකයා 📐";
  let rankDesc = isEnglish ? "Start your A/L Physics study journey today!" : "අදම ඔයාගේ A/L Physics ගමන ආරම්භ කරන්න!";
  let rankColor = "from-slate-400 to-slate-500";

  if (completedCount >= 11) {
    rankName = isEnglish ? "Quantum Professor ⚛️🏆" : "Quantum මහාචාර්ය ⚛️🏆";
    rankDesc = isEnglish ? "Perfect! You have completed all 11 physics units!" : "නියමයි! ඔබ සියලුම ඒකක සාර්ථකව අවසන් කර ඇත!";
    rankColor = "from-yellow-500 via-amber-500 to-orange-500 animate-pulse";
  } else if (completedCount >= 9) {
    rankName = isEnglish ? "Einstein Follower 🧠⚡" : "අයින්ස්ටයින්ගේ අනුගාමිකයා 🧠⚡";
    rankDesc = isEnglish ? "Excellent! You are very close to becoming a true master." : "විශිෂ්ටයි! ඔබ සැබෑ භෞතික විද්‍යා විශාරදයෙක් වීමට ඉතා ආසන්නයි!";
    rankColor = "from-fuchsia-500 to-purple-600";
  } else if (completedCount >= 7) {
    rankName = isEnglish ? "Gravity Master 🌍🧲" : "ගුරුත්වාකර්ෂණ මාස්ටර් 🌍🧲";
    rankDesc = isEnglish ? "Great job! Just a few more units left. Keep pushing!" : "නියමයි මචන්! තව ඒකක කිහිපයයි. දිගටම යමු!";
    rankColor = "from-indigo-500 to-blue-600";
  } else if (completedCount >= 4) {
    rankName = isEnglish ? "Circuit Specialist 🔌🔋" : "පරිපථ ශිල්පී 🔌🔋";
    rankDesc = isEnglish ? "Great progress! Your effort is paying off." : "සාර්ථකව ඉදිරියට යනවා! ඔබේ උත්සාහය විශිෂ්ටයි.";
    rankColor = "from-emerald-500 to-teal-600";
  } else if (completedCount >= 1) {
    rankName = isEnglish ? "Lab Assistant 🧪⚙️" : "පරීක්ෂණ සහායක 🧪⚙️";
    rankDesc = isEnglish ? "First step completed! Let\'s keep adding completed lessons." : "පළමු පියවර සාර්ථකයි! දිගටම පාඩම් ටික එකතු කරමු.";
    rankColor = "from-cyan-500 to-blue-500";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <ParticleBackground mode="nodes" />
      
      {/* Top Navigation Bar */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Section */}
            <div className="scale-75 sm:scale-100 origin-center flex-shrink-0">
              <AnimatedLogo />
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-base">
              <Link href={`/${lang}/lessons`} className="flex items-center text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1 text-cyan-500" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Lessons' : 'පාඩම් මාලා'}</span>
              </Link>
              <Link href={`/${lang}/exam-secrets`} className="flex items-center text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1 text-cyan-500" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Exam Secrets' : 'විභාග රහස්'}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-0 relative z-10">
        {/* Welcome Section / Hero Carousel */}
        <div className="mb-8 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden min-h-[360px] md:min-h-[460px] group/hero text-left">
          {/* Background Image Carousel */}
          <div className="absolute inset-0 z-0 select-none">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundPosition: slide.position || 'center',
                    backgroundSize: slide.size || 'cover',
                    transform: slide.mirror ? 'scaleX(-1)' : undefined
                  }}
                />
              </div>
            ))}
            
            {/* Premium Dark Overlay & Multi-layered Gradients (Adjusted for better scientist visibility) */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/10 z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10 z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-10 pointer-events-none"></div>
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight flex flex-wrap items-center justify-start gap-x-2 gap-y-1">
              {isEnglish ? (
                <>
                  <span>Engage your mind.</span>
                  <span 
                    className="inline-flex items-center justify-center hover:scale-125 transition-transform duration-300 cursor-default align-middle animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.75))' }}
                  >
                    <Brain className="w-7 h-7 md:w-8 md:h-8 text-pink-500 fill-pink-500" />
                  </span>
                  <span>Inspire your heart.</span>
                  <span 
                    className="inline-flex items-center justify-center hover:scale-125 transition-transform duration-300 cursor-default align-middle"
                    style={{ 
                      filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.8))',
                      animation: 'pulse 1s ease-in-out infinite'
                    }}
                  >
                    <Heart className="w-7 h-7 md:w-8 md:h-8 text-rose-500 fill-rose-500" />
                  </span>
                  <span>Master Physics.</span>
                  <span className="inline-block hover:rotate-12 hover:-translate-y-1 transition-all duration-300 cursor-default origin-bottom-right ml-1">
                    👋
                  </span>
                </>
              ) : (
                <>
                  <span>භෞතික විද්‍යාව: නිවැරදි අවබෝධයෙන් විශිෂ්ටත්වය කරා</span>
                </>
              )}
            </h1>
            <p className="text-slate-200 max-w-2xl text-base md:text-lg leading-relaxed font-medium drop-shadow-md">
              {isEnglish 
                ? 'Syllabus notes, practical examples, marking scheme traps, and interactive web simulators in one single portal.'
                : 'සම්පත් පොත්වල අන්තර්ගතය, ප්‍රායෝගික උදාහරණ, විභාගයේදී ලකුණු ලැබෙන Paper Marking රහස් සහ Interactive Simulators සියල්‍ල එකම තැනකින්.'}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link 
                href={`/${lang}/formulas`} 
                className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                Formula Cheat Sheet 🧮
              </Link>
              <a 
                href="#model-papers" 
                className="inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm sm:text-base font-bold transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5"
              >
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                Model Papers 📝
              </a>
            </div>
          </div>

          {/* Arrow Buttons (Visible on hover of Welcome container on desktop) */}
          <button
            onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/85 border border-slate-800/80 text-slate-300 hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm hidden md:flex items-center justify-center"
            aria-label="Previous Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/85 border border-slate-800/80 text-slate-300 hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm hidden md:flex items-center justify-center"
            aria-label="Next Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Navigation Controls & Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:right-8 md:left-auto md:translate-x-0 z-20 flex items-center space-x-3">
            {heroSlides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`group/dot relative h-3 rounded-full transition-all duration-500 cursor-pointer ${
                  activeSlide === idx ? 'w-8 bg-cyan-400' : 'w-3 bg-slate-500/50 hover:bg-slate-400'
                }`}
                title={isEnglish ? `View ${slide.en}` : `${slide.si} පෙන්වන්න`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Tooltip on hover */}
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-cyan-400 opacity-0 group-hover/dot:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none backdrop-blur-sm shadow-xl">
                  {isEnglish ? slide.en : slide.si}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Top AdSense Banner */}
        <AdPlaceholder type="banner" slotId="YOUR_SLOT_1" />

        {/* Progress Tracker Section */}
        {isLoaded && (
          <div className="mb-10 bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-6 shadow-xl transition-all duration-300 text-left">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  📊 {isEnglish ? 'My Study Progress Tracker' : '📊 මගේ අධ්‍යයන ප්‍රගතිය (Study Progress Tracker)'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {isEnglish
                    ? 'Check the units you have completed to keep track of your coverage of the A/L Physics syllabus.'
                    : 'A/L Physics ගොඩදාන්න ඔයා සම්පූර්ණ කරපු පාඩම් ටික පහල පාඩම්වලින් ටික් කරලා ප්‍රගතිය මෙතනින් බලාගන්න.'}
                </p>
              </div>
              <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${rankColor} text-white font-bold text-sm shadow-sm flex items-center gap-1.5`}>
                <span>{isEnglish ? 'Rank:' : 'කාණ්ඩය:'}</span>
                <span>{rankName}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                  {isEnglish ? `Completed: ${completedCount} / ${totalUnits}` : `නිමකළ ඒකක: ${completedCount} / ${totalUnits}`}
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {progressPercent}% {isEnglish ? 'Complete' : 'සම්පූර්ණයි'}
                </span>
              </div>
              
              <div className="w-full bg-slate-950 h-5 rounded-full overflow-hidden border border-slate-800 relative shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite] rounded-full"></div>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 italic text-center md:text-left mt-2">
                {rankDesc}
              </p>
            </div>
          </div>
        )}

        {/* Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {physicsUnits.map((unit) => (
            <div 
              key={unit.id}
              className="bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 group text-left relative overflow-hidden"
            >
              {/* Card Link Overlay */}
              <Link 
                href={`/${lang}/units/${unit.id}`}
                className="absolute inset-0 z-10"
                aria-label={isEnglish ? `View ${unit.name}` : `${unit.name} බලන්න`}
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
                      : 'border-slate-700 hover:border-blue-500 hover:scale-105 bg-slate-950 text-slate-400'
                  }`}
                  title={isEnglish 
                    ? (completedUnits[unit.id] ? "Mark as uncompleted" : "Mark as completed") 
                    : (completedUnits[unit.id] ? "නිම නොකළ ලෙස ලකුණු කරන්න" : "නිම කළ බව සලකුණු කරන්න")}
                  aria-label={`Mark Unit ${unit.id} as completed`}
                >
                  {completedUnits[unit.id] ? (
                    <svg className="w-4 h-4 fill-current font-bold" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                    </svg>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-transparent hover:bg-slate-800"></span>
                  )}
                </button>
              </div>

              {/* Content Wrapper */}
              <div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl text-white shadow-sm mb-4`}>
                  {unit.icon}
                </div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Unit {unit.id}</span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                  {unit.name}
                </h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                  {unit.topics}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-semibold text-slate-350">
                <span>{isEnglish ? 'Study Now' : 'ඇතුළු වන්න'}</span>
                <span className="text-blue-400 group-hover:translate-x-1.5 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Model Papers Section */}
        <div id="model-papers" className="mb-10 bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-6 shadow-xl scroll-mt-20 text-left">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            📝 {isEnglish ? 'Practice Model Papers (MCQ)' : '📝 ආදර්ශ ප්‍රශ්න පත්‍ර (Model Papers MCQ)'}
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            {isEnglish 
              ? 'Evaluate your score by taking multiple choice tests timed exactly like the G.C.E. A/L exam.' 
              : 'A/L විභාගයට සමාන මට්ටමේ බහුවරණ ප්‍රශ්න පත්‍ර (MCQ Papers) කාලය මැන ක්‍රියාත්මක කර ඔබේ සූදානම පරීක්ෂා කරන්න.'}
          </p>

          {loadingPapers ? (
            <div className="flex justify-center items-center py-12 text-blue-400">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span className="text-sm font-semibold">{isEnglish ? 'Loading exams...' : 'ප්‍රශ්න පත්‍ර ලැයිස්තුව ලෝඩ් වෙමින් පවතී...'}</span>
            </div>
          ) : availablePapers.length === 0 ? (
            <div className="text-center py-10 text-slate-500 border border-dashed border-slate-800 rounded-xl">
              <p className="text-sm">{isEnglish ? 'No model papers available in database.' : 'දැනට කිසිදු ආදර්ශ ප්‍රශ්න පත්‍රයක් දත්ත ගබඩාවේ නැත.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availablePapers.map((paperNo) => {
                const unit = getUnitForPaper(paperNo);
                const isEven = paperNo % 2 === 0;
                const badgeClass = isEven ? 'bg-pink-500/20 text-pink-400' : 'bg-cyan-500/20 text-cyan-400';
                const buttonClass = isEven ? 'bg-pink-600 hover:bg-pink-500' : 'bg-cyan-600 hover:bg-cyan-500';

                return (
                  <div 
                    key={paperNo}
                    className="bg-slate-900/60 backdrop-blur border border-slate-850 rounded-2xl p-6 text-white hover:border-slate-700 flex flex-col justify-between hover:shadow-2xl transition-all duration-350 group relative overflow-hidden text-left"
                  >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                        Paper {paperNo.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-3 mb-2">
                        {isEnglish ? `Unit ${paperNo.toString().padStart(2, '0')} Practice Paper` : `${unit.name} ප්‍රශ්න පත්‍රය ${paperNo.toString().padStart(2, '0')}`}
                      </h3>
                      <p className="text-sm text-slate-350 mb-6 leading-relaxed">
                        {isEnglish 
                          ? `A/L standard MCQ practice paper prepared for Unit ${paperNo.toString().padStart(2, '0')} topics.` 
                          : `${unit.topics} ආශ්‍රිතව විභාග මට්ටමට සකස් කරන ලද බහුවරණ ප්‍රශ්න පත්‍රය.`}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        ⏱️ {isEnglish ? 'Duration 2:00 h | 50 MCQs' : '⏱️ පැය 2:00 | 📝 MCQ 50'}
                      </span>
                      <Link 
                        href={`/${lang}/quiz?paper=${paperNo}`}
                        className={`px-4 py-2 rounded-lg text-white font-bold text-sm shadow transition-all hover:scale-105 ${buttonClass} cursor-pointer`}
                      >
                        {isEnglish ? 'Start Exam 🚀' : 'ආරම්භ කරන්න 🚀'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SEO Content Section */}
        <div className="mb-10 bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-xl text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Physics Master A/L - උසස් පෙළ භෞතික විද්‍යාව</h2>
          <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
            <p>
              Welcome to <strong>Physics Master A/L</strong>, the most comprehensive digital learning platform dedicated to Sri Lankan students studying <strong>උසස් පෙළ භෞතික විද්‍යාව</strong> (A/L Physics). Our mission is to help you truly <strong>Master Physics</strong> through an interactive, easy-to-understand, and structured curriculum. We provide detailed syllabus notes, practical experiment guides, and exam-focused model papers designed to enhance your problem-solving skills and secure top grades in your G.C.E. Advanced Level examination.
            </p>
            <p>
              Whether you are struggling with complex theories in Mechanics, Electromagnetism, or Quantum Physics, our platform breaks down every concept logically. By practicing our curated MCQ papers and exploring virtual simulators, you can bridge the gap between theoretical knowledge and practical application. Join thousands of students who have chosen to master <strong>උසස් පෙළ භෞතික විද්‍යාව</strong> with <strong>Physics Master A/L</strong> and take the next step toward academic excellence today.
            </p>
          </div>
        </div>

        {/* Bottom AdSense Banner */}
        <AdPlaceholder type="banner" slotId="YOUR_SLOT_2" className="mt-4 md:mt-8 mb-0 mx-auto" />
      </main>
    </div>
  );
}
