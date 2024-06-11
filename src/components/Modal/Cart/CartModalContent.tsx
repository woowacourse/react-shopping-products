import styles from './cartModalContent.module.css';
import useGetAllCartItemList from '@/hooks/useGetAllCartItemList';
import ModalCartItem from './ModalCartItem';
import Button from '@/components/common/Button/Button';

type Props = {
  handleModalClose: () => void;
};

export default function CartModalContent({ handleModalClose }: Props) {
  const { allCartItemList } = useGetAllCartItemList();

  if (!allCartItemList?.length) {
    return <div>장바구니 아이템이 없습니다.</div>;
  }
  const totalPaymentPrice = allCartItemList.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      {allCartItemList.map((cartItem) => {
        return (
          <ModalCartItem
            id={cartItem.id}
            key={cartItem.id}
            quantity={cartItem.quantity}
            name={cartItem.product.name}
            imageUrl={cartItem.product.imageUrl}
            price={cartItem.product.price}
          />
        );
      })}
      <div className={styles.price_info}>
        <div className={styles.banner}>총 결제 금액</div>
        <div className={styles.price}>{totalPaymentPrice.toLocaleString('ko-KR')}원</div>
      </div>
      <Button className={styles.button} onClick={handleModalClose}>
        닫기
      </Button>
    </div>
  );
}
