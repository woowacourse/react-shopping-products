import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductListPage } from '@/features/ProductList/pages/ProductList';
import { APIProvider } from '@/shared/context/APIContext';
import { ToastProvider } from '@/shared/context/ToastProvider';
import { server } from '@/mocks/server';
import { cartData } from '@/mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  cartData.length = 0; // 상태 직접 초기화
});

const getPriceFromItem = (item: HTMLElement) => {
  const digits = within(item).getAllByText(/\d+/);
  const prices = digits.map((el) => Number(el.textContent?.replace(/\D/g, '')));
  return Math.max(...prices); // 가격은 보통 제일 큼
};

describe('ProductListPage 통합 시나리오', () => {
  it('상품을 장바구니에 담고 모달에서 총 금액을 확인할 수 있다', async () => {
    render(
      <ToastProvider>
        <APIProvider>
          <ProductListPage />
        </APIProvider>
      </ToastProvider>
    );

    // 상품 목록 렌더 확인
    const list = await screen.findByTestId('product-list');
    const items = within(list).getAllByTestId('product-item');
    expect(items).toHaveLength(20);

    // 상품 담기
    const targetItem = items[3];
    const addButton = within(targetItem).getByRole('button', { name: /담기/i });
    fireEvent.click(addButton);

    // 장바구니 아이콘 클릭 (모달 열기)
    const bagIcon = screen.getByRole('button', { name: '장바구니' });
    fireEvent.click(bagIcon);

    // 모달 안 총 결제 금액 표시 확인
    const total = await screen.findByText(/총 결제 금액/i);
    expect(total).toBeInTheDocument();
  });

  it('서로 다른 상품 2개를 담으면 총 결제 금액이 합산된다', async () => {
    render(
      <ToastProvider>
        <APIProvider>
          <ProductListPage />
        </APIProvider>
      </ToastProvider>
    );

    const list = await screen.findByTestId('product-list');
    const items = within(list).getAllByTestId('product-item');
    expect(items.length).toBeGreaterThanOrEqual(5); // 충분한 상품이 있어야 함

    // 첫 번째 상품
    const item1 = items[2];
    const price1 = getPriceFromItem(item1);
    fireEvent.click(within(item1).getByRole('button', { name: /담기/i }));

    // 두 번째 상품
    const item2 = items[3];
    const price2 = getPriceFromItem(item2);
    fireEvent.click(within(item2).getByRole('button', { name: /담기/i }));
    // 모달 열기
    const bagIcon = screen.getByRole('button', { name: '장바구니' });
    fireEvent.click(bagIcon);

    // 총 결제 금액 확인
    const amount = await screen.findByText(/\d{1,3}(,\d{3})*원/); // 숫자 + , + "원"
    const totalValue = Number(amount.textContent?.replace(/\D/g, ''));
    expect(totalValue).toBe(price1 + price2);
  });

  it('같은 상품을 두 번 담으면 수량과 금액이 두 배가 된다', async () => {
    render(
      <ToastProvider>
        <APIProvider>
          <ProductListPage />
        </APIProvider>
      </ToastProvider>
    );

    const list = await screen.findByTestId('product-list');
    const items = within(list).getAllByTestId('product-item');

    // 타겟 상품 선택
    const item = items[3];
    const price = getPriceFromItem(item);
    fireEvent.click(within(item).getByRole('button', { name: /담기/i }));
    await waitFor(() =>
      expect(within(item).getByRole('button', { name: '증가' })).toBeInTheDocument()
    );
    fireEvent.click(within(item).getByRole('button', { name: '증가' }));

    // 장바구니 열기
    const bagIcon = screen.getByRole('button', { name: '장바구니' });
    fireEvent.click(bagIcon);

    const modal = screen.getByRole('dialog');
    const cartItems = within(modal).getAllByTestId('product-item');

    await waitFor(() =>
      expect(within(cartItems[0]).getByTestId('cart-quantity')).toHaveTextContent('2')
    );

    // 첫 번째 장바구니 아이템에서 수량 찾기
    const quantity = within(cartItems[0]).getByTestId('cart-quantity');
    expect(quantity).toHaveTextContent('2');

    // 총 결제 금액 확인
    const amount = await screen.findByText(/\d{1,3}(,\d{3})*원/);
    const total = Number(amount.textContent?.replace(/\D/g, ''));
    expect(total).toBe(price * 2);
  });

  it('상품 삭제 시 총 금액 감소, 숫자 감소, 버튼 복귀', async () => {
    render(
      <ToastProvider>
        <APIProvider>
          <ProductListPage />
        </APIProvider>
      </ToastProvider>
    );

    const list = await screen.findByTestId('product-list');
    const items = within(list).getAllByTestId('product-item');

    // 상품 선택 및 담기
    const item = items[3];
    const price = getPriceFromItem(item);
    const addBtn = within(item).getByRole('button', { name: /담기/i });
    fireEvent.click(addBtn);

    // 장바구니 열기
    fireEvent.click(screen.getByRole('button', { name: '장바구니' }));

    // modal 안에서 장바구니 아이템 로딩 대기
    const modal = screen.getByRole('dialog');
    const cartItems = await within(modal).findAllByTestId('product-item');

    // 총 결제 금액이 0인지 확인
    await waitFor(() =>
      expect(screen.getByText(/총 결제 금액/i).nextSibling?.textContent?.replace(/\D/g, '')).toBe(
        price.toString()
      )
    );

    // 삭제 버튼 찾기 (cartItem 내에서)
    const deleteBtn = within(cartItems[0]).getByRole('button', { name: '삭제' });
    fireEvent.click(deleteBtn);

    // 총 결제 금액이 0인지 확인
    await waitFor(() =>
      expect(screen.getByText(/총 결제 금액/i).nextSibling?.textContent?.replace(/\D/g, '')).toBe(
        '0'
      )
    );

    // 모달 닫기
    fireEvent.click(screen.getByRole('button', { name: '취소' }));

    // 장바구니 숫자 사라졌는지 확인 (숫자 없는 상태)
    const bagIcon = screen.getByRole('button', { name: '장바구니' });
    expect(within(bagIcon).queryByText(/\d+/)).toBeNull();

    // 해당 상품 버튼이 다시 "담기"인지 확인
    await waitFor(() =>
      expect(within(item).getByRole('button', { name: /담기/i })).toBeInTheDocument()
    );
  });
});
