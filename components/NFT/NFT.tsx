'use client';
import { BASE_PRICE } from '@/constant/baseprice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NftImage = ({ src, className, children }: { src: string; className: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-center relative">
    <img src={src} alt="nft" className={className} />
    {children}
  </div>
);

const PriceCard = ({ maxbuy }: { maxbuy: number }) => (
  <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
    <div className="bg-gradient-to-l from-[#34205E66] to-[#815F9199] p-4 rounded-xl border border-[#F8FAFC] min-w-[183px]">
      <p className="text-center text-slate-50">Price</p>
      <p className="text-center font-semibold text-slate-50 mt-2 text-[30px] leading-[36px]">
        {BASE_PRICE} USDT
      </p>
      <div className="absolute py-1 bottom-[-14px] left-2 right-2 rounded-[2px] bg-gradient-to-r from-[#171D41] to-[#4C1AB6]">
        <p className="font-semibold leading-5 tracking-[-0.6%] text-center text-white">ONLY {maxbuy} LEFT!!!</p>
      </div>
    </div>
  </div>
);

export default function NFT() {
  const [maxbuy, setMaxbuy] = useState(1000);

  const getMax = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/totalbuy`);
      setMaxbuy((Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000) - Number(data.totalBuy));
    } catch (error) {
      console.error('Error checking max buy:', error);
    }
  };

  useEffect(() => {
    getMax();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <NftImage src="/image/nft/nft.gif" className="h-[35vw] xl:h-[30vw]">
          <PriceCard maxbuy={maxbuy} />
        </NftImage>
      </div>
      <div className="block lg:hidden">
        <div className="mt-10 mb-24">
          <NftImage src="/image/nft/nft.gif" className="w-[80%]">
            <PriceCard maxbuy={maxbuy} />
          </NftImage>
        </div>
      </div>
    </>
  );
}
