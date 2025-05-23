import { AddCartItemType } from './cartItem';

export type ProductDataType = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type ActionType = {
  onClickAddCartItem: ({ productId, quantity }: AddCartItemType) => void;
  onClickModifyCartItem: ({ productId, quantity }: AddCartItemType) => void;
};

export type ProductProps = {
  product: ProductDTOType;
} & ActionType;

export type ProductDTOType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
};
