import { useEffect, useRef } from 'react';
import ItemCard from '../components/ItemCard/ItemCard';
import ItemList from '../components/ItemList/ItemList';
import Header from '../components/common/Header/Header';
import useProducts from '../hooks/useProducts';
import { Container } from './ProductPage.style';

function ProductPage() {
  const { products, fetchNextPage, loading } = useProducts();

  return (
    <Container>
      <Header />
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
