import { useContext } from "react";
import { ProductFilterContext } from "../contexts/ProductFilterContext";

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      "useProductFilter는 ProductFilterProvider 안에서만 사용할 수 있습니다."
    );
  }
  return context;
};
