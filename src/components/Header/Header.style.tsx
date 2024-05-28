import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => theme.boxHeight};
  padding: 0px 24px;
  background: ${({ theme }) => theme.color.primary.main};
`;

export const CartIconWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartNumber = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19px;
  height: 19px;
  border-radius: 19px;
  background-color: white;
  bottom: 0px;
  right: 0px;
  padding-top: 1px;
  font-size: 11px;
  font-weight: 700;
`;
