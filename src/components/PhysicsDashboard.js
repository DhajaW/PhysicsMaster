import React from 'react';
import Link from 'next/link';
import { BookOpen, Target } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PhysicsMaster A/L
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/lessons" className="flex items-center text-gray-600 hover:text-blue-600 font-medium">
                <BookOpen className="w-5 h-5 mr-1" /> පාඩම් මාලා
              </Link>
              <Link href="/exam-secrets" className="flex items-center text-gray-600 hover:text-blue-600 font-medium">
                <Target className="w-5 h-5 mr-1" /> විභාග රහස්
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-10 text-center md:text-left bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">භෞතික විද්යාව හදවතටම දැනෙන්න ඉගෙන ගමු! 👋</h1>
          <p className="text-slate-300 max-w-2xl text-base md:text-lg">
            සම්පත් පොත්වල අන්තර්ගතය, ප්රායෝගික උදාහරණ, විභාගයේදී ලකුණු ලැබෙන Paper Marking රහස් සහ Interactive Simulators සියල්ල එකම තැනකින්.
          </p>
        </div>

        {/* Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsUnits.map((unit) => (
            <Link 
              key={unit.id}
              href={`/units/${unit.id}`}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1 group text-left"
            >
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
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
