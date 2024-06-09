import { HtmlHTMLAttributes } from 'react';
import ProductSelectButton from './ProductSelectButton';
import styles from '../ProductListPage.module.css';
import { CartItemType } from '../../../types';

type productType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  productItem: productType;
  cartItems: CartItemType[];
  isSelected: boolean;
}

const ProductItem = ({ productItem, isSelected, cartItems }: Props) => {
  const cartItem = cartItems.find((item) => item.product.id === productItem.id);

  return (
    <div className={styles.productItemContainer}>
      <img src={productItem.imageUrl} className={styles.productItemImg} />
      <div className={styles.productItemInfoContainer}>
        <span className={styles.productItemLabel}>
          {productItem.price.toLocaleString('KR-ko')}원
        </span>
      </div>
      <ProductSelectButton
        isSelected={isSelected}
        cartItem={cartItem}
        productItemId={productItem.id}
      />
    </div>
  );
};

export default ProductItem;
