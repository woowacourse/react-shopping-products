import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from '@/components/common/header/Header';
import MockWrapper from '@/mocks/MockWrapper';

import '@testing-library/jest-dom';

describe('shoppingCartModal', () => {
  it('장바구니 버튼을 클릭하면 모달로 장바구니에 담은 목록을 확인할 수 있다.', () => {
    render(
      <MockWrapper>
        <Header />
      </MockWrapper>,
    );

    fireEvent.click(screen.getByAltText('장바구니'));

    const shoppingCartModalHeader = screen.getByText('장바구니');
    expect(shoppingCartModalHeader).toBeInTheDocument();
  });

  it('장바구니 모달에서 + 버튼을 클릭하면 제품 수량을 1 증가시킬 수 있다.', async () => {
    render(
      <MockWrapper>
        <Header />
      </MockWrapper>,
    );

    fireEvent.click(screen.getByAltText('장바구니'));

    const shoppingCartModalHeader = screen.getByText('장바구니');

    expect(shoppingCartModalHeader).toBeInTheDocument();

    const incrementButton = screen.getByTestId('shopping-cart-128-plus');
    fireEvent.click(incrementButton);
  });

  it('장바구니 모달에서 - 버튼을 클릭하면 제품 수량을 1 감소시킬 수 있다.', async () => {
    render(
      <MockWrapper>
        <Header />
      </MockWrapper>,
    );

    fireEvent.click(screen.getByAltText('장바구니'));

    const shoppingCartModalHeader = screen.getByText('장바구니');

    expect(shoppingCartModalHeader).toBeInTheDocument();

    const incrementButton = screen.getByTestId('shopping-cart-128-minus');
    fireEvent.click(incrementButton);
  });
});
