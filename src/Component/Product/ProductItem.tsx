// import { useToggleCartItem } from "../../../domain/hooks/useToggleCartItem";
import {
  StyledButtonWrapper,
  StyledImgWrapper,
  StyledLi,
  StyledPrice,
  StyledProductInfo,
  StyledProductInfoWrapper,
  StyledTitle,
} from "../../styles/Product/ProductItem.styles";
import { Product } from "./ProductList";

type ProductItemProps = Product & {
  // updateCartItems: () => Promise<void>;
  // getMatchCartItem: (id: number) => CartItemTypes | undefined;
  // checkMax: () => boolean;
};

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
}: // updateCartItems,
// getMatchCartItem,
// checkMax,
ProductItemProps) {
  // const isItemInCart = Boolean(getMatchCartItem(id));

  // const handleItemClick = useToggleCartItem(
  //   id
  //   // getMatchCartItem,
  //   // checkMax,
  //   // updateCartItems
  // );

  return (
    <StyledLi id={String(id)}>
      <StyledImgWrapper imageUrl={imageUrl}></StyledImgWrapper>
      <StyledProductInfoWrapper>
        <StyledProductInfo>
          <StyledTitle>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString("ko")}원</StyledPrice>
        </StyledProductInfo>
        <StyledButtonWrapper>
          {/* <StyledButton
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
          </StyledButton> */}
        </StyledButtonWrapper>
      </StyledProductInfoWrapper>
    </StyledLi>
  );
}

// // GET /cart-items?id=123 요청
// const res = await fetch(`${baseUrl}/cart-items?id=${productId}`);
// const data = await res.json() as { content: Array<{ id: number; quantity: number; product: ProductType }> };
// // 반환된 content 배열에서 첫 번째 요소의 quantity를 꺼냄
// const qty = data.content[0]?.quantity ?? 0;
