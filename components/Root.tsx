'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { PropsWithChildren } from 'react';

export function Root({ children }: PropsWithChildren) {
  return (
    <TonConnectUIProvider
      manifestUrl={`${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`}
    >
    {children}
    </TonConnectUIProvider>
  );
}
