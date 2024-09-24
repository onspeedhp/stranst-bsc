import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import clsx from 'clsx';
import styles from './mint.module.css';
import { StarBuyBtn } from '../Icon';
import Image from 'next/image';
import MintCounter from './MintCouter';
import MintBuy from './MintBuy';
import MintSuccess from './MintDone';

export default function MintDialog() {
  const [isSuccess] = useState<boolean | null>(null);

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
      <DialogContent
        className={clsx(
          'bg-[#171D41] max-w-[704px] border-none rounded-xl overflow-y-auto',
          { 'max-w-[406px] pb-0': isSuccess !== null }
        )}
      >
        {isSuccess === null ? (
          <MintBuy />
        ) : (
          <MintSuccess isSuccess={isSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
