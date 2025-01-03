/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MintCounter from './MintCouter';
import { BASE_PRICE, TOTAL_SELLING_NFT } from '@/constant';
import clsx from 'clsx';
import { getCollectionContract } from '@/hooks/useContract';

export default function MintBuy({
  submitData,
  loading,
  isApproved,
}: {
  submitData: ({ total, amount }: { total: number; amount: number }) => void;
  loading: boolean;
  isApproved: boolean;
}) {
  const [amount, setAmount] = useState(1);
  const [maxbuy, setMaxbuy] = useState(1);

  const getMax = async () => {
    try {
      const nftContract = getCollectionContract();
      const totalMinted = await nftContract.getTotalMinted();

      setMaxbuy(TOTAL_SELLING_NFT - Number(totalMinted));
    } catch (error) {
      console.error('Error checking max buy:', error);
    }
  };

  useEffect(() => {
    getMax();
  }, []);

  return (
    <div className='grid grid-cols1 lg:grid-cols-2 gap-8 items-center'>
      <div className='relative hidden lg:block'>
        <Image
          src='/image/nft/nft-image.png'
          alt='nft-image'
          width={278}
          height={366}
        />
      </div>
      <div>
        <p className='text-[24px] leading-[32px] tracking-[-0.75%] font-semibold text-white'>
          NFT VIP Pass - 1st Edition
        </p>
        <p className='mt-3 text-lg font-semibold tracking-[-0.5%] bg-gradient-to-r from-[#A2ADB9] via-[#F8FAFC] to-[#99A6B2] text-transparent bg-clip-text'>
          {BASE_PRICE} USDT
        </p>
        <Image
          src='/image/nft/nft-image.png'
          alt='nft-image'
          width={278}
          height={366}
          className='block lg:hidden mx-auto'
        />
        <div className='mt-6 border-t border-slate-600 mb-6'>
          <div className='pt-2'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-slate-400'>Amount</p>
              <div
                className={clsx({
                  'opacity-30 pointer-events-none': isApproved,
                })}
              >
                <MintCounter
                  isApproved={isApproved}
                  amount={amount}
                  setAmount={setAmount}
                  max={maxbuy}
                />
              </div>
            </div>
            <div className='flex items-center justify-between mt-3'>
              <p className='text-sm text-slate-400'>Total</p>
              <p className='text-[18px] leading-7 font-semibold text-white'>
                {(amount * BASE_PRICE).toLocaleString()} USDT
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => submitData({ amount, total: amount * BASE_PRICE })}
          className={clsx(
            'bg-gradient-to-l from-[#8237EA] to-[#098BA8] rounded-xl py-2.5 text-center text-[18px] leading-7 font-semibold text-white cursor-pointer hover:opacity-80',
            { 'opacity-50 pointer-events-none': loading }
          )}
        >
          {loading ? 'In progress...' : isApproved ? 'Mint NFT' : 'Approve'}
        </div>
      </div>
    </div>
  );
}
