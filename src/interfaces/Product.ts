export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export enum Category {
  전체 = "",
  도서 = "books",
  운동용품 = "fitness",
  음료 = "beverage",
  전자제품 = "electronics",
  주방용품 = "kitchen",
  패션잡화 = "fashion",
}
