import { useState } from 'react';
import CartIcon from '../../assets/CartIcon.svg';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import ProductItem from '../../components/ProductItem/ProductItem';
import useProducts from '../../hooks/useProduct';
import useCartItems from '../../hooks/useCartItems';
import * as S from './ProductListPage.style';

const CATEGORY_LIST = {
  FASHION: '패션',
  BEVERAGE: '음료',
  ELECTRONICS: '전자제품',
  KITCHEN: '주방용품',
  FITNESS: '운동',
  BOOKS: '책',
};

const SORTING_LIST = {
  DESC: '낮은 가격순',
  ASC: '높은 가격순',
};

const ProductListPage = () => {
  const categoryList = Object.values(CATEGORY_LIST);
  const sortingList = Object.values(SORTING_LIST);

  const { products } = useProducts();
  const { cartItems, counts, handleAddCartItem, handleDeleteCartItem } = useCartItems();

  const [category, setCategory] = useState(categoryList[0]);
  const [sorting, setSorting] = useState(sortingList[0]);

  const handleCategoryOption = (option: string) => setCategory(option);
  const handleSortingOption = (option: string) => setSorting(option);

  console.log(cartItems);

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
          <Dropdown options={categoryList} selectedOption={category} updateOption={handleCategoryOption} />
          <Dropdown options={sortingList} selectedOption={sorting} updateOption={handleSortingOption} />
        </S.DropdownContainer>
        <S.ProductList>
          {products.map((product) => (
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
