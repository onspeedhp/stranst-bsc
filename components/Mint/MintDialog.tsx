/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import clsx from 'clsx';
import styles from './mint.module.css';
import { StarBuyBtn } from '../Icon';
import MintBuy from './MintBuy';
import MintSuccess from './MintDone';
import axios from 'axios';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, beginCell, toNano } from 'ton-core';
import { BASE_PRICE } from '@/constant/baseprice';
import { fetchJettonWallets } from '@/app/utils';

export default function MintDialog() {
  const wallet = useTonWallet();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  const transferToken = async () => {
    // TODO: remove
    console.log(loading)
    setLoading(true);
    const body = beginCell()
      .storeUint(0xf8a7ea5, 32) // jetton transfer op code
      .storeUint(0, 64) // query_id:uint64
      .storeCoins(toNano(BASE_PRICE / 1000)) // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - USDT, 9 - default). Function toNano use decimals = 9 (remember it)
      .storeAddress(Address.parse(process.env.NEXT_PUBLIC_ADMIN_KEY!)) // destination:MsgAddress
      .storeAddress(Address.parse(wallet?.account.address!)) // response_destination:MsgAddress
      .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
      .storeCoins(toNano('0.05')) // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
      .storeUint(0, 1) // forward_payload:(Either Cell ^Cell)
      .endCell();

    const jettonWalletAddress = await fetchJettonWallets({
      ownerAddress: wallet?.account.address.toString()!,
      jettonAddress: 'kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy',
    });

    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: jettonWalletAddress!, // sender jetton wallet
          amount: toNano('0.07').toString(), // for commission fees, excess will be returned
          payload: body.toBoc().toString('base64'), // payload with jetton transfer body
        },
      ],
    };

    await tonConnectUI.sendTransaction(myTransaction);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/transfer-nft`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: wallet?.account.address,
          refAddress: '',
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    setLoading(false);
  };

  const handleSubmit = async (submitData: {
    amount: number;
    total: number;
  }) => {
    try {
      await transferToken();
      await axios.post('/api/mint', {
        ...submitData,
        walletAddress: wallet?.account.address!,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error update data:', error);
      setIsSuccess(false);
    }
  };

  return (
    <Dialog onOpenChange={() => setIsSuccess(null)}>
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
          <MintBuy submitData={handleSubmit} />
        ) : (
          <MintSuccess isSuccess={isSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
