import getShoppingCart from "../../api/getShoppingCart";
import postShoppingCart from "../../api/postShoppingCart";
import { useAPI } from "../../domain/contexts/APIContext";
import {
  StyledButton,
  StyledButtonText,
  StyledButtonWrapper,
  StyledImg,
  StyledImgWrapper,
  StyledLi,
  StyledPrice,
  StyledProductInfo,
  StyledProductInfoWrapper,
  StyledTitle,
  StyledSoldOutOverlay,
} from "../../styles/Product/ProductItem.styles";
import { CartItem } from "../Common/Modal";
import { Product } from "./ProductList";
import QuantityController from "../Common/QuantityController";

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: Product) {
  const { data, refetch } = useAPI({
    fetcher: () => getShoppingCart(),
    name: "cart",
  });

  const count =
    data?.content.find((item: CartItem) => item.product.id === id)?.quantity ||
    0;

  return (
    <StyledLi id={String(id)}>
      <StyledImgWrapper imageUrl={imageUrl}>
        {quantity === 0 && <StyledSoldOutOverlay>품절</StyledSoldOutOverlay>}
      </StyledImgWrapper>
      <StyledProductInfoWrapper>
        <StyledProductInfo>
          <StyledTitle>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString("ko")}원</StyledPrice>
        </StyledProductInfo>
        {quantity !== 0 && (
          <StyledButtonWrapper>
            {count === 0 ? (
              <StyledButton
                onClick={async () => {
                  await postShoppingCart(id, 1);
                  refetch();
                }}
                data-testid={`add-btn-${id}`}
              >
                <StyledImg
                  src="/assets/addShoppingCartIcon.png"
                  alt="addShoppingCartIcon"
                />
                <StyledButtonText>담기</StyledButtonText>
              </StyledButton>
            ) : (
              <QuantityController
                productId={id}
                count={count}
                refetch={refetch}
              />
            )}
          </StyledButtonWrapper>
        )}
      </StyledProductInfoWrapper>
    </StyledLi>
  );
}
