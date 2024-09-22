import React from 'react';
import Header from './Header';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        alt="main-bg"
        src="/image/main-bg.png"
        fill
        className="fixed left-0 top-0 -z-10 object-cover"
      />
      <Header />
      {children}
    </div>
  );
}
