import { Button } from "@components/Button/index";
import CountControlButtonBundle from "../CountControlButtonBundle/CountControlButtonBundle";
import * as MI from "./ModalInner.style";
import useCartItems from "@hooks/useCartItems";

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
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
          handleDecrementAmount={() => {}}
          handleIncrementAmount={() => {}}
        />
      </MI.CartItemContent>
      <MI.CartItemDeleteButton>
        <Button text="삭제" onClick={() => {}} />
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
