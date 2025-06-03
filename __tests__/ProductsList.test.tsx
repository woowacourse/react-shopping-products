import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsPage from '../src/pages/ProductsPage/ProductsPage';
import { renderWithProviders } from './utils/test-utils';

describe('상품 목록 기능 테스트', () => {
  const mockOnCartClick = vi.fn();

  beforeEach(() => {
    mockOnCartClick.mockClear();
  });

  describe('상품 표시', () => {
    test('상품 목록이 정상적으로 로드되어야 한다', async () => {
      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(screen.getByText('에어포스')).toBeInTheDocument();
        expect(screen.getByText('100000원')).toBeInTheDocument();
        expect(screen.getByText('사과')).toBeInTheDocument();
        expect(screen.getByText('3000원')).toBeInTheDocument();
      });
    });

    test('품절 상품이 적절히 표시되어야 한다', async () => {
      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(screen.getByText('바나나')).toBeInTheDocument();
        expect(screen.getByText('2000원')).toBeInTheDocument();
        expect(screen.getByText('품절')).toBeInTheDocument();
      });
    });
  });

  describe('필터링 및 정렬', () => {
    test('카테고리 필터링이 작동해야 한다', async () => {
      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        expect(screen.getByText('에어포스')).toBeInTheDocument();
      });

      const categorySelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(categorySelect, { target: { value: '식료품' } });

      await waitFor(() => {
        expect(screen.getByText('사과')).toBeInTheDocument();
        expect(screen.getByText('바나나')).toBeInTheDocument();
        expect(screen.getByText('우유')).toBeInTheDocument();
        expect(screen.getByText('빵')).toBeInTheDocument();
        expect(screen.getByText('치킨')).toBeInTheDocument();

        expect(screen.queryByText('에어포스')).not.toBeInTheDocument();
      });
    });

    test('가격 정렬이 작동해야 한다', async () => {
      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      const sortSelect = screen.getAllByRole('combobox')[1];
      fireEvent.change(sortSelect, { target: { value: '낮은 가격 순' } });

      await waitFor(() => {
        const productNames = screen.getAllByRole('listitem');
        expect(productNames[0]).toHaveTextContent('빵');
        expect(productNames[1]).toHaveTextContent('바나나');
        expect(productNames[2]).toHaveTextContent('우유');
      });
    });
  });
});
