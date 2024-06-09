import { HtmlHTMLAttributes } from 'react';
import { CartItemType } from '@/types';
import useAddCartItem from '@/hooks/useAddCartItem';
import useDeleteCartItem from '@/hooks/useDeleteCartItem';
import usePatchCartItemQuantity from '@/hooks/usePatchCartItemQuantity';
import Stepper from '@/components/Stepper/Stepper';
import ProductSelectButton from './ProductSelectButton';
import styles from '../ProductListPage.module.css';

type productType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  item: productType;
  cartItem: CartItemType;
}

const ProductItem = ({ item, cartItem }: Props) => {
  const { addCartItem } = useAddCartItem();
  const { deleteCartItem } = useDeleteCartItem();
  const { patchCartItemQuantity } = usePatchCartItemQuantity();

  const { name, price, imageUrl } = item;
  const isInCart = cartItem ? true : false;

  const handleMinusButtonClick = () => {
    if (cartItem.quantity === 1) {
      deleteCartItem(cartItem.id);
      return;
    }
    patchCartItemQuantity({ cartItemId: cartItem.id, newQuantity: cartItem.quantity - 1 });
  };

  const handlePlusButtonClick = () => {
    patchCartItemQuantity({ cartItemId: cartItem.id, newQuantity: cartItem.quantity + 1 });
  };

  return (
    <div className={styles.productItemContainer}>
      <img src={imageUrl} width={182} height={112} style={{ borderRadius: '8px 8px 0 0' }} />
      <div className={styles.productItemInfoContainer}>
        <span className={styles.productItemName}>{name}</span>
        <span className={styles.productItemLabel}>{price.toLocaleString('KR-ko')}원</span>
      </div>
      <div className={styles.cartItemButtonWrapper}>
        {isInCart ? (
          <Stepper
            value={cartItem.quantity}
            handleClickMinus={() => handleMinusButtonClick()}
            handleClickPlus={() => handlePlusButtonClick()}
          />
        ) : (
          <ProductSelectButton
            isSelected={isInCart}
            onClick={() => {
              cartItem ? deleteCartItem(cartItem.id) : addCartItem(item.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductItem;
