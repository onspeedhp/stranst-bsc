import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

export default function MintSuccess({ isSuccess }: { isSuccess: boolean }) {
  const titleText = isSuccess
    ? 'You have successfully purchased the Strant VIP Pass!'
    : 'Oops! Something Went Wrong';

  const messageText = isSuccess ? (
    <>
      From now on, you will have full access to Strant’s Ecosystem, get airdrops
      from our partner projects, join our wonderful community, and more...
    </>
  ) : (
    <>
      {`It seems there's a hiccup with your purchase. Don't worry, we're working on it! `}
      Please try again shortly or <a href="">Contact Us</a> for assistance.
    </>
  );

  const icon = isSuccess ? (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.83331 19.9999C3.83331 10.7952 11.2952 3.33325 20.5 3.33325C29.7046 3.33325 37.1666 10.7952 37.1666 19.9999C37.1666 29.2046 29.7046 36.6666 20.5 36.6666C11.2952 36.6666 3.83331 29.2046 3.83331 19.9999ZM28.2336 13.7196C28.9408 14.3089 29.0363 15.3598 28.447 16.0669L20.1136 26.0669C19.8228 26.4161 19.4018 26.6313 18.9485 26.6626C18.495 26.6941 18.0485 26.5389 17.7121 26.2333L12.7122 21.6878C12.0311 21.0686 11.9809 20.0144 12.6001 19.3334C13.2193 18.6523 14.2733 18.6021 14.9544 19.2213L18.667 22.5963L25.8863 13.933C26.4756 13.2259 27.5265 13.1303 28.2336 13.7196Z"
        fill="#7ACC7D"
      />
    </svg>
  ) : (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2276_990)">
        <path
          d="M20.5 0C9.47156 0 0.5 8.97156 0.5 20C0.5 31.0284 9.47156 40 20.5 40C31.5284 40 40.5 31.0284 40.5 20C40.5 8.97156 31.5284 0 20.5 0Z"
          fill="#F57E76"
        />
        <path
          d="M27.8651 25.0083C28.5167 25.6601 28.5167 26.7133 27.8651 27.3651C27.5401 27.6901 27.1135 27.8534 26.6865 27.8534C26.2599 27.8534 25.8333 27.6901 25.5083 27.3651L20.5 22.3566L15.4918 27.3651C15.1668 27.6901 14.7401 27.8534 14.3135 27.8534C13.8866 27.8534 13.4599 27.6901 13.1349 27.3651C12.4834 26.7133 12.4834 25.6601 13.1349 25.0083L18.1434 20L13.1349 14.9918C12.4834 14.3399 12.4834 13.2868 13.1349 12.6349C13.7868 11.9834 14.8399 11.9834 15.4918 12.6349L20.5 17.6434L25.5083 12.6349C26.1601 11.9834 27.2133 11.9834 27.8651 12.6349C28.5167 13.2868 28.5167 14.3399 27.8651 14.9918L22.8566 20L27.8651 25.0083Z"
          fill="#101111"
        />
      </g>
      <defs>
        <clipPath id="clip0_2276_990">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div>
      <div className="flex items-center justify-center mb-2">
        {icon}
      </div>
      <p
        className={clsx(
          'text-[20px] leading-7 tracking-[-0.5%] font-semibold mb-2 text-center',
          isSuccess
            ? 'text-[#7ACC7D]'
            : 'text-[#F57E76]'
        )}
      >
        {titleText}
      </p>
      <p className="text-sm text-[#B6BECC] lg:text-gray-400 text-center">
        {messageText}
      </p>
      <Image
        src={`/image/mint-${isSuccess ? 'success' : 'err'}.png`}
        alt={`mint-${isSuccess ? 'success' : 'error'}-img`}
        width={356}
        height={188}
        className="mt-6 w-full"
      />
    </div>
  );
}
