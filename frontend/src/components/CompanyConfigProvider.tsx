'use client';

import { useCompanyConfig } from '@/hooks/useCompanyConfig';

export function CompanyConfigProvider({ children }: { children: React.ReactNode }) {
  useCompanyConfig(); // This will trigger the useEffect for global WA link replacements
  return <>{children}</>;
}
