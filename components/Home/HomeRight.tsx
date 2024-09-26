import React from 'react';
import Mint from '../Mint/Mint';
import Benefit from '../Benefit/Benefit';
import TonBanner from '../TonBanner';
import BenefitDialog from '../Benefit/BenefitDialog';
import { ChevronRight } from 'lucide-react';
import NFT from '../NFT/NFT';

const HeadingContent = () => (
  <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-3">
    <p className="bg-gradient-to-r from-[#9747FF] to-[#EA1187] text-sm lg:text-[18px] font-semibold lg:leading-7 inline-block text-transparent bg-clip-text">
      {`A Golden Opportunity to Own STRANT's First NFT!`}
    </p>
    <p className="text-[30px] leading-[36px] font-extrabold tracking-[-0.75%] text-white">
      Strant VIP Pass
    </p>
    <p className="hidden lg:block text-[12px] leading-5 text-slate-300">
      Seize this special chance to become one of the first owners of the STRANT
      VIP Pass, opening the door to a modern blockchain ecosystem and bringing
      exceptional benefits to you!
    </p>
  </div>
);

export default function HomeRight() {
  return (
    <div className="flex flex-col items-center lg:block">
      <HeadingContent />
      <div className=" hidden lg:block relative my-4 h-[1px]">
        <div className="absolute top-0 bottom-0 bg-slate-600 -left-4 -right-4" />
      </div>
      <div className="lg:hidden w-full">
        <div className="flex justify-center">
          <BenefitDialog />
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#9A01CEB2] via-[#4E3BE0B2] to-[#43A1FFB2] rounded-lg">
            <p className="text-sm font-semibold italic text-white">
              Strong Partnership - TON Blockchain
            </p>
            <ChevronRight
              size={24}
              color="white"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Benefit />
        <div className="my-4">
          <TonBanner />
        </div>
      </div>
      <div className="lg:hidden">
        <NFT />
      </div>
      <Mint />
    </div>
  );
}
