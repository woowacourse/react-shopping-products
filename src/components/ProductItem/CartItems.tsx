import styled from "@emotion/styled";
import QuantityAdjuster from "./QuantityAdjuster";
import CartActionButton from "./button/CartActionButton";
import { useAPI, useAPIData } from "../../hooks/useApi";
import { CartItem } from "../../types/productType";
import getCartItems from "../../api/getCartItems";
import useCart from "../../hooks/useCart";
import { useContext } from "react";
import { APIContext } from "../../contexts/DataContext";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "./nullImage.png";
};

const getTotalAmount = (arr: number[]) => {
  if (arr.length === 0) return 0;
  return arr.reduce((current, total) => {
    return current + total;
  });
};

const CartItems = () => {
  const { setErrorMessage } = useContext(APIContext);
  const { refetch } = useAPI({
    fetcher: getCartItems,
    name: "cartItems",
  });
  const { patchQuantity, removeFromCart } = useCart({
    setErrorMessage,
    refetch,
  });

  const cartItems = useAPIData<{ data: { content: CartItem[] } }>("cartItems");
  const handleProductRemoveClick = (id: number) => removeFromCart(id);
  if (!cartItems) return null;

  return (
    <>
      {cartItems.data.content.map((cart) => (
        <CartItemContainer key={cart.product.name}>
          <CartItemImage
            src={cart.product.imageUrl}
            alt={cart.product.name}
            onError={handleImageError}
          />
          <CartItemDescription>
            <CartItemNameText>{cart.product.name}</CartItemNameText>
            <PriceText>{cart.product.price.toLocaleString()}원</PriceText>
            <QuantityAdjuster
              count={cart.quantity}
              onIncreaseClick={() => patchQuantity(cart.id, cart.quantity + 1)}
              onDecreaseClick={() => patchQuantity(cart.id, cart.quantity - 1)}
            />
          </CartItemDescription>
          <DeleteButtonContainer>
            <CartActionButton
              variant="remove"
              onClick={() => handleProductRemoveClick(cart.id)}
            />
          </DeleteButtonContainer>
        </CartItemContainer>
      ))}

      <TotalAmountContainer>
        <TotalAmountText>총 결제 금액</TotalAmountText>
        <TotalAmount>
          {getTotalAmount(
            cartItems.data.content.map(
              (cart) => cart.quantity * cart.product.price
            )
          ).toLocaleString()}
          원
        </TotalAmount>
      </TotalAmountContainer>
    </>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const CartItemImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const CartItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmountText = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const CartItemNameText = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const PriceText = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const TotalAmount = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const DeleteButtonContainer = styled.div`
  margin-left: auto;
`;

export default CartItems;
