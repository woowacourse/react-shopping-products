import Button from '../../../components/Button/Button';
import Header from '../../../components/Header/Header';
import cartIcon from '../../../assets/cartIcon.png';

const ProductListHeader = () => {
  return (
    <div>
      <Header>
        <Button>SHOP</Button>
        <Button>
          <img src={cartIcon} width={20} height={24} />
        </Button>
      </Header>
    </div>
  );
};

export default ProductListHeader;
