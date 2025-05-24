import { Flex } from '@/components/common';
import { useCartContext } from '@/context/useCartContext';
import { useShopErrorContext } from '@/shop/context/useShopErrorContext';
import styled from '@emotion/styled';
import { addCartItem } from '../api/addCartItem';
import { deleteCartItem } from '../api/deleteCartItem';
import AddCartButton from './AddCartButton';

interface ProductProps {
  id: string;
  cartId: string | null;
  cartCount: number | null;
  name: string;
  price: number;
  imageUrl: string;
  isInCart: boolean;
}

function ProductCard({
  id,
  cartId,
  cartCount,
  name,
  price,
  imageUrl,
  isInCart,
}: ProductProps) {
  const { cartCount: totalCartCount, refetch } = useCartContext();
  const { showErrorMessage, hideErrorMessage } = useShopErrorContext();

  const handleAddCart = async () => {
    try {
      if (totalCartCount >= 50) {
        showErrorMessage('장바구니는 최대 50개까지 담을 수 있습니다.');
        return;
      }
      await addCartItem(id);
      refetch();
      hideErrorMessage();
    } catch {
      showErrorMessage('장바구니에 담는 데 실패했습니다.');
    }
  };

  // const handleDeleteCart = async () => {
  //   try {
  //     if (!cartId) return;

  //     await deleteCartItem(cartId);
  //     refetch();
  //     hideErrorMessage();
  //   } catch {
  //     showErrorMessage('장바구니에서 삭제하는 데 실패했습니다.');
  //   }
  // };

  return (
    <Container data-testid={`product-${id}`}>
      <PreviewBox>
        <PreviewImage src={imageUrl} />
      </PreviewBox>
      <InfoBox>
        <Flex flexDirection="column" gap="sm" alignItems="flex-start">
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        </Flex>
        {isInCart ? (
          <UpdateCartBox>
            <Button>
              <img src="./assets/icons/Minus.svg" />
            </Button>
            <Text>{cartCount}</Text>
            <Button>
              <img src="./assets/icons/Plus.svg" />
            </Button>
          </UpdateCartBox>
        ) : (
          <AddCartButton onClick={handleAddCart} />
        )}
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
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;

  border: 1px solid #0000001a;
  border-radius: 8px;
`;

export default ProductCard;
