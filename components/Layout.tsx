import React from 'react';
import Header from './Header';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen px-4 xl:px-0 min-h-screen xl:overflow-hidden flex flex-col flex-grow">
      <Image
        alt="main-bg"
        src="/image/bg-img.png"
        fill
        className="fixed left-0 top-0 right-0 -z-10"
      />
      <Header />
      <div className="flex-1">{children}</div>
      <p className="w-full text-center mt-auto mb-8 text-slate-400">
        <Link href="">Contact us</Link> to learn more about how to participate!
      </p>
    </div>
  );
}
