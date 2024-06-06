import AddCart from "../../assets/add-cart.svg";
import Counter from "../Counter/Counter";
import * as CC from "./Button.style";

interface CartControlButtonProps {
  isInCart: boolean;
  onClick: () => void;
}

const CartControlButton = ({ isInCart, onClick }: CartControlButtonProps) => {
  return (
    <CC.Container>
      {isInCart ? (
        // TODO: 장바구니 수량 개수, 핸들러 props 필요
        <Counter count={1} decrease={() => {}} increase={() => {}} />
      ) : (
        <CC.AddCartButton onClick={onClick}>
          <img src={AddCart} alt="장바구니 추가" />
          <span>담기</span>
        </CC.AddCartButton>
      )}
    </CC.Container>
  );
};

export default CartControlButton;
