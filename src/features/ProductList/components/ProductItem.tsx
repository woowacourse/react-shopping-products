import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { IconButton } from '@/shared/components/IconButton';
import { Text } from '@/shared/components/Text';

import NoImage from '../../../../public/NoImage.svg';
import { Product } from '../types/Product';
import ItemCounter from './ItemCounter';

const FALLBACK_IMAGE_SRC = NoImage;

type ProductItemProps = {
  isChecked: boolean;
  cartCount: number;
  onCartUpdate: () => void;
} & Pick<Product, 'name' | 'imageUrl' | 'price' | 'quantity'>;

export const ProductItem = ({
  name,
  price,
  imageUrl,
  quantity,
  isChecked = true,
  onCartUpdate,
}: ProductItemProps) => {
  return (
    <StyledProductItemContainer>
      <StyledImageWrapper>
        <StyledProductItemImage
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE_SRC;
          }}
        />
        {quantity === 0 && (
          <SoldOutOverlay>
            <span>품절</span>
          </SoldOutOverlay>
        )}
      </StyledImageWrapper>
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
          {price}
        </Text>
        <Flex direction="row" justifyContent="flex-end" alignItems="center" width="100%" gap="">
          {isChecked ? (
            <ItemCounter
              initial={quantity}
              handleDeleteToCart={onCartUpdate} // 상태 리셋은 상위에서 하도록
            />
          ) : (
            <IconButton
              variant="primary"
              src="./AddCart.svg"
              onClick={onCartUpdate} // 여기서 toggle 실행
              aria-label="장바구니 담기"
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

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 112px;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0 0;
`;
