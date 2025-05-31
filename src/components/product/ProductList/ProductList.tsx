import ProductItem from "../ProductItem/ProductItem";

import { Product as ProductType } from "../../../types/Product";

import * as Styled from "./ProductList.styled";

import useShoppingCartData from "../../../hooks/shoppingCart/useShoppingCartData";
import useShoppingCartActions from "../../../hooks/shoppingCart/useShoppingCartActions";

interface ProductListProps {
  productList: readonly ProductType[];
}

function ProductList({ productList }: ProductListProps) {
  const { cartItems } = useShoppingCartData();

  const {
    handleAddProduct,
    handleIncreaseCartItemQuantity,
    handleDecreaseCartItemQuantity,
  } = useShoppingCartActions();

  const cartItemsProductIdList = cartItems.map(
    (cartItem) => cartItem.product.id
  );

  return (
    <Styled.UlContainer>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInCart={cartItemsProductIdList.includes(product.id)}
          quantity={
            cartItems.find((cartItem) => cartItem.product.id === product.id)
              ?.quantity || 0
          }
          handleAddProduct={handleAddProduct}
          handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
          handleDecreaseCartItemQuantity={handleDecreaseCartItemQuantity}
        />
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
