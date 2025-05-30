import { beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../src/App';
import cartMockData from '../../src/mocks/data/cartMockData';

beforeEach(() => {
  render(<App />);
});

describe('상품 목록 페이지 작동 테스트', () => {
  it('상품 목록 페이지의 담기 버튼을 누르면 장바구니 목록에 담겨 총 개수가 바뀐다.', async () => {
    const addButtons = await screen.findAllByText('담기');
    fireEvent.click(addButtons[0]);

    const cartCount = await screen.findByTestId('cart-count');
    expect(Number(cartCount.textContent)).toBe(cartMockData.content.length);
  });
});
