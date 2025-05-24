import { useState, useCallback } from "react";
import getProducts from "../../api/getProducts";
import type { ProductType } from "../../types/ProductType";
import { useCartContext } from "../contexts/CartContext";

export type FilterValue =
  | "all"
  | "grocery"
  | "fashion"
  | "낮은 가격순"
  | "높은 가격순";

export function useProductFilters(setProducts: (prods: ProductType[]) => void) {
  const [category, setCategory] = useState<FilterValue>("all");
  const [price, setPrice] = useState<FilterValue>("낮은 가격순");
  const { updateErrorMessage: onError } = useCartContext();

  const fetchProducts = useCallback(
    async (category: FilterValue, price: FilterValue) => {
      try {
        const categoryParam = category === "all" ? "" : category;
        const sortParam = price === "낮은 가격순" ? "price,asc" : "price,desc";
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
