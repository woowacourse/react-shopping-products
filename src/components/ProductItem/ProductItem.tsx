import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import ImageBox from '../common/ImageBox/ImageBox';
import Flex from '../common/Flex/Flex';
import AddProductItemIcon from '@/assets/AddShoppingCart.svg';
import RemoveShoppingCartIcon from '@/assets/RemoveShoppingCart.svg';
import styles from './ProductItem.module.css';
import { Product } from '@/types';
import { useState } from 'react';

export default function ProductItem({ id, name, price, imageUrl, category }: Product) {
  const [isCart, setIsCart] = useState(false);

  const handleIsCart = () => {
    setIsCart((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <ImageBox width={182} height={112} src={imageUrl} />
      <Flex gap={8}>
        <Text size="m" weight="l">
          {name}
        </Text>
        <Text size="s">{price.toLocaleString('ko-KR')}원</Text>
      </Flex>
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
          onClick={handleIsCart}
        >
          {isCart ? '빼기' : '담기'}
        </Button>
      </Flex>
    </div>
  );
}
