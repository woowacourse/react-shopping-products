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

type ProductItemProps = Product;

export default function ProductItem({ id, name, price, imageUrl }: ProductItemProps) {
  const { increaseCartItemQuantity, decreaseCartItemQuantity, addCartItem } = useCartItemQuantity();
  const { getCartItemQuantity } = useCartItemList();

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
        {getCartItemQuantity(id) === 0 ? (
          <Button
            color={'primary'}
            startContent={<ImageBox width={16} height={16} src={AddProductItemIcon} />}
            onClick={() => addCartItem(id)}
          >
            {'담기'}
          </Button>
        ) : (
          <ChangeQuantity
            quantity={getCartItemQuantity(id)}
            increaseQuantity={() => increaseCartItemQuantity(id)}
            decreaseQuantity={() => decreaseCartItemQuantity(id)}
          />
        )}
      </Flex>
    </div>
  );
}
