import { CartItem } from "../../../types/FetchCartItemsResult";
import ProductQuantityControl from "../ProductQuantityControl/ProductQuantityControl";
import * as Styled from "./ShoppingCartItem.styled";

interface ShoppingCartItemProps {
  cartItem: CartItem;
  handleRemoveProduct: (productId: number) => void;
  handleIncreaseCartItemQuantity: (productId: number) => void;
  handleDecreaseCartItemQuantity: (productId: number) => void;
}
function ShoppingCartItem({
  cartItem,
  handleRemoveProduct,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
}: ShoppingCartItemProps) {
  const { product, quantity } = cartItem;
  return (
    <li>
      <Styled.Container>
        <Styled.Image src={product.imageUrl} alt={product.name} />
        <Styled.Wrapper>
          <Styled.ProductInfo>
            <Styled.ProductName>{product.name}</Styled.ProductName>
            <Styled.Price>{product.price.toLocaleString()}원</Styled.Price>
            <ProductQuantityControl
              quantity={quantity}
              handleIncreaseCartItemQuantity={() =>
                handleIncreaseCartItemQuantity(product.id)
              }
              handleDecreaseCartItemQuantity={() =>
                handleDecreaseCartItemQuantity(product.id)
              }
            />
          </Styled.ProductInfo>
          <Styled.DeleteButton onClick={() => handleRemoveProduct(product.id)}>
            삭제
          </Styled.DeleteButton>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default ShoppingCartItem;
