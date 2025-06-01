import { Button, Card, PlusMinusButton, Spacing, Text } from "@/components";
import { AddCartIcon } from "@/components/icons";
import { DEFAULT_IMAGE_URL } from "@/constants/images";
import { CartItem, Product } from "@/types";
import * as S from "./ProductCard.styles";

interface ProductCardProps {
  product: Product;
  cartItem: CartItem | undefined;
  onIncreaseCartItem: (productId: number) => void;
  onDecreaseCartItem: (productId: number) => void;
  isLoading: boolean;
}

export default function ProductCard({
  product,
  onIncreaseCartItem,
  onDecreaseCartItem,
  cartItem,
  isLoading,
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
          <Text variant="title-1" css={S.soldOutText}>
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
            <div css={S.buttonWrapper}>
              <PlusMinusButton
                quantity={cartItem.quantity}
                onAddButtonClick={() => !isLoading && onIncreaseCartItem(product.id)}
                onMinusButtonClick={() => !isLoading && onDecreaseCartItem(product.id)}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                onIncreaseCartItem(product.id);
              }}
            >
              <AddCartIcon />
              <Text color="#fff">담기</Text>
            </Button>
          )}
        </S.ButtonWrapper>
      </Card.Content>
    </Card>
  );
}
