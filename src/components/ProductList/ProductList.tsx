import * as S from "./ProductList.styled";
import ProductItem from "../ProductItem/ProductItem";
import { ResponseCartItem, ResponseProduct } from "../../api/types";

function ProductList({
  productList,
  cartItemList,
  onAddToCart,
  onRemoveFromCart,
  setErrorMessage,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getCartQuantityForProduct,
}: {
  productList: ResponseProduct[];
  cartItemList: ResponseCartItem[];
  onAddToCart: (productId: number) => Promise<void>;
  onRemoveFromCart: (cartItemId: number) => Promise<void>;
  setErrorMessage: (message: string) => void;
  onIncreaseQuantity: (productId: number) => Promise<void>;
  onDecreaseQuantity: (productId: number) => Promise<void>;
  getCartQuantityForProduct: (productId: number) => number;
}) {
  return (
    <S.ProductListContainer>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          cartItemList={cartItemList}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          setErrorMessage={setErrorMessage}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          getCartQuantityForProduct={getCartQuantityForProduct}
        />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
