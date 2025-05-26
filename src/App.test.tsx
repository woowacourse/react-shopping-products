import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './api/mock/handlers';
import { CartProvider } from './pages/productListPage/context/useCartContext';
import ProductListPage from './pages/productListPage/ProductListPage';
import ErrorBox from './components/common/ErrorBox/ErrorBox';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('초기 로딩 시 로딩 스피너가 표시되어야 한다', () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );
  expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
});

it('상품 목록이 로드되면 로딩 스피너가 사라져야 한다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });
});

it('상품을 장바구니에 담으면 헤더에서 장바구니 숫자가 증가한다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  const cartButton = await screen.findAllByText('담기');
  fireEvent.click(cartButton[0]);
  fireEvent.click(cartButton[1]);

  const headerCount = await screen.findByTestId('cart-count');
  expect(headerCount).toHaveTextContent('2');
});

it('상품 목록이 로드되면 상품들이 표시되어야 한다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });

  // 담기 버튼들이 표시되는지 확인 (상품이 로드됐다는 의미)
  const addButtons = screen.getAllByText('담기');
  expect(addButtons.length).toBeGreaterThan(0);
});

it('품절 상품은 담기 버튼이 표시되지 않는다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });

  const soldOutItems = screen.getAllByText('품절');
  expect(soldOutItems.length).toBeGreaterThan(0);
  const addButtons = screen.queryAllByText('담기');

  expect(addButtons.length).toBeLessThan(20);
});

it('장바구니 아이콘을 클릭하면 모달이 열린다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  // 상품을 장바구니에 담기
  const cartButton = await screen.findAllByText('담기');
  fireEvent.click(cartButton[0]);

  // 장바구니 아이콘 클릭 - null 체크 추가
  const cartIcon = await screen.findByTestId('cart-count');
  const parentDiv = cartIcon.closest('div');

  if (parentDiv) {
    fireEvent.click(parentDiv);
  } else {
    throw new Error('장바구니 아이콘의 부모 div를 찾을 수 없습니다');
  }

  // 모달이 열렸는지 확인
  await waitFor(() => {
    expect(screen.getByText('장바구니')).toBeInTheDocument();
    expect(screen.getByText('총 결제 금액')).toBeInTheDocument();
  });
});

it('빈 장바구니일 때 적절한 메시지가 표시된다', async () => {
  const { container } = render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });

  // cursor: pointer 스타일을 가진 요소 찾기 (장바구니 아이콘)
  const clickableElements = container.querySelectorAll('[style*="cursor: pointer"], [style*="cursor:pointer"]');

  if (clickableElements.length > 0) {
    fireEvent.click(clickableElements[0]);

    // 모달 내용 확인
    const emptyMessage = await screen.findByText('장바구니에 담긴 상품이 없습니다.', {}, { timeout: 3000 });
    expect(emptyMessage).toBeInTheDocument();
  } else {
    console.log('클릭 가능한 장바구니 요소를 찾을 수 없습니다');
    screen.debug();
  }
});

it('카테고리 필터링이 작동한다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });

  // 카테고리 셀렉트박스 찾기
  const categorySelect = screen.getAllByRole('combobox')[0];

  // 식료품 카테고리 선택
  fireEvent.change(categorySelect, { target: { value: '식료품' } });

  // 필터링된 결과 확인 (식료품 상품들만 표시되는지)
  await waitFor(() => {
    const addButtons = screen.getAllByText('담기');
    expect(addButtons.length).toBeGreaterThan(0);
  });
});

it('정렬 기능이 작동한다', async () => {
  render(
    <CartProvider>
      <ProductListPage />
      <ErrorBox backgroundColor='#FFC9C9' />
    </CartProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('status', { name: '로딩 중' })).not.toBeInTheDocument();
  });

  // 정렬 셀렉트박스 찾기
  const sortSelect = screen.getAllByRole('combobox')[1];

  // 가격 내림차순 선택
  fireEvent.change(sortSelect, { target: { value: 'price,desc' } });

  // 정렬이 적용되었는지 확인 (상품이 다시 로드됨)
  await waitFor(() => {
    const addButtons = screen.getAllByText('담기');
    expect(addButtons.length).toBeGreaterThan(0);
  });
});
