import React from 'react';
import { StarBuyBtn } from '../Icon';
import styles from './mint.module.css';
import clsx from 'clsx';

export default function Mint() {
  return (
    <div className={clsx(styles['glow-btn'])}>
      <div className={styles['btn-glow']} />
      <div className={clsx('flex items-center gap-2', styles['btn'])}>
        <StarBuyBtn />
        <p className="text-[18px] leading-7 font-semibold text-white">
          Buy Now
        </p>
      </div>
    </div>
  );
}
