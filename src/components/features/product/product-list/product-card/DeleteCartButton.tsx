import styled from '@emotion/styled';
import { ComponentProps } from 'react';

function DeleteCartButton({ ...props }: ComponentProps<'button'>) {
  return (
    <Container {...props}>
      <ButtonIcon src="./assets/icons/DeleteCart.svg" />
      <ButtonText>빼기</ButtonText>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: #eaeaea;
  border-radius: 4px;
  padding: 4px 8px;
`;

const ButtonText = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonIcon = styled.img`
  width: 16px;
  height: 16px;
`;
export default DeleteCartButton;
