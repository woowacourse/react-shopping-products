interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Cart {
  id: number;
  quantity: number;
  product: ProductProps;
}

interface FetchParams {
  page: number;
  category: string;
  sortOption: string;
}
