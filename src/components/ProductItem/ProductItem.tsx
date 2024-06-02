import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import ImageBox from '../common/ImageBox/ImageBox';
import Flex from '../common/Flex/Flex';
import AddProductItemIcon from '@/assets/AddShoppingCart.svg';
import RemoveShoppingCartIcon from '@/assets/RemoveShoppingCart.svg';
import styles from './ProductItem.module.css';
import { ProductItemData } from '@/types';
import useCartItemListContext from '@/hooks/useCartItemListContext';

export default function ProductItem({ id, name, price, imageUrl }: ProductItemData) {
  const { cartItemList, toggleCartItem } = useCartItemListContext();
  const isInCart = cartItemList.find(({ product }) => product.id === id);

  return (
    <div className={styles.container}>
      <ImageBox width={182} height={112} src={imageUrl} />
      <div className={styles['description-container']}>
        <Text size="m" weight="l">
          {name}
        </Text>
        <Text size="s">{price.toLocaleString('ko-KR')}원</Text>
      </div>
      <Flex direction="row" style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button
          color={isInCart ? 'default' : 'primary'}
          startContent={
            <ImageBox
              width={16}
              height={16}
              src={isInCart ? RemoveShoppingCartIcon : AddProductItemIcon}
            />
          }
          onClick={() => toggleCartItem(id)}
        >
          {isInCart ? '빼기' : '담기'}
        </Button>
      </Flex>
    </div>
  );
}
