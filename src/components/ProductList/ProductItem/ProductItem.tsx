import { SyntheticEvent, forwardRef, useMemo } from "react";
import * as PI from "./ProductItem.style";
import AddCart from "../../../assets/add-cart.svg";
import Counter from "../../Counter/Counter";
import useCartItemMutation from "../../../hooks/useCartItemMutation";
import useCartItemsQuery from "../../../hooks/useCartItemsQuery";
import defaultImage from "../../../assets/default-image.png";
interface ProductProps {
  product: Product;
}

const ProductItem = forwardRef<HTMLDivElement, ProductProps>(
  ({ product }, ref) => {
    const { cartItems } = useCartItemsQuery();
    const cartItem = useMemo(
      () => cartItems.find((cartItem) => cartItem.product.id === product.id),
      [cartItems, product.id]
    );

    const {
      appendProductInCart,
      handleDecreaseQuantityButtonClick,
      handleIncreaseQuantityButtonClick,
    } = useCartItemMutation();

    const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = defaultImage;
    };

    return (
      <PI.ProductItemStyle ref={ref}>
        <PI.ProductImg
          src={`${product.imageUrl}`}
          alt={`${product.name} 상품 이미지`}
          onError={handleImageError}
        />
        <PI.ProductGroup>
          <PI.ProductContent>
            <PI.ProductName>{product.name}</PI.ProductName>
            <span>{product.price.toLocaleString("ko-kr")}원</span>
          </PI.ProductContent>

          <PI.ButtonContainer>
            {cartItem ? (
              <Counter
                count={cartItem.quantity}
                decrease={() => handleDecreaseQuantityButtonClick(cartItem)}
                increase={() => handleIncreaseQuantityButtonClick(cartItem)}
              />
            ) : (
              <PI.AppendCartButton
                onClick={() => appendProductInCart(product.id)}
              >
                <img src={AddCart} alt="장바구니 추가" />
                <span>담기</span>
              </PI.AppendCartButton>
            )}
          </PI.ButtonContainer>
        </PI.ProductGroup>
      </PI.ProductItemStyle>
    );
  }
);

export default ProductItem;
