import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, ArrowLeft } from 'lucide-react';
import { translations } from '@/lib/translations';

export async function generateMetadata({ params }) {
  const { lang = 'si' } = await params;
  return {
    title: lang === 'en' 
      ? 'Paper Marking secrets (Exam Traps) | Physics Master A/L' 
      : 'විභාග රහස් (Exam Traps) | Physics Master A/L',
    description: lang === 'en'
      ? 'Learn the hidden marking scheme secrets and common student traps in G.C.E. A/L Physics papers according to past marking criteria.'
      : 'ශ්‍රී ලංකා විභාග දෙපාර්තමේන්තුවේ A/L Physics පසුගිය වසරවල marking schemes අනුව ලකුණු කැපෙන තැන් සහ බහුලවම කරන වැරදි මෙතැනින් බලන්න.',
    alternates: {
      canonical: `/${lang}/exam-secrets`,
    },
  };
}

export default async function ExamSecretsPage({ params }) {
  const { lang = 'si' } = await params;
  const t = translations[lang] || translations.si;

  const examSecretsDataSi = [
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

  const examSecretsDataEn = [
    {
      unit: "Unit 1: Measurement",
      traps: [
        {
          title: "Graph Axis Labeling Trap:",
          description: "When labeling a graph's axes, writing only the physical quantity (e.g., T) without the unit (e.g., s) results in no marks for that axis. Write it clearly as 'T / s' or 'T (s)'."
        },
        {
          title: "Subtracting Zero Errors:",
          description: "In micrometer or vernier caliper readings, always subtract the zero error 'with its sign' from the observed reading. A negative zero error results in an addition."
        }
      ]
    },
    {
      unit: "Unit 2: Mechanics",
      traps: [
        {
          title: "Free Body Diagrams (FBD) Trap:",
          description: "When labeling forces on an object, the arrow must start exactly from the point of application. Do not draw reaction forces that this object exerts on others."
        },
        {
          title: "Conservation of Momentum Direction:",
          description: "Momentum is a vector. When applying the equation, assume one direction as positive (+) and write the velocity of objects traveling in the opposite direction as negative (-)."
        }
      ]
    },
    {
      unit: "Unit 3: Oscillations & Waves",
      traps: [
        {
          title: "Labeling Nodes (N) and Antinodes (A):",
          description: "In resonance tube structured essay questions, explicitly label the open end as an antinode (A) and the closed end as a node (N) using letters inside your drawing."
        }
      ]
    },
    {
      unit: "Unit 4: Optics",
      traps: [
        {
          title: "Ray Diagram Arrow Trap:",
          description: "When drawing light rays passing through lenses or prisms, forgetting to draw directional arrows on the rays results in zero marks for the diagram. Arrows are mandatory."
        }
      ]
    },
    {
      unit: "Unit 5: Gravitational Fields",
      traps: [
        {
          title: "Negative Sign in Gravitational Intensity (g) Graph:",
          description: "Gravitational field intensity decreases with height. Since it is directed toward the center of the Earth (negative radial direction), marking schemes often strictly check if the graph is drawn in the negative y-axis."
        }
      ]
    },
    {
      unit: "Unit 6: Electrostatics",
      traps: [
        {
          title: "Rules for Drawing Electric Field Lines:",
          description: "Field lines must never intersect. Also, they must touch conductive surfaces perpendicularly (at 95 degrees) both when starting and ending."
        }
      ]
    },
    {
      unit: "Unit 7: Current Electricity",
      traps: [
        {
          title: "Kirchhoff's Laws Loop Direction:",
          description: "When applying Kirchhoff's loop rule, if you travel in the direction of the electromotive force (EMF), it is positive (+); if traveling in the opposite direction, it must be negative (-)."
        },
        {
          title: "Non-Ideal Voltmeters:",
          description: "Unless explicitly stated as an 'ideal voltmeter', it has a finite internal resistance. You must calculate current drawing through the voltmeter in your equations."
        }
      ]
    },
    {
      unit: "Unit 8: Electromagnetism",
      traps: [
        {
          title: "Mixing Up Fleming's Hand Rules:",
          description: "Use Fleming's Left-Hand Rule for motors (to find force) and the Right-Hand Rule for generators/induction (to find induced current direction). Confusing these loses all marks."
        }
      ]
    },
    {
      unit: "Unit 9: Electronics",
      traps: [
        {
          title: "Operational Amplifier (Op-Amp) Virtual Ground:",
          description: "Before solving op-amp problems using V+ = V-, you must write 'Since this is an ideal operational amplifier'. Forgetting this disclaimer loses schema points."
        },
        {
          title: "Transistor Active Region Limit:",
          description: "The formula Ic = beta * Ib can only be used if the transistor operates in the 'Active Region'. Using it in the saturation region is completely incorrect."
        }
      ]
    },
    {
      unit: "Unit 10: Mechanical Properties of Matter",
      traps: [
        {
          title: "Surface Tension of a Soap Bubble:",
          description: "Unlike a liquid droplet which has one interface, a soap bubble has two interfaces (inner and outer). Thus, the excess pressure formula must be multiplied by 2 (P = 4T/r)."
        },
        {
          title: "Radius vs Diameter in Poiseuille's Equation:",
          description: "Poiseuille's equation uses the fourth power of the radius (r^4). Exams often provide the diameter instead; forgetting to divide it by 2 leads to choosing incorrect MCQ options."
        }
      ]
    },
    {
      unit: "Unit 11: Matter and Radiation",
      traps: [
        {
          title: "Intercept of Photoelectric Stopping Potential Graph:",
          description: "In the graph of stopping potential (V) against frequency (f), the intercept on the negative y-axis must be labeled as '-Phi/e'. Forgetting this loses graph marks."
        },
        {
          title: "Remaining Mass in Radioactive Half-Life:",
          description: "Half-life equations solve for the 'remaining' nuclei (N). If the question asks for the 'decayed' nuclei mass, always subtract the remaining nuclei from the initial amount (N0 - N)."
        }
      ]
    }
  ];

  const examSecretsData = lang === 'en' ? examSecretsDataEn : examSecretsDataSi;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sm:bg-transparent sm:border-none sm:p-0 sm:shadow-none">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldAlert className="text-emerald-500 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <span>{lang === 'en' ? 'Paper Marking Secrets' : 'Paper Marking රහස් (Exam Traps)'}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {lang === 'en' 
                ? 'Hidden traps and common marks-deducting errors inside GCE A/L Physics marking schemes.' 
                : 'A/L Physics Marking Scheme එකේ හැංගිලා තියෙන ලකුණු කැපෙන තැන්!'}
            </p>
          </div>
          <Link href={`/${lang}`} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors self-stretch sm:self-auto justify-center text-center">
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
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