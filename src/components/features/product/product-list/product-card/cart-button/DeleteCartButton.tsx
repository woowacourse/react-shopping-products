import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface DeleteCartButtonProps extends ComponentProps<'button'> {
  onDeleteCartClick: () => void;
}

function DeleteCartButton({
  onDeleteCartClick,
  ...props
}: DeleteCartButtonProps) {
  return (
    <Container onClick={onDeleteCartClick} {...props}>
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
