import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as useGetProductsModule from '../src/hooks/useGetProducts';
import * as useGetCartsModule from '../src/hooks/useGetCartItems';
import * as useToastModule from '../src/hooks/useToast';
import { ProductDTOType } from '../src/types/product';
import React from 'react';
import ProductsPage from '../src/pages/ProductsPage/ProductsPage';
import { ToastContext } from '../src/context/ToastContext';

const MockToastProvider = ({ children }: { children: React.ReactNode }) => {
  const mockShowToast = vi.fn();
  return (
    <ToastContext.Provider value={{ showToast: mockShowToast }}>{children}</ToastContext.Provider>
  );
};

const mockProducts: ProductDTOType[] = [
  {
    id: 1001,
    name: '무럭무럭 자라나는 상추',
    price: 5000,
    imageUrl: 'lettuce-image-url.jpg',
    category: '식료품',
  },
  {
    id: 1002,
    name: '애기 상추',
    price: 3000,
    imageUrl: 'mini-lettuce-image-url.jpg',
    category: '식료품',
  },
  {
    id: 1003,
    name: '메리의 춘식이 인형',
    price: 15000,
    imageUrl: 'chunsick-image-url.jpg',
    category: '패션잡화',
  },
  {
    id: 1004,
    name: '메리 크리스마스 트리',
    price: 25000,
    imageUrl: 'merry-cris-image-url.jpg',
    category: '패션잡화',
  },
];

const initialCarts = [
  {
    id: 101,
    quantity: 1,
    product: mockProducts[0],
  },
];

global.fetch = vi.fn();

describe('ProductsPage 컴포넌트 테스트', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.spyOn(useToastModule, 'useToast').mockImplementation(() => {});

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/cart-items') && !url.includes('?page')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ content: initialCarts }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
    vi.stubEnv('VITE_TOKEN', 'mock-token');

    vi.spyOn(useGetProductsModule, 'default').mockReturnValue({
      isLoading: false,
      isError: false,
      errorMessage: '',
      products: mockProducts,
    });

    vi.spyOn(useGetCartsModule, 'default').mockReturnValue({
      isLoading: false,
      isError: false,
      errorMessage: '',
      carts: initialCarts,
      refetchCarts: vi.fn().mockResolvedValue(initialCarts),
    });
  });

  const renderWithToast = (ui: React.ReactNode) => {
    return render(ui, { wrapper: MockToastProvider });
  };

  describe('상품 목록 조회 기능', () => {
    test('상품 목록이 정상적으로 렌더링되어야 한다', async () => {
      renderWithToast(<ProductsPage />);

      expect(screen.getByText('bpple 상품 목록')).toBeInTheDocument();

      await waitFor(() => {
        mockProducts.forEach((product) => {
          expect(screen.getByText(product.name)).toBeInTheDocument();
          expect(screen.getByText(`${product.price}원`)).toBeInTheDocument();
        });
      });
    });

    test('상품 정보를 불러오지 못할 때 에러 메시지가 전달되어야 한다', async () => {
      const mockUseToast = vi.fn();
      vi.spyOn(useToastModule, 'useToast').mockImplementation(mockUseToast);

      vi.spyOn(useGetProductsModule, 'default').mockReturnValue({
        isLoading: false,
        isError: true,
        errorMessage: '상품 정보를 불러오지 못했습니다',
        products: null,
      });

      renderWithToast(<ProductsPage />);

      expect(mockUseToast).toHaveBeenCalledWith('상품 정보를 불러오지 못했습니다');
    });
  });

  describe('상품 정렬 및 필터링 기능', () => {
    test('카테고리 필터링이 정상 작동해야 한다', async () => {
      const useGetProductsMock = vi.spyOn(useGetProductsModule, 'default');
      const { rerender } = renderWithToast(<ProductsPage />);

      useGetProductsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        errorMessage: '',
        products: mockProducts.filter((product) => product.category === '식료품'),
      });

      const categorySelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(categorySelect, { target: { value: '식료품' } });

      rerender(<ProductsPage />);

      await waitFor(() => {
        expect(screen.getByText('무럭무럭 자라나는 상추')).toBeInTheDocument();
        expect(screen.getByText('애기 상추')).toBeInTheDocument();

        expect(screen.queryByText('메리의 춘식이 인형')).not.toBeInTheDocument();
        expect(screen.queryByText('메리 크리스마스 트리')).not.toBeInTheDocument();
      });
    });

    test('낮은 가격 순으로 정렬이 정상 작동해야 한다', async () => {
      const useGetProductsMock = vi.spyOn(useGetProductsModule, 'default');
      const { rerender } = renderWithToast(<ProductsPage />);

      const ascSortedProducts = [...mockProducts].sort((a, b) => a.price - b.price);
      useGetProductsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        errorMessage: '',
        products: ascSortedProducts,
      });

      const sortSelect = screen.getAllByRole('combobox')[1];
      fireEvent.change(sortSelect, { target: { value: '낮은 가격 순' } });

      rerender(<ProductsPage />);

      const prices = screen.getAllByText(/원$/);
      expect(Number(prices[0].textContent?.replace('원', ''))).toBeLessThan(
        Number(prices[prices.length - 1].textContent?.replace('원', '')),
      );
    });

    test('높은 가격 순으로 정렬이 정상 작동해야 한다', async () => {
      const useGetProductsMock = vi.spyOn(useGetProductsModule, 'default');
      const { rerender } = renderWithToast(<ProductsPage />);

      const descSortedProducts = [...mockProducts].sort((a, b) => b.price - a.price);
      useGetProductsMock.mockReturnValue({
        isLoading: false,
        isError: false,
        errorMessage: '',
        products: descSortedProducts,
      });

      const sortSelect = screen.getAllByRole('combobox')[1];
      fireEvent.change(sortSelect, { target: { value: '높은 가격 순' } });

      rerender(<ProductsPage />);

      const prices = screen.getAllByText(/원$/);
      expect(Number(prices[0].textContent?.replace('원', ''))).toBeGreaterThan(
        Number(prices[prices.length - 1].textContent?.replace('원', '')),
      );
    });
  });

  describe('장바구니 조회 기능', () => {
    test('장바구니 아이템 개수가 헤더에 표시되어야 한다', () => {
      renderWithToast(<ProductsPage />);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('장바구니 조회 에러 시 에러 메시지가 전달되어야 한다', () => {
      const mockUseToast = vi.fn();
      vi.spyOn(useToastModule, 'useToast').mockImplementation(mockUseToast);

      vi.spyOn(useGetCartsModule, 'default').mockReturnValue({
        isLoading: false,
        isError: true,
        errorMessage: '장바구니 정보를 불러오지 못했습니다',
        carts: null,
        refetchCarts: vi.fn(),
      });

      renderWithToast(<ProductsPage />);

      expect(mockUseToast).toHaveBeenCalledWith('장바구니 정보를 불러오지 못했습니다');
    });
  });

  describe('상품 장바구니 담기 기능', () => {
    test('담기 버튼 클릭 시 장바구니에 상품이 추가되어야 한다', async () => {
      renderWithToast(<ProductsPage />);

      const addButtons = screen.getAllByText('담기');
      expect(addButtons.length).toBeGreaterThan(0);
      fireEvent.click(addButtons[0]);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'https://api.example.com/cart-items',
          expect.objectContaining({
            method: 'POST',
            body: expect.any(String),
          }),
        );
      });

      const fetchCalls = fetch as jest.Mock;
      const lastCall = fetchCalls.mock.calls[fetchCalls.mock.calls.length - 1];
      const requestBody = JSON.parse(lastCall[1].body);

      expect(requestBody).toHaveProperty('productId');
      expect(requestBody).toHaveProperty('quantity', 1);
    });

    test('장바구니 담기 에러 시 에러 메시지가 전달되어야 한다', async () => {
      const mockUseToast = vi.fn();
      vi.spyOn(useToastModule, 'useToast').mockImplementation(mockUseToast);

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: () => Promise.reject(new Error('장바구니에 상품을 담지 못했습니다')),
      });

      renderWithToast(<ProductsPage />);

      const addButtons = screen.getAllByText('담기');
      fireEvent.click(addButtons[0]);

      await waitFor(() => {
        expect(mockUseToast).toHaveBeenCalledWith(
          expect.stringContaining('장바구니에 상품을 담지 못했습니다'),
        );
      });
    });

    test('장바구니 최대 개수(50개) 초과 시 에러 메시지가 전달되어야 한다', async () => {
      const mockUseToast = vi.fn();
      vi.spyOn(useToastModule, 'useToast').mockImplementation(mockUseToast);

      vi.spyOn(useGetCartsModule, 'default').mockReturnValue({
        isLoading: false,
        isError: false,
        errorMessage: '',
        carts: Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          quantity: 1,
          product: { ...mockProducts[i % mockProducts.length], id: i + 1 },
        })),
        refetchCarts: vi.fn(),
      });

      renderWithToast(<ProductsPage />);

      const addButtons = screen.getAllByText('담기');
      fireEvent.click(addButtons[0]);

      await waitFor(() => {
        expect(mockUseToast).toHaveBeenCalledWith(
          '장바구니는 최대 50개의 상품을 담을 수 있습니다.',
        );
      });

      expect(fetch).not.toHaveBeenCalledWith(
        expect.stringContaining('/cart-items'),
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  describe('상품 장바구니 빼기 기능', () => {
    test('빼기 버튼 클릭 시 장바구니에서 상품이 제거되어야 한다', async () => {
      renderWithToast(<ProductsPage />);

      const removeButtons = screen.getAllByText('빼기');
      expect(removeButtons.length).toBeGreaterThan(0);
      fireEvent.click(removeButtons[0]);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'https://api.example.com/cart-items/101',
          expect.objectContaining({
            method: 'DELETE',
          }),
        );
      });
    });

    test('장바구니 빼기 에러 시 에러 메시지가 전달되어야 한다', async () => {
      const mockUseToast = vi.fn();
      vi.spyOn(useToastModule, 'useToast').mockImplementation(mockUseToast);

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: () => Promise.reject(new Error('장바구니에 상품을 빼지 못했습니다')),
      });

      renderWithToast(<ProductsPage />);

      const removeButtons = screen.getAllByText('빼기');
      fireEvent.click(removeButtons[0]);

      await waitFor(() => {
        expect(mockUseToast).toHaveBeenCalledWith(
          expect.stringContaining('장바구니에 상품을 빼지 못했습니다'),
        );
      });
    });
  });
});
