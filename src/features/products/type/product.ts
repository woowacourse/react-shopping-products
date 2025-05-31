import { Product } from '../../../shared/contexts/productsWithCart/types';

export interface ProductDTO {
  category: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}
