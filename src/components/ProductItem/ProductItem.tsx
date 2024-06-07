import { Product } from "../../interfaces/Product";
import ProductItemTitle from "../ProductItemTitle/ProductItemTitle";
import QuantityContainer from "../QuantityContainer/QuantityContainer";
import AddCartItemButton from "../AddCartItemButton/AddCartItemButton";
import * as S from "./ProductItem.style";
import useAddCartItem from "../../hooks/useAddCartItem";
import { CartItem } from "../../interfaces/CartItem";

interface ProductItemProps {
  product: Product;
  cartItemList: CartItem[];
}

function ProductItem({ product, cartItemList }: ProductItemProps) {
  const { addCartItem } = useAddCartItem();
  const isInCart = cartItemList.some(
    (cartItem) => cartItem.product.id === product.id
  );
  return (
    <S.ProductItem>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductDescription>
        <ProductItemTitle title={product.name} price={product.price} />
        <S.ToggleCartItemButtonWrapper>
          {isInCart ? (
            <QuantityContainer
              quantity="1"
              onMinusButtonClick={() => {}}
              onPlusButtonClick={() => {}}
            />
          ) : (
            <AddCartItemButton onClick={() => addCartItem.mutate(product)} /> // TODO: onMinusButtonClick, onPlusButtonClick 메서드 추가
          )}
        </S.ToggleCartItemButtonWrapper>
      </S.ProductDescription>
    </S.ProductItem>
  );
}

export default ProductItem;
