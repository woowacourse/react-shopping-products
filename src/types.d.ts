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

interface fetchParams {
  page: number;
  category: string;
  sortOption: string;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
}
