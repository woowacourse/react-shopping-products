import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@sebin0580/modal';

import { QuantitySelector } from '@/features/ProductList/components/QuantitySelector';
import { Product } from '@/features/ProductList/types/Product';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

type CartItemDetailProps = {
  onUpdateCartItemQuantity: (id: number, quantity: number) => void;
  onDeleteCartItem: () => void;
} & Pick<Product, 'id' | 'name' | 'imageUrl' | 'price' | 'quantity'>;

export const CartItemDetail = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
  onUpdateCartItemQuantity,
  onDeleteCartItem,
}: CartItemDetailProps) => {
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
        <StyledCartItemImg src={imageUrl} alt={imageUrl} />
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
            {name}
          </Text>
          <Text type="Caption" weight="regular">
            {price.toLocaleString()}원
          </Text>
          <QuantitySelector
            quantity={quantity}
            count={quantity}
            onIncrease={() => onUpdateCartItemQuantity(id, quantity + 1)}
            onDecrease={() => onUpdateCartItemQuantity(id, quantity - 1)}
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
        onClick={onDeleteCartItem}
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
