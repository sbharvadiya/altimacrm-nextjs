'use client';
// components/ClientInit.tsx
// Initializes WOW.js animations and UTM/session tracking on mount

import { useEffect } from 'react';
import { captureUTMParams, initSessionIntelligence } from '@/lib/tracking';

export default function ClientInit() {
  useEffect(() => {
    // Capture UTM params and init session tracking
    captureUTMParams();
    initSessionIntelligence();

    // Set form_start_time fields
    const timeFields = document.querySelectorAll<HTMLInputElement>('[id^="form_start_time"]');
    timeFields.forEach((el) => {
      el.value = String(Date.now());
    });

    // Load WOW.js dynamically and init
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js';
    script.onload = () => {
      const WOW = (window as any).WOW;
      if (WOW) {
        new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 100,
          mobile: true,
          live: true,
        }).init();
      }
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
