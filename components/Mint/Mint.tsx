'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { StarBuyBtn } from '../Icon';
import styles from './mint.module.css';
import clsx from 'clsx';
import MintDialog from './MintDialog';
import { useCollectionContract } from '@/hooks/useContract';
import { TOTAL_SELLING_NFT } from '@/constant';

export default function Mint() {
  const [outOfStock, setOutOfStock] = useState(false);
  const [minted, setMinted] = useState(false);

  const checkOutOfStock = async () => {
    try {
      const nftContract = useCollectionContract();
      const totalMinted = await nftContract.getTotalMinted();

      setOutOfStock(Number(totalMinted) === TOTAL_SELLING_NFT);
    } catch (error) {
      console.error('Error checking out of stock status:', error);
    }
  };

  useEffect(() => {
    checkOutOfStock();
  }, []);

  return (
    <Suspense>
      {minted ? (
        <p className='text-[18px] leading-7 font-semibold text-slate-50'>
          Congratulations! You’re one of the Strant VIP Pass holders.
        </p>
      ) : (
        <>
          {outOfStock ? (
            <div
              className={clsx(
                styles['out-of-stock'],
                'opacity-50 pointer-events-none'
              )}
            >
              <div
                className='w-full h-full rounded-[35px] flex items-center justify-center gap-2'
                style={{
                  background:
                    'linear-gradient(90deg, #9747FF 0%, #EA1187 100%)',
                }}
              >
                <StarBuyBtn />
                <p className='text-[18px] leading-7 font-semibold text-white'>
                  Out Of Stock
                </p>
              </div>
            </div>
          ) : (
            <MintDialog setMinted={setMinted} />
          )}
        </>
      )}
    </Suspense>
  );
}
