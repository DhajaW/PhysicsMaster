'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function LessonsPage() {
  // 11 units data to render a clean, interactive grid in this page as well
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="text-blue-600 w-8 h-8" />
              A/L Physics පාඩම් මාලාව (Lessons List)
            </h1>
            <p className="text-gray-500 mt-2">භෞතික විද්‍යාව විෂය නිර්දේශයේ සියලුම ඒකක මෙතැනින් එකවර අධ්‍යයනය කරන්න.</p>
          </div>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
        
        {/* Units List */}
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
      </div>
    </div>
  );
}
