import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import Provider from '../src/Component/Common/Provider';
import { server } from '../src/mock/server';
import { resetCartState } from '../src/mock/handlers';

describe('장바구니 담기 빼기시 Header의 장바구니 종류 개수 변화 테스트', () => {
  beforeEach(() => {
    resetCartState();
    server.resetHandlers();
    vi.resetAllMocks();
  });
  it('장바구니 수량 조절 버튼으로 새로운 물품에 대해 증가 버튼 클릭시 장바구니에 담긴 물건 종류의 개수가 증가한다.', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    const initialCount = await screen.findByTestId('cart-count');
    expect(initialCount).toHaveTextContent('3');

    const itemSpan = screen.getByText('부리부리 원형 테이블');
    const itemLi = itemSpan.closest('li')!;
    const addBtn = within(itemLi).getByText('담기');
    await userEvent.click(addBtn);

    const increaseButton = await screen.findByTestId('increase-button');
    await userEvent.click(increaseButton);

    const updatedCount = await screen.findByTestId('cart-count');
    expect(updatedCount).toHaveTextContent('4');
  });

  it('장바구니 수량 조절 버튼으로 담긴 물품의 개수를 0으로 만들면 장바구니에 담긴 물건 종류의 개수가 줄어든다.', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    const initialCount = await screen.findByTestId('cart-count');
    expect(initialCount).toHaveTextContent('3');

    const itemSpan = screen.getByText('에어포스1');
    const itemLi = itemSpan.closest('li')!;
    const addBtn = within(itemLi).getByText('담기');
    await userEvent.click(addBtn);

    const decreaseButton = await screen.findByTestId('decrease-button');
    await userEvent.click(decreaseButton);

    const updatedCount = await screen.findByTestId('cart-count');
    expect(updatedCount).toHaveTextContent('2');
  });
});
