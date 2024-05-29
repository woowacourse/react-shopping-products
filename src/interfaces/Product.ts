export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export enum Category {
  books = "도서",
  fitness = "운동용품",
  beverage = "음료",
  electronics = "전자제품",
  kitchen = "주방용품",
  fashion = "패션잡화",
}
