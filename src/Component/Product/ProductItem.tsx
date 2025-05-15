import styled from '@emotion/styled';
import { ProductTypes } from '../../types/ProductTypes';
import postShoppingCart from '../../api/postShoppingCart';
import deleteShoppingCart from '../../api/deleteShoppingCart';
import { CartItemTypes } from '../../types/CartItemType';

type SetProducts = {
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
};

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  updateCartItems,
  getMatchCartItem,
}: ProductTypes & SetProducts) {
  const isItemInCart = getMatchCartItem(id) ? true : false;
  const cartItemId = getMatchCartItem(id)?.id;

  const handleItemClick = async () => {
    try {
      if (!isItemInCart) {
        await postShoppingCart(id, 1);
      } else {
        if (!cartItemId) return;
        await deleteShoppingCart(cartItemId);
      }
      await updateCartItems();
    } catch (e) {
      //
    } finally {
      //
    }
  };

  return (
    <StyledLi id={String(id)}>
      <StyledImgWrapper imageUrl={imageUrl}></StyledImgWrapper>
      <StyledProductInfoWrapper>
        <StyledProductInfo>
          <StyledTitle>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString('ko')}원</StyledPrice>
        </StyledProductInfo>
        <StyledButtonWrapper>
          <StyledButton
            isItemInCart={!isItemInCart}
            onClick={handleItemClick}
            data-testid={!isItemInCart ? `add-btn-${id}` : `remove-btn-${id}`}
          >
            <StyledImg
              src={
                !isItemInCart
                  ? '/addShoppingCartIcon.png'
                  : '/removeShoppingCartIcon.png'
              }
              alt={
                !isItemInCart ? 'addShoppingCartIcon' : 'removeShoppingCartIcon'
              }
            ></StyledImg>
            <StyledButtonText>
              {!isItemInCart ? '담기' : '빼기'}
            </StyledButtonText>
          </StyledButton>
        </StyledButtonWrapper>
      </StyledProductInfoWrapper>
    </StyledLi>
  );
}

const StyledLi = styled.li`
  height: 224px;
  border-radius: 8px;
`;

type ImgWrapperProps = Pick<ProductTypes, 'imageUrl'>;
type StyledButtonProps = Pick<ProductTypes, 'isItemInCart'>;

const StyledImgWrapper = styled.div<ImgWrapperProps>`
  width: 100%;
  height: 50%;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px 8px 0px 0px;
`;

const StyledProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  padding: 8px 15px 8px 8px;
  box-sizing: border-box;
`;

const StyledTitle = styled.span`
  font-weight: 700;
  font-size: 14px;
`;

const StyledPrice = styled.span`
  font-weight: 500;
  font-size: 12px;
`;

const StyledButton = styled.button<StyledButtonProps>`
  width: 59px;
  height: 24px;
  padding: 4px 8px;
  gap: 4px;
  border-radius: 4px;
  background-color: ${(props) => (props.isItemInCart ? '#000000' : '#EAEAEA')};
  color: ${(props) => (props.isItemInCart ? '#FFFFFF' : '#000000')};
  padding: 0px;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  border: none;
  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 15px;
  height: 15px;
`;

const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledButtonText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
