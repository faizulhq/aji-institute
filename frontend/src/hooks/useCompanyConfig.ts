import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';
import { CONTACT } from '@/lib/config';
import { useEffect } from 'react';

export function useCompanyConfig() {
  const query = useQuery({
    queryKey: ['cms', 'config'],
    queryFn: async () => {
      const res = await cmsApi.config();
      return res.data;
    },
    staleTime: 1000 * 60 * 60, // cache 1 jam
  });

  const config = query.data || {
    whatsapp: CONTACT.whatsapp,
    whatsapp_display: CONTACT.whatsappDisplay,
    email: CONTACT.email,
    instagram: CONTACT.instagram,
    address: CONTACT.address,
    operational_hours: CONTACT.operationalHours,
  };

  // Global override for WA links
  useEffect(() => {
    if (query.data && query.data.whatsapp !== CONTACT.whatsapp) {
      document.querySelectorAll(`a[href^="https://wa.me/${CONTACT.whatsapp}"]`).forEach(el => {
        const anchor = el as HTMLAnchorElement;
        const url = new URL(anchor.href);
        url.pathname = `/${query.data.whatsapp}`;
        anchor.href = url.toString();
      });
    }
  }, [query.data]);

  return { ...query, config };
}
