import { CartActionButton } from "../Button/CartActionButton";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledWrapper,
} from "./ProductItem.styled";

export const ProductItem = ({
  imageUrl,
  name,
  price,
}: Pick<ProductProps, "imageUrl" | "name" | "price">) => {
  return (
    <StyledProductItem>
      <StyledProductImg src={imageUrl} alt={name} />
      <StyledContainer>
        <StyledWrapper>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price}</StyledProductPrice>
        </StyledWrapper>
        <CartActionButton actionType="abstract" />
      </StyledContainer>
    </StyledProductItem>
  );
};
