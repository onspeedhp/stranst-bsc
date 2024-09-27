'use client';
import React from 'react';
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import Button from './ui/Button';

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
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  return (
    <>
      {!address ? (
        <div onClick={() => tonConnectUI.openModal()}>
          <Button>
            <p className="text-white">Connect Wallet</p>
          </Button>
        </div>
      ) : (
        <TonConnectButton />
      )}
    </>
  );
}
