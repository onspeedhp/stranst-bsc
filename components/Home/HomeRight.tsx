import React from 'react';
import { StarBuyBtn } from '../Icon';
import Mint from '../Mint/Mint';
import Benefit from '../Benefit/Benefit';
import TonBanner from '../TonBanner';

const HeadingContent = () => (
  <div className="flex flex-col gap-3">
    <p className="bg-gradient-to-r from-[#9747FF] to-[#EA1187] text-[18px] font-semibold leading-7 inline-block text-transparent bg-clip-text">
      A Golden Opportunity to Own STRANT's First NFT!
    </p>
    <p className="text-[30px] leading-[36px] font-extrabold tracking-[-0.75%] text-white">
      Strant VIP Pass
    </p>
    <p className="text-[12px] leading-5 text-slate-300">
      Seize this special chance to become one of the first owners of the STRANT
      VIP Pass, opening the door to a modern blockchain ecosystem and bringing
      exceptional benefits to you!
    </p>
  </div>
);

export default function HomeRight() {
  return (
    <div>
      <HeadingContent />
      <div className="relative my-4 h-[1px]">
        <div className="absolute top-0 bottom-0 bg-slate-600 -left-4 -right-4" />
      </div>
      <Benefit/>
      <div className='my-4'>
      <TonBanner/>
      </div>
      <Mint />
    </div>
  );
}
