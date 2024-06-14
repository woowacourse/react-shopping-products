import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 430px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.black};

  padding: 0 24px;
  justify-content: space-between;

  z-index: ${({ theme }) => theme.zIndex.header};
`;

export const Logo = styled.img`
  width: 56px;
  height: 16px;
`;

export const Button = styled.button`
  position: relative;
`;

export const CartIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const CartItemQuantity = styled.div`
  position: absolute;
  bottom: 0%;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 19px;
  height: 19px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-weight: 700;
`;
