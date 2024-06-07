"use client";
import { PropsWithChildren, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/trpc/client';
import { httpBatchLink } from '@trpc/client';
import { DehydratedState } from '@tanstack/react-query';

interface PageProps {
  dehydratedState?: DehydratedState;
}

const Providers = ({ children, pageProps }: PropsWithChildren<{ pageProps?: PageProps }>) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState || {}}>
          {children}
        </Hydrate>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
