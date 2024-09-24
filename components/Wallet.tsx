'use client';
import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

// const walletList = [
//   {
//     label: 'Coin98',
//     image: '/image/wallet/coin98.png',
//   },
//   {
//     label: 'OKX Wallet',
//     image: '/image/wallet/okx.png',
//   },
//   {
//     label: 'Bitget Wallet',
//     image: '/image/wallet/bitget.png',
//   },
//   {
//     label: 'Gate Wallet',
//     image: '/image/wallet/gate.png',
//   },
//   {
//     label: 'MetaMask Wallet',
//     image: '/image/wallet/metamask.png',
//   },
// ];

export default function Wallet() {
  return (
    <>
      <TonConnectButton />
    </>
  );
}
