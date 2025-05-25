import styled from '@emotion/styled';
import { Product } from '../../../App';
import useCartItems from '../../../hooks/useCartItems';

type AddCartItemButtonProps = {
  product: Product;
};
type ButtonProps = {
  isSoldOut?: boolean;
};

const AddCartItemButton = ({ product }: AddCartItemButtonProps) => {
  const { addToCart, isLoading: isCartItemsLoading } = useCartItems();

  const handleClickAddButton = () => {
    addToCart(product);
  };

  const isSoldOut = product.quantity === 0;

  return (
    <Button
      onClick={handleClickAddButton}
      disabled={isCartItemsLoading || isSoldOut}
      isSoldOut={isSoldOut}
    >
      <AddIcon />
      담기
    </Button>
  );
};

export default AddCartItemButton;

const AddIcon = () => {
  return <Image src="/addToCartIcon.svg" alt="add-button" />;
};

const Image = styled.img`
  width: 17px;
  height: 17px;
`;

const Button = styled.button<ButtonProps>`
  background-color: black;
  color: white;
  border: none;
  width: 70px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: ${({ isSoldOut }) => (isSoldOut ? 'not-allowed' : 'pointer')};
`;
