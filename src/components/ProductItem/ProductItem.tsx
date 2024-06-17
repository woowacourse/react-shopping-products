import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import ImageBox from '../common/ImageBox/ImageBox';
import Flex from '../common/Flex/Flex';
import AddProductItemIcon from '@/assets/AddShoppingCart.svg';
import styles from './ProductItem.module.css';
import { Product } from '@/types/product.type';
import ChangeQuantity from '../ChangeQuantity/ChangeQuantity';
import useCartItemQuantity from '@/hooks/cartItem/useCartItemQuantity';
import useCartItemList from '@/hooks/cartItem/useCartItemList';
import RatioImageBox from '../common/RatioImageBox/RatioImageBox';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

type ProductItemProps = Product;

export default function ProductItem({ id, name, price, imageUrl }: ProductItemProps) {
  const { showErrorToast } = useToast();
  const { increaseCartItemQuantity, decreaseCartItemQuantity, addCartItem } = useCartItemQuantity({
    onAddCartItemError: (e) => showErrorToast(e),
    onDeleteCartItemError: (e) => showErrorToast(e),
    onModifyCartItemQuantityError: (e) => showErrorToast(e),
  });

  const { getCartItemQuantity, isError, error } = useCartItemList();

  const quantity = getCartItemQuantity(id);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (isError) showBoundary(error);
  }, [isError]);

  return (
    <div className={styles.container}>
      <RatioImageBox ratio={60} src={imageUrl} />
      <div className={styles['description-container']}>
        <Text size="m" weight="l">
          {name}
        </Text>
        <Text size="s">{price.toLocaleString('ko-KR')}원</Text>
      </div>
      <Flex direction="row" style={{ width: '100%', justifyContent: 'flex-end' }}>
        {quantity === 0 ? (
          <Button
            color="primary"
            startContent={<ImageBox width={16} height={16} src={AddProductItemIcon} />}
            onClick={() => addCartItem(id)}
          >
            담기
          </Button>
        ) : (
          <ChangeQuantity
            quantity={quantity}
            increaseQuantity={() => increaseCartItemQuantity(id)}
            decreaseQuantity={() => decreaseCartItemQuantity(id)}
          />
        )}
      </Flex>
    </div>
  );
}
