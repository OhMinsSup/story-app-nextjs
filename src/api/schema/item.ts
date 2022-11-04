import type { FileSchema } from './file';
import type { UserSchema } from './user';

export interface ItemSchema {
  id: number;
  title: string;
  description: string;
  price: number;
  beginDate: Date;
  endDate: Date;
  isPublic: boolean;
  backgroundColor: string | null;
  externalSite: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  fileId: number;
  userId: number;
  thumbnailUrl: string;
  nftId: number | null;
  user: UserSchema;
  file: FileSchema;
  nft: NFTSchema | null;
  tags: ItemsOnTagsSchema[];
  contractHash?: string | null;
}

export interface NFTSchema {
  id: number;
  tokenId: string;
  cid: string;
  ipfsUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  transactionReceipt?: TransactionReceiptSchema[];
}

export interface ItemsOnTagsSchema {
  id: number;
  itemId: number;
  tagId: number;
  tag: TagSchema;
}

export interface TagSchema {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface TransactionReceiptSchema {
  id: number;
  transactionHash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  nftId: number;
}
