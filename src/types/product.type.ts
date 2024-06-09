export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductListState {
  content: Product[];
  last: boolean;
}
