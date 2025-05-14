import Navbar from './widgets/navbar/ui/Navbar';
import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';

const CATEGORY_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '의류', value: 'clothes' },
  { label: '신발', value: 'shoes' },
  { label: '가방', value: 'bags' },
];

const FILTER_OPTIONS = [
  { label: '필터', value: 'filter' },
  { label: '낮은 가격순', value: 'low' },
  { label: '높은 가격순', value: 'high' },
];

function App() {
  return (
    <S.ProductListWrapper>
      <Navbar />

      <S.ProductListContainer>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>WoowaBros Product List</S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect items={CATEGORY_OPTIONS} />
            <CustomSelect items={FILTER_OPTIONS} />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        <S.ProductList>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </S.ProductList>
      </S.ProductListContainer>
    </S.ProductListWrapper>
  );
}

export default App;
