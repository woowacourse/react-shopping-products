import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import ImageBox from '../common/ImageBox/ImageBox';
import Flex from '../common/Flex/Flex';
import AddProductItemIcon from '@/assets/AddShoppingCart.svg';
import RemoveShoppingCartIcon from '@/assets/RemoveShoppingCart.svg';
import styles from './ProductItem.module.css';
import { useState } from 'react';
import { useCartItemListContext } from '@/hooks/useCartItemList';
import { Product } from '@/types/product.type';

type ProductItemProps = Product;

export default function ProductItem({ id, name, price, imageUrl }: ProductItemProps) {
  const { toggleCartItem, isInCart } = useCartItemListContext();
  const [isCart, setIsCart] = useState<boolean>(isInCart(id));

  const handleIsCart = (id: number) => {
    setIsCart((prev) => !prev);

    toggleCartItem(id);
  };

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
          color={isCart ? 'default' : 'primary'}
          startContent={
            <ImageBox
              width={16}
              height={16}
              src={isCart ? RemoveShoppingCartIcon : AddProductItemIcon}
            />
          }
          onClick={() => handleIsCart(id)}
        >
          {isCart ? '빼기' : '담기'}
        </Button>
      </Flex>
    </div>
  );
}
