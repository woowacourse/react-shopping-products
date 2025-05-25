import { screen, fireEvent, within, act } from '@testing-library/react';

import { renderProductListPage } from './ProductList.test';

describe('ProductListPage 담기 동작', () => {
  it('담기 버튼을 클릭하면 -/+ 버튼과 수량 1이 보여지고 헤더에 존재하는 장바구니 아이콘에 숫자 1이 더해진다.', async () => {
    // Given : 상품 목록을 받았을 때
    renderProductListPage();

    // When : 유저가 담기 버튼을 클릭했을 때
    const productButtons = await screen.findAllByRole('button', {
      name: /담기$/,
    });
    const firstProductButton = productButtons[0];

    const cardElement = firstProductButton.closest('div');
    expect(cardElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(firstProductButton);
    });

    // Then : 장바구니에 상품이 담겼는지 확인한다.
    const utils = within(cardElement!);
    expect(utils.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(utils.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(utils.getByText('1')).toBeInTheDocument();

    const header = screen.getByRole('banner');
    const withinHeader = within(header);
    expect(withinHeader.getByText('1')).toBeInTheDocument();
  });

  it('+ 버튼을 클릭하면 수량이 1 증가한다.', async () => {
    // Given : 상품 목록을 받았을 때
    renderProductListPage();

    // When : 유저가 + 버튼을 클릭했을 때
    const plusButton = await screen.findAllByRole('button', {
      name: /\+$/,
    });
    const firstProductButton = plusButton[0];
    const cardElement = firstProductButton.closest('div');
    expect(cardElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(firstProductButton);
    });

    // Then : 상단의 수량이 1 증가한다.
    const utils = within(cardElement!);
    expect(utils.getByText('2')).toBeInTheDocument();
  });

  it('- 버튼을 클릭하면 수량이 1 감소한다.', async () => {
    // Given : 상품 목록을 받았을 때
    renderProductListPage();

    // When : 유저가 + 버튼을 클릭했을 때
    const minusButton = await screen.findAllByRole('button', {
      name: /-$/,
    });
    const firstProductButton = minusButton[0];
    const cardElement = firstProductButton.closest('div');
    expect(cardElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(firstProductButton);
    });

    // Then : 상단의 수량이 1 감소한다.
    const utils = within(cardElement!);
    expect(utils.getByText('1')).toBeInTheDocument();
  });
});
