import {
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  TOKEN_ABI,
  USDT_CONTRACT_ADDRESS,
} from '@/constant';
import { ethers, JsonRpcSigner } from 'ethers';

const url = `https://bsc-${process.env.NEXT_PUBLIC_CLUSTER}.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;

export const useCollectionContract = (signer?: JsonRpcSigner) => {

  const collectionContract = new ethers.Contract(
    NFT_CONTRACT_ADDRESS,
    NFT_CONTRACT_ABI,
    signer ? signer : new ethers.JsonRpcProvider(url)
  );

  return collectionContract;
};

export const useTokenContract = (signer?: JsonRpcSigner) => {
  const tokenContract = new ethers.Contract(
    USDT_CONTRACT_ADDRESS,
    TOKEN_ABI,
    signer ? signer : new ethers.JsonRpcProvider(url)
  );

  return tokenContract;
};
