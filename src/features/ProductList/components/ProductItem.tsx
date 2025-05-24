import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { IconButton } from '@/shared/components/IconButton';
import { Text } from '@/shared/components/Text';

import { QuantitySelector } from './QuantitySelector';

import NoImage from '../../../../public/NoImage.svg';
import { useControlQuantity } from '../hooks/useControlQuantity';
import { Product } from '../types/Product';

export const ProductItem = ({
  id,
  name,
  price,
  imageUrl,
  quantity = 0,
}: Pick<Product, 'id' | 'name' | 'imageUrl' | 'price' | 'quantity'>) => {
  const { isInCart, cartItemQuantity, increaseQuantity, decreaseQuantity } = useControlQuantity(id);

  const imgUrl = imageUrl?.includes('kream') || imageUrl.length == 0 ? NoImage : imageUrl;

  return (
    <StyledProductItemContainer>
      <StyledProductItemImageContainer>
        <StyledProductItemImage src={imgUrl} alt={name} />
        {quantity === 0 && (
          <>
            <StyledSoldOutImage />
            <Text
              type="Heading"
              color="white"
              css={css`
                position: absolute;
              `}
            >
              품절
            </Text>
          </>
        )}
      </StyledProductItemImageContainer>
      <Flex
        direction="column"
        alignItems="flex-start"
        gap="4px"
        padding="8px"
        width="100%"
        justifyContent="center"
      >
        <Text type="Body" weight="medium">
          {name}
        </Text>
        <Text type="Body" weight="medium">
          {price.toLocaleString()}원
        </Text>
        <Flex direction="row" justifyContent="flex-end" alignItems="center" width="100%" gap="">
          {isInCart ? (
            <QuantitySelector
              quantity={quantity}
              count={cartItemQuantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          ) : (
            <IconButton
              variant="primary"
              src="./AddCart.svg"
              onClick={increaseQuantity}
              disabled={quantity === 0}
            >
              담기
            </IconButton>
          )}
        </Flex>
      </Flex>
    </StyledProductItemContainer>
  );
};

export const StyledProductItemContainer = styled.div`
  width: 182px;
  height: 214px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledProductItemImageContainer = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0 0;
  position: relative;
`;

export const StyledProductItemImage = styled.img`
  width: 100%;
  height: 112px;
  border-radius: 8px 8px 0 0;
`;

export const StyledSoldOutImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-position: center;
  border-radius: 8px 8px 0 0;
`;
