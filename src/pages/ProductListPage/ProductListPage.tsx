import CartIcon from '../../assets/CartIcon.svg';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ProductItem from '../../components/ProductItem/ProductItem';
import ShoppingCartModal from '../../components/ShoppingCartModal/ShoppingCartModal';
import useProducts from '../../hooks/useProducts/useProducts';
import useCartItems from '../../hooks/useCartItems/useCartItems';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useModal from '../../hooks/useModal';
import { CATEGORY_LIST, SORTING_LIST } from '../../constants/optionList';
import { SIZE } from '../../constants/api';
import Loading from '../../assets/loading.gif';
import EmptyCart from '../../assets/EmptyCart.png';
import * as S from './ProductListPage.style';

const ProductListPage = () => {
  const { products, category, sort, loading, error, isLast, handleCategory, handleSort, handlePage } = useProducts(
    CATEGORY_LIST[0],
    SORTING_LIST[0],
  );

  const { cartItems, handleAddCartItem } = useCartItems();

  const targetRef = useIntersectionObserver(handlePage);

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Header>
        <S.CartButtonWrapper onClick={openModal}>
          <img src={CartIcon} alt="장바구니 아이콘" />
          <S.CartNumber>{cartItems.length <= SIZE.DEFAULT ? cartItems.length : `${SIZE.DEFAULT}+`}</S.CartNumber>
        </S.CartButtonWrapper>
      </Header>
      <S.Layout>
        <TitleContainer title="텐파의 쇼핑몰" />
        <S.DropdownContainer>
          <Dropdown options={CATEGORY_LIST} selectedOption={category} updateOption={handleCategory} />
          <Dropdown options={SORTING_LIST} selectedOption={sort} updateOption={handleSort} />
        </S.DropdownContainer>
        {products ? (
          <S.ProductList>
            {products.map((product, idx) => (
              <ProductItem
                key={`${product.id}-${idx}`}
                product={product}
                quantity={cartItems.find((item) => item.product.id === product.id)?.quantity || 0}
                onAddCartItem={handleAddCartItem}
              />
            ))}
          </S.ProductList>
        ) : (
          <S.EmptyProductContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>표시할 상품이 없습니다.</p>
          </S.EmptyProductContainer>
        )}
        {!error && !isLast && (
          <S.LoadingWrapper ref={targetRef}>
            {loading && <S.LoadingSpinner src={Loading} alt="로딩 스피너" />}
          </S.LoadingWrapper>
        )}
      </S.Layout>
      <FloatingButton />
      {isModalOpen && <ShoppingCartModal cartItems={cartItems} isOpen={isModalOpen} close={closeModal} />}
    </div>
  );
};

export default ProductListPage;
