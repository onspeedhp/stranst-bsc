'use client';
import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { UserPlus } from '../Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, Copy, Share, Users } from 'lucide-react';
import Image from 'next/image';
import RefMission from './RefMission';
import { useTonAddress } from '@tonconnect/ui-react';
import axios from 'axios';

const IsNotVip = () => {
  return (
    <p className="text-slate-400 text-center">
      Unlock VIP Pass to use this feature
    </p>
  );
};

const IsVip = ({ walletAddress }: { walletAddress: string }) => {
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
    <>
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
      <Button className="bg-gradient-to-r from-[#9747FF] to-[#EA1187] flex gap-3 items-center justify-center">
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
          <p className="text-slate-50 font-semibold">123 referrals</p>
        </div>
        <p className="text-gray-50 text-sm leading-5">
          10% of our revenue during the event will be given to the referrer!
        </p>
        <RefMission />
      </div>
      <Image
        src="/image/ref-activitive.png"
        alt="ref-act"
        width={183}
        height={161}
        className="absolute right-0 bottom-0"
      />
    </>
  );
};

export default function Ref() {
  const userFriendlyAddress = useTonAddress();
  const [isVip, setIsVip] = useState(false);

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

  useEffect(() => {
    checkMinted(userFriendlyAddress);
  }, [userFriendlyAddress]);
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-[#0F172AD9] flex items-center gap-3">
          <UserPlus />
          Refer Friends for Prizes
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-0 rounded-none overflow-hidden border-none bg-transparent w-[353px]"
      >
        <div className="bg-gradient-to-l from-[#5F4A82] to-[#B3BDCB] p-[1px] rounded-xl">
          <div className="w-full h-full bg-[#191D44] rounded-xl">
            <div
              className={`rounded-xl bg-gradient-to-l from-[#34205E66] to-[#815F9199] p-4 relative`}
            >
              {isVip ? (
                <IsVip walletAddress={userFriendlyAddress} />
              ) : (
                <IsNotVip />
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
