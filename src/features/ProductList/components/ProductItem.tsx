import { get } from 'http';

import styled from '@emotion/styled';

import { addCartItem } from '@/api/cart';
import { Flex } from '@/shared/components/Flex';
import { IconButton } from '@/shared/components/IconButton';
import { Text } from '@/shared/components/Text';

import { Product } from '../types/Product';

type ProductItemProps = {
  isChecked: boolean;
  onCartUpdate: () => void;
} & Pick<Product, 'id' | 'name' | 'imageUrl' | 'price'>;

export const ProductItem = ({
  id,
  name,
  price,
  imageUrl,
  isChecked = true,
  onCartUpdate,
}: ProductItemProps) => {
  return (
    <StyledProductItemContainer>
      <StyledProductItemImage src={imageUrl} alt={name} />
      <Flex direction="column" alignItems="flex-start" gap="4px" padding="8px" width="100%">
        <Text type="Body" weight="medium">
          {name}
        </Text>
        <Text type="Body" weight="medium">
          {price}
        </Text>
        <Flex direction="row" justifyContent="flex-end" width="100%">
          <IconButton
            variant={isChecked ? 'secondary' : 'primary'}
            src={isChecked ? `./RemoveCart.png` : `./AddCart.png`}
            onClick={onCartUpdate}
          >
            {isChecked ? '빼기' : '담기'}
          </IconButton>
        </Flex>
      </Flex>
    </StyledProductItemContainer>
  );
};

export const StyledProductItemContainer = styled.div`
  width: 182px;
  height: 224px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledProductItemImage = styled.img`
  width: 100%;
  height: 112px;
  border-radius: 8px 8px 0 0;
`;
