import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
// import { ChevronRight } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { BrowserProvider } from 'ethers';
import { useAppKitProvider } from '@reown/appkit/react';

export default function MintTokenWithoutNfts({
  buyToken,
  buyTokenLoading,
  nftIdArr,
}: {
  nftIdArr: never[];
  buyToken: (e: number) => void;
  buyTokenLoading: boolean;
}) {
  const [maxTokenBuyed, setMaxTokenBuyed] = useState(0);
  const { walletProvider } = useAppKitProvider('eip155');

  const getTokenBuyed = async () => {
    console.log('Doing great');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethersProvider = new BrowserProvider(walletProvider as any);
    const signer = await ethersProvider.getSigner();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/tokenbuy/${signer.address}`
    );
    const amount = await res.json();
    
    if (amount) {
      setMaxTokenBuyed(nftIdArr.length * 5000 - Number(amount));
      console.log('Total token buyed:', amount);
    } else {
      setMaxTokenBuyed(nftIdArr.length * 5000);
    }
  };

  useEffect(() => {
    getTokenBuyed();
  }, [nftIdArr]);

  const [textInput, setTextInput] = useState('');
  return (
    <div className='flex flex-col min-h-[400px] h-[90%]'>
      <div className='relative mb-3'>
        <p className='text-base leading-4 font-semibold text-white'>
          Buy Token
        </p>
        <p className='mt-1.5 text-xs leading-5 text-gray-300'>
          You have to enter token amount to buy this token (1 $STRANT /{' '}
          {Number(process.env.NEXT_PUBLIC_BASE_TOKEN_PRICE)})$
        </p>
        <p className='mt-1.5 text-xs leading-5 text-gray-300'>
          Max token you can buy: {Number(maxTokenBuyed)}
        </p>
        <div className='h-[1px] bg-slate-700 mt-3 absolute -bottom-3 -left-6 -right-6' />
      </div>
      <div
        className={clsx(
          'mt-6 p-3 border border-[#B0BFD1] rounded-lg bg-transparent'
        )}
      >
        <input
          // placeholder='10000'
          className={clsx('w-full outline-none bg-transparent text-gray-300')}
          type='number'
          value={textInput}
          onChange={(e) => setTextInput(e.currentTarget.value)}
        />
      </div>
      <Button
        className={clsx(
          'flex items-center bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] justify-center mt-auto py-2.5',
          {
            'opacity-50 pointer-events-none':
              !textInput ||
              buyTokenLoading ||
              Number(textInput) > maxTokenBuyed,
          }
        )}
        onClick={() => buyToken(Number(textInput))}
      >
        <p className='font-semibold'>
          {buyTokenLoading
            ? 'In progress...'
            : Number(textInput) > maxTokenBuyed
            ? 'Max token reached'
            : 'Buy'}
        </p>
        {/* <ChevronRight /> */}
      </Button>
    </div>
  );
}
