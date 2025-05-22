import type { CartItem } from "../types/cartContents";
import type { ProductWithQuantity } from "../types/product";

export const products: ProductWithQuantity[] = [
  {
    id: 1,
    name: "맛있는 양파",
    price: 3000,
    imageUrl: "https://via.placeholder.com/150",
    category: "식료품",
    quantity: 10,
  },
  {
    id: 2,
    name: "편안한 슬리퍼",
    price: 12000,
    imageUrl: "https://via.placeholder.com/150",
    category: "패션잡화",
    quantity: 10,
  },
  {
    id: 3,
    name: "유기농 당근",
    price: 4000,
    imageUrl: "https://via.placeholder.com/150",
    category: "식료품",
    quantity: 10,
  },
  {
    id: 4,
    name: "트렌디한 모자",
    price: 25000,
    imageUrl: "https://via.placeholder.com/150",
    category: "패션잡화",
    quantity: 10,
  },
  {
    id: 5,
    name: "신선한 사과",
    price: 5000,
    imageUrl: "https://via.placeholder.com/150",
    category: "식료품",
    quantity: 10,
  },
];

export const cartItems: CartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: products[0],
  },
];
