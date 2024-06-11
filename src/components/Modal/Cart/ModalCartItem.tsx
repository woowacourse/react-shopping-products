import Flex from '@/components/common/Flex/Flex';
import QuantityAdjustButton from '@/components/Product/QuantityAdjustButton/QuantityAdjustButton';
import styles from './modalCartItem.module.css';
import Button from '@/components/common/Button/Button';
import useDeleteCartItem from '@/hooks/useDeleteCartItem';
import DefaultProductImageSrc from '@/assets/DefaultProductImage.png';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
};

const NONE_IMAGE_SRC = 'string';

export default function ModalCartItem({ imageUrl, name, price, quantity, id }: Props) {
  const { deleteCartItem } = useDeleteCartItem();
  const productThumbnailSrc = imageUrl === NONE_IMAGE_SRC ? DefaultProductImageSrc : imageUrl;

  return (
    <div className={styles.container}>
      <img width={80} height={80} src={productThumbnailSrc} className={styles.thumbnail_img} />
      <div className={styles.info_wrapper}>
        <div className={styles.info_container}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.price}>{price.toLocaleString('ko-KR')}</p>
          </div>
          <div>
            <Button onClick={() => deleteCartItem({ cartItemId: id })} color="default">
              삭제
            </Button>
          </div>
        </div>
        <Flex direction="row" style={{ width: '100%', justifyContent: 'flex-start' }}>
          <QuantityAdjustButton quantity={quantity} cartItemId={id} />
        </Flex>
      </div>
    </div>
  );
}
