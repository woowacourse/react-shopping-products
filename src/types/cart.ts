import { Category } from './product';

export interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: Category;
  };
}

export interface FetchAdjustCartItemQuantityProps {
  cartItemId: number;
  quantity: number;
}
