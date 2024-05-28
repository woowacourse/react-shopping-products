import { useState } from 'react';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import ProductItem from '../../components/ProductItem/ProductItem';
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

  const product = {
    id: 0,
    name: '스마트폰',
    price: 699,
    imageUrl: 'https://via.placeholder.com/150/0000FF/808080?text=스마트폰',
    category: 'Electronics',
  };

  const [category, setCategory] = useState(categoryList[0]);
  const [sorting, setSorting] = useState(sortingList[0]);

  const handleCategoryOption = (option: string) => setCategory(option);
  const handleSortingOption = (option: string) => setSorting(option);

  return (
    <div>
      <Header />
      <S.Layout>
        <TitleContainer title="bpple 상품 목록" />
        <S.DropdownContainer>
          <Dropdown options={categoryList} selectedOption={category} updateOption={handleCategoryOption} />
          <Dropdown options={sortingList} selectedOption={sorting} updateOption={handleSortingOption} />
        </S.DropdownContainer>
        <ProductItem product={product} />
      </S.Layout>
    </div>
  );
};

export default ProductListPage;
