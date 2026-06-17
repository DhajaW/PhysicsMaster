'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function ExamSecretsPage() {
  
  // මෙතනට ඔයාට Units 11 ටම අදාළ රහස් එකතු කරගෙන යන්න පුළුවන්
  const examSecretsData = [
    {
      unit: "Unit 4: ආලෝකය (Optics)",
      traps: [
        {
          title: "ප්‍රකාශ විද්‍යාව කිරණ සටහන් උගුල:",
          description: "කාච හෝ ප්‍රිස්ම හරහා ආලෝකය ඇඳීමේදී කිරණ මත ඊතල (Arrows) ලකුණු නොකළහොත්, මුළු ලකුණු ප්‍රමාණයම (Zero Marks) අහිමි වේ!"
        }
      ]
    },
    {
      unit: "Unit 3: දෝලන හා තරංග (Oscillations & Waves)",
      traps: [
        {
          title: "නිෂ්පන්ද (N) සහ ප්‍රස්පන්ද (AN):",
          description: "අනුනාද නළ පාඩමේ ව්‍යුහගත ප්‍රශ්න වලදී නළය ඇතුළේ තරංග හැඩය අඳින විට විවෘත කෙළවර ප්‍රස්පන්දයක් (AN) ලෙසත්, වැසුණු කෙළවර නිෂ්පන්දයක් (N) ලෙසත් පැහැදිලිව ලකුණු කළ යුතුය."
        }
      ]
    },
    {
      unit: "Unit 5: ගුරුත්වාකර්ෂණ ක්ෂේත්‍ර (Gravitational Fields)",
      traps: [
        {
          title: "ප්‍රස්ථාර අක්ෂ නම් කිරීමේ උගුල:",
          description: "V-r හෝ E-r ප්‍රස්ථාර අඳින විට, අක්ෂ වල විචල්‍යයන් (V, E, r) පමණක් නොව, ඒවායේ දිශාව සහ මූල ලක්ෂ්‍යය (0,0) අනිවාර්යයෙන්ම ලකුණු කළ යුතුය. සෘණ අක්ෂය නිවැරදිව පෙන්වීම අනිවාර්යයි."
        }
      ]
    }
    // ඉතුරු Units ටිකත් මේ විදිහටම පල්ලෙහාට එකතු කරගෙන යන්න...
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldAlert className="text-emerald-500 w-8 h-8" />
              Paper Marking රහස් (Exam Traps)
            </h1>
            <p className="text-gray-500 mt-2">A/L Physics Marking Scheme එකේ හැංගිලා තියෙන ලකුණු කැපෙන තැන්!</p>
          </div>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>ආපසු</span>
          </Link>
        </div>

        {/* Secrets List */}
        <div className="space-y-10">
          {examSecretsData.map((unitData, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-blue-800 mb-5 border-b pb-2">
                {unitData.unit}
              </h2>
              
              <div className="space-y-4">
                {unitData.traps.map((trap, trapIndex) => (
                  <div 
                    key={trapIndex} 
                    className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-4 items-start"
                  >
                    <div className="mt-1">
                      <AlertTriangle className="text-amber-500 w-6 h-6 fill-amber-100" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{trap.title}</h3>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {trap.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
