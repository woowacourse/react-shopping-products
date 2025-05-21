import { useState, useEffect } from "react";
import getProducts from "../api/getProducts";
import type { ProductTypes } from "../types/ProductTypes";

export type Status = "idle" | "loading" | "success" | "error";

export default function useFetchProducts(
  updateErrorMessage: (msg: string) => void
): {
  products: ProductTypes[];
  status: Status;
  setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>;
} {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setStatus("loading");
        const { content } = await getProducts();
        setProducts(content);
        setStatus("success");
      } catch {
        setStatus("error");
        updateErrorMessage("상품 목록 조회 중 오류가 발생했습니다.");
      }
    }
    fetchProducts();
  }, [updateErrorMessage]);

  return { products, status, setProducts };
}
