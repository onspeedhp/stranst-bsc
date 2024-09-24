import {
  createMintBody,
  createTransferBody,
  getAddressByIndex,
  openWallet,
  sleep,
  waitSeqno,
} from '@/app/utils';
import { address, internal, SendMode, toNano } from 'ton-core';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { uploadJson } from '@/app/utils/upload';

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const wallet = await openWallet(
      process.env.NEXT_PUBLIC_MNEMONIC!.split(' '),
      true
    );

    const itemIndex = 1;

    // const nftData = {
    //   name: 'Strants Pass Vip',
    //   description: 'Certificate of owner of something great',
    //   attributes: [{ trait_type: 'id', value: uuidv4() }],
    //   image: 'ipfs://QmeLWw9Qa5B6mLCDkDsBmuHpXut7XoLoJD58SQkSfdiHQu/0.jpg',
    //   external_link: 'https://strant.io/',
    // };

    // const nftUri = await uploadJson(nftData);

    // console.log(nftUri);

    const collectionAddress = address(process.env.NEXT_PUBLIC_NFT_COLLECTION!);

    let seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: collectionAddress,
          body: createMintBody({
            queryId: 0,
            itemOwnerAddress: wallet.contract.address,
            itemIndex: itemIndex,
            amount: toNano('0.05'),
            commonContentUrl:
              'ipfs://QmeLWw9Qa5B6mLCDkDsBmuHpXut7XoLoJD58SQkSfdiHQu/0.jpg',
          }),
        }),
      ],
      sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
    });

    await waitSeqno(seqno, wallet);

    const nftAddress = await getAddressByIndex(collectionAddress, itemIndex);

    seqno = await wallet.contract.getSeqno();

    await wallet.contract.sendTransfer({
      seqno,
      secretKey: wallet.keyPair.secretKey,
      messages: [
        internal({
          value: '0.05',
          to: nftAddress,
          body: createTransferBody({
            newOwner: address(data.userAddress),
            responseTo: wallet.contract.address,
            forwardAmount: toNano('0.02'),
          }),
        }),
      ],
      sendMode: SendMode.IGNORE_ERRORS + SendMode.PAY_GAS_SEPARATELY,
    });

    await waitSeqno(seqno, wallet);

    return NextResponse.json({
      status: 200,
      message: 'Done',
    });
  } catch (e) {
    console.log(e);

    const error = e as Error;
    return NextResponse.json({
      message: error.message,
    });
  }
};
