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
import { BrowserProvider, Contract, ethers } from 'ethers';
import { useCollectionContract, useTokenContract } from '@/hooks/useContract';
import {
  BASE_PRICE,
  NFT_CONTRACT_ADDRESS,
  TOTAL_SELLING_NFT,
} from '@/constant';

export default function MintDialog({
  setMinted,
}: {
  setMinted: (value: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');

  const handleSubmit = async (submitData: {
    amount: number;
    total: number;
  }) => {
    try {
      setLoading(true);
      if (!isConnected || !address) throw Error('User disconnected');

      const ethersProvider = new BrowserProvider(walletProvider as any);

      const signer = await ethersProvider.getSigner();

      if (!isApproved) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const tokenContract = useTokenContract(signer);

        const decimals = ethers.toNumber(await tokenContract.decimals());

        // Call the approveAndEmit function to emit the TokensApproved event
        const approveTx = await tokenContract.approve(
          NFT_CONTRACT_ADDRESS,
          BigInt(submitData.amount * BASE_PRICE * 10 ** decimals)
        );

        await approveTx.wait();

        console.log('Tokens approved for minting NFTs:', approveTx);

        setIsApproved(true);
      } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const nftContract = useCollectionContract(signer);

        const ref = searchParams.get('ref');
        let refId = TOTAL_SELLING_NFT;

        if (ref) {
          const addressRef = await nftContract.ownerOf(ref);
          if (addressRef !== address) {
            refId = Number(ref);
          }
        }

        const mintNftTx = await nftContract.createEdaNFT(
          submitData.amount,
          signer.address.toString(),
          BigInt(refId)
        );

        await mintNftTx.wait();
        console.log('Mint NFT');

        setIsSuccess(true);
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
      {!address ? (
        <div className='w-fit' onClick={() => {}}>
          <w3m-button />
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
                <p className='text-[18px] leading-7 font-semibold text-white'>
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
                <DialogClose className='lg:hidden outline-none p-2'>
                  <ArrowLeft size={24} />
                </DialogClose>
                <MintBuy
                  submitData={handleSubmit}
                  loading={loading}
                  isApproved={isApproved}
                />
              </div>
            ) : (
              <MintSuccess isSuccess={isSuccess} />
            )}
            {isSuccess !== null && (
              <DialogClose className='lg:hidden mb-5 outline-none'>
                <div className='flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] rounded-xl'>
                  <ArrowLeft />
                  <p className='font-semibold text-white'>Back to Homepage</p>
                </div>
              </DialogClose>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
