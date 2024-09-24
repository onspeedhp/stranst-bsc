import { KeyPair, mnemonicToPrivateKey } from 'ton-crypto';
import {
  address,
  Address,
  beginCell,
  Cell,
  OpenedContract,
  TonClient,
  WalletContractV4,
} from 'ton';

export type OpenedWallet = {
  contract: OpenedContract<WalletContractV4>;
  keyPair: KeyPair;
};
export async function waitSeqno(seqno: number, wallet: OpenedWallet) {
  for (let attempt = 0; attempt < 10; attempt++) {
    await sleep(2000);
    const seqnoAfter = await wallet.contract.getSeqno();
    if (seqnoAfter == seqno + 1) break;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function openWallet(mnemonic: string[], testnet: boolean) {
  const keyPair = await mnemonicToPrivateKey(mnemonic);

  const toncenterBaseEndpoint: string = testnet
    ? 'https://testnet.toncenter.com'
    : 'https://toncenter.com';

  const client = new TonClient({
    endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
    apiKey: process.env.NEXT_PUBLIC_TONCENTER_API,
  });

  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });

  const contract = client.open(wallet);
  return { contract, keyPair };
}

export function createTransferBody(params: {
  newOwner: Address;
  responseTo?: Address;
  forwardAmount?: bigint;
}) {
  const msgBody = beginCell();
  msgBody.storeUint(0x5fcc3d14, 32); // op-code
  msgBody.storeUint(0, 64); // query-id
  msgBody.storeAddress(params.newOwner);

  msgBody.storeAddress(params.responseTo || null);
  msgBody.storeBit(false); // no custom payload
  msgBody.storeCoins(params.forwardAmount || 0);
  msgBody.storeBit(0); // no forward_payload

  return msgBody.endCell();
}

export async function getAddressByIndex(
  collectionAddress: Address,
  itemIndex: number
): Promise<Address> {
  const client = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    apiKey: process.env.NEXT_PUBLIC_TONCENTER_API,
  });

  const response = await client.runMethod(
    collectionAddress,
    'get_nft_address_by_index',
    [{ type: 'int', value: BigInt(itemIndex) }]
  );

  return response.stack.readAddress();
}

export type mintParams = {
  queryId: number | null;
  itemOwnerAddress: Address;
  itemIndex: number;
  amount: bigint;
  commonContentUrl: string;
};

export function createMintBody(params: mintParams): Cell {
  const body = beginCell();
  body.storeUint(1, 32);
  body.storeUint(params.queryId || 0, 64);
  body.storeUint(params.itemIndex, 64);
  body.storeCoins(params.amount);

  const nftItemContent = beginCell();
  nftItemContent.storeAddress(params.itemOwnerAddress);

  const uriContent = beginCell();
  uriContent.storeBuffer(Buffer.from(params.commonContentUrl));
  nftItemContent.storeRef(uriContent.endCell());

  body.storeRef(nftItemContent.endCell());
  return body.endCell();
}

export async function fetchJettonWallets(params: {
  ownerAddress: string;
  jettonAddress: string;
}) {
  const url = `https://testnet.toncenter.com/api/v3/jetton/wallets?owner_address=${params.ownerAddress}&jetton_address=${params.jettonAddress}&limit=10&offset=0`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return address(data.jetton_wallets[0].address).toString({
      urlSafe: true,
      bounceable: true,
      testOnly: true,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
