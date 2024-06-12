import { CartItem, CartItemList, Product } from '../../types/type';
import ProductItemTitle from '../ProductItemTitle/ProductItemTitle';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';
import AddCartItemButton from '../AddCartItemButton/AddCartItemButton';
import useAddCartItem from '../../hooks/useAddCartItem';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import usePatchCartItem from '../../hooks/usePatchCartItem';
import useCartITemQuantity from '../../hooks/useCartItemQuantity';
import useCartItemQuantity from '../../hooks/useCartItemQuantity';

import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
  cartItemList: CartItemList;
}

function ProductItem({ product, cartItemList }: ProductItemProps) {
  const cartItem = cartItemList?.find(
    (cartItem) => cartItem.product.id === product.id,
  );
  const isInCart = !!cartItem;
  const addCartItemMutation = useAddCartItem();

  const { quantity, handleDecreaseQuantity, handleIncreaseQuantity } =
    useCartItemQuantity(cartItem ?? ({} as CartItem));

  return (
    <S.ProductItem>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductDescription>
        <ProductItemTitle title={product.name} price={product.price} />
        <S.ToggleCartItemButtonWrapper>
          {isInCart ? (
            <QuantityStepper
              quantity={quantity ?? 0}
              increaseQuantity={handleIncreaseQuantity}
              decreaseQuantity={handleDecreaseQuantity}
            />
          ) : (
            <AddCartItemButton
              onClick={() =>
                addCartItemMutation.mutate({
                  productId: product.id,
                  quantity: 1,
                })
              }
            />
          )}
        </S.ToggleCartItemButtonWrapper>
      </S.ProductDescription>
    </S.ProductItem>
  );
}

export default ProductItem;
