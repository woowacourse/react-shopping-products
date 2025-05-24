import useModal from "../../hooks/useModal";
import { CartItems } from "../../types/cartItems";
import CartModal from "../CartModal/CartModal";
import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

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
    <S.Header>
      <S.Logo href="/">SHOP</S.Logo>
      <S.CartButton onClick={handleOpenCart}>
        <S.CartIcon src={Cart} alt="장바구니" />
        {!!cartItemsCount && (
          <S.CartItemsCount>{cartItemsCount}</S.CartItemsCount>
        )}
      </S.CartButton>
    </S.Header>
  );
};

export default ShopHeader;
