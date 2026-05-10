'use client';

import { useState, useEffect } from 'react';
import { CONTACT } from '@/lib/config';

type ConfigData = {
  whatsapp: string;
  whatsapp_display: string;
  email: string;
  instagram: string;
  address: string;
  operational_hours: string;
  whatsapp_template?: string;
};

export function useCompanyConfig() {
  const [config, setConfig] = useState<ConfigData>({
    whatsapp: CONTACT.whatsapp,
    whatsapp_display: CONTACT.whatsappDisplay,
    email: CONTACT.email,
    instagram: '',
    address: CONTACT.address,
    operational_hours: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.aji-institute.com';
        const res = await fetch(`${API_BASE}/api/cms/config/`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.whatsapp) {
            setConfig(json);
          }
        }
      } catch (error) {
        console.error('Failed to fetch CMS config:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchConfig();
  }, []);

  // Global override for WA links using event delegation
  useEffect(() => {
    if (!config) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('https://wa.me/')) {
        e.preventDefault();
        const url = new URL(href);
        
        // Update number if different
        if (config.whatsapp && config.whatsapp !== CONTACT.whatsapp) {
          url.pathname = `/${config.whatsapp}`;
        }

        // Apply template if exists
        if (config.whatsapp_template) {
          const division = 'AjiStat by Aji Institute';
          let contextMsg = "Saya tertarik untuk mendapatkan informasi lebih lanjut terkait layanan yang tersedia.";
          const originalText = url.searchParams.get('text') || '';
          
          if (originalText.trim() !== '') {
            let extracted = originalText.trim();
            if (extracted.toLowerCase().startsWith('halo')) {
              const commaIndex = extracted.indexOf(',');
              if (extracted.indexOf(',') !== -1) {
                extracted = extracted.substring(commaIndex + 1).trim();
              } else {
                extracted = extracted.replace(/^Halo\s+(?:\w+\s+){0,2}/i, '').trim();
              }
            }
            if (extracted.toLowerCase().startsWith('saya ')) {
              extracted = extracted.substring(5).trim();
            }
            contextMsg = 'Saya ' + extracted.charAt(0).toLowerCase() + extracted.slice(1);
          }

          let finalMessage = config.whatsapp_template.replace(/{divisi}/g, division);
          if (!finalMessage.includes('{konteks}')) {
            finalMessage = finalMessage.replace(/Berikut data saya/i, `${contextMsg}\n\nBerikut data saya`);
          } else {
            finalMessage = finalMessage.replace(/{konteks}/g, contextMsg);
          }
          
          url.searchParams.set('text', finalMessage);
        }

        window.open(url.toString(), anchor.getAttribute('target') || '_self');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [config.whatsapp, config.whatsapp_template]);

  return { config, isLoading };
}
