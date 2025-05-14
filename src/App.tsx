import { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { Container } from './styles/common';
import { ProductCardContainer } from './styles/ProductCard';
import { getProducts, ProductResponse } from './api/products';
import SelectDropdownContainer from './components/SelectDropdown/SelectDropdownContainer';
import { CATEGORY, SORT } from './constants/selectOption';
import './styles/reset.css';

type CategoryKey = (typeof CATEGORY)[number];
type SortKey = (typeof SORT)[number];

const categoryQueryMap: Record<CategoryKey, string | undefined> = {
  '전체': undefined,
  '식료품': '식료품',
  '패션잡화': '패션잡화',
};

const sortQueryMap: Record<SortKey, string | undefined> = {
  '순서 없음': undefined,
  '낮은 가격순': 'price,desc',
  '높은 가격순': 'price,asc',
};

function App() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [category, setCategory] = useState<CategoryKey>(CATEGORY[0]);
  const [sort, setSort] = useState<SortKey>(SORT[0]);
  const [basketCount, setBasketCount] = useState(50);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const matchedCategory = categoryQueryMap[category];
        const matchedSort = sortQueryMap[sort];

        const data = await getProducts({
          page: 0, 
          size: 20,          
          ...(matchedSort && { sort: matchedSort }),
          ...(matchedCategory && { category: matchedCategory })
        });
        setProducts(data.content);
      } catch (error) {
        console.error('상품 목록을 불러오지 못했습니다.', error);
      }
    };

    fetchProducts();
  }, [category, sort]);

  return (
    <Container>
      <Header basketCount={basketCount} />
      <SelectDropdownContainer
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
      />
      <ProductCardContainer>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default App;
