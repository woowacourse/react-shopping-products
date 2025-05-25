import ErrorToast from "../components/ErrorToast";
import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import OrbitSpinner from "../components/OrbitSpinner/index";
import { useAPIContext } from "../contexts/API/useAPIContext";
import getProducts from "../APIs/products/getProducts";
import { Category, Product, SortOption } from "../types/product.type";
import { useCallback, useMemo, useState } from "react";
import Header from "../components/Header";
import CartModal from "../components/CartModal/CartModal";
import getShoppingCart from "../APIs/shoppingCart/getShoppingCart";
import { useErrorContext } from "../contexts/Error/ErrorContext";

interface ProductListPageProps {
  handleModal: () => void;
  isOpen: boolean;
}

const ProductListPage = ({ isOpen, handleModal }: ProductListPageProps) => {
  const [category, setCategory] = useState<Category>("전체");
  const [sort, setSort] = useState<SortOption>("낮은 가격순");
  const { error } = useErrorContext();

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
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
  const fetchProducts = useCallback(() => {
    return getProducts({ endpoint });
  }, [endpoint]);
  const name = `products-${category}-${sort}`;

  const { data: products, isLoading } = useAPIContext<Product[]>({
    name,
    fetcher: fetchProducts,
  });

  const { data: cartItems } = useAPIContext({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });

  return (
    <>
      <Header onCartClick={handleModal} cartItems={cartItems ?? []} />
      <ProductListToolBar
        category={category}
        sort={sort}
        setCategory={handleCategoryChange}
        setSort={handleSortChange}
      />
      {error.isError && <ErrorToast errorMessage={error.errorMessage} />}
      {isLoading && !products ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList
          products={products ?? []}
          cartItems={cartItems ?? []}
        />
      )}

      <CartModal
        isOpen={isOpen}
        onModalClose={handleModal}
        cartItems={cartItems ?? []}
      />
    </>
  );
};

export default ProductListPage;
