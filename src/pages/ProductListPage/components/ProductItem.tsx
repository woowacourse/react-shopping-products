import { HtmlHTMLAttributes } from 'react';
import ProductSelectButton from './ProductSelectButton';
import styles from '../ProductListPage.module.css';
import { CartItemType } from '@/types';
import useAddCartItem from '@/hooks/useAddCartItem';
import useDeleteCartItem from '@/hooks/useDeleteCartItem';

type productType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  item: productType;
  cartItem: CartItemType | undefined;
}

const ProductItem = ({ item, cartItem }: Props) => {
  const { addCartItem } = useAddCartItem();
  const { deleteCartItem } = useDeleteCartItem();

  const { name, price, imageUrl } = item;
  const isInCart = cartItem ? true : false;

  return (
    <div className={styles.productItemContainer}>
      <img src={imageUrl} width={182} height={112} style={{ borderRadius: '8px 8px 0 0' }} />
      <div className={styles.productItemInfoContainer}>
        <span className={styles.productItemName}>{name}</span>
        <span className={styles.productItemLabel}>{price.toLocaleString('KR-ko')}원</span>
      </div>
      <ProductSelectButton
        isSelected={isInCart}
        onClick={() => {
          cartItem ? deleteCartItem(cartItem.id) : addCartItem(item.id);
        }}
      ></ProductSelectButton>
    </div>
  );
};

export default ProductItem;
