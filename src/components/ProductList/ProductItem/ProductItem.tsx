import { forwardRef } from "react";
import * as PI from "./ProductItem.style";
import CartControlButton from "../../Button/CartControlButton";
import useProductInCart from "../../../hooks/useProductInCart";

interface ProductProps {
  product: Product;
}

const ProductItem = forwardRef<HTMLDivElement, ProductProps>(
  ({ product }, ref) => {
    const { isProductInCart, handleProductInCart } = useProductInCart(
      product.id
    );

    return (
      <PI.ProductItemStyle ref={ref}>
        <PI.ProductImg
          src={`${product.imageUrl}`}
          alt={`${product.name} 상품 이미지`}
        />
        <PI.ProductGroup>
          <PI.ProductContent>
            <PI.ProductName>{product.name}</PI.ProductName>
            <span>{product.price.toLocaleString("ko-kr")}원</span>
          </PI.ProductContent>
          <CartControlButton
            onClick={handleProductInCart}
            isInCart={isProductInCart}
          />
        </PI.ProductGroup>
      </PI.ProductItemStyle>
    );
  }
);

export default ProductItem;
