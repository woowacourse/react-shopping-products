import styled from '@emotion/styled';

export const Container = styled.header`
  width: 100%;
  height: 64px;
  background-color: #000000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const CartStock = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #000000;
  position: absolute;
  bottom: 7px;
  right: 12px;
  z-index: 100;
`;

export const Button = styled.button`
  outline: unset;
  background-color: transparent;
  border: none;
  position: relative;
`;
