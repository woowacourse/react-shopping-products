type Category = '전체' | '패션잡화' | '식료품';
type SortOption = '낮은 가격순' | '높은 가격순';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}

interface FetchProductsResponse {
  content: Product[];
  totalPages: number;
}

interface FetchProductsRequest {
  endpoint: string;
}

export type {
  Product,
  Category,
  SortOption,
  FetchProductsResponse,
  FetchProductsRequest,
};
