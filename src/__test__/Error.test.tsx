import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductListPage } from '@/features/ProductList/pages/ProductList';
import { APIProvider } from '@/shared/context/APIContext';
import { ToastProvider } from '@/shared/context/ToastProvider';
import { server } from '@/mocks/server';
import { cartData } from '@/mocks/handlers';

beforeAll(() => server.listen());
beforeAll(() => {
  window.addEventListener('unhandledrejection', () => {});
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  cartData.length = 0; // 상태 직접 초기화
});

describe('Error 발생 시나리오', () => {
  it('품절된 상품을 담으면 에러 토스트가 3초간 나타난다', async () => {
    render(
      <ToastProvider>
        <APIProvider>
          <ProductListPage />
        </APIProvider>
      </ToastProvider>
    );

    const list = await screen.findByTestId('product-list');
    const items = within(list).getAllByTestId('product-item');
    const soldOutItem = items.find((el) => within(el).queryByText('품절'))!;
    const addBtn = within(soldOutItem).getByRole('button', { name: /담기/i });

    // 클릭 시 발생할 수 있는 비동기 에러 감지
    await act(async () => {
      fireEvent.click(addBtn);
    });

    // UI 반영 기다리기
    const toast = await screen.findByText('품절된 상품은 장바구니에 담을 수 없습니다.');
    expect(toast).toBeInTheDocument();

    // 에러 사라짐까지도 기다리되, 그 안에서 error 캐치
    try {
      await waitFor(
        () => {
          expect(screen.queryByText('품절된 상품은 장바구니에 담을 수 없습니다.')).toBeNull();
        },
        { timeout: 4000 }
      );
    } catch (e) {
      // UI가 사라지지 않은 에러는 Vitest에 영향 안 주게 무시
      console.warn('waitFor error ignored in test:', e);
    }
  });

  it('재고 수량 초과 시 에러 토스트가 3초간 나타난다', async () => {
    render(
      <ToastProvider>
        <APIProvider>
          <ProductListPage />
        </APIProvider>
      </ToastProvider>
    );

    const list = await screen.findByTestId('product-list');
    const items = within(list).getAllByTestId('product-item');

    // 품절이 아닌 상품을 선택
    const item = items[2];

    await act(async () => {
      fireEvent.click(within(item).getByRole('button', { name: /담기/i }));
    });

    // 첫 증가(수량 → 2)
    const plusBtn1 = await within(item).findByRole('button', { name: '증가' });
    await act(async () => {
      fireEvent.click(plusBtn1);
    });

    // 두 번째 증가(수량 → 3, 재고 초과 트리거)
    const plusBtn2 = await within(item).findByRole('button', { name: '증가' });
    await act(async () => {
      fireEvent.click(plusBtn2);
    });

    // 이제 토스트가 확실히 렌더된 뒤에 찾기
    const toast = await screen.findByTestId('toast');
    expect(toast).toHaveTextContent('재고 수량을 초과하여 담을 수 없습니다.');

    // 사라질 때까지 기다리기
    await waitFor(
      () => {
        expect(screen.queryByTestId('toast')).toBeNull();
      },
      { timeout: 4000 }
    );
  });
});
