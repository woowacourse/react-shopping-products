import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { IconButton } from '@/shared/components/IconButton';
import { Text } from '@/shared/components/Text';

import { Product } from '../types/Product';

// TODO : boolean 값 변경에 따른 이미지 변경
export const ProductItem = ({
  name,
  price,
  imageUrl,
}: Pick<Product, 'name' | 'imageUrl' | 'price'>) => {
  console.log('imageUrl', imageUrl);
  return (
    <StyledProductItemContainer>
      <StyledProductItemImage src={imageUrl} alt={name} />
      <Flex direction="column" alignItems="flex-start" gap="8px" padding="8px" width="100%">
        <Text type="Title" weight="semibold">
          {name}
        </Text>
        <Text type="Title" weight="semibold">
          {price}
        </Text>
        <Flex direction="row" justifyContent="flex-end" width="100%">
          <IconButton src={imageUrl}>담기</IconButton>
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
`;

export const StyledProductItemImage = styled.img`
  width: 100%;
  height: 112px;
  border-radius: 8px 8px 0 0;
`;
