import { act, renderHook } from '@testing-library/react';

import { CartContext } from '@/contexts/CartContext';
import { deleteCartItemHandler } from '@/mocks/handlers/deleteCartItemHandler';
import { postCartItemHandler } from '@/mocks/handlers/postCartItemHandler';
import { server } from '@/mocks/server';
import useProductSelector from '../useProductSelector';
import { vi } from 'vitest';

describe('useProductSelector 테스트', () => {
  const productId = 1;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('상품 아이템 장바구니 추가 버튼 클릭 시 장바구니에 추가된다.', async () => {
    const mockCartContextValue = {
      cartList: [],
      fetchCartList: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartContext.Provider value={mockCartContextValue}>
        {children}
      </CartContext.Provider>
    );

    const { result } = renderHook(() => useProductSelector(productId), {
      wrapper,
    });

    server.use(...postCartItemHandler);

    await act(async () => {
      await result.current.addCartItem();
    });

    expect(mockCartContextValue.fetchCartList).toHaveBeenCalled();
    expect(result.current.isSelected).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('상품 아이템 장바구니 삭제 버튼 클릭 시 장바구니에서 삭제된다.', async () => {
    const mockCartContextValue = {
      cartList: [],
      fetchCartList: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartContext.Provider value={mockCartContextValue}>
        {children}
      </CartContext.Provider>
    );
    const { result } = renderHook(() => useProductSelector(productId), {
      wrapper,
    });

    server.use(...deleteCartItemHandler);
    await act(async () => {
      await result.current.removeCartItem();
    });

    expect(mockCartContextValue.fetchCartList).toHaveBeenCalled();
    expect(result.current.isSelected).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
