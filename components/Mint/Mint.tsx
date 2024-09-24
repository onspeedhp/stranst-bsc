'use client';
import React, { useEffect, useState } from 'react';
import { StarBuyBtn } from '../Icon';
import styles from './mint.module.css';
import clsx from 'clsx';
import MintDialog from './MintDialog';
import axios from 'axios';
// import { useTonWallet } from '@tonconnect/ui-react';

export default function Mint() {
  // const wallet = useTonWallet();
  const [outOfStock, setOutOfStock] = useState(false);
  const [minted, setMinted] = useState(false);

  // const checkMinted = async (walletAddress: string) => {
  //   try {
  //     const { data } = await axios.post('/api/checkMinted', { walletAddress });
  //     setMinted(data.isMinted);
  //   } catch (error) {
  //     console.error('Error checking minted status:', error);
  //   }
  // };

  const checkOutOfStock = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/checkOutOfStock`);
      setOutOfStock(data.isOutOfStock);
    } catch (error) {
      console.error('Error checking out of stock status:', error);
    }
  };

  // useEffect(() => {
  //   if (wallet?.account) {
  //     const walletAddress = wallet.account.address;
  //     checkMinted(walletAddress);
  //   }
  // }, [wallet]);

  useEffect(() => {
    checkOutOfStock();
  }, []);

  return (
    <>
      {minted ? (
        <p className="text-[18px] leading-7 font-semibold text-slate-50">
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
                className="w-full h-full rounded-[35px] flex items-center justify-center gap-2"
                style={{
                  background:
                    'linear-gradient(90deg, #9747FF 0%, #EA1187 100%)',
                }}
              >
                <StarBuyBtn />
                <p className="text-[18px] leading-7 font-semibold text-white">
                  Out Of Stock
                </p>
              </div>
            </div>
          ) : (
            <MintDialog setMinted={setMinted}/>
          )}
        </>
      )}
    </>
  );
}
