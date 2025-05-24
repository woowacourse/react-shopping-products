import ErrorToast from "../components/ErrorToast";
import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import OrbitSpinner from "../components/OrbitSpinner/index";
import { useAPIContext } from "../contexts/APIProvider/useAPIContext";
import getProducts from "../APIs/products/getProducts";
import { Category, Product, SortOption } from "../types/product.type";
import { useMemo, useState } from "react";

const ProductListPage = () => {
  const [category, setCategory] = useState<Category>("전체");
  const [sort, setSort] = useState<SortOption>("낮은 가격순");

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    refetch();
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    refetch();
  };

  const endpoint = useMemo(() => {
    const params = new URLSearchParams({
      page: "0",
      size: "20",
      sort: sort === "낮은 가격순" ? "price,asc" : "price,desc",
    });

    if (category !== "전체") {
      params.append("category", category);
    }

    return `/products?${params.toString()}`;
  }, [category, sort]);

  const name = `products-${category}-${sort}`;

  const { data, isLoading, error, refetch } = useAPIContext<Product[]>({
    name,
    fetcher: () => getProducts({ endpoint }),
  });

  return (
    <>
      <ProductListToolBar
        category={category}
        sort={sort}
        setCategory={handleCategoryChange}
        setSort={handleSortChange}
      />
      {error.isError && <ErrorToast errorMessage={error.errorMessage} />}
      {isLoading ? (
        <OrbitSpinner />
      ) : (
        data && <ProductCardList products={data} />
      )}
    </>
  );
};

export default ProductListPage;
