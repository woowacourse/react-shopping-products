import styled from '@emotion/styled';
import useCartItems from '../../../hooks/useCartItems';
import { Product } from '../../../App';

type QuantityStepperProps = {
  product: Product;
};

const QuantityStepper = ({ product }: QuantityStepperProps) => {
  const {
    cartItems,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCartItems();

  const cartItemQuantity =
    cartItems.find((item) => item.product.id === product.id)?.quantity || 0;

  const handleClickIncrementButton = () => {
    increaseCartItemQuantity(product.id);
  };

  const handleClickDecrementButton = () => {
    if (cartItemQuantity === 1) {
      removeFromCart(product.id);
      return;
    }
    decreaseCartItemQuantity(product.id);
  };

  return (
    <QuantityStepperContainer>
      <QuantityStepperButton onClick={handleClickDecrementButton}>
        -
      </QuantityStepperButton>
      <QuantityDisplay>{cartItemQuantity}</QuantityDisplay>
      <QuantityStepperButton onClick={handleClickIncrementButton}>
        +
      </QuantityStepperButton>
    </QuantityStepperContainer>
  );
};

export default QuantityStepper;

const QuantityStepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 30px;
`;

const QuantityStepperButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 24px;
  border: 1px solid rgb(221, 221, 221);
  background-color: white;
  border-radius: 12px;
  cursor: pointer;
`;

const QuantityDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 14px;
`;
