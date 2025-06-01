import postShoppingCart from "../../api/shoppingCart/postShoppingCart";
import * as S from "../../styles/Product/ProductItem.styles";
import { CartItem } from "../Common/Modal";
import { Product } from "./ProductList";
import QuantityController from "../Common/QuantityController";

type ProductItemProps = {
  cartItems: CartItem[];
  refetch: () => Promise<void>;
} & Product;

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  quantity,
  cartItems,
  refetch,
}: ProductItemProps) {
  const count =
    cartItems.find((item: CartItem) => item.product.id === id)?.quantity || 0;

  return (
    <S.Li id={String(id)}>
      <S.ImgWrapper imageUrl={imageUrl}>
        {quantity === 0 && <S.SoldOutOverlay>품절</S.SoldOutOverlay>}
      </S.ImgWrapper>
      <S.ProductInfoWrapper>
        <S.ProductInfo>
          <S.Title>{name}</S.Title>
          <S.Price>{price.toLocaleString("ko")}원</S.Price>
        </S.ProductInfo>
        {quantity !== 0 && (
          <S.ButtonWrapper>
            {count === 0 ? (
              <S.Button
                onClick={async () => {
                  await postShoppingCart({ productId: id, quantity: 1 });
                  refetch();
                }}
                data-testid={`add-btn-${id}`}
              >
                <S.Img
                  src="/assets/addShoppingCartIcon.png"
                  alt="addShoppingCartIcon"
                />
                <S.ButtonText>담기</S.ButtonText>
              </S.Button>
            ) : (
              <QuantityController
                productId={id}
                count={count}
                refetch={refetch}
              />
            )}
          </S.ButtonWrapper>
        )}
      </S.ProductInfoWrapper>
    </S.Li>
  );
}
