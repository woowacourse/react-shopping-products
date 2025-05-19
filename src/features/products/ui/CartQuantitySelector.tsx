import styled from '@emotion/styled';

interface CartQuantitySelectorProps {
  cartQuantity: number;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export default function CartQuantitySelector({ cartQuantity, setCartQuantity }: CartQuantitySelectorProps) {
  const handleMinusClick = () => {
    setCartQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handlePlusClick = () => {
    setCartQuantity((prev) => prev + 1);
  };

  return (
    <CartQuantityContainer>
      <CartQuantitySelectorButton onClick={handleMinusClick}>-</CartQuantitySelectorButton>
      <CartQuantityNumber>{cartQuantity}</CartQuantityNumber>
      <CartQuantitySelectorButton onClick={handlePlusClick}>+</CartQuantitySelectorButton>
    </CartQuantityContainer>
  );
}

const CartQuantityContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  color: #000;
  gap: 12px;
`;

const CartQuantitySelectorButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: #f0f0f0;
  }
`;

const CartQuantityNumber = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
