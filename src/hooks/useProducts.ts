import { Product } from "@/types/products";
import { useEffect, useState } from "react";
import { getProducts } from "@/apis/product";
import { Category, Sort } from "@/constants/selectOption";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchFirstPage = async (category: Category, page: number, sort: Sort) => {
    const res = await getProducts({ category, page, sort });
    setProducts(res.content);
  };

  const fetchNextPage = async (category: Category, page: number, sort: Sort) => {
    setCurrentPage((prevPage) => prevPage + 1);
    const res = await getProducts({ category, page, sort });
    setProducts((prevProducts) => [...prevProducts, ...res.content]);
  };

  useEffect(() => {
    fetchFirstPage("전체", currentPage, "낮은 가격순");
  }, []);

  return { products, fetchFirstPage, fetchNextPage };
};

export default useProducts;
