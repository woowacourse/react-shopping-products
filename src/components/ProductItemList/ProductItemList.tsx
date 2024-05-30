import { useContext, useEffect } from "react";
import { QuantityContext } from "../../store/QuantityContext";
import useProductList from "../../hooks/useProductList";
import useCartItemList from "../../hooks/useCartItemList";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";
import { Category } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";

interface ProductItemListProp {
  category: Category;
  sortOption: Sorting;
  onError: (error: string) => void;
}

function ProductItemList({
  category,
  sortOption,
  onError,
}: ProductItemListProp) {
  const { productList, productListError } = useProductList({
    category,
    sortOption,
  });
  const { cartItemList, isInCart, toggleCartItem, cartItemListError } =
    useCartItemList();

  const quantityContext = useContext(QuantityContext);
  const setQuantity = quantityContext ? quantityContext.setQuantity : () => {};
  setQuantity(cartItemList.length);

  if (productListError) {
    onError("상품 목록 조회 실패");
  }
  if (cartItemListError) {
    onError("장바구니 목록 조회 실패");
  }

  return (
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
  );
}

export default ProductItemList;
