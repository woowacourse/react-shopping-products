import { useError } from "../../context";
import { useAddItem } from "../../hooks/useAddItem";
import { useFetchCartItems } from "../../hooks/useFetchCartItems";
import { formatPrice } from "../../utils/format";
import { AddToCartButton } from "../Button";
import { QuantityControls } from "../QuantityControl/QuantityControl";
import * as S from "./ProductItem.styled";

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
    <S.StyledProductItem>
      <S.StyledProductImg src={imageUrl} alt="" />
      <S.StyledContainer>
        <S.StyledWrapper>
          <S.StyledProductName>{name}</S.StyledProductName>
          <S.StyledProductPrice>{formatPrice(price)}</S.StyledProductPrice>
        </S.StyledWrapper>

        {cartItem ? (
          <S.StyledQuantityControls>
            <QuantityControls cartItemId={cartItem.id} quantity={cartItem.quantity} />
          </S.StyledQuantityControls>
        ) : (
          <AddToCartButton onClick={handleAddToCart} />
        )}
      </S.StyledContainer>
    </S.StyledProductItem>
  );
};
