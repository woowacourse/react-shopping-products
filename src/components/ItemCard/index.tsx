import { CartItems, Product } from "@/types/products";
import ItemInfo from "@/components/ItemInfo";
import * as S from "@/components/ItemCard/style";
import CartActionButton from "@/components/CartActionButton";
import QuantityUpdateButton from "@/components/QuantityUpdateButton";
import { convertProductIdToCartId, getQuantityInCart } from "@/utils/cart";

interface ItemCartProps {
  product: Product;
  cartItems: CartItems[];
}

const ItemCard = ({ product, cartItems }: ItemCartProps) => {
  const { name, price, imageUrl, id } = product;

  const quantity = getQuantityInCart(cartItems, id);
  const cartId = convertProductIdToCartId(cartItems, id);

  return (
    <S.Wrapper>
      <S.Image $imgUrl={imageUrl} />
      <ItemInfo name={name} price={price} />
      <S.ButtonWrapper>
        {quantity > 0 && cartId ? (
          <QuantityUpdateButton quantity={quantity} cartId={cartId} />
        ) : (
          <CartActionButton productId={id} />
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default ItemCard;
