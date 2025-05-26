import { AddToCartButton } from '../../CartButton/CartButton';
import Counter from '../../Counter/Counter';
import Image from '../../Image/Image';
import * as styles from './ProductCard.style';
import patchCartItem from '../../../api/patchCartItem';
import { useApiContext } from '../../../contexts/ApiContext';
import getCartItems from '../../../api/getCartItems';
import { OrderByOptionType } from '../../../types/categoryOption';

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  productQuantity: number;
  onClick: () => void;
  orderBy: OrderByOptionType;
  cartItemId?: number | undefined;
  cartQuantity: number;
}

export default function ProductCard({
  title,
  price,
  imageUrl,
  isInCart,
  onClick,
  productQuantity,
  cartQuantity,

  cartItemId
}: ProductCardProps) {
  const { fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  const handleMinus = async () => {
    await patchCartItem(cartItemId, cartQuantity - 1);
    await refetchCart();
  };
  const handlePlus = async () => {
    if (cartQuantity >= productQuantity) return;
    await patchCartItem(cartItemId, cartQuantity + 1);
    await refetchCart();
  };

  const soldOut = productQuantity == 0;
  return (
    <li css={styles.cardCss}>
      <div css={styles.imageWrapperCss}>
        <Image css={[styles.imageCss, soldOut && styles.disabledImageCss]} src={imageUrl} alt={`${title}상품`} />
        {soldOut && <p css={styles.soldOutCss}>SOLD OUT</p>}
      </div>
      <div css={styles.detailCss}>
        <h2>{title}</h2>
        <p>{price}</p>
        {!isInCart && !soldOut && <AddToCartButton disabled={productQuantity == 0} onClick={onClick} />}
        {isInCart && <Counter value={cartQuantity} onIncrement={handlePlus} onDecrement={handleMinus} />}
      </div>
    </li>
  );
}
