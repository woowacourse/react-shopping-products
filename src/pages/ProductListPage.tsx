import styled from '@emotion/styled';
import Select from '../components/commons/Select';
import { useEffect, useState } from 'react';
import { Category, PriceOrder } from '../App';
import ProductItemsWithSkeleton from '../components/ProductItemsWithSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import getProductErrorMessage from '../utils/getProductErrorMessage';
import Header from '../components/header/Header';

import getCartErrorMessage from '../utils/getCartErrorMessage';
import Modal from '../components/Modal';
import useProducts from '../hooks/useProducts';
import useCartItems from '../hooks/useCartItems';
import ProductItemModalCard from '../components/ProductItem/ProductItemModalCard';
import Flex from '../components/commons/Flex';
import CartTotalAmount from '../components/cart/CartTotalAmount';

const ProductListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [priceOrder, setPriceOrder] = useState<PriceOrder>('낮은 가격순');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchProducts, error } = useProducts({
    category: selectedCategory,
    priceOrder,
  });

  const { cartItems, error: cartItemsError, fetchCartItems } = useCartItems();
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
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    setPriceOrder(priceOrder);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceOrder]);

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
        <Modal.Contents>
          <Flex flexDirection="column">
            <Divider />
            {cartItems.map((cartItem) => (
              <>
                <ProductItemModalCard
                  key={cartItem.id}
                  product={cartItem.product}
                />
                <Divider />
              </>
            ))}
            <CartTotalAmount total={1000} />
          </Flex>
        </Modal.Contents>
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

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
`;
