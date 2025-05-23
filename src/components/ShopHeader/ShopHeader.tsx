import useModal from "../../hooks/useModal";
import { Products } from "../../types/products";
import CartModal from "../CartModal/CartModal";
import * as S from "./ShopHeader.styles";
import Cart from "/cart.svg";

interface Props {
  cartItemCount: number;
  products: Products | null;
  quantityByProductId: (productId: number) => number;
  increaseItemQuantity: (productId: number) => Promise<void>;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  deleteProductInCart: (productId: number) => Promise<void>;
  totalPriceInCart: number;
}

const ShopHeader = ({
  cartItemCount,
  products,
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
        products={products}
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
        {!!cartItemCount && <S.CartItemCount>{cartItemCount}</S.CartItemCount>}
      </S.CartButton>
    </S.Header>
  );
};

export default ShopHeader;
