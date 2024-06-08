import { renderHook, waitFor } from '@testing-library/react';
import { useInfiniteProducts } from '@/hooks/index';
import {
  combinedContextWrapper,
  testQueryClient,
} from '../../utils/test-utils';
import { server } from '../../../src/mocks/server';
import { HttpResponse, http } from 'msw';
import { ENDPOINT } from '../../../src/api/endpoints';
import { act } from 'react';

describe('useInfiniteProducts 테스트', () => {
  afterEach(() => {
    testQueryClient.clear();
  });

  const renderUseInfiniteProductsHook = () =>
    renderHook(() => useInfiniteProducts(), {
      wrapper: combinedContextWrapper,
    });

  it('상품 목록을 조회하면 처음에는 20개의 상품이 반환된다 ', async () => {
    const { result } = renderUseInfiniteProductsHook();

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });
  });

  it('상품 목록 조회 중 로딩 상태', () => {
    const { result } = renderUseInfiniteProductsHook();
    expect(result.current.status).toBe('pending');
  });

  it('상품 목록 조회 중 에러 상태', async () => {
    server.use(
      http.get(ENDPOINT.product.getList({}), () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderUseInfiniteProductsHook();

    expect(result.current.products).toEqual([]);
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderUseInfiniteProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderUseInfiniteProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderUseInfiniteProductsHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      for (let i = 5; i < 24; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = 20 + (i - 4) * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
      });
    });
  });
});
