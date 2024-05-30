import { useEffect, useState } from "react";
import { getCartItems } from "../../api";
import useProducts from "../../hooks/useProducts";
import ProductListHeader from "../ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import { ProductListStyle } from "./ProductList.style";
import { useError } from "../../hooks/useError";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import usePagination from "../../hooks/usePagination";

const ProductList = () => {
  const { page, nextPage, resetPage } = usePagination();

  const { products, handleCategory, handleSort, hasMore } = useProducts({
    page,
    resetPage,
  });

  const { lastElementRef: lastProductElementRef } = useInfiniteScroll({
    hasMore,
    nextPage,
  });

  const { showError } = useError();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setCartItems(cartItems);
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      }
    };

    fetchCartItems();
  }, [showError]);

  return (
    <>
      <ProductListHeader
        handleCategory={handleCategory}
        handleSort={handleSort}
      />
      <ProductListStyle>
        {products.map((item, index) => {
          return (
            <ProductItem
              cartItems={cartItems}
              product={item}
              key={item.id}
              ref={index === products.length - 1 ? lastProductElementRef : null}
            />
          );
        })}
      </ProductListStyle>
    </>
  );
};

export default ProductList;
