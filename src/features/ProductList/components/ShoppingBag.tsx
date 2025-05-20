import styled from '@emotion/styled';

type ShoppingBagProps = {
  count: number;
};

export const ShoppingBag = ({ count = 0 }: ShoppingBagProps) => {
  return (
    <StyledShoppingBagButton>
      <StyledShoppingBagIcon src="./ShoppingBag.svg" alt="Shopping Bag" />
      {count > 0 && <StyledShoppingBagCount>{count}</StyledShoppingBagCount>}
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
