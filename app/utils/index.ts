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

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export async function fetchJettonWallets(params: { ownerAddress: string }) {
  const testnet = process.env.NEXT_PUBLIC_CLUSTER === 'testnet';

  const toncenterBaseEndpoint: string = testnet
    ? 'https://testnet.toncenter.com'
    : 'https://toncenter.com';

  const jettonAddress = testnet
    ? 'kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy'
    : 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';

  const url = `${toncenterBaseEndpoint}/api/v3/jetton/wallets?owner_address=${params.ownerAddress}&jetton_address=${jettonAddress}&limit=10&offset=0`;

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
