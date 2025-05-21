import { getProducts } from "@/apis/products/getProducts";
import {
  FilterOption,
  SortOption,
} from "@/components/Product/Content/ProductContent.type";
import { ProductItemType } from "@/types/product";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductContextValue {
  productData: ProductItemType[];
  isLoading: boolean;
  filterOption: FilterOption;
  sortOption: SortOption;
  setFilterOption: (opt: FilterOption) => void;
  setSortOption: (opt: SortOption) => void;
}

export const ProductContext = createContext<ProductContextValue | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext는 ProductContext.Provider 안에서 사용되어야 합니다."
    );
  }
  return context;
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterOption, setFilterOption] = useState<FilterOption>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("낮은 가격순");
  const [productData, setProductData] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const data = await getProducts({ filterOption, sortOption });
      setProductData(data);
      setIsLoading(false);
    }

    fetchProducts();
  }, [filterOption, sortOption]);

  return (
    <ProductContext.Provider
      value={{
        productData,
        isLoading,
        filterOption,
        sortOption,
        setFilterOption,
        setSortOption,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
