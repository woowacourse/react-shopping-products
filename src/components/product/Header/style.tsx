import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 430px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.black};

  padding: 0 24px;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 56px;
  height: 16px;
`;

export const CartIcon = styled.img`
  width: 32px;
  height: 32px;
`;
