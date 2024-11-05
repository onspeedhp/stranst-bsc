export const BASE_PRICE = process.env.NEXT_PUBLIC_BASE_PRICE
  ? Number(process.env.NEXT_PUBLIC_BASE_PRICE)
  : 1000;

export const NFT_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;

export const TOTAL_SELLING_NFT = process.env.NEXT_PUBLIC_TOTAL_NFTS
  ? Number(process.env.NEXT_PUBLIC_TOTAL_NFTS)
  : 10000;

export const USDT_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CLUSTER === 'testnet'
    ? '0xB562a98729dF6B610f36c1f50dD925bB5f693E4b'
    : '0x55d398326f99059fF775485246999027B3197955';

export const TOKEN_ABI = [
  'function approve(address recipient, uint256 amount) external returns (bool)',
  'function decimals() external view returns (uint8)',
];

export const NFT_CONTRACT_ABI = [
  'function createEdaNFT(uint256 quantity, address receiver, uint256 nftRefId) public',
  'function getUserNFTCount(address user) public view returns (uint256)',
  'function doesUserOwnAnyNFTs(address user) public view returns (bool)',
  'function getTotalMinted() public view returns (uint256)',
  'function getNFTsOfOwner(address owner) external view returns (uint256[])',
  'function ownerOf(uint256 tokenId) external view returns (address)',
];
