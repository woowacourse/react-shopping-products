import { useError } from "../../context";
import { useAddItem } from "../../hooks/useAddItem";
import { useFetchCartItems } from "../../hooks/useFetchCartItems";
import { formatPrice } from "../../utils/format";
import { CartActionButton } from "../Button";
import { QuantityControls } from "../QuantityControl/QuantityControl";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledQuantityControls,
  StyledWrapper,
} from "./ProductItem.styled";

export const ProductItem = ({
  id,
  imageUrl,
  name,
  price,
}: Pick<ProductProps, "id" | "imageUrl" | "name" | "price">) => {
  const { setErrorStatus } = useError();
  const { cartItems } = useFetchCartItems();
  const { mutate: addItem } = useAddItem();

  const cartItem = cartItems.find((item) => item.product.id === id);

  const handleAddToCart = async () => {
    try {
      addItem({ productId: id, quantity: 1 });
    } catch (error: any) {
      setErrorStatus(error.response?.status);
    }
  };

  return (
    <StyledProductItem>
      <StyledProductImg src={imageUrl} alt="" />
      <StyledContainer>
        <StyledWrapper>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{formatPrice(price)}</StyledProductPrice>
        </StyledWrapper>

        {cartItem ? (
          <StyledQuantityControls>
            <QuantityControls cartItemId={cartItem.id} quantity={cartItem.quantity} />
          </StyledQuantityControls>
        ) : (
          <CartActionButton onClick={handleAddToCart} />
        )}
      </StyledContainer>
    </StyledProductItem>
  );
};
