import Image from 'next/image';
import React from 'react';

export default function HomeLeft() {
  return (
    <div className="flex items-center justify-center relative">
      <img
        src="/image/nft/nft-image.png"
        alt="nft"
        className="max-w-[485px] max-h-[671px] h-[35vw] xl:h-[30vw] 2xl:h-[35vw]"
      />
      <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-l from-[#34205E66] to-[#815F9199] p-4 rounded-xl border border-[#F8FAFC]">
          <p className="text-center text-slate-50">Price</p>
          <p className="text-center font-semibold text-slate-50 mt-2 text-[30px] leading-[36px]">
            100 USDT
          </p>
          <div className="absolute py-1 px-3 bottom-[-14px] rounded-[2px] bg-gradient-to-r from-[#171D41] to-[#4C1AB6]">
            <p className="font-semibold leading-5 tracking-[-0.6%]">
              ONLY 12 LEFT!!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
