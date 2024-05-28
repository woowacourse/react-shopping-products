import HeaderButton from '../../../components/HeaderButton/HeaderButton';
import Header from '../../../components/Header/Header';
import cartIcon from '../../../assets/cartIcon.png';

const ProductListHeader = () => {
  return (
    <div>
      <Header>
        <HeaderButton>SHOP</HeaderButton>
        <HeaderButton>
          <img src={cartIcon} width={20} height={24} />
        </HeaderButton>
      </Header>
    </div>
  );
};

export default ProductListHeader;
