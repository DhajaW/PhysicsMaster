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





const physicsUnits = [
  { id: '01', name: 'මිනුම (Measurement)', icon: '📐', topics: 'භෞතික රාශි, මාන, මිනුම් උපකරණ, දෛශික', color: 'from-blue-500 to-indigo-600' },
  { id: '02', name: 'යාන්ත්ර විද්යාව (Mechanics)', icon: '⚙️', topics: 'බලය හා චලිතය, කාර්යය-ශක්තිය, භ්රමණ චලිතය', color: 'from-red-500 to-orange-600' },
  { id: '03', name: 'දෝලන හා තරංග (Waves)', icon: '🌊', topics: 'සරල අනුවර්තීය චලිතය, ධ්වනි විද්යාව, ප්රකාශ විද්යාව', color: 'from-teal-500 to-emerald-600' },
  { id: '04', name: 'තාප භෞතික විද්යාව (Thermal)', icon: '🔥', topics: 'තාපමිතිය, තාප ප්රසාරණය, තාප සංක්රමණය', color: 'from-orange-500 to-amber-600' },
  { id: '05', name: 'ගුරුත්වාකර්ෂණ ක්ෂේත්ර', icon: '🌍', topics: 'නිව්ටන්ගේ ගුරුත්වාකර්ෂණ නියමය, චන්ද්රිකා කක්ෂ', color: 'from-purple-500 to-indigo-600' },
  { id: '06', name: 'ස්ථිති විද්යුත් ක්ෂේත්ර', icon: '⚡', topics: 'විද්යුත් බල රේඛා, විද්යුත් විභවය, ධාරිත්රක', color: 'from-blue-600 to-cyan-500' },
  { id: '07', name: '💡 ධාරා විද්යුත් (Current)', icon: '🔌', topics: 'ඕම්ගේ නියමය, කාචොෆ් නියම, පරිපථ සටහන්', color: 'from-yellow-500 to-orange-600' },
  { id: '08', name: 'විද්යුත් චුම්භකත්වය', icon: '🧲', topics: 'චුම්භක ක්ෂේත්ර, විද්යුත් චුම්භක ප්රේරණය', color: 'from-violet-600 to-purple-500' },
  { id: '09', name: 'ඉලෙක්ට්රොනික විද්යාව', icon: '🎛️', topics: 'අර්ධ සන්නායක, ට්රාන්සිස්ටර, තාර්කික ද්වාර', color: 'from-pink-500 to-rose-600' },
  { id: '10', name: 'පදාර්ථයේ යාන්ත්රික ගුණ', icon: '🧪', topics: 'ප්රත්යාස්ථතාව, දුස්ස්රාවිතාව, පෘෂ්ඨික ආතතිය', color: 'from-emerald-500 to-cyan-600' },
  { id: '11', name: 'පදාර්ථ හා විකිරණ (Radiation)', icon: '⚛️', topics: 'ප්රකාශ විද්යුත් ආචරණය, X-කිරණ, විකිරණශීලිතාව', color: 'from-fuchsia-600 to-purple-600' }
];

export async function generateStaticParams() {
  return [
    { id: '01' },
    { id: '02' },
    { id: '03' },
    { id: '04' },
    { id: '05' },
    { id: '06' },
    { id: '07' },
    { id: '08' },
    { id: '09' },
    { id: '10' },
    { id: '11' }
  ];
}

export default async function UnitPage({ params }) {
  const { id } = await params;
  const unit = physicsUnits.find((u) => u.id === id);


  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-red-650 mb-4">ඒකකය හමු නොවීය ❌</h2>
          <p className="text-gray-650 mb-6 font-sans">ඔබ සොයන ඒකකය පද්ධතිය තුළ නොපවතී.</p>
          <Link href="/" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
            <ArrowLeft className="w-5 h-5 mr-2" /> ආපසු මුල් පිටුවට
          </Link>
        </div>
      </div>
    );
  }

  if (id === '01') {
    return <MeasurementPage />;
  }

  if (id === '02') {
    return <MechanicsPage />;
  }

  if (id === '03') {
    return <WavesAndOpticsPage />;
  }

  if (id === '04') {
    return <ThermalPhysicsPage />;
  }

  if (id === '05') {
    return <GravitationalFieldsPage />;
  }

  if (id === '06') {
    return <ElectrostaticsPage />;
  }

  if (id === '07') {
    return <CurrentElectricityPage />;
  }

  if (id === '08') {
    return <ElectromagnetismPage />;
  }

  if (id === '09') {
    return <ElectronicsPage />;
  }

  if (id === '10') {
    return <MechanicalPropertiesPage />;
  }

  if (id === '11') {
    return <QuantumPhysicsPage />;
  }





  const isUnit07 = id === '07';

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Top Banner */}
      <div className={`bg-gradient-to-r ${unit.color} text-white py-12 px-6 shadow-md relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div>
            <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
              <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
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
            🎯 විභාග බර තැබීම: <span className="font-bold text-yellow-300">ඉතා ඉහළයි</span>
          </div>
        </div>
        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Syllabus Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" /> විෂය නිර්දේශයේ ප්‍රධාන කොටස් (Topics)
              </h2>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-150">
                {unit.topics}
              </p>

              {/* Learning objectives */}
              <div className="mt-6 space-y-4">
                <h3 className="font-bold text-gray-800 text-lg">💡 ඉගෙනුම් අරමුණු (Learning Outcomes)</h3>
                <ul className="list-none space-y-2.5 text-gray-600">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    භෞතික සංකල්ප සරල ප්‍රායෝගික උදාහරණ මගින් තේරුම් ගැනීම.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    විභාගයේදී බහුලව වරදින සීමාකාරී අවස්ථා හා උපක්‍රම හඳුනාගැනීම.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    ප්‍රායෝගික පරීක්ෂණ (Practicals) සඳහා සජීවී සිමියුලේටර් භාවිතා කර පුහුණු වීම.
                  </li>
                </ul>
              </div>
            </div>

            {/* Embed Circuit Simulator for Unit 07 */}
            {isUnit07 ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                    <Sparkles className="text-amber-600 w-5 h-5 animate-pulse" /> සජීවී පරිපථ පුහුණුව (Interactive Simulator)
                  </h3>
                  <p className="text-sm text-amber-800 mt-2">
                    ඕම්ගේ නියමය සහ පරිපථ හැසිරීම වඩාත් ගැඹුරින් තේරුම් ගැනීමට පහත සිමියුලේටරයේ අගයන් වෙනස් කර බලන්න. විභාගයේදී ඇතිවිය හැකි දෝෂ සහ Trap Alerts ද මෙහිදී ඔබට දැකගත හැක.
                  </p>
                </div>
                <CircuitSimulator />
              </div>
            ) : (
              // Beautiful Placeholder Widget for other units
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-sm relative overflow-hidden">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ⚡
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-gray-900">සජීවී සිමියුලේටරය සූදානම් වෙමින් පවතී</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    මෙම ඒකකයට අදාල විශේෂ විභාග රහස් (Exam Secrets), කෙටි ක්‍රම (Short Tricks) සහ ත්‍රිමාණ අන්තර්ක්‍රියාකාරී සිමියුලේටරය ඉක්මනින්ම මෙහි බලාපොරොත්තු වන්න.
                  </p>
                </div>
                <div className="flex justify-center gap-4 pt-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition shadow-sm">
                    🔔 යාවත්කාලීන ලැබුණු විට දැනුම් දෙන්න
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Exam Traps & Marking Secrets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-4">
                <Award className="w-5 h-5" />
                <span>විභාග රහස් (Marking Traps)</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                ශ්‍රී ලංකා විභාග දෙපාර්තමේන්තුවේ පසුගිය වසරවල ලකුණු දීමේ පටිපාටි (Marking Schemes) විශ්ලේෂණයෙන් සකස් කළ විශේෂ උපදෙස්:
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> බහුලවම කරන වැරැද්දක්
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isUnit07 
                      ? "කෝෂයක අභ්‍යන්තර ප්‍රතිරෝධය (r) නොසලකා හැරීම නිසා විභාගයේදී ව්‍යුහගත රචනා ප්‍රශ්න වල සම්පූර්ණ ලකුණු අහිමි විය හැක." 
                      : `Unit ${id} ප්‍රශ්න වලදී මිනුම් ඒකක (Units) සහ මාන (Dimensions) නිවැරදිව ලිවීමට සැමවිටම වගබලා ගන්න.`}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                    💡 කෙටි ක්‍රමයක් (Trick)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isUnit07
                      ? "කර්චොෆ් නියම යෙදීමේදී ධාරාවේ දිශාවට ගමන් කිරීමේදී සහ ප්‍රතිවිරුද්ධ දිශාවට ගමන් කිරීමේදී ලකුණු (+ / -) නිවැරදිව භාවිතයට විශේෂ කෙටි ක්‍රම පුහුණු වන්න."
                      : "භෞතික විද්‍යාවේ සංකීර්ණ සූත්‍ර මතක තබා ගැනීමට සජීවී සිතුවම් හා සරල සජීවිකරණ මෙවලම් නිතර භාවිත කරන්න."}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
