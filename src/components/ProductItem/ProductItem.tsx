import { Product } from "../../interfaces/Product";
import ProductItemTitle from "../ProductItemTitle/ProductItemTitle";
import QuantityContainer from "../QuantityContainer/QuantityContainer";
import AddCartItemButton from "../AddCartItemButton/AddCartItemButton";
import * as S from "./ProductItem.style";
import useCartItem from "../../hooks/useCartItem";
import { CartItem } from "../../interfaces/CartItem";
import { createPortal } from "react-dom";
import Toast from "../common/Toast/Toast";

interface ProductItemProps {
  product: Product;
  cartItemList: CartItem[];
}

function ProductItem({ product, cartItemList }: ProductItemProps) {
  const cartItemExists = cartItemList.find(
    (cartItem) => cartItem.product.id === product.id
  );
  const { addCartItem, updateCartItemQuantity, mutateError } = useCartItem();

  const renderCartItemQuantity = (cartItemExists: CartItem) => {
    return (
      <QuantityContainer
        quantity={cartItemExists.quantity.toString()}
        onMinusButtonClick={() =>
          updateCartItemQuantity.mutate({
            cartItemId: cartItemExists.id,
            quantity: cartItemExists.quantity - 1,
          })
        }
        onPlusButtonClick={() =>
          updateCartItemQuantity.mutate({
            cartItemId: cartItemExists.id,
            quantity: cartItemExists.quantity + 1,
          })
        }
      />
    );
  };

  return (
    <>
      {mutateError &&
        createPortal(<Toast message={mutateError.message} />, document.body)}
      <S.ProductItem>
        <S.ProductImage src={product.imageUrl} alt={product.name} />
        <S.ProductDescription>
          <ProductItemTitle title={product.name} price={product.price} />
          <S.ToggleCartItemButtonWrapper>
            {cartItemExists ? (
              renderCartItemQuantity(cartItemExists)
            ) : (
              <AddCartItemButton onClick={() => addCartItem.mutate(product)} />
            )}
          </S.ToggleCartItemButtonWrapper>
        </S.ProductDescription>
      </S.ProductItem>
    </>
  );
}

export default ProductItem;
