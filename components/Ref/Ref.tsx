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
    <p className='text-slate-400 text-center p-4'>
      Unlock VIP Pass to use this feature
    </p>
  );
};

const IsVip = ({ nftIds }: IsVipProps) => {
  const [selectedUrlIdx, setSelectedUrlIdx] = useState(0);
  const [isCopy, setIsCopy] = useState(false);

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
      <p className='text-slate-50 truncate pr-3'>
        {selectedUrlIdx === idx ? refUrl : id}
      </p>
    </div>
  );

  return (
    <div className='pb-7 lg:p-4 lg:bg-gradient-to-b lg:from-[#37BFEA] lg:to-[#0B0F3F] rounded-xl'>
      <div className='flex flex-col gap-3'>
        <p className='text-gray-50 text-sm leading-5'>
          10% affiliate will be given directly to the referrer!
        </p>
      </div>

      <div className='relative my-6 px-4 h-[1px] bg-gradient-to-l from-[#8237EA] to-[#098BA8]' />

      <p className='text-slate-50'>Referral Link</p>
      <div className='max-h-[200px] overflow-y-auto pr-3'>
        {nftIds.map((id, idx) => renderReferralLink(id, idx))}
      </div>

      <div className='flex items-center gap-3'>
        <Button
          className='bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] flex gap-3 items-center justify-center flex-1'
          onClick={handleShare}
        >
          <Share color='white' size={20} />
          <p className='text-white'>Share</p>
        </Button>
        <div
          className='flex items-center justify-center border border-white px-4 py-3 rounded-xl cursor-pointer hover:opacity-50'
          onClick={handleCopyUrl}
        >
          {isCopy ? (
            <Check color='#FFFFFF' size={20} />
          ) : (
            <Copy color='#FFFFFF' size={20} />
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
      <div className='hidden lg:block'>
        <Popover>
          <PopoverTrigger>
            <Button className='bg-[#0F172AD9] flex items-center gap-3'>
              <UserPlus />
              <p className='hidden lg:block text-white'>
                Refer Friends for Prizes
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            className='p-0 rounded-none overflow-hidden border-none bg-transparent w-[353px]'
          >
            <div className='relative rounded-xl gradient-border'>
              <div className='bg-gradient-to-l from-[#37BFEA66] to-[#0B0F3F66] rounded-xl overflow-hidden p-[1px]'>
                {isVip ? <IsVip nftIds={nftIdAdrr} /> : <IsNotVip />}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='block lg:hidden'>
        <Drawer>
          <DrawerTrigger aria-hidden={false}>
            <Button className='bg-[#0F172AD9] flex items-center gap-3'>
              <UserPlus />
              <p className='hidden lg:block'>Refer Friends for Prizes</p>
            </Button>
          </DrawerTrigger>
          <DrawerContent className='bg-[#101111]'>
            <DrawerHeader className='flex items-center justify-between'>
              <DrawerTitle className='text-white'>
                Refer Friends for Prizes
              </DrawerTitle>
              <DialogClose>
                <X className='mr-4' />
              </DialogClose>
            </DrawerHeader>
            <div className='px-4'>
              {isVip ? (
                // Wallet Address
                <IsVip nftIds={nftIdAdrr} />
              ) : (
                <div className='h-[50vh] flex flex-col items-center justify-center'>
                  <Image
                    src='/image/emptybox.png'
                    width={317}
                    height={221}
                    alt='empty'
                  />
                  <p className='text-sm text-slate-400'>
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
