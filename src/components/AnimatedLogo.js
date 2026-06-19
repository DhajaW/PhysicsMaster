import { Orbit } from 'lucide-react';

export default function AnimatedLogo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer w-fit">
      {/* Icon Section (The Graphic) */}
      <div className="relative p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
        <Orbit className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
        {/* පොඩි Glow Effect එකක් */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
      </div>

      {/* Text Section (Typography) */}
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight leading-none">
          PhysicsMaster
        </span>
        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.25em] mt-1">
          Advanced Level
        </span>
      </div>
    </div>
  );
}
