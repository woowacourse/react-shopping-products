import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import {useEffect, useState} from 'react';
import {getProducts} from './features/products/api/getProducts';
import {CartProduct, Product} from './features/products/type/product';
import {filterByValue} from './shared/utils/filterByValue';
import {matchCategory} from './features/products/utils/matchCategory';
import {getCartProduct} from './features/cart/api/getCartProduct';
import Navbar from './widgets/navbar/ui/Navbar';

type Category = 'all' | 'food' | 'clothes';

const CATEGORY_OPTIONS = [
  {label: '전체', value: 'all'},
  {label: '식료품', value: 'food'},
  {label: '패션잡화', value: 'clothes'},
];

const FILTER_OPTIONS = [
  {label: '필터', value: ''},
  {label: '높은 가격순', value: 'price,desc'},
  {label: '낮은 가격순', value: 'price,asc'},
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [category, setCategory] = useState<Category>('all');
  const [sortValue, setSortValue] = useState('');

  const isError = error !== '';
  const cartQuantity = products.filter((product) => product.isCart).length;

  // console.log(pageInfo);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const productRes = await getProducts({sortValue});
        const cartProducts = await getCartProduct();

        const rawProducts = productRes.content;
        const cartProductIds = new Set(
          cartProducts.content.map((cp: CartProduct) => cp.product.id)
        );

        const productsWithCartInfo = rawProducts.map((product: Product) => ({
          ...product,
          isCart: cartProductIds.has(product.id),
          cartProductId: cartProducts.content.find(
            (cp: CartProduct) => cp.product.id === product.id
          )?.id,
        }));

        setProducts(productsWithCartInfo);
        setPageInfo({
          totalElements: productRes.totalElements,
          totalPages: productRes.totalPages,
        });
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sortValue]);

  const filteredProducts = filterByValue<Product, 'category'>({
    array: products,
    compare: 'category',
    value: matchCategory[category],
  });

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar cartQuantity={cartQuantity} />
      <S.ProductListWrapper>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>
            WoowaBros Product List
          </S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect
              items={CATEGORY_OPTIONS}
              onChange={(e) => setCategory(e.target.value as Category)}
            />
            <CustomSelect
              items={FILTER_OPTIONS}
              onChange={(e) => setSortValue(e.target.value)}
            />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        {isLoading ? (
          <div>loading...</div>
        ) : (
          <S.ProductList>
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </S.ProductList>
        )}
      </S.ProductListWrapper>
    </>
  );
}

export default App;
