import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsPage from '../src/pages/ProductsPage/ProductsPage';
import { renderWithProviders, mockShowToast } from './utils/test-utils';
import { server } from '../src/mocks/server';
import { http, HttpResponse } from 'msw';

describe('Toast 기능 테스트', () => {
  const mockOnCartClick = vi.fn();

  beforeEach(() => {
    mockOnCartClick.mockClear();
    mockShowToast.mockClear();
  });

  describe('에러 Toast', () => {
    test('담기 버튼 클릭 시 재고 부족 에러 발생하면 OUT_OF_STOCK 메시지가 Toast로 표시되어야 한다', async () => {
      server.use(
        http.post('*/cart-items', () => {
          return HttpResponse.json(
            {
              errorCode: 'OUT_OF_STOCK',
              message: '재고 수량을 초과하여 담을 수 없습니다.',
            },
            { status: 400 },
          );
        }),
      );

      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(screen.getByText('에어포스')).toBeInTheDocument();
      });

      const addButtons = screen.getAllByText('담기');
      if (addButtons.length > 0) {
        fireEvent.click(addButtons[0]);

        await waitFor(() => {
          expect(mockShowToast).toHaveBeenCalledWith({
            text: '재고 수량을 초과하여 담을 수 없습니다.',
            variant: 'error',
          });
        });
      }
    });

    test('장바구니 담기 API 500 에러 발생 시 서버 응답 메시지가 Toast로 표시되어야 한다', async () => {
      server.use(
        http.post('*/cart-items', () => {
          return HttpResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
        }),
      );

      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(screen.getByText('에어포스')).toBeInTheDocument();
      });

      const addButtons = screen.getAllByText('담기');
      if (addButtons.length > 0) {
        fireEvent.click(addButtons[0]);

        await waitFor(() => {
          expect(mockShowToast).toHaveBeenCalledWith({
            text: '서버 오류가 발생했습니다.',
            variant: 'error',
          });
        });
      }
    });

    test('페이지 진입 시 상품 목록 API 호출 실패하면 에러 메시지가 Toast로 표시되어야 한다', async () => {
      server.use(
        http.get('*/products', () => {
          return HttpResponse.json({ message: '상품 목록을 불러올 수 없습니다.' }, { status: 500 });
        }),
      );

      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith({
          text: '상품 목록을 불러올 수 없습니다.',
          variant: 'error',
        });
      });
    });
  });

  describe('Toast 중복 방지 기능', () => {
    test('동일한 에러 메시지 연속 발생 시 useToast 중복 방지 로직으로 Toast가 한 번만 표시되어야 한다', async () => {
      server.use(
        http.post('*/cart-items', () => {
          return HttpResponse.json({ message: '동일한 에러 메시지' }, { status: 400 });
        }),
      );

      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(screen.getByText('에어포스')).toBeInTheDocument();
      });

      const addButtons = screen.getAllByText('담기');
      if (addButtons.length > 0) {
        fireEvent.click(addButtons[0]);

        await waitFor(() => {
          expect(mockShowToast).toHaveBeenCalledTimes(1);
        });

        fireEvent.click(addButtons[0]);

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(mockShowToast).toHaveBeenCalledTimes(1);
      }
    });
  });
});
