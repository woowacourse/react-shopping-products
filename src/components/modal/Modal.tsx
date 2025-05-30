import { useCartProduct } from "../../hooks/useCartProduct";
import { ERROR_TYPE } from "../../hooks/useError";
import CartItem from "./CartItem";
import {
  CloseButton,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from "./Modal.css";
import TotalPrice from "./TotalPrice";

interface ModalProps {
  onClose: () => void;
  setErrorTrue: (value: ERROR_TYPE) => void;
}

function Modal({ onClose, setErrorTrue }: ModalProps) {
  const { products, cartItemIds, setCartItemIds, fetchCartProducts } =
    useCartProduct();

  const cartItems = products?.content.map((product) => {
    const match = cartItemIds.find((item) => item.productId === product.id);
    if (!match) return null;
    return {
      product,
      quantity: match.quantity,
    };
  });

  const totalPrice =
    cartItems?.reduce((sum, item) => {
      const price = item?.product?.price ?? 0;
      const quantity = item?.quantity ?? 0;
      return sum + price * quantity;
    }, 0) ?? 0;

  return (
    <>
      <div css={ModalOverlay} />
      <div css={ModalContainer}>
        <h2 css={ModalTitle}>장바구니</h2>
        <hr />
        {cartItemIds.map((cartItem) => {
          const matchedProduct = products?.content.find(
            (p) => p.id === cartItem.productId
          );

          if (!matchedProduct) return null;

          return (
            <CartItem
              key={matchedProduct.id}
              product={matchedProduct}
              quantity={cartItem.quantity}
              cartId={cartItem.cartId}
              productId={cartItem.productId}
              productQuantity={matchedProduct.quantity}
              setErrorTrue={setErrorTrue}
              fetchCartProducts={fetchCartProducts}
              setCartItemIds={setCartItemIds}
            />
          );
        })}
        <TotalPrice totalPrice={totalPrice} />
        <button css={CloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
}

export default Modal;
