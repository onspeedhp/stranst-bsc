/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, formatUnits } from 'ethers';

export default function MintDialog({
  setMinted,
}: {
  setMinted: (value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  // TODO: setisapproved when approved and setisSuccess when all done
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');

  const handleSubmit = async (submitData: {
    amount: number;
    total: number;
  }) => {
    try {
      setLoading(true);
      if (!isConnected) throw Error('User disconnected');

      // const { data } = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_URL}/totalbuy`
      // );
      // if (
      //   Number(data.totalBuy) >=
      //   (Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000)
      // ) {
      //   Sentry.captureException('out of stock');
      //   throw new Error('out of stock');
      // }
      // if (
      //   submitData.amount >
      //   (Number(process.env.NEXT_PUBLIC_TOTAL_NFTS) || 2000) -
      //     Number(data.totalBuy)
      // ) {
      //   Sentry.captureException('over buy');
      //   throw new Error('over buy');
      // }
      const ref = searchParams.get('ref');
      console.log(ref);

      console.log('Here');

      const totalBuy = 1;

      const nftContractAddress = '0x6F9738F401527695E8E8359692A4B9dbFbBf29Cd';
      const nftAbi = [
        'event TokensApproved(address indexed owner, uint256 amount, uint256 quantity)',
        'function approveAndEmit(uint256 quantity) public',
      ];

      const bscTestnet = {
        name: 'BSC Testnet',
        chainId: 97, // BSC Testnet chain ID
        ensAddress: undefined, // BSC does not use ENS, so this can be left as undefined
        ensNetwork: undefined, // Also not required for BSC
      };

      const ethersProvider = new BrowserProvider(
        walletProvider as any,
        bscTestnet
      );

      const signer = await ethersProvider.getSigner();

      const nftContract = new Contract(nftContractAddress, nftAbi, signer);

      try {
        // Call the approveAndEmit function to emit the TokensApproved event
        const approveTx = await nftContract.approveAndEmit(totalBuy);
        await approveTx.wait();
        console.log('Tokens approved for minting NFTs:', approveTx);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/mint`, {
          ...submitData,
          ref: ref && ref !== address ? ref : null,
          walletAddress: address,
        });
        setIsSuccess(true);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error update data:', error);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {false ? (
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
              'bg-[#101111] blur-[100] max-w-[704px] border-none rounded-none lg:rounded-xl overflow-y-auto h-full lg:h-auto',
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
                  isApproved={isApproved}
                />
              </div>
            ) : (
              <MintSuccess isSuccess={true} />
            )}
            {isSuccess !== null && (
              <DialogClose className="lg:hidden mb-5 outline-none">
                <div className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] rounded-xl">
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
