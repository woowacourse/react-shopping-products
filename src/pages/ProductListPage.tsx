import styled from '@emotion/styled';
import Select from '../components/Select';
import { useEffect, useState } from 'react';
import { Category, PriceOrder } from '../App';
import ProductItemsWithSkeleton from '../components/ProductItemsWithSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import getProductErrorMessage from '../utils/getProductErrorMessage';
import Header from '../components/header/Header';
import { useCartItemsContext } from '../components/contexts/cartItemsContext';
import getCartErrorMessage from '../utils/getCartErrorMessage';
import Modal from '../components/Modal';
import { useProductsContext } from '../components/contexts/productsContext';

const ProductListPage = () => {
  const { error, fetchProducts } = useProductsContext();
  const {
    cartItems,
    error: cartItemsError,
    fetchCartItems,
  } = useCartItemsContext();

  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [priceOrder, setPriceOrder] = useState<PriceOrder>('낮은 가격순');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

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

  useEffect(() => {
    fetchProducts({
      category: selectedCategory,
      priceOrder,
    });
  }, []);

  return (
    <>
      <Header
        cartItemCount={cartItems.length}
        handleOpenModal={handleOpenModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        position="bottom"
        size="small"
      >
        <Modal.Title title="장바구니"></Modal.Title>
        <Modal.Button
          title="닫기"
          backgroundColor="black"
          textColor="white"
          onClick={handleCloseModal}
        />
      </Modal>
      {cartItemsError.isError && (
        <ErrorMessage
          errorMessage={getCartErrorMessage(cartItemsError.status)}
        />
      )}
      {error.isError && (
        <ErrorMessage errorMessage={getProductErrorMessage(error.status)} />
      )}
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
          <ProductItemsWithSkeleton />
        </ProductListContainer>
      </ProductPageContainer>
    </>
  );
};

export default ProductListPage;

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
