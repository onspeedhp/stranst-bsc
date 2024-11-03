'use client';
import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { UserPlus } from '../Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, Copy, Share, Users, X } from 'lucide-react';
import Image from 'next/image';
import RefMission from './RefMission';
import { useTonAddress } from '@tonconnect/ui-react';
import axios from 'axios';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { DialogClose } from '../ui/dialog';
import { shareOnMobile } from 'react-mobile-share';

const IsNotVip = () => {
  return (
    <p className="text-slate-400 text-center">
      Unlock VIP Pass to use this feature
    </p>
  );
};

const IsVip = ({
  walletAddress,
  totalRef,
}: {
  walletAddress: string;
  totalRef: number;
}) => {
  const refUrl = `${process.env.NEXT_PUBLIC_APP_URL}?ref=${walletAddress}`;
  const [isCopy, setIsCopy] = useState(false);

  const handleCopyUrl = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(refUrl);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };
  return (
    <div className="pb-7 lg:pb-0">
      <p className="text-slate-50">Referral Link</p>
      <div className="flex justify-between items-center rounded-[6px] border border-slate-700 bg-slate-800 px-3 py-2 mt-2 mb-3">
        <p className="text-slate-50 truncate pr-3">{refUrl}</p>
        <div className="cursor-pointer hover:opacity-80">
          {isCopy ? (
            <Check
              color="#64748B"
              size={13}
            />
          ) : (
            <Copy
              onClick={handleCopyUrl}
              color="#64748B"
              size={13}
            />
          )}
        </div>
      </div>
      <Button
        className="bg-gradient-to-r from-[#9747FF] to-[#EA1187] flex gap-3 items-center justify-center lg:hidden"
        onClick={() =>
          shareOnMobile({
            text: 'Hey checkout our collections',
            url: refUrl,
            title: 'Strants',
          })
        }
      >
        <Share
          color="white"
          size={20}
        />
        <p className="text-white">Share</p>
      </Button>
      <div className="relative my-6 h-[1px]">
        <div className="absolute top-0 bottom-0 bg-slate-600 -left-4 -right-4" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Users
            color="white"
            size={28}
          />
          <p className="text-slate-50 font-semibold">{totalRef} referrals</p>
        </div>
        <p className="text-gray-50 text-sm leading-5">
          10% of our revenue during the event will be given to the referrer!
        </p>
        <RefMission totalRef={totalRef} />
      </div>
      <Image
        src="/image/ref-activitive.png"
        alt="ref-act"
        width={183}
        height={161}
        className="absolute right-0 bottom-0"
      />
    </div>
  );
};

export default function Ref() {
  const userFriendlyAddress = useTonAddress();
  const [isVip, setIsVip] = useState(false);
  const [totalRef, setTotalRef] = useState(0);

  const checkMinted = async (walletAddress: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkMinted`,
        { walletAddress }
      );
      setIsVip(data.isMinted);
    } catch (error) {
      console.error('Error checking minted status:', error);
    }
  };

  const getTotalRef = async (walletAddress: string) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/totalRef/${walletAddress}`
      );
      setTotalRef(data);
    } catch (error) {
      console.error('Error checking minted status:', error);
    }
  };

  useEffect(() => {
    const checkAndFetch = () => {
      if (userFriendlyAddress) {
        checkMinted(userFriendlyAddress);
        getTotalRef(userFriendlyAddress);
      }
    };

    checkAndFetch();

    const interval = setInterval(checkAndFetch, 60000);

    return () => clearInterval(interval);
  }, [userFriendlyAddress]);

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
              <div className="bg-gradient-to-l from-[#37BFEA66] to-[#0B0F3F66] rounded-xl p-4">
                {isVip ? (
                  <IsVip
                    walletAddress={userFriendlyAddress}
                    totalRef={totalRef}
                  />
                ) : (
                  <IsNotVip />
                )}
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
          <DrawerContent>
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
                <IsVip
                  walletAddress={userFriendlyAddress}
                  totalRef={totalRef}
                />
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
