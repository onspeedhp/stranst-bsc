import React, { Dispatch, SetStateAction } from 'react';
import { EmptyBox } from '../Icon';
export type BuyType = 'nft' | 'token' | undefined;

export default function MintSuccessToken({
  setBuyWhat,
}: {
  setBuyWhat: Dispatch<SetStateAction<BuyType>>;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-20 mb-5">
        <EmptyBox />
      </div>
      <p className="text-center w-2/3 font-medium text-white">
        This feature is exclusive to NFT owners. Please purchase an NFT to
        proceed.
      </p>
      <div
        className="bg-white rounded-full px-6 py-1.5 w-fit mt-10 cursor-pointer hover:opacity-80"
        onClick={() => {
          setBuyWhat('nft');
        }}
      >
        <p className="font-semibold text-transparent bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] bg-clip-text">
          Buy now
        </p>
      </div>
    </div>
  );
}
