import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";
import getProducts from "../../api/getProducts";
import type { ProductType } from "../../types/ProductType";

type Status = "idle" | "loading" | "success" | "error";

export interface ProductContextType {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  status: Status;
  errorMessage: string[];
  refetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const updateErrorMessage = useCallback((msg: string) => {
    setErrorMessage((prev) => [...prev, msg]);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage([]);
  }, []);

  useEffect(() => {
    async function fetchData() {
      clearErrorMessage();
      setStatus("loading");
      try {
        const res = await getProducts();
        setProducts(res.content);
        setStatus("success");
      } catch {
        setStatus("error");
        updateErrorMessage(
          "상품 목록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    }
    fetchData();
  }, [clearErrorMessage, updateErrorMessage]);

  const refetchProducts = useCallback(async () => {
    try {
      const res = await getProducts();
      setProducts(res.content);
    } catch {
      updateErrorMessage(
        "상품 목록 갱신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  }, [updateErrorMessage]);

  const value = useMemo(
    () => ({ products, setProducts, status, errorMessage, refetchProducts }),
    [products, status, errorMessage, refetchProducts]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProductContext(): ProductContextType {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("ProductProvider로 감싸주세요");
  return ctx;
}
