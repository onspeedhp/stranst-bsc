'use client';
import { BASE_PRICE } from '@/constant/baseprice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NftImage = ({
  src,
  className,
  children,
}: {
  src: string;
  className: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-center relative">
    <img
      src={src}
      alt="nft"
      className={className}
    />
    {children}
  </div>
);

const PriceCard = ({ maxbuy }: { maxbuy: number }) => (
  <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
    <div className="bg-gradient-to-l from-[#8237EA] to-[#098BA8] p-[1px] rounded-xl">
      <div className="bg-gradient-to-r from-[#077580] to-[#1C2F62] p-4 rounded-xl min-w-[183px]">
        <p className="text-center text-slate-50">Price</p>
        <p className="text-center font-semibold text-slate-50 mt-2 text-[30px] leading-[36px]">
          {BASE_PRICE} USDT
        </p>
        <div className="absolute py-1 bottom-[-28px] left-2 right-2 rounded-[2px] bg-gradient-to-b from-[#37BFEA] to-[#0B0F3F] rounded-xl">
          <p className="font-semibold leading-8 tracking-[-0.6%] text-center text-white">
            ONLY {maxbuy} LEFT!!!
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function NFT() {
  const [maxbuy, setMaxbuy] = useState(1000);

  const getMax = async () => {
    // TODO: get amount nft left
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/totalbuy`
      );
      setMaxbuy(
        (Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000) -
          Number(data.totalBuy)
      );
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
        <NftImage
          src="/image/nft/nft.gif"
          className="h-[35vw] xl:h-[30vw]"
        >
          <PriceCard maxbuy={maxbuy} />
        </NftImage>
      </div>
      <div className="block lg:hidden">
        <div className="mt-10 mb-24">
          <NftImage
            src="/image/nft/nft.gif"
            className="w-[80%]"
          >
            <PriceCard maxbuy={maxbuy} />
          </NftImage>
        </div>
      </div>
    </>
  );
}
