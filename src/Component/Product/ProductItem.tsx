import styled from '@emotion/styled';
import { ProductTypes } from '../../types/ProductTypes';
import postShoppingCart from '../../api/postShoppingCart';
import { CartItemTypes } from '../../types/CartItemType';
import { useState } from 'react';
import CountControl from './CountControl';
import patchShoppingCart from '../../api/patchShoppingCart';
import { css } from '@emotion/react';
import getShoppingCart from '../../api/getShoppingCart';
import { useAPIContext } from '../Common/Provider';

type SetProducts = {
  quantity: number;
  updateErrorMessage: (errorMessage: string) => void;
  isRow: boolean;
};

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  quantity,
  isRow,
  updateErrorMessage,
}: ProductTypes & SetProducts) {
  const { data: cartItems, refetchData: updateCartItems } = useAPIContext<
    CartItemTypes[]
  >({
    apiFn: () => getShoppingCart(),
    key: 'cartItems',
  });

  const getMatchCartItem = (id: number) => {
    const match = cartItems?.find((e) => e.product.id === id);
    return match;
  };

  const checkMax = () => {
    return cartItems?.length === 50;
  };

  const [active, setActive] = useState(isRow);
  const [disabled, setDisabled] = useState(false);

  const cartItemQuantity = getMatchCartItem(id)?.quantity ?? 0;
  const isItemInCart = getMatchCartItem(id) ? true : false;
  const cartItemId = getMatchCartItem(id)?.id;

  const handleItemClick = () => {
    if (quantity === 0) return;
    setActive((prev) => !prev);
  };

  const handleControlClick = async (type: 'increase' | 'decrease') => {
    try {
      if (type === 'increase') {
        if (quantity === cartItemQuantity) {
          updateErrorMessage('수량 초과');
          setDisabled(true);
          return;
        }
        if (checkMax()) throw new Error('50개 초과');

        if (cartItemQuantity === 0) await postShoppingCart(id, 1);

        if (cartItemId) {
          await patchShoppingCart(cartItemId, cartItemQuantity + 1);
        }
      }

      if (type === 'decrease') {
        if (cartItemQuantity === 0) return;

        if (quantity === cartItemQuantity) setDisabled(false);
        if (cartItemId) {
          await patchShoppingCart(cartItemId, cartItemQuantity - 1);
        }
      }

      updateCartItems();
    } catch (error) {
      //
    }
  };

  return (
    <StyledContainer id={String(id)} isRow={isRow}>
      <StyledImgWrapper
        isRow={isRow}
        imageUrl={imageUrl}
        isSoldout={quantity === 0}
      ></StyledImgWrapper>
      <StyledProductInfoWrapper isRow={isRow}>
        <StyledProductInfo>
          <StyledTitle isRow={isRow}>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString('ko')}원</StyledPrice>
        </StyledProductInfo>
        <StyledButtonWrapper isRow={isRow}>
          {active ? (
            <CountControl
              count={cartItemQuantity}
              onClick={handleControlClick}
              disabled={disabled}
            />
          ) : (
            <StyledButton
              isItemInCart={!isItemInCart}
              onClick={handleItemClick}
              data-testid={!isItemInCart ? `add-btn-${id}` : `remove-btn-${id}`}
              isSoldout={quantity === 0}
            >
              <StyledImg
                src="./addShoppingCartIcon.png"
                alt="addShoppingCartIcon"
              ></StyledImg>
              <StyledButtonText>담기</StyledButtonText>
            </StyledButton>
          )}
        </StyledButtonWrapper>
      </StyledProductInfoWrapper>
    </StyledContainer>
  );
}

const styles = css`
  display: flex;
  height: 80px;
  gap: 0px;
`;

const StyledContainer = styled.div<{ isRow: boolean }>`
  height: 224px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;

  ${({ isRow }) => isRow && styles}
`;

type ImgWrapperProps = Pick<ProductTypes, 'imageUrl'> & { isSoldout: boolean };
type StyledButtonProps = {
  isItemInCart: boolean;
  isSoldout: boolean;
};

const disabledStyles = css`
  background: #000000;
  opacity: 0.2;
  cursor: auto;
`;

const StyledImgWrapper = styled.div<ImgWrapperProps & { isRow: boolean }>`
  width: 100%;
  height: 50%;
  background-image: ${(props) => `url(${props.imageUrl})`},
    url('https://lh3.googleusercontent.com/proxy/3Fqjhno28S6v1khXPS44ukHF-8y2Kue7oKfnyqCR4_vX7ze7O20WFu7CzZTq_KQaLwDrpMUNFhUD345MdmKB9ZzzejPJCfHmRAf2rMIzQhkFy9n9kMPPAf4hi7wIZm0cmjLSnTkiaj3g9mAA');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0px 0px;

  ${({ isSoldout }) =>
    isSoldout &&
    css`
      &::before {
        height: 50%;
        content: 'SOLDOUT';
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: bold;
        border-radius: 8px 8px 0 0;
      }
    `}

  ${({ isRow }) =>
    isRow &&
    css`
      height: 100%;
      width: 80px;
      border-radius: 8px;
    `}
`;

const StyledProductInfoWrapper = styled.div<{ isRow: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  padding: 8px 15px 8px 8px;
  box-sizing: border-box;

  ${({ isRow }) =>
    isRow &&
    css`
      height: 100%;
    `}
`;

const StyledTitle = styled.span<{ isRow: boolean }>`
  font-weight: 700;
  font-size: 14px;

  ${({ isRow }) =>
    isRow &&
    css`
      font-size: 16px;
    `}
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
  background-color: #000000;
  color: #ffffff;
  padding: 0px;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  border: none;
  cursor: pointer;

  ${({ isSoldout }) => isSoldout && disabledStyles}
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

const StyledButtonWrapper = styled.div<{ isRow: boolean }>`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;

  ${({ isRow }) =>
    isRow &&
    css`
      justify-content: flex-start;
    `}
`;

const StyledButtonText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
