import { Flex } from '@/components/common';
import styled from '@emotion/styled';
import { useCartActions } from '../../cart/hooks/useCartActions';
import AddCartButton from './AddCartButton';
import UpdateCartButton from './UpdateCartButton';
import { isValidImageUrl } from '@/util/isValidImageUrl';

interface ProductProps {
  id: string;
  cartId?: string;
  cartCount: number;
  name: string;
  price: number;
  imageUrl: string;
  isInCart: boolean;
  quantity: number;
}

function ProductCard({
  id,
  cartId,
  cartCount,
  name,
  price,
  imageUrl,
  isInCart,
  quantity,
}: ProductProps) {
  const { addCart, deleteCart, updateCart } = useCartActions();

  return (
    <Container data-testid={`product-${id}`}>
      <PreviewBox>
        <PreviewImage
          src={
            isValidImageUrl(imageUrl)
              ? imageUrl
              : './assets/img/default_product.png'
          }
          alt="상품 이미지"
        />
        {quantity === 0 && (
          <SoldOutOverlay>
            <SoldOutText>품절</SoldOutText>
          </SoldOutOverlay>
        )}
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        {quantity !== 0 &&
          (isInCart ? (
            <UpdateCartBox>
              {cartCount === 1 ? (
                <UpdateCartButton
                  actionType="delete"
                  onClick={() => deleteCart(cartId)}
                />
              ) : (
                <UpdateCartButton
                  actionType="minus"
                  onClick={() => updateCart(cartId, cartCount - 1)}
                />
              )}
              <Text>{cartCount}</Text>
              <UpdateCartButton
                actionType="plus"
                onClick={() => updateCart(cartId, cartCount + 1)}
              />
            </UpdateCartBox>
          ) : (
            <AddCartButton onClick={() => addCart(id)} />
          ))}
      </InfoBox>
    </Container>
  );
}

const Container = styled(Flex)`
  width: 182px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 112px;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 112px;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SoldOutText = styled.p`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const InfoBox = styled(Flex)`
  padding: 8px;
  gap: 24px;
  align-items: flex-end;
`;

const ProductTitle = styled.p`
  ${({ theme }) => theme.title};
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.body2};
`;

const UpdateCartBox = styled(Flex)`
  width: fit-content;
  flex-direction: row;
  gap: 4px;
`;

const Text = styled.p`
  width: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
`;

export default ProductCard;
