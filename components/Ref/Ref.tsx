/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '../ui/Button';
import { ExchangeIcon, UserPlus, WalletIcon } from '../Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, Copy, Share, X } from 'lucide-react';
import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';
import { shareOnMobile } from 'react-mobile-share';
import { getCollectionContract } from '@/hooks/useContract';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import clsx from 'clsx';
interface IsVipProps {
  nftIds: string[];
}

const IsNotVip = () => {
  return (
    <p className="text-slate-400 text-center p-4">
      Unlock VIP Pass to use this feature
    </p>
  );
};

const IsVip = ({ nftIds }: IsVipProps) => {
  const [selectedUrlIdx, setSelectedUrlIdx] = useState(() => {
    const localNftId = localStorage.getItem('selectedNftId');
    return nftIds.findIndex((item) => item === localNftId) ?? 0;
  });
  const [isCopy, setIsCopy] = useState(false);
  const [NFTAchievement, setNFTAchievement] = useState(0);
  const [tokenBuyed, setTokenBuyed] = useState(0);
  const { walletProvider } = useAppKitProvider('eip155');

  useEffect(() => {
    const handleGetTotalAchievement = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BE_URL}/achievement`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listId: nftIds }),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const [{ total }] = await response.json();

        setNFTAchievement(total);
      } catch (error) {
        console.error('Error fetching total achievement:', error);
      }
    };

    const getTokenBuyed = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethersProvider = new BrowserProvider(walletProvider as any);
      const signer = await ethersProvider.getSigner();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/tokenbuy/${signer.address}`
      );
      const amount = await res.json();
      if (amount) {
        setTokenBuyed(Number(amount));
      }
    };

    handleGetTotalAchievement();
    getTokenBuyed();
  }, [nftIds]);

  const refUrl = `${process.env.NEXT_PUBLIC_APP_URL}?ref=${nftIds[selectedUrlIdx]}`;

  const handleCopyUrl = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(refUrl);
    setTimeout(() => setIsCopy(false), 1000);
  };

  const handleShare = () => {
    shareOnMobile({
      text: 'Hey, check out our collections',
      url: refUrl,
      title: 'Strants',
    });
  };

  const renderReferralLink = (id: string, idx: number) => (
    <div
      key={id}
      className={clsx('py-2 px-3 cursor-pointer hover:opacity-80 rounded-md', {
        'bg-[#1C1F1F]': selectedUrlIdx === idx,
      })}
      onClick={() => {
        localStorage.setItem('selectedNftId', idx.toString());
        setSelectedUrlIdx(idx);
      }}
    >
      <p className={clsx('text-slate-50 truncate pr-3')}>
        {process.env.NEXT_PUBLIC_APP_URL}?ref=${nftIds[idx]}
      </p>
    </div>
  );

  const ChangeRefIdDialog = () => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button className="bg-transparent flex items-center gap-2.5 border border-white">
            <ExchangeIcon />
            <p className="text-white">Change</p>
          </Button>
        </DialogTrigger>
        <DialogContent
          className={clsx(
            'bg-[#101111] blur-[100] max-w-[320px] lg:max-w-[380px] border-none rounded-none lg:rounded-xl overflow-y-auto lg:h-auto'
          )}
        >
          <div>
            <p className="font-semibold">Change referral Link</p>
            <p className="text-sm leading-5 text-[#B8B8B8]">
              Choose another referral link.
            </p>
          </div>
          <div className="relative h-[1px] bg-gradient-to-l from-[#2B8CB800] via-[#FFFFFF] to-[#2B8CB800]" />
          <div className="max-h-[500px] overflow-y-auto pr-3 flex flex-col gap-1">
            {nftIds.map((id, idx) => renderReferralLink(id, idx))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="pb-7 lg:px-4 lg:py-7  lg:bg-gradient-to-b lg:from-[#37BFEA] lg:to-[#0B0F3F] rounded-xl">
      <div className="flex items-center gap-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 0.314331C8.68406 0.314331 4.375 4.62339 4.375 9.93934C4.375 15.2553 8.68406 19.5643 14 19.5643C19.316 19.5643 23.625 15.2553 23.625 9.93934C23.625 4.62339 19.316 0.314331 14 0.314331ZM18.2318 9.15534L16.4732 10.87L16.8887 13.2904C16.9581 13.6931 16.5348 14.0001 16.1741 13.8095L14 12.6667L11.8259 13.8095C11.4642 13.9991 11.0419 13.6922 11.1113 13.2904L11.5268 10.87L9.76817 9.15534C9.47588 8.86989 9.63718 8.37329 10.0409 8.31464L12.4711 7.96174L13.5582 5.75931C13.739 5.39273 14.261 5.39273 14.4419 5.75931L15.5289 7.96174L17.9591 8.31464C18.3628 8.37329 18.5241 8.87087 18.2318 9.15534Z"
            fill="white"
          />
          <path
            d="M13.9999 21.0298C11.906 21.0298 9.95385 20.4365 8.28125 19.4237V27.1679C8.28125 27.5785 8.7407 27.8229 9.08285 27.598L13.7165 24.5578C13.8924 24.4405 14.1075 24.4405 14.2834 24.5578L18.9171 27.598C19.2592 27.8229 19.7186 27.5785 19.7186 27.1679V19.4237C18.046 20.4365 16.0939 21.0298 13.9999 21.0298Z"
            fill="white"
          />
        </svg>
        <div>
          <p className="text-white text-base leading-6 font-semibold">
            Achievement {NFTAchievement}NFTs
          </p>
          <p className="text-[#DCDEE0] text-sm leading-5">
            10% affiliate will be given directly to the referrer!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Image
          src={'/image/strant-token.png'}
          alt="strant-token-icon"
          objectFit="cover"
          objectPosition="center"
          width={20}
          height={20}
          className="ml-[1.5%]"
        />
        <div className="flex-1 flex items-center justify-between">
          <p className="text-white text-base leading-6 font-semibold">Tokens</p>
          <div className="flex items-center gap-1">
            <Image
              src={'/image/strant-token.png'}
              alt="strant-token-icon"
              objectFit="cover"
              objectPosition="center"
              width={20}
              height={20}
              className="ml-[1.5%]"
            />
            <p className="text-sm leading-5 font-semibold text-white">
              {tokenBuyed.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="relative my-6 px-4 h-[1px] bg-gradient-to-l from-[#2B8CB800] via-[#FFFFFF] to-[#2B8CB800]" />

      <p className="text-slate-50">Referral Link</p>

      <div className="flex items-center justify-between px-3 py-2.5 bg-black rounded-lg mt-2 mb-3">
        <p className="text-white text-sm">{refUrl}</p>
        <div onClick={handleCopyUrl}>
          {isCopy ? (
            <Check
              color="#FFFFFF"
              size={20}
            />
          ) : (
            <Copy
              color="#FFFFFF"
              size={20}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ChangeRefIdDialog />
        <Button
          className="bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] flex gap-3 items-center justify-center flex-1"
          onClick={handleShare}
        >
          <Share
            color="white"
            size={20}
          />
          <p className="text-white">Share</p>
        </Button>
      </div>
    </div>
  );
};

export default function Ref() {
  const [isVip, setIsVip] = useState(false);

  const [nftIdArr, setNftArr] = useState([]);
  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');

  const getUserNftIdArr = async () => {
    if (isConnected && address) {
      try {
        const ethersProvider = new BrowserProvider(
          walletProvider as Eip1193Provider
        );
        const signer = await ethersProvider.getSigner();
        const nftContract = getCollectionContract(signer);
        const listNftOfOwner = await nftContract.getNFTsOfOwner(address);
        const list = listNftOfOwner.map((nftId: unknown) =>
          Number(nftId).toString()
        );

        setNftArr(list);
        setIsVip(list.length !== 0);
      } catch (error) {
        console.log('Get list nft id failed: ', error);
      }
    }
  };

  useEffect(() => {
    getUserNftIdArr();
  }, [isConnected, address]);

  return (
    <>
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger>
            <Button className="bg-[#0F172AD9] flex items-center gap-3">
              <UserPlus />
              <p className="hidden lg:block text-white">Inventory</p>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="p-0 rounded-none overflow-hidden border-none bg-transparent w-[385px]"
          >
            <div className="relative rounded-xl gradient-border">
              <div className="bg-gradient-to-l from-[#37BFEA66] to-[#0B0F3F66] rounded-xl overflow-hidden p-[1px]">
                {isVip ? <IsVip nftIds={nftIdArr} /> : <IsNotVip />}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="block lg:hidden">
        <Drawer>
          <DrawerTrigger aria-hidden={false}>
            <div className="bg-gradient-to-b from-[#37BFEA] to-[#0B0F3F] lg:bg-[#0F172AD9] flex items-center gap-3 p-2 rounded-xl hover:opacity-50">
              <WalletIcon />
            </div>
          </DrawerTrigger>
          <DrawerContent className="bg-[#101111]">
            <DrawerHeader className="flex items-center justify-between">
              <DrawerTitle className="text-white">Inventory</DrawerTitle>
              <DialogClose>
                <X className="mr-4" />
              </DialogClose>
            </DrawerHeader>
            <div className="px-4">
              {isVip ? (
                <IsVip nftIds={nftIdArr} />
              ) : (
                <div className="h-[50vh] flex flex-col items-center justify-center">
                  <Image
                    src="/image/emptybox.png"
                    width={317}
                    height={221}
                    alt="empty"
                  />
                  <p className="text-sm text-slate-400">
                    Unlock VIP Pass to use this feature
                  </p>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
