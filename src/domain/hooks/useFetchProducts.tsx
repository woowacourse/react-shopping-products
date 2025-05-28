import { useState, useEffect } from "react";
import getProducts from "../../api/getProducts";
import type { ProductType } from "../../types/ProductType";

export type Status = "idle" | "loading" | "success" | "error";

export default function useFetchProducts(
  updateErrorMessage: (msg: string) => void
): {
  products: ProductType[];
  status: Status;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
} {
  const [products, setProducts] = useState<ProductType[]>([]);
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
