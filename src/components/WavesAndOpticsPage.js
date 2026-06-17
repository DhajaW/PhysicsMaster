'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, HelpCircle, Award, Eye, Sliders, RefreshCw, ArrowLeft } from 'lucide-react';

export default function WavesAndOpticsPage() {
  // Optics Simulator States
  const [lensType, setLensType] = useState('convex'); // convex or concave
  const [objectDistance, setObjectDistance] = useState(150); // px from lens
  const [showArrows, setShowArrows] = useState(true);
  const [opticsFeedback, setOpticsFeedback] = useState({ status: '', msg: '' });

  // Calculate Image position based on Lens Formula (Qualitative approach for visual rendering)
  // Standard focal length = 80px
  const f = 80;
  const isRealImage = objectDistance > f;
  
  // Lens Formula: 1/v - 1/u = 1/f (Sign convention adjusted for rendering)
  let imageDistance = 0;
  let imageHeight = 40;
  
  if (lensType === 'convex') {
    if (objectDistance === f) {
      imageDistance = 999; // Infinity
    } else {
      imageDistance = (objectDistance * f) / (objectDistance - f);
      imageHeight = 40 * (imageDistance / objectDistance);
    }
  } else {
    // Concave lens always virtual, diminished
    imageDistance = -(objectDistance * f) / (objectDistance + f);
    imageHeight = 40 * (Math.abs(imageDistance) / objectDistance);
  }

  const checkRayDiagram = () => {
    if (!showArrows) {
      setOpticsFeedback({
        status: 'error',
        msg: '❌ Exam Trap! ඔබ කිරණ සටහනේ ඊතල (Arrows) සලකුණු කළේ නැත! ආලෝකය ගමන් කරන දිශාව ඊතල මගින් නොදැක්වුවහොත් විභාගයේදී සම්පූර්ණ ලකුණු අහිමි වේ!'
      });
    } else {
      setOpticsFeedback({
        status: 'correct',
        msg: `✅ විශිෂ්ටයි! ඊතල සහිත නිවැරදි කිරණ සටහනක්. ${lensType === 'convex' ? 'උත්තල කාචයක' : 'අවතල කාචයක'} වර්තනය සිදුවන ආකාරය සහ බිම්බයේ ස්වභාවය (${objectDistance < f && lensType === 'convex' ? 'අතථ්‍ය, උඩුකුරු' : lensType === 'convex' ? 'සැබෑ, යටිකුරු' : 'අතථ්‍ය, උඩුකුරු සහ කුඩා වූ'}) නිවැරදිව නිරූපණය වේ.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 rounded-2xl shadow-md">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold transition bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" /> ආපසු Dashboard එකට
          </Link>
          <div className="mt-2">
            <span className="bg-teal-500/30 border border-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Unit 03</span>
            <h1 className="text-3xl font-bold mt-2">දෝලන හා තරංග (Oscillations & Waves)</h1>
            <p className="text-teal-100 text-sm mt-1">සරල අනුවර්තීය චලිතය, ධ්වනිය සහ ජ්‍යාමිතික ප්‍රකාශ විද්‍යාවේ ප්‍රායෝගික රහස්.</p>
          </div>
        </div>

        {/* Core Theory & Exam Traps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Theory Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" /> සම්පත් පොත් මූලික සංකල්ප
            </h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• <strong className="text-slate-800">සරල අනුවර්තී චලිතය (ස.අ.ච.):</strong> වස්තුවක ත්වරණය සමතුලිත පිහිටුමේ සිට විස්ථාපනයට අනුලෝමව සමානුපාතික වන අතර, දිශාව සෑම විටම සමතුලිත පිහිටුම දෙසට යොමු වේ (a = -ω²x).</li>
              <li>• <strong className="text-slate-800">ධ්වනි ප්‍රවේගය (නළයක අනුනාදය):</strong> සංවෘත නළයක මූලික ප්‍රස්පන්දය (AN) සහ නිෂ්පන්දය (N) පිහිටීම අනුව v = 2f(l₁ - l₀) සූත්‍රයෙන් වාතයේ ධ්වනි ප්‍රවේගය සෙවිය හැක.</li>
            </ul>
          </div>

          {/* Exam Traps Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-500" /> Paper Marking රහස් (Exam Traps)
            </h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="font-bold text-emerald-800 block">⚠️ ප්‍රකාශ විද්‍යාව කිරණ සටහන් උගුල:</span>
                කාච හෝ ප්‍රිස්ම හරහා ආලෝකය ඇඳීමේදී කිරණ මත ඊතල (Arrows) ලකුණු නොකළහොත්, මුළු ලකුණු ප්‍රමාණයම (Zero Marks) අහිමි වේ!
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="font-bold text-emerald-800 block">⚠️ නිෂ්පන්ද (N) සහ ප්‍රස්පන්ද (AN):</span>
                අනුනාද නළ පාඩමේ ව්‍යුහගත ප්‍රශ්න වලදී නළය ඇතුළේ තරංග හැඩය අඳින විට විවෘත කෙළවර ප්‍රස්පන්දයක් (AN) ලෙසත්, වැසුණු කෙළවර නිෂ්පන්දයක් (N) ලෙසත් පැහැදිලිව ලකුණු කළ යුතුය.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Virtual Optics Bench Simulator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-5">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">👁️ Virtual Optics Bench (අතථ්‍ය ප්‍රකාශ බංකුව)</h3>
            <p className="text-slate-400 text-xs mt-1">වස්තුව තබන දුර අනුව කිරණ වර්තනය වී බිම්බය (Image) සෑදෙන ආකාරය අධ්‍යයනය කරන්න.</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Controls Panel */}
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sliders className="w-4 h-4" /> පාලක (Settings)
              </h4>

              {/* Lens Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">කාච වර්ගය තෝරන්න:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setLensType('convex')}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${lensType === 'convex' ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-slate-700'}`}
                  >
                    🔍 උත්තල කාචය (Convex)
                  </button>
                  <button 
                    onClick={() => setLensType('concave')}
                    className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer ${lensType === 'concave' ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-slate-700'}`}
                  >
                    👓 අවතල කාචය (Concave)
                  </button>
                </div>
              </div>

              {/* Object Distance Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">වස්තු දුර (u):</label>
                  <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{objectDistance} cm</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="250" 
                  value={objectDistance} 
                  onChange={(e) => { setObjectDistance(Number(e.target.value)); setOpticsFeedback({ status: '', msg: '' }); }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">නාභි දුර (f) = 80 cm ලෙස සලකා ඇත.</span>
              </div>

              {/* Toggle Arrow Checkbox */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <label className="text-xs font-bold text-slate-700">කිරණ මත ඊතල (Arrows) දැක්වීම:</label>
                <input 
                  type="checkbox" 
                  checked={showArrows}
                  onChange={(e) => { setShowArrows(e.target.checked); setOpticsFeedback({ status: '', msg: '' }); }}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <button 
                onClick={checkRayDiagram}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition cursor-pointer border-0"
              >
                කිරණ සටහන පරීක්ෂා කරන්න
              </button>
            </div>

            {/* Live Ray Diagram Rendering Screen */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              {/* Bench Display Box */}
              <div className="bg-slate-950 rounded-xl p-4 min-h-[220px] flex items-center justify-center relative overflow-hidden border border-slate-800">
                
                {/* Visual Representation Graphic inside Simulator */}
                <svg viewBox="0 0 500 200" className="w-full h-auto">
                  {/* Principal Axis (ප්‍රධාන අක්ෂය) */}
                  <line x1="10" y1="100" x2="490" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                  <text x="400" y="90" fill="#475569" fontSize="10">ප්‍රධාන අක්ෂය</text>

                  {/* Lens Center Line */}
                  <line x1="250" y1="20" x2="250" y2="180" stroke="#38bdf8" strokeWidth="3" />
                  {/* Focal Points */}
                  <circle cx="170" cy="100" r="3" fill="#ef4444" />
                  <text x="165" y="115" fill="#ef4444" fontSize="10">F</text>
                  <circle cx="330" cy="100" r="3" fill="#ef4444" />
                  <text x="325" y="115" fill="#ef4444" fontSize="10">F</text>

                  {/* Object Arrow (වස්තුව) */}
                  {/* Object is at (250 - objectDistance) */}
                  <g transform={`translate(${250 - objectDistance}, 100)`}>
                    <line x1="0" y1="0" x2="0" y2="-40" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="0,-44 -4,-38 4,-38" fill="#f43f5e" />
                    <text x="-15" y="-48" fill="#f43f5e" fontSize="10" fontWeight="bold">වස්තුව</text>
                  </g>

                  {/* Ray 1: Parallel to principal axis then through focus */}
                  <path 
                    d={`M ${250 - objectDistance},60 L 250,60 L ${lensType === 'convex' ? '330,100 L 450,160' : '400,25'}`} 
                    fill="none" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                  />
                  {showArrows && (
                    <g fill="#fbbf24">
                      <polygon points="150,60 144,56 144,64" />
                      {lensType === 'convex' ? (
                        <polygon points="290,80 286,75 293,78" />
                      ) : (
                        <polygon points="290,48 285,52 292,46" />
                      )}
                    </g>
                  )}

                  {/* Ray 2: Through optical center */}
                  <line x1={250 - objectDistance} y1="60" x2="380" y2={100 + (40 * (380 - 250) / objectDistance)} stroke="#a855f7" strokeWidth="2" />
                  {showArrows && (
                    <g fill="#a855f7">
                      <polygon points="200,84 195,80 202,82" />
                    </g>
                  )}

                  {/* Image Arrow Rendering (බිම්බය) */}
                  {lensType === 'convex' && isRealImage && (
                    <g transform={`translate(${250 + imageDistance}, 100)`}>
                      <line x1="0" y1="0" x2="0" y2={imageHeight} stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                      <polygon points={`0,${imageHeight + 4} -4,${imageHeight} 4,${imageHeight}`} fill="#34d399" />
                      <text x="10" y="20" fill="#34d399" fontSize="10" fontWeight="bold">බිම්බය (සැබෑ)</text>
                    </g>
                  )}
                </svg>

              </div>

              {/* Feedback Display Box */}
              {opticsFeedback.msg && (
                <div className={`mt-4 p-4 rounded-xl text-xs md:text-sm font-medium border ${opticsFeedback.status === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  {opticsFeedback.msg}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
