// 상품 개별 항목 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// 정렬 정보 타입
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지네이션 정보 타입
export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
}

// 전체 응답 타입
export interface ProductPageResponse {
  content: Product[];
  totalPages: number;
  size: number;
}
