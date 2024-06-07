import { ShoppingCartIcon } from "../../assets/index";
import * as S from "./ShoppingCartButton.style";

interface ShoppingCartButtonProps {
  quantity: number;
}

function ShoppingCartButton({ quantity }: ShoppingCartButtonProps) {
  return (
    <S.Container>
      <S.ShoppingCartIconContainer
        src={ShoppingCartIcon}
      ></S.ShoppingCartIconContainer>
      {quantity && (
        <S.ShoppingCartQuantityContainer>
          <S.ShoppingCartQuantity>{quantity}</S.ShoppingCartQuantity>
        </S.ShoppingCartQuantityContainer>
      )}
    </S.Container>
  );
}

export default ShoppingCartButton;
