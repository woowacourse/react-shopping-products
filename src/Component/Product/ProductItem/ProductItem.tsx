import { ProductTypes } from "../../../types/ProductTypes";
import { useToggleCartItem } from "../../../domain/hooks/useToggleCartItem";
import { CartItemTypes } from "../../../types/CartItemType";
import addShoppingCartIcon from "../../../assets/addShoppingCartIcon.png";
import removeShoppingCartIcon from "../../../assets/removeShoppingCartIcon.png";
import {
  StyledLi,
  StyledImgWrapper,
  StyledProductInfoWrapper,
  StyledTitle,
  StyledPrice,
  StyledButton,
  StyledImg,
  StyledProductInfo,
  StyledButtonWrapper,
  StyledButtonText,
} from "./ProductItem.styles";

type ProductItemProps = ProductTypes & {
  updateCartItems: () => Promise<void>;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
};

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  updateCartItems,
  getMatchCartItem,
  checkMax,
}: ProductItemProps) {
  const isItemInCart = Boolean(getMatchCartItem(id));

  const handleItemClick = useToggleCartItem(
    id,
    getMatchCartItem,
    checkMax,
    updateCartItems
  );

  return (
    <StyledLi id={String(id)}>
      <StyledImgWrapper imageUrl={imageUrl}></StyledImgWrapper>
      <StyledProductInfoWrapper>
        <StyledProductInfo>
          <StyledTitle>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString("ko")}원</StyledPrice>
        </StyledProductInfo>
        <StyledButtonWrapper>
          <StyledButton
            isItemInCart={!isItemInCart}
            onClick={handleItemClick}
            data-testid={!isItemInCart ? `add-btn-${id}` : `remove-btn-${id}`}
          >
            <StyledImg
              src={!isItemInCart ? addShoppingCartIcon : removeShoppingCartIcon}
              alt={
                !isItemInCart ? "addShoppingCartIcon" : "removeShoppingCartIcon"
              }
            ></StyledImg>
            <StyledButtonText>
              {!isItemInCart ? "담기" : "빼기"}
            </StyledButtonText>
          </StyledButton>
        </StyledButtonWrapper>
      </StyledProductInfoWrapper>
    </StyledLi>
  );
}
