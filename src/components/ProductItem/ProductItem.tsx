import { useEffect } from "react";

import usePatchCartItemQuantity from "../../hooks/cart-items/usePatchCartItemQuantity";
import useToasts from "../../hooks/useToasts";
import useCartItem from "../../hooks/cart-items/useCartItem";
import useAddCartItem from "../../hooks/cart-items/useAddCartItem";

import Stepper from "../Stepper/Stepper";

import { Product } from "../../types/products";

import { AddToCartIcon } from "../../assets";

import * as Styled from "./ProductItem.style";

interface ProductProps {
  product: Product;
}

export default function ProductItem({ product }: ProductProps) {
  const { addToast } = useToasts();
  const { handleAddCartItem } = useAddCartItem();
  const { handleIncreaseQuantity, handleDecreaseQuantity, error } = usePatchCartItemQuantity();
  const { checkIsInCart, getCartItem } = useCartItem();

  const isInCart = checkIsInCart(product.id);
  const cartItem = getCartItem(product.id);

  useEffect(() => {
    if (error instanceof Error) {
      addToast(error.message);
    }
  }, [error, addToast]);

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
