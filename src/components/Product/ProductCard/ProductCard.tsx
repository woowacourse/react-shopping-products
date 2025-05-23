import { AddToCartButton, RemoveFromCartButton } from '../../CartButton/CartButton';
import Image from '../../Image/Image';
import * as styles from './ProductCard.style';

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  quantity: number;
  onClick: () => void;
}

export default function ProductCard({ title, price, imageUrl, isInCart, onClick, quantity }: ProductCardProps) {
  return (
    <li css={styles.cardCss}>
      <div css={styles.imageWrapperCss}>
        <Image css={[styles.imageCss, quantity == 0 && styles.disabledImageCss]} src={imageUrl} alt={`${title}상품`} />
        {quantity == 0 && <p css={styles.soldOutCss}>SOLD OUT</p>}
      </div>
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{price}</p>
        {isInCart ? (
          <RemoveFromCartButton onClick={onClick} />
        ) : (
          <AddToCartButton disabled={quantity == 0} onClick={onClick} />
        )}
      </div>
    </li>
  );
}
