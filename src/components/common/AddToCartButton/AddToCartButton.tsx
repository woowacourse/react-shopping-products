import { AddToCartIcon } from "../../../assets";
import * as Styled from "./AddToCartButton.style";

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export default function AddToCartButton({ onClick }: AddToCartButtonProps) {
  return (
    <Styled.ProductCartButton
      type="button"
      onClick={onClick}
    >
      <img
        src={AddToCartIcon}
        alt="장바구니에 상품 담기 아이콘"
      />
      <span>담기</span>
    </Styled.ProductCartButton>
  );
}
