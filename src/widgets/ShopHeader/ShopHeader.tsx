import useModal from "../../shared/hooks/useModal";
import { CartItems } from "../../entities/cartItem/model/types";
import CartModal from "../CartModal/CartModal";
import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";
import { BASE_URL } from "../../shared/config/base";

interface Props {
  cartItems: CartItems | null;
  cartItemsCount: number;
  quantityByProductId: (productId: number) => number;
  increaseItemQuantity: (productId: number) => Promise<void>;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  deleteProductInCart: (productId: number) => Promise<void>;
  totalPriceInCart: number;
}

const ShopHeader = ({
  cartItems,
  cartItemsCount,
  quantityByProductId,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteProductInCart,
  totalPriceInCart,
}: Props) => {
  const { openModal } = useModal();

  const handleOpenCart = () => {
    openModal(
      <CartModal
        cartItems={cartItems}
        quantityByProductId={quantityByProductId}
        increaseItemQuantity={increaseItemQuantity}
        decreaseItemQuantity={decreaseItemQuantity}
        deleteProductInCart={deleteProductInCart}
        totalPriceInCart={totalPriceInCart}
      />
    );
  };

  return (
    <S.ShopHeader>
      <S.Logo href={BASE_URL}>SHOP</S.Logo>
      <S.CartButton onClick={handleOpenCart}>
        <S.CartIcon src={Cart} alt="cart" />
        {!!cartItemsCount && (
          <S.CartItemsCount>{cartItemsCount}</S.CartItemsCount>
        )}
      </S.CartButton>
    </S.ShopHeader>
  );
};

export default ShopHeader;
