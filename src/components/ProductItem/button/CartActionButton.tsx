import styled from '@emotion/styled';

type CartActionButtonProps = {
  variant: 'add' | 'remove';
  onClick: () => void;
};

const CartActionButton = ({ variant, onClick }: CartActionButtonProps) => {
  return (
    <Button onClick={onClick} variant={variant}>
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

const Button = styled.button<CartActionButtonProps>`
  background-color: ${(props) =>
    props.variant === 'add' ? 'black' : '#EAEAEA'};
  color: ${(props) => (props.variant === 'add' ? 'white' : 'black')};
  border: none;
  width: 70px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'add' ? '#333' : '#D0D0D0'};
  }
  &:active {
    background-color: gray;
  }
`;
