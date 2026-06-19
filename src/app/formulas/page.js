"use client";

import { useState } from "react";
// අලුත් data ෆයිල් එකෙන් සමීකරණ ටික import කරගැනීම
import { physicsFormulas } from "@/data/formulas"; 

export default function FormulasPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Search Bar එකේ ගහන අකුරු වලට අදාළව සමීකරණ ෆිල්ටර් කිරීම
  const filteredFormulas = physicsFormulas.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Ultimate Formula Cheat Sheet 🧮
        </h1>
        <p className="text-lg text-slate-600">
          විභාගයට කලින් ක්ෂණිකව මතක් කරගන්න. අවශ්ය සමීකරණය පහළින් Search කරන්න.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="සමීකරණය හෝ පාඩම Search කරන්න... (උදා: ප්රවේගය, Force)"
            className="w-full px-5 py-4 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4 flex-grow">
                {item.description}
              </p>
              <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-100 mt-auto">
                <span className="text-3xl font-mono font-bold text-blue-600 mb-2 tracking-wider text-center">
                  {item.formula}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-200 px-3 py-1 rounded-full">
                  Unit: {item.unit}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 text-lg">
              ඔබ සෙවූ සමීකරණය අපගේ දත්ත ගබඩාවේ නොමැත. කරුණාකර වෙනත් වචනයක් උත්සාහ කරන්න.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
