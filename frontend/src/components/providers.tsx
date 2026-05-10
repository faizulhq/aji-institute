'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

function getQueryClient() {
  const config = {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,   // data dianggap fresh selama 5 menit
        gcTime:    1000 * 60 * 30,  // data di cache selama 30 menit
        retry: 1,
      },
    },
  };

  if (typeof window === 'undefined') {
    return new QueryClient(config);
  } else {
    if (!(window as any)._queryClient) {
      (window as any)._queryClient = new QueryClient(config);
    }
    return (window as any)._queryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
