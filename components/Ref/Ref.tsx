/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '../ui/Button';
import { UserPlus } from '../Icon';
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
import { DialogClose } from '../ui/dialog';
import { shareOnMobile } from 'react-mobile-share';
import { useCollectionContract } from '@/hooks/useContract';
import { useAppKitAccount } from '@reown/appkit/react';
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
  const [selectedUrlIdx, setSelectedUrlIdx] = useState(0);
  const [isCopy, setIsCopy] = useState(false);
  const [NFTAchievement, setNFTAchievement] = useState(0);

  useEffect(() => {
    const handleGetTotalAchievement = async () => {
      try {
        const response = await fetch('https://api.strant.io/achievement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listId: nftIds }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const [{ total }] = await response.json();

        setNFTAchievement(total);
      } catch (error) {
        console.error('Error fetching total achievement:', error);
      }
    };

    handleGetTotalAchievement();
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
      className={`flex justify-between items-center rounded-[6px] px-3 py-2 mt-2 mb-3 ${
        selectedUrlIdx === idx
          ? 'border border-slate-700 bg-slate-800'
          : 'bg-[#687B99] hover:opacity-80 cursor-pointer'
      }`}
      onClick={() => setSelectedUrlIdx(idx)}
    >
      <p className="text-slate-50 truncate pr-3">
        {selectedUrlIdx === idx ? refUrl : id}
      </p>
    </div>
  );

  return (
    <div className="pb-7 lg:p-4 lg:bg-gradient-to-b lg:from-[#37BFEA] lg:to-[#0B0F3F] rounded-xl">
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

      <div className="relative my-6 px-4 h-[1px] bg-gradient-to-l from-[#8237EA] to-[#098BA8]" />

      <p className="text-slate-50">Referral Link</p>
      <div className="max-h-[200px] overflow-y-auto pr-3">
        {nftIds.map((id, idx) => renderReferralLink(id, idx))}
      </div>

      <div className="flex items-center gap-3">
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
        <div
          className="flex items-center justify-center border border-white px-4 py-3 rounded-xl cursor-pointer hover:opacity-50"
          onClick={handleCopyUrl}
        >
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
    </div>
  );
};

export default function Ref() {
  const [isVip, setIsVip] = useState(false);
  // const [totalRef, setTotalRef] = useState(0);

  const [nftIdAdrr, setNftIdAdrr] = useState([]);
  const { isConnected, address } = useAppKitAccount();

  const getUserNftIdArr = async () => {
    if (isConnected && address) {
      try {
        const nftContract = useCollectionContract();
        const listNftOfOwner = await nftContract.getNFTsOfOwner(address);
        const list = listNftOfOwner.map((nftId: unknown) =>
          Number(nftId).toString()
        );
        console.log(list);

        setNftIdAdrr(list);
        setIsVip(list.length !== 0);
      } catch (error) {
        console.log('Get list nft id failed: ', error);
      }
    }
  };

  useEffect(() => {
    getUserNftIdArr();
  }, [isConnected, address]);

  //   const checkMinted = async (walletAddress: string) => {
  //     try {
  //       const { data } = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/checkMinted`,
  //         { walletAddress }
  //       );
  //       setIsVip(data.isMinted);
  //     } catch (error) {
  //       console.error('Error checking minted status:', error);
  //     }
  //   };

  //   const getTotalRef = async (walletAddress: string) => {
  //     try {
  //       const { data } = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/totalRef/${walletAddress}`
  //       );
  //       setTotalRef(data);
  //     } catch (error) {
  //       console.error('Error checking minted status:', error);
  //     }
  //   };

  //   TODO: check ref
  //   useEffect(() => {
  //     const checkAndFetch = () => {
  //       if (userFriendlyAddress) {
  //         checkMinted(userFriendlyAddress);
  //         getTotalRef(userFriendlyAddress);
  //       }
  //     };

  //     checkAndFetch();

  //     const interval = setInterval(checkAndFetch, 60000);

  //     return () => clearInterval(interval);
  //   }, [userFriendlyAddress]);

  return (
    <>
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger>
            <Button className="bg-[#0F172AD9] flex items-center gap-3">
              <UserPlus />
              <p className="hidden lg:block text-white">
                Refer Friends for Prizes
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="p-0 rounded-none overflow-hidden border-none bg-transparent w-[353px]"
          >
            <div className="relative rounded-xl gradient-border">
              <div className="bg-gradient-to-l from-[#37BFEA66] to-[#0B0F3F66] rounded-xl overflow-hidden p-[1px]">
                {isVip ? <IsVip nftIds={nftIdAdrr} /> : <IsNotVip />}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="block lg:hidden">
        <Drawer>
          <DrawerTrigger aria-hidden={false}>
            <Button className="bg-[#0F172AD9] flex items-center gap-3">
              <UserPlus />
              <p className="hidden lg:block">Refer Friends for Prizes</p>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#101111]">
            <DrawerHeader className="flex items-center justify-between">
              <DrawerTitle className="text-white">
                Refer Friends for Prizes
              </DrawerTitle>
              <DialogClose>
                <X className="mr-4" />
              </DialogClose>
            </DrawerHeader>
            <div className="px-4">
              {isVip ? (
                <IsVip nftIds={nftIdAdrr} />
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
