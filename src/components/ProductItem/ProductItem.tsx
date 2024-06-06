import { CartItemList, Product } from '../../types/type';
import ProductItemTitle from '../ProductItemTitle/ProductItemTitle';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';
import AddCartItemButton from '../AddCartItemButton/AddCartItemButton';
import useAddCartItem from '../../hooks/useAddCartItem';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import usePatchCartItem from '../../hooks/usePatchCartItem';

import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
  cartItemList: CartItemList;
}

function ProductItem({ product, cartItemList }: ProductItemProps) {
  const cartItem = cartItemList.find(
    (cartItem) => cartItem.product.id === product.id,
  );
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity ?? 0;

  const addCartItemMutation = useAddCartItem();
  const deleteCartItemMustation = useDeleteCartItem();
  const patchCartItemMutation = usePatchCartItem();

  const handleIncreaseQuantity = () => {
    if (!cartItem) return;
    patchCartItemMutation.mutate({
      cartItemId: cartItem.id,
      quantity: quantity + 1,
    });
  };

  const handleDecreaseQuantity = () => {
    if (!cartItem) return;
    if (quantity === 1) {
      deleteCartItemMustation.mutate({ cartItemId: cartItem.id });
    } else {
      patchCartItemMutation.mutate({
        cartItemId: cartItem.id,
        quantity: quantity - 1,
      });
    }
  };

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
