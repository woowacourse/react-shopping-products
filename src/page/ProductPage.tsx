import {
  ProductItemCard,
  ItemList,
  CartItemsModal,
  Spinner,
  Dropdown,
  Header,
} from '@/components/index';
import { CATEGORY, SORT } from '@/constants/index';
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
            <Dropdown
              onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                changeCategory(e.target.value);
              }}
              options={Object.entries(CATEGORY)}
            ></Dropdown>
            <Dropdown
              onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                changeSorting(e.target.value);
              }}
              options={Object.entries(SORT)}
            ></Dropdown>
          </DropBoxContainer>

          {status === 'pending' && <Spinner />}

          <ItemList>
            {products.map((product, index) => (
              <div key={product.id}>
                <ProductItemCard key={`${product.id}${index}`} {...product} />
              </div>
            ))}
            <div ref={lastProductElementRef} />
          </ItemList>
        </ContentWrapper>
      </Container>
    </Modal.Provider>
  );
}

export default ProductPage;
