import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "치마",
    price: 10000,
    imageUrl: "https://example.com/image1.jpg",
    category: "패션의류",
  },
  {
    id: 2,
    name: "바지",
    price: 20000,
    imageUrl: "https://example.com/image2.jpg",
    category: "패션의류",
  },
];

export const mockExtendedProducts: Product[] = [
  ...mockProducts,
  {
    id: 3,
    category: "식료품",
    name: "코카콜라",
    price: 2000,
    imageUrl: "coke.jpg",
  },
  {
    id: 4,
    category: "식료품",
    name: "사이다",
    price: 2000,
    imageUrl: "cider.jpg",
  },
];

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: mockProducts[0],
  },
];

export const mockList = ["옵션1", "옵션2", "옵션3"] as const;
export const productErrorMessage = "제품 정보를 가져오는데 실패했습니다.";
export const cartErrorMessage = "장바구니 정보를 가져오는데 실패했습니다.";
export const networkErrorMessage = "Failed to fetch";

export const productError = new Error(productErrorMessage);
export const cartError = new Error(cartErrorMessage);
export const networkError = new TypeError(networkErrorMessage);
