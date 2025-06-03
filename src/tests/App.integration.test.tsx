/// <reference types="vitest" />
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useProducts } from '../hooks/useProducts';
import { addCart, removeCart } from '../api/fetchCart';

vi.mock('../hooks/useProducts');
vi.mock('../api/cart');

vi.mock('../ui/components/ProductList/ProductList', () => ({
  default: ({
    onAddCart,
    onRemoveCart,
  }: {
    onAddCart: (product: { id: number; cartId?: number }) => Promise<void>;
    onRemoveCart: (product: { id: number; cartId?: number }) => Promise<void>;
  }) => (
    <div>
      <button data-testid="add-btn" onClick={() => onAddCart({ id: 1 })}>
        장바구니에 추가
      </button>
      <button
        data-testid="remove-btn-valid"
        onClick={() => onRemoveCart({ id: 1, cartId: 123 })}
      >
        유효한 장바구니 제거
      </button>
      <button
        data-testid="remove-btn-invalid"
        onClick={() => onRemoveCart({ id: 1, cartId: undefined })}
      >
        무효한 장바구니 제거
      </button>
    </div>
  ),
}));

describe('App 컴포넌트의 장바구니 로직', () => {
  const fetchDataMock = vi.fn();
  const setIsErrorMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('장바구니가 최대 개수(50)일 때 추가 시 오류 상태를 true 로 설정한다', async () => {
    (useProducts as vi.Mock).mockReturnValue({
      data: [],
      cart: { totalElements: 50 },
      isLoading: false,
      isError: false,
      setIsError: setIsErrorMock,
      fetchData: fetchDataMock,
    });

    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('add-btn'));

    expect(setIsErrorMock).toHaveBeenCalledWith(true);
    expect(fetchDataMock).not.toHaveBeenCalled();
  });

  test('장바구니 추가 성공 시 fetchData 를 호출한다', async () => {
    (useProducts as vi.Mock).mockReturnValue({
      data: [],
      cart: { totalElements: 0 },
      isLoading: false,
      isError: false,
      setIsError: setIsErrorMock,
      fetchData: fetchDataMock,
    });
    (addCart as vi.Mock).mockResolvedValue(undefined);

    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('add-btn'));

    await waitFor(() => {
      expect(addCart).toHaveBeenCalledWith(1);
      expect(fetchDataMock).toHaveBeenCalled();
      expect(setIsErrorMock).not.toHaveBeenCalled();
    });
  });

  test('장바구니 추가 실패 시 오류 상태를 true 로 설정한다', async () => {
    (useProducts as vi.Mock).mockReturnValue({
      data: [],
      cart: { totalElements: 0 },
      isLoading: false,
      isError: false,
      setIsError: setIsErrorMock,
      fetchData: fetchDataMock,
    });
    (addCart as vi.Mock).mockRejectedValue(new Error('네트워크 오류'));

    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('add-btn'));

    await waitFor(() => {
      expect(addCart).toHaveBeenCalledWith(1);
      expect(setIsErrorMock).toHaveBeenCalledWith(true);
      expect(fetchDataMock).not.toHaveBeenCalled();
    });
  });

  test('유효한 cartId 로 제거 시 fetchData 를 호출한다', async () => {
    (useProducts as vi.Mock).mockReturnValue({
      data: [],
      cart: { totalElements: 10 },
      isLoading: false,
      isError: false,
      setIsError: setIsErrorMock,
      fetchData: fetchDataMock,
    });
    (removeCart as vi.Mock).mockResolvedValue(undefined);

    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('remove-btn-valid'));

    await waitFor(() => {
      expect(removeCart).toHaveBeenCalledWith(123);
      expect(fetchDataMock).toHaveBeenCalled();
      expect(setIsErrorMock).not.toHaveBeenCalled();
    });
  });

  test('무효한 cartId 로 제거 시 오류 상태를 true 로 설정한다', async () => {
    (useProducts as vi.Mock).mockReturnValue({
      data: [],
      cart: { totalElements: 10 },
      isLoading: false,
      isError: false,
      setIsError: setIsErrorMock,
      fetchData: fetchDataMock,
    });

    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('remove-btn-invalid'));

    expect(setIsErrorMock).toHaveBeenCalledWith(true);
    expect(removeCart).not.toHaveBeenCalled();
    expect(fetchDataMock).not.toHaveBeenCalled();
  });
});
