import { screen, fireEvent, within, act } from '@testing-library/react';

import { productsData } from '@/shared/mocks/handlers/product/products.data';

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

  it('추가된 상품을 BottomSheet에서 확인할 수 있다.', async () => {
    // Given : 상품 목록을 받았을 때
    renderProductListPage();

    // When : 유저가 장바구니 아이콘을 클릭했을 때
    const header = screen.getByRole('banner');
    const withinHeader = within(header);
    const shoppingBagIcon = withinHeader.getByRole('button');
    await act(async () => {
      fireEvent.click(shoppingBagIcon);
    });

    // Then : BottomSheet이 화면에 보이고, 추가된 상품이 보여진다.
    const bottomSheet = screen.getByRole('dialog');
    const withinBottomSheet = within(bottomSheet);
    screen.debug(bottomSheet);
    expect(withinBottomSheet.getByText('장바구니')).toBeInTheDocument();

    const sortedByPrice = [...productsData.content].sort((a, b) => a.price - b.price);
    const cheapestProductName = sortedByPrice[0].name;
    expect(withinBottomSheet.getByText(cheapestProductName)).toBeInTheDocument();
  });
});
