import { forwardRef, useState } from "react";
import * as PI from "./ProductItem.style";
import CartControlButton from "../../Button/CartControlButton";
import { postProductInCart } from "../../../api";

interface ProductProps {
  product: Product;
  initialIsInCart: boolean;
}

const ProductItem = forwardRef<HTMLDivElement, ProductProps>(
  ({ product, initialIsInCart }, ref) => {
    const [isInCart, setIsInCart] = useState(initialIsInCart);

    const handleIsInCart = () => {
      setIsInCart(!isInCart);
      postProductInCart(product.id);
    };

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
          <CartControlButton onClick={handleIsInCart} isInCart={isInCart} />
        </PI.ProductGroup>
      </PI.ProductItemStyle>
    );
  }
);

export default ProductItem;
