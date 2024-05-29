import { Product } from "@/types/products";
import ItemInfo from "@/components/ItemInfo";
import * as S from "@/components/ItemCard/style";
import CartActionButton from "@/components/CartActionButton";
import { useContext } from "react";
import { CartItemContext, CartItemDispatchContext } from "@/provider/cartItemProvider";
import { deleteCartItem, getCartItems, postCartItem } from "@/apis/cartItem";

interface ItemCartProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCartProps) => {
  const { id, name, price, imageUrl } = product;
  const cartItems = useContext(CartItemContext);
  const setCartItems = useContext(CartItemDispatchContext);

  const isInCart = cartItems.some((item) => item.product.id === id);

  const onAddCartItem = async () => {
    await postCartItem({ productId: id, quantity: 1 });
    const fetchedItems = await getCartItems();
    setCartItems(fetchedItems);
  };

  const onDeleteCartItem = async () => {
    const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);

    await deleteCartItem({ itemId: targetItem!.id });
    setCartItems((cartItems) => cartItems.filter((item) => item !== targetItem));
  };

  const onClickCartItem = () => {
    if (isInCart) {
      onDeleteCartItem();
    } else {
      onAddCartItem();
    }
  };

  return (
    <S.Wrapper>
      <S.Image $imgUrl={imageUrl} />
      <ItemInfo name={name} price={price} />
      <S.ButtonWrapper>
        <CartActionButton isInCart={isInCart} onClick={onClickCartItem} />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default ItemCard;
