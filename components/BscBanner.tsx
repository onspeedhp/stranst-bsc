import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function BscBanner() {
  return (
    <div
      className="p-3 rounded-xl bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] relative"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <p className="font-bold italic text-white">
        Strong Partnership - BSC Blockchain
      </p>
      <p className="mt-1 mb-3 text-[12px] leading-5 text-slate-300 w-[75%]">
        STRANT operates on BSC blockchain – a leading blockchain platform
        renowned for its lightning-fast transaction speeds, high security, and
        limitless scalability.
      </p>
      <div
        className="flex items-center gap-2.5 pl-4 py-1 pr-1 bg-[#0F172A80] w-fit rounded-full cursor-pointer"
        onClick={() =>
          window.open('https://www.bnbchain.org/en/bnb-smart-chain', '_blank')
        }
      >
        <p className="text-sm text-white">Learn More about BSC Blockchain</p>
        <div className="p-1 bg-sky-500 rounded-full">
          <ChevronRight
            size={24}
            color="#F8FAFC"
          />
        </div>
      </div>
      <Image
        src="/image/bsc-token.png"
        alt="bsc-token"
        width={250}
        height={250}
        className="absolute right-0 bottom-0 h-full"
      />
    </div>
  );
}
