import ProductItem from "../ProductItem/ProductItem";

import { Product as ProductType } from "../../../types/Product";

import * as Styled from "./ProductList.styled";
import { CartItem } from "../../../types/FetchCartItemsResult";

interface ProductListProps {
  cartItems: CartItem[];
  productList: readonly ProductType[];
  handleAddProduct: (productId: number) => void;
  handleIncreaseCartItemQuantity: (productId: number) => void;
  handleDecreaseCartItemQuantity: (productId: number) => void;
}

function ProductList({
  cartItems,
  productList,
  handleAddProduct,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
}: ProductListProps) {
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
