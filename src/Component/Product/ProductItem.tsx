import styled from '@emotion/styled';
import { ProductTypes } from '../../types/ProductTypes';
import postShoppingCart from '../../api/postShoppingCart';
import { CartItemTypes } from '../../types/CartItemType';
import { useEffect, useState } from 'react';
import CountControl from './CountControl';
import patchShoppingCart from '../../api/patchShoppingCart';
import { css } from '@emotion/react';

type SetProducts = {
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
  quantity: number;
  updateErrorMessage: (errorMessage: string) => void;
};

export default function ProductItem({
  id,
  name,
  price,
  imageUrl,
  updateCartItems,
  getMatchCartItem,
  checkMax,
  quantity,
  updateErrorMessage,
}: ProductTypes & SetProducts) {
  const cartItemQuantity = getMatchCartItem(id)?.quantity;

  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCount(cartItemQuantity ?? 0);
  }, [cartItemQuantity]);

  const isItemInCart = getMatchCartItem(id) ? true : false;
  const cartItemId = getMatchCartItem(id)?.id;

  const handleItemClick = () => {
    if (quantity === 0) return;
    setActive((prev) => !prev);
  };

  const handleControlClick = async (type: 'increase' | 'decrease') => {
    try {
      if (type === 'increase') {
        if (quantity === count) {
          updateErrorMessage('수량 초과');
          setDisabled(true);
          return;
        }
        if (checkMax()) throw new Error('50개 초과');

        setCount((prev) => prev + 1);

        if (count === 0) await postShoppingCart(id, 1);

        if (cartItemId) {
          await patchShoppingCart(cartItemId, count + 1);
        }
      }

      if (type === 'decrease') {
        if (count === 0) return;

        setCount((prev) => prev - 1);

        if (quantity === count) setDisabled(false);
        if (cartItemId) {
          await patchShoppingCart(cartItemId, count - 1);
        }
      }

      updateCartItems();
    } catch (error) {
      //
    }
  };

  return (
    <StyledLi id={String(id)}>
      <StyledImgWrapper
        imageUrl={imageUrl}
        isSoldout={quantity === 0}
      ></StyledImgWrapper>
      <StyledProductInfoWrapper>
        <StyledProductInfo>
          <StyledTitle>{name}</StyledTitle>
          <StyledPrice>{price.toLocaleString('ko')}원</StyledPrice>
        </StyledProductInfo>
        <StyledButtonWrapper>
          {active ? (
            <CountControl
              count={count}
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
    </StyledLi>
  );
}

const StyledLi = styled.li`
  height: 224px;
  border-radius: 8px;
  position: relative;
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

const StyledImgWrapper = styled.div<ImgWrapperProps>`
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
