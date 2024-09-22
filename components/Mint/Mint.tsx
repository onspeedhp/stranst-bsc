'use client';
import React, { useState } from 'react';
import { StarBuyBtn } from '../Icon';
import styles from './mint.module.css';
import clsx from 'clsx';

export default function Mint() {
  const [outOfStock] = useState(false);
  const [buyed] = useState(false);
  return (
    <>
      {buyed ? (
        <p className="text-[18px] leading-7 font-semibold text-slate-50">
          Congratulation! You’re one of the Strant VIP Pass holder.
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
            <div className={clsx(styles['glow-btn'])}>
              <div className={styles['btn-glow']} />
              <div className={clsx('flex items-center gap-2', styles['btn'])}>
                <StarBuyBtn />
                <p className="text-[18px] leading-7 font-semibold text-white">
                  Buy Now
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
