'use client';

import React from 'react';
import Header from './Header';
import Image from 'next/image';
import Link from 'next/link';

import { PropsWithChildren } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { bscTestnet, bsc } from '@reown/appkit/networks';

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

// 2. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: process.env.NEXT_PUBLIC_APP_URL!, // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/'],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [bscTestnet, bsc],
  projectId,
  features: {
    email: false,
    socials: false,
  },
  enableWalletConnect: true,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative w-screen px-4 xl:px-0 min-h-screen xl:overflow-hidden flex flex-col flex-grow'>
      <Image
        alt='main-bg'
        src='/image/bg-img.png'
        fill
        className='fixed left-0 top-0 right-0 -z-10'
      />
      <Header />
      <div className='flex-1'>{children}</div>
      <p className='w-full text-center mt-auto mb-8 text-slate-400'>
        <Link href=''>Contact us</Link> to learn more about how to participate!
      </p>
    </div>
  );
}
