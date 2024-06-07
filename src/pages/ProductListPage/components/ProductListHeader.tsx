import HeaderButton from '../../../components/HeaderButton/HeaderButton';
import Header from '../../../components/Header/Header';
import cartIcon from '../../../assets/cartIcon.png';
import styles from '../ProductListPage.module.css';

interface Props {
  cartItemCount: number;
}

const ProductListHeader = ({ cartItemCount }: Props) => {
  return (
    <div>
      <Header>
        <HeaderButton>SHOP</HeaderButton>
        <HeaderButton>
          {cartItemCount !== 0 && <div className={styles.cartItemCount}>{cartItemCount}</div>}
          <img src={cartIcon} className={styles.productHeaderImg} />
        </HeaderButton>
      </Header>
    </div>
  );
};

export default ProductListHeader;
