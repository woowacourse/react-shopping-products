import ProductSelectButton from './ProductSelectButton';
import styles from '../ProductListPage.module.css';

type productType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

interface Props {
  item: productType;
}

const isSelected = false;

const ProductItem = ({ item }: Props) => {
  return (
    <div className={styles.productItemContainer}>
      <img src={item.imageUrl} width={182} height={112} style={{ borderRadius: '8px 8px 0 0' }} />
      <div className={styles.productItemInfoContainer}>
        <span className={styles.productItemName}>{item.name}</span>
        <span className={styles.productItemLabel}>상품 설명 텍스트</span>
        <span className={styles.productItemLabel}>{item.price.toLocaleString('KR-ko')}원</span>
      </div>
      <ProductSelectButton isSelected={isSelected}></ProductSelectButton>
    </div>
  );
};

export default ProductItem;
