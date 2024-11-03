'use client';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';
import clsx from 'clsx';
import styles from './mint.module.css';
import { StarBuyBtn } from '../Icon';
import MintBuy from './MintBuy';
import MintSuccess from './MintDone';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Button from '../ui/Button';
import { ArrowLeft } from 'lucide-react';
import * as Sentry from '@sentry/react';

export default function MintDialog({
  setMinted,
}: {
  setMinted: (value: boolean) => void;
}) {
  const userFriendlyAddress = true;
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (submitData: {
    amount: number;
    total: number;
  }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/totalbuy`
      );
      if (
        Number(data.totalBuy) >=
        (Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000)
      ) {
        Sentry.captureException('out of stock');
        throw new Error('out of stock');
      }
      if (
        submitData.amount >
        (Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000) -
          Number(data.totalBuy)
      ) {
        Sentry.captureException('over buy');
        throw new Error('over buy');
      }
      const ref = searchParams.get('ref');
      console.log(ref);
      // await transferToken(submitData.total);
      // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/mint`, {
      //   ...submitData,
      //   ref: ref && ref !== userFriendlyAddress ? ref : null,
      //   walletAddress: userFriendlyAddress,
      // });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error update data:', error);
      Sentry.captureException(error);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!userFriendlyAddress ? (
        <div
          className="w-fit"
          onClick={() => {}}
        >
          <Button>
            <p className="text-white">Connect Wallet</p>
          </Button>
        </div>
      ) : (
        <Dialog
          onOpenChange={() => {
            if (isSuccess) {
              setMinted(true);
            }
            setIsSuccess(null);
          }}
        >
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
              'bg-[#171D41] max-w-[704px] border-none rounded-none lg:rounded-xl overflow-y-auto h-full lg:h-auto',
              {
                'w-full lg:max-w-[406px] pb-0 h-auto rounded-t-xl translate-x-0 translate-y-0 bottom-0 top-auto left-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:top-1/2 lg:left-1/2':
                  isSuccess !== null,
              }
            )}
          >
            {isSuccess === null ? (
              <div>
                <DialogClose className="lg:hidden outline-none p-2">
                  <ArrowLeft size={24} />
                </DialogClose>
                <MintBuy
                  submitData={handleSubmit}
                  loading={loading}
                />
              </div>
            ) : (
              <MintSuccess isSuccess={isSuccess} />
            )}
            {isSuccess !== null && (
              <DialogClose className="lg:hidden mb-5 outline-none">
                <div className="flex items-center justify-center gap-1.5 py-3 bg-[#0F172AD9] rounded-xl">
                  <ArrowLeft />
                  <p className="font-semibold text-white">Back to Homepage</p>
                </div>
              </DialogClose>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
