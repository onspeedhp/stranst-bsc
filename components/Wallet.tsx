'use client';
import React, { useState } from 'react';
import Button from './ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import Image from 'next/image';

const walletList = [
  {
    label: 'Coin98',
    image: '/image/wallet/coin98.png',
  },
  {
    label: 'OKX Wallet',
    image: '/image/wallet/okx.png',
  },
  {
    label: 'Bitget Wallet',
    image: '/image/wallet/bitget.png',
  },
  {
    label: 'Gate Wallet',
    image: '/image/wallet/gate.png',
  },
  {
    label: 'MetaMask Wallet',
    image: '/image/wallet/metamask.png',
  },
];

export default function Wallet() {
  const [isHaveWallet] = useState(true);
  return (
    <>
      {!isHaveWallet ? (
        <Dialog>
          <DialogTrigger aria-hidden={false}>
            <Button>Connect Wallet</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#171D41] border-none rounded-xl px-0">
            <DialogHeader className="px-6">
              <DialogTitle className="text-lg tracking-[-0.5%] text-white font-semibold">
                Connect Wallet
              </DialogTitle>
              <p className="text-sm text-white">
                You have to connect your wallet to continue.
              </p>
            </DialogHeader>
            <div>
              {walletList.map((item, idx) => (
                <div className="flex items-center py-3 gap-3 px-6 cursor-pointer hover:bg-[#64748B80]">
                  <Image
                    width={48}
                    height={48}
                    src={item.image}
                    alt={item.label}
                  />
                  <p className="font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-l from-[#5F4A82] to-[#B3BDCB] p-[1px] rounded-xl">
            <p className="w-full h-full bg-[#171C43] rounded-xl py-1 px-3 truncate max-w-[130px] font-semibold">
              EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m
            </p>
          </div>
          <Image
            src="/image/avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}
    </>
  );
}
