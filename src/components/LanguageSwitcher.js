'use client';

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('si');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service Worker registered:', reg.scope))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }

    // Check if English translation is active in any cookie
    const isEnglishActive = () => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const c = cookies[i].trim();
        if (c.startsWith('googtrans=')) {
          const val = c.substring('googtrans='.length);
          if (val.includes('/en')) {
            return true;
          }
        }
      }
      return false;
    };

    if (isEnglishActive()) {
      setCurrentLang('en');
    } else {
      setCurrentLang('si');
    }
  }, []);

  const toggleLanguage = () => {
    // Helper to delete all possible cookie domains to avoid duplicates
    const deleteCookie = (name) => {
      const host = window.location.hostname;
      const hostParts = host.split('.');
      
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
      
      let tempPart = '';
      for (let i = hostParts.length - 1; i >= 0; i--) {
        tempPart = hostParts[i] + (tempPart ? '.' + tempPart : '');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${tempPart};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${tempPart};`;
      }
    };

    // Clean up any old duplicate cookies
    deleteCookie('googtrans');

    if (currentLang === 'si') {
      // Set translate to English
      const host = window.location.hostname;
      document.cookie = "googtrans=/si/en; path=/;";
      document.cookie = "googtrans=/si/en; path=/; domain=." + host + ";";
      document.cookie = "googtrans=/si/en; path=/; domain=" + host + ";";
    }

    window.location.reload();
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleLanguage}
      className="notranslate fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-white border border-slate-200 shadow-md hover:shadow-lg text-slate-700 text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md rounded-full font-bold select-none"
      title={currentLang === 'si' ? 'Translate to English' : 'සිංහලට හරවන්න'}
    >
      <Globe className="w-4 h-4 text-blue-600 animate-[spin_12s_linear_infinite]" />
      <span className={currentLang === 'si' ? 'text-blue-600 font-extrabold' : 'text-slate-400 font-normal'}>සිංහල</span>
      <span className="text-slate-300 font-normal">|</span>
      <span className={currentLang === 'en' ? 'text-blue-600 font-extrabold' : 'text-slate-400 font-normal'}>English</span>
    </button>
  );
}
