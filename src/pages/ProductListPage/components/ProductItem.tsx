import { HtmlHTMLAttributes } from 'react';
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
  isSelected: boolean;
  onSelect: () => void;
}

const ProductItem = ({ item, isSelected, onSelect }: Props) => {
  return (
    <div className={styles.productItemContainer}>
      <img src={item.imageUrl} className={styles.productItemImg} />
      <div className={styles.productItemInfoContainer}>
        <span className={styles.productItemName}>{item.name}</span>
        <span className={styles.productItemLabel}>{item.price.toLocaleString('KR-ko')}원</span>
      </div>
      <ProductSelectButton isSelected={isSelected} onClick={onSelect} />
    </div>
  );
};

export default ProductItem;
