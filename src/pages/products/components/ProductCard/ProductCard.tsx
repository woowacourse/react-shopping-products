import { PlusMinusButton, Button, Card, Spacing, Text } from "@/components";
import { AddCart } from "@/components/icons";
import { DEFAULT_IMAGE_URL } from "@/constants/images";
import { CartItem, Product } from "@/types";
import { css } from "@emotion/react";
import * as S from "./ProductCard.styles";

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;
  handleIncreaseCartItem: (productId: number) => void;
  handleDecreaseCartItem: (productId: number) => void;
}

export default function ProductCard({
  product,
  handleIncreaseCartItem,
  handleDecreaseCartItem,
  cartItem,
}: ProductCardProps) {
  const isSoldOut = product.stock === 0;

  return (
    <Card key={product.id}>
      <Card.Preview>
        <img
          src={product.imageUrl ?? DEFAULT_IMAGE_URL}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE_URL;
          }}
          alt={product.name}
        />
        {isSoldOut && (
          <Text variant="title-1" css={soldOutTextStyle}>
            품절
          </Text>
        )}
      </Card.Preview>
      <Card.Content>
        <div>
          <Text variant="title-2">{product.name}</Text>
          <Spacing size={8} />
          <Text>{product.price.toLocaleString()}원</Text>
        </div>

        <Spacing size={24} />

        <S.ButtonWrapper>
          {cartItem ? (
            <div css={buttonWrapperStyle}>
              <PlusMinusButton
                quantity={cartItem.quantity}
                onAddButtonClick={() => handleIncreaseCartItem(product.id)}
                onMinusButtonClick={() => handleDecreaseCartItem(product.id)}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                handleIncreaseCartItem(product.id);
              }}
            >
              <AddCart />
              <Text color="#fff">담기</Text>
            </Button>
          )}
        </S.ButtonWrapper>
      </Card.Content>
    </Card>
  );
}

const soldOutTextStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;
