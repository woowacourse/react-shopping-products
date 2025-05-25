import { useData } from "../../hooks/useData";
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
}

function Modal({ onClose }: ModalProps) {
  const { products, cartItemIds } = useData();

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
        {cartItems?.map((item) =>
          item ? (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
            />
          ) : null
        )}
        <TotalPrice totalPrice={totalPrice} />
        <button css={CloseButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
}

export default Modal;
