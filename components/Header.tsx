import Image from 'next/image';
import React from 'react';
import Ref from './Ref/Ref';
import Wallet from './Wallet';

export default function Header() {
  return (
    <div className="container mx-auto py-6 flex items-center justify-between">
      <Image
        alt="main-logo"
        src="/image/logo.png"
        width="168"
        height="70"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="flex items-center gap-3">
        <Ref />
        <Wallet />
      </div>
    </div>
  );
}
