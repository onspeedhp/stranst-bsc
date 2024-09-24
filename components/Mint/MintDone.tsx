import Image from 'next/image';
import React from 'react';

export default function MintSuccess({ isSuccess }: { isSuccess: boolean }) {
  return (
    <div>
      <p className="text-[20px] leading-7 tracking-[-0.5%] font-semibold text-white mb-2">
        {isSuccess
          ? `You have successfully purchased the Strant VIP Pass!`
          : 'Oops! Something went wrong.'}
      </p>
      <p className="text-sm text-gray-400">
        {isSuccess ? (
          <>
            {`From now on, you will have full access to Strant’s Ecosystem, receive
            airdrops from our partner projects, join our wonderful community, and
            more...`}
          </>
        ) : (
          <>
            {`It seems there's a hiccup with your purchase. Don't worry, we're working on it!`}
            Please try again shortly or <a href="">Contact Us</a> for assistance.
          </>
        )}
      </p>
      <Image src={`/image/mint-${isSuccess?'success':'err'}.png`} alt='mint-done-img' width={356} height={188} className='mt-6 w-full'/>
    </div>
  );
}