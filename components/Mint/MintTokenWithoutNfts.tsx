import React, { useState } from 'react';
import Button from '../ui/Button';
// import { ChevronRight } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

export default function MintTokenWithoutNfts({
  buyToken,
  buyTokenLoading,
}: {
  buyToken: (e: number) => void;
  buyTokenLoading: boolean;
}) {
  const [textInput, setTextInput] = useState('');
  return (
    <div className='flex flex-col min-h-[400px] h-[90%]'>
      <div className='relative mb-3'>
        <p className='text-base leading-4 font-semibold text-white'>Buy Token</p>
        <p className='mt-1.5 text-xs leading-5 text-gray-300'>
          You have to enter token amount to buy this token (1 $STRANT /{' '}
          {Number(process.env.NEXT_PUBLIC_BASE_TOKEN_PRICE)})$
        </p>
        <div className='h-[1px] bg-slate-700 mt-3 absolute -bottom-3 -left-6 -right-6' />
      </div>
      <div
        className={clsx(
          'mt-6 p-3 border border-[#B0BFD1] rounded-lg bg-transparent'
        )}
      >
        <input
          placeholder='10000'
          className={clsx(
            'w-full outline-none bg-transparent text-gray-300'
          )}
          type='number'
          value={textInput}
          onChange={(e) => setTextInput(e.currentTarget.value)}
        />
      </div>
      <Button
        className={clsx(
          'flex items-center bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] justify-center mt-auto py-2.5',
          {
            'opacity-50 pointer-events-none': !textInput || buyTokenLoading,
          }
        )}
        onClick={() => buyToken(Number(textInput))}
      >
        <p className='font-semibold'>
          {buyTokenLoading ? 'In progress...' : 'Buy'}
        </p>
        {/* <ChevronRight /> */}
      </Button>
    </div>
  );
}
