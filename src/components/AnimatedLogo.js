export default function AnimatedLogo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer w-fit">
      {/* Icon Section (The Graphic) */}
      <div className="relative p-1.5 bg-slate-900/60 border border-slate-800 rounded-xl shadow-inner shadow-cyan-500/5 group-hover:border-cyan-500/30 group-hover:shadow-cyan-500/10 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-8 h-8 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan 400 */}
              <stop offset="50%" stopColor="#3b82f6" /> {/* Blue 500 */}
              <stop offset="100%" stopColor="#a855f7" /> {/* Purple 500 */}
            </linearGradient>
          </defs>
          
          {/* Atom Orbits */}
          <ellipse cx="35" cy="50" rx="11" ry="32" transform="rotate(35 35 50)" fill="none" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="35" cy="50" rx="11" ry="32" transform="rotate(-35 35 50)" fill="none" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="35" cy="50" rx="11" ry="32" transform="rotate(90 35 50)" fill="none" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" />

          {/* Electrons (little orbit dots) */}
          <circle cx="35" cy="18" r="3.5" fill="#22d3ee" />
          <circle cx="17" cy="62" r="3.5" fill="#a855f7" />
          
          {/* Nucleus */}
          <circle cx="35" cy="50" r="5.5" fill="url(#logo-grad)" />

          {/* The Letter P */}
          <path
            d="M 68 25 L 68 75 M 68 25 C 83 25, 93 35, 93 47.5 C 93 60, 83 60, 68 60"
            fill="none"
            stroke="url(#logo-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
      </div>

      {/* Text Section (Typography) */}
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight leading-none">
          PhysicsMaster
        </span>
        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.25em] mt-1 transition-colors duration-300 group-hover:text-cyan-300">
          Advanced Level
        </span>
      </div>
    </div>
  );
}
