import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@sebin0580/modal';

import { useControlQuantity } from '@/features/CartList/hooks/useControlQuantity';
import { QuantitySelector } from '@/features/ProductList/components/QuantitySelector';
import { CartItem } from '@/features/ProductList/types/Cart';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

export const CartItemDetail = ({ id, quantity, product }: CartItem) => {
  const { increaseQuantity, decreaseQuantity, removeCartItem } = useControlQuantity(id);
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      gap=""
      css={css`
        border-top: 1px solid #e5e5e5;
        margin-top: 16px;
      `}
    >
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="4px"
        height="100px"
        padding="8px 0"
        margin="12px 0 0 0"
      >
        <StyledCartItemImg src={product.imageUrl} alt={product.imageUrl} />
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="4px"
          width="100%"
          height="100%"
          margin="0 0 0 8px"
        >
          <Text type="Body" weight="semibold">
            {product.name}
          </Text>
          <Text type="Caption" weight="regular">
            {product.price.toLocaleString()}원
          </Text>
          <QuantitySelector
            count={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
        </Flex>
      </Flex>
      <Button
        variant="outlined"
        size="xs"
        color="#e5e5e5"
        fontColor="black"
        css={css`
          margin-top: 8px;
        `}
        onClick={removeCartItem}
      >
        삭제
      </Button>
    </Flex>
  );
};

const StyledCartItemImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
`;
