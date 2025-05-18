import styled from '@emotion/styled';
import Select from '../components/Select';
import { useState } from 'react';
import { CartItem, Category, PriceOrder, Product } from '../App';
import ProductItemsWithSkeleton from '../components/ProductItemsWithSkeleton';

type ProductPageProps = {
  products: Product[];
  isLoading: boolean;
  cartItems: CartItem[];
  isCartItemsLoading: boolean;
  fetchProducts: (options: {
    category?: Category;
    priceOrder?: PriceOrder;
  }) => Promise<void>;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
};

const ProductPage = ({
  products,
  isLoading,
  cartItems,
  isCartItemsLoading,
  fetchProducts,
  addToCart,
  removeFromCart,
}: ProductPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [priceOrder, setPriceOrder] = useState<PriceOrder>('낮은 가격순');

  const handleCategoryChange = async (category: Category) => {
    setSelectedCategory(category);

    await fetchProducts({
      category,
      priceOrder,
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    setPriceOrder(priceOrder);

    await fetchProducts({
      priceOrder,
      category: selectedCategory,
    });
  };
  return (
    <ProductPageContainer>
      <ProductPageHeader>bppl 상품 목록</ProductPageHeader>
      <SelectContainer>
        <Select
          optionList={['전체', '식료품', '패션잡화']}
          value={selectedCategory}
          setValue={handleCategoryChange}
          id="category-select"
        />
        <Select
          optionList={['낮은 가격순', '높은 가격순']}
          value={priceOrder}
          setValue={handlePriceOrderChange}
          id="price-order-select"
        />
      </SelectContainer>
      <ProductListContainer>
        <ProductItemsWithSkeleton
          products={products}
          isLoading={isLoading}
          cartItems={cartItems}
          isCartItemsLoading={isCartItemsLoading}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </ProductListContainer>
    </ProductPageContainer>
  );
};

export default ProductPage;

const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 25px;
  height: calc(100vh - 64px - 60px);};
`;

const ProductPageHeader = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const ProductListContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
