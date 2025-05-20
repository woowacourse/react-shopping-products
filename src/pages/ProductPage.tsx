import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SelectDropdownContainer from '../components/SelectDropdown/SelectDropdownContainer';
import ErrorMessage from '../components/ErrorMessage';
import DotWaveSpinner from '../components/DotWaveSpinner';
import { useError } from '../context/ErrorContext';
import { useLoading } from '../context/LoadingContext';
import { getProducts, ProductResponse } from '../api/products';
import { getCartItems } from '../api/cartItems';
import { CATEGORY, SORT } from '../constants/selectOption';
import { MAX_CART_COUNT } from '../constants/magicNumber';
import { ERROR_MSG } from '../constants/errorMessage';
import { Container } from '../styles/common';
import { ProductCardContainer } from '../styles/ProductCard';
import '../styles/reset.css';

type CategoryKey = (typeof CATEGORY)[number];
type SortKey = (typeof SORT)[number];

const categoryQueryMap: Record<CategoryKey, string | undefined> = {
  전체: undefined,
  식료품: '식료품',
  패션잡화: '패션잡화',
};

const sortQueryMap: Record<SortKey, string | undefined> = {
  '순서 없음': undefined,
  '낮은 가격순': 'price,asc',
  '높은 가격순': 'price,desc',
};

type CartProductIds = {
  productId: number;
  cartId: number;
};

function ProductPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [category, setCategory] = useState<CategoryKey>(CATEGORY[0]);
  const [sort, setSort] = useState<SortKey>(SORT[0]);
  const [cartProductsIds, setCartProductsIds] = useState<CartProductIds[]>([]);

  const { errorMessage, setErrorMessage, clearErrorMessage } = useError();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        clearErrorMessage();

        const matchedCategory = categoryQueryMap[category];
        const matchedSort = sortQueryMap[sort];

        const data = await getProducts({
          page: 0,
          size: 20,
          ...(matchedSort && { sort: matchedSort }),
          ...(matchedCategory && { category: matchedCategory }),
        });
        setProducts(data.content);
      } catch (error) {
        console.error(ERROR_MSG.PRODUCT_FETCH_FAIL, error);
        setErrorMessage(ERROR_MSG.PRODUCT_FETCH_FAIL);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort, setIsLoading, setErrorMessage, clearErrorMessage]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        clearErrorMessage();

        const data = await getCartItems();
        const mapped: CartProductIds[] = data.map((item) => ({
          productId: item.product.id,
          cartId: item.id,
        }));
        setCartProductsIds(mapped);
      } catch (error) {
        console.error(ERROR_MSG.CART_FETCH_FAIL, error);
        setErrorMessage(ERROR_MSG.CART_FETCH_FAIL);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, [setIsLoading, setErrorMessage, clearErrorMessage]);

  return (
    <Container>
      <Header cartCount={cartProductsIds.length} />
      {errorMessage && <ErrorMessage />}
      {isLoading && <DotWaveSpinner />}
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
            isInCart={cartProductsIds.some((item) => item.productId === product.id)}
            cartId={cartProductsIds.find((item) => item.productId === product.id)?.cartId}
            isNotCartCountMAX={cartProductsIds.length < MAX_CART_COUNT}
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default ProductPage;
