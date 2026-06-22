import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertCircle, Sparkles, Award } from 'lucide-react';
import MeasurementPage from '@/components/MeasurementPage';
import MechanicsPage from '@/components/MechanicsPage';
import WavesAndOpticsPage from '@/components/WavesAndOpticsPage';
import ThermalPhysicsPage from '@/components/ThermalPhysicsPage';
import GravitationalFieldsPage from '@/components/GravitationalFieldsPage';
import ElectrostaticsPage from '@/components/ElectrostaticsPage';
import CurrentElectricityPage from '@/components/CurrentElectricityPage';
import ElectromagnetismPage from '@/components/ElectromagnetismPage';
import ElectronicsPage from '@/components/ElectronicsPage';
import MechanicalPropertiesPage from '@/components/MechanicalPropertiesPage';
import QuantumPhysicsPage from '@/components/QuantumPhysicsPage';
import ParticleBackground from '@/components/ParticleBackground';

const physicsUnitsSi = [
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

export async function generateStaticParams() {
  const paths = [];
  const locales = ['si', 'en'];
  const unitIds = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  
  for (const lang of locales) {
    for (const id of unitIds) {
      paths.push({ lang, id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }) {
  const { lang = 'si', id } = await params;
  const physicsUnits = lang === 'en' ? physicsUnitsEn : physicsUnitsSi;
  const unit = physicsUnits.find((u) => u.id === id);
  if (!unit) {
    return {
      title: lang === 'en' ? 'Unit Not Found | Physics Master' : 'ඒකකය හමු නොවීය | Physics Master',
    };
  }
  return {
    title: lang === 'en' 
      ? `${unit.name} - Unit ${unit.id} | Physics Master A/L` 
      : `${unit.name} - Unit ${unit.id} | Physics Master A/L`,
    description: lang === 'en'
      ? `A/L Physics Unit ${unit.id}: ${unit.name} syllabus sections, marking schemes, traps, and interactive virtual simulators.`
      : `A/L Physics Unit ${unit.id}: ${unit.name} විෂය නිර්දේශයේ ප්‍රධාන කොටස්, විභාග රහස් (Marking Schemes) සහ අතථ්‍ය පරීක්ෂණ (Simulators) මෙතැනින් ඉගෙන ගන්න.`,
    alternates: {
      canonical: `/${lang}/units/${id}`,
    },
  };
}

export default async function UnitPage({ params }) {
  const { lang = 'si', id } = await params;
  const physicsUnits = lang === 'en' ? physicsUnitsEn : physicsUnitsSi;
  const unit = physicsUnits.find((u) => u.id === id);

  if (!unit) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <ParticleBackground mode="stars" />
        <div className="text-center bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl max-w-md relative z-10">
          <h2 className="text-2xl font-bold text-red-550 mb-4">
            {lang === 'en' ? 'Unit Not Found ❌' : 'ඒකකය හමු නොවීය ❌'}
          </h2>
          <p className="text-slate-350 mb-6 font-sans">
            {lang === 'en' ? 'The unit you are looking for does not exist.' : 'ඔබ සොයන ඒකකය පද්ධතිය තුළ නොපවතී.'}
          </p>
          <Link href={`/${lang}`} className="inline-flex items-center text-blue-400 font-semibold hover:underline">
            <ArrowLeft className="w-5 h-5 mr-2" /> {lang === 'en' ? 'Back to Home' : 'ආපසු මුල් පිටුවට'}
          </Link>
        </div>
      </div>
    );
  }

  let pageContent = null;
  if (id === '01') {
    pageContent = <MeasurementPage lang={lang} />;
  } else if (id === '02') {
    pageContent = <MechanicsPage lang={lang} />;
  } else if (id === '03') {
    pageContent = <WavesAndOpticsPage lang={lang} />;
  } else if (id === '04') {
    pageContent = <ThermalPhysicsPage lang={lang} />;
  } else if (id === '05') {
    pageContent = <GravitationalFieldsPage lang={lang} />;
  } else if (id === '06') {
    pageContent = <ElectrostaticsPage lang={lang} />;
  } else if (id === '07') {
    pageContent = <CurrentElectricityPage lang={lang} />;
  } else if (id === '08') {
    pageContent = <ElectromagnetismPage lang={lang} />;
  } else if (id === '09') {
    pageContent = <ElectronicsPage lang={lang} />;
  } else if (id === '10') {
    pageContent = <MechanicalPropertiesPage lang={lang} />;
  } else if (id === '11') {
    pageContent = <QuantumPhysicsPage lang={lang} />;
  } else {
    pageContent = (
      <div className="min-h-screen bg-slate-950 font-sans pb-16">
        {/* Top Banner */}
        <div className={`bg-gradient-to-r ${unit.color} text-white py-12 px-6 shadow-md relative overflow-hidden`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <Link href={`/${lang}`} className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
                <ArrowLeft className="w-4 h-4 mr-2" /> {lang === 'en' ? 'Back to Dashboard' : 'ආපසු Dashboard එකට'}
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-white/20 p-2 rounded-xl shadow-inner">{unit.icon}</span>
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/80 font-bold">Unit {unit.id}</span>
                  <h1 className="text-3xl font-extrabold mt-1">{unit.name}</h1>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-sm">
              {lang === 'en' ? '🎯 Exam Weight: ' : '🎯 විභාග බර තැබීම: '}
              <span className="font-bold text-yellow-300">{lang === 'en' ? 'Very High' : 'ඉතා ඉහළයි'}</span>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Syllabus Details */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-slate-900/40 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" /> {lang === 'en' ? 'Key Syllabus Topics' : 'විෂය නිර්දේශයේ ප්‍රධාන කොටස් (Topics)'}
                </h2>
                <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                  {unit.topics}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <ParticleBackground mode="stars" />
      <div className="relative z-10">
        {pageContent}
      </div>
    </div>
  );
}
