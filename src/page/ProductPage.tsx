import ItemCard from '../components/ItemCard/ItemCard';
import ItemList from '../components/ItemList/ItemList';
import Dropdown from '../components/common/Dropdown/Dropdown';
import Header from '../components/common/Header/Header';
import { CATEGORY } from '../constants';
import useInfinityScroll from '../hooks/useInfinityScroll';
import useProducts from '../hooks/useProducts';
import { Container, Title } from './ProductPage.style';

function ProductPage() {
  const { products, fetchNextPage, loading, changeCategory } = useProducts();
  const { lastProductElementRef } = useInfinityScroll(fetchNextPage);

  return (
    <Container>
      <Header />
      <Title>상품 목록</Title>
      <Dropdown
        onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          changeCategory(e.target.value);
        }}
        options={Object.entries(CATEGORY)}
      ></Dropdown>
      <ItemList>
        {products.map((product) => {
          return <ItemCard key={product.id} {...product} />;
        })}
      </ItemList>
      {loading && <p>Loading...</p>}
      <div ref={lastProductElementRef} style={{ height: '10px' }}></div>
    </Container>
  );
}

export default ProductPage;
