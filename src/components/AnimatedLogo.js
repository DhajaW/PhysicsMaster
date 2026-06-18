export default function AnimatedLogo() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      
      {/* මැද තියෙන සූර්යයා / න්යෂ්ටිය (Nucleus) */}
      <div className="absolute w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.9)] z-10"></div>
      
      {/* 1 වෙනි කක්ෂය (Blue Planet) */}
      <div className="absolute w-11 h-3 border border-blue-500/40 rounded-[50%] animate-[spin_3s_linear_infinite]">
        <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* 2 වෙනි කක්ෂය (Emerald Planet) */}
      <div className="absolute w-11 h-3 border border-emerald-500/40 rounded-[50%] animate-[spin_4s_linear_infinite] rotate-[60deg]">
        <div className="absolute top-1/2 right-0 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399] translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* 3 වෙනි කක්ෂය (Purple Planet) */}
      <div className="absolute w-11 h-3 border border-purple-500/40 rounded-[50%] animate-[spin_5s_linear_infinite] rotate-[120deg]">
        <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_8px_#c084fc] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

    </div>
  );
}
