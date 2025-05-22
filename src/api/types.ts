export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ResponseCartItem {
  id: number;
  quantity: number;
  product: ResponseProduct;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiConfigType {
  method: HttpMethod;
  isAuthorization: boolean;
  body?: Record<string, string | number>;
}

export interface initializeApiParamsType {
  size: string;
  page: string;
}

export interface ProductParamsType extends initializeApiParamsType {
  sort: string;
  category?: string;
}

export interface AddCartParamsType {
  productId: number;
  quantity: number;
}
