import Image from 'next/image';
import React, { useState } from 'react';
import MintCounter from './MintCouter';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, beginCell, toNano } from '@ton/core';
import TonWeb from 'tonweb';
import { fetchJettonWallets } from '@/app/utils';

export default function MintBuy() {
  const [amount, setAmount] = useState(1);
  const BASE_PRICE = 100;
  const [loading, setLoading] = useState(false);

  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  const transferToken = async () => {
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
        body: JSON.stringify({ userAddress: wallet?.account.address }),
      }
    );

    const data = await res.json();
    console.log(data);
    
    setLoading(false);
  };

  return (
    <div className='grid grid-cols-2 gap-8 items-center'>
      <div className='relative'>
        <Image
          src='/image/nft/nft-image-2.png'
          alt='nft-image'
          width={278}
          height={344}
        />
      </div>
      <div>
        <p className='text-[30px] leading-[36px] tracking-[-0.75%] font-semibold text-white'>
          <span className='text-xl tracking-[-0.6%]'>Purchasing</span> NFT VIP
          Pass - 1st Edition
        </p>
        <p className='mt-3 text-lg font-semibold tracking-[-0.5%] bg-gradient-to-r from-[#A2ADB9] via-[#F8FAFC] to-[#99A6B2] text-transparent bg-clip-text'>
          100 USDT
        </p>
        <div className='mt-6 border-t border-slate-600 mb-6'>
          <div className='pt-2'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-slate-400'>Amount</p>
              <MintCounter amount={amount} setAmount={setAmount} />
            </div>
            <div className='flex items-center justify-between mt-3'>
              <p className='text-sm text-slate-400'>Total</p>
              <p className='text-[18px] leading-7 font-semibold text-white'>
                {(amount * BASE_PRICE).toLocaleString()} USDT
              </p>
            </div>
          </div>
        </div>
        <div
          className='bg-gradient-to-l from-[#9747FF] to-[#EA1187] rounded-xl py-2.5 text-center text-[18px] leading-7 font-semibold text-white cursor-pointer hover:opacity-80'
          onClick={() => transferToken()}
        >
          Countinue
        </div>
      </div>
    </div>
  );
}
