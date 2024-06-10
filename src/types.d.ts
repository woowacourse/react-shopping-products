interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItemProps {
  id: number;
  quantity: number;
  product: ProductProps;
}

type SortOrder = "asc" | "desc";

interface UseProductsResult {
  products: ProductProps[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  isLastPage: boolean;
  setSortOption: (sortOption: SortOrder) => void;
  setCategory: (category: string) => void;
  resetPage: () => void;
  selectedCategory: string;
  selectedSort: string;
  page: number;
}
