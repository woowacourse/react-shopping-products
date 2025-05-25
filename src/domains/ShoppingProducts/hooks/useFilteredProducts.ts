import { useMemo } from "react";
import { useShoppingContext } from "../context/useShoppingContext";

export function useFilteredProducts() {
  const context = useShoppingContext();
  if (!context) throw new Error("No context");

  const { product, filter, category } = context;

  return useMemo(() => {
    let result = [...product.item];

    if (category !== "전체") {
      result = result.filter((p) => p.category === category);
    }

    if (filter === "낮은 가격순") {
      result.sort((a, b) => a.price - b.price);
    } else if (filter === "높은 가격순") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [product.item, category, filter]);
}
