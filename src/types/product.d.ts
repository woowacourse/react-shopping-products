import { AddCartItemType } from './cartItem';

export type ProductDataType = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  isAdd: boolean;
};

export type ProductProps = ProductDataType & {
  onClickAddCartItem: ({ productId, quantity }: AddCartItemType) => void;
  onClickUpdateCartItem: ({ productId, quantity }: { productId: number; quantity: number }) => void;
  onClickDeleteCartItem: ({ productId }: { productId: number }) => void;
};

export type ProductDTOType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
};

export type CategoryType = '전체' | '식료품' | '패션잡화';
export type SortType = 'asc' | 'desc';
