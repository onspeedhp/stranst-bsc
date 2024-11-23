/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';
import clsx from 'clsx';
import styles from './mint.module.css';
import { StarBuyBtn } from '../Icon';
import MintBuy from './MintBuy';
import MintSuccess, { BuyType } from './MintDone';
import { ArrowLeft } from 'lucide-react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, ethers } from 'ethers';
import { getCollectionContract, getTokenContract } from '@/hooks/useContract';
import { BASE_PRICE, NFT_CONTRACT_ADDRESS } from '@/constant';
import MintRef from './MintRef';
import MintToken from './MintToken';

export default function MintDialog({
  setMinted,
}: {
  setMinted: (value: boolean) => void;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [ref, setRef] = useState('');
  const { isConnected, address } = useAppKitAccount();
  const [buyTokenLoading, setBuyTokenLoading] = useState(false);
  const { walletProvider } = useAppKitProvider('eip155');

  const [buyWhat, setBuyWhat] = useState<BuyType>();

  const handleSubmit = async (submitData: {
    amount: number;
    total: number;
  }) => {
    try {
      setLoading(true);
      if (!isConnected || !address) throw Error('User disconnected');

      const ethersProvider = new BrowserProvider(walletProvider as any);

      const signer = await ethersProvider.getSigner();

      if (!isApproved) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const tokenContract = getTokenContract(signer);

        const decimals = ethers.toNumber(await tokenContract.decimals());

        // Call the approveAndEmit function to emit the TokensApproved event
        const approveTx = await tokenContract.approve(
          NFT_CONTRACT_ADDRESS,
          BigInt(submitData.amount * BASE_PRICE * 10 ** decimals)
        );

        await approveTx.wait();

        console.log('Tokens approved for minting NFTs:', approveTx);

        setIsApproved(true);
      } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const nftContract = getCollectionContract(signer);

        const _ref = ref;
        let refId = 999999;

        if (_ref) {
          const addressRef = await nftContract.ownerOf(_ref);
          if (addressRef !== address) {
            refId = Number(_ref);
          }
        }

        const mintNftTx = await nftContract.createEdaNFT(
          submitData.amount,
          signer.address.toString(),
          BigInt(refId)
        );

        await mintNftTx.wait();
        console.log('Mint NFT');

        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error update data:', error);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const buyToken = async (amount: number) => {
    try {
      setBuyTokenLoading(true);
      if (!isConnected || !address) throw Error('User disconnected');

      const ethersProvider = new BrowserProvider(walletProvider as any);

      const signer = await ethersProvider.getSigner();

      const tokenContract = getTokenContract(signer);

      const decimals = ethers.toNumber(await tokenContract.decimals());

      // Call the transfer from token smart-contract
      const transferTokenTx = await tokenContract.transfer(
        process.env.NEXT_PUBLIC_VAULT_ADDRESS,
        BigInt(
          amount *
            Number(process.env.NEXT_PUBLIC_BASE_TOKEN_PRICE) *
            10 ** decimals
        )
      );

      await transferTokenTx.wait();

      await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/tokenbuy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAdress: signer.address,
          amount: Number(amount),
        }),
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Error update data:', error);
      setIsSuccess(false);
    } finally {
      setBuyTokenLoading(false);
    }
  };

  const [nftIdArr, setNftArr] = useState([]);

  const getUserNftIdArr = async () => {
    if (isConnected && address) {
      try {
        const ethersProvider = new BrowserProvider(walletProvider as any);
        const signer = await ethersProvider.getSigner();
        const nftContract = getCollectionContract(signer);
        const listNftOfOwner = await nftContract.getNFTsOfOwner(address);
        const list = listNftOfOwner.map((nftId: unknown) =>
          Number(nftId).toString()
        );
        console.log(list);

        setNftArr(list);
      } catch (error) {
        console.log('Get list nft id failed: ', error);
      }
    }
  };

  useEffect(() => {
    getUserNftIdArr();
  }, [isConnected, address]);

  return (
    <>
      {address ? (
        <div
          className="w-fit"
          onClick={() => {}}
        >
          <w3m-button />
        </div>
      ) : (
        <Dialog
          onOpenChange={() => {
            // if (isSuccess) {
            //   setMinted(true);
            // }
            setRef('');
            setIsSuccess(null);
          }}
        >
          <DialogTrigger
            aria-hidden={false}
            onClick={() => setBuyWhat('nft')}
            className="mb-2 lg:mb-0 lg:mr-4"
          >
            <div className={clsx(styles['glow-btn'])}>
              <div className={styles['btn-glow']} />
              <div className={clsx('flex items-center gap-2', styles['btn'])}>
                <StarBuyBtn />
                <p className="text-[18px] leading-7 font-semibold text-white">
                  Buy Now
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogTrigger
            aria-hidden={false}
            onClick={() => {
              setBuyWhat('token');
            }}
          >
            <div className={clsx(styles['glow-btn'])}>
              <div className={styles['btn-glow']} />
              <div
                className={clsx('flex items-center gap-2', styles['btn-token'])}
              >
                <StarBuyBtn />
                <p className="text-[18px] leading-7 font-semibold text-white">
                  Buy Token
                </p>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent
            className={clsx(
              'bg-[#101111] blur-[100] max-w-[704px] border-none rounded-none lg:rounded-xl overflow-y-auto h-full lg:h-auto',
              {
                'w-full lg:max-w-[406px] pb-0 h-auto rounded-t-xl translate-x-0 translate-y-0 bottom-0 top-auto left-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:top-1/2 lg:left-1/2':
                  isSuccess !== null,
                'max-w-[500px]': !ref,
              }
            )}
          >
            {isSuccess === null ? (
              <>
                {buyWhat === 'nft' ? (
                  <div>
                    <DialogClose className="lg:hidden outline-none p-2">
                      <ArrowLeft size={24} />
                    </DialogClose>
                    {!ref ? (
                      <MintRef setRef={setRef} />
                    ) : (
                      <MintBuy
                        submitData={handleSubmit}
                        loading={loading}
                        isApproved={isApproved}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <DialogClose className="lg:hidden outline-none p-2">
                      <ArrowLeft size={24} />
                    </DialogClose>
                    {nftIdArr.length != 0 ? (
                      <MintToken
                        buyToken={buyToken}
                        buyTokenLoading={buyTokenLoading}
                      />
                    ) : (
                      <>
                        <MintSuccess
                          isSuccess={false}
                          buyWhat={buyWhat}
                          notHaveNft={true}
                        />
                        <DialogClose />
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <MintSuccess
                isSuccess={isSuccess}
                buyWhat={buyWhat}
              />
            )}
            {isSuccess !== null && <DialogClose />}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

const CloseDialog = () => (
  <DialogClose className="lg:hidden mb-5 outline-none">
    <div className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-[#37BFEA] to-[#0B0F3F] rounded-xl">
      <ArrowLeft />
      <p className="font-semibold text-white">Back to Homepage</p>
    </div>
  </DialogClose>
);
