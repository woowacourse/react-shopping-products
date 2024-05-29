import { forwardRef, useState } from "react";
import * as PI from "./ProductItem.style";
import CartControlButton from "../../Button/CartControlButton";
import { deleteProductInCart, postProductInCart } from "../../../api";

interface ProductProps {
  product: Product;
  cartItems: CartItem[];
}

const ProductItem = forwardRef<HTMLDivElement, ProductProps>(
  ({ product, cartItems }, ref) => {
    const cartItemIds = cartItems.map((item) => item.product.id);
    const initialIsInCart = cartItemIds.includes(product.id);
    const [isInCart, setIsInCart] = useState(initialIsInCart);

    const handleIsInCart = async () => {
      if (isInCart) {
        setIsInCart(!isInCart);
        const filtered = cartItems.filter(
          (item) => item.product.id === product.id
        );
        deleteProductInCart(filtered[0].id);
      } else {
        setIsInCart(!isInCart);
        postProductInCart(product.id);
      }
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
