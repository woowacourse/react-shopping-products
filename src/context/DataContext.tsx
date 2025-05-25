import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { ResponseProduct, ResponseCartItem } from "../api/types";

interface AppDataState {
  products: {
    data: ResponseProduct[];
    loading: boolean;
    error: string | null;
  };

  cartItems: {
    data: ResponseCartItem[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: AppDataState = {
  products: {
    data: [],
    loading: true,
    error: null,
  },
  cartItems: {
    data: [],
    loading: true,
    error: null,
  },
};

type DataAction =
  | { type: "SET_PRODUCTS_LOADING"; loading: boolean }
  | { type: "SET_PRODUCTS_DATA"; data: ResponseProduct[] }
  | { type: "SET_PRODUCTS_ERROR"; error: string | null }
  | { type: "SET_CART_ITEMS_LOADING"; loading: boolean }
  | { type: "SET_CART_ITEMS_DATA"; data: ResponseCartItem[] }
  | { type: "SET_CART_ITEMS_ERROR"; error: string | null };

function dataReducer(state: AppDataState, action: DataAction): AppDataState {
  switch (action.type) {
    case "SET_PRODUCTS_LOADING":
      return {
        ...state,
        products: {
          ...state.products,
          loading: action.loading,
        },
      };

    case "SET_PRODUCTS_DATA":
      return {
        ...state,
        products: {
          data: action.data,
          loading: false,
          error: null,
        },
      };

    case "SET_PRODUCTS_ERROR":
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.error,
        },
      };

    case "SET_CART_ITEMS_LOADING":
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          loading: action.loading,
        },
      };

    case "SET_CART_ITEMS_DATA":
      return {
        ...state,
        cartItems: {
          data: action.data,
          loading: false,
          error: null,
        },
      };

    case "SET_CART_ITEMS_ERROR":
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
}

interface DataContextValue {
  state: AppDataState;

  setProductsLoading: (loading: boolean) => void;
  setProductsData: (data: ResponseProduct[]) => void;
  setProductsError: (error: string | null) => void;

  setCartItemsLoading: (loading: boolean) => void;
  setCartItemsData: (data: ResponseCartItem[]) => void;
  setCartItemsError: (error: string | null) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const setProductsLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_PRODUCTS_LOADING", loading });
  }, []);

  const setProductsData = useCallback((data: ResponseProduct[]) => {
    dispatch({ type: "SET_PRODUCTS_DATA", data });
  }, []);

  const setProductsError = useCallback((error: string | null) => {
    dispatch({ type: "SET_PRODUCTS_ERROR", error });
  }, []);

  const setCartItemsLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_CART_ITEMS_LOADING", loading });
  }, []);

  const setCartItemsData = useCallback((data: ResponseCartItem[]) => {
    dispatch({ type: "SET_CART_ITEMS_DATA", data });
  }, []);

  const setCartItemsError = useCallback((error: string | null) => {
    dispatch({ type: "SET_CART_ITEMS_ERROR", error });
  }, []);

  const value: DataContextValue = {
    state,
    setProductsLoading,
    setProductsData,
    setProductsError,
    setCartItemsLoading,
    setCartItemsData,
    setCartItemsError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
