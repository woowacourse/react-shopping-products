import { useEffect, useRef } from 'react';
import ItemCard from '../components/ItemCard/ItemCard';
import ItemList from '../components/ItemList/ItemList';
import Header from '../components/common/Header/Header';
import useProducts from '../hooks/useProducts';
import { Container } from './ProductPage.style';

function ProductPage() {
  const { products, fetchNextPage, loading } = useProducts();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const options = {
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    }, options);

    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [products, loading, fetchNextPage]);

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
