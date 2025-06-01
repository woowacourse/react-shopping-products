import styled from '@emotion/styled';

import { Flex } from '@/shared/components/Flex';
import { IconButton } from '@/shared/components/IconButton';
import { Text } from '@/shared/components/Text';

import { Product } from '../types/Product';
import ProductQuantityCounter from './ProductQuantityCounter';
import NoImage from '../../../../public/NoImage.svg';
import AddCart from '../../../../public/AddCart.svg';

const FALLBACK_IMAGE_SRC = NoImage;

type ProductItemProps = {
  isChecked: boolean;
  cartCount: number;
  onAddCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete?: () => void;
  variant?: 'default' | 'modal';
} & Pick<Product, 'name' | 'imageUrl' | 'price' | 'quantity'>;

export const ProductItem = ({
  name,
  price,
  imageUrl,
  quantity,
  isChecked = true,
  variant = 'default',
  cartCount,
  onAddCart,
  onIncrease,
  onDecrease,
  onDelete,
}: ProductItemProps) => {
  return (
    <StyledProductItemContainer variant={variant} data-testid="product-item">
      <StyledImageWrapper variant={variant}>
        <StyledProductItemImage
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE_SRC;
          }}
          variant={variant}
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
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          gap=""
        >
          <Text type="Body" weight="medium">
            {name}
          </Text>
          {variant === 'modal' && (
            <IconButton
              variant="secondary"
              onClick={onDelete}
              aria-label="삭제"
              style={{ width: '50px', height: '25px' }}
            >
              삭제
            </IconButton>
          )}
        </Flex>
        <Text type="Body" weight="medium">
          {price}
        </Text>
        <Flex
          direction="row"
          justifyContent={variant === 'modal' ? 'flex-start' : 'flex-end'}
          alignItems="center"
          width="100%"
          gap=""
        >
          {isChecked ? (
            <ProductQuantityCounter
              initialQuantity={cartCount}
              isInCart={isChecked}
              onAddToCart={onAddCart}
              onIncreaseQuantity={onIncrease}
              onDecreaseQuantity={onDecrease}
              onRemoveFromCart={onDecrease}
            />
          ) : (
            <IconButton
              variant="primary"
              src={AddCart}
              onClick={onAddCart}
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

export const StyledProductItemContainer = styled.div<{ variant?: 'default' | 'modal' }>`
  width: ${({ variant }) => (variant === 'modal' ? '100%' : '182px')};
  height: ${({ variant }) => (variant === 'modal' ? '100px' : '224px')};
  padding: 0px;
  display: flex;
  flex-direction: ${({ variant }) => (variant === 'modal' ? 'row' : 'column')};
  align-items: 'center';
  justify-content: ${({ variant }) => (variant === 'modal' ? 'flex-start' : 'center')};
  gap: ${({ variant }) => (variant === 'modal' ? '12px' : '0')};
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${({ variant }) => (variant === 'modal' ? '0' : '0px 4px 8px rgba(0, 0, 0, 0.1)')};
  align-items: center;
  padding-bottom: ${({ variant }) => (variant === 'modal' ? '12px' : '0')};
  border-bottom: ${({ variant }) => (variant === 'modal' ? '1px solid #ddd' : '0')};
`;

export const StyledProductItemImage = styled.img<{ variant?: 'default' | 'modal' }>`
  width: 100%;
  height: 100%;
  border-radius: ${({ variant }) => (variant === 'modal' ? '8px' : '8px 8px 0 0;')};
`;

const StyledImageWrapper = styled.div<{ variant?: 'default' | 'modal' }>`
  position: relative;
  width: ${({ variant }) => (variant === 'modal' ? '80px' : '100%')};
  height: ${({ variant }) => (variant === 'modal' ? '80px' : '112px')};
  flex-shrink: 0;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
