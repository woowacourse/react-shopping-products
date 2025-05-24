import { beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../src/App';

beforeEach(() => {
  render(<App />);
});

describe('모달 작동 테스트', () => {
  it('장바구니 버튼을 누르면 장바구니 모달이 나타난다.', async () => {
    const cartButton = await screen.findByTestId('cart-icon');
    fireEvent.click(cartButton);

    const cartTitle = await screen.findByText('장바구니');
    expect(cartTitle).toBeInTheDocument();
  });

  it('장바구니 모달에서 장바구니의 닫기 버튼을 누르면 장바구니 모달이 닫힌다.', async () => {
    const cartButton = await screen.findByTestId('cart-icon');
    fireEvent.click(cartButton);

    const cartTitle = await screen.findByText('장바구니');
    const closeButton = await screen.findByText('닫기');
    fireEvent.click(closeButton);

    expect(cartTitle).not.toBeInTheDocument();
  });

  it('장바구니 모달에서 장바구니의 Overlay를 누르면 장바구니 모달이 닫힌다.', async () => {
    const cartButton = await screen.findByTestId('cart-icon');
    fireEvent.click(cartButton);

    const cartTitle = await screen.findByText('장바구니');
    const overlay = await screen.findByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(cartTitle).not.toBeInTheDocument();
  });
});
