"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Copy, Check, HelpCircle, Layers } from "lucide-react";
import { physicsFormulas } from "@/data/formulas";
import katex from "katex";
import "katex/dist/katex.min.css";

// LaTeX Rendering Component
function Latex({ math, block = false }) {
  try {
    const html = katex.renderToString(math, {
      displayMode: block,
      throwOnError: false,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    return <span>{math}</span>;
  }
}

export default function FormulasClient({ lang = 'si' }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  const isEnglish = lang === 'en';

  // Copy to clipboard helper
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Define formula categories
  const categoriesSi = [
    { id: "all", name: "සියල්‍ල (All)", icon: "🌐", count: physicsFormulas.length },
    { id: "mechanics", name: "යාන්ත්‍ර විද්‍යාව", icon: "⚙️" },
    { id: "matter", name: "පදාර්ථයේ ගුණ", icon: "🧪" },
    { id: "thermal", name: "තාපය", icon: "🔥" },
    { id: "waves", name: "දෝලන & තරංග", icon: "🌊" },
    { id: "electricity", name: "විද්‍යුත් & චුම්භක", icon: "⚡" },
    { id: "modern", name: "නවීන භෞතික විද්‍යාව", icon: "⚛️" }
  ];

  const categoriesEn = [
    { id: "all", name: "All Formulas", icon: "🌐", count: physicsFormulas.length },
    { id: "mechanics", name: "Mechanics", icon: "⚙️" },
    { id: "matter", name: "Properties of Matter", icon: "🧪" },
    { id: "thermal", name: "Thermal Physics", icon: "🔥" },
    { id: "waves", name: "Oscillations & Waves", icon: "🌊" },
    { id: "electricity", name: "Electricity & Magnetism", icon: "⚡" },
    { id: "modern", name: "Modern Physics", icon: "⚛️" }
  ];

  const categories = isEnglish ? categoriesEn : categoriesSi;

  // Helper to categorize formulas dynamically
  const getCategoryForFormula = (item) => {
    const tags = item.tags.toLowerCase();
    const name = item.name.toLowerCase();
    
    if (tags.includes("modern") || tags.includes("planck") || tags.includes("photon") || tags.includes("photoelectric") || tags.includes("broglie") || tags.includes("x-ray") || tags.includes("decay") || tags.includes("radioactive") || tags.includes("dating") || tags.includes("defect") || tags.includes("binding") || name.includes("ස්ටෙෆාන්") || name.includes("වීන්") || name.includes("ෆෝටෝන") || name.includes("න්යෂ්ටික") || name.includes("අයින්ස්ටයින්") || name.includes("විකිරණ")) {
      return "modern";
    }
    if (tags.includes("ohm") || tags.includes("resistors") || tags.includes("voltage") || tags.includes("current") || tags.includes("electrical power") || tags.includes("magnetic") || tags.includes("circuit")) {
      return "electricity";
    }
    if (tags.includes("heat") || tags.includes("gas") || tags.includes("temperature") || tags.includes("thermal") || name.includes("තාප")) {
      return "thermal";
    }
    if (tags.includes("wave") || tags.includes("pendulum") || tags.includes("oscillation") || name.includes("තරංග") || name.includes("දෝලන")) {
      return "waves";
    }
    if (tags.includes("density") || tags.includes("pressure") || tags.includes("upthrust") || tags.includes("hydrostatic") || tags.includes("buoyancy") || name.includes("පීඩනය") || name.includes("ඝනත්වය") || name.includes("තෙරපුම")) {
      return "matter";
    }
    return "mechanics";
  };

  // Pre-calculate count for each category
  const getCategoryCount = (catId) => {
    if (catId === "all") return physicsFormulas.length;
    return physicsFormulas.filter(item => getCategoryForFormula(item) === catId).length;
  };

  // Get style details for badges
  const getCategoryStyle = (catId) => {
    switch (catId) {
      case "mechanics": return { name: isEnglish ? "Mechanics" : "යාන්ත්‍ර විද්‍යාව", color: "bg-red-50 text-red-700 border-red-100" };
      case "matter": return { name: isEnglish ? "Properties of Matter" : "පදාර්ථයේ ගුණ", color: "bg-emerald-50 text-emerald-700 border-emerald-100" };
      case "thermal": return { name: isEnglish ? "Thermal Physics" : "තාප භෞතික විද්‍යාව", color: "bg-orange-50 text-orange-700 border-orange-100" };
      case "waves": return { name: isEnglish ? "Oscillations & Waves" : "දෝලන & තරංග", color: "bg-teal-50 text-teal-700 border-teal-100" };
      case "electricity": return { name: isEnglish ? "Current Electricity" : "ධාරා විද්‍යුත්", color: "bg-blue-50 text-blue-700 border-blue-100" };
      case "modern": return { name: isEnglish ? "Modern Physics" : "නවීන භෞතික විද්‍යාව", color: "bg-purple-50 text-purple-700 border-purple-100" };
      default: return { name: isEnglish ? "Mechanics" : "යාන්ත්‍ර විද්‍යාව", color: "bg-slate-50 text-slate-700 border-slate-100" };
    }
  };

  // Filter formulas by Search and Category
  const filteredFormulas = physicsFormulas.filter((item) => {
    const categoryMatches = selectedCategory === "all" || getCategoryForFormula(item) === selectedCategory;
    
    // In English mode, we search by tags and formulas (names/descriptions are in Sinhala in the DB file, tags contain English terms)
    const searchMatches = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatches && searchMatches;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Top Banner Wrapper */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          href={`/${lang}`}
          className="inline-flex items-center text-slate-600 hover:text-slate-900 text-sm font-semibold transition bg-white shadow-sm border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> 
          {isEnglish ? 'Go to Dashboard' : 'Dashboard එකට යන්න'}
        </Link>
      </div>

      {/* Header Title Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-widest">
          {isEnglish ? 'A/L Physics Resources' : 'A/L Physics Resources'}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
          {isEnglish ? 'Ultimate Formula Cheat Sheet 🧮' : 'Ultimate Formula Cheat Sheet 🧮'}
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isEnglish 
            ? 'All complex formulas, units, and descriptions in one place. Use search below to recall equations before exams.'
            : 'සංකීර්ණ සූත්‍ර, ඒකක සහ කෙටි විස්තර සියල්‍ල එකම තැනකින්. විභාගයට යන්න කලින් සූත්‍ර ටික මතක් කර ගන්න පහළින් සෙවුමක් කරන්න.'}
        </p>
      </div>

      {/* Control Panel (Search & Categories) */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-10 space-y-6">
        
        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder={isEnglish 
                ? "Search by formula name, unit or tag... (e.g. Velocity, Force, PV=nRT)" 
                : "සමීකරණය, ඒකකය, පාඩම හෝ වචනයක් Search කරන්න... (උදා: ප්‍රවේගය, Force, PV=nRT)"}
              className="w-full pl-11 pr-5 py-4 rounded-2xl border border-slate-250 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-base md:text-lg shadow-inner bg-slate-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-semibold text-slate-400 hover:text-slate-600"
              >
                {isEnglish ? 'Clear' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-3 flex items-center justify-center gap-1.5">
            <Layers className="w-4 h-4" /> 
            {isEnglish ? 'Select Subject Area (Category)' : 'විෂය ඛණ්ඩය තෝරන්න (Select Category)'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => {
              const count = getCategoryCount(cat.id);
              const isActive = selectedCategory === cat.id;
              
              if (count === 0 && cat.id !== "all") return null;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-md scale-105"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:scale-102"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-bold text-slate-500">
            {isEnglish ? 'Formulas Count: ' : 'සමීකරණ ගණන: '}
            <span className="text-slate-800 bg-slate-200/60 px-2 py-0.5 rounded-md">{filteredFormulas.length}</span>
          </p>
        </div>

        {filteredFormulas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFormulas.map((item) => {
              const category = getCategoryForFormula(item);
              const catDetails = getCategoryStyle(category);
              const isCopied = copiedId === item.id;
              
              // In English mode, if there is an English name/description provided in tags, we use it, otherwise fall back to Sinhala
              const localizedName = isEnglish && item.name_en ? item.name_en : item.name;
              const localizedDesc = isEnglish && item.description_en ? item.description_en : item.description;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-[0_2px_18px_-3px_rgba(0,0,0,0.06),0_10px_24px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 border border-slate-200 flex flex-col group/card relative"
                >
                  {/* Card Header Info */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      Formula #{item.id.toString().padStart(2, '0')}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${catDetails.color}`}>
                      {catDetails.name}
                    </span>
                  </div>

                  {/* Formula Name */}
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover/card:text-blue-600 transition-colors mb-2 leading-snug">
                    {localizedName}
                  </h3>

                  {/* Formula Description */}
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-grow">
                    {localizedDesc}
                  </p>

                  {/* Formula Blackboard Box */}
                  <div className="bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-800 mt-auto min-h-[110px] relative overflow-hidden shadow-inner group-hover/card:border-blue-500/30 transition-colors duration-300">
                    {/* Chalkboard Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    
                    {/* Glowing effect inside blackboard */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>

                    {/* Copy LaTeX Formula Button */}
                    <button
                      onClick={() => copyToClipboard(item.formula, item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all opacity-0 group-hover/card:opacity-100 z-20 cursor-pointer"
                      title={isEnglish ? "Copy LaTeX Formula" : "සූත්‍රය Copy කරන්න"}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <div className="text-xl md:text-2xl text-sky-400 font-bold select-all text-center leading-relaxed max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
                      <Latex math={item.formula} block={true} />
                    </div>
                  </div>

                  {/* Formula Details Bottom Panel */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      SI Unit:
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/50">
                      <Latex math={item.unit} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-350 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800">
              {isEnglish ? 'No Formulas Found 🔍' : 'කිසිවක් හමු නොවීය 🔍'}
            </h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              {isEnglish 
                ? 'We could not find any formulas matching your search term. Please try another keyword.'
                : 'ඔබ සෙවූ සමීකරණය, පාඩම හෝ වචනය අපගේ දත්ත ගබඩාවේ නොමැත. කරුණාකර වෙනත් වචනයක් උත්සාහ කරන්න.'}
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              {isEnglish ? 'Reset Search' : 'සෙවීම් reset කරන්න'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
