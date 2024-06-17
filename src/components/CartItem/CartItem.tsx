import type { CartItem } from '@/types/cartItem.type';
import ImageBox from '../common/ImageBox/ImageBox';
import styles from './CartItem.module.css';
import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import ChangeQuantity from '../ChangeQuantity/ChangeQuantity';
import Divider from '../common/Divider/Divider';
import useCartItemQuantity from '@/hooks/cartItem/useCartItemQuantity';
import { useToast } from '@/hooks/useToast';

const CartItem = ({ quantity, product }: CartItem) => {
  const { imageUrl, name, price } = product;
  const { showErrorToast } = useToast();
  const { increaseCartItemQuantity, decreaseCartItemQuantity, deleteCartItem } =
    useCartItemQuantity({
      onAddCartItemError: (e) => showErrorToast(e),
      onDeleteCartItemError: (e) => showErrorToast(e),
      onModifyCartItemQuantityError: (e) => showErrorToast(e),
    });

  return (
    <>
      <Divider />
      <div className={styles.container}>
        <div className={styles['info-container']}>
          <ImageBox radius="m" height={80} width={80} src={imageUrl} border="1px solid lightGray" />
          <div className={styles['description-container']}>
            <Text size="m" weight="l">
              {name}
            </Text>
            <Text size="s">{price.toLocaleString('ko-KR')}원</Text>
            <ChangeQuantity
              quantity={quantity}
              increaseQuantity={() => increaseCartItemQuantity(product.id)}
              decreaseQuantity={() => decreaseCartItemQuantity(product.id)}
            />
          </div>
        </div>
        <Button color="default" size="s" onClick={() => deleteCartItem(product.id)}>
          삭제
        </Button>
      </div>
    </>
  );
};

export default CartItem;
