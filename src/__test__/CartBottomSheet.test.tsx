import { screen, act, fireEvent, within, cleanup } from '@testing-library/react';
import { describe } from 'vitest';

import { productsData } from '@/shared/mocks/handlers/product/products.data';

import { renderProductListPage } from './ProductList.test';

describe('CartBottomSheet 테스트', () => {
  const setupCartBottomSheet = async () => {
    renderProductListPage();

    const productButtons = await screen.findAllByRole('button', {
      name: /담기$/,
    });

    const firstProductButton = productButtons[0];

    const cardElement = firstProductButton.closest('div');
    expect(cardElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(firstProductButton);
    });

    const header = screen.getByRole('banner');
    const withinHeader = within(header);
    const shoppingBagIcon = withinHeader.getByRole('button');

    await act(async () => {
      fireEvent.click(shoppingBagIcon);
    });

    const bottomSheet = screen.getByRole('dialog');
    const withinBottomSheet = within(bottomSheet);

    return { bottomSheet, withinBottomSheet };
  };

  it('추가된 상품을 BottomSheet에서 확인할 수 있다.', async () => {
    // Given : 상품 목록을 받았을 때
    const { withinBottomSheet } = await setupCartBottomSheet();

    // When : 유저가 장바구니 아이콘을 클릭했을 때
    expect(withinBottomSheet.getByText('장바구니')).toBeInTheDocument();

    const sortedByPrice = [...productsData.content].sort((a, b) => a.price - b.price);
    const cheapestProductName = sortedByPrice[0].name;
    expect(withinBottomSheet.getByText(cheapestProductName)).toBeInTheDocument();

    cleanup();
  });

  it('장바구니에서 상품을 삭제할 수 있다.', async () => {
    // Given : 상품 목록을 받았을 때
    const { withinBottomSheet } = await setupCartBottomSheet();
    expect(withinBottomSheet.getByText('장바구니')).toBeInTheDocument();

    // When : 유저가 삭제 버튼을 클릭했을 때
    const deleteButton = await screen.findAllByRole('button', { name: /삭제$/ });
    const firstDeleteButton = deleteButton[0];
    await act(async () => {
      fireEvent.click(firstDeleteButton);
    });

    // Then : 장바구니에서 상품이 삭제된다.
    expect(withinBottomSheet.getByText('장바구니')).toBeInTheDocument();
    expect(withinBottomSheet.queryByText(productsData.content[0].name)).not.toBeInTheDocument();
  });
});
