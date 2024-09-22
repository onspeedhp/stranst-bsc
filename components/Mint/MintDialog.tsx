import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import clsx from 'clsx';
import styles from './mint.module.css';
import { StarBuyBtn } from '../Icon';
import Image from 'next/image';
import MintCounter from './MintCouter';

export default function MintDialog() {
  const [amount, setAmount] = useState(1);
  const BASE_PRICE = 100;
  return (
    <Dialog>
      <DialogTrigger aria-hidden={false}>
        <div className={clsx(styles['glow-btn'])}>
          <div className={styles['btn-glow']} />
          <div className={clsx('flex items-center gap-2', styles['btn'])}>
            <StarBuyBtn />
            <p className="text-[18px] leading-7 font-semibold text-white">
              Buy Now
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#171D41] max-w-[704px] border-none rounded-xl overflow-y-auto">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Image
              src="/image/nft/nft-image-2.png"
              alt="nft-image"
              width={278}
              height={344}
            />
          </div>
          <div>
            <p className="text-[30px] leading-[36px] tracking-[-0.75%] font-semibold text-white">
              <span className="text-xl tracking-[-0.6%]">Purchasing</span> NFT
              VIP Pass - 1st Edition
            </p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.5%] bg-gradient-to-r from-[#A2ADB9] via-[#F8FAFC] to-[#99A6B2] text-transparent bg-clip-text">
              100 USDT
            </p>
            <div className="mt-6 border-t border-slate-600 mb-6">
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Amount</p>
                  <MintCounter amount={amount} setAmount={setAmount}/>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-slate-400">Total</p>
                  <p className="text-[18px] leading-7 font-semibold text-white">
                    {(amount * BASE_PRICE).toLocaleString()} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-l from-[#9747FF] to-[#EA1187] rounded-xl py-2.5 text-center text-[18px] leading-7 font-semibold text-white cursor-pointer hover:opacity-80">
              Countinue
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
