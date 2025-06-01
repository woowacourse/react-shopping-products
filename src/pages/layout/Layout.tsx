import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import useData from '../../hooks/@common/useData';
import { getCartItems } from '../../services/cartItemServices';
import { getProducts } from '../../services/productServices';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import useCartItems from '../../hooks/features/useCartItems';
import { DataProvider } from '../../context/DataContext';
import CartModal from '../../components/features/cartModal/CartModal';
import type { CartItemType, ProductItemType } from '../../types/data';
import { CATEGORY_OPTIONS, SELECT_SORT_OPTIONS } from '../../constants/systemConstants';
import useModal from '../../hooks/@common/useModal';
import useErrorToast from '../../hooks/@common/useErrorToast';

const Layout = () => {
  const cartItemsResource = useData<CartItemType[], []>({
    fetchFunc: getCartItems,
    defaultArgs: [],
  });
  const productItemsResource = useData<ProductItemType[], [string, string]>({
    fetchFunc: getProducts,
    defaultArgs: [CATEGORY_OPTIONS[0], SELECT_SORT_OPTIONS[0]],
  });
  const dataResources = {
    cartItemsResource: cartItemsResource,
    productItemsResource: productItemsResource,
  };

  const { errorMessage, isToastVisible, handleErrorMessage } = useErrorToast();

  const { handleAddCartItem, handleRemoveCartItem, handleUpdateCartItem } = useCartItems({
    dataResource: cartItemsResource,
    handleErrorMessage,
  });

  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <DataProvider dataResource={{ ...dataResources }}>
      <ErrorMessageProvider
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
        isToastVisible={isToastVisible}
      >
        <S.LayoutContainer>
          <Header onCartModalOpen={handleModalOpen} />
          <Outlet />
          <CartModal
            isCartModalOpen={isModalOpen}
            onModalClose={handleModalClose}
            onAddCartItem={handleAddCartItem}
            onRemoveCartItem={handleRemoveCartItem}
            onUpdateCartItem={handleUpdateCartItem}
          />
        </S.LayoutContainer>
      </ErrorMessageProvider>
    </DataProvider>
  );
};

export default Layout;
