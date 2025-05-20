import { useState, useEffect } from "react";
import { Product, Error } from "../../types/product.type";
import { INITIAL_ERROR } from "../../contexts/context.constant";
import getProducts from "../../APIs/products/getProducts";

export function useProductsFetch(sort: string, category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(INITIAL_ERROR);

  useEffect(() => {
    const params = { page: "0", size: "20", sort };
    const query = new URLSearchParams(params).toString();
    const endpoint =
      category === "전체"
        ? `/products?${query}`
        : `/products?${query}&category=${category}`;

    (async () => {
      setIsLoading(true);
      try {
        const { content } = await getProducts({ endpoint });
        setProducts(content);
        setError(INITIAL_ERROR);
      } catch {
        setError({
          isError: true,
          errorMessage: "상품을 불러오는 데 실패했습니다.",
        });
        setTimeout(() => setError(INITIAL_ERROR), 3000);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sort, category]);

  return { products, isLoading, error, setProducts };
}
