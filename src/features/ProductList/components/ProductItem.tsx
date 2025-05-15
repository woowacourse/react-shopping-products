import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { IconButton } from '@/shared/components/IconButton';
import { Text } from '@/shared/components/Text';

import NoImage from '../../../../public/NoImage.svg';
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
  const imgUrl = imageUrl.includes('image') ? imageUrl : NoImage;
  return (
    <StyledProductItemContainer>
      <StyledProductItemImage src={imgUrl} alt={name} />
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
            src={isChecked ? `./RemoveCart.svg` : `./AddCart.svg`}
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
