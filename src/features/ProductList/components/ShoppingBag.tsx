import styled from '@emotion/styled';

import { useData } from '@/shared/context/useData';

type ShoppingBagProps = {
  onOpenModal: () => void;
};

export const ShoppingBag = ({ onOpenModal }: ShoppingBagProps) => {
  const { cartData } = useData();
  const cartDataLength = cartData.data?.length || 0;

  return (
    <StyledShoppingBagButton onClick={onOpenModal}>
      <StyledShoppingBagIcon src="./ShoppingBag.svg" alt="Shopping Bag" />
      {cartDataLength > 0 && <StyledShoppingBagCount>{cartDataLength}</StyledShoppingBagCount>}
    </StyledShoppingBagButton>
  );
};

const StyledShoppingBagButton = styled.button`
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
`;

const StyledShoppingBagIcon = styled.img`
  width: 25px;
  height: 23px;
`;

const StyledShoppingBagCount = styled.span`
  position: absolute;
  width: 18px;
  height: 18px;
  bottom: -5px;
  right: -7px;
  border-radius: 999px;
  background-color: #ffffff;
  color: #000000;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
  text-align: center;
`;
