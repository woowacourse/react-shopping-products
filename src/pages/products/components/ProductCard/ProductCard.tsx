import { Button, Card, Spacing, Text } from "@/components";
import { AddCart, RemoveCart } from "@/components/icons";
import { DEFAULT_IMAGE_URL } from "@/constants/images";
import { GetCartItemsResponse, GetProductResponse } from "@/types";
import * as S from "./ProductCard.styles";
import { useState } from "react";
import { getCartItems, postCartItems } from "@/apis";
import { useFetch } from "@/hooks";
import { css } from "@emotion/react";

interface ProductCardProps {
  product: GetProductResponse["content"][number];
  cartItem: GetCartItemsResponse["content"][number] | undefined;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  fetchCartItems: () => Promise<void>;
}

export default function ProductCard({
  product,
  handleAddCartItem,
  handleDeleteCartItem,
  cartItem,
  fetchCartItems,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  const handleCartItemIncrease = async () => {
    await postCartItems({
      productId: product.id,
      quantity: quantity + 1,
    });
    await fetchCartItems();
  };
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Button css={controlButtonStyle} onClick={handleDecrease}>
                <Text css={controlButtonTextStyle} variant="body-0">
                  -
                </Text>
              </Button>
              <Text variant="title-2">{cartItem.quantity}</Text>
              <Button css={controlButtonStyle} onClick={handleCartItemIncrease}>
                <Text css={controlButtonTextStyle} variant="body-0">
                  ＋
                </Text>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                handleAddCartItem(product.id);
                setQuantity(1);
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

const controlButtonStyle = css`
  padding: 0;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  width: 24px;
  height: 24px;
  background: #fff;
  text-align: center;
`;

const controlButtonTextStyle = css`
  width: 100%;
`;
