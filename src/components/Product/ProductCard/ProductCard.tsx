import { AddToCartButton, RemoveFromCartButton } from '../../CartButton/CartButton';
import Image from '../../Image/Image';
import * as styles from './ProductCard.style';

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  onClick: () => void;
}

export default function ProductCard({ title, price, imageUrl, isInCart, onClick }: ProductCardProps) {
  return (
    <li css={styles.cardCss}>
      <Image css={styles.imageCss} src={imageUrl} alt={`${title}상품`} />
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{price}</p>
        {isInCart ? <RemoveFromCartButton onClick={onClick} /> : <AddToCartButton onClick={onClick} />}
      </div>
    </li>
  );
}
