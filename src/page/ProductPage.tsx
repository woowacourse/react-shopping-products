import ItemCard from '../components/ItemCard/ItemCard';
import ItemList from '../components/ItemList/ItemList';
import Dropdown from '../components/common/Dropdown/Dropdown';
import Header from '../components/common/Header/Header';
import { CATEGORY, SORT } from '../constants';
import useInfinityScroll from '../hooks/useInfinityScroll';
import useProducts from '../hooks/useProducts';
import {
  Container,
  Title,
  DropBoxContainer,
  ContentWrapper,
} from './ProductPage.style';
import useCartItems from '../hooks/useCartItem';
import { CategoryType, SortType } from '../type';

function ProductPage() {
  const {
    products,
    fetchNextPage,
    loading,
    changeCategory,
    changeSorting,
    error,
  } = useProducts();
  const { lastProductElementRef } = useInfinityScroll(fetchNextPage);
  const { cartItemIds, isInCart } = useCartItems();

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Title>bpple 상품 목록</Title>
        <DropBoxContainer>
          <Dropdown
            onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (Object.keys(CATEGORY).includes(e.target.value)) {
                changeCategory(e.target.value as CategoryType);
              }
            }}
            options={Object.entries(CATEGORY)}
          ></Dropdown>
          <Dropdown
            onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (Object.keys(SORT).includes(e.target.value)) {
                changeSorting(e.target.value as SortType);
              }
            }}
            options={Object.entries(SORT)}
          ></Dropdown>
        </DropBoxContainer>

        {cartItemIds !== null && products.length !== 0 && (
          <ItemList>
            {products.map((product, index) => {
              return (
                <ItemCard
                  key={`${product.id}${index}`}
                  initIsInCart={isInCart(product.id)}
                  {...product}
                />
              );
            })}
          </ItemList>
        )}
        {products.length === 0 && <div>상품 정보가 없습니다.</div>}
        {loading && (
          <p style={{ height: '30px', fontSize: '3rem' }}>Loading...</p>
        )}

        {!loading && !error && products.length !== 0 && (
          <div
            ref={lastProductElementRef}
            style={{ height: '30px', fontSize: '5rem' }}
          ></div>
        )}
      </ContentWrapper>
    </Container>
  );
}

export default ProductPage;
