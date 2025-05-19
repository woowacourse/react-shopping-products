import { useState, useCallback } from "react";
import getProducts from "../api/getProducts";
import type { ProductTypes } from "../types/ProductTypes";

export type FilterValue = "all" | "grocery" | "fashion" | "low" | "high";

export function useProductFilters(
  setProducts: (prods: ProductTypes[]) => void,
  onError: (msg: string) => void
) {
  const [category, setCategory] = useState<FilterValue>("all");
  const [price, setPrice] = useState<FilterValue>("low");

  const fetchProducts = useCallback(
    async (cat: FilterValue, pri: FilterValue) => {
      try {
        const categoryParam = cat === "all" ? "" : cat;
        const sortParam = pri === "low" ? "price,asc" : "price,desc";
        const { content } = await getProducts(categoryParam, {
          page: 0,
          size: 20,
          sort: sortParam,
        });
        setProducts(content);
      } catch {
        onError("상품 목록 조회 중 오류가 발생했습니다.");
      }
    },
    [setProducts, onError]
  );

  const onCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value as FilterValue;
      setCategory(v);
      fetchProducts(v, price);
    },
    [fetchProducts, price]
  );

  const onPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value as FilterValue;
      setPrice(v);
      fetchProducts(category, v);
    },
    [fetchProducts, category]
  );

  return { category, price, onCategoryChange, onPriceChange };
}
