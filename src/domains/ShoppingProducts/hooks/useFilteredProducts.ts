import { useMemo } from "react";
import { useShoppingContext } from "../context/useShoppingContext";

export function useFilteredProducts() {
  const { product, filter, category } = useShoppingContext();

  return useMemo(() => {
    const result = [...product.item].filter((p) => {
      if (category !== "전체") return p.category === category;
      return true;
    });

    if (filter === "낮은 가격순") {
      result.sort((a, b) => a.price - b.price);
    } else if (filter === "높은 가격순") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [product.item, category, filter]);
}
