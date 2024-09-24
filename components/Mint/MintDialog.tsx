import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import clsx from 'clsx';
import styles from './mint.module.css';
import { StarBuyBtn } from '../Icon';
import Image from 'next/image';
import MintCounter from './MintCouter';
import MintBuy from './MintBuy';
import MintSuccess from './MintDone';
import axios from 'axios';

export default function MintDialog() {
  const [isSuccess,setIsSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (submitData: {amount: number; total: number}) => {
    try {
      // TODO: replace walletaddress
        await axios.post('/api/mint',{
          ...submitData,
          walletAddress: '123'
        });
        setIsSuccess(true)
      } catch (error) {
        console.error('Error update data:', error);
        setIsSuccess(false)
      }
  }

  return (
    <Dialog onOpenChange={()=>setIsSuccess(null)}>
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
      <DialogContent
        className={clsx(
          'bg-[#171D41] max-w-[704px] border-none rounded-xl overflow-y-auto',
          { 'max-w-[406px] pb-0': isSuccess !== null }
        )}
      >
        {isSuccess === null ? (
          <MintBuy submitData={handleSubmit}/>
        ) : (
          <MintSuccess isSuccess={isSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
