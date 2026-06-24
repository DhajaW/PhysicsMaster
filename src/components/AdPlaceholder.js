'use client';

import React, { useEffect, useState } from 'react';

export default function AdPlaceholder({ slotId, format = 'auto', type = 'banner', className = '' }) {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    // Safely retrieve from process.env on client mount
    setClientId(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || null);
  }, []);

  useEffect(() => {
    if (clientId) {
      try {
        // Trigger Google AdSense script push
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    }
  }, [clientId]);

  // Height and dimensions depending on ad type
  const heightClasses = 
    type === 'banner' ? 'h-[90px] w-full' :
    type === 'square' ? 'h-[250px] w-[250px] sm:w-[300px] sm:h-[250px]' :
    type === 'vertical' ? 'h-[600px] w-[160px]' : 'min-h-[100px] w-full';

  const containerClasses = className || 'my-6 mx-auto';

  // If client ID is missing, show a clean, dotted placeholder box for AdSense review/development layout
  if (!clientId) {
    return (
      <div className={`${containerClasses} flex items-center justify-center border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 rounded-xl select-none p-4 max-w-full ${heightClasses}`}>
        <div className="text-center font-sans">
          <p className="text-xs font-bold tracking-wider uppercase text-slate-400/80">ප්‍රචාරක දැන්වීම් සඳහා ඉඩක්</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Google AdSense Space ({type})</p>
        </div>
      </div>
    );
  }

  // If client ID is present, render the real AdSense tag
  return (
    <div className={`${containerClasses} flex justify-center overflow-hidden max-w-full`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', overflow: 'hidden' }}
        data-ad-client={clientId}
        data-ad-slot={slotId || 'auto'}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
