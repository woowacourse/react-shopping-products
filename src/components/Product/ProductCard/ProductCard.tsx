import { AddToCartButton } from '../../CartButton/CartButton';
import Counter from '../../Counter/Counter';
import Image from '../../Image/Image';
import * as styles from './ProductCard.style';
import patchCartItem from '../../../api/patchCartItem';
import useCartItems from '../../../hooks/api/useCartItems';
import { useErrorContext } from '../../../contexts/ErrorContext';

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  productQuantity: number;
  onAddCart: () => void;
  cartItemId?: number;
  cartQuantity: number;
}

export default function ProductCard(props: ProductCardProps) {
  if (props.productQuantity === 0) {
    return <SoldOutProductCard {...props} />;
  }

  return <PurchasableProductCard {...props} />;
}

export function SoldOutProductCard({ title, price, imageUrl }: Pick<ProductCardProps, 'title' | 'price' | 'imageUrl'>) {
  return (
    <li css={styles.cardCss}>
      <div css={styles.imageWrapperCss}>
        <Image css={[styles.imageCss, styles.disabledImageCss]} src={imageUrl} alt={`${title}상품`} />
        <p css={styles.soldOutCss}>SOLD OUT</p>
      </div>
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{price}</p>
      </div>
    </li>
  );
}
export function PurchasableProductCard({
  title,
  price,
  imageUrl,
  isInCart,
  onAddCart,
  productQuantity,
  cartQuantity,
  cartItemId
}: ProductCardProps) {
  const { fetcher: refetchCart } = useCartItems();
  const { showError } = useErrorContext();

  const handleMinus = async () => {
    await patchCartItem(cartItemId, cartQuantity - 1);
    await refetchCart();
  };

  const handlePlus = async () => {
    if (cartQuantity >= productQuantity) return;
    try {
      await patchCartItem(cartItemId, cartQuantity + 1);
      await refetchCart();
    } catch (e) {
      if (e instanceof Error) {
        showError(e);
      }
    }
  };

  return (
    <li css={styles.cardCss}>
      <div css={styles.imageWrapperCss}>
        <Image css={styles.imageCss} src={imageUrl} alt={`${title}상품`} />
      </div>
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{price}</p>
        {!isInCart && <AddToCartButton onClick={onAddCart} />}
        {isInCart && <Counter value={cartQuantity} onIncrement={handlePlus} onDecrement={handleMinus} />}
      </div>
    </li>
  );
}
