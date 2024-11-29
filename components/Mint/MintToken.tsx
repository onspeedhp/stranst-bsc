import React, { Fragment, useState } from 'react';
import styles from './mint.module.css';
import clsx from 'clsx';
import { Checkbox } from '../ui/checkbox';
import { LeftRightIcon, NFTIcon, StarBuyBtn } from '../Icon';
import Image from 'next/image';

export default function MintToken({
  nftList,
  buyToken,
  buyTokenLoading,
}: {
  buyToken: (nfts: string[]) => void;
  buyTokenLoading: boolean;
  nftList: Array<string>;
}) {
  const [selectedNft, setSelectedNft] = useState<Array<string>>([]);
  return (
    <div className='flex flex-col min-h-[400px] h-[90%]'>
      <div className='relative mb-3 mt-5'>
        <div className='flex items-center justify-between'>
          <p className='text-base leading-4 font-semibold'>NFT List</p>
          <div className='flex items-center gap-1'>
            <Checkbox
              className='border-white'
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedNft(nftList);
                } else {
                  setSelectedNft([]);
                }
              }}
            />
            <p className='text-sm leading-5 text-white'>Select all</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 mt-5 max-h-[300px] overflow-auto lg:max-h-[500px]'>
          {nftList.map((item, idx) => (
            <Fragment key={item}>
              <div
                className={clsx('flex items-start justify-between text-white', {
                  'opacity-50': selectedNft.includes(item),
                })}
              >
                <div className='flex items-center gap-3'>
                  <Checkbox
                    className='border-white'
                    checked={selectedNft.includes(item)}
                    onCheckedChange={() =>
                      setSelectedNft((prev) =>
                        prev.includes(item)
                          ? prev.filter((nft) => nft !== item)
                          : [...prev, item]
                      )
                    }
                  />

                  <NFTIcon />
                  <div>
                    <p>Straint VIP Pass</p>#{item}
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  <p>1500</p>
                  <Image
                    src={'/image/strant-token.png'}
                    alt='strant-token-icon'
                    objectFit='cover'
                    objectPosition='center'
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              {idx + 1 !== nftList.length && (
                <div className='relative h-[1px] w-full bg-gradient-to-l from-[#2B8CB800] via-[#FFFFFF] to-[#2B8CB800]' />
              )}
            </Fragment>
          ))}
        </div>
        <div className='flex items-center justify-between mt-5 bg-white rounded-xl text-[#101111] p-3  text-sm leading-5 font-semibold'>
          <p className='text-transparent bg-gradient-to-b from-[#37BFEA] to-[#0B0F3F] bg-clip-text'>
            Total
          </p>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1'>
              <Image
                src={'/image/strant-token-colored.png'}
                alt='strant-token-icon-colored'
                objectFit='cover'
                objectPosition='center'
                width={14}
                height={14}
              />
              <p>{1500 * selectedNft.length}</p>
            </div>
            <LeftRightIcon />
            <div className='flex items-center gap-1'>
              <p>{150 * selectedNft.length}</p>
              <Image
                src={'/image/strant-usdt.png'}
                alt='strant-usdt-icon'
                objectFit='cover'
                objectPosition='center'
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
        {/* TODO handle buy token with nft list */}
        <div
          className={clsx('mx-auto mt-11', styles['glow-btn'], {
            'pointer-events-none opacity-50':
              buyTokenLoading || selectedNft.length === 0,
          })}
          onClick={() => buyToken(selectedNft)}
        >
          <div className={styles['btn-glow']} />
          <div className={clsx('flex items-center gap-2', styles['btn'])}>
            {buyTokenLoading ? (
              <p className='text-[18px] leading-7 font-semibold text-white'>
                In progress...
              </p>
            ) : (
              <>
                <StarBuyBtn />
                <p className='text-[18px] leading-7 font-semibold text-white'>
                  Buy Now
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
