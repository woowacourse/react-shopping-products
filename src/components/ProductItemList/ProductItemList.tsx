import { useContext, useEffect, useRef } from "react";
import { QuantityContext } from "../../store/QuantityContext";
import useProductList from "../../hooks/useProductList";
import useCartItemList from "../../hooks/useCartItemList";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";
import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Spinner from "../common/Spinner/Spinner";
import { createPortal } from "react-dom";
import Toast from "../common/Toast/Toast";

interface ProductItemListProp {
  category: Category;
  sortOption: Sorting;
}

function ProductItemList({ category, sortOption }: ProductItemListProp) {
  const {
    productList,
    productListError,
    productListLoading,
    page,
    fetchNextPage,
    isLastPage,
    setPage,
  } = useProductList({
    category,
    sortOption,
  });
  const { cartItemList, isInCart, toggleCartItem, cartItemListError } =
    useCartItemList();
  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  useEffect(() => {
    setPage(0);
  }, [category, sortOption]);

  useEffect(() => {
    if (page === -1 || target.current === null) return;
    observe(target.current);

    const N = productList.length;

    if (0 === N || isLastPage) {
      unobserve(target.current);
    }
  }, [productList, page, observe, unobserve]);
  const quantityContext = useContext(QuantityContext);
  const setQuantity = quantityContext ? quantityContext.setQuantity : () => {};
  setQuantity(cartItemList.length);

  const renderToast = () => {
    if (productListError) {
      return createPortal(
        <Toast message="상품 목록 조회 실패" />,
        document.body
      );
    }
    if (cartItemListError) {
      return createPortal(
        <Toast message="장바구니 목록 조회 실패" />,
        document.body
      );
    }
  };
  return (
    <>
      {renderToast()}
      <S.ProductList>
        {productList.map((product, idx) => {
          return (
            <ProductItem
              key={`${idx}_${product.id}`}
              product={product}
              isInCart={isInCart(product.id)}
              toggleCartItem={() => toggleCartItem(product)}
            />
          );
        })}
      </S.ProductList>
      <div ref={target} style={{ height: "1px" }}></div>
      {productListLoading && <Spinner />}
    </>
  );
}

export default ProductItemList;
