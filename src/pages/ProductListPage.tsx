import ErrorToast from '../components/ErrorToast';
import ProductCardList from '../components/ProductCardList';
import ProductListToolBar from '../components/ProductListToolBar';
import OrbitSpinner from '../components/OrbitSpinner/index';
import { useProducts } from '../hooks/useProducts';
import Header from '../components/Header';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { useModal } from '../hooks/useModal';
import ShoppingCartModal from '../components/ShoppingCartModal';
import CloseButton from '../components/Button/CloseButton';
import ShoppingCartItem from '../components/ShoppingCartModal/ShoppingCartItem';
import { css } from '@emotion/css';

const ProductListPage = () => {
  const products = useProducts();
  const shoppingCart = useShoppingCart();
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <>
      <Header shoppingCart={shoppingCart.data} handleOpen={handleOpen} />
      {products.error && <ErrorToast message={products.error} />}
      {shoppingCart.error && <ErrorToast message={shoppingCart.error} />}
      <ProductListToolBar />
      {products.loading ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList products={products.data} shoppingCart={shoppingCart} />
      )}
      <ShoppingCartModal isOpen={isOpen} onClose={handleClose}>
        <div className={ItemListStyles}>
          {shoppingCart.data?.map((ci) => (
            <ShoppingCartItem key={ci.id} cartItem={ci} />
          ))}
        </div>
        <div className={TotalPriceStyles}>
          <p className={TotalPriceTitle}>총 결제 금액</p>
          <p className={TotalPrice}>
            {shoppingCart.data
              ?.reduce((acc, ci) => acc + ci.product.price * ci.quantity, 0)
              .toLocaleString()}
            원
          </p>
        </div>
        <CloseButton onClick={handleClose} />
      </ShoppingCartModal>
    </>
  );
};

export default ProductListPage;

const ItemListStyles = css`
  overflow: auto;
  width: 100%;
`;

const TotalPriceStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const TotalPriceTitle = css`
  font-size: 16px;
  font-weight: 700;
`;

const TotalPrice = css`
  font-size: 24px;
  font-weight: 700;
`;
