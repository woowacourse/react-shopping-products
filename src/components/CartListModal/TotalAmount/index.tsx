import { CartItem } from '@src/appTypes';

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

export default TotalAmount;
