import { AddCartItemType } from './cartItem';

export type ProductDataType = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  isAdd: boolean;
};

export type ProductProps = ProductDataType & {
  onClickAddCartItem: ({ productId, quantity }: AddCartItemType) => void;
};

export type ProductDTOType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};
