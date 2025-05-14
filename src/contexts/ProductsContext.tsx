import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import fetchProducts from "../APIs/fetchProducts";

interface ProductsContextType {
  products: Product[];
  isError: boolean;
  handleChangeProducts: (newProducts: Product[]) => void;
  handleChangeSort: (newSort: "낮은 가격순" | "높은 가격순") => void;
  handleChangeCategory: (newCategory: "패션잡화" | "식료품") => void;
  category: string;
  sort: string;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

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
      try {
        const fetchedData = await fetchProducts({ endpoint });
        setProducts(fetchedData);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        setProducts([]);
      }
    })();
  }, [sort]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isError,
        handleChangeProducts,
        handleChangeSort,
        handleChangeCategory,
        category,
        sort,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
