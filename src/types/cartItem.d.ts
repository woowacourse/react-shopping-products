import { ProductDTOType } from './product';

export type cartDataType = {
  id: number;
  quantity: number;
  product: ProductDTOType;
};

export type AddCartItemType = {
  productId: number;
  quantity: number;
};
