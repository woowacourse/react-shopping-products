import usePatchCartItemQuantity from "../../hooks/cart-items/usePatchCartItemQuantity";
import useFetchCartItem from "../../hooks/cart-items/useFetchCartItem";
import useAddCartItem from "../../hooks/cart-items/useAddCartItem";

import Stepper from "../Stepper/Stepper";

import { Product } from "../../types/products";

import { AddToCartIcon } from "../../assets";
import * as Styled from "./ProductItem.style";

interface ProductProps {
  product: Product;
}

export default function ProductItem({ product }: ProductProps) {
  const { handleAddCartItem } = useAddCartItem();
  const { handleIncreaseQuantity, handleDecreaseQuantity } = usePatchCartItemQuantity();
  const { checkIsInCart, getCartItem } = useFetchCartItem();

  const isInCart = checkIsInCart(product.id);
  const cartItem = getCartItem(product.id);

  return (
    <Styled.ProductItemBox>
      <Styled.ProductImage $imageUrl={product.imageUrl} />
      <Styled.ProductContentBox>
        <Styled.ProductDescriptionBox>
          <h2>{product.name}</h2>
          {product.price.toLocaleString("ko-KR")}원
        </Styled.ProductDescriptionBox>
        <Styled.ProductFooter>
          {isInCart && cartItem ? (
            <Stepper
              value={cartItem.quantity}
              onDecrease={() => handleDecreaseQuantity(cartItem.id, cartItem.quantity)}
              onIncrease={() => handleIncreaseQuantity(cartItem.id, cartItem.quantity)}
            />
          ) : (
            <Styled.ProductCartButton
              $isInCart={isInCart}
              onClick={() => handleAddCartItem(product.id)}
            >
              <img src={AddToCartIcon} />
              담기
            </Styled.ProductCartButton>
          )}
        </Styled.ProductFooter>
      </Styled.ProductContentBox>
    </Styled.ProductItemBox>
  );
}
