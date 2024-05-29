import CartIcon from '../../assets/CartIcon.svg';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import ProductItem from '../../components/ProductItem/ProductItem';
import useProducts from '../../hooks/useProduct';
import useCartItems from '../../hooks/useCartItems';
import * as S from './ProductListPage.style';
import { CATEGORY_LIST, SORTING_LIST } from '../../constants/optionList';

const ProductListPage = () => {
  const { products, category, sort, handleCategory, handleSort } = useProducts(CATEGORY_LIST[0], SORTING_LIST[0]);
  const { cartItems, counts, handleAddCartItem, handleDeleteCartItem } = useCartItems();

  return (
    <div>
      <Header>
        <S.CartIconWrapper>
          <img src={CartIcon} alt="장바구니 아이콘" />
          <S.CartNumber>{counts}</S.CartNumber>
        </S.CartIconWrapper>
      </Header>
      <S.Layout>
        <TitleContainer title="bpple 상품 목록" />
        <S.DropdownContainer>
          <Dropdown options={CATEGORY_LIST} selectedOption={category} updateOption={handleCategory} />
          <Dropdown options={SORTING_LIST} selectedOption={sort} updateOption={handleSort} />
        </S.DropdownContainer>
        <S.ProductList>
          {products &&
            products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                isAdded={cartItems.some((item) => item.product.id === product.id)}
                onAddCartItem={handleAddCartItem}
                onDeleteCartItem={handleDeleteCartItem}
              />
            ))}
        </S.ProductList>
      </S.Layout>
    </div>
  );
};

export default ProductListPage;
