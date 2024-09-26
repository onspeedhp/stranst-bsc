import React from 'react';
import Mint from '../Mint/Mint';
import Benefit from '../Benefit/Benefit';
import TonBanner from '../TonBanner';
import BenefitDialog from '../Benefit/BenefitDialog';
import { BASE_PRICE } from '@/constant/baseprice';

const HeadingContent = () => (
  <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-3">
    <p className="bg-gradient-to-r from-[#9747FF] to-[#EA1187] lg:text-[18px] font-semibold leading-7 inline-block text-transparent bg-clip-text">
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
      <div className="lg:hidden">
        <BenefitDialog />
      </div>
      <div className="hidden lg:block">
        <Benefit />
        <div className="my-4">
          <TonBanner />
        </div>
      </div>
      <div className="mt-10 mb-24 lg:hidden">
        <div className="flex items-center justify-center relative">
          <img
            src="/image/nft/nft-image.png"
            alt="nft"
            className="w-[80%]"
          />
          <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-l from-[#34205E66] to-[#815F9199] p-4 rounded-xl border border-[#F8FAFC] min-w-[183px]">
              <p className="text-center text-slate-50">Price</p>
              <p className="text-center font-semibold bg-gradient-to-r from-[#A2ADB9] via-[#F8FAFC] to-[#99A6B2] text-transparent bg-clip-text mt-2 text-[30px] leading-[36px]">
                {BASE_PRICE} USDT
              </p>
              <div className="absolute py-1 px-3 bottom-[-14px] rounded-[2px] bg-gradient-to-r from-[#171D41] to-[#4C1AB6]">
                <p className="font-semibold leading-5 tracking-[-0.6%]">
                  ONLY 12 LEFT!!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mint />
    </div>
  );
}
