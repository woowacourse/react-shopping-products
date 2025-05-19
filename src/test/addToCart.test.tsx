import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShopPage from '../page/ShopPage';
import { mockProductList } from '../mock/Products';
import { vi, Mock } from 'vitest';
import * as productApi from '../api/product';
import * as cartApi from '../api/cartItem';

vi.mock('../api/product', () => ({
  getProduct: vi.fn(),
  default: vi.fn(),
}));

vi.mock('../api/cartItem', () => ({
  getCartItem: vi.fn(),
  postCartItem: vi.fn(),
  deleteCartItem: vi.fn(),
}));

describe('ShopPage - 장바구니 동작', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // ✅ 모든 mock의 호출 기록 초기화

    (productApi.default as Mock).mockResolvedValue(mockProductList);
    (cartApi.getCartItem as Mock).mockResolvedValue({
      content: [],
    });
    (cartApi.postCartItem as Mock).mockResolvedValue({});
  });

  it('장바구니 버튼 클릭 시 아이템이 추가되고 수량이 갱신된다', async () => {
    render(<ShopPage />);

    const productData = mockProductList.content[0];
    expect(await screen.findByText(productData.name)).toBeInTheDocument();

    const cartButtons = screen.getAllByRole('button', { name: /(담기|빼기)/i });
    expect(cartButtons.length).toBeGreaterThan(0);

    (cartApi.getCartItem as Mock).mockResolvedValueOnce({
      content: [
        {
          id: 1,
          quantity: 1,
          product: mockProductList.content[0],
        },
      ],
    });

    fireEvent.click(cartButtons[0]);

    await waitFor(() => {
      const cartButtons = screen.getByTestId('cart-count');
      expect(cartButtons).toHaveTextContent('1');
    });

    expect(cartApi.postCartItem).toHaveBeenCalledWith({
      productId: mockProductList.content[0].id,
      quantity: 1,
    });
    expect(cartApi.getCartItem).toHaveBeenCalledTimes(2);
  });

  it("사용자가 '빼기' 버튼을 누르면, 장바구니에서 제외된다", async () => {
    (productApi.default as Mock).mockResolvedValue(mockProductList);
    (cartApi.getCartItem as Mock).mockResolvedValueOnce({
      content: [
        {
          id: 1,
          quantity: 1,
          product: mockProductList.content[0],
        },
      ],
    });

    render(<ShopPage />);

    const productData = mockProductList.content[0];
    expect(await screen.findByText(productData.name)).toBeInTheDocument();

    const removeButtons = screen.getAllByRole('button', { name: /빼기/i });
    expect(removeButtons.length).toBeGreaterThan(0);

    (cartApi.getCartItem as Mock).mockResolvedValueOnce({ content: [] });
    (cartApi.deleteCartItem as Mock).mockResolvedValue({});

    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      const badge = screen.queryByTestId('cart-count');
      expect(badge).not.toBeInTheDocument();
    });

    expect(cartApi.deleteCartItem).toHaveBeenCalledTimes(1);
    expect(cartApi.getCartItem).toHaveBeenCalledTimes(2);
  });
});
