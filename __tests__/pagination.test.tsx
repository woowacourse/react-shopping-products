import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import useProducts from '../src/hooks/product/useProductItems';
import products from '../src/mocks/products.json';

describe('무한 스크롤 테스트', () => {
  it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });
  });

  it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });

    act(() => {
      result.current.updateNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
      expect(result.current.page).toBe(1);
    });
  });

  it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    for (let i = 1; i <= (products.length - 20) / 4; i++) {
      await waitFor(() => {
        act(() => {
          result.current.updateNextPage();
        });
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20 + i * 4);
        expect(result.current.page).toBe(i);
      });
    }

    await act(async () => {
      result.current.updateNextPage();
    });

    await waitFor(() => {
      expect(result.current.page).toBe(20);
    });
  });
});
