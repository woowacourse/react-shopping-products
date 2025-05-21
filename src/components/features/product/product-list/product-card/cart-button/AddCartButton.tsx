import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface AddCartButtonProps extends ComponentProps<'button'> {
  onAddCartClick: () => void;
}

function AddCartButton({ onAddCartClick, ...props }: AddCartButtonProps) {
  return (
    <Container onClick={onAddCartClick} {...props}>
      <ButtonIcon src="./assets/icons/AddCart.svg" />
      <ButtonText>담기</ButtonText>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: black;
  border-radius: 4px;
  padding: 4px 8px;
`;

const ButtonText = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonIcon = styled.img`
  width: 16px;
  height: 16px;
`;
export default AddCartButton;
