import deleteShoppingCart from "../../api/deleteShoppingCart";
import getShoppingCart from "../../api/getShoppingCart";
import postShoppingCart from "../../api/postShoppingCart";
import patchShoppingCart from "../../api/patchShoppingCart";
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
  StyledQuantityController,
  StyledcontrollButton,
  StyledControllImg,
} from "../../styles/Product/ProductItem.styles";
import { CartItem } from "../Common/Modal";
import { Product } from "./ProductList";

export default function ProductItem({ id, name, price, imageUrl }: Product) {
  const { data, refetch } = useAPI({
    fetcher: () => getShoppingCart(),
    name: "cart",
  });

  const count =
    data?.content.find((item: CartItem) => item.product.id === id)?.quantity ||
    0;

  return (
    <StyledLi id={String(id)}>
      <StyledImgWrapper imageUrl={imageUrl}></StyledImgWrapper>
      <StyledProductInfoWrapper>
        <StyledProductInfo>
          <StyledTitle>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString("ko")}원</StyledPrice>
        </StyledProductInfo>
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
            <StyledQuantityController>
              <StyledcontrollButton
                onClick={async () => {
                  if (count === 1) {
                    await deleteShoppingCart(id);
                  } else {
                    await patchShoppingCart(id, count - 1);
                  }
                  refetch();
                }}
                data-testid={`remove-btn-${id}`}
              >
                <StyledControllImg
                  src="/assets/decreaseItemButtonIcon.png"
                  alt="decreaseItemButtonIcon"
                />
              </StyledcontrollButton>

              <StyledButtonText>{count}</StyledButtonText>

              <StyledcontrollButton
                onClick={async () => {
                  if (data.length >= 50) {
                    throw new Error("50개 초과");
                  }
                  await patchShoppingCart(id, count + 1);
                  refetch();
                }}
              >
                <StyledControllImg
                  src="/assets/increaseItemButtonIcon.png"
                  alt="increaseItemButtonIcon"
                />
              </StyledcontrollButton>
            </StyledQuantityController>
          )}
        </StyledButtonWrapper>
      </StyledProductInfoWrapper>
    </StyledLi>
  );
}
