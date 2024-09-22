import React from 'react';
import Header from './Header';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col flex-grow">
      <Image
        alt="main-bg"
        src="/image/main-bg.png"
        fill
        className="fixed left-0 top-0 -z-10 object-cover"
      />
      <Header />
      <div className="flex-1">{children}</div>
      <p className="w-full text-center mt-auto mb-8">
        <Link href="">Contact</Link> us to learn more about how to participate!
      </p>
    </div>
  );
}
