export interface ProductDTO {
  category: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface Product extends ProductDTO {
  isCart: boolean;
  cartProductQuantity?: number;
  cartProductId?: number;
}

export interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}

export interface TempCartProduct {
  productId: number;
  cartProductId: number;
  cartProductQuantity: number;
}
