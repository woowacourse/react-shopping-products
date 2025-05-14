import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Error, Product } from "../types/product.type";
import fetchProducts from "../APIs/fetchProducts";
import { INITIAL_ERROR } from "./context.constant";

interface ProductsContextType {
  products: Product[];
  productsError: Error;
  handleChangeProducts: (newProducts: Product[]) => void;
  handleChangeSort: (newSort: "낮은 가격순" | "높은 가격순") => void;
  handleChangeCategory: (newCategory: "패션잡화" | "식료품") => void;
  category: string;
  sort: string;
  isProductsLoading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<Error>(INITIAL_ERROR);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("price,asc");

  const handleChangeProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const handleChangeSort = (newSort: "낮은 가격순" | "높은 가격순") => {
    setSort(newSort === "낮은 가격순" ? "price,asc" : "price,desc");
  };

  const handleChangeCategory = (newCategory: "패션잡화" | "식료품" | "") => {
    setCategory(newCategory);
  };

  useEffect(() => {
    const params = {
      page: "0",
      size: "20",
      sort,
    };

    const query = new URLSearchParams(params).toString();
    const endpoint = `/products?${query}`;

    (async () => {
      setIsProductsLoading(true);
      try {
        const fetchedData = await fetchProducts({ endpoint });
        setProducts(fetchedData);
        setProductsError(INITIAL_ERROR);
      } catch (error) {
        setProductsError({
          isError: true,
          errorMessage: "상품을 불러오는 데 실패했습니다. 다시 시도해주세요.",
        });
        setTimeout(() => {
          setProductsError(INITIAL_ERROR);
        }, 3000);
        setProducts([]);
      } finally {
        setIsProductsLoading(false);
      }
    })();
  }, [sort]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsError,
        handleChangeProducts,
        handleChangeSort,
        handleChangeCategory,
        category,
        sort,
        isProductsLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
