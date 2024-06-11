import { Button } from "@components/Button/index";
import CountControlButtonBundle from "../CountControlButtonBundle/CountControlButtonBundle";
import {
  useCartItems,
  useControlCart,
  useDeleteCart,
  useError,
} from "@hooks/index";
import * as MI from "./ModalInner.style";

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { showError } = useError();

  const { addToCart, deleteToCart } = useControlCart({
    cartItemId: cartItem.id,
    quantity: cartItem.quantity,
  });

  const { deleteCartItem } = useDeleteCart({ cartId: cartItem.id });

  const handleIncrementAmount = () => {
    try {
      addToCart.mutate();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  const handleDecrementAmount = () => {
    try {
      deleteToCart.mutate();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  const handleDeleteCartItem = () => {
    try {
      deleteCartItem.mutate();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  return (
    <MI.CartItem>
      <MI.CartItemImg src={cartItem.product.imageUrl} alt="" />
      <MI.CartItemContent>
        <p className="cart-item_content_name">{cartItem.product.name}</p>
        <span className="cart-item_content_price">
          {cartItem.product.price.toLocaleString("ko-kr")}원
        </span>
        <CountControlButtonBundle
          amount={cartItem.quantity}
          handleIncrementAmount={handleIncrementAmount}
          handleDecrementAmount={handleDecrementAmount}
        />
      </MI.CartItemContent>
      <MI.CartItemDeleteButton>
        <Button text="삭제" onClick={handleDeleteCartItem} />
      </MI.CartItemDeleteButton>
    </MI.CartItem>
  );
};

const ModalInner = () => {
  const { cartItems } = useCartItems();

  return (
    <>
      {cartItems &&
        cartItems.map((item) => {
          return <CartItem cartItem={item} />;
        })}
      <MI.TotalPrice>
        <p className="total-price_title">총 결제 금액</p>
        <p className="total-price_price">95,000원</p>
      </MI.TotalPrice>
    </>
  );
};

export default ModalInner;
