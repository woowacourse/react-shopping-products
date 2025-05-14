import request from "../../utils/request";
import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import { CartToggleButtonProps } from "./CartToggleButton.types";

function CartToggleButton({
  productId,
  cartId,
  isAdded,
  setCartItemIds,
  setErrorTrue,
}: CartToggleButtonProps) {
  async function addItemToCart() {
    try {
      await request({
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "/cart-items",
        body: { productId, quantity: 1 },
      });
      setCartItemIds((prev) => [...prev, { productId, cartId: 0 }]);
    } catch {
      setErrorTrue("ADD");
    }
  }

  async function removeItemToCart() {
    try {
      await request({
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
        method: "DELETE",
        url: `/cart-items/${cartId}`,
      });
      setCartItemIds((prev) =>
        prev.filter((ids) => ids.productId !== productId)
      );
    } catch {
      setErrorTrue("MINUS");
    }
  }
  return (
    <>
      {isAdded && (
        <button
          css={[ButtonContainer, RemoveButton]}
          onClick={removeItemToCart}
        >
          <img src="/removeCart.svg" alt="담기 아이콘" />
          <p>빼기</p>
        </button>
      )}
      {!isAdded && (
        <button css={ButtonContainer} onClick={addItemToCart}>
          <img src="/addCart.svg" alt="담기 아이콘" />
          <p>담기</p>
        </button>
      )}
    </>
  );
}

export default CartToggleButton;
