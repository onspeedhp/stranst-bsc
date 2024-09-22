import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function TonBanner() {
  return (
    <div className="p-4 bg-gradient-to-r from-[#9A01CEB2] via-[#4E3BE0B2] to-[#43A1FFB2] relative">
      <p className="font-bold italic text-white">
        Strong Partnership - TON Blockchain
      </p>
      <p className="mt-1 mb-3 text-[12px] leading-5 text-slate-300 w-[75%]">
        STRANT partners with TON Blockchain – a leading blockchain platform
        renowned for its lightning-fast transaction speeds, high security, and
        limitless scalability.
      </p>
      <div className="flex items-center gap-2.5 pl-4 py-1 pr-1 bg-[#0F172A80] w-fit rounded-full">
        <p className="text-sm text-white">Learn More about TON Blockchain</p>
        <div className="p-1 bg-sky-500 rounded-full">
          <ChevronRight
            size={24}
            color="#F8FAFC"
          />
        </div>
      </div>
      <Image
        src="/image/ton.png"
        alt="ton"
        width={183}
        height={183}
        className='absolute right-0 bottom-0'
      />
    </div>
  );
}
