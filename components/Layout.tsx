'use client';

import React from 'react';
import Image from 'next/image';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { bscTestnet, bsc } from '@reown/appkit/networks';
import Header from './Header';
import Link from 'next/link';
import { useCountdown } from '@/hooks/useCountDown';

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

// 2. Create a metadata object
const metadata = {
  name: 'STRANT – Smart AI Assistant for Investment & Education 🤖💼',
  description:
    'STRANT is a pioneering platform that applies artificial intelligence (AI) to support both investors and educational institutions.',
  url: process.env.NEXT_PUBLIC_APP_URL!, // origin must match your domain & subdomain
  icons: [`${process.env.NEXT_PUBLIC_APP_URL!}/image/strant-og.jpg`],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  defaultNetwork:
    process.env.NEXT_PUBLIC_CLUSTER === 'testnet' ? bscTestnet : bsc,
  networks: [bscTestnet, bsc],
  projectId,
  features: {
    email: true,
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { shouldShowCountDown, isFetchedTime } = useCountdown();

  return (
    <div className="relative w-screen px-4 xl:px-0 overflow-y-hidden min-h-screen xl:overflow-hidden flex flex-col flex-grow">
      <Image
        alt="main-bg"
        src="/image/bg-img.png"
        fill
        className="fixed left-0 top-0 right-0 -z-10"
      />
      {!shouldShowCountDown && isFetchedTime && <Header />}
      <div className="flex-1">{children}</div>
      {!shouldShowCountDown && isFetchedTime && (
        <p className="w-full text-center mt-auto mb-8 text-slate-400">
          <Link href="">Contact us</Link> to learn more about how to
          participate!
        </p>
      )}
    </div>
  );
}
