import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsPage from '../src/pages/ProductsPage/ProductsPage';
import { renderWithProviders } from './utils/test-utils';

describe('장바구니 기능 테스트', () => {
  const mockOnCartClick = vi.fn();

  beforeEach(() => {
    mockOnCartClick.mockClear();
  });

  describe('장바구니 정보 표시', () => {
    test('초기 장바구니 개수가 헤더에 표시되어야 한다', async () => {
      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        const cartImage = screen.getByAltText('cart');
        const cartButton = cartImage.closest('button');
        const countSpan = cartButton?.querySelector('span');
        expect(countSpan).toHaveTextContent('2');
      });
    });
  });

  describe('장바구니 담기', () => {
    test('담기 버튼 클릭 시 장바구니 개수가 증가해야 한다', async () => {
      renderWithProviders(<ProductsPage onCartClick={mockOnCartClick} />);

      await waitFor(() => {
        const cartImage = screen.getByAltText('cart');
        const cartButton = cartImage.closest('button');
        const countSpan = cartButton?.querySelector('span');
        expect(countSpan).toHaveTextContent('2');
      });

      const addButtons = screen.getAllByText('담기');
      expect(addButtons.length).toBeGreaterThan(0);
      fireEvent.click(addButtons[0]);

      await waitFor(() => {
        const cartImage = screen.getByAltText('cart');
        const cartButton = cartImage.closest('button');
        const countSpan = cartButton?.querySelector('span');
        expect(countSpan).toHaveTextContent('3');
      });
    });
  });
});
