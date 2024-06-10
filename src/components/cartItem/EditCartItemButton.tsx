import { MinusButton, PlusButton } from "../Button/QuantityButton";

import AddToCart from "../icons/AddToCart";
import COLOR_PALETTE from "../../style/colorPalette";
import LoadingDots from "../LoadingDots";
import { ToastContext } from "../Toasts/ToastProvider";
import styled from "@emotion/styled";
import useCustomContext from "../../hooks/useCustomContext";
import useManageCartItem from "../../hooks/cartItem/useManageCartItem";
import { useState } from "react";

interface Props {
  id: number;
}

const EditCartItemButton = ({ id }: Props) => {
  const {
    addItemToCart,
    removeItemFromCart,
    itemQuantityInCart,
    editQuantityInCart,
  } = useManageCartItem();
  const [isLoading, setIsLoading] = useState(false);

  const { failAlert } = useCustomContext(ToastContext);

  const handleAddToCart = async () => {
    if (itemQuantityInCart(id) !== 0) {
      return;
    }

    try {
      setIsLoading(true);
      await addItemToCart(id);
    } catch (error) {
      if (error instanceof Error) failAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!(itemQuantityInCart(id) !== 0)) {
      return;
    }

    try {
      setIsLoading(true);
      await removeItemFromCart(id);
    } catch (error) {
      if (error instanceof Error) failAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityInCart = async (quantity: number) => {
    if (!(itemQuantityInCart(id) !== 0) || quantity <= 0) {
      return;
    }

    try {
      setIsLoading(true);
      await editQuantityInCart({ id, quantity });
    } catch (error) {
      if (error instanceof Error) failAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <S.LoadingContainer>
          <LoadingDots />
        </S.LoadingContainer>
      ) : itemQuantityInCart(id) !== 0 ? (
        <S.FlexEndContainer>
          <MinusButton
            onClick={
              itemQuantityInCart(id) === 1
                ? handleRemoveFromCart
                : () => handleQuantityInCart(itemQuantityInCart(id) - 1)
            }
          />
          {itemQuantityInCart(id)}
          <PlusButton
            onClick={() => handleQuantityInCart(itemQuantityInCart(id) + 1)}
          />
        </S.FlexEndContainer>
      ) : (
        <S.AddButton key={id} onClick={handleAddToCart}>
          <AddToCart />
          담기
        </S.AddButton>
      )}
    </>
  );
};

export default EditCartItemButton;

const S = {
  AddButton: styled.button`
    width: 60px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    background-color: ${COLOR_PALETTE.black};
    color: ${COLOR_PALETTE.white};
    margin: 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
      opacity: 0.8;
    }
  `,

  FlexEndContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

    height: 32px;
    margin: 4px;
  `,

  LoadingContainer: styled.div`
    align-self: flex-end;

    width: 60px;
    height: 32px;
    margin: 4px;
  `,
};
