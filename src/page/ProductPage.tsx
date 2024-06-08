import {
  ProductItemCard,
  ItemList,
  CartItemsModal,
  Spinner,
  Header,
  CategoryDropdown,
  SortDropdown,
} from '@/components/index';
import {
  Container,
  Title,
  DropBoxContainer,
  ContentWrapper,
} from './ProductPage.style';
import { useIntersectionObserver, useInfiniteProducts } from '@/hooks/index';
import { Modal } from 'river-modal-component';

function ProductPage() {
  const { products, status, fetchNextPage, changeCategory, changeSorting } =
    useInfiniteProducts();
  const { lastProductElementRef } = useIntersectionObserver(fetchNextPage);

  return (
    <Modal.Provider>
      <CartItemsModal />
      <Container>
        <Header />
        <ContentWrapper>
          <Title>bpple 상품 목록</Title>
          <DropBoxContainer>
            <CategoryDropdown changeCategory={changeCategory} />
            <SortDropdown changeSorting={changeSorting} />
          </DropBoxContainer>

          {status === 'pending' && <Spinner />}

          <ItemList>
            {products.map((product, index) => (
              <ProductItemCard key={`${product.id}${index}`} {...product} />
            ))}
            <div ref={lastProductElementRef} />
          </ItemList>
        </ContentWrapper>
      </Container>
    </Modal.Provider>
  );
}

export default ProductPage;
