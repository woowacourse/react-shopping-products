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
  handleIncreaseCartItem: (productId: number) => void;
  handleDecreaseCartItem: (productId: number) => void;
  fetchCartItems: () => Promise<void>;
}

export default function ProductCard({
  product,
  handleIncreaseCartItem,
  handleDecreaseCartItem,
  cartItem,
  fetchCartItems,
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
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Button css={controlButtonStyle} onClick={() => handleDecreaseCartItem(product.id)}>
                <Text css={controlButtonTextStyle} variant="body-0">
                  -
                </Text>
              </Button>
              <Text variant="title-2">{cartItem.quantity}</Text>
              <Button css={controlButtonStyle} onClick={() => handleIncreaseCartItem(product.id)}>
                <Text css={controlButtonTextStyle} variant="body-0">
                  ＋
                </Text>
              </Button>
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
