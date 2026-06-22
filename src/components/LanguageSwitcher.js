'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ lang = 'si' }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLang = lang === 'si' ? 'en' : 'si';
    
    // Replace language prefix in the current pathname
    let newPath = pathname;
    if (pathname.startsWith('/si/')) {
      newPath = pathname.replace('/si/', `/${nextLang}/`);
    } else if (pathname === '/si') {
      newPath = `/${nextLang}`;
    } else if (pathname.startsWith('/en/')) {
      newPath = pathname.replace('/en/', `/${nextLang}/`);
    } else if (pathname === '/en') {
      newPath = `/${nextLang}`;
    } else {
      // Fallback if no prefix is matched
      newPath = `/${nextLang}${pathname}`;
    }
    
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="notranslate fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-white border border-slate-200 shadow-md hover:shadow-lg text-slate-700 text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md rounded-full font-bold select-none"
      title={lang === 'si' ? 'Translate to English' : 'සිංහලට හරවන්න'}
    >
      <Globe className="w-4 h-4 text-blue-600 animate-[spin_12s_linear_infinite]" />
      <span className={lang === 'si' ? 'text-blue-600 font-extrabold' : 'text-slate-400 font-normal'}>සිංහල</span>
      <span className="text-slate-300 font-normal">|</span>
      <span className={lang === 'en' ? 'text-blue-600 font-extrabold' : 'text-slate-400 font-normal'}>English</span>
    </button>
  );
}
