import { DEFAULT_IMAGE_URL } from "@/constants/images";
import { GetCartItemsResponse, GetProductResponse } from "@/types";
import { AddCart, RemoveCart } from "@/components/icons";
import { Button, Card, Spacing, Text } from "@/components";
import * as S from "./ProductCard.styles";

interface ProductCardProps {
  product: GetProductResponse["content"][number];
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  cartItems: GetCartItemsResponse;
}

export default function ProductCard({ product, cartItems, handleAddCartItem, handleDeleteCartItem }: ProductCardProps) {
  return (
    <Card key={product.id}>
      <Card.Preview>
        <img
          src={product.imageUrl}
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
          {cartItems && cartItems.content.find((item) => item.product.id === product.id) ? (
            <Button backgroundColor="#fff" onClick={() => handleDeleteCartItem(product.id)}>
              <RemoveCart />
              <Text>빼기</Text>
            </Button>
          ) : (
            <Button onClick={() => handleAddCartItem(product.id)}>
              <AddCart />
              <Text color="#fff">담기</Text>
            </Button>
          )}
        </S.ButtonWrapper>
      </Card.Content>
    </Card>
  );
}
