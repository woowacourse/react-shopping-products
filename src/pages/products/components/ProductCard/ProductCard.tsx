import { AddMinusButton, Button, Card, Spacing, Text } from "@/components";
import { AddCart } from "@/components/icons";
import { DEFAULT_IMAGE_URL } from "@/constants/images";
import { GetCartItemsResponse, GetProductResponse } from "@/types";
import * as S from "./ProductCard.styles";

interface ProductCardProps {
  product: GetProductResponse["content"][number];
  cartItem: GetCartItemsResponse["content"][number] | undefined;
  handleIncreaseCartItem: (productId: number) => void;
  handleDecreaseCartItem: (productId: number) => void;
}

export default function ProductCard({
  product,
  handleIncreaseCartItem,
  handleDecreaseCartItem,
  cartItem,
}: ProductCardProps) {
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
      </Card.Preview>
      <Card.Content>
        <div>
          <Text variant="title-2">{product.name}</Text>
          <Spacing size={8} />
          <Text>{product.price.toLocaleString()}원</Text>
        </div>

        <Spacing size={27} />

        <S.ButtonWrapper>
          {cartItem ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
              <AddMinusButton
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
