import request from "../../utils/request";
import { ButtonContainer, RemoveButton } from "./CartToggleButton.css";
import { CartToggleButtonProps } from "./CartToggleButton.types";

function CartToggleButton({
  id,
  isAdded,
  setCartItemIds,
}: CartToggleButtonProps) {
  async function addItemToCart() {
    const data = await request({
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
      method: "POST",
      url: "/cart-items",
      body: { productId: id, quantity: 1 },
    });
    setCartItemIds((prev) => [...prev, id]);
    console.log(data);
  }

  async function removeItemToCart() {
    const data = await request({
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      url: `/cart-items/${id}`,
    });
    setCartItemIds((prev) => prev.filter((productId) => productId !== id));
    console.log(data);
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
