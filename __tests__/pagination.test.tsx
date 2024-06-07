import { isDescendingPrice } from './utils/productPrice';
import { renderHook, waitFor } from '@testing-library/react';

import React, { act } from 'react';
import { createProductsRenderHook } from './utils/createProductsRenderHook';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProducts from '../src/hooks/product/useProducts/useProducts';
import useSelectProductDropdown from '../src/hooks/product/useSelectProductDropdown';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('무한 스크롤 테스트', () => {
  it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
    const { result } = createProductsRenderHook();

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });
  });

  it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
    const { result } = renderHook(
      () => {
        const { dropdownOptions, onSelectOption } = useSelectProductDropdown();
        const result = useProducts(dropdownOptions);

        return { ...result, dropdownOptions, onSelectOption };
      },
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.products.length).toBe(20);
    });

    act(() => {
      result.current.updateNextProductItem();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
      expect(result.current.page).toBe(1);
    });
  });

  //   const { result } = renderHook(
  //     () => {
  //       const { dropdownOptions, onSelectOption } = useSelectProductDropdown();
  //       const result = useProducts(dropdownOptions);

  //       return { ...result, dropdownOptions, onSelectOption };
  //     },
  //     {
  //       wrapper,
  //     }
  //   );

  //   await waitFor(() => {
  //     expect(result.current.products).toHaveLength(20);
  //     expect(result.current.page).toBe(0);
  //   });

  //   for (let i = 1; i <= (products.length - 20) / 4; i++) {
  //     await waitFor(() => {
  //       act(() => {
  //         result.current.updateNextProductItem();
  //       });
  //     });

  //     await waitFor(() => {
  //       expect(result.current.products).toHaveLength(20 + i * 4);
  //       expect(result.current.page).toBe(i);
  //     });
  //   }

  //   act(() => {
  //     result.current.updateNextProductItem();
  //   });

  //   expect(result.current.page).toBe(20);
  // });

  it('스크롤을 내려 4개의 상품을 확인 한 후 가격 내림차순으로 정렬하면, 내림차순으로 정렬된 0 page 20개의 상품이 보여져야 한다.', async () => {
    const { result } = renderHook(
      () => {
        const { dropdownOptions, onSelectOption } = useSelectProductDropdown();
        const result = useProducts(dropdownOptions);

        return { ...result, dropdownOptions, onSelectOption };
      },
      {
        wrapper,
      }
    );

    act(() => {
      result.current.updateNextProductItem();
    });

    act(() => {
      result.current.onSelectOption('sort', 'desc');
    });

    await waitFor(() => {
      const isSortedDescending = result.current.products.every(isDescendingPrice);

      expect(isSortedDescending).toBe(true);
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });
  });
});
