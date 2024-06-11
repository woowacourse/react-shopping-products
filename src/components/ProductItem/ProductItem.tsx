import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import ImageBox from '../common/ImageBox/ImageBox';
import Flex from '../common/Flex/Flex';
import AddProductItemIcon from '@/assets/AddShoppingCart.svg';
import styles from './ProductItem.module.css';
import { ProductItemData } from '@/types';
import QuantityAdjustButton from '../Product/QuantityAdjustButton/QuantityAdjustButton';
import useGetAllCartItemList from '@/hooks/useGetAllCartItemList';
import useAddCartItem from '@/hooks/useAddCartItem';
import DefaultProductImageSrc from '@/assets/DefaultProductImage.png';

const NONE_IMAGE_SRC = 'string';

export default function ProductItem({ id, name, price, imageUrl }: ProductItemData) {
  const { addCartItem } = useAddCartItem();
  const { allCartItemList, isLoading } = useGetAllCartItemList();
  const existingItemInCart = allCartItemList?.find(({ product }) => product.id === id);
  const targetCartItemId = existingItemInCart?.id;
  const productThumbnailSrc = imageUrl === NONE_IMAGE_SRC ? DefaultProductImageSrc : imageUrl;

  return (
    <>
      {isLoading ? (
        // TODO 스켈레톤 고도화
        <div>로딩중</div>
      ) : (
        <div className={styles.container}>
          <ImageBox width={182} height={112} src={productThumbnailSrc} />
          <div className={styles['description-container']}>
            <Text size="m" weight="l">
              {name}
            </Text>
            <Text size="s">{price.toLocaleString('ko-KR')}원</Text>
          </div>
          <Flex direction="row" style={{ width: '100%', justifyContent: 'flex-end' }}>
            {existingItemInCart && targetCartItemId ? (
              <QuantityAdjustButton
                quantity={existingItemInCart.quantity}
                cartItemId={targetCartItemId}
              />
            ) : (
              <Button
                color={'primary'}
                startContent={<ImageBox width={16} height={16} src={AddProductItemIcon} />}
                onClick={() => addCartItem(id)}
              >
                담기
              </Button>
            )}
          </Flex>
        </div>
      )}
    </>
  );
}
