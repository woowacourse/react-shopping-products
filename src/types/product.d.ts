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
