import { HttpResponse, http } from 'msw';

import APIClient from '../src/apis/APIClient';
import HTTPError from '../src/errors/HTTPError';
import { Product } from '../src/appTypes/product';
import { act } from 'react';
import products from '../src/mocks/handlers/products/mockData';
import { renderHook } from '@testing-library/react';
import { server } from '../src/mocks/server';
import useToggleShoppingCart from '../src/hooks/product/useToggleShoppingCart';

describe('장바구니 버튼 토글 테스트', () => {
  it('"담기" 버튼을 누르면 총 장바구니 갯수는 1개 증가한다.', async () => {
    const { result } = renderHook(() => useToggleShoppingCart());
    const TARGET_MOCK_DATA: Product = products[0];
    const initShoppingCartItemLength = result.current.addedShoppingCartLength;

    await act(async () => {
      result.current.onToggleCart(TARGET_MOCK_DATA.id);
    });

    console.log(result.current.addedShoppingCartLength, initShoppingCartItemLength);

    expect(result.current.addedShoppingCartLength).toBe(initShoppingCartItemLength + 1);
  });

  it('"담기" 버튼을 누르고 "빼기" 버튼을 누르면 총 장바구니 갯수는 0개다.', async () => {
    const { result } = renderHook(() => useToggleShoppingCart());
    const TARGET_MOCK_DATA: Product = products[0];
    const initShoppingCartItemLength = result.current.addedShoppingCartLength;

    await act(async () => {
      result.current.onToggleCart(TARGET_MOCK_DATA.id);
    });

    await act(async () => {
      result.current.onToggleCart(TARGET_MOCK_DATA.id);
    });

    expect(result.current.addedShoppingCartLength).toBe(initShoppingCartItemLength);
  });

  it('네트워크 에러 상황에서 담기 버튼을 누르면 장바구니가 담기지 않아야 한다.', async () => {
    server.use(
      http.post(`${APIClient.API_URL}/cart-items`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );

    const { result } = renderHook(() => useToggleShoppingCart());
    const TARGET_MOCK_DATA: Product = products[0];

    await act(async () => {
      try {
        await result.current.onToggleCart(TARGET_MOCK_DATA.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error.message).toBe('장바구니에 물건을 담지 못했습니다.');
      }
    });

    expect(result.current.addedShoppingCartLength).toBe(0);
  });
});
