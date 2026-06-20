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

    // Read Google Translate Cookie to determine active language
    const getTranslateCookie = () => {
      const name = 'googtrans';
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    };

    const cookieVal = getTranslateCookie();
    if (cookieVal && cookieVal.includes('/en')) {
      setCurrentLang('en');
    } else {
      setCurrentLang('si');
    }
  }, []);

  const toggleLanguage = () => {
    if (currentLang === 'si') {
      // Set translate to English
      document.cookie = "googtrans=/si/en; path=/";
      document.cookie = "googtrans=/si/en; path=/; domain=" + window.location.hostname;
      window.location.reload();
    } else {
      // Clear translate cookie to revert to Sinhala
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      window.location.reload();
    }
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleLanguage}
      className="notranslate fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex items-center gap-2 px-3.5 py-2 bg-white/90 hover:bg-white border border-slate-200 shadow-md hover:shadow-lg text-slate-700 font-bold text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md rounded-full"
      title={currentLang === 'si' ? 'Translate to English' : 'සිංහලට හරවන්න'}
    >
      <Globe className="w-4 h-4 text-blue-600 animate-[spin_10s_linear_infinite]" />
      <span>{currentLang === 'si' ? 'English' : 'සිංහල'}</span>
    </button>
  );
}
