import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import getProducts from "../../api/product/getProducts";
import { ProductType } from "../../types/ProductType";

type Status = "idle" | "loading" | "success" | "error";

interface ProductsContextType {
  productsData: ProductType[] | null;
  productsStatus: Status;
  productsError: string;
  refetchProducts: (category?: string, sort?: string) => Promise<void>;
}

const ProductsApiContext = createContext<ProductsContextType | undefined>(
  undefined
);

interface ProductsProviderProps {
  children: ReactNode;
}

export function ProductsApiProvider({ children }: ProductsProviderProps) {
  const [productsData, setProductsData] = useState<ProductType[] | null>(null);
  const [productsStatus, setProductsStatus] = useState<Status>("idle");
  const [productsError, setProductsError] = useState<string>("");

  const fetchProducts = useCallback(
    async (category?: string, sort?: string) => {
      setProductsError("");
      setProductsStatus("loading");

      try {
        const res = await getProducts(category, {
          page: 0,
          size: 20,
          sort,
        });
        if (!res) {
          throw new Error("상품 목록을 가져오지 못했습니다.");
        }
        setProductsData(res.content);
        setProductsStatus("success");
      } catch (err: unknown) {
        setProductsStatus("error");
        setProductsError(
          err instanceof Error
            ? err.message
            : "상품 목록을 불러오는 중 알 수 없는 오류가 발생했습니다."
        );
      }
    },
    []
  );

  useEffect(() => {
    if (productsData === null) {
      fetchProducts();
    }
  }, [productsData, fetchProducts]);

  const value: ProductsContextType = {
    productsData,
    productsStatus,
    productsError,
    refetchProducts: fetchProducts,
  };

  return (
    <ProductsApiContext.Provider value={value}>
      {children}
    </ProductsApiContext.Provider>
  );
}

export function useProductsApi() {
  const context = useContext(ProductsApiContext);
  if (!context) {
    throw new Error(
      "useProductsApi는 ProductsApiProvider 내부에서만 호출할 수 있습니다."
    );
  }
  return context;
}
