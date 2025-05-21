import styled from '@emotion/styled';

type CartActionButtonProps = {
  variant: 'add' | 'remove';
  onClick: () => void;
  isLoading?: boolean;
  isSoldOut?: boolean;
};

const CartActionButton = ({
  variant,
  onClick,
  isLoading,
  isSoldOut = false,
}: CartActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={isLoading || isSoldOut}
      isSoldOut={isSoldOut}
    >
      {variant === 'add' ? <AddIcon /> : <RemoveIcon />}
      {variant === 'add' ? '담기' : '빼기'}
    </Button>
  );
};

export default CartActionButton;

const AddIcon = () => {
  return <Image src="/addToCartIcon.svg" alt="add-button" />;
};

const RemoveIcon = () => {
  return <Image src="/removeFromCartIcon.svg" alt="remove-button" />;
};

const Image = styled.img`
  width: 17px;
  height: 17px;
`;

function getBackgroundColor({
  variant,
  isSoldOut,
}: {
  variant: 'add' | 'remove';
  isSoldOut?: boolean;
}) {
  if (isSoldOut) {
    console.log('sold out');
    return '#EAEAEA';
  }
  return variant === 'add' ? 'black' : '#EAEAEA';
}

const Button = styled.button<CartActionButtonProps>`
  background-color: ${({ variant, isSoldOut }) =>
    getBackgroundColor({ variant, isSoldOut })};
  color: ${(props) => (props.variant === 'add' ? 'white' : 'black')};
  border: none;
  width: 70px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: ${({ isSoldOut }) => (isSoldOut ? 'not-allowed' : 'pointer')};

  ${({ isSoldOut, variant }) =>
    !isSoldOut &&
    `
      &:hover {
        background-color: ${variant === 'add' ? '#333' : '#D0D0D0'};
      }

      &:active {
        background-color: gray;
      }
    `}
`;
