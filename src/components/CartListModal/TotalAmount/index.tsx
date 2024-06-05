import { CartItem } from '@appTypes/index';
import { getSkeletonClassName } from '@utils/index';

import style from './style.module.css';

interface TotalAmountProps {
  cartItems: CartItem[];
}

const TotalAmount = ({ cartItems }: TotalAmountProps) => {
  return (
    <section className={style.totalAmount}>
      <p className={style.title}>총 결제 금액</p>
      <p className={style.price}>1000원</p>
    </section>
  );
};

const Skeleton = () => {
  return (
    <section className={getSkeletonClassName(style.totalAmount)}>
      <p className={getSkeletonClassName(style.title)}></p>
      <p className={getSkeletonClassName(style.price)}></p>
    </section>
  );
};

TotalAmount.Skeleton = Skeleton;

export default TotalAmount;
