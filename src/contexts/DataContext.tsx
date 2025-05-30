import { createContext, useContext, useState } from "react";
import { CartItem } from "../api/cartItems";
import { END_POINT } from "../api/constants/endPoint";
import { ProductResponse } from "../api/products";
import useData from "../hooks/useData";

export type BasketProductInfo = {
  productId: number;
  basketId: number;
};

type BasketProductInfos = BasketProductInfo[];

interface UIState {
  error: boolean;
  errorMessage: string;
  setError: (v: boolean) => void;
  setErrorMessage: (msg: string) => void;
}

interface CartState {
  cartItems: CartItem[] | null;
  basketProductsIds: BasketProductInfos;
  fetchCartItems: () => void;
}

interface ProductState {
  products: ProductResponse[] | null;
  refetchProducts: () => void;
}

interface DataContextType {
  ui: UIState;
  cart: CartState;
  product: ProductState;
  isLoading: boolean;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: cartItems,
    isLoading: isCartLoading,
    refetch: fetchCartItems,
  } = useData<CartItem[]>(END_POINT.CART, {
    queryParams: { page: 0, size: 50 },
  });

  const {
    data: products,
    isLoading: isProductLoading,
    refetch: refetchProducts,
  } = useData<ProductResponse[]>(END_POINT.PRODUCT, {
    queryParams: { page: 0, size: 20 },
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const basketProductsIds = cartItems
    ? cartItems
        .filter((item) => item.product)
        .map((item) => ({
          productId: item.product.id,
          basketId: item.id,
        }))
    : [];

  const contextValue: DataContextType = {
    ui: { error, errorMessage, setError, setErrorMessage },
    cart: { cartItems, basketProductsIds, fetchCartItems },
    product: { products, refetchProducts },
    isLoading: isCartLoading || isProductLoading,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("DataContext는 DataProvider 내에서 사용해주세요.");
  return context;
};

export const useCartContext = () => useDataContext().cart;
export const useProductContext = () => useDataContext().product;
export const useUIContext = () => useDataContext().ui;
