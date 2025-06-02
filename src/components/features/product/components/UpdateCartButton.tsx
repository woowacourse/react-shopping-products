import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface UpdateCartButtonProps {
  actionType: 'plus' | 'minus' | 'delete';
}

function UpdateCartButton({
  actionType,
  ...props
}: UpdateCartButtonProps & ComponentProps<'button'>) {
  return (
    <Container {...props}>
      {actionType === 'plus' ? (
        <img src="./assets/icons/Plus.svg" />
      ) : actionType === 'minus' ? (
        <img src="./assets/icons/Minus.svg" />
      ) : (
        <img src="./assets/icons/DeleteCart.svg" width={12} />
      )}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;

  border: 1px solid #0000001a;
  border-radius: 8px;
`;

export default UpdateCartButton;
