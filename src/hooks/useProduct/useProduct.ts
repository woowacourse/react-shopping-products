import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/productContext";
import { Product } from "../../types/response.types";

export default function useProduct<T extends Product[] | null>({
  fetchFn,
}: {
  fetchFn: () => Promise<T>;
}) {
  const context = useContext(ProductContext);
  if (!context) throw new Error("ProductProvider 내부에서 사용해야 합니다.");
  const { products, setProducts } = context;

  useEffect(() => {
    async function setData() {
      const data = await fetchFn();
      setProducts(data);
    }

    setData();
  }, [fetchFn, setProducts]);

  return { products };
}
