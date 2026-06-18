'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function ExamSecretsPage() {
  
  const examSecretsData = [
    {
      unit: "Unit 1: මිනුම (Measurement)",
      traps: [
        {
          title: "ප්‍රස්ථාර අක්ෂ නම් කිරීමේ උගුල:",
          description: "ප්‍රස්ථාරයක අක්ෂ නම් කිරීමේදී භෞතික රාශිය පමණක් (උදා: T) ලියා, ඒකකය (උදා: s) නොලිව්වොත් එම අක්ෂය සඳහා ලකුණු හිමි නොවේ. අනිවාර්යයෙන්ම 'T / s' හෝ 'T (s)' ලෙස ලිවිය යුතුය."
        },
        {
          title: "ශුන්‍ය දෝෂ (Zero Error) අඩු කිරීම:",
          description: "මයික්‍රොමීටර හෝ වර්නියර් කියවීම් වලදී, අවසාන පිළිතුරෙන් ශුන්‍ය දෝෂය 'ලකුණත් සමගම' අඩු කළ යුතු බව මතක තබා ගන්න. ඍණ ශුන්‍ය දෝෂයක් නම් එය එකතු වීමක් සිදුවේ."
        }
      ]
    },
    {
      unit: "Unit 2: යාන්ත්‍ර විද්‍යාව (Mechanics)",
      traps: [
        {
          title: "නිදහස් වස්තු රූප සටහන් (Free Body Diagrams) උගුල:",
          description: "වස්තුවක් මත ක්‍රියාකරන බල ලකුණු කරන විට, බලය ක්‍රියාකරන ලක්ෂ්‍යය මතින්ම ඊතලය ඇරඹිය යුතුය. වෙනත් වස්තු මගින් ඇතිකරන බල මිස, මෙම වස්තුව මගින් අන් අයට දෙන බල (ප්‍රතික්‍රියා) මෙහි නොඇඳිය යුතුය."
        },
        {
          title: "ගම්‍යතා සංස්ථිතිය සහ දිශාව:",
          description: "ගම්‍යතාවය දෛශිකයකි. සමීකරණය යෙදීමේදී එක් දිශාවක් ධන (+) ලෙස ගෙන, අනිත් දිශාවට යන වස්තු වල ප්‍රවේගය අනිවාර්යයෙන්ම ඍණ (-) ලෙස ආදේශ කළ යුතුය. නැත්නම් මුළු ගණනය කිරීමම වැරදේ."
        }
      ]
    },
    {
      unit: "Unit 3: දෝලන හා තරංග (Oscillations & Waves)",
      traps: [
        {
          title: "නිෂ්පන්ද (N) සහ ප්‍රස්පන්ද (A) ලකුණු කිරීම:",
          description: "අනුනාද නළ පාඩමේ ව්‍යුහගත ප්‍රශ්න වලදී නළය ඇතුළේ තරංග හැඩය අඳින විට විවෘත කෙළවර ප්‍රස්පන්දයක් (A) ලෙසත්, වැසුණු කෙළවර නිෂ්පන්දයක් (N) ලෙසත් පැහැදිලිව අකුරින්ම ලකුණු කළ යුතුය."
        }
      ]
    },
    {
      unit: "Unit 4: ආලෝකය (Optics)",
      traps: [
        {
          title: "ප්‍රකාශ විද්‍යාව කිරණ සටහන් උගුල:",
          description: "කාච හෝ ප්‍රිස්ම හරහා ආලෝකය ඇඳීමේදී කිරණ මත ඊතල (Arrows) ලකුණු නොකළහොත්, මුළු ලකුණු ප්‍රමාණයම (Zero Marks) අහිමි වේ! පරාවර්තනයේදී සහ වර්තනයේදී ඊතල අනිවාර්යයි."
        }
      ]
    },
    {
      unit: "Unit 5: ගුරුත්වාකර්ෂණ ක්ෂේත්‍ර (Gravitational Fields)",
      traps: [
        {
          title: "ක්ෂේත්‍ර තීව්‍රතා (g) ප්‍රස්ථාරයේ ඍණ ලකුණ:",
          description: "පොළොවෙන් ඉහළට යන විට 'g' හි අගය අඩු වේ. නමුත් දෛශිකයක් ලෙස සලකන විට එහි දිශාව පෘථිවි කේන්ද්‍රය දෙසට බැවින්, සමහර ප්‍රශ්න වලදී ප්‍රස්ථාරය ඍණ y-අක්ෂයේ අඳින්නට සිදුවන බව Marking scheme එකේ විශේෂයෙන් බලයි."
        }
      ]
    },
    {
      unit: "Unit 6: ස්ථිති විද්‍යුතය (Electrostatics)",
      traps: [
        {
          title: "විද්‍යුත් බල රේඛා ඇඳීමේ නීති:",
          description: "විද්‍යුත් බල රේඛා කිසිවිටෙක එකිනෙක ඡේදනය නොවිය යුතුය. එමෙන්ම සන්නායක පෘෂ්ඨයකින් රේඛාවක් ආරම්භ වන විට හෝ අවසන් වන විට එය පෘෂ්ඨයට ලම්බකව (අංශක 90 කෝණයකින්) ස්පර්ශ වන ලෙස ඇඳිය යුතුය."
        }
      ]
    },
    {
      unit: "Unit 7: ධාරා විද්‍යුතය (Current Electricity)",
      traps: [
        {
          title: "කර්චොෆ් නියම (Kirchhoff's Laws) ලූප් දිශාව:",
          description: "සංවෘත පුඩුවක් සඳහා කර්චොෆ් නියමය යෙදීමේදී, ඔබ තෝරාගත් දිශාවටම කෝෂයේ ධාරාව ගලන්නේ නම් විද්‍යුත් ගාමක බලය (E) ධන ලෙසත්, ප්‍රතිවිරුද්ධ නම් ඍණ ලෙසත් ආදේශ කිරීමට අමතක නොකරන්න."
        },
        {
          title: "පරිපූර්ණ නොවන වෝල්ට්මීටර:",
          description: "ප්‍රශ්නයේ 'පරිපූර්ණ වෝල්ට්මීටරයක්' යැයි කියා නැත්නම්, ඊට අනිවාර්යයෙන්ම අභ්‍යන්තර ප්‍රතිරෝධයක් ඇත. එමගින් ප්‍රධාන පරිපථයෙන් ධාරාවක් ඇදගන්නා බව සලකා ගණනය කිරීම් කළ යුතුය."
        }
      ]
    },
    {
      unit: "Unit 8: විද්‍යුත් චුම්බකත්වය (Electromagnetism)",
      traps: [
        {
          title: "ෆ්ලෙමිංගේ නීති මාරු වීම:",
          description: "මෝටර සඳහා (බලය සෙවීමට) ෆ්ලෙමිංගේ වම් අත් නියමයද, විද්‍යුත් චුම්බක ප්‍රේරණය සඳහා (ප්‍රේරිත ධාරාව සෙවීමට) දකුණු අත් නියමයද භාවිතා කළ යුතුය. මේ දෙක මාරු කර ගැනීමෙන් සම්පූර්ණ ලකුණු අහිමි වේ."
        }
      ]
    },
    {
      unit: "Unit 9: ඉලෙක්ට්‍රොනික්ස් (Electronics)",
      traps: [
        {
          title: "කාරක වර්ධක (Op-Amp) අතාත්වික භූගතය:",
          description: "Op-Amp ගැටළුවකදී V+ = V- ලෙස ගෙන ගණනය කිරීම් කිරීමට පෙර, අනිවාර්යයෙන්ම 'මෙය පරිපූර්ණ කාරක වර්ධකයක් බැවින්' (Since ideal op-amp) යනුවෙන් ලිවිය යුතුය. නැත්නම් marking එකේ ලකුණු දෙන්නේ නැත."
        },
        {
          title: "ට්‍රාන්සිස්ටර ක්‍රියාකාරී කලාපය:",
          description: "Ic = β * Ib සමීකරණය භාවිතා කළ හැක්කේ ට්‍රාන්සිස්ටරය 'ක්‍රියාකාරී කලාපයේ' (Active Region) ඇත්නම් පමණි. සන්තෘප්ත කලාපයේදී මෙය යෙදීම සම්පූර්ණයෙන්ම වැරදියි."
        }
      ]
    },
    {
      unit: "Unit 10: පදාර්ථයේ යාන්ත්‍රික ගුණ (Mechanical Properties)",
      traps: [
        {
          title: "සබන් බුබුලේ පෘෂ්ඨික ආතතිය:",
          description: "දියර බිඳුවකට ඇත්තේ එක පෘෂ්ඨයක් වුවද, සබන් බුබුලකට (Soap Bubble) ඇතුළත සහ පිටත ලෙස පෘෂ්ඨ 2ක් ඇත. එබැවින් පීඩන වෙනස සෙවීමේදී අනිවාර්යයෙන්ම 2 කින් ගුණ කළ යුතුය (P = 4T/r)."
        },
        {
          title: "පොයිසෙල් සමීකරණයේ අරය vs විශ්කම්භය:",
          description: "පොයිසෙල් සමීකරණයේ ඇත්තේ අරයේ 4 වෙනි බලයයි (r^4). බොහෝ ප්‍රශ්න වල ලබා දෙන්නේ නළයේ විශ්කම්භයයි. එය දෙකෙන් බෙදා අරය ලබාගැනීමට අමතක වීමෙන් බහුවරණ වලදී වැරදි පිළිතුරට යොමු වේ."
        }
      ]
    },
    {
      unit: "Unit 11: පදාර්ථ හා විකිරණ (Matter and Radiation)",
      traps: [
        {
          title: "ප්‍රකාශ විද්‍යුත් ප්‍රස්ථාරයේ අන්තඃඛණ්ඩය:",
          description: "නැවතුම් විභවය (V) සහ සංඛ්‍යාතය (f) අතර ප්‍රස්ථාරයේ ඍණ y-අක්ෂයේ අන්තඃඛණ්ඩය '-Φ/e' ලෙස ලකුණු නොකළහොත් Marking Scheme එකට අනුව ප්‍රස්ථාරයට අදාළ ලකුණු අහිමි වේ."
        },
        {
          title: "අර්ධ ආයුකාලයේ ඉතිරි වූ ස්කන්ධය:",
          description: "සමීකරණ යොදා ගණනය කිරීමේදී බොහෝ විට ලැබෙන්නේ 'ඉතිරි වූ' න්‍යෂ්ටි ප්‍රමාණයයි (N). ප්‍රශ්නයෙන් අසා ඇත්තේ 'ක්ෂය වූ' ප්‍රමාණය නම්, එය මුල් ප්‍රමාණයෙන් (N0) අඩු කර පිළිතුර දිය යුතුය."
        }
      ]
    }
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