import '@testing-library/jest-dom';
import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ProductsPage from '../src/pages/ProductsPage/ProductsPage';
import { ToastProvider } from '../src/contexts/ToastContext';
import { DataProvider } from '../src/contexts/DataContext';
import { mockProducts } from '../src/mocks/datas/mockProducts';
import { mockCartItems } from '../src/mocks/datas/mockCartItem';
import * as postCartItem from '../src/api/postCartItem';
import * as getCarts from '../src/api/getCarts';

const renderWithProviders = (children: React.ReactElement) => {
  return render(
    <ToastProvider>
      <DataProvider>{children}</DataProvider>
    </ToastProvider>,
  );
};

describe('상품 목록 조회 기능', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('상품 목록이 정상적으로 렌더링되어야 한다', async () => {
    renderWithProviders(<ProductsPage />);

    expect(screen.getByText('SHOP')).toBeInTheDocument();

    await waitFor(() => {
      mockProducts.forEach((product) => {
        expect(screen.getAllByText(product.name)[0]).toBeInTheDocument();
        expect(screen.getAllByText(`${product.price}원`)[0]).toBeInTheDocument();
      });
    });
  });

  test('상품 정보를 불러오지 못할 때 에러 UI가 표시되어야 한다', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));

    renderWithProviders(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('상품 정보를 불러오지 못했습니다.')).toBeInTheDocument();
    });
  });
});

describe('상품 정렬 및 필터링 기능', () => {
  test('카테고리 필터링이 정상 작동해야 한다', async () => {
    renderWithProviders(<ProductsPage />);

    const categorySelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(categorySelect, { target: { value: '식료품' } });

    const filteredProducts = mockProducts.filter((product) => product.category === '식료품');

    await waitFor(() => {
      expect(screen.getByText(filteredProducts[0].name)).toBeInTheDocument();
    });
  });

  test('낮은 가격 순으로 정렬이 정상 작동해야 한다', async () => {
    renderWithProviders(<ProductsPage />);

    const sortSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(sortSelect, { target: { value: '낮은 가격 순' } });

    const orderedProducts = [...mockProducts].sort((a, b) => a.price - b.price);

    await waitFor(() => {
      expect(screen.getByText(orderedProducts[0].name)).toBeInTheDocument();
    });

    const prices = screen.getAllByText(/원$/);
    const priceValues = prices.map((el) => Number(el.textContent?.replace('원', '')));
    expect(priceValues).toEqual([...priceValues].sort((a, b) => a - b));
  });

  test('높은 가격 순으로 정렬이 정상 작동해야 한다', async () => {
    renderWithProviders(<ProductsPage />);

    const sortSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(sortSelect, { target: { value: '높은 가격 순' } });

    const orderedProducts = [...mockProducts].sort((a, b) => b.price - a.price);

    await waitFor(() => {
      expect(screen.getByText(orderedProducts[0].name)).toBeInTheDocument();
    });

    const prices = screen.getAllByText(/원$/);
    const priceValues = prices.map((el) => Number(el.textContent?.replace('원', '')));
    expect(priceValues).toEqual([...priceValues].sort((a, b) => b - a));
  });
});

describe('장바구니 조회 기능', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('장바구니 아이템 개수가 헤더에 표시되어야 한다', () => {
    renderWithProviders(<ProductsPage />);

    waitFor(() => {
      expect(screen.getByText(mockCartItems.length)).toBeInTheDocument();
    });
  });

  test('장바구니 조회 에러 시 에러 UI가 표시되어야 한다', async () => {
    vi.spyOn(getCarts, 'default').mockImplementation(async () => {
      throw new Error();
    });

    renderWithProviders(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('장바구니 정보를 불러오지 못했습니다.')).toBeInTheDocument();
    });
  });
});

describe('상품 장바구니 담기 기능', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('담기 버튼 클릭 시 장바구니에 상품이 추가되어야 한다', async () => {
    renderWithProviders(<ProductsPage />);

    let addButtons;

    await waitFor(() => {
      addButtons = screen.getAllByText('담기');
      expect(addButtons.length).toBeGreaterThan(0);
      fireEvent.click(addButtons[0]);
    });

    const updatedButtons = screen.getAllByText('담기');
    expect(updatedButtons.length).toEqual(addButtons.length - 1);
  });

  test('장바구니 담기 에러 시 에러 UI가 표시되어야 한다', async () => {
    vi.spyOn(postCartItem, 'default').mockImplementation(async () => {
      return {
        errorCode: 'CART_ITEM_NOT_FOUND',
        message: '장바구니 아이템을 찾을 수 없습니다.',
      };
    });

    renderWithProviders(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getAllByText('담기')).toBeTruthy();
    });

    const addButtons = screen.getAllByText('담기');
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('장바구니 아이템을 찾을 수 없습니다.')).toBeInTheDocument();
    });
  });
});

describe('상품 장바구니 빼기 기능', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('1개인 상품의 - 버튼 클릭 시 장바구니에서 상품이 제거되어야 한다', async () => {
    renderWithProviders(<ProductsPage />);

    let minusButtons;

    await waitFor(() => {
      expect(screen.getAllByText('-').length).toBeGreaterThan(0);

      minusButtons = screen.getAllByText('-');
      fireEvent.click(minusButtons[0]);
    });

    const updatedButtons = screen.getAllByText('-');
    expect(updatedButtons.length).toEqual(minusButtons.length - 1);
  });
});
